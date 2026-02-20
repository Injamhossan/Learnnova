'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import NavLogo from '@/assets/NavLogo.png';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Wallet,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const instructorNavItems = [
  {
    label: 'TEACHING',
    items: [
      { href: '/instructor', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/instructor/courses', label: 'Courses', icon: BookOpen },
      { href: '/instructor/courses/create', label: 'Create Course', icon: PlusCircle },
      { href: '/instructor/students', label: 'Students', icon: Users },
    ],
  },
  {
    label: 'FINANCE & STATS',
    items: [
      { href: '/instructor/earnings', label: 'Earnings', icon: Wallet },
      { href: '/instructor/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'COMMUNICATION',
    items: [
      { href: '/instructor/messages', label: 'Messages', icon: MessageSquare },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/instructor/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function InstructorSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/instructor' ? pathname === '/instructor' : pathname.startsWith(href);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 shrink-0">
          <Link href="/instructor" className="flex items-center gap-2">
            <Image 
              src={NavLogo} 
              alt="Learnova Logo" 
              width={collapsed ? 32 : 120} 
              height={32} 
              className="h-8 w-auto object-contain"
            />
            {!collapsed && (
              <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                Instructor
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {instructorNavItems.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1.5">
                {section.items.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${isActive(href) ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive(href) ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      {!collapsed && <span>{label}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
            <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all w-full group"
            >
                <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-red-500" />
                {!collapsed && <span>Logout</span>}
            </button>
        </div>
      </aside>
    </>
  );
}
