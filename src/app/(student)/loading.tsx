// Student route group — skeleton shown during navigation
export default function StudentLoading() {
  return (
    <div className="flex-1 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 lg:px-8 gap-4">
        <div>
          <div className="h-4 w-36 bg-slate-100 rounded-lg" />
          <div className="h-3 w-52 bg-slate-100 rounded-lg mt-2" />
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
          ))}
        </div>

        {/* Banner */}
        <div className="h-24 bg-white rounded-2xl border border-slate-100" />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 h-80 bg-white rounded-2xl border border-slate-100" />
          <div className="space-y-4">
            <div className="h-36 bg-white rounded-2xl border border-slate-100" />
            <div className="h-40 bg-white rounded-2xl border border-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
