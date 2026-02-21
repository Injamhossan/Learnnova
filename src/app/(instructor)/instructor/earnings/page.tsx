import AdminHeader from '@/components/admin/AdminHeader';
import { Wallet, TrendingUp, ArrowDownLeft, ArrowUpRight, Calendar, DollarSign } from 'lucide-react';

export default function EarningsPage() {
  const transactions = [
    { id: '1', course: 'Advanced React Design Patterns', amount: 129.99, date: '2024-02-21', status: 'COMPLETED' },
    { id: '2', course: 'UI/UX Design Essentials', amount: 49.99, date: '2024-02-20', status: 'PENDING' },
    { id: '3', course: 'Fullstack Next.js Masterclass', amount: 199.99, date: '2024-02-18', status: 'COMPLETED' },
  ];

  return (
    <>
      <AdminHeader title="Earnings" subtitle="Track your revenue and payouts" />
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col h-full">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                       <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Current Balance</span>
                 </div>
                 <h2 className="text-5xl font-bold mb-2">$8,420.50</h2>
                 <p className="text-white/40 text-sm font-medium italic mb-10">Available for payout: $4,200.00</p>
                 <button className="mt-auto w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                    WITHDRAW NOW
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           </div>

           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                       <div className="p-3 bg-emerald-50 rounded-2xl">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                       </div>
                       <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+24%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-slate-900">$24,850.00</p>
                 </div>
                 <div className="pt-6 border-t border-slate-50 mt-6 overflow-hidden">
                    <div className="flex items-end gap-1 h-12">
                       {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-emerald-100 rounded-t-sm group relative" style={{ height: `${h}%` }}>
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 italic">
                                ${h*10}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                       <div className="p-3 bg-blue-50 rounded-2xl">
                          <Calendar className="w-5 h-5 text-blue-600" />
                       </div>
                       <span className="text-[10px] font-bold text-blue-500">This Month</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Payouts</p>
                    <p className="text-3xl font-bold text-slate-900">$2,400.00</p>
                 </div>
                 <div className="flex items-center gap-4 mt-8">
                    <div className="flex-1 space-y-1">
                       <p className="text-[10px] font-bold text-slate-400 uppercase italic">Next Payout</p>
                       <p className="font-bold text-slate-900 uppercase italic">Oct 15, 2024</p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-slate-200" />
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 italic">Sales History</h2>
              <button className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Download Statement</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course Title</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                       <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 italic">
                    {transactions.map(t => (
                       <tr key={t.id} className="hover:bg-slate-50 transition-all">
                          <td className="px-8 py-5 text-xs text-slate-500 font-bold">#TRX-{t.id}9283</td>
                          <td className="px-8 py-5 font-bold text-slate-900">{t.course}</td>
                          <td className="px-8 py-5 font-bold text-slate-900 italic">${t.amount}</td>
                          <td className="px-8 py-5 text-xs text-slate-400 font-bold">{t.date}</td>
                          <td className="px-8 py-5">
                             <span className={`text-[9px] font-bold px-3 py-1 rounded-full border ${
                                t.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                             }`}>
                                {t.status}
                             </span>
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
