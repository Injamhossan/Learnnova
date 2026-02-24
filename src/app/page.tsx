import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import dynamic from 'next/dynamic';
import Skeleton from "@/components/common/Skeleton";

const PopularCourses = dynamic(() => import("@/components/sections/PopularCourses"), {
  loading: () => (
    <div className="py-24 bg-slate-50">
       <div className="max-w-7xl mx-auto px-4 h-[400px]">
          <Skeleton className="w-full h-full rounded-[32px]" />
       </div>
    </div>
  )
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="py-24 h-[300px] bg-white"><Skeleton className="max-w-7xl mx-auto h-full" /></div>
});

const CallToAction = dynamic(() => import("@/components/sections/CallToAction"));

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-yellow-400/30">
      
      <Hero />
      <Features />
      <PopularCourses />
      <Testimonials />
      <CallToAction />
      
    </main>
  );
}
