'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  BookOpen, Users, Star, Play, Search, Filter,
  ChevronRight, Loader2, Globe, Lock, Check,
} from 'lucide-react';
import Link from 'next/link';
import StudentHeader from '@/components/student/StudentHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Enrollment {
  id: string;
  progressPercentage: number;
  isCompleted: boolean;
  enrolledAt: string;
  course: {
    id: string; title: string; thumbnailUrl?: string; level: string;
    totalEnrollments: number; averageRating: number; durationMinutes?: number;
    instructor: { user: { fullName: string } };
    category: { name: string };
  };
}

function ProgressBar({ v }: { v: number }) {
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={cn('h-full rounded-full transition-all duration-700',
        v === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-blue-400'
      )} style={{ width: `${v}%` }} />
    </div>
  );
}

export default function StudentCoursesPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.backendToken as string | undefined;
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await courseApi.getMyEnrollments(token);
      setEnrollments(data?.enrollments ?? data ?? []);
    } catch { setEnrollments([]); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const filtered = enrollments
    .filter(e => {
      if (filter === 'in-progress') return !e.isCompleted;
      if (filter === 'completed') return e.isCompleted;
      return true;
    })
    .filter(e => e.course.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <StudentHeader title="My Courses" subtitle="All your enrolled courses in one place" />

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8 space-y-5">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search courses..." type="text"
                className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all w-52"
              />
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value as any)}
              className="text-sm border border-slate-200 bg-white rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
              <option value="all">All({enrollments.length})</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="aspect-video bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-2 bg-slate-100 rounded-full w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-slate-300" />
            </div>
            <p className="font-bold text-slate-600 text-sm">{search ? 'No courses match your search' : 'No courses enrolled yet'}</p>
            {!search && (
              <Link href="/" className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                Explore courses <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(e => (
              <div key={e.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 group transition-all flex flex-col">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {e.course.thumbnailUrl ? (
                    <img src={e.course.thumbnailUrl} alt={e.course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                  {e.isCompleted && (
                    <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    {e.course.level}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                    {e.course.category?.name}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 flex-1">{e.course.title}</h3>
                  <p className="text-xs text-slate-400">{e.course.instructor?.user?.fullName}</p>

                  <div className="mt-auto pt-3 border-t border-slate-50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>{e.isCompleted ? '✅ Completed' : `${e.progressPercentage}% complete`}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {e.course.averageRating.toFixed(1)}
                      </div>
                    </div>
                    <ProgressBar v={e.progressPercentage} />
                    <Link href={`/courses/${e.course.id}`}
                      className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-all active:scale-95">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      {e.isCompleted ? 'Review Course' : 'Continue Learning'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
