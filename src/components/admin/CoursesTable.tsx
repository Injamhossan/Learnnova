'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Eye, EyeOff, Star, Filter, Loader2, BookOpen } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Course {
  id: string;
  title: string;
  slug: string;
  price: number;
  level: string;
  isPublished: boolean;
  totalEnrollments: number;
  createdAt: string;
  instructor: { user: { fullName: string; email: string } };
  category: { name: string } | null;
  _count: { enrollments: number; reviews: number };
}

const levelColors: Record<string, string> = {
  BEGINNER: 'bg-blue-50 text-blue-700 border-blue-100',
  INTERMEDIATE: 'bg-amber-50 text-amber-700 border-amber-100',
  ADVANCED: 'bg-rose-50 text-rose-700 border-rose-100',
  ALL: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function CoursesTable() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(
        `${apiUrl}/api/admin/courses?page=${page}&search=${encodeURIComponent(search)}`,
        { headers: { Authorization: `Bearer ${(session?.user as any)?.backendToken}` } }
      );
      const data = await res.json();
      if (res.ok) {
        setCourses(data.courses);
        setTotalPages(data.pages);
        setTotal(data.total);
      }
    } catch (e) {
      console.error('Failed to fetch courses:', e);
    } finally {
      setLoading(false);
    }
  }, [page, search, session]);

  useEffect(() => {
    if (session) fetchCourses();
  }, [fetchCourses, session]);

  const togglePublish = async (courseId: string) => {
    setTogglingId(courseId);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/courses/${courseId}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${(session?.user as any)?.backendToken}` },
      });
      if (res.ok) {
        setCourses(prev =>
          prev.map(c => c.id === courseId ? { ...c, isPublished: !c.isPublished } : c)
        );
      }
    } catch (e) {
      console.error('Failed to toggle course:', e);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 w-full transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {total} total courses
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-bold text-sm">LOADING COURSES...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <BookOpen className="w-10 h-10 mb-4" />
              <p className="font-bold text-sm">NO COURSES FOUND</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50">
                  {['Course', 'Category', 'Level', 'Price', 'Enrollments', 'Reviews', 'Status', 'Action'].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest px-8 py-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-8 py-5 max-w-[280px]">
                      <div>
                        <p className="font-bold text-slate-900 truncate">{course.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                          {course.instructor?.user?.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {course.category?.name?.toUpperCase() || 'UNCATEGORIZED'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${levelColors[course.level] || levelColors.ALL}`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-900 font-bold tabular-nums">
                      {course.price === 0 ? 'FREE' : `$${course.price}`}
                    </td>
                    <td className="px-8 py-5 text-slate-900 font-bold tabular-nums">
                      {course._count.enrollments.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold tabular-nums">
                      {course._count.reviews}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold ${
                        course.isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${course.isPublished ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {course.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button
                        onClick={() => togglePublish(course.id)}
                        disabled={togglingId === course.id}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                          course.isPublished
                            ? 'bg-white border-red-200 text-red-600 hover:bg-red-50'
                            : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'
                        } disabled:opacity-50`}
                      >
                        {togglingId === course.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : course.isPublished ? (
                          <><EyeOff className="w-3.5 h-3.5" /> ARCHIVE</>
                        ) : (
                          <><Eye className="w-3.5 h-3.5" /> PUBLISH</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {loading ? 'LOADING...' : `SHOWING ${courses.length} OF ${total} COURSES`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              PREV
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  p === page ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
