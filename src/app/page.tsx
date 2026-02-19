import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PopularCourses from "@/components/sections/PopularCourses";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <Hero />
      <Features />
      <PopularCourses />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
