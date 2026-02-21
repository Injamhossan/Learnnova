'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, MoreVertical, UserCheck, UserX, Shield, Download, Plus, Trash2, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: 'bg-indigo-600 text-white shadow-md shadow-indigo-100',
  ADMIN: 'bg-slate-900 text-white shadow-md shadow-slate-200',
  INSTRUCTOR: 'bg-amber-100 text-amber-700 border-amber-200',
  STUDENT: 'bg-blue-100 text-blue-700 border-blue-200',
};

const roleFilters = ['All', 'SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT'];

export default function UsersTable() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const currentUserRole = (session?.user as any)?.role?.toUpperCase();
  const isSuperAdmin = currentUserRole === 'SUPER_ADMIN';

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const roleParam = filter !== 'All' ? `&role=${filter}` : '';
      const res = await fetch(`${apiUrl}/api/admin/users?page=${page}&search=${search}${roleParam}`, {
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalPages(data.pages);
        setTotalUsers(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search, filter, session]);

  useEffect(() => {
    if (session) fetchUsers();
  }, [fetchUsers, session]);

  const toggleStatus = async (userId: string) => {
    setUpdatingId(userId);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    if (!isSuperAdmin) return;
    setUpdatingId(userId);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Failed to update role:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!isSuperAdmin || !confirm('Are you sure you want to delete this user?')) return;
    setUpdatingId(userId);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
         <div className="flex flex-wrap gap-2">
            {roleFilters.map((r) => (
              <button
                key={r}
                onClick={() => { setFilter(r); setPage(1); }}
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
                 onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                 className="bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 w-full transition-all"
               />
            </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-bold text-sm">FETCHING USERS...</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50">
                  {['User Profile', 'Email Address', 'Permission Role', 'Current Status', 'Email Verify', 'Created At', 'Actions'].map((h) => (
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
                {users.map((user) => {
                  const initials = user.fullName.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr key={user.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-lg ${user.role === 'SUPER_ADMIN' ? 'bg-indigo-600 shadow-indigo-100' : 'bg-slate-900 shadow-slate-200'}`}>
                            {initials}
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">
                                  {user.fullName}
                                </span>
                                {user.role === 'SUPER_ADMIN' ? (
                                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                                ) : user.role === 'ADMIN' && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                                )}
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: #{user.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-medium text-slate-600">{user.email}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${roleBadge[user.role]}`}>
                            {user.role}
                          </span>
                          {isSuperAdmin && updatingId !== user.id && (
                            <select 
                              className="text-[10px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-100"
                              value={user.role}
                              onChange={(e) => updateRole(user.id, e.target.value)}
                            >
                              <option value="STUDENT">SET STUDENT</option>
                              <option value="INSTRUCTOR">SET INSTRUCTOR</option>
                              <option value="ADMIN">SET ADMIN</option>
                              <option value="SUPER_ADMIN">SET SUPER ADMIN</option>
                            </select>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <button 
                          onClick={() => toggleStatus(user.id)}
                          disabled={updatingId === user.id}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold transition-all hover:scale-105 active:scale-95 ${
                            user.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.isActive ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                        </button>
                      </td>
                      <td className="px-8 py-5">
                        {user.isEmailVerified ? (
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
                      <td className="px-8 py-5 text-slate-500 text-xs font-bold tabular-nums">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          {isSuperAdmin && user.id !== (session?.user as any)?.id && (
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-all border border-red-100 shadow-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all shadow-sm border border-slate-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {loading ? 'LOADING CONTENTS...' : `DISPLAYING ${users.length} OF ${totalUsers} TOTAL USERS`}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-50"
            >
              PREVIOUS
            </button>
            <div className="flex gap-1">
               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                        p === page ? 'bg-slate-900 text-white shadow-md shadow-slate-200' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  );
               })}
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-50"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
