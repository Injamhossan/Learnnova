'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  BookOpen, Users, DollarSign, Star, Plus, Edit3, Trash2,
  Eye, LayoutGrid, List, Search, Filter, Globe, Lock,
  MoreHorizontal, TrendingUp, Loader2, AlertCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchMyCourses, deleteCourse, Course } from '@/store/coursesSlice';
import { addToast, toast } from '@/store/uiSlice';
import { cn } from '@/lib/utils';

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border',
      published
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-slate-100 text-slate-500 border-slate-200'
    )}>
      {published ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-video bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-slate-100 rounded w-16" />
          <div className="h-3 bg-slate-100 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// ── Course Grid Card ──────────────────────────────────────────────────────────
function CourseCard({ course, onDelete }: { course: Course; onDelete: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const enrollments = course._count?.enrollments ?? course.totalEnrollments ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 group flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-slate-300" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge published={course.isPublished} />
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            {course.level}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-900 line-clamp-2 text-sm leading-snug mb-3 flex-1">
          {course.title}
        </h3>

        {course.category && (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md w-fit mb-3">
            {course.category.name}
          </span>
        )}

        <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              {enrollments.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/instructor/courses/${course.id}/edit`}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => onDelete(course.id)}
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Course List Row ───────────────────────────────────────────────────────────
function CourseRow({ course, onDelete }: { course: Course; onDelete: (id: string) => void }) {
  const enrollments = course._count?.enrollments ?? course.totalEnrollments ?? 0;
  const revenue = course.price * enrollments;

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            {course.thumbnailUrl ? (
              <img src={course.thumbnailUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm line-clamp-1">{course.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {course.category?.name ?? '—'} · {course.level}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4"><StatusBadge published={course.isPublished} /></td>
      <td className="px-6 py-4 text-sm font-bold text-slate-700 tabular-nums">
        {enrollments.toLocaleString()}
      </td>
      <td className="px-6 py-4 text-sm font-bold text-emerald-700 tabular-nums">
        ${revenue.toLocaleString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/instructor/courses/${course.id}/edit`}
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all">
            <Edit3 className="w-3.5 h-3.5" />
          </Link>
          <button onClick={() => onDelete(course.id)}
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CourseList() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { myCourses, loading, deleting } = useAppSelector((s) => s.courses);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const token = (session?.user as any)?.backendToken as string | undefined;

  useEffect(() => {
    if (token) dispatch(fetchMyCourses(token));
  }, [token, dispatch]);

  const filtered = myCourses
    .filter((c) => {
      if (filter === 'published') return c.isPublished;
      if (filter === 'draft') return !c.isPublished;
      return true;
    })
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    setDeletingId(id);
    const result = await dispatch(deleteCourse({ token, id }));
    setDeletingId(null);
    if (deleteCourse.fulfilled.match(result)) {
      dispatch(addToast(toast.success('Course deleted successfully')));
    } else {
      dispatch(addToast(toast.error('Failed to delete course', result.payload as string)));
    }
  };

  return (
    <div className="space-y-6">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all w-56"
            />
          </div>
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-slate-200 bg-white rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all cursor-pointer"
          >
            <option value="all">All Courses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          {/* View toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
            <button onClick={() => setView('grid')}
              className={cn('p-2 rounded-lg transition-all', view === 'grid' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700')}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')}
              className={cn('p-2 rounded-lg transition-all', view === 'list' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700')}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Link
          href="/instructor/courses/create"
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create Course
        </Link>
      </div>

      {/* Stats summary bar */}
      {!loading && myCourses.length > 0 && (
        <div className="flex gap-6 text-xs font-bold text-slate-500">
          <span>{myCourses.length} total</span>
          <span className="text-emerald-600">{myCourses.filter(c => c.isPublished).length} published</span>
          <span className="text-slate-400">{myCourses.filter(c => !c.isPublished).length} drafts</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-100 rounded-xl" />)}
          </div>
        )
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-base font-bold text-slate-700 mb-1">
            {search ? 'No courses match your search' : 'No courses yet'}
          </h3>
          <p className="text-sm text-slate-400 mb-5">
            {search ? 'Try a different keyword.' : 'Create your first course to start teaching.'}
          </p>
          {!search && (
            <Link href="/instructor/courses/create"
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
              <Plus className="w-4 h-4" /> Create First Course
            </Link>
          )}
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {['Course', 'Status', 'Enrollments', 'Revenue', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((course) => (
                <CourseRow key={course.id} course={course} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
