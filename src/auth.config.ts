import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role?.toUpperCase();

      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnStudent = nextUrl.pathname.startsWith('/student');
      const isOnInstructor = nextUrl.pathname.startsWith('/instructor');
      const isOnAuth = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/signup');
      const isOnAuthCallback = nextUrl.pathname.startsWith('/auth/callback');

      // 1. Protected Routes handling
      if (isOnAdmin || isOnStudent || isOnInstructor) {
        if (!isLoggedIn) return false; // Redirect to login
        
        // If logged in but role is missing for some reason, don't just kick to login with error
        // Let them go to the callback/selector page if needed, or default dashboard
        if (!userRole) return true; 

        // Role-based protection
        if (isOnAdmin && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(userRole === 'INSTRUCTOR' ? '/instructor' : '/student', nextUrl));
        }

        if (isOnStudent && userRole !== 'STUDENT') {
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (userRole === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
        }

        if (isOnInstructor && userRole !== 'INSTRUCTOR') {
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (userRole === 'STUDENT') return Response.redirect(new URL('/student', nextUrl));
        }
      }

      // 2. Auth page redirection — prevent already-logged-in users from seeing login/signup
      if (isOnAuth && isLoggedIn) {
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (userRole === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
          return Response.redirect(new URL('/student', nextUrl));
      }

      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      // 1. Initial Sign In
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.backendToken = (user as any).token;
        token.needsRole = (user as any).needsRole;
        token.picture = user.image;

        // Special handling for social logins if data is missing (sync happened in signIn callback)
        if (account && (account.provider === 'google' || account.provider === 'github')) {
          // If the role or token is still missing, we could fetch it here too
          // but for now we rely on the signIn callback updating the user object correctly
        }
      }

      // 2. Handle updates (e.g. role selection)
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        if (session.token) token.backendToken = session.token;
        token.needsRole = false;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role as string;
        (session.user as any).backendToken = token.backendToken as string;
        (session.user as any).needsRole = token.needsRole as boolean;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
