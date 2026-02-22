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
      const isOnAuthCallback = nextUrl.pathname.startsWith('/auth/callback');

      // 1. Strict Role-based protection (Safe Routing)
      if (isOnAdmin && (!isLoggedIn || (userRole?.toUpperCase() !== 'ADMIN' && userRole?.toUpperCase() !== 'SUPER_ADMIN'))) {
          console.log(`Unauthorized Admin access attempt by ${auth?.user?.email || 'Guest'}`);
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }

      // SUPER_ADMIN cannot enroll as student or create courses as instructor
      if (isOnStudent && (!isLoggedIn || userRole?.toUpperCase() !== 'STUDENT')) {
          const r = userRole?.toUpperCase();
          if (r === 'ADMIN' || r === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (r === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }

      if (isOnInstructor && (!isLoggedIn || userRole?.toUpperCase() !== 'INSTRUCTOR')) {
          const r = userRole?.toUpperCase();
          if (r === 'ADMIN' || r === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (r === 'STUDENT') return Response.redirect(new URL('/student', nextUrl));
          return Response.redirect(new URL('/login?error=Unauthorized', nextUrl));
      }


      // 2. /auth/callback — redirect logged-in users to their dashboard
      if (isOnAuthCallback && isLoggedIn) {
          const role = userRole?.toUpperCase();
          if (role === 'ADMIN' || role === 'SUPER_ADMIN') return Response.redirect(new URL('/admin', nextUrl));
          if (role === 'INSTRUCTOR') return Response.redirect(new URL('/instructor', nextUrl));
          return Response.redirect(new URL('/student', nextUrl));
      }

      // 3. Auth page redirection — prevent already-logged-in users from seeing login/signup
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
