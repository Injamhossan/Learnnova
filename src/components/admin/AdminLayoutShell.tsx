'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main 
        className={`flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
