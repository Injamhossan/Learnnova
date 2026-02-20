import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnAuth =
        nextUrl.pathname.startsWith('/login') ||
        nextUrl.pathname.startsWith('/signup');

      if (isOnAdmin) {
        if (isLoggedIn && userRole === 'ADMIN') return true;
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isOnAuth) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
