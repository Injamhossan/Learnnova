'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  BookOpen, Award, Clock, TrendingUp, Play, ChevronRight,
  RefreshCw, Flame, Target, Star, Loader2,
} from 'lucide-react';
import Link from 'next/link';
import StudentHeader from '@/components/student/StudentHeader';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Enrollment {
  id: string;
  progressPercentage: number;
  isCompleted: boolean;
  enrolledAt: string;
  lastAccessedAt?: string;
  course: {
    id: string; title: string; thumbnailUrl?: string;
    level: string; durationMinutes?: number;
    instructor: { user: { fullName: string } };
  };
}

interface Stats {
  inProgress: number;
  completed: number;
  certificates: number;
  totalHours: number;
  streak: number;
  lessonsThisWeek: number;
  weeklyGoal: number;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-slate-100 rounded-xl animate-pulse', className)} />;
}

function StatCard({
  icon: Icon, label, value, sublabel, color,
}: {
  icon: React.ElementType; label: string; value: string | number; sublabel?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:shadow-md hover:shadow-slate-200/50 transition-all">
      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{label}</p>
        {sublabel && <p className="text-[10px] text-slate-400 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

export default function StudentDashboardPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const token = user?.backendToken as string | undefined;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [stats, setStats] = useState<Stats>({ 
    inProgress: 0, 
    completed: 0, 
    certificates: 0, 
    totalHours: 0, 
    streak: 0,
    lessonsThisWeek: 0,
    weeklyGoal: 5 
  });
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Fetch student's enrollments and stats
      const [enrollData, statsData] = await Promise.all([
        courseApi.getMyEnrollments(token),
        courseApi.getDashboardStats(token)
      ]);

      const list: Enrollment[] = enrollData?.enrollments ?? enrollData ?? [];
      setEnrollments(list);
      
      setStats({
        ...statsData,
        totalHours: Math.round(list.reduce((a, e) => a + (e.course.durationMinutes ?? 0), 0) / 60),
      });
    } catch {
      // silently fail — empty state handled below
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const inProgress = enrollments.filter(e => !e.isCompleted);
  const completed  = enrollments.filter(e => e.isCompleted).slice(0, 3);

  return (
    <>
      <StudentHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] ?? 'Student'} 👋`}
        subtitle="Here's your learning progress at a glance"
        actions={
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            <span className="hidden sm:block">Refresh</span>
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24" />)
          ) : (
            <>
              <StatCard icon={BookOpen}    label="In Progress"   value={stats.inProgress}   color="bg-blue-500"    sublabel="Active courses" />
              <StatCard icon={Award}       label="Completed"     value={stats.completed}    color="bg-emerald-500" sublabel="Finished courses" />
              <StatCard icon={Star}        label="Certificates"  value={stats.certificates} color="bg-amber-500"   sublabel="Earned" />
              <StatCard icon={Clock}       label="Hours Learned" value={stats.totalHours}   color="bg-purple-500"  sublabel="Total time" />
            </>
          )}
        </div>

        {/* ── Daily Streak Banner ── */}
        {!loading && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10">
              <Flame className="w-32 h-32 text-white" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{stats.streak} Day Streak 🔥</p>
                <p className="text-white/70 text-xs font-medium">
                  {stats.streak > 0 
                    ? 'Great progress! Keep learning to increase your streak.' 
                    : 'Start learning today to begin your streak!'}
                </p>
              </div>
            </div>
            <Link href="/student/courses"
              className="shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all">
              Continue <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Continue Learning ── */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Continue Learning</h2>
                <p className="text-xs text-slate-400 mt-0.5">{inProgress.length} active {inProgress.length === 1 ? 'course' : 'courses'}</p>
              </div>
              <Link href="/student/courses" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                All courses <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-50">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-5">
                    <Skeleton className="w-16 h-12 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-3/4" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                ))
              ) : inProgress.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">No courses in progress</p>
                  <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
                    Browse Courses <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                inProgress.slice(0, 5).map(e => (
                  <div key={e.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      {e.course.thumbnailUrl ? (
                        <img src={e.course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{e.course.title}</p>
                      <p className="text-[10px] text-slate-400 mb-2">{e.course.instructor?.user?.fullName}</p>
                      <div className="flex items-center gap-3">
                        <ProgressBar value={e.progressPercentage} />
                        <span className="text-xs font-bold text-blue-600 shrink-0">{e.progressPercentage}%</span>
                      </div>
                    </div>
                    <Link href={`/courses/${e.course.id}`}
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      <Play className="w-4 h-4 fill-current" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">
            {/* Goals */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-sm text-slate-900">Weekly Goal</h3>
              </div>
              <div className="text-center py-2">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#f1f5f9" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#3b82f6" strokeWidth="3" 
                      strokeDasharray={`${(stats.lessonsThisWeek / stats.weeklyGoal) * 100}, 100`} 
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">
                      {Math.round((stats.lessonsThisWeek / stats.weeklyGoal) * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-700">{stats.lessonsThisWeek} of {stats.weeklyGoal} lessons</p>
                <p className="text-xs text-slate-400 mt-0.5">Goal: {stats.weeklyGoal} lessons/week</p>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Completed Courses</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {loading ? (
                  [...Array(2)].map((_, i) => <div key={i} className="p-4"><Skeleton className="h-10" /></div>)
                ) : completed.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-xs text-slate-400 font-medium">No courses completed yet</p>
                  </div>
                ) : (
                  completed.map(e => (
                    <div key={e.id} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700 line-clamp-2 flex-1">{e.course.title}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
