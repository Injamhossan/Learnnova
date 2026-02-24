"use client";

import { Star, Clock, BookOpen, Users, ArrowRight, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchPublicCourses } from '@/store/coursesSlice';
import Link from 'next/link';
import Skeleton from '@/components/common/Skeleton';

export default function PopularCourses() {
  const dispatch = useAppDispatch();
  const { publicCourses: response, loading } = useAppSelector(s => s.courses);

  useEffect(() => {
    dispatch(fetchPublicCourses({ limit: 4 }));
  }, [dispatch]);

  const courses = (response as any)?.courses || [];
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
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
                <div className="h-48 bg-slate-100" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-50 w-3/4" />
                  <div className="h-3 bg-slate-50 w-1/2" />
                </div>
              </div>
            ))
          ) : courses.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No courses available yet</h3>
                <p className="text-slate-500 mt-2">We're currently preparing some amazing courses for you. Stay tuned!</p>
            </div>
          ) : (
            courses.map((course: any) => (
              <Link 
                href={`/courses/${course.slug}`}
                key={course.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image / Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {/* Background Image Optimized */}
                  {course.thumbnailUrl ? (
                    <Image 
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                       <BookOpen className="w-12 h-12" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                      {course.level}
                    </span>
                  </div>

                  {/* Price Tag (Floating) */}
                  <div className="absolute top-4 right-4 z-20">
                      <span className="bg-white text-slate-900 font-black text-sm px-3 py-1.5 rounded-full shadow-lg">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 relative">
                  
                  {/* Meta Row */}
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-tight text-slate-400 mb-4 border-b border-slate-50 pb-4">
                      <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          6h 30m
                      </div>
                      <div className="flex items-center gap-1">
                          <PlayCircle className="w-3.5 h-3.5 text-amber-500" />
                          {course.totalLessons || 12} Lessons
                      </div>
                      <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-indigo-500" />
                          {course.totalEnrollments}+
                      </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-slate-900 mb-2 font-satoshi line-clamp-2 leading-tight group-hover:text-amber-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  {/* Instructor */}
                  <p className="text-slate-400 text-xs mb-4 font-manrope font-bold">
                    by <span className="text-slate-700">{course.instructor?.user?.fullName || 'Expert'}</span>
                  </p>

                  {/* Footer (Rating & Button) */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-slate-900 font-black text-sm">{course.averageRating || '4.8'}</span>
                          <span className="text-slate-300 text-[10px] font-bold">({course.totalReviews || 0})</span>
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-900 group-hover:bg-amber-400 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                  </div>

                </div>
              </Link>
            ))
          )}
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
