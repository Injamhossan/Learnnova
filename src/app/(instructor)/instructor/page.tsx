import AdminHeader from '@/components/admin/AdminHeader';

export default function InstructorDashboardPage() {
  return (
    <>
      <AdminHeader title="Instructor Dashboard" subtitle="Overview of your teaching performance" />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-slate-900">1,284</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Courses</h3>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-slate-900">$12,450</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Avg. Rating</h3>
            <p className="text-3xl font-bold text-slate-900">4.8</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Course Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 italic font-medium text-slate-400 text-sm">
                  <th className="text-left pb-4">Course</th>
                  <th className="text-left pb-4">Sales</th>
                  <th className="text-left pb-4">Revenue</th>
                  <th className="text-left pb-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900">Advanced React Design Patterns</td>
                  <td className="py-4">124</td>
                  <td className="py-4">$6,200</td>
                  <td className="py-4 text-amber-500 font-bold">4.9 ★</td>
                </tr>
                {/* More rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
