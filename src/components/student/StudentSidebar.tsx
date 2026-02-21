'use client';

import { 
  ChevronRight, 
  LayoutDashboard, 
  Menu, 
  LogOut, 
  Settings, 
  MessageSquare, 
  Bookmark, 
  GraduationCap, 
  BookOpen, 
  ExternalLink, 
  X, 
  Heart, 
  TrendingUp 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import NavLogo from '@/assets/NavLogo.png';

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

interface StudentSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function StudentSidebar({ collapsed, setCollapsed }: StudentSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || 'Student';

  const isActive = (href: string) =>
    href === '/student' ? pathname === '/student' : pathname.startsWith(href);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 shrink-0">
          <Link href="/student" className="flex items-center gap-2 overflow-hidden">
            <Image 
              src={NavLogo} 
              alt="Learnova Logo" 
              width={collapsed ? 32 : 120} 
              height={32} 
              className={`h-8 w-auto object-contain transition-all duration-300 ${collapsed ? 'scale-110' : ''}`}
            />
            {!collapsed && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                {userRole}
              </span>
            )}
          </Link>
        </div>

        {/* Toggle Button in Middle */}
        <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:shadow-md hover:border-blue-400 transition-all z-40 shadow-sm group"
        >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-500 ${collapsed ? '' : 'rotate-180'}`} />
        </button>

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
