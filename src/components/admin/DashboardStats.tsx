'use client';

import { useEffect, useRef } from 'react';
import { Users, GraduationCap, BookOpen, TrendingUp, DollarSign, Star, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface Stats {
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

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  icon: React.ElementType;
  bg: string;
  iconColor: string;
  change?: number;
  delay?: number;
}

function useCountUp(target: number, duration = 900, delay = 0) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    let frame: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * target);
        if (ref.current) ref.current.textContent = current.toLocaleString();
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, [target, duration, delay]);
  return ref;
}

function TrendBadge({ change }: { change?: number }) {
  if (change === undefined || change === null) return null;
  if (change === 0) {
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
        <Minus className="w-2.5 h-2.5" /> 0%
      </span>
    );
  }
  if (change > 0) {
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
        <ArrowUpRight className="w-2.5 h-2.5" /> +{change}%
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
      <ArrowDownRight className="w-2.5 h-2.5" /> {change}%
    </span>
  );
}

function StatCard({ label, value, prefix = '', icon: Icon, bg, iconColor, change, delay = 0 }: StatCardProps) {
  const numRef = useCountUp(value, 900, delay);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <TrendBadge change={change} />
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1 tabular-nums">
        {prefix}<span ref={numRef}>0</span>
      </p>
      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100" />
            <div className="w-12 h-5 rounded-full bg-slate-100" />
          </div>
          <div className="h-8 bg-slate-100 rounded-lg w-3/4 mb-2" />
          <div className="h-3 bg-slate-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardStats({ stats, changes }: { stats: Stats; changes?: Changes }) {
  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      bg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      change: changes?.users,
      delay: 0,
    },
    {
      label: 'Instructors',
      value: stats.totalInstructors,
      icon: Star,
      bg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      delay: 80,
    },
    {
      label: 'Active Students',
      value: stats.activeStudents,
      icon: GraduationCap,
      bg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      delay: 160,
    },
    {
      label: 'Enrollments',
      value: stats.totalEnrollments,
      icon: BookOpen,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: changes?.enrollments,
      delay: 240,
    },
    {
      label: 'Total Courses',
      value: stats.totalCourses,
      icon: TrendingUp,
      bg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      change: changes?.courses,
      delay: 320,
    },
    {
      label: 'Revenue',
      value: stats.totalRevenue,
      prefix: '$',
      icon: DollarSign,
      bg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      delay: 400,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
