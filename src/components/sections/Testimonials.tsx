"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useCallback } from 'react';

const testimonials = [
  {
    content: "Learnova completely transformed my career. The courses are practical, up-to-date, and the instructors genuinely care about your progress.",
    author: "Alex Thompson",
    role: "Software Engineer",
    initial: "A",
    company: "TechCorp",
  },
  {
    content: "The quality of content here is unmatched. I went from beginner to landing my dream job in just 6 months. Highly recommend!",
    author: "Maria Garcia",
    role: "UX Designer",
    initial: "M",
    company: "DesignCo",
  },
  {
    content: "What sets EduFlow apart is the community and support. The progress tracking kept me motivated through every single module.",
    author: "David Kim",
    role: "Data Analyst",
    initial: "D",
    company: "DataInc",
  },
  {
    content: "I secured a promotion after completing the Advanced Python course. The certification holds real value in the industry.",
    author: "Sarah Jenkins",
    role: "Backend Lead",
    initial: "S",
    company: "StartUp X",
  },
  {
    content: "The best learning investment I've made. The bite-sized lessons make it easy to learn even with a busy schedule.",
    author: "James Wilson",
    role: "Product Manager",
    initial: "J",
    company: "Innovate Ltd",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false, 
  }, [
    Autoplay({ delay: 2500, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-yellow-600 font-bold tracking-wider text-sm uppercase font-satoshi flex items-center gap-2">
              <span className="w-8 h-[2px] bg-yellow-500"></span>
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-satoshi">
              What our students say
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-manrope max-w-lg">
              Join thousands of learners who have transformed their careers with EduFlow.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 pb-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 relative group">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-8 text-slate-100 group-hover:text-yellow-100 transition-colors duration-300">
                    <Quote className="w-12 h-12 fill-current rotate-180" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 leading-relaxed font-manrope mb-8 relative z-10 flex-grow italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                    <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold font-satoshi shadow-md">
                      {testimonial.initial}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 font-satoshi text-sm">{testimonial.author}</div>
                      <div className="text-xs text-slate-500 font-manrope">{testimonial.role} @ {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
