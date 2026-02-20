'use client';

import { useEffect, useState } from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp, DollarSign, Star } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalInstructors: number;
  activeStudents: number;
  totalEnrollments: number;
  totalCourses: number;
  totalRevenue: number;
}

const statCards = (s: Stats) => [
  {
    label: 'Total Users',
    value: s.totalUsers.toLocaleString(),
    icon: Users,
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    change: '+12.5%',
    positive: true,
  },
  {
    label: 'Instructors',
    value: s.totalInstructors.toLocaleString(),
    icon: Star,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    change: '+8.2%',
    positive: true,
  },
  {
    label: 'Active Students',
    value: s.activeStudents.toLocaleString(),
    icon: GraduationCap,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    change: '+15.4%',
    positive: true,
  },
  {
    label: 'Enrollments',
    value: s.totalEnrollments.toLocaleString(),
    icon: BookOpen,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    change: '+22.1%',
    positive: true,
  },
  {
    label: 'Total Courses',
    value: s.totalCourses.toLocaleString(),
    icon: TrendingUp,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    change: '+5.7%',
    positive: true,
  },
  {
    label: 'Revenue',
    value: `$${s.totalRevenue.toLocaleString()}`,
    icon: DollarSign,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    change: '+18.9%',
    positive: true,
  },
];

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetching
    setTimeout(() => {
      setStats({
        totalUsers: 12847,
        totalInstructors: 342,
        activeStudents: 11205,
        totalEnrollments: 48392,
        totalCourses: 284,
        totalRevenue: 284920,
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 animate-pulse shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards(stats).map((card) => (
        <div
          key={card.label}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all group cursor-default"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                card.positive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {card.positive ? '↑' : '↓'} {card.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
