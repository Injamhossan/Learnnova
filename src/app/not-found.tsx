import Link from 'next/link'
import { Home, BookOpen, ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center relative overflow-hidden">
      
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Giant 404 */}
      <div className="relative select-none mb-8">
        <span className="text-[160px] sm:text-[220px] lg:text-[280px] font-black leading-none tracking-tighter text-slate-100">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 rotate-12">
            <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-white -rotate-12" />
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Page Not Found
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight max-w-lg">
        Looks like you wandered off the path
      </h1>

      <p className="text-slate-500 text-base sm:text-lg font-medium max-w-md mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back to learning.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm sm:max-w-none">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-900/20 active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

        <Link
          href="/courses"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 px-7 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          Browse Courses
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
        <span>Quick links:</span>
        {[
          { href: '/login', label: 'Sign In' },
          { href: '/signup', label: 'Sign Up' },
          { href: '/instructor', label: 'Teach on Learnova' },
        ].map(l => (
          <Link key={l.href} href={l.href} className="hover:text-slate-700 transition-colors underline underline-offset-2">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
