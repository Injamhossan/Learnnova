import AdminHeader from '@/components/admin/AdminHeader';
import { Users, BookOpen, DollarSign, Star, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';

export default function InstructorDashboardPage() {
  const stats = [
    { label: 'Total Students', value: '1,284', icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { label: 'Total Courses', value: '8', icon: BookOpen, color: 'bg-indigo-50 text-indigo-600', trend: '+1' },
    { label: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600', trend: '+18%' },
    { label: 'Avg. Rating', value: '4.8', icon: Star, color: 'bg-amber-50 text-amber-600', trend: 'Master' },
  ];

  const recentCourses = [
    { title: 'Advanced React Design Patterns', sales: 124, revenue: '$6,200', rating: 4.9 },
    { title: 'Fullstack Next.js Masterclass', sales: 86, revenue: '$4,300', rating: 4.8 },
    { title: 'UI/UX Design Essentials', sales: 52, revenue: '$2,600', rating: 4.7 },
  ];

  return (
    <>
      <AdminHeader title="Instructor Dashboard" subtitle="Overview of your teaching performance" />
      <div className="flex-1 p-8 space-y-10 overflow-y-auto bg-slate-50/30">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.icon === DollarSign ? 'bg-emerald-50 text-emerald-600' : 
                                stat.icon === Users ? 'bg-blue-50 text-blue-600' :
                                stat.icon === Star ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                   <TrendingUp className="w-3 h-3 text-emerald-500" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.trend}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 tabular-nums">{stat.value}</p>
              </div>
              <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:scale-110 transition-transform">
                 <stat.icon className="w-24 h-24" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Recent Performance Table */}
           <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h2 className="text-xl font-bold text-slate-900 italic">Recent Performance</h2>
                 <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">View All Reports</button>
              </div>
              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          {['Course', 'Sales', 'Revenue', 'Rating'].map(h => (
                             <th key={h} className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                          ))}
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {recentCourses.map((course) => (
                          <tr key={course.title} className="hover:bg-slate-50 transition-all group">
                             <td className="px-8 py-5">
                                <span className="font-bold text-slate-900">{course.title}</span>
                             </td>
                             <td className="px-8 py-5 font-bold text-slate-600 tabular-nums">{course.sales}</td>
                             <td className="px-8 py-5 font-bold text-emerald-600 tabular-nums">{course.revenue}</td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-1">
                                   <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                   <span className="font-bold text-slate-900">{course.rating}</span>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Quick Actions / Activity */}
           <div className="space-y-8">
              <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Create New Content</h3>
                    <p className="text-white/60 text-sm mb-6 max-w-[200px]">Ready to share your knowledge? Create a new course today.</p>
                    <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-100 transition-all">
                       GET STARTED <ArrowUpRight className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <BookOpen className="w-48 h-48" />
                 </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 italic">Upcoming Tasks</h3>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                       <div className="space-y-1">
                          <p className="font-bold text-slate-900 leading-tight">Review Course Feedback</p>
                          <div className="flex items-center gap-2 text-slate-400">
                             <Clock className="w-3 h-3" />
                             <span className="text-[10px] font-bold uppercase">2 Hours Left</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                       <div className="space-y-1">
                          <p className="font-bold text-slate-900 leading-tight">Update Quiz Resources</p>
                          <div className="flex items-center gap-2 text-slate-400">
                             <Clock className="w-3 h-3" />
                             <span className="text-[10px] font-bold uppercase">Tomorrow</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
