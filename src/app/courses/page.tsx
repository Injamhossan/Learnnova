import { Search, Filter, BookOpen, Clock, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 15400,
    duration: "24h 15m",
    price: "$89",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    category: "Development",
    level: "All Levels"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    rating: 4.8,
    students: 8200,
    duration: "18h 30m",
    price: "$75",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    category: "Design",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    instructor: "Dr. Emily Davis",
    rating: 4.9,
    students: 12100,
    duration: "32h 45m",
    price: "$95",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    category: "Data Science",
    level: "Advanced"
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Alex Turner",
    rating: 4.7,
    students: 6500,
    duration: "12h 20m",
    price: "$65",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    category: "Marketing",
    level: "Beginner"
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "David Wilson",
    rating: 4.8,
    students: 9300,
    duration: "20h 10m",
    price: "$85",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    category: "Development",
    level: "Intermediate"
  },
  {
    id: 6,
    title: "Financial Analysis & Investment",
    instructor: "Robert Brown",
    rating: 4.9,
    students: 5400,
    duration: "15h 45m",
    price: "$99",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600",
    category: "Finance",
    level: "Advanced"
  }
];

const categories = ["All", "Development", "Design", "Business", "Marketing", "Data Science", "Finance"];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 font-satoshi mb-4">Explore Our Courses</h1>
            <p className="text-lg text-slate-500 font-manrope max-w-2xl mx-auto">
                Discover world-class courses designed to help you master new skills and advance your career.
            </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* Search */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all font-manrope text-sm"
                />
            </div>

            {/* Categories & Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors shrink-0">
                    <Filter className="h-4 w-4" />
                    Filters
                 </button>
                 <div className="h-8 w-px bg-slate-200 mx-1 shrink-0 hidden md:block" />
                 {categories.map((cat, idx) => (
                    <button 
                        key={cat}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${idx === 0 ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        {cat}
                    </button>
                 ))}
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
                <div key={course.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-yellow-400/50 transition-all duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={course.image} 
                            alt={course.title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                            {course.category}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-slate-300'}`} />
                                ))}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">({course.rating} / 5.0)</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 font-satoshi mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                            {course.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-manrope mb-4">By <span className="text-slate-900 font-medium">{course.instructor}</span></p>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-4 text-xs text-slate-500 font-medium font-manrope">
                                <div className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.students.toLocaleString()} Students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                </div>
                             </div>
                             <div className="text-lg font-bold text-slate-900 font-satoshi">{course.price}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 transition-colors font-satoshi">
                Load More Courses
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>

      </div>
    </div>
  );
}
