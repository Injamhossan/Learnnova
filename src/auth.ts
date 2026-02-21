import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize attempt:', credentials?.email);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Credentials validation failed:', parsedCredentials.error.format());
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        console.log('Calling backend login at:', `${apiUrl}/api/auth/login`);

        try {
          const res = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          console.log('Backend response status:', res.status);

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.log('Backend login failed:', errorData.message || res.statusText);
            return null;
          }

          const data = await res.json();
          console.log('Backend login success, user role:', data.role);

          return {
            id: data.id,
            name: data.fullName,
            email: data.email,
            role: data.role,
            token: data.token,
            image: data.avatarUrl || null,
          };
        } catch (error: any) {
          console.error('Fetch error during authorize:', error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        console.log(`Syncing social login for ${user.email} with backend...`);
        
        try {
          const res = await fetch(`${apiUrl}/api/auth/social-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              fullName: user.name,
              avatarUrl: user.image,
            }),
          });

          if (!res.ok) {
            console.error('Failed to sync social login with backend');
            return false;
          }

          const data = await res.json();
          console.log(`Social sync successful, assigned role: ${data.role}`);
          
          // Attach backend data to the user object so it's available in the jwt callback
          (user as any).id = data.id;
          (user as any).role = data.role;
          (user as any).token = data.token;
          
          return true;
        } catch (error: any) {
          console.error('Error during social login sync:', error.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.backendToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).backendToken = token.backendToken;
      }
      return session;
    },
  },
});
