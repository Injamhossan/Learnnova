import Skeleton from '@/components/common/Skeleton';

// Instructor route group — full-layout skeleton shown during navigation
export default function InstructorLoading() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <div className="top-loader-bar" />
      
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-24 h-8 rounded-xl" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 overflow-y-auto">
        {/* Stat cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <Skeleton className="w-10 h-10 !rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content block */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="p-6 space-y-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
             <div className="space-y-2">
               <Skeleton className="h-5 w-32" />
               <Skeleton className="h-3 w-full" />
               <Skeleton className="h-3 w-4/5" />
             </div>
             <Skeleton className="h-32 w-full rounded-2xl" />
             <div className="grid grid-cols-2 gap-3">
               <Skeleton className="h-10 rounded-xl" />
               <Skeleton className="h-10 rounded-xl" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
