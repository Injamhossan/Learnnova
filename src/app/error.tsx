'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-sans">
      
      <div className="rounded-full bg-red-50 p-6 mb-8 animate-bounce-slow">
        <AlertCircle className="h-16 w-16 text-red-500" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl font-satoshi mb-4">
        Something went wrong!
      </h1>
      
      <p className="mx-auto max-w-md text-lg text-slate-500 font-manrope mb-8">
        We encountered an unexpected error. Our team has been notified and we are working to fix it.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 text-base font-bold text-white transition-all hover:bg-slate-800 hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95 font-satoshi"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        
        <Link
          href="/"
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 font-satoshi"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none"></div>

    </div>
  )
}
