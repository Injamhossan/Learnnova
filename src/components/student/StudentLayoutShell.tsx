'use client';

import { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import { Menu } from 'lucide-react';

export default function StudentLayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — hidden off-screen on mobile, shown when mobileOpen */}
      <div className={`
        fixed top-0 left-0 h-full z-30 transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content */}
      <main className={`
        flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300
        lg:${collapsed ? 'ml-20' : 'ml-64'}
      `}>
        {/* Mobile topbar */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-200 bg-white lg:hidden shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-slate-900 text-sm">Student Dashboard</span>
        </div>
        {children}
      </main>
    </div>
  );
}
