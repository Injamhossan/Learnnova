"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';

export default function CallToAction() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-16 shadow-2xl rounded-[32px] sm:px-12 lg:py-20">
          
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <Reveal direction="up" delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-satoshi">
                Ready to start your journey?
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300 font-manrope">
                Join thousands of learners already transforming their careers on Learnova. Your first course is on us.
              </p>
            </Reveal>
            <div className="mt-10 flex items-center justify-center">
              <Reveal direction="up" delay={0.3}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="rounded-xl bg-yellow-500 px-10 py-4 text-base font-bold text-slate-900 shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 transition-colors font-satoshi inline-block"
                  >
                    Get Started for Free
                  </Link>
                </motion.div>
              </Reveal>
            </div>
          </div>
          
          {/* Decorative background effects */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -left-24 w-96 h-96 border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-48 -right-48 w-128 h-128 border border-white/5 rounded-full"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,transparent_70%)]" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
