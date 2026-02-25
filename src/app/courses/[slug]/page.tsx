'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Star, Clock, BookOpen, Users, PlayCircle, Globe, 
  CheckCircle2, AlertCircle, ShoppingCart, Share2, 
  Heart, ShieldCheck, ChevronRight, Loader2, Play, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { courseApi, paymentApi } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutModal from '@/components/shared/CheckoutModal';
import { addToast, toast } from '@/store/uiSlice';
import { useAppDispatch } from '@/store';
import Link from 'next/link';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const token = (session?.user as any)?.backendToken;

  const loadCourse = useCallback(async () => {
    try {
      const data = await courseApi.getCourseDetail(slug);
      setCourse(data);
      
      // Check if enrolled if logged in
      if (token) {
        const myEnrollments = await courseApi.getMyEnrollments(token);
        const enrollment = myEnrollments.enrollments.find((e: any) => e.courseId === data.id);
        if (enrollment) {
          setIsEnrolled(true);
          setEnrollmentStatus(enrollment.status);
        }
      }
    } catch (err: any) {
      dispatch(addToast(toast.error('Failed to load course details')));
    } finally {
      setLoading(false);
    }
  }, [slug, token, dispatch]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const handleEnroll = async () => {
    if (!session) {
      router.push('/login?callbackUrl=' + window.location.pathname);
      return;
    }

    if (isEnrolled && enrollmentStatus === 'ACTIVE') {
      router.push(`/student/courses/${course.id}`);
      return;
    }

    // If course is free (price 0), proceed to direct enrollment
    if (course.price === 0) {
      setEnrolling(true);
      try {
        await courseApi.enroll(token, course.id);
        setIsEnrolled(true);
        setEnrollmentStatus('ACTIVE');
        dispatch(addToast(toast.success('Successfully enrolled!', 'You can now start learning.')));
        router.push(`/student/courses/${course.id}`);
      } catch (err: any) {
        dispatch(addToast(toast.error(err.message || 'Enrollment failed')));
      } finally {
        setEnrolling(false);
      }
    } else {
      // If paid, show checkout modal
      setShowCheckout(true);
    }
  };

  const handleCheckoutConfirm = async (paymentMethod: string) => {
    try {
      await paymentApi.checkout(token, { courseId: course.id, paymentMethod });
      setIsEnrolled(true);
      setEnrollmentStatus('ACTIVE');
      setShowCheckout(false);
      dispatch(addToast(toast.success('Payment Successful!', 'You have been enrolled in the course.')));
      router.push(`/student/courses/${course.id}`);
    } catch (err: any) {
      dispatch(addToast(toast.error(err.message || 'Payment failed')));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
          <p className="font-bold text-slate-400 animate-pulse">Loading course magic...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
          <p className="text-slate-500 mb-6">The course you are looking for might have been moved or removed.</p>
          <Link href="/courses" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      <Navbar />
      
      <CheckoutModal 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        course={course}
        onConfirm={handleCheckoutConfirm}
      />
      
      {/* Hero Header Section */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <div className="lg:col-span-2 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
              <Link href="/courses" className="hover:text-amber-400 transition-colors">Courses</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-400">{course.category?.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black font-satoshi leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-slate-300 font-manrope max-w-2xl">
              {course.description.substring(0, 160)}...
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1.5 font-bold">{course.averageRating || '4.8'}</span>
                </div>
                <span className="text-slate-400 text-sm">({(course._count?.reviews || 0).toLocaleString()} reviews)</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-300 text-sm font-bold">
                <Users className="w-4 h-4 text-slate-500" />
                {course.totalEnrollments?.toLocaleString()} Students
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-sm font-bold">
                <Globe className="w-4 h-4 text-slate-500" />
                English
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 p-0.5 border border-slate-700">
                 {course.instructor?.user?.avatarUrl ? (
                   <Image src={course.instructor.user.avatarUrl} alt="" width={48} height={48} className="rounded-[14px] object-cover h-full" />
                 ) : (
                   <div className="w-full h-full bg-slate-700 rounded-[14px] flex items-center justify-center text-lg font-bold">
                     {course.instructor?.user?.fullName?.charAt(0)}
                   </div>
                 )}
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Created by</p>
                <p className="font-bold text-white hover:text-amber-400 transition-colors cursor-pointer">{course.instructor?.user?.fullName}</p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Floating on Desktop) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 sticky top-24 transform transition-all">
              <div className="relative aspect-video">
                {course.thumbnailUrl ? (
                  <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-200" />
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                   <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xl scale-90 hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                   </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-satoshi">
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                    {course.discountPrice && (
                      <span className="text-slate-400 line-through text-sm">${course.price * 1.5}</span>
                    )}
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-1 rounded-lg border border-emerald-100">80% OFF</span>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-60"
                  >
                    {enrolling ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isEnrolled ? (enrollmentStatus === 'COMPLETED' ? 'Go to Learning' : 'Continue Learning') : 'Enroll Now'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  {!isEnrolled && (
                    <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-black rounded-2xl transition-all border border-slate-200">
                      Add to Wishlist
                    </button>
                  )}
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">This course includes:</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <PlayCircle className="w-4 h-4 text-amber-500" />
                      45 hours on-demand video
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      86 downloadable resources
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <Globe className="w-4 h-4 text-amber-500" />
                      Full lifetime access
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      Certificate of completion
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                   <button className="text-slate-400 hover:text-amber-500 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                   </button>
                   <button className="text-slate-400 hover:text-rose-500 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
                      <Heart className="w-4 h-4" /> Save
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* What you will learn */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-6 font-satoshi flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                </span>
                What you'll learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(course.whatYouWillLearn && course.whatYouWillLearn.length > 0) ? (
                  course.whatYouWillLearn.map((item: string, i: number) => (
                    <div key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic font-manrope">Learning outcomes coming soon...</p>
                )}
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 font-satoshi">Course Content</h3>
                <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>{course.sections?.length || 0} sections</span>
                  <span>•</span>
                  <span>{course.sections?.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0) || 0} lessons</span>
                </div>
              </div>

              <div className="space-y-4">
                {course.sections?.map((section: any, idx: number) => (
                  <details key={section.id} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-all open:ring-4 open:ring-amber-50" open={idx === 0}>
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-slate-800">{section.title}</h4>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-6 pt-0 divide-y divide-slate-100">
                      {section.lessons?.map((lesson: any) => (
                        <div key={lesson.id} className="py-4 flex items-center justify-between group/lesson">
                          <div className="flex items-center gap-3 min-w-0">
                            <PlayCircle className="w-4 h-4 text-slate-300 group-hover/lesson:text-amber-500 transition-colors shrink-0" />
                            <span className="text-sm text-slate-600 font-medium truncate">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            {lesson.isPreview && (
                              <button className="text-[10px] font-black uppercase text-amber-600 hover:text-amber-700 underline tracking-widest">Preview</button>
                            )}
                            <span className="text-[10px] font-bold text-slate-400 min-w-10 text-right">
                              {Math.floor((lesson.videoDurationSeconds || 0) / 60)}:{(lesson.videoDurationSeconds || 0) % 60 === 0 ? '00' : String((lesson.videoDurationSeconds || 0) % 60).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 font-satoshi">Requirements</h3>
              <ul className="space-y-3 list-disc pl-5 text-slate-600 text-sm font-manrope">
                {(course.requirements && course.requirements.length > 0) ? (
                  course.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))
                ) : (
                  <li>No specific prerequisites. Suitable for all levels.</li>
                )}
              </ul>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 font-satoshi">Description</h3>
              <div className="prose prose-slate max-w-none text-slate-600 font-manrope leading-relaxed whitespace-pre-line text-sm">
                {course.description}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


