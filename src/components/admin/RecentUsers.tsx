'use client';

import { ChevronRight } from 'lucide-react';

const mockUsers = [
  { name: 'Emma Watson', date: 'Feb 17, 2026', role: 'Student', initials: 'EW', color: 'bg-indigo-600' },
  { name: 'Carlos Diaz', date: 'Feb 17, 2026', role: 'Instructor', initials: 'CD', color: 'bg-amber-600' },
  { name: 'Priya Sharma', date: 'Feb 16, 2026', role: 'Student', initials: 'PS', color: 'bg-emerald-600' },
  { name: 'Jake Miller', date: 'Feb 16, 2026', role: 'Student', initials: 'JM', color: 'bg-blue-600' },
  { name: 'Aisha Bello', date: 'Feb 15, 2026', role: 'Instructor', initials: 'AB', color: 'bg-rose-600' },
];

const roleBadge: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-100',
  Instructor: 'bg-amber-50 text-amber-700 border-amber-100',
  Admin: 'bg-slate-50 text-slate-700 border-slate-100',
};

export default function RecentUsers() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">New Users</h3>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5">Latest account creations</p>
        </div>
        <button className="text-[11px] font-bold text-slate-900 hover:underline uppercase tracking-wider">
          All Users
        </button>
      </div>
      <ul className="space-y-4 flex-1">
        {mockUsers.map((u) => (
          <li key={u.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100">
            <div
              className={`w-10 h-10 rounded-xl ${u.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm`}
            >
              {u.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{u.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{u.date}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${roleBadge[u.role]}`}>
                {u.role.toUpperCase()}
              </span>
              <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all uppercase tracking-widest">
        Generate User Report
      </button>
    </div>
  );
}
