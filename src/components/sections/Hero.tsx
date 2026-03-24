"use client";

import { BookOpen, CheckCircle, Users } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/assets/hero-image.jpg';
import Counter from '@/components/ui/Counter';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load timeline
    const tl = gsap.timeline({ 
      defaults: { opacity: 0, ease: 'power4.out', duration: 1 } 
    });

    tl.from('.bg-glow-1', { scale: 0.5, duration: 1.5 })
      .from('.bg-glow-2', { scale: 0.5, duration: 1.5 }, '-=1')
      .from('.hero-badge', { y: 30 }, '-=1.2')
      .from('.hero-title', { y: 40, duration: 1.2 }, '-=0.8')
      .from('.hero-text', { y: 20 }, '-=0.9')
      .from('.hero-button', { y: 20, stagger: 0.15 }, '-=0.8')
      .from('.hero-image-box', { scale: 0.9, x: 30, duration: 1.2 }, '-=0.9')
      .from('.hero-floating', { scale: 0, stagger: 0.2, ease: 'back.out(1.5)' }, '-=0.5')
      .from('.stats-card', { y: 100, opacity: 0, duration: 0.8 }, '-=0.3');

    // Continuous floating animation
    gsap.to('.hero-float-1', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-float-2', { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
    
    // Parallax scrolling on blobs
    gsap.to('.bg-glow-1', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 100,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-10 bg-slate-900 px-4 py-24 sm:px-6 lg:px-8 md:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="bg-glow-1 absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="bg-glow-2 absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto flex relative z-10 max-w-7xl flex-col items-center justify-between gap-16 lg:flex-row">
        {/* Left Content */}
        <div className="flex max-w-xl flex-col items-start gap-8 lg:w-1/2">
          <div className="hero-badge inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-yellow-400 ring-1 ring-inset ring-slate-700 font-satoshi">
            <span className="mr-2">🚀</span> The future of online learning
          </div>

          <h1 className="hero-title font-satoshi text-4xl font-bold tracking-tight text-white sm:text-6xl/none">
            Learn Without <span className="relative inline-block">
              <span className="text-yellow-400">Limits</span>
              <svg 
                className="absolute -bottom-2 left-0 h-3 text-yellow-400 opacity-80 w-full" 
                viewBox="0 0 200 9" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.00025 6.99997C25.8571 2.99999 74.3228 -1.23239 127.329 1.49257C177.306 4.06173 207.828 6.99998 219.001 6.99998" stroke="currentColor" strokeWidth="3"></path>
              </svg>
            </span>
          </h1>

          <p className="hero-text text-lg text-slate-300 sm:text-xl/8 font-satoshi">
            Unlock your potential with world-class courses, expert instructors, and a learning experience designed to take you further — faster.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button className="hero-button inline-flex h-12 items-center justify-center rounded-lg bg-yellow-400 px-8 text-base font-semibold text-slate-900 transition-all hover:shadow-lg hover:shadow-yellow-400/30 hover:scale-105 active:scale-95 duration-200 cursor-pointer font-satoshi">
              Start Learning Free
            </button>
            <button className="hero-button inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-8 text-base font-medium text-white transition-all hover:bg-white/5 cursor-pointer">
              Browse Courses
            </button>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="hero-image-box relative w-full max-w-[600px] lg:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-800 shadow-2xl ring-1 ring-white/10">
            <Image 
              src={heroImage}
              alt="Students collaborating" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority
              placeholder="blur"
            />
          </div>
          
          {/* Decorative floating elements */}
          <div className="hero-floating hero-float-1 absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-white shadow-xl flex items-center justify-center">
             <div className="text-3xl">🎯</div>
          </div>
          <div className="hero-floating hero-float-2 absolute -bottom-6 -left-6 h-20 w-48 rounded-2xl bg-white shadow-xl p-4 flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
               <BookOpen className="h-5 w-5" />
             </div>
             <div>
               <div className="text-xs text-slate-500">Live Classes</div>
               <div className="text-sm font-bold text-slate-900">12 Available</div>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Floating Card */}
      <div className="stats-card absolute bottom-0 left-1/2 w-full max-w-5xl px-6 sm:px-0 z-20 translate-y-1/2 -translate-x-1/2">
        <div className="grid grid-cols-1 gap-8 rounded-2xl bg-white p-10 shadow-2xl ring-1 ring-slate-900/5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-100">
          
          <div className="flex items-center justify-center gap-4 sm:px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <Counter className="text-2xl font-bold text-slate-900 font-satoshi" end={50000} suffix="+" duration={2000} />
              <span className="text-sm font-medium text-slate-500 font-manrope">Active Students</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <Counter className="text-2xl font-bold text-slate-900 font-satoshi" end={1200} suffix="+" duration={2000} />
              <span className="text-sm font-medium text-slate-500 font-manrope">Expert Courses</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 shrink-0">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <Counter className="text-2xl font-bold text-slate-900 font-satoshi" end={300} suffix="+" duration={2000} />
              <span className="text-sm font-medium text-slate-500 font-manrope">Top Instructors</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

