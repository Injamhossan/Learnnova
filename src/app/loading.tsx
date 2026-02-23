import { Loader2 } from 'lucide-react'

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 animate-ping" />
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-700">Loading</p>
          <p className="text-xs text-slate-400 mt-0.5">Please wait a moment…</p>
        </div>
      </div>
    </div>
  )
}
