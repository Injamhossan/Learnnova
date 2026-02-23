'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Save, Globe, Lock, Trash2, Plus, ChevronDown, ChevronRight,
  GripVertical, Edit3, Check, X, Loader2, ArrowLeft, Eye, AlertCircle,
  BookOpen, Video, FileText,
} from 'lucide-react';
import Link from 'next/link';
import InstructorHeader from '@/components/instructor/InstructorHeader';
import { useAppDispatch, useAppSelector } from '@/store';
import { getCourseById, updateCourse, publishCourse } from '@/store/coursesSlice';
import { addToast, toast } from '@/store/uiSlice';
import { courseApi, adminApi } from '@/lib/api';
import { cn } from '@/lib/utils';

// ── tiny helpers ──────────────────────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-500 font-semibold mt-1"><AlertCircle className="w-3 h-3" />{msg}</p>;
}

const inputCls = (err?: string) => cn(
  'w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none placeholder:text-slate-400',
  err
    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100'
    : 'border-slate-200 bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100'
);

// ── Section & Lesson inline editors ──────────────────────────────────────────

function LessonRow({
  lesson, token, onDeleted, onUpdated,
}: {
  lesson: any; token: string;
  onDeleted: (id: string) => void;
  onUpdated: (lesson: any) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(lesson.title);
  const [saving, setSaving] = useState(false);
  const dispatch = useAppDispatch();

  const save = async () => {
    setSaving(true);
    try {
      const updated = await courseApi.updateLesson(token, lesson.id, { title });
      onUpdated(updated);
      setEditing(false);
    } catch {
      dispatch(addToast(toast.error('Failed to update lesson')));
    } finally { setSaving(false); }
  };

  const del = async () => {
    if (!confirm('Delete this lesson?')) return;
    try {
      await courseApi.deleteLesson(token, lesson.id);
      onDeleted(lesson.id);
    } catch {
      dispatch(addToast(toast.error('Failed to delete lesson')));
    }
  };

  return (
    <div className="flex items-center gap-2 py-2 pl-4 pr-3 rounded-xl hover:bg-slate-50 group transition-colors">
      <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />
      <Video className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 text-sm border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-100"
        />
      ) : (
        <span className="flex-1 text-sm text-slate-700 truncate">{lesson.title}</span>
      )}
      {lesson.isPreview && (
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">Preview</span>
      )}
      <div className={cn('flex items-center gap-1 shrink-0', editing ? 'flex' : 'opacity-0 group-hover:opacity-100')}>
        {editing ? (
          <>
            <button onClick={save} disabled={saving} className="w-7 h-7 flex items-center justify-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            </button>
            <button onClick={() => { setEditing(false); setTitle(lesson.title); }} className="w-7 h-7 flex items-center justify-center bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-all">
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
              <Edit3 className="w-3 h-3" />
            </button>
            <button onClick={del} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <Trash2 className="w-3 h-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SectionBlock({
  section, token, onDeleted, onUpdated,
}: {
  section: any; token: string;
  onDeleted: (id: string) => void;
  onUpdated: (s: any) => void;
}) {
  const [open, setOpen] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [saving, setSaving] = useState(false);
  const [lessons, setLessons] = useState<any[]>(section.lessons ?? []);
  const [addingLesson, setAddingLesson] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const dispatch = useAppDispatch();

  const saveTitle = async () => {
    setSaving(true);
    try {
      const updated = await courseApi.updateSection(token, section.id, { title });
      onUpdated(updated);
      setEditTitle(false);
    } catch {
      dispatch(addToast(toast.error('Failed to update section')));
    } finally { setSaving(false); }
  };

  const delSection = async () => {
    if (!confirm('Delete this entire section and all its lessons?')) return;
    try {
      await courseApi.deleteSection(token, section.id);
      onDeleted(section.id);
    } catch {
      dispatch(addToast(toast.error('Failed to delete section')));
    }
  };

  const addLesson = async () => {
    if (!newLessonTitle.trim()) return;
    try {
      const lesson = await courseApi.addLesson(token, section.id, {
        title: newLessonTitle.trim(),
        orderIndex: lessons.length,
      });
      setLessons(prev => [...prev, lesson]);
      setNewLessonTitle('');
      setAddingLesson(false);
      dispatch(addToast(toast.success('Lesson added')));
    } catch {
      dispatch(addToast(toast.error('Failed to add lesson')));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50/80 border-b border-slate-100">
        <button onClick={() => setOpen(o => !o)} className="text-slate-400 hover:text-slate-600 transition-colors">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
        {editTitle ? (
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 text-sm font-semibold border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-100"
          />
        ) : (
          <span className="flex-1 text-sm font-semibold text-slate-800">{section.title}</span>
        )}
        <span className="text-[10px] text-slate-400 font-bold shrink-0">{lessons.length} lessons</span>
        <div className="flex items-center gap-1 shrink-0">
          {editTitle ? (
            <>
              <button onClick={saveTitle} disabled={saving} className="w-7 h-7 flex items-center justify-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
              </button>
              <button onClick={() => { setEditTitle(false); setTitle(section.title); }} className="w-7 h-7 flex items-center justify-center bg-slate-200 text-slate-600 rounded-lg">
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditTitle(true)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                <Edit3 className="w-3 h-3" />
              </button>
              <button onClick={delSection} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lessons */}
      {open && (
        <div className="divide-y divide-slate-50 px-1 py-1">
          {lessons.map(l => (
            <LessonRow
              key={l.id}
              lesson={l}
              token={token}
              onDeleted={id => setLessons(prev => prev.filter(x => x.id !== id))}
              onUpdated={updated => setLessons(prev => prev.map(x => x.id === updated.id ? updated : x))}
            />
          ))}

          {/* Add lesson input */}
          {addingLesson ? (
            <div className="flex items-center gap-2 py-2 pl-4 pr-3">
              <Video className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <input
                autoFocus
                value={newLessonTitle}
                onChange={e => setNewLessonTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addLesson()}
                placeholder="Lesson title..."
                className="flex-1 text-sm border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
              <button onClick={addLesson} className="w-7 h-7 flex items-center justify-center bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                <Check className="w-3 h-3" />
              </button>
              <button onClick={() => { setAddingLesson(false); setNewLessonTitle(''); }} className="w-7 h-7 flex items-center justify-center bg-slate-200 text-slate-600 rounded-lg">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingLesson(true)}
              className="w-full flex items-center gap-2 py-2 pl-4 pr-3 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors rounded-b-xl"
            >
              <Plus className="w-3.5 h-3.5" /> Add Lesson
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const editSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.string().refine(v => !isNaN(Number(v)) && Number(v) >= 0, 'Must be 0 or more'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL']),
  thumbnailUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  categoryId: z.string().min(1, 'Pick a category'),
});

type EditForm = z.infer<typeof editSchema>;

export default function CourseEditPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { selectedCourse: course, loading, updating } = useAppSelector(s => s.courses);

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [publishLoading, setPublishLoading] = useState(false);

  const token = (session?.user as any)?.backendToken as string | undefined;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
  });

  const load = useCallback(async () => {
    if (!token || !courseId) return;
    const result = await dispatch(getCourseById({ token, id: courseId }));
    if (getCourseById.fulfilled.match(result)) {
      const c = result.payload;
      reset({
        title: c.title ?? '',
        description: c.description ?? '',
        price: String(c.price ?? 0),
        level: c.level ?? 'BEGINNER',
        thumbnailUrl: c.thumbnailUrl ?? '',
        categoryId: c.categoryId ?? '',
      });
      setSections(c.sections ?? []);
    }
    adminApi.getCategories(token).then(setCategories).catch(() => {});
  }, [token, courseId, dispatch, reset]);

  useEffect(() => { load(); }, [load]);

  const onSave = async (data: EditForm) => {
    if (!token || !courseId) return;
    const result = await dispatch(updateCourse({
      token, id: courseId,
      data: { ...data, price: Number(data.price) },
    }));
    if (updateCourse.fulfilled.match(result)) {
      dispatch(addToast(toast.success('Course updated!', 'Changes saved successfully.')));
    } else {
      dispatch(addToast(toast.error('Save failed', result.payload as string)));
    }
  };

  const togglePublish = async () => {
    if (!token || !courseId || !course) return;
    setPublishLoading(true);
    const result = await dispatch(publishCourse({ token, id: courseId, isPublished: !course.isPublished }));
    if (publishCourse.fulfilled.match(result)) {
      dispatch(addToast(toast.success(
        result.payload.isPublished ? 'Course published!' : 'Course unpublished',
        result.payload.isPublished ? 'Students can now discover your course.' : 'Course moved to draft.'
      )));
    } else {
      dispatch(addToast(toast.error('Failed to change status', result.payload as string)));
    }
    setPublishLoading(false);
  };

  const addSection = async () => {
    if (!token || !courseId || !newSectionTitle.trim()) return;
    try {
      const section = await courseApi.addSection(token, courseId, {
        title: newSectionTitle.trim(),
        orderIndex: sections.length,
      });
      setSections(prev => [...prev, { ...section, lessons: [] }]);
      setNewSectionTitle('');
      setAddingSection(false);
      dispatch(addToast(toast.success('Section added')));
    } catch {
      dispatch(addToast(toast.error('Failed to add section')));
    }
  };

  if (loading && !course) {
    return (
      <>
        <InstructorHeader title="Edit Course" />
        <div className="flex-1 flex items-center justify-center bg-slate-50/50">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <InstructorHeader
        title={course?.title ?? 'Edit Course'}
        subtitle={course?.isPublished ? 'Published · live' : 'Draft · not visible to students'}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/instructor/courses"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <button
              onClick={togglePublish}
              disabled={publishLoading || updating}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-sm disabled:opacity-60',
                course?.isPublished
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-amber-500 text-white hover:bg-amber-400 shadow-amber-500/30'
              )}
            >
              {publishLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : course?.isPublished ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
              {course?.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Course Info Form (3 cols) ── */}
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Course Information</h2>
                <p className="text-xs text-slate-400 mt-0.5">Update the core details of your course.</p>
              </div>
              <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-5">

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Title *</label>
                  <input {...register('title')} placeholder="Course title" className={inputCls(errors.title?.message)} />
                  <FieldError msg={errors.title?.message} />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Description *</label>
                  <textarea {...register('description')} rows={4} placeholder="Describe your course..." className={cn(inputCls(errors.description?.message), 'resize-none')} />
                  <FieldError msg={errors.description?.message} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Category *</label>
                    <select {...register('categoryId')} className={cn(inputCls(errors.categoryId?.message), 'cursor-pointer')}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <FieldError msg={errors.categoryId?.message} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Level *</label>
                    <select {...register('level')} className={cn(inputCls(errors.level?.message), 'cursor-pointer')}>
                      <option value="BEGINNER">🟢 Beginner</option>
                      <option value="INTERMEDIATE">🟡 Intermediate</option>
                      <option value="ADVANCED">🔴 Advanced</option>
                      <option value="ALL">⚪ All Levels</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                    <input {...register('price')} type="number" min="0" step="0.01" placeholder="0.00" className={cn(inputCls(errors.price?.message), 'pl-8')} />
                  </div>
                  <FieldError msg={errors.price?.message} />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Thumbnail URL</label>
                  <input {...register('thumbnailUrl')} type="url" placeholder="https://..." className={inputCls(errors.thumbnailUrl?.message)} />
                  <FieldError msg={errors.thumbnailUrl?.message} />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60"
                  >
                    {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Right: Curriculum (2 cols) ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Curriculum</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{sections.length} sections · {sections.reduce((a, s) => a + (s.lessons?.length ?? 0), 0)} lessons</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {sections.map(section => (
                  <SectionBlock
                    key={section.id}
                    section={section}
                    token={token!}
                    onDeleted={id => setSections(prev => prev.filter(s => s.id !== id))}
                    onUpdated={updated => setSections(prev => prev.map(s => s.id === updated.id ? { ...s, title: updated.title } : s))}
                  />
                ))}

                {/* Add section */}
                {addingSection ? (
                  <div className="flex items-center gap-2">
                    <input
                      autoFocus
                      value={newSectionTitle}
                      onChange={e => setNewSectionTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSection()}
                      placeholder="Section title..."
                      className="flex-1 text-sm border border-amber-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    />
                    <button onClick={addSection} className="w-9 h-9 flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setAddingSection(false); setNewSectionTitle(''); }} className="w-9 h-9 flex items-center justify-center bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingSection(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-400 hover:text-amber-600 py-3 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Section
                  </button>
                )}
              </div>
            </div>

            {/* Status card */}
            <div className={cn(
              'rounded-2xl border p-4',
              course?.isPublished
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-slate-50 border-slate-200'
            )}>
              <div className="flex items-center gap-2 mb-2">
                {course?.isPublished
                  ? <Globe className="w-4 h-4 text-emerald-600" />
                  : <Lock className="w-4 h-4 text-slate-500" />}
                <p className="text-sm font-bold text-slate-800">
                  {course?.isPublished ? 'Live to Students' : 'Draft — Not Visible'}
                </p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {course?.isPublished
                  ? 'Your course is publicly visible. Students can find and enroll.'
                  : 'Your course is in draft mode. Click Publish when you\'re ready to go live.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
