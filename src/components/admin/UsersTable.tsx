'use client';

import { useState } from 'react';
import { Search, MoreVertical, UserCheck, UserX, Shield, Download, Plus } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Learnova Owner', email: 'admin@learnnova.com', role: 'ADMIN', isActive: true, verified: true, joined: 'Feb 20, 2026' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'INSTRUCTOR', isActive: true, verified: true, joined: 'Feb 17, 2026' },
  { id: '3', name: 'Emma Watson', email: 'emma@example.com', role: 'STUDENT', isActive: true, verified: true, joined: 'Feb 17, 2026' },
  { id: '4', name: 'Carlos Diaz', email: 'carlos@example.com', role: 'INSTRUCTOR', isActive: true, verified: false, joined: 'Feb 17, 2026' },
  { id: '5', name: 'Priya Sharma', email: 'priya@example.com', role: 'STUDENT', isActive: false, verified: true, joined: 'Feb 16, 2026' },
  { id: '6', name: 'Jake Miller', email: 'jake@example.com', role: 'STUDENT', isActive: true, verified: true, joined: 'Feb 16, 2026' },
  { id: '7', name: 'Aisha Bello', email: 'aisha@example.com', role: 'INSTRUCTOR', isActive: true, verified: true, joined: 'Feb 15, 2026' },
  { id: '8', name: 'Liam Park', email: 'liam@example.com', role: 'STUDENT', isActive: true, verified: false, joined: 'Feb 14, 2026' },
];

const roleBadge: Record<string, string> = {
  ADMIN: 'bg-slate-900 text-white shadow-md shadow-slate-200',
  INSTRUCTOR: 'bg-amber-100 text-amber-700 border-amber-200',
  STUDENT: 'bg-blue-100 text-blue-700 border-blue-200',
};

const roleFilters = ['All', 'ADMIN', 'INSTRUCTOR', 'STUDENT'];

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filter === 'All' || u.role === filter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      {/* Page header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
         <div className="flex flex-wrap gap-2">
            {roleFilters.map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === r
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {r === 'All' ? 'ALL USERS' : r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Download className="w-4 h-4" />
                EXPORT
             </button>
             <button className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <Plus className="w-4 h-4" />
                ADD USER
             </button>
          </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="relative max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input
                 type="text"
                 placeholder="Search by name or email..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 w-full transition-all"
               />
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50">
                {['User Profile', 'Email Address', 'Permission Role', 'Current Status', 'Email Verify', 'Created At', ''].map((h) => (
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
              {filtered.map((user) => {
                const initials = user.name.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0, 2);
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-lg shadow-slate-200">
                          {initials}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 group-hover:text-black transition-colors">
                                {user.name}
                              </span>
                              {user.role === 'ADMIN' && (
                                <Shield className="w-3.5 h-3.5 text-slate-900 fill-slate-900/10" />
                              )}
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: #{user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-slate-600">{user.email}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${roleBadge[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold ${
                          user.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.isActive ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      {user.verified ? (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                           <UserCheck className="w-4 h-4" />
                           VERIFIED
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs italic">
                           <UserX className="w-4 h-4" />
                           PENDING
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-slate-500 text-xs font-bold tabular-nums">{user.joined}</td>
                    <td className="px-8 py-5">
                      <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-slate-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">DISPLAYING {filtered.length} OF {mockUsers.length} TOTAL USERS</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-50">PREVIOUS</button>
            <div className="flex gap-1">
               {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      p === 1 ? 'bg-slate-900 text-white shadow-md shadow-slate-200' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
            </div>
            <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
