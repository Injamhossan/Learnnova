'use client';

import Link from 'next/link';
import { Star, ArrowUpRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  totalEnrollments: number;
  averageRating: number;
  price: number;
  instructor?: { user?: { fullName: string } };
  category?: { name: string };
}

export default function PopularCourses({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Popular Courses</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">Highest enrollment metrics</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-16 text-slate-300">
          <p className="text-xs font-bold uppercase tracking-widest">No courses published yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Popular Courses</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Highest enrollment metrics</p>
        </div>
        <Link
          href="/admin/analytics"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          View Analytics
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {['#', 'Course Name', 'Instructor', 'Category', 'Enrollments', 'Rating', 'Price'].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-4 pr-6 last:pr-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {courses.slice(0, 8).map((c, idx) => {
              const rank = idx + 1;
              const categoryName = c.category?.name || 'Uncategorized';
              const instructorName = c.instructor?.user?.fullName || '—';
              return (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-all group cursor-default">
                  <td className="py-4 pr-6">
                    <span className={`text-sm font-bold ${rank === 1 ? 'text-amber-500' : 'text-slate-300'}`}>
                      {String(rank).padStart(2, '0')}
                    </span>
                  </td>
                  <td className="py-4 pr-6 max-w-[280px]">
                    <div className="flex items-center gap-1.5">
                      <p className="text-slate-900 font-bold truncate group-hover:text-black transition-colors">
                        {c.title}
                      </p>
                      {rank === 1 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />}
                    </div>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="text-slate-600 font-bold text-xs whitespace-nowrap">{instructorName}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-slate-50 text-slate-600 border-slate-100">
                      {categoryName.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <p className="text-slate-900 font-bold tabular-nums">
                      {(c.totalEnrollments || 0).toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {c.averageRating > 0 ? c.averageRating.toFixed(1) : '—'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-slate-900 font-bold tabular-nums text-xs">
                      {c.price === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `$${c.price.toFixed(2)}`
                      )}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
