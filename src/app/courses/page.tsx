'use client';

import { Search, Filter, BookOpen, Clock, Star, ArrowRight, Loader2, PlayCircle, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPublicCourses } from "@/store/coursesSlice";
import Skeleton from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";

const PAGE_CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Data Science", "Finance"];

function CourseSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
           <Skeleton className="w-24 h-3" />
           <Skeleton className="w-10 h-3" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const dispatch = useAppDispatch();
  const { publicCourses: response, loading } = useAppSelector(s => s.courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  useEffect(() => {
    dispatch(fetchPublicCourses({ limit: 6 }));
  }, [dispatch]);

  const loadMore = () => {
    if ((response as any)?.nextCursor) {
      dispatch(fetchPublicCourses({ 
        limit: 6, 
        cursor: (response as any).nextCursor,
        search: searchTerm,
        category: selectedCat === 'All' ? undefined : selectedCat
      }));
    }
  };

  const allCourses = (response as any)?.courses || [];
  
  const filtered = allCourses.filter((c: any) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === "All" || c.category?.name === selectedCat;
    return matchesSearch && matchesCat;
  });

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

        {/* Search and Filters Section */}
        <div className="mb-12">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
                {/* Main Search */}
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        type="search" 
                        placeholder="What do you want to learn today?" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-manrope font-medium shadow-inner hover:border-slate-300"
                    />
                </div>
                
                {/* Category Dropdown */}
                <div className="relative w-full lg:w-72">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-slate-400" />
                    </div>
                    <select 
                        value={selectedCat}
                        onChange={(e) => setSelectedCat(e.target.value)}
                        className="block w-full pl-10 pr-10 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-manrope font-bold text-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 cursor-pointer appearance-none transition-all hover:border-slate-300"
                    >
                        <option value="All">All Categories</option>
                        {PAGE_CATEGORIES.filter(c => c !== "All").map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                </div>

                {/* Clear Filters (Dynamic) */}
                {(searchTerm || selectedCat !== "All") && (
                    <button 
                        onClick={() => { setSearchTerm(""); setSelectedCat("All"); }}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all font-bold text-sm font-satoshi shrink-0"
                    >
                        <X className="h-4 w-4" />
                        Clear
                    </button>
                )}

                <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 font-bold text-sm shrink-0 font-satoshi active:scale-95">
                    Search
                </button>
            </div>
        </div>

        {/* Course Grid */}
        {loading && filtered.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <CourseSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No courses found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course: any) => (
                  <Link href={`/courses/${course.slug || course.id}`} key={course.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                          {course.thumbnailUrl ? (
                            <Image 
                                src={course.thumbnailUrl} 
                                alt={course.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-slate-200" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                              {course.category?.name || 'Uncategorized'}
                          </div>
                          {course.level && (
                             <div className="absolute bottom-3 left-3 bg-slate-900/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                                {course.level}
                             </div>
                          )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3">
                              <div className="flex text-amber-500">
                                  {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.averageRating || 0) ? 'fill-current' : 'text-slate-200'}`} />
                                  ))}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold">({course.averageRating || 0})</span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 font-satoshi mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                              {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-manrope mb-4">By <span className="text-slate-900 font-bold">{course.instructor?.user?.fullName || 'Instructor'}</span></p>

                          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                               <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold font-manrope uppercase tracking-tight">
                                  <div className="flex items-center gap-1">
                                      <Users className="w-3.5 h-3.5 text-blue-500" />
                                      <span>{(course.totalEnrollments || 0).toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                      <PlayCircle className="w-3.5 h-3.5 text-amber-500" />
                                      <span>Videos</span>
                                  </div>
                               </div>
                               <div className="text-base font-bold text-slate-900 font-satoshi">
                                 {course.price === 0 ? 'Free' : `$${course.price}`}
                               </div>
                          </div>
                      </div>
                  </Link>
              ))}
          </div>
        )}

        {/* Pagination / Load More */}
        {(response as any)?.nextCursor && (
          <div className="mt-16 text-center">
              <button 
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors font-satoshi disabled:opacity-50"
              >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Load More Courses'}
                  <ArrowRight className="w-4 h-4" />
              </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Re-defining Users icon which was missing in imports
function Users({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
