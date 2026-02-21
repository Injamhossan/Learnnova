'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Users, DollarSign, Star, MoreVertical, Plus, Edit, Trash2, Eye, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Course {
  id: string;
  title: string;
  thumbnail?: string;
  price: number;
  totalEnrollments: number;
  rating: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
}

export default function CourseList() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Mock data for now until backend is connected
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete Web Development Bootcamp 2024',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        price: 99.99,
        totalEnrollments: 1240,
        rating: 4.8,
        status: 'PUBLISHED',
        createdAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        title: 'Advanced React Design Patterns & Performance',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        price: 129.99,
        totalEnrollments: 850,
        rating: 4.9,
        status: 'PUBLISHED',
        createdAt: '2024-02-10T14:30:00Z',
      },
      {
        id: '3',
        title: 'Mastering Node.js and Microservices',
        thumbnail: 'https://images.unsplash.com/photo-1537432376769-00f5c2f008d8?auto=format&fit=crop&w=800&q=80',
        price: 79.99,
        totalEnrollments: 0,
        rating: 0,
        status: 'DRAFT',
        createdAt: '2024-02-20T09:15:00Z',
      },
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <Link 
          href="/instructor/courses/create"
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          CREATE NEW COURSE
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 p-4 space-y-4 animate-pulse">
              <div className="aspect-video bg-slate-100 rounded-2xl" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[32px] border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group border-b-4 active:translate-y-1">
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden border-b border-slate-100">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${
                    course.status === 'PUBLISHED' 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : 'bg-slate-900 text-white border-slate-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[44px]">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between py-4 border-y border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrolled</span>
                    <div className="flex items-center gap-1 mt-1 text-slate-900 font-bold">
                       <Users className="w-3.5 h-3.5 text-blue-500" />
                       {course.totalEnrollments}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
                    <div className="flex items-center gap-1 mt-1 text-slate-900 font-bold">
                       <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                       {course.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-slate-900">{course.rating || 'New'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 italic">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course Detail</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map(course => (
                   <tr key={course.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-4">
                            <img src={course.thumbnail} className="w-16 h-10 rounded-lg object-cover border border-slate-100 shadow-sm" alt="" />
                            <div>
                               <p className="font-bold text-slate-900 line-clamp-1">{course.title}</p>
                               <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                            course.status === 'PUBLISHED' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                         }`}>
                           {course.status}
                         </span>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                            <span className="font-bold text-slate-900">${(course.price * course.totalEnrollments).toLocaleString()}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{course.totalEnrollments} Sales</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                               <Eye className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all">
                               <Edit className="w-4 h-4" />
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
