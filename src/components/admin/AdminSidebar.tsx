'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import NavLogo from '@/assets/NavLogo.png';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  {
    label: 'MANAGEMENT',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/courses', label: 'Courses', icon: BookOpen },
      { href: '/admin/categories', label: 'Categories', icon: Tag },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* Toggle Button in Middle */}
        <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:shadow-md hover:border-slate-400 transition-all z-40 shadow-sm group"
        >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-500 ${collapsed ? '' : 'rotate-180'}`} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <Image 
              src={NavLogo} 
              alt="Learnova Logo" 
              width={collapsed ? 32 : 120} 
              height={32} 
              className={`h-8 w-auto object-contain transition-all ${collapsed ? 'mx-auto' : ''}`}
            />
            {!collapsed && (
              <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Admin
              </span>
            )}
          </Link>
        </div>

        {/* View Website Link */}
        {!collapsed && (
          <div className="px-4 mt-6">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all uppercase tracking-widest group shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-slate-900" />
              View Main Site
            </Link>
          </div>
        )}

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto ${collapsed ? 'py-4 px-4' : 'py-6 px-4'} space-y-8`}>
          {navItems.map((section) => (
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
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold
                        transition-all duration-200 group relative
                        ${
                          isActive(href)
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                        }
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive(href) ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      {!collapsed && <span>{label}</span>}
                      {!collapsed && isActive(href) && (
                        <ChevronRight className="w-3 h-3 ml-auto text-white/50" />
                      )}
                      {/* Tooltip on collapsed */}
                      {collapsed && (
                        <span className="absolute left-full ml-4 bg-slate-900 text-white text-[11px] font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl transform group-hover:translate-x-1 uppercase tracking-wider">
                          {label}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50/50 transition-all w-full group overflow-hidden"
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-red-500" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
