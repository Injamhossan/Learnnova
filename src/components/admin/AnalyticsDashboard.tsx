'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  TrendingUp, Users, BookOpen, GraduationCap,
  DollarSign, BarChart3, Loader2, ArrowUpRight,
  Calendar
} from 'lucide-react';

interface StatsData {
  totalUsers: number;
  totalInstructors: number;
  activeStudents: number;
  totalEnrollments: number;
  totalCourses: number;
  totalRevenue: number;
}

// Simple bar-chart visualization using CSS
function MiniBarChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-indigo-600 rounded-t-md transition-all duration-500"
            style={{ height: `${(d.count / max) * 100}%`, minHeight: 4 }}
          />
        </div>
      ))}
    </div>
  );
}

const metricCards = (stats: StatsData) => [
  {
    label: 'Enrollment Growth',
    value: stats.totalEnrollments.toLocaleString(),
    sub: 'Total enrollments',
    icon: TrendingUp,
    color: 'bg-indigo-600',
    light: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    change: '+22.1%',
  },
  {
    label: 'Active Students',
    value: stats.activeStudents.toLocaleString(),
    sub: 'Registered students',
    icon: GraduationCap,
    color: 'bg-emerald-600',
    light: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    change: '+15.4%',
  },
  {
    label: 'Popular Courses',
    value: stats.totalCourses.toLocaleString(),
    sub: 'Total courses',
    icon: BookOpen,
    color: 'bg-amber-500',
    light: 'bg-amber-50',
    textColor: 'text-amber-600',
    change: '+5.7%',
  },
  {
    label: 'Revenue Summary',
    value: `$${stats.totalRevenue.toLocaleString()}`,
    sub: 'Read-only · All time',
    icon: DollarSign,
    color: 'bg-violet-600',
    light: 'bg-violet-50',
    textColor: 'text-violet-600',
    change: '+18.9%',
    readOnly: true,
  },
];

export default function AnalyticsDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [enrollmentChart, setEnrollmentChart] = useState<{ date: string; count: number }[]>([]);
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [topInstructors, setTopInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${(session?.user as any)?.backendToken}` },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats);
          setEnrollmentChart(data.enrollmentChart || []);
          setPopularCourses(data.popularCourses || []);
          setTopInstructors(data.topInstructors || []);
        }
      } catch (e) {
        console.error('Failed to fetch stats:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest">LOADING ANALYTICS...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {metricCards(stats).map((card) => (
          <div key={card.label} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:shadow-slate-200/40 transition-all group">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${card.light} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <card.icon className={`w-5 h-5 ${card.textColor}`} />
              </div>
              <div className="flex items-center gap-1">
                {card.readOnly && (
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-wider mr-1">Read-only</span>
                )}
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3 inline -mt-0.5" /> {card.change}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1 tabular-nums">{card.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.sub}</p>
            <p className="text-xs font-semibold text-slate-600 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-bold text-slate-900">Enrollment Growth</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Last 10 days</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          {enrollmentChart.length > 0 ? (
            <>
              <MiniBarChart data={enrollmentChart} />
              <div className="flex justify-between mt-3">
                {enrollmentChart.slice(0, 5).map((d, i) => (
                  <p key={i} className="text-[9px] text-slate-400 font-bold">
                    {new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <div className="h-20 flex items-center justify-center text-slate-300">
              <p className="text-xs font-bold uppercase tracking-widest">No enrollment data yet</p>
            </div>
          )}
        </div>

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
            {popularCourses.slice(0, 5).map((course: any, idx: number) => (
              <div key={course.id} className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-300 w-5 tabular-nums">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{course.title}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    {course.instructor?.user?.fullName} · {course.category?.name || 'Uncategorized'}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0">
                  {(course.totalEnrollments || 0).toLocaleString()}
                </span>
              </div>
            ))}
            {popularCourses.length === 0 && (
              <p className="text-xs text-slate-400 font-bold text-center py-8 uppercase tracking-widest">No courses yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Completion Statistics */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Platform Summary</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completion statistics</p>
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
                <p className="text-sm font-bold text-slate-900">{item.value.toLocaleString()}</p>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((item.value / Math.max(stats.totalUsers, 1)) * 100, 100)}%` }}
                />
              </div>
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
        </div>

        {topInstructors.length === 0 ? (
          <p className="text-xs text-slate-400 font-bold text-center py-8 uppercase tracking-widest">No instructors yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 rounded-xl">
                  {['Instructor', 'Courses', 'Total Students', 'Avg Rating', 'Status'].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-3 first:rounded-l-xl last:rounded-r-xl">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topInstructors.map((inst: any, idx: number) => {
                  const totalStudents = inst.courses?.reduce(
                    (sum: number, c: any) => sum + (c._count?.enrollments || 0), 0
                  ) || inst.totalStudents || 0;
                  const initials = inst.user.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-[10px] font-bold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{inst.user.fullName}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{inst.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-slate-900">{inst._count?.courses ?? inst.totalCourses}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-slate-900">{totalStudents.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500">★</span>
                          <span className="text-sm font-bold text-slate-900">
                            {inst.averageRating > 0 ? inst.averageRating.toFixed(1) : '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          inst.isFeatured
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
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
