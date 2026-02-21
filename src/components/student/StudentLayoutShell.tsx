'use client';

import { useState } from 'react';
import StudentSidebar from './StudentSidebar';

export default function StudentLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
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
