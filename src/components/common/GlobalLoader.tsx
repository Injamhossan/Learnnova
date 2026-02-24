"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loader on route change
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      // Small delay for smooth exit
      setTimeout(() => setLoading(false), 600);
    };

    handleStart();
    handleComplete();
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md transition-all duration-500">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Ring */}
        <div className="absolute h-32 w-32 animate-ping rounded-full bg-amber-500/20" />
        
        {/* Animated Double Borders */}
        <div className="h-24 w-24 animate-[spin_3s_linear_infinite] rounded-[30%] border-4 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
        <div className="absolute h-24 w-24 animate-[spin_2s_linear_infinite_reverse] rounded-[40%] border-4 border-t-amber-500" />
        
        {/* Central Icon */}
        <div className="absolute flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-amber-500 shadow-xl border border-slate-700">
           <BookOpen className="h-7 w-7 animate-bounce" />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        {/* Branding */}
        <h2 className="font-satoshi text-2xl font-black tracking-widest text-white">
          LEARN<span className="text-amber-500">NOVA</span>
        </h2>
        
        {/* Animated Dots */}
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500 [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500 [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-500" />
        </div>
        
        <p className="font-manrope text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
          Preparing your classroom
        </p>
      </div>

      {/* Progress Bar Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-800/50">
        <div className="h-full w-1/3 animate-[loading-bar_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
