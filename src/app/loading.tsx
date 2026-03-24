export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
      
      {/* Background Decorative Mesh Blobs for Mesh Shimmer */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-fuchsia-400/10 rounded-full filter blur-[100px] animate-pulse duration-[4000ms]" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-400/15 rounded-full filter blur-[100px] animate-pulse [animation-delay:2000ms] duration-[4000ms]" />

      <div className="top-loader-bar" />

      {/* Main Glass Spinner Card */}
      <div className="relative z-10 p-10 rounded-[32px] bg-white/40 border border-white/30 backdrop-blur-xl shadow-2xl shadow-slate-200/50 flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer glow aura */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-transparent to-fuchsia-500 opacity-80 blur-lg animate-spin duration-[4000ms]" />
          
          {/* Float Center Dot Logo */}
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center shadow-xl relative z-10 animate-bounce duration-[2000ms]">
             <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight font-satoshi">
            Learnova
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase animate-pulse duration-1000">
            Initializing workspace...
          </p>
        </div>

        {/* Dynamic Dot Steps */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
