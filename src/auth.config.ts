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

      // 1. Strict Role-based protection (Safe Routing)
      // This ensures that even if someone guesses the URL, they are blocked by the Server Session
      if (isOnAdmin && (!isLoggedIn || (userRole?.toUpperCase() !== 'ADMIN' && userRole?.toUpperCase() !== 'SUPER_ADMIN'))) {
          console.log(`Unauthorized Admin access attempt by ${auth?.user?.email || 'Guest'}`);
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }
      
      if (isOnStudent && (!isLoggedIn || userRole?.toUpperCase() !== 'STUDENT')) {
          console.log(`Unauthorized Student access attempt by ${auth?.user?.email || 'Guest'}`);
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }

      if (isOnInstructor && (!isLoggedIn || userRole?.toUpperCase() !== 'INSTRUCTOR')) {
          console.log(`Unauthorized Instructor access attempt by ${auth?.user?.email || 'Guest'}`);
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }

      // 2. Auth page redirection (Prevent double login)
      if (isOnAuth && isLoggedIn) {
          const role = userRole?.toUpperCase();
          if (role === 'ADMIN' || role === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (role === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
          return Response.redirect(new URL('/student', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
