'use client';

import { useSession } from 'next-auth/react';
import { Bell } from 'lucide-react';
import UserAvatar from '@/components/common/UserAvatar';

interface InstructorHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function InstructorHeader({ title, subtitle, actions }: InstructorHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <header className="h-16 border-b border-slate-200/80 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-20">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="text-lg font-bold text-slate-900 leading-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        {actions}
        <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
        </button>
        <UserAvatar 
          src={user?.image} 
          name={user?.name} 
          size={36} 
          className="rounded-xl border border-amber-200 shadow-sm"
          fallbackClassName="bg-amber-500/10 text-amber-700"
        />
      </div>
    </header>
  );
}
