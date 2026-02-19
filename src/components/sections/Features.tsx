import { BookOpen, Award, BarChart, Users } from 'lucide-react';

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
    <section id="features" className="py-36 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-yellow-500 font-bold tracking-wider text-sm uppercase font-satoshi">Why EduFlow</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-satoshi">
            Everything you need to succeed
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 font-manrope">
            Our platform combines cutting-edge technology with proven pedagogy to deliver an unmatched learning experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-satoshi">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-manrope text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
