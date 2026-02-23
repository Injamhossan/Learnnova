// Instructor route group — full-layout skeleton shown during navigation
export default function InstructorLoading() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-5 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 -mx-6 -mt-6 lg:-mx-8 lg:-mt-8 mb-8 flex items-center px-6 lg:px-8 gap-4 shrink-0">
        <div>
          <div className="h-4 w-32 bg-slate-100 rounded-lg" />
          <div className="h-3 w-48 bg-slate-100 rounded-lg mt-2" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm" />
        ))}
      </div>

      {/* Main content block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 h-80" />
        <div className="bg-white rounded-2xl border border-slate-100 h-80" />
      </div>
    </div>
  )
}
