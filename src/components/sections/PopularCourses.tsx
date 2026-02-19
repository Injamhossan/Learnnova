import { Star, Clock, BookOpen, Users, ArrowRight } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "The Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviews: 12400,
    price: 49.99,
    badge: "Bestseller",
    gradient: "from-blue-500 to-cyan-400",
    duration: "45h",
    lessons: 86,
    students: "15k+",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning with Python",
    instructor: "Dr. Michael Chen",
    rating: 4.8,
    reviews: 8700,
    price: 59.99,
    badge: "Top Rated",
    gradient: "from-emerald-500 to-teal-400",
    duration: "38h",
    lessons: 64,
    students: "8k+",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",

  },
  {
    id: 3,
    title: "UI/UX Design Masterclass: From Zero to Pro",
    instructor: "Emma Williams",
    rating: 4.9,
    reviews: 8300,
    price: 39.99,
    badge: "New",
    gradient: "from-rose-500 to-orange-400",
    duration: "24h",
    lessons: 42,
    students: "5k+",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy & Analytics",
    instructor: "James Rodriguez",
    rating: 4.7,
    reviews: 5100,
    price: 44.99,
    badge: "Popular",
    gradient: "from-violet-500 to-purple-400",
    duration: "32h",
    lessons: 55,
    students: "12k+",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
  },
];

export default function PopularCourses() {
  return (
    <section id="courses" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-yellow-600 font-bold tracking-wider text-sm uppercase font-satoshi flex items-center gap-2">
              <span className="w-8 h-[2px] bg-yellow-500"></span>
              Top Courses
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-satoshi">
              Explore our best sellers
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-manrope max-w-lg">
              Unlock your potential with our most popular courses, designed for real-world success.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-yellow-600 transition-colors group">
            View All Courses
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image / Header */}
              <div className="relative h-48 overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-90 mix-blend-multiply z-10`} />
                
                {/* Background Image (simulated) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${course.image})` }}
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                    {course.badge}
                  </span>
                </div>

                {/* Price Tag (Floating) */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-white text-slate-900 font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
                        ${course.price}
                    </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 relative">
                
                {/* Meta Row */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.lessons} Lessons
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {course.students}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-satoshi line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors">
                  {course.title}
                </h3>
                
                {/* Instructor */}
                <p className="text-slate-500 text-sm mb-4 font-manrope">
                  by <span className="text-slate-700 font-medium">{course.instructor}</span>
                </p>

                {/* Footer (Rating & Button) */}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-slate-900 font-bold text-sm">{course.rating}</span>
                        <span className="text-slate-400 text-xs">({course.reviews})</span>
                    </div>

                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-yellow-400 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
            <button className="inline-flex items-center justify-center rounded-lg bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors w-full">
                View All Courses
            </button>
        </div>

      </div>
    </section>
  );
}
