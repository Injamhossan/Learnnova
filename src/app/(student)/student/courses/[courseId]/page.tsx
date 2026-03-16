'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  Play,
  CheckCircle2,
  Menu,
  X,
  FileText,
  MessageCircle,
  HelpCircle,
  Clock,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { addToast, toast } from '@/store/uiSlice';
import { useAppDispatch } from '@/store';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoDurationSeconds: number;
  isPreview: boolean;
  orderIndex: number;
  isCompleted?: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  instructor: { user: { fullName: string } };
}

export default function CoursePlayerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'qna' | 'resources'>('overview');

  const token = (session?.user as any)?.backendToken;

  const loadCourse = useCallback(async () => {
    if (status === 'loading') return;
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await courseApi.getCourseDetail(courseId, token);
      console.log('[CoursePlayer] Course loaded:', data?.title, '| First lesson URL:', data?.sections?.[0]?.lessons?.[0]?.videoUrl);
      setCourse(data);
      if (data.sections?.length > 0 && data.sections[0].lessons?.length > 0) {
        setCurrentLesson(data.sections[0].lessons[0]);
      }
    } catch (err: any) {
      console.error('[CoursePlayer] Error loading course:', err);
      dispatch(addToast(toast.error('Failed to load course content')));
    } finally {
      setLoading(false);
    }
  }, [courseId, token, status, dispatch]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleToggleComplete = async (lessonId: string) => {
    try {
      await courseApi.updateLessonProgress(token, lessonId, true);
      setCourse(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: prev.sections.map(s => ({
            ...s,
            lessons: s.lessons.map(l =>
              l.id === lessonId ? { ...l, isCompleted: true } : l
            ),
          })),
        };
      });
      dispatch(addToast(toast.success('Progress updated!', 'Lesson marked as completed.')));

      // Auto-advance to next lesson
      if (course) {
        const flat = course.sections.flatMap(s => s.lessons);
        const idx = flat.findIndex(l => l.id === lessonId);
        if (idx !== -1 && idx < flat.length - 1) {
          setTimeout(() => handleLessonSelect(flat[idx + 1]), 500);
        } else if (idx === flat.length - 1) {
          dispatch(addToast(toast.success('🎉 Course Completed!', 'You have finished all lessons.')));
        }
      }
    } catch {
      dispatch(addToast(toast.error('Failed to update progress')));
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="font-bold animate-pulse tracking-widest text-xs uppercase text-slate-500">Loading Course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Course not found</h2>
          <button onClick={() => router.back()} className="text-blue-600 font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  const flatLessons = course.sections.flatMap(s => s.lessons);
  const completedCount = flatLessons.filter(l => l.isCompleted).length;
  const progressPercent = flatLessons.length > 0 ? Math.round((completedCount / flatLessons.length) * 100) : 0;

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/student/courses" className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-md">{course.title}</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{course.instructor?.user?.fullName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              {progressPercent}% Complete
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-900"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
          {/* Video */}
          <div className="w-full bg-black aspect-video shrink-0">
            {currentLesson?.videoUrl ? (
              <ReactPlayer
                key={currentLesson.id}
                url={currentLesson.videoUrl}
                width="100%"
                height="100%"
                controls
                onEnded={() => handleToggleComplete(currentLesson.id)}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1, rel: 0 },
                  } as any,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                No video available for this lesson
              </div>
            )}
          </div>

          {/* Lesson details */}
          <div className="p-6 md:p-8 bg-white">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">
                    {currentLesson?.title || 'Select a lesson'}
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">
                    {course.instructor?.user?.fullName} • {currentLesson ? `Duration: ${Math.floor((currentLesson.videoDurationSeconds || 0) / 60)}m` : ''}
                  </p>
                </div>
                {currentLesson && (
                  <button
                    onClick={() => handleToggleComplete(currentLesson.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl transition-all active:scale-95 text-sm shrink-0",
                      currentLesson.isCompleted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    )}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {currentLesson.isCompleted ? 'Completed' : 'Mark as Completed'}
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200 flex gap-6">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'qna', label: 'Q&A', icon: MessageCircle },
                  { id: 'resources', label: 'Resources', icon: HelpCircle },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "pb-3 flex items-center gap-2 text-sm font-bold transition-all relative",
                      activeTab === tab.id ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                  </button>
                ))}
              </div>

              <div>
                {activeTab === 'overview' && (
                  <p className="text-slate-600 leading-relaxed">
                    {currentLesson?.description || course.description || 'No description available.'}
                  </p>
                )}
                {activeTab === 'qna' && (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
                    <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No questions yet. Be the first to ask!</p>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No resources available for this lesson.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={cn(
          "absolute inset-y-0 right-0 w-full md:w-80 lg:relative lg:w-[340px] bg-white border-l border-slate-200 flex flex-col z-30 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:flex"
        )}>
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
            <h3 className="font-bold text-slate-900">Course Content</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {completedCount}/{flatLessons.length} done
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {course.sections.map((section, sIdx) => (
              <div key={section.id}>
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/50">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.15em]">
                    {sIdx + 1}. {section.title}
                  </h4>
                </div>
                {section.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={cn(
                      "w-full px-4 py-3 flex items-start gap-3 transition-all hover:bg-slate-50 text-left",
                      currentLesson?.id === lesson.id ? "bg-blue-50 border-r-2 border-blue-600" : ""
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                      lesson.isCompleted
                        ? "bg-emerald-500 text-white"
                        : currentLesson?.id === lesson.id
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    )}>
                      {lesson.isCompleted
                        ? <CheckCircle2 className="w-3.5 h-3.5" />
                        : <Play className="w-3 h-3 fill-current" />
                      }
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "text-sm font-semibold line-clamp-2 mb-1",
                        currentLesson?.id === lesson.id ? "text-blue-700" : "text-slate-700"
                      )}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400">
                          {Math.floor(lesson.videoDurationSeconds / 60)}:{String(lesson.videoDurationSeconds % 60).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
