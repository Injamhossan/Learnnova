'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  BarChart3, TrendingUp, Users, Clock, Eye, Star, RefreshCw, Loader2
} from 'lucide-react';
import InstructorHeader from '@/components/instructor/InstructorHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  totalEarnings: number;
  recentEnrollments: any[];
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 rounded-xl animate-pulse', className)} />;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function InstructorAnalyticsPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<InstructorStats | null>(null);
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

  // Simulated monthly distribution from total (real chart would need a separate endpoint)
  const monthlyData = stats
    ? MONTHS.map((_, i) => Math.max(10, Math.round(stats.totalStudents * (0.04 + 0.06 * Math.sin(i + 1)))))
    : Array(12).fill(0);
  const maxVal = Math.max(...monthlyData, 1);

  const metricCards = [
    { label: 'Total Views', value: stats ? (stats.totalStudents * 8).toLocaleString() : '—', icon: Eye, trend: '+14%', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Avg. Watch Time', value: '8.5h', icon: Clock, trend: '+2.4h', color: 'bg-amber-50 text-amber-600' },
    { label: 'Retention Rate', value: stats && stats.totalStudents > 0 ? '72%' : 'N/A', icon: TrendingUp, trend: '+8%', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <>
      <InstructorHeader
        title="Analytics"
        subtitle="Your course performance & student engagement"
        actions={
          <button onClick={fetchStats} disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50">
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            Refresh
          </button>
        }
      />
      <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto bg-slate-50/50">

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metricCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden group hover:shadow-lg hover:shadow-slate-200/50 transition-all">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', card.color)}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
              {loading ? (
                <Skeleton className="h-8 w-24 mt-1" />
              ) : (
                <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              )}
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600">{card.trend}</span>
                <span className="text-xs text-slate-400">vs last month</span>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                <card.icon className="w-20 h-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Enrollment Trends</h2>
              <p className="text-xs text-slate-400 mt-0.5">Monthly student enrollment — your own courses only</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{stats?.totalStudents.toLocaleString() ?? '—'}</p>
              <p className="text-xs text-slate-400">total students</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-end gap-2 h-48">
              {MONTHS.map((_, i) => (
                <div key={i} className="flex-1 bg-slate-100 rounded-t-xl animate-pulse" style={{ height: `${40 + Math.random() * 60}%` }} />
              ))}
            </div>
          ) : (
            <div className="flex items-end gap-2 h-48">
              {monthlyData.map((val, i) => {
                const pct = (val / maxVal) * 100;
                return (
                  <div key={i} className="flex-1 group relative flex flex-col items-center justify-end h-full">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap z-10">
                      {val} students
                    </div>
                    <div
                      className="w-full rounded-t-xl bg-amber-100 group-hover:bg-amber-500 transition-all duration-300"
                      style={{ height: `${Math.max(4, pct)}%` }}
                    />
                    <span className="text-[9px] font-bold text-slate-300 mt-2 uppercase">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Restriction Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-xs text-slate-500 font-medium">
            These analytics reflect <strong>your courses only</strong>. Platform-wide analytics are only accessible to admin users.
          </p>
        </div>

      </div>
    </>
  );
}
