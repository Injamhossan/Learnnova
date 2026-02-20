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
  GraduationCap,
  MessageSquare,
  Bookmark,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Heart,
  TrendingUp,
} from 'lucide-react';

const studentNavItems = [
  {
    label: 'LEARNING',
    items: [
      { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/student/courses', label: 'My Courses', icon: BookOpen },
      { href: '/student/wishlist', label: 'Wishlist', icon: Heart },
      { href: '/student/certificates', label: 'Certificates', icon: GraduationCap },
    ],
  },
  {
    label: 'INTERACTION',
    items: [
      { href: '/student/messages', label: 'Messages', icon: MessageSquare },
      { href: '/student/community', label: 'Community', icon: TrendingUp },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/student/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/student' ? pathname === '/student' : pathname.startsWith(href);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 shrink-0">
          <Link href="/student" className="flex items-center gap-2">
            <Image 
              src={NavLogo} 
              alt="Learnova Logo" 
              width={collapsed ? 32 : 120} 
              height={32} 
              className="h-8 w-auto object-contain"
            />
            {!collapsed && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                Student
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {studentNavItems.map((section) => (
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
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${isActive(href) ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
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

        <div className="p-4 border-t border-slate-100 shrink-0 text-center">
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
