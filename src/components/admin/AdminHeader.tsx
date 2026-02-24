'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Bell, Search } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = React.useState(searchParams.get('search') || '');

  const name = session?.user?.name || 'Admin';

  // Update URL on search change with debounce
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set('search', searchValue);
      } else {
        params.delete('search');
      }
      
      const newUrl = `${pathname}?${params.toString()}`;
      if (params.toString() !== searchParams.toString()) {
        router.push(newUrl, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue, pathname, router, searchParams]);

  return (
    <header className="h-20 border-b border-slate-100 flex items-center justify-between px-10 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4 min-w-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 leading-tight italic truncate">{title}</h1>
          {subtitle && <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{subtitle}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-2.5 text-sm text-slate-500 hover:border-slate-200 transition-all cursor-text w-72 group shadow-inner">
          <Search className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-900 transition-colors" />
          <input 
            type="text" 
            placeholder="Search resources, users..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-medium text-slate-900 placeholder:text-slate-400 w-full"
          />
        </div>

        <button className="relative w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-200 hover:bg-slate-50 transition-all shadow-sm group">
          <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white animate-pulse" />
        </button>

        <div className="h-10 w-px bg-slate-100 mx-1" />

        <div className="flex items-center gap-4 pl-1 group cursor-pointer">
          <UserAvatar 
            src={session?.user?.image} 
            name={name} 
            size={44} 
            className="rounded-2xl shadow-xl shadow-slate-200 group-hover:scale-105 transition-transform border border-slate-100"
            fallbackClassName="bg-slate-900 text-white"
          />
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-900 leading-tight group-hover:translate-x-1 transition-transform">{name}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
               {(session?.user as any)?.role || 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
