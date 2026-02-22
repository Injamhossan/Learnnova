'use client';

import { useSession } from 'next-auth/react';
import { ShieldAlert, Lock, Settings, Server, Database, Globe, Bell } from 'lucide-react';

const systemSettings = [
  {
    section: 'Platform Configuration',
    icon: Globe,
    items: [
      { label: 'Platform Name', value: 'Learnova', type: 'text' },
      { label: 'Support Email', value: 'support@learnova.com', type: 'email' },
      { label: 'Platform URL', value: 'https://learnova.com', type: 'url' },
    ],
  },
  {
    section: 'Email Notifications',
    icon: Bell,
    items: [
      { label: 'Welcome Email', value: 'Enabled', type: 'toggle', enabled: true },
      { label: 'Enrollment Confirmation', value: 'Enabled', type: 'toggle', enabled: true },
      { label: 'Course Completion', value: 'Enabled', type: 'toggle', enabled: true },
    ],
  },
  {
    section: 'Database',
    icon: Database,
    items: [
      { label: 'Provider', value: 'PostgreSQL via Prisma', type: 'readonly' },
      { label: 'Connection', value: 'Supabase (Pooled)', type: 'readonly' },
      { label: 'Status', value: 'Connected', type: 'readonly', ok: true },
    ],
  },
  {
    section: 'Server',
    icon: Server,
    items: [
      { label: 'Runtime', value: 'Node.js + Express', type: 'readonly' },
      { label: 'Auth Provider', value: 'NextAuth v5 (JWT)', type: 'readonly' },
      { label: 'Environment', value: 'Development', type: 'readonly' },
    ],
  },
];

export default function AdminSettings() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role?.toUpperCase();
  const isSuperAdmin = role === 'SUPER_ADMIN';

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <Lock className="w-12 h-12 mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest">ACCESS RESTRICTED</p>
        <p className="text-xs text-slate-300 mt-2">Super Admin access required</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Super Admin Badge */}
      <div className="flex items-center gap-4 bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-indigo-900">Super Admin Mode</p>
          <p className="text-xs text-indigo-600 font-medium mt-0.5">
            Logged in as <strong>{session?.user?.email}</strong> · Full system access granted
          </p>
        </div>
        <span className="ml-auto text-[10px] font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-full uppercase tracking-widest">
          SUPER ADMIN
        </span>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {systemSettings.map((section) => (
          <div key={section.section} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
                <section.icon className="w-4 h-4 text-slate-600" />
              </div>
              <p className="font-bold text-slate-900 text-sm uppercase tracking-widest">{section.section}</p>
            </div>
            <div className="space-y-4">
              {section.items.map((item: any) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                  {item.type === 'toggle' ? (
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.enabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {item.value}
                    </div>
                  ) : item.type === 'readonly' ? (
                    <p className={`text-xs font-bold ${item.ok ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {item.value}
                    </p>
                  ) : (
                    <input
                      type={item.type}
                      defaultValue={item.value}
                      className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200 w-52 text-right"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
        <p className="text-sm font-bold text-red-900 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4" /> DANGER ZONE
        </p>
        <p className="text-xs text-red-500 font-medium mb-4">
          These actions are irreversible. Only Super Admins can perform them.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-2xl hover:bg-red-50 transition-all uppercase tracking-widest">
            Clear Cache
          </button>
          <button className="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-2xl hover:bg-red-50 transition-all uppercase tracking-widest">
            Reset Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
