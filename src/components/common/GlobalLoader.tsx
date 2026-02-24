"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Outer Ring */}
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-40 w-40 rounded-full bg-amber-500/20" 
            />
            
            {/* Animated Double Borders */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="h-28 w-28 rounded-[35%] border-4 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute h-28 w-28 rounded-[40%] border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent" 
            />
            
            {/* Central Icon */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-amber-500 shadow-2xl border border-slate-700"
            >
               <BookOpen className="h-8 w-8" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            {/* Branding */}
            <h2 className="font-satoshi text-3xl font-black tracking-[0.2em] text-white">
              LEARN<span className="text-amber-500">NOVA</span>
            </h2>
            
            {/* Simple Loading Line */}
            <div className="h-1 w-48 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 className="h-full w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
               />
            </div>
            
            <p className="font-manrope text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
              Preparing your classroom
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
