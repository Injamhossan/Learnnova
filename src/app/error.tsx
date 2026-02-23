'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, ChevronDown } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-50 rounded-full blur-3xl opacity-60 -z-10" />

      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/25 mb-6">
        <AlertTriangle className="w-10 h-10 text-white" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        Unexpected Error
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
        Something went wrong
      </h1>

      <p className="text-slate-500 max-w-md text-base font-medium mb-8 leading-relaxed">
        We hit an unexpected snag. Our team has been notified. You can try refreshing or head back home.
      </p>

      {/* Error details (dev-friendly collapsible) */}
      {error.message && (
        <details className="mb-8 w-full max-w-md text-left bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
          <summary className="flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-500 cursor-pointer select-none hover:bg-slate-100 transition-colors">
            Error details
            <ChevronDown className="w-3.5 h-3.5" />
          </summary>
          <pre className="px-4 pb-4 text-xs text-red-600 font-mono overflow-auto whitespace-pre-wrap">
            {error.message}
            {error.digest ? `\nDigest: ${error.digest}` : ''}
          </pre>
        </details>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-sm sm:max-w-none justify-center">
        <button
          onClick={reset}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 px-8 text-sm font-bold text-white transition-all active:scale-95 shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 px-8 text-sm font-bold text-slate-700 transition-all active:scale-95"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
