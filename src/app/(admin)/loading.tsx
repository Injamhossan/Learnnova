import Skeleton from '@/components/common/Skeleton';

// Admin route group skeleton
export default function AdminLoading() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <div className="top-loader-bar" />
      
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-32" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <Skeleton className="h-5 w-48" />
               </div>
               <div className="p-6 space-y-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <Skeleton className="w-10 h-10 rounded-lg" />
                     <Skeleton className="h-4 flex-1" />
                     <Skeleton className="h-4 w-20" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <Skeleton className="h-5 w-32" />
            <div className="h-64 flex flex-col justify-end gap-2">
               {[70, 40, 90, 60, 80].map((h, i) => (
                 <Skeleton key={i} className="w-full rounded-t-lg" style={{ height: `${h}%` }} />
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
