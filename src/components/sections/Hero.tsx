import { ArrowRight, BookOpen, CheckCircle, Play, Users } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/assets/hero-image.jpg';
import Counter from '@/components/ui/Counter';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 px-4 py-24 sm:px-6 lg:px-8 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 lg:flex-row">
        {/* Left Content */}
        <div className="flex max-w-xl flex-col items-start gap-8 lg:w-1/2">
          <div className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-yellow-400 ring-1 ring-inset ring-slate-700 font-satoshi">
            <span className="mr-2">🚀</span> The future of online learning
          </div>

          <h1 className="font-satoshi text-4xl font-bold tracking-tight text-white sm:text-6xl/none">
            Learn Without <span className="relative inline-block">
              <span className="text-yellow-400">Limits</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C25.8571 2.99999 74.3228 -1.23239 127.329 1.49257C177.306 4.06173 207.828 6.99998 219.001 6.99998" stroke="currentColor" strokeWidth="3"></path>
              </svg>
            </span>
          </h1>

          <p className="text-lg text-slate-300 sm:text-xl/8 font-satoshi">
            Unlock your potential with world-class courses, expert instructors, and a learning experience designed to take you further — faster.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-yellow-400 px-8 text-base font-medium text-slate-900 transition-colors hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 font-satoshi">
              Start Learning Free
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-8 text-base font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
              Browse Courses
            </button>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative w-full max-w-[600px] lg:w-1/2">
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
        </div>
      </div>

      {/* Stats Floating Card */}
      <div className="absolute bottom-0 left-1/2 w-full max-w-5xl -translate-x-1/2 translate-y-1/2 px-6 sm:px-0">
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
