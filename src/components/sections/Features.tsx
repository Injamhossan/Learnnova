"use client";

import { BookOpen, Award, BarChart, Users } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { motion } from 'framer-motion';

const features = [
  {
    icon: BookOpen,
    title: "Course Library",
    description: "Access thousands of curated courses across 50+ categories, from tech to creative arts.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience and proven teaching methods.",
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description: "Stay motivated with detailed analytics, milestones, and personalized learning paths.",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn recognized certificates upon completion to showcase your skills to employers.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-36 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal direction="up" delay={0.1}>
            <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase font-satoshi block mb-4">Why Learnova</span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl font-satoshi">
              Everything you need to succeed
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="mt-6 text-lg leading-8 text-slate-600 font-manrope">
              Our platform combines cutting-edge technology with proven pedagogy to deliver an unmatched learning experience.
            </p>
          </Reveal>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-satoshi">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-manrope text-[15px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
