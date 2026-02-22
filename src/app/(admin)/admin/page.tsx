'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import EnrollmentChart from '@/components/admin/EnrollmentChart';
import RecentUsers from '@/components/admin/RecentUsers';
import PopularCourses from '@/components/admin/PopularCourses';
import { Loader2 } from 'lucide-react';

export interface DashboardData {
  stats: {
    totalUsers: number;
    totalInstructors: number;
    activeStudents: number;
    totalEnrollments: number;
    totalCourses: number;
    totalRevenue: number;
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
}

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.backendToken}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <>
        <AdminHeader title="Admin Dashboard" subtitle="Platform overview and key metrics" />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <AdminHeader title="Admin Dashboard" subtitle="Platform overview and key metrics" />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <p className="text-xs font-bold uppercase tracking-widest text-red-500">{error || 'No data available'}</p>
            <button
              onClick={fetchDashboard}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Admin Dashboard" subtitle="Platform overview and key metrics" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats Row */}
        <DashboardStats stats={data.stats} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnrollmentChart data={data.enrollmentChart} />
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
