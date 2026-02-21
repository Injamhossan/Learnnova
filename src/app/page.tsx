import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PopularCourses from "@/components/sections/PopularCourses";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import FingerprintDemo from "@/components/sections/FingerprintDemo";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-yellow-400/30">
      
      <Hero />
      <Features />
      <PopularCourses />
      <Testimonials />
      <CallToAction />
      <FingerprintDemo />
      
    </main>
  );
}
