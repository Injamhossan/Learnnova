'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  TrendingUp, Users, BookOpen, GraduationCap,
  DollarSign, BarChart3, Loader2, ArrowUpRight, ArrowDownRight,
  RefreshCw, Star, Minus, AlertTriangle
} from 'lucide-react';
import EnrollmentChart, { EnrollmentChartSkeleton } from './EnrollmentChart';

interface StatsData {
  totalUsers: number;
  totalInstructors: number;
  activeStudents: number;
  totalEnrollments: number;
  totalCourses: number;
  totalRevenue: number;
}

interface Changes {
  enrollments?: number;
  users?: number;
  courses?: number;
}

interface FullData {
  stats: StatsData;
  changes: Changes;
  enrollmentChart: { date: string; count: number }[];
  popularCourses: any[];
  topInstructors: any[];
  recentUsers: any[];
  days: number;
}

function TrendBadge({ change }: { change?: number }) {
  if (change === undefined || change === null) return null;
  if (change === 0) return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
      <Minus className="w-2.5 h-2.5" /> 0%
    </span>
  );
  if (change > 0) return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
      <ArrowUpRight className="w-2.5 h-2.5" /> +{change}%
    </span>
  );
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
      <ArrowDownRight className="w-2.5 h-2.5" /> {change}%
    </span>
  );
}

const metricCards = (stats: StatsData, changes: Changes) => [
  {
    label: 'Total Enrollments',
    value: stats.totalEnrollments.toLocaleString(),
    sub: 'Platform-wide enrollments',
    icon: TrendingUp,
    color: 'bg-indigo-600',
    light: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    change: changes.enrollments,
  },
  {
    label: 'Active Students',
    value: stats.activeStudents.toLocaleString(),
    sub: 'Registered students',
    icon: GraduationCap,
    color: 'bg-emerald-600',
    light: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    change: changes.users,
  },
  {
    label: 'Total Courses',
    value: stats.totalCourses.toLocaleString(),
    sub: 'Published & draft courses',
    icon: BookOpen,
    color: 'bg-amber-500',
    light: 'bg-amber-50',
    textColor: 'text-amber-600',
    change: changes.courses,
  },
  {
    label: 'Revenue',
    value: `$${stats.totalRevenue.toLocaleString()}`,
    sub: 'Completed payments · All time',
    icon: DollarSign,
    color: 'bg-violet-600',
    light: 'bg-violet-50',
    textColor: 'text-violet-600',
    change: undefined,
    readOnly: true,
  },
];

