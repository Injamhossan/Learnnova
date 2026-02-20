'use client';

import { Star, ArrowUpRight } from 'lucide-react';

const mockCourses = [
  { rank: 1, name: 'Complete React & TypeScript Masterclass', instructor: 'Sarah Johnson', enrollments: 4230, completion: '78%', category: 'Web Dev' },
  { rank: 2, name: 'Python for Data Science', instructor: 'Dr. Emily Parker', enrollments: 3810, completion: '65%', category: 'Data' },
  { rank: 3, name: 'UI/UX Design Fundamentals', instructor: 'Marcus Chen', enrollments: 3540, completion: '82%', category: 'Design' },
  { rank: 4, name: 'Machine Learning A-Z', instructor: 'Dr. James Wilson', enrollments: 3120, completion: '59%', category: 'AI/ML' },
  { rank: 5, name: 'Node.js & Express Backend', instructor: 'Alex Rodriguez', enrollments: 2890, completion: '71%', category: 'Backend' },
];

const categoryColors: Record<string, string> = {
  'Web Dev': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  'Data': 'bg-blue-50 text-blue-700 border-blue-100',
  'Design': 'bg-rose-50 text-rose-700 border-rose-100',
  'AI/ML': 'bg-amber-50 text-amber-700 border-amber-100',
  'Backend': 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

export default function PopularCourses() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Popular Courses</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Highest enrollment metrics this month</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          View Detailed Analytics
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {['#', 'Course Name', 'Instructor', 'Category', 'Enrollments', 'Avg. Completion'].map((h) => (
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
            {mockCourses.map((c) => (
              <tr key={c.rank} className="hover:bg-slate-50/50 transition-all group cursor-default">
                <td className="py-5 pr-6">
                  <span
                    className={`text-sm font-bold ${
                      c.rank === 1 ? 'text-amber-500' : 'text-slate-400'
                    }`}
                  >
                    0{c.rank}
                  </span>
                </td>
                <td className="py-5 pr-6 max-w-[320px]">
                   <div className="flex items-center gap-1">
                      <p className="text-slate-900 font-bold truncate group-hover:text-black transition-colors">
                        {c.name}
                      </p>
                      {c.rank === 1 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />}
                   </div>
                </td>
                <td className="py-5 pr-6">
                  <p className="text-slate-600 font-bold text-xs">{c.instructor}</p>
                </td>
                <td className="py-5 pr-6">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${categoryColors[c.category]}`}>
                    {c.category.toUpperCase()}
                  </span>
                </td>
                <td className="py-5 pr-6">
                  <p className="text-slate-900 font-bold tabular-nums">{c.enrollments.toLocaleString()}</p>
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full min-w-[80px] overflow-hidden">
                      <div
                        className="h-full bg-slate-900 rounded-full shadow-sm"
                        style={{ width: c.completion }}
                      />
                    </div>
                    <span className="text-xs text-slate-900 font-bold tabular-nums">{c.completion}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
