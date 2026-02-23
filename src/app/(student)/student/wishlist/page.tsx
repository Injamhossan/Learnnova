'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, BookOpen, Star, ChevronRight, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import StudentHeader from '@/components/student/StudentHeader';
import { userApi } from '@/lib/api';
import { cn } from '@/lib/utils';

interface WishlistItem {
  id: string;
  addedAt: string;
  course: {
    id: string; title: string; thumbnailUrl?: string; level: string;
    price: number; averageRating: number; totalEnrollments: number;
    instructor: { user: { fullName: string } };
    category: { name: string };
  };
}

export default function StudentWishlistPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.backendToken as string | undefined;
  const [items, setItems]   = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await userApi.getWishlist(token);
      setItems(data?.wishlist ?? data ?? []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const removeItem = async (courseId: string) => {
    if (!token) return;
    setRemoving(courseId);
    try {
    await userApi.removeFromWishlist(token, courseId);
      setItems(prev => prev.filter(i => i.course.id !== courseId));
    } finally { setRemoving(null); }
  };

  return (
    <>
      <StudentHeader title="Wishlist" subtitle={`${items.length} saved course${items.length !== 1 ? 's' : ''}`} />

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center">
              <Heart className="w-10 h-10 text-red-400" />
            </div>
            <div>
              <p className="font-bold text-slate-700 text-lg">Your Wishlist is Empty</p>
              <p className="text-sm text-slate-400 mt-1">Save courses you're interested in for later.</p>
            </div>
            <Link href="/" className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">
              Browse Courses <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 transition-all group flex flex-col">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {item.course.thumbnailUrl ? (
                    <img src={item.course.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-300" />
                    </div>
                  )}
                  <button
                    onClick={() => removeItem(item.course.id)}
                    disabled={removing === item.course.id}
                    className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-white transition-all shadow-sm"
                  >
                    {removing === item.course.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                    {item.course.level}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit">
                    {item.course.category?.name}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 flex-1">{item.course.title}</h3>
                  <p className="text-xs text-slate-400">{item.course.instructor?.user?.fullName}</p>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {item.course.averageRating.toFixed(1)}
                      </div>
                      <span className="font-bold text-emerald-700">
                        {item.course.price === 0 ? 'Free' : `$${item.course.price}`}
                      </span>
                    </div>
                    <Link href={`/courses/${item.course.id}`}
                      className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                      Enroll <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
