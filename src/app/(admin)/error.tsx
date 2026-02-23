'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { console.error('[AdminError]', error) }, [error])

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Error</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Something went wrong loading this admin page. Try again or go back to the dashboard.
        </p>
        {error.message && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6 font-mono text-left break-all">
            {error.message}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95">
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link href="/admin"
            className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-all">
            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
