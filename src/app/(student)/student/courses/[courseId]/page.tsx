'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X,
  FileText,
  MessageCircle,
  HelpCircle,
  Star,
  Clock,
  ArrowLeft,
  Loader2,
  Lock
} from 'lucide-react';
import { courseApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { addToast, toast } from '@/store/uiSlice';
import { useAppDispatch } from '@/store';
import Link from 'next/link';
import Image from 'next/image';

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
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'qna' | 'resources'>('overview');

  const token = (session?.user as any)?.backendToken;

  const loadCourse = useCallback(async () => {
    if (!token) return;
    try {
      const data = await courseApi.getCourseDetail(courseId);
      setCourse(data);
      
      // Auto-select first lesson if none selected
      if (data.sections?.length > 0 && data.sections[0].lessons?.length > 0) {
        setCurrentLesson(data.sections[0].lessons[0]);
      }
    } catch (err: any) {
      dispatch(addToast(toast.error('Failed to load course content')));
    } finally {
      setLoading(false);
    }
  }, [courseId, token, dispatch]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleToggleComplete = async (lessonId: string) => {
    // In a real app, call API to mark as complete
    // For now, we'll just show a success message
    dispatch(addToast(toast.success('Progress updated!', 'Lesson marked as completed.')));
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-slate-900">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="font-bold animate-pulse tracking-widest text-xs uppercase">Initialising Player</p>
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

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/student/courses" className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-md">{course.title}</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{course.instructor?.user?.fullName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Progress: 12%</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-900"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          {/* Video Section */}
          <div className="relative aspect-video bg-black shadow-lg z-10">
            {currentLesson ? (
              <div className="w-full h-full flex items-center justify-center group">
                 {/* This would be an Actual Video Player Component */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                    <h2 className="text-xl font-bold mb-1">{currentLesson.title}</h2>
                    <p className="text-sm opacity-80">Section {course.sections.findIndex(s => s.lessons.includes(currentLesson)) + 1} • Lesson {currentLesson.orderIndex}</p>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 animate-pulse">
                        <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-[0.3em]">Ready to learn</p>
                 </div>
                 {/* Simulated Controls */}
                 <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">1080p</button>
                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/20">1.0x</button>
                 </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                Select a lesson to start learning
              </div>
            )}
          </div>

          {/* Lesson Details & Tabs */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-white">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-satoshi mb-2">{currentLesson?.title || 'Course Overview'}</h2>
                    <p className="text-slate-500 font-medium">Last updated Feb 2026 • English</p>
                 </div>
                 <button 
                  onClick={() => currentLesson && handleToggleComplete(currentLesson.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                 >
                    <CheckCircle2 className="w-5 h-5" />
                    Mark as Completed
                 </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200 flex gap-8">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'qna', label: 'Q&A', icon: MessageCircle },
                  { id: 'resources', label: 'Resources', icon: HelpCircle }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "pb-4 flex items-center gap-2 text-sm font-bold transition-all relative",
                      activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                  </button>
                ))}
              </div>

              <div className="py-2">
                {activeTab === 'overview' && (
                  <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                    {currentLesson?.description || course.description}
                  </div>
                )}
                {activeTab === 'qna' && (
                  <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-200">
                    <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No questions yet. Be the first to ask!</p>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Course_Materials.pdf</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">2.4 MB • PDF Document</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Download</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        <aside className={cn(
          "absolute inset-y-0 right-0 w-full md:w-80 lg:relative lg:w-96 bg-white border-l border-slate-200 flex flex-col z-30 transition-transform duration-500 ease-in-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
        )}>
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-20">
            <h3 className="font-bold text-slate-900">Course Content</h3>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {course.sections.length} Sections
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
            {course.sections.map((section, sIdx) => (
              <div key={section.id} className="bg-white">
                <div className="px-6 py-4 bg-slate-50 flex items-center justify-between sticky top-[73px] z-10 border-b border-slate-200/50">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] line-clamp-1">
                    Section {sIdx + 1}: {section.title}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">{section.lessons.length} Lessons</span>
                </div>
                <div className="py-2">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson)}
                      className={cn(
                        "w-full px-6 py-4 flex items-start gap-3 transition-all hover:bg-slate-50 group relative",
                        currentLesson?.id === lesson.id ? "bg-blue-50 border-r-2 border-blue-600" : ""
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                        currentLesson?.id === lesson.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      )}>
                        {currentLesson?.id === lesson.id ? <Play className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3" />}
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className={cn(
                          "text-sm font-semibold mb-1 line-clamp-2",
                          currentLesson?.id === lesson.id ? "text-blue-700 font-bold" : "text-slate-600 group-hover:text-slate-900"
                        )}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {Math.floor(lesson.videoDurationSeconds / 60)}:{String(lesson.videoDurationSeconds % 60).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                      {lesson.isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
