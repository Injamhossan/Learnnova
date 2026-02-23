// Admin route group skeleton
export default function AdminLoading() {
  return (
    <div className="flex-1 animate-pulse">
      <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 lg:px-8">
        <div className="h-5 w-40 bg-slate-100 rounded-lg" />
      </div>
      <div className="p-6 lg:p-8 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 h-72 bg-white rounded-2xl border border-slate-100" />
          <div className="h-72 bg-white rounded-2xl border border-slate-100" />
        </div>
      </div>
    </div>
  )
}
