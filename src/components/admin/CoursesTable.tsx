'use client';

import { useState } from 'react';
import { Search, Eye, EyeOff, Star, Filter, Plus } from 'lucide-react';

const mockCourses = [
  { id: '1', title: 'Complete React & TypeScript Masterclass', instructor: 'Sarah Johnson', category: 'Web Dev', price: 99.99, enrollments: 4230, rating: 4.8, published: true, level: 'INTERMEDIATE' },
  { id: '2', title: 'Python for Data Science', instructor: 'Dr. Emily Parker', category: 'Data', price: 79.99, enrollments: 3810, rating: 4.7, published: true, level: 'BEGINNER' },
  { id: '3', title: 'UI/UX Design Fundamentals', instructor: 'Marcus Chen', category: 'Design', price: 69.99, enrollments: 3540, rating: 4.9, published: true, level: 'BEGINNER' },
  { id: '4', title: 'Machine Learning A-Z', instructor: 'Dr. James Wilson', category: 'AI/ML', price: 129.99, enrollments: 3120, rating: 4.6, published: false, level: 'ADVANCED' },
  { id: '5', title: 'Node.js & Express Backend', instructor: 'Alex Rodriguez', category: 'Backend', price: 89.99, enrollments: 2890, rating: 4.7, published: true, level: 'INTERMEDIATE' },
  { id: '6', title: 'AWS Cloud Practitioner', instructor: 'Jennifer Lee', category: 'Cloud', price: 149.99, enrollments: 2560, rating: 4.5, published: false, level: 'BEGINNER' },
];

const levelColors: Record<string, string> = {
  BEGINNER: 'bg-blue-50 text-blue-700 border-blue-100',
  INTERMEDIATE: 'bg-amber-50 text-amber-700 border-amber-100',
  ADVANCED: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function CoursesTable() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState(mockCourses);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c))
    );
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="relative w-full max-w-md">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input
               type="text"
               placeholder="Search by title or instructor..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 w-full transition-all"
             />
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Filter className="w-4 h-4" />
                FILTERS
             </button>
             <button className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Plus className="w-4 h-4" />
                NEW COURSE
             </button>
          </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50">
                {['Course Information', 'Category', 'Level', 'Pricing', 'Students', 'Rating', 'Visibility', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest px-8 py-5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                  <td className="px-8 py-5 max-w-[320px]">
                     <div>
                        <p className="font-bold text-slate-900 group-hover:text-black transition-colors truncate">
                          {course.title}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Instructor: {course.instructor}</p>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {course.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-900 font-bold tabular-nums">
                    ${course.price}
                  </td>
                  <td className="px-8 py-5 text-slate-900 font-bold tabular-nums">
                    {course.enrollments.toLocaleString()}
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      {course.rating}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold ${
                        course.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          course.published ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                      {course.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => togglePublish(course.id)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-bold transition-all opacity-0 group-hover:opacity-100 border ${
                        course.published
                          ? 'bg-white border-red-200 text-red-600 hover:bg-red-50'
                          : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'
                      }`}
                    >
                      {course.published ? (
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
        </div>
        <div className="px-8 py-5 bg-slate-100/30 border-t border-slate-100">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              TOTAL COURSES: {courses.length} | FILTERED RESULTS: {filtered.length}
           </p>
        </div>
      </div>
    </div>
  );
}
