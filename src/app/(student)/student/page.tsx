import AdminHeader from '@/components/admin/AdminHeader';

export default function StudentDashboardPage() {
  return (
    <>
      <AdminHeader title="Student Dashboard" subtitle="Welcome back to your learning journey" />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Courses in Progress</h3>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Completed Courses</h3>
            <p className="text-3xl font-bold text-slate-900">45</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Certificates Earned</h3>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Continue Learning</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold shrink-0">
                JS
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg">Modern JavaScript Masterclass</h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[65%]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500">65%</span>
                </div>
              </div>
            </div>
            {/* More course items here */}
          </div>
        </div>
      </div>
    </>
  );
}
