import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center">
      
      {/* 404 Visual */}
      <h1 className="select-none text-[150px] font-black leading-none tracking-tighter text-slate-800 sm:text-[250px] lg:text-[350px]">
        404
      </h1>

      <div className="relative -mt-12 sm:-mt-20 lg:-mt-32 z-10">
        <div className="inline-flex items-center rounded-full bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400 border border-yellow-400/20 mb-6">
          <Search className="mr-2 h-4 w-4" />
          Page Not Found
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-satoshi mb-6">
          Looks like you're lost in space.
        </h2>
        
        <p className="mx-auto max-w-xl text-lg text-slate-400 font-manrope mb-10">
          The page you are looking for doesn't exist or has been moved. Let's get you back to learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-yellow-400 px-8 text-base font-bold text-slate-900 transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/20 font-satoshi"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          
          <Link
            href="/courses"
            className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 text-base font-bold text-white transition-all hover:bg-slate-800 hover:border-slate-600 font-satoshi"
          >
            Browse Courses
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-4 w-4 rounded-full bg-blue-500 opacity-20 blur-[1px] animate-pulse"></div>
        <div className="absolute right-[20%] top-[10%] h-3 w-3 rounded-full bg-purple-500 opacity-30 blur-[1px] delay-700 animate-pulse"></div>
        <div className="absolute left-[20%] bottom-[20%] h-6 w-6 rounded-full bg-yellow-500 opacity-10 blur-[2px] delay-300 animate-pulse"></div>
        <div className="absolute right-[10%] bottom-[30%] h-2 w-2 rounded-full bg-white opacity-40 blur-[0.5px] delay-1000 animate-pulse"></div>
      </div>

    </div>
  )
}