export default function AnalyticsDashboard() {
  const { data: session } = useSession();
  const [fullData, setFullData] = useState<FullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [days, setDays] = useState(10);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async (daysParam = days, isRefresh = false) => {
    if (!session) return;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/stats?days=${daysParam}`, {
        headers: { Authorization: `Bearer ${(session?.user as any)?.backendToken}` },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch analytics data');
      const data = await res.json();
      setFullData(data);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [session, days]);

  useEffect(() => {
    fetchData(days, false);
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDaysChange = (d: number) => {
    setDays(d);
    fetchData(d, true);
  };

  const handleRefresh = () => fetchData(days, true);

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Metric card skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-100" />
                <div className="w-16 h-5 rounded-full bg-slate-100" />
              </div>
              <div className="h-8 bg-slate-100 rounded-lg w-2/3 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-1" />
              <div className="h-3 bg-slate-100 rounded w-1/3" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnrollmentChartSkeleton />
          <div className="bg-white border border-slate-200 rounded-3xl p-6 animate-pulse">
            <div className="h-4 w-32 bg-slate-100 rounded mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <div className="w-6 h-4 bg-slate-100 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="h-2 bg-slate-100 rounded w-1/2" />
                </div>
                <div className="w-8 h-4 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !fullData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700 mb-1">Failed to load analytics</p>
          <p className="text-xs text-slate-400">{error || 'No data available'}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      </div>
    );
  }

  const { stats, changes, enrollmentChart, popularCourses, topInstructors } = fullData;
  const cards = metricCards(stats, changes || {});

  return (
    <div className="space-y-8">
      {/* Header row with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Analytics Overview · {days} day window
          </p>
          {lastUpdated && (
            <p className="text-[11px] text-slate-400 mt-0.5">
              Last updated: {lastUpdated.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:shadow-slate-200/40 transition-all group"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${card.light} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <card.icon className={`w-5 h-5 ${card.textColor}`} />
              </div>
              <div className="flex items-center gap-1">
                {card.readOnly && (
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-wider mr-1">
                    Read-only
                  </span>
                )}
                <TrendBadge change={card.change} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1 tabular-nums">{card.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.sub}</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart with time range */}
        <EnrollmentChart
          data={enrollmentChart}
          days={days}
          onDaysChange={handleDaysChange}
        />

        {/* Popular Courses */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-bold text-slate-900">Popular Courses</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">By enrollments</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="space-y-3">
            {popularCourses.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold text-center py-8 uppercase tracking-widest">No courses yet</p>
            ) : (
              popularCourses.slice(0, 5).map((course: any, idx: number) => (
                <div key={course.id} className="flex items-center gap-4 group">
                  <span className={`text-[10px] font-bold w-5 tabular-nums shrink-0 ${idx === 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
                      {course.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      {course.instructor?.user?.fullName || '—'} · {course.category?.name || 'Uncategorized'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900 tabular-nums block">
                      {(course.totalEnrollments || 0).toLocaleString()}
                    </span>
                    {course.averageRating > 0 && (
                      <span className="text-[10px] text-amber-500 font-bold flex items-center justify-end gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        {course.averageRating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Platform Summary */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Platform Summary</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Distribution statistics</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: stats.totalUsers, color: 'bg-indigo-600' },
            { label: 'Instructors', value: stats.totalInstructors, color: 'bg-amber-500' },
            { label: 'Students', value: stats.activeStudents, color: 'bg-emerald-600' },
            { label: 'Enrollments', value: stats.totalEnrollments, color: 'bg-violet-600' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 tabular-nums">{item.value.toLocaleString()}</p>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((item.value / Math.max(stats.totalUsers, 1)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {stats.totalUsers > 0 ? `${Math.round((item.value / stats.totalUsers) * 100)}% of total users` : '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor Performance */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Instructor Performance</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Top instructors by rating</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {topInstructors.length} instructors
          </span>
        </div>

        {topInstructors.length === 0 ? (
          <p className="text-xs text-slate-400 font-bold text-center py-8 uppercase tracking-widest">No instructors yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 rounded-xl">
                  {['Instructor', 'Courses', 'Total Students', 'Avg Rating', 'Status'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-3 first:rounded-l-xl last:rounded-r-xl"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topInstructors.map((inst: any) => {
                  const totalStudents =
                    inst.courses?.reduce((sum: number, c: any) => sum + (c._count?.enrollments || 0), 0) ||
                    inst.totalStudents ||
                    0;
                  const initials = inst.user.fullName
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {inst.user.avatarUrl ? (
                            <img
                              src={inst.user.avatarUrl}
                              alt={inst.user.fullName}
                              className="w-8 h-8 rounded-xl object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-[10px] font-bold shrink-0">
                              {initials}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-slate-900 text-sm group-hover:text-slate-700">
                              {inst.user.fullName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold">{inst.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          {inst._count?.courses ?? inst.totalCourses ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          {totalStudents.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {inst.averageRating > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-slate-900 tabular-nums">
                              {inst.averageRating.toFixed(1)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-bold">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                            inst.isFeatured
                              ? 'bg-amber-50 text-amber-700 border-amber-100'
                              : 'bg-slate-50 text-slate-500 border-slate-100'
                          }`}
                        >
                          {inst.isFeatured ? 'FEATURED' : 'ACTIVE'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
