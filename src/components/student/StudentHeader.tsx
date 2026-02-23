'use client';

import { Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserAvatar from '@/components/common/UserAvatar';

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function StudentHeader({ title, subtitle, actions }: Props) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const initials = user?.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase() ?? 'S';

  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-slate-200 bg-white shrink-0">
      <div>
        <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
          <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
        </button>
        <UserAvatar 
          src={user?.image} 
          name={user?.name} 
          size={36} 
          className="rounded-xl shadow-md shadow-blue-500/25" 
          fallbackClassName="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        />
      </div>
    </header>
  );
}
