'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Wallet, TrendingUp, Calendar, RefreshCw, DollarSign, ArrowUpRight } from 'lucide-react';
import InstructorHeader from '@/components/instructor/InstructorHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Stats {
  totalEarnings: number;
  totalStudents: number;
  totalCourses: number;
  recentEnrollments: {
    user: { fullName: string; email: string };
    course: { title: string };
    enrolledAt: string;
  }[];
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 rounded-xl animate-pulse', className)} />;
}

export default function EarningsPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const token = (session?.user as any)?.backendToken as string | undefined;

  const fetchStats = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await courseApi.getInstructorStats(token);
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const totalRevenue = stats?.totalEarnings ?? 0;
  const monthlyEstimate = totalRevenue / 12;

  // Mini bar chart from recent enrollments per day (last 7 days)
  const DAYS = 7;
  const barData = Array.from({ length: DAYS }, (_, i) => {
    if (!stats?.recentEnrollments.length) return 0;
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - (DAYS - 1 - i));
    const dayStr = dayAgo.toDateString();
    return stats.recentEnrollments.filter(e => new Date(e.enrolledAt).toDateString() === dayStr).length;
  });
  const maxBar = Math.max(...barData, 1);

  return (
    <>
      <InstructorHeader
        title="Earnings"
        subtitle="Revenue generated from your courses"
        actions={
          <button onClick={fetchStats} disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50">
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            Refresh
          </button>
        }
      />
      <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto bg-slate-50/50">

        {/* Top cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Balance card — dark */}
          <div className="bg-gradient-to-br from-[#0f0f14] to-[#1c1a2e] rounded-2xl p-6 text-white relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 85% 15%, #6366f1, transparent 60%)' }} />
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Earnings</span>
              </div>
              {loading ? (
                <Skeleton className="h-10 w-36 bg-white/10" />
              ) : (
                <h2 className="text-4xl font-bold tabular-nums">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              )}
              <p className="text-white/40 text-sm mt-2 italic">Cumulative lifetime revenue</p>
            </div>
            <button className="mt-4 w-full relative z-10 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-600/30">
              Request Withdrawal
            </button>
          </div>

          {/* Monthly revenue */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">↑ Live</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Monthly</p>
              {loading ? <Skeleton className="h-8 w-28 mt-1" /> : (
                <p className="text-3xl font-bold text-slate-900 tabular-nums">
                  ${monthlyEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
            {/* Mini bar */}
            <div className="flex items-end gap-1 h-10 pt-4 border-t border-slate-50 mt-4">
              {barData.map((v, i) => (
                <div key={i} className="flex-1 bg-emerald-100 hover:bg-emerald-500 rounded-t-sm transition-colors" style={{ height: `${(v / maxBar) * 100}%`, minHeight: 4 }} />
              ))}
            </div>
          </div>

          {/* Next payout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-blue-600">This Month</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Students</p>
              {loading ? <Skeleton className="h-8 w-20 mt-1" /> : (
                <p className="text-3xl font-bold text-slate-900 tabular-nums">{stats?.totalStudents ?? 0}</p>
              )}
            </div>
            <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-4">
              <DollarSign className="w-4 h-4 text-slate-300" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Courses</p>
                <p className="font-bold text-slate-900">{stats?.totalCourses ?? 0} course{stats?.totalCourses !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Recent Sales</h2>
              <p className="text-xs text-slate-400 mt-0.5">Latest student purchases on your courses</p>
            </div>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14" />)}
            </div>
          ) : !stats?.recentEnrollments.length ? (
            <div className="py-16 text-center text-slate-400">
              <Wallet className="w-10 h-10 mx-auto mb-3 text-slate-200" />
              <p className="text-sm font-semibold">No sales yet</p>
              <p className="text-xs mt-1">Publish courses to start earning.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {stats.recentEnrollments.map((e, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                    {e.user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{e.user.fullName}</p>
                    <p className="text-xs text-slate-400 truncate">{e.course.title}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-slate-400">
                      {new Date(e.enrolledAt).toLocaleDateString()}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
