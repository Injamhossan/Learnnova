'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { data: session } = useSession();
  const name = session?.user?.name || 'Admin';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white shrink-0 sticky top-0 z-10">
      {/* Left: Title */}
      <div>
        <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs font-medium text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Right: Search + Notifs + Avatar */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-500 hover:border-slate-300 transition-all cursor-text w-64 group">
          <Search className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none outline-none text-xs text-slate-900 placeholder:text-slate-400 w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 mx-1" />

        {/* Avatar */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[11px] font-bold shadow-md shadow-slate-200 uppercase">
            {initials || 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">{name}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {(session?.user as any)?.role || 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
