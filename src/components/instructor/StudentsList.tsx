'use client';

import { useState } from 'react';
import { Search, Mail, MessageSquare, MoreVertical, User, BookOpen, Clock } from 'lucide-react';

export default function InstructorStudentsPage() {
  const [search, setSearch] = useState('');

  const students = [
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', course: 'Advanced React Design Patterns', progress: 75, joined: '2024-01-20' },
    { id: '2', name: 'Maria Garcia', email: 'maria@example.com', course: 'Advanced React Design Patterns', progress: 92, joined: '2024-01-22' },
    { id: '3', name: 'Sam Wilson', email: 'sam@example.com', course: 'Fullstack Next.js Masterclass', progress: 45, joined: '2024-02-05' },
    { id: '4', name: 'Emma Davis', email: 'emma@example.com', course: 'UI/UX Design Essentials', progress: 100, joined: '2024-02-10' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200">
               Direct Message
             </button>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50">
                       {['Student', 'Course Enrollment', 'Progress', 'Joined At', 'Actions'].map(h => (
                          <th key={h} className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 italic">
                    {filteredStudents.map(student => (
                       <tr key={student.id} className="hover:bg-slate-50 transition-all group">
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0 border border-slate-200">
                                   {student.name[0]}
                                </div>
                                <div>
                                   <p className="font-bold text-slate-900 line-clamp-1">{student.name}</p>
                                   <p className="text-[10px] font-bold text-slate-400 lowercase italic">{student.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2 text-slate-600">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="font-bold text-xs truncate max-w-[150px]">{student.course}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="w-32">
                                <div className="flex items-center justify-between mb-1.5">
                                   <span className="text-[10px] font-bold text-slate-400 uppercase">{student.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                   <div 
                                      className={`h-full transition-all duration-1000 ${student.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                                      style={{ width: `${student.progress}%` }} 
                                   />
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2 text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase">{new Date(student.joined).toLocaleDateString()}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
                                   <Mail className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100">
                                   <MessageSquare className="w-4 h-4" />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </>
  );
}
