'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Camera, ArrowRight, Save, Layout, ListChecks,
  Type, FileText, Tag, DollarSign, BarChart, AlertCircle,
  CheckCircle, Loader2
} from 'lucide-react';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '@/store';
import { createCourse } from '@/store/coursesSlice';
import { addToast, toast } from '@/store/uiSlice';
import { adminApi, courseApi } from '@/lib/api';
import { courseBasicSchema, courseThumbnailSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';

// Step 1 form input type (before price transform)
type Step1Input = {
  title: string;
  description: string;
  categoryId: string;
  price: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL';
};

// Step 2 form input type
type Step2Input = z.infer<typeof courseThumbnailSchema>;

// ── Reusable field components ─────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-600 font-semibold mt-1.5">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  );
}

interface FieldWrapProps {
  label: string;
  icon?: React.ElementType;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

function FieldWrap({ label, icon: Icon, error, required, children, hint }: FieldWrapProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-slate-400">{hint}</p>}
      <FieldError message={error} />
    </div>
  );
}

const inputClass = (error?: string) =>
  cn(
    'w-full px-5 py-3.5 rounded-2xl border text-sm font-medium transition-all outline-none',
    'placeholder:text-slate-400',
    error
      ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
      : 'border-slate-200 bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100'
  );

// ── STEP INDICATOR ────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Course Basics', icon: Layout },
  { label: 'Details & Cover', icon: CheckCircle },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = s.icon;
        return (
          <div key={i} className="flex items-center">
            <div className={cn(
              'flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all text-sm font-bold',
              active && 'bg-slate-900 text-white shadow-lg shadow-slate-900/20',
              done && 'bg-emerald-500 text-white',
              !active && !done && 'text-slate-400 bg-slate-50 border border-slate-100',
            )}>
              {done ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold',
                  active ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-500'
                )}>{i + 1}</span>
              )}
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('h-px w-8 mx-1', i < current ? 'bg-emerald-400' : 'bg-slate-200')} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CreateCourseForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { creating, error: courseError } = useAppSelector((s) => s.courses);

  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Input | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [catLoading, setCatLoading] = useState(true);

  const token = (session?.user as any)?.backendToken as string | undefined;

  // Fetch categories (public API accessible to instructors)
  useEffect(() => {
    courseApi.getCategories()
      .then((cats) => setCategories(cats))
      .catch(() => dispatch(addToast(toast.error('Could not load categories'))))
      .finally(() => setCatLoading(false));
  }, [dispatch]);

  // ── Step 1 form ────────────────────────────────────────────────────────────
  // We use the schema without .transform so RHF can work with the string price
  const step1Schema = courseBasicSchema.omit({ price: true }).extend({
    price: z.string().refine((v) => !isNaN(Number(v)) && Number(v) >= 0, 'Must be 0 or more'),
  });

  const {
    register: reg1,
    handleSubmit: hs1,
    formState: { errors: e1 },
    watch: w1,
  } = useForm<Step1Input>({
    resolver: zodResolver(step1Schema),
    defaultValues: { title: '', description: '', categoryId: '', price: '0', level: 'BEGINNER' },
  });

  const onStep1 = (data: Step1Input) => {
    setStep1Data(data);
    setStep(1);
  };

  // ── Step 2 form ───────────────────────────────────────────────────────────
  const {
    register: reg2,
    handleSubmit: hs2,
    formState: { errors: e2 },
    watch: w2,
  } = useForm<Step2Input>({
    resolver: zodResolver(courseThumbnailSchema),
    defaultValues: { thumbnailUrl: '', whatYouWillLearn: '', requirements: '' },
  });

  const thumbnailUrl = w2('thumbnailUrl');

  const onStep2 = async (data: Step2Input) => {
    if (!step1Data || !token) return;

    const payload = {
      title: step1Data.title,
      description: step1Data.description,
      categoryId: step1Data.categoryId,
      price: Number(step1Data.price),
      level: step1Data.level,
      thumbnailUrl: data.thumbnailUrl || undefined,
      whatYouWillLearn: data.whatYouWillLearn ? data.whatYouWillLearn.split('\n').filter(l => l.trim()) : undefined,
      requirements: data.requirements ? data.requirements.split('\n').filter(l => l.trim()) : undefined,
    };

    const result = await dispatch(createCourse({ token, data: payload }));

    if (createCourse.fulfilled.match(result)) {
      dispatch(addToast(toast.success('Course created!', 'Your draft is ready. Add lessons next.')));
      router.push('/instructor/courses');
    } else {
      dispatch(addToast(toast.error('Failed to create course', result.payload as string)));
    }
  };

  const levelOptions = [
    { value: 'BEGINNER', label: '🟢 Beginner' },
    { value: 'INTERMEDIATE', label: '🟡 Intermediate' },
    { value: 'ADVANCED', label: '🔴 Advanced' },
    { value: 'ALL', label: '⚪ All Levels' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-6">
      <StepIndicator current={step} />

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {step === 0 ? 'Course Basics' : 'Details & Cover Image'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {step === 0
                ? 'Set up your course title, category, and pricing.'
                : 'Add a thumbnail and describe what students will learn.'}
            </p>
          </div>
          <Layout className="w-8 h-8 text-slate-200" />
        </div>

        {/* ── STEP 1 ──────────────────────────────────────────────────── */}
        {step === 0 && (
          <form onSubmit={hs1(onStep1)} className="p-8 space-y-6">
            <FieldWrap label="Course Title" icon={Type} error={e1.title?.message} required>
              <input
                {...reg1('title')}
                type="text"
                placeholder="e.g. Mastering Modern React Design"
                className={inputClass(e1.title?.message)}
              />
            </FieldWrap>

            <FieldWrap label="Description" icon={FileText} error={e1.description?.message} required
              hint="Min 20 characters — tell students what they'll learn.">
              <textarea
                {...reg1('description')}
                rows={4}
                placeholder="Describe your course clearly and compellingly..."
                className={cn(inputClass(e1.description?.message), 'resize-none')}
              />
            </FieldWrap>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldWrap label="Category" icon={Tag} error={e1.categoryId?.message} required>
                <select
                  {...reg1('categoryId')}
                  disabled={catLoading}
                  className={cn(inputClass(e1.categoryId?.message), 'bg-white cursor-pointer')}
                >
                  <option value="">
                    {catLoading ? 'Loading categories...' : 'Select category'}
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </FieldWrap>

              <FieldWrap label="Level" icon={BarChart} error={e1.level?.message} required>
                <select
                  {...reg1('level')}
                  className={cn(inputClass(e1.level?.message), 'bg-white cursor-pointer')}
                >
                  {levelOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </FieldWrap>
            </div>

            <FieldWrap label="Price (USD)" icon={DollarSign} error={e1.price?.message} required
              hint="Set to 0 for a free course.">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                <input
                  {...reg1('price')}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={cn(inputClass(e1.price?.message), 'pl-9')}
                />
              </div>
            </FieldWrap>

            <div className="pt-4 border-t border-slate-50">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/15"
              >
                Continue to Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2 ──────────────────────────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={hs2(onStep2)} className="p-8 space-y-6">
            {/* Summary of Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">{step1Data?.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {step1Data?.level} · {step1Data?.categoryId
                    ? categories.find(c => c.id === step1Data.categoryId)?.name || 'Selected'
                    : '—'} · ${step1Data?.price || 0}
                </p>
              </div>
            </div>

            <FieldWrap
              label="Thumbnail URL"
              icon={Camera}
              error={e2.thumbnailUrl?.message}
              hint="Paste a direct image URL (HTTPS). Recommended: 1280×720."
            >
              <input
                {...reg2('thumbnailUrl')}
                type="url"
                placeholder="https://example.com/course-cover.jpg"
                className={inputClass(e2.thumbnailUrl?.message)}
              />
              {thumbnailUrl && !e2.thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Preview"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="mt-2 w-full h-36 object-cover rounded-2xl border border-slate-100"
                />
              )}
            </FieldWrap>

            <FieldWrap
              label="What Students Will Learn"
              icon={ListChecks}
              error={e2.whatYouWillLearn?.message}
              hint="Optional — one point per line."
            >
              <textarea
                {...reg2('whatYouWillLearn')}
                rows={4}
                placeholder="Build real-world React apps&#10;Use TypeScript confidently&#10;Deploy to production"
                className={cn(inputClass(e2.whatYouWillLearn?.message), 'resize-none')}
              />
            </FieldWrap>

            <FieldWrap
              label="Requirements / Prerequisites"
              icon={FileText}
              error={e2.requirements?.message}
              hint="Optional — what students should know before starting."
            >
              <textarea
                {...reg2('requirements')}
                rows={3}
                placeholder="Basic JavaScript knowledge&#10;Familiarity with HTML/CSS"
                className={cn(inputClass(e2.requirements?.message), 'resize-none')}
              />
            </FieldWrap>

            {courseError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {courseError}
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="px-6 py-3.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={creating}
                className="flex-1 flex items-center justify-center gap-2.5 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/15 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                ) : (
                  <><Save className="w-4 h-4" /> Create Course</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
