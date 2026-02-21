import AdminHeader from '@/components/admin/AdminHeader';
import { BarChart3, TrendingUp, Users, Clock, MousePointer2, Star } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <>
      <AdminHeader title="Analytics" subtitle="Deep dive into your content performance" />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto bg-slate-50/30">
        
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-indigo-50 rounded-2xl">
                    <MousePointer2 className="w-5 h-5 text-indigo-600" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <TrendingUp className="w-3 h-3" /> 14%
                 </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Profile Views</h3>
              <p className="text-4xl font-bold text-slate-900">4,285</p>
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                 <MousePointer2 className="w-32 h-32" />
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-amber-50 rounded-2xl">
                    <Clock className="w-5 h-5 text-amber-600" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <TrendingUp className="w-3 h-3" /> 2.4h
                 </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Watch Time</h3>
              <p className="text-4xl font-bold text-slate-900">8.5h</p>
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                 <Clock className="w-32 h-32" />
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Users className="w-5 h-5 text-emerald-600" />
                 </div>
                 <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <TrendingUp className="w-3 h-3" /> 8%
                 </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Retention Rate</h3>
              <p className="text-4xl font-bold text-slate-900">72%</p>
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                 <Users className="w-32 h-32" />
              </div>
           </div>
        </div>

        {/* Charts Simulation Section */}
        <div className="bg-white rounded-[48px] border border-slate-200 p-10 shadow-sm min-h-[400px] flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900 italic">Enrollment Trends</h2>
                 <p className="text-slate-400 text-sm font-medium">Monthly growth of your student base.</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-200">Enrolled</button>
                 <button className="px-5 py-2.5 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Revenue</button>
              </div>
           </div>
           
           <div className="flex-1 flex items-end justify-between gap-4 pt-10">
              {[40, 65, 45, 80, 55, 95, 70, 85, 60, 100, 75, 90].map((h, i) => (
                 <div key={i} className="flex-1 group relative">
                    <div 
                      className="w-full bg-slate-100 rounded-2xl group-hover:bg-indigo-600 transition-all duration-500" 
                      style={{ height: `${h * 2}px` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap">
                       {h * 10} Users
                    </div>
                    <span className="block text-center text-[9px] font-bold text-slate-300 uppercase tracking-tighter mt-4 italic">
                       {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                    </span>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </>
  );
}
