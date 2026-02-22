'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface RecentUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
}

const roleBadge: Record<string, string> = {
  STUDENT: 'bg-blue-50 text-blue-700 border-blue-100',
  INSTRUCTOR: 'bg-amber-50 text-amber-700 border-amber-100',
  ADMIN: 'bg-slate-50 text-slate-700 border-slate-100',
  SUPER_ADMIN: 'bg-indigo-50 text-indigo-700 border-indigo-100',
};

const avatarColors = [
  'bg-indigo-600', 'bg-amber-600', 'bg-emerald-600',
  'bg-blue-600', 'bg-rose-600', 'bg-violet-600',
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getColor(id: string) {
  const code = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return avatarColors[code % avatarColors.length];
}

export default function RecentUsers({ users }: { users: RecentUser[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">New Users</h3>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5">Latest account creations</p>
        </div>
        <Link
          href="/admin/users"
          className="text-[11px] font-bold text-slate-900 hover:underline uppercase tracking-wider"
        >
          All Users
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No users yet</p>
        </div>
      ) : (
        <ul className="space-y-3 flex-1">
          {users.slice(0, 6).map((u) => (
            <li
              key={u.id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
            >
              {u.avatarUrl ? (
                <img
                  src={u.avatarUrl}
                  alt={u.fullName}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-xl ${getColor(u.id)} flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm`}
                >
                  {getInitials(u.fullName)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate tracking-tight">{u.fullName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(u.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${roleBadge[u.role] || roleBadge.STUDENT}`}>
                  {u.role.replace('_', ' ')}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/admin/analytics"
        className="mt-5 block w-full py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all uppercase tracking-widest text-center"
      >
        View Analytics
      </Link>
    </div>
  );
}
