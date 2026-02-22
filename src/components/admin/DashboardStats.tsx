'use client';

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
  },
  {
    label: 'Instructors',
    value: s.totalInstructors.toLocaleString(),
    icon: Star,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Active Students',
    value: s.activeStudents.toLocaleString(),
    icon: GraduationCap,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    label: 'Enrollments',
    value: s.totalEnrollments.toLocaleString(),
    icon: BookOpen,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Total Courses',
    value: s.totalCourses.toLocaleString(),
    icon: TrendingUp,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    label: 'Revenue',
    value: `$${s.totalRevenue.toLocaleString()}`,
    icon: DollarSign,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

export default function DashboardStats({ stats }: { stats: Stats }) {
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
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
