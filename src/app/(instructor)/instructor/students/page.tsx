'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Mail, BookOpen, Clock, Users, RefreshCw } from 'lucide-react';
import InstructorHeader from '@/components/instructor/InstructorHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Enrollment {
  user: { fullName: string; email: string; avatarUrl?: string };
  course: { title: string };
  enrolledAt: string;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 rounded-xl animate-pulse', className)} />;
}

export default function InstructorStudentsPage() {
  const { data: session } = useSession();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const token = (session?.user as any)?.backendToken as string | undefined;

  const fetchStudents = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await courseApi.getInstructorStats(token);
      setEnrollments(data.recentEnrollments ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const filtered = enrollments.filter((e) =>
    e.user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    e.user.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.course.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <InstructorHeader
        title="My Students"
        subtitle={`${enrollments.length} enrolled across your courses`}
        actions={
          <button onClick={fetchStudents} disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50">
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            Refresh
          </button>
        }
      />
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-slate-50/50 space-y-5">

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {['Student', 'Course', 'Enrolled On'].map(h => (
                  <th key={h} className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-9 h-9 rounded-full !rounded-full" />
                        <div className="space-y-1.5">
                          <Skeleton className="h-3 w-28" />
                          <Skeleton className="h-2.5 w-36" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-3 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-3 w-24" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-500">
                        {search ? 'No students match your search' : 'No students yet'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {search ? 'Try a different keyword.' : 'Publish courses to attract students.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((e, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                          {e.user.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{e.user.fullName}</p>
                          <p className="text-xs text-slate-400">{e.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{e.course.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(e.enrolledAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
