import { Loader2 } from 'lucide-react'

export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="top-loader-bar" />
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-2xl relative z-10 animate-in zoom-in duration-500">
             <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="absolute -inset-4 bg-amber-500/10 rounded-[40px] blur-2xl animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Learnova</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
