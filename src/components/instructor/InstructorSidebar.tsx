'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import NavLogo from '@/assets/NavLogo.png';
import {
  LayoutDashboard, BookOpen, PlusSquare, Users,
  BarChart3, Settings, LogOut, Wallet, ChevronLeft,
  ChevronRight, GraduationCap, MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  {
    group: 'Teaching',
    items: [
      { href: '/instructor', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/instructor/courses', label: 'My Courses', icon: BookOpen },
      { href: '/instructor/courses/create', label: 'Create Course', icon: PlusSquare },
      { href: '/instructor/students', label: 'Students', icon: Users },
      { href: '/instructor/messages', label: 'Messages', icon: MessageSquare },
    ],
  },
  {
    group: 'Revenue',
    items: [
      { href: '/instructor/earnings', label: 'Earnings', icon: Wallet },
      { href: '/instructor/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    group: 'Account',
    items: [
      { href: '/instructor/settings', label: 'Settings', icon: Settings },
    ],
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function InstructorSidebar({ collapsed, setCollapsed }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as any;

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-white border-r border-slate-200 transition-all duration-300 relative',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* ── Logo ── */}
      <div className={cn(
        'flex items-center h-16 border-b border-slate-100 shrink-0 overflow-hidden',
        collapsed ? 'justify-center px-0' : 'px-5 gap-3'
      )}>
        <Link href="/instructor" className="flex items-center gap-3 min-w-0">
          {collapsed ? (
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          ) : (
            <>
              <Image
                src={NavLogo}
                alt="Learnova"
                height={28}
                width={110}
                className="h-7 w-auto object-contain shrink-0"
                priority
              />
              <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                Instructor
              </span>
            </>
          )}
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-5 px-2.5 space-y-5 scrollbar-hide">
        {NAV.map((section) => (
          <div key={section.group}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] px-3 mb-2">
                {section.group}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      title={collapsed ? label : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 group relative',
                        active
                          ? 'bg-amber-50 text-amber-700'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-500 rounded-r-full" />
                      )}
                      <Icon
                        className={cn(
                          'shrink-0',
                          active
                            ? 'text-amber-600 w-[18px] h-[18px]'
                            : 'text-slate-400 group-hover:text-slate-600 w-[18px] h-[18px]'
                        )}
                      />
                      {!collapsed && <span className="truncate">{label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User + Logout ── */}
      <div className="border-t border-slate-100 p-2.5 space-y-1 shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-1">
            <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0">
              {user.name?.charAt(0).toUpperCase() || 'I'}
            </div>
            <div className="min-w-0">
              <p className="text-slate-800 text-xs font-bold truncate">{user.name}</p>
              <p className="text-slate-400 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          title="Logout"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0 group-hover:text-red-500" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* ── Collapse toggle (Desktop only) ── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-[72px] w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-slate-700 hover:border-amber-400 hover:shadow-md transition-all shadow-sm z-40"
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" />
          : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
