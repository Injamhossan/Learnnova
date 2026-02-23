'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Users, BookOpen, DollarSign, Star, ArrowUpRight, Plus,
  TrendingUp, TrendingDown, RefreshCw, Clock, Eye,
} from 'lucide-react';
import InstructorHeader from '@/components/instructor/InstructorHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

// ── Types 
interface Stats {
  totalCourses: number;
  totalStudents: number;
  totalEarnings: number;
  recentEnrollments: {
    user: { fullName: string; email: string; avatarUrl?: string };
    course: { title: string };
    enrolledAt: string;
  }[];
}

// ── Stat Card
function StatCard({
  label, value, icon: Icon, accent, prefix = '', suffix = '',
}: {
  label: string; value: string | number; icon: React.ElementType;
  accent: string; prefix?: string; suffix?: string;
}) {
  return (
    <div className={cn(
      'relative bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden group',
      'hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300'
    )}>
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', accent)}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-slate-900 tabular-nums">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
      {/* Decorative bg icon */}
      <div className="absolute -bottom-3 -right-3 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
        <Icon className="w-20 h-20" />
      </div>
    </div>
  );
}

// ── Skeleton 
function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 rounded-xl animate-pulse', className)} />;
}

// ── Main
export default function InstructorDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const token = (session?.user as any)?.backendToken as string | undefined;

  const fetchStats = useCallback(async (isRefresh = false) => {
    if (!token) return;
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const data = await courseApi.getInstructorStats(token);
      setStats(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, [token]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const avgRating = 4.8;

  return (
    <>
      <InstructorHeader
        title="Dashboard"
        subtitle="Your teaching overview"
        actions={
          <button
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', refreshing && 'animate-spin')} />
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Refresh'}
          </button>
        }
      />

      <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto bg-slate-50/50">

        {/* ── Stats Grid ──────────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Students" value={stats?.totalStudents ?? 0} icon={Users} accent="bg-blue-50 text-blue-600" />
            <StatCard label="Total Courses" value={stats?.totalCourses ?? 0} icon={BookOpen} accent="bg-indigo-50 text-indigo-600" />
            <StatCard label="Total Earnings" value={stats ? `$${stats.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0'} icon={DollarSign} accent="bg-emerald-50 text-emerald-600" />
            <StatCard label="Avg. Rating" value={avgRating} suffix=" ★" icon={Star} accent="bg-amber-50 text-amber-600" />
          </div>
        )}

        {/* ── Quick Actions + Recent Enrollments  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CTA Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden flex flex-col group hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300">
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 60%)' }} />
            <div className="relative z-10 flex-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Share Your Knowledge</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Create a new course and start reaching thousands of learners.
              </p>
              <Link
                href="/instructor/courses/create"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <Plus className="w-3.5 h-3.5" /> Create Course
              </Link>
            </div>
            <div className="flex gap-3 mt-6 relative z-10">
              <Link href="/instructor/courses" className="flex-1 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold py-2.5 rounded-xl transition-all">
                My Courses
              </Link>
              <Link href="/instructor/analytics" className="flex-1 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold py-2.5 rounded-xl transition-all">
                Analytics
              </Link>
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Recent Enrollments</h2>
                <p className="text-xs text-slate-400 mt-0.5">Latest students joining your courses</p>
              </div>
              <Link href="/instructor/students" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-6 py-3.5">
                    <Skeleton className="w-8 h-8 rounded-full !rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-2.5 w-24" />
                    </div>
                  </div>
                ))
              ) : stats?.recentEnrollments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-semibold text-slate-400">No enrollments yet</p>
                  <p className="text-xs text-slate-300 mt-1">Share your courses to attract students.</p>
                </div>
              ) : stats?.recentEnrollments.map((enrollment, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                    {enrollment.user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{enrollment.user.fullName}</p>
                    <p className="text-xs text-slate-400 truncate">{enrollment.course.title}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Permissions info box  */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
            <Eye className="w-4.5 h-4.5 text-amber-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900">Your Permissions</p>
            <p className="text-xs text-amber-700/80 mt-1 leading-relaxed">
              You can create, edit, and publish your own courses · manage lessons & sections · set pricing · view your enrolled students and course analytics.
              You <strong>cannot</strong> access or modify other instructors' content or platform-wide analytics.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
