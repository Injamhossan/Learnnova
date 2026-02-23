'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats, { DashboardStatsSkeleton } from '@/components/admin/DashboardStats';
import EnrollmentChart, { EnrollmentChartSkeleton } from '@/components/admin/EnrollmentChart';
import RecentUsers from '@/components/admin/RecentUsers';
import PopularCourses from '@/components/admin/PopularCourses';
import { Loader2, RefreshCw, AlertTriangle } from 'lucide-react';

export interface DashboardData {
  stats: {
    totalUsers: number;
    totalInstructors: number;
    activeStudents: number;
    totalEnrollments: number;
    totalCourses: number;
    totalRevenue: number;
  };
  changes?: {
    enrollments?: number;
    users?: number;
    courses?: number;
  };
  recentUsers: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    avatarUrl?: string;
    createdAt: string;
  }[];
  popularCourses: {
    id: string;
    title: string;
    totalEnrollments: number;
    averageRating: number;
    price: number;
    instructor?: { user?: { fullName: string } };
    category?: { name: string };
  }[];
  enrollmentChart: { date: string; count: number }[];
  topInstructors: any[];
  days?: number;
}

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [days, setDays] = useState(10);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboard = useCallback(async (daysParam = days, isRefresh = false) => {
    if (!session) return;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/stats?days=${daysParam}`, {
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [session, days]);

  useEffect(() => {
    fetchDashboard(days, false);
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  // When days change, refetch
  const handleDaysChange = (d: number) => {
    setDays(d);
    fetchDashboard(d, true);
  };

  // Manual refresh
  const handleRefresh = () => {
    fetchDashboard(days, true);
  };

  const headerRight = (
    <div className="flex items-center gap-3">
      {lastUpdated && (
        <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
          Updated {lastUpdated.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
      <button
        onClick={handleRefresh}
        disabled={refreshing || loading}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 shadow-sm"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        {refreshing ? 'Refreshing…' : 'Refresh'}
      </button>
    </div>
  );

  if (loading) {
    return (
      <>
        <AdminHeader title="Admin Dashboard" subtitle="Platform overview and key metrics" />
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <DashboardStatsSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EnrollmentChartSkeleton />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm animate-pulse">
              <div className="h-4 w-24 bg-slate-100 rounded mb-6" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                    <div className="h-2 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm animate-pulse h-48" />
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <AdminHeader title="Admin Dashboard" subtitle="Platform overview and key metrics" />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4 text-slate-400 max-w-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Failed to load dashboard</p>
              <p className="text-xs text-slate-400">{error || 'No data available'}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title="Admin Dashboard"
        subtitle="Platform overview and key metrics"
        actions={headerRight}
      />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats Row */}
        <DashboardStats stats={data.stats} changes={data.changes} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnrollmentChart
              data={data.enrollmentChart}
              days={days}
              onDaysChange={handleDaysChange}
            />
          </div>
          <div>
            <RecentUsers users={data.recentUsers} />
          </div>
        </div>

        {/* Popular Courses */}
        <PopularCourses courses={data.popularCourses} />
      </div>
    </>
  );
}
