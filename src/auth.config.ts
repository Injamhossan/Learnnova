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
      
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnStudent = nextUrl.pathname.startsWith('/student');
      const isOnInstructor = nextUrl.pathname.startsWith('/instructor');
      const isOnAuth = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/signup');

      // 1. Role-based protection
      if (isOnAdmin && (!isLoggedIn || userRole !== 'ADMIN')) {
          return Response.redirect(new URL('/login', nextUrl));
      }
      
      if (isOnStudent && (!isLoggedIn || userRole !== 'STUDENT')) {
          return Response.redirect(new URL('/login', nextUrl));
      }

      if (isOnInstructor && (!isLoggedIn || userRole !== 'INSTRUCTOR')) {
          return Response.redirect(new URL('/login', nextUrl));
      }

      // 2. Auth page redirection after login
      if ((isOnAuth || nextUrl.pathname === '/') && isLoggedIn) {
          if (userRole === 'ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (userRole === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
          if (userRole === 'STUDENT') return Response.redirect(new URL('/student', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
