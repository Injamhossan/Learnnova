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
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Mock authentication logic - Replace with actual database check
          // For now, accept any email with 'admin@example.com' or generic test
          if (email === 'test@example.com' && password === '123456') {
             return {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
             };
          }
  
          console.log('Invalid credentials');
          return null;
        }

        console.log('Invalid input format');
        return null;
      },
    }),
  ],
});
