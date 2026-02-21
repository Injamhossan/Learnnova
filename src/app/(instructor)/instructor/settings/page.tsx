import AdminHeader from '@/components/admin/AdminHeader';
import { Settings as SettingsIcon, Bell, Lock, Shield, User, Globe, Mail } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    { title: 'Personal Info', icon: User, desc: 'Update your name and profile details' },
    { title: 'Notifications', icon: Bell, desc: 'Manage how you receive alerts' },
    { title: 'Security', icon: Shield, desc: 'Password and account protection' },
    { title: 'Email Prefs', icon: Mail, desc: 'Control which emails you receive' },
  ];

  return (
    <>
      <AdminHeader title="Settings" subtitle="Customize your instructor experience" />
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {sections.map(section => (
              <div key={section.title} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer group flex items-start gap-6">
                 <div className="p-4 bg-slate-50 rounded-3xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <section.icon className="w-6 h-6" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 italic">{section.title}</h3>
                    <p className="text-slate-400 text-sm font-medium">{section.desc}</p>
                 </div>
              </div>
           ))}

           <div className="md:col-span-2 bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl overflow-hidden relative group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-bold italic">Global Visibility</h2>
                    <p className="max-w-md text-white/50 text-sm font-medium leading-relaxed">Boost your courses by enabling global reach. This allows students from all regions to discover and purchase your content.</p>
                    <div className="flex items-center gap-2 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10 uppercase font-bold text-[10px] tracking-widest text-emerald-400 italic">
                       <Globe className="w-3 h-3" /> Status: active
                    </div>
                 </div>
                 <button className="bg-white text-slate-900 px-10 py-5 rounded-[24px] font-bold text-sm hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95">
                    CONFIGURE REGIONS
                 </button>
              </div>
              <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                 <SettingsIcon className="w-80 h-80" />
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
