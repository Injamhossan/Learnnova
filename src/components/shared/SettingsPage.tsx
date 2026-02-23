'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User, Shield, Bell, Palette, Globe, Trash2,
  ChevronRight, Save, Loader2, Eye, EyeOff, Check,
  AlertTriangle, Link, Twitter, Linkedin,
  Phone, Camera, Tag, FileText, GraduationCap,
  Moon, Sun, Monitor,
} from 'lucide-react';
import { userApi } from '@/lib/api';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Profile {
  id: string; fullName: string; email: string; role: string;
  avatarUrl?: string; bio?: string; phone?: string; createdAt: string;
  instructor?: {
    headline?: string; description?: string; expertise?: string[];
    websiteUrl?: string; linkedinUrl?: string; twitterUrl?: string;
    totalStudents?: number; totalCourses?: number; averageRating?: number;
  };
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(250, 'Max 250 characters').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  avatarUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Required'),
  newPassword: z.string().min(6, 'At least 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const instructorSchema = z.object({
  headline: z.string().max(120, 'Max 120 characters').optional().or(z.literal('')),
  description: z.string().max(500, 'Max 500 characters').optional().or(z.literal('')),
  expertise: z.string().optional().or(z.literal('')),
  websiteUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  twitterUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type InstructorForm = z.infer<typeof instructorSchema>;

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold animate-in slide-in-from-bottom-3 duration-300',
      type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
    )}>
      {type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
      {msg}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="flex items-center gap-1 text-xs text-red-500 font-semibold mt-1"><AlertTriangle className="w-3 h-3" />{msg}</p>;
}

const inputCls = (err?: string) => cn(
  'w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all placeholder:text-slate-400',
  err
    ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100'
    : 'border-slate-200 bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100'
);

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group select-none">
      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none',
          on ? 'bg-amber-500' : 'bg-slate-200'
        )}
      >
        <span className={cn(
          'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300',
          on ? 'translate-x-5' : 'translate-x-0'
        )} />
      </button>
    </label>
  );
}

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────

interface NavItem { id: string; label: string; icon: React.ElementType; roles?: string[] }

const ALL_NAV: NavItem[] = [
  { id: 'profile',      label: 'Profile',          icon: User },
  { id: 'instructor',   label: 'Instructor Profile',icon: GraduationCap, roles: ['INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN'] },
  { id: 'security',     label: 'Password & Security',icon: Shield },
  { id: 'notifications',label: 'Notifications',    icon: Bell },
  { id: 'appearance',   label: 'Appearance',        icon: Palette },
  { id: 'privacy',      label: 'Privacy',           icon: Globe },
  { id: 'danger',       label: 'Danger Zone',       icon: Trash2 },
];

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: 'bg-purple-100 text-purple-700 border-purple-200',
  ADMIN: 'bg-red-100 text-red-700 border-red-200',
  INSTRUCTOR: 'bg-amber-100 text-amber-700 border-amber-200',
  STUDENT: 'bg-blue-100 text-blue-700 border-blue-200',
};

// ─── PANELS & SKELETONS ────────────────────────────────────────────────────────

function SettingsSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8 animate-pulse">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 shrink-0 space-y-4">
           <div className="h-40 bg-white rounded-2xl border border-slate-200" />
        </div>
        <div className="flex-1 space-y-6">
           <div className="h-16 bg-white rounded-2xl border border-slate-200" />
           <div className="h-[400px] bg-white rounded-2xl border border-slate-200" />
        </div>
      </div>
    </div>
  );
}

// (Sub-panels remain roughly the same, but encapsulated in the main file)

function ProfilePanel({ profile, token, onSaved }: { profile: Profile; token: string; onSaved: (p: Partial<Profile>) => void }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: profile.fullName, bio: profile.bio ?? '', phone: profile.phone ?? '', avatarUrl: profile.avatarUrl ?? '' },
  });

  const avatarUrl = watch('avatarUrl');
  const initials = profile.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const onSubmit = async (data: ProfileForm) => {
    setSaving(true);
    try {
      const updated = await userApi.updateMyProfile(token, data);
      onSaved(updated);
      setToast({ msg: 'Profile updated successfully!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message ?? 'Failed to save', type: 'error' });
    } finally { setSaving(false); }
  };

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative shrink-0">
            {avatarUrl && !avatarError ? (
              <img src={avatarUrl} alt={profile.fullName} onError={() => setAvatarError(true)} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/25">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm">
              <Camera className="w-3.5 h-3.5 text-slate-500" />
            </span>
          </div>
          <div>
            <p className="font-bold text-slate-900">{profile.fullName}</p>
            <p className="text-sm text-slate-500">{profile.email}</p>
            <span className={cn('inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border', ROLE_COLORS[profile.role] ?? 'bg-slate-100 text-slate-600 border-slate-200')}>
              {profile.role.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name *</label>
            <input {...register('fullName')} placeholder="Your full name" className={inputCls(errors.fullName?.message)} />
            <FieldError msg={errors.fullName?.message} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone</span>
            </label>
            <input {...register('phone')} placeholder="+880 1700 000000" className={inputCls(errors.phone?.message)} />
            <FieldError msg={errors.phone?.message} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <span className="flex items-center gap-1.5"><Camera className="w-3 h-3" /> Avatar URL</span>
            </label>
            <input {...register('avatarUrl')} onFocus={() => setAvatarError(false)} placeholder="https://..." className={inputCls(errors.avatarUrl?.message)} />
            <FieldError msg={errors.avatarUrl?.message} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              <span className="flex items-center gap-1.5"><FileText className="w-3 h-3" /> Bio</span>
            </label>
            <textarea {...register('bio')} rows={3} placeholder="Write a short bio about yourself..." className={cn(inputCls(errors.bio?.message), 'resize-none')} />
            <div className="flex items-center justify-between mt-1">
              <FieldError msg={errors.bio?.message} />
              <span className="text-[10px] text-slate-400">{watch('bio')?.length ?? 0}/250</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
          </button>
        </div>
      </form>
    </>
  );
}

function InstructorPanel({ profile, token }: { profile: Profile; token: string }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<InstructorForm>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      headline: profile.instructor?.headline ?? '',
      description: profile.instructor?.description ?? '',
      expertise: profile.instructor?.expertise?.join(', ') ?? '',
      websiteUrl: profile.instructor?.websiteUrl ?? '',
      linkedinUrl: profile.instructor?.linkedinUrl ?? '',
      twitterUrl: profile.instructor?.twitterUrl ?? '',
    },
  });
  const onSubmit = async (data: InstructorForm) => {
    setSaving(true);
    try {
      const expertiseArr = data.expertise ? data.expertise.split(',').map(s => s.trim()).filter(Boolean) : [];
      await userApi.updateInstructorProfile(token, { ...data, expertise: expertiseArr });
      setToast({ msg: 'Instructor profile updated!', type: 'success' });
    } catch (e: any) {
      setToast({ msg: e.message ?? 'Failed to save', type: 'error' });
    } finally { setSaving(false); }
  };
  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Headline</label>
          <input {...register('headline')} placeholder="e.g. Senior React Developer & Educator" className={inputCls(errors.headline?.message)} />
          <FieldError msg={errors.headline?.message} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Teaching Bio</label>
          <textarea {...register('description')} rows={4} placeholder="Your teaching philosophy..." className={cn(inputCls(errors.description?.message), 'resize-none')} />
          <div className="flex items-center justify-between mt-1">
             <FieldError msg={errors.description?.message} />
             <span className="text-[10px] text-slate-400">{watch('description')?.length ?? 0}/500</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Expertise</label>
          <input {...register('expertise')} placeholder="React, Node.js, Design (comma separated)" className={inputCls()} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
           {[ { n:'websiteUrl', l:'Website' }, { n:'linkedinUrl', l:'LinkedIn' }, { n:'twitterUrl', l:'Twitter' } ].map(s => (
             <div key={s.n}>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{s.l}</label>
               <input {...register(s.n as any)} placeholder="https://..." className={inputCls((errors as any)[s.n]?.message)} />
             </div>
           ))}
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Update Instructor Info
          </button>
        </div>
      </form>
    </>
  );
}

function SecurityPanel({ token }: { token: string }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordForm) => {
    setSaving(true);
    try {
      await userApi.changePassword(token, { currentPassword: data.currentPassword, newPassword: data.newPassword });
      setToast({ msg: 'Password changed successfully!', type: 'success' });
      reset();
    } catch (e: any) {
      setToast({ msg: e.message ?? 'Failed to change password', type: 'error' });
    } finally { setSaving(false); }
  };

  const PwField = ({ field, show, setShow, label, placeholder, error }: any) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <div className="relative">
        <input {...register(field)} type={show ? 'text' : 'password'} placeholder={placeholder} className={cn(inputCls(error?.message), 'pr-10')} />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <FieldError msg={error?.message} />
    </div>
  );

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">Keep your account secure with a strong password. A good password contains uppercase, lowercase, numbers and symbols.</p>
        </div>
        <PwField field="currentPassword" show={showCurrent} setShow={setShowCurrent} label="Current Password" placeholder="Your current password" error={errors.currentPassword} />
        <PwField field="newPassword" show={showNew} setShow={setShowNew} label="New Password" placeholder="At least 6 characters" error={errors.newPassword} />
        <PwField field="confirmPassword" show={showConfirm} setShow={setShowConfirm} label="Confirm New Password" placeholder="Repeat new password" error={errors.confirmPassword} />
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="bg-slate-900 border border-slate-900 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
          </button>
        </div>
      </form>
    </>
  );
}

function NotificationsPanel() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-50">
        <div className="p-4"><Toggle on={true} onToggle={()=>{}} label="New enrollment emails" /></div>
        <div className="p-4"><Toggle on={true} onToggle={()=>{}} label="Course review notifications" /></div>
        <div className="p-4"><Toggle on={false} onToggle={()=>{}} label="Promotional emails" /></div>
      </div>
      <div className="flex justify-end pt-2">
          <button onClick={save} className={cn('font-bold text-sm px-6 py-2.5 rounded-xl transition-all', saved ? 'bg-emerald-500 text-white':'bg-slate-900 text-white')}>
              {saved ? 'Saved!' : 'Save Notifications'}
          </button>
      </div>
    </div>
  );
}

function AppearancePanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {[ { i:Sun, l:'Light' }, { i:Moon, l:'Dark' }, { i:Monitor, l:'System' } ].map(t => (
           <button key={t.l} className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-200 bg-white group transition-all">
             <t.i className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
             <span className="text-xs font-bold text-slate-700">{t.l}</span>
           </button>
         ))}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
         Theme switcher coming in next update
      </div>
    </div>
  );
}

function PrivacyPanel() {
  return (
    <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-50">
       <div className="p-4"><Toggle on={true} onToggle={()=>{}} label="Show my profile in search engines" /></div>
       <div className="p-4"><Toggle on={false} onToggle={()=>{}} label="Show my enrolled courses publicy" /></div>
    </div>
  );
}

function DangerPanel() {
  return (
    <div className="space-y-5">
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
         <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-800">Delete Account</p>
              <p className="text-xs text-red-600 mt-1 leading-relaxed">This action is irreversible. All your data will be permanently wiped from our servers.</p>
            </div>
         </div>
      </div>
      <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-200 flex items-center gap-2">
         <Trash2 className="w-4 h-4" /> Delete My Account
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

interface Props { header?: React.ReactNode; }

export default function SettingsPage({ header }: Props) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const token = user?.backendToken as string | undefined;
  const role: string = user?.role ?? 'STUDENT';

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const nav = ALL_NAV.filter(n => !n.roles || n.roles.includes(role));

  const loadProfile = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try { setProfile(await userApi.getMyProfile(token)); }
    catch { /* silent */ }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { loadProfile(); }, [loadProfile]);

  if (loading) {
    return (
      <>
        {header}
        <SettingsSkeleton />
      </>
    );
  }

  const displayProfile: Profile = profile ?? { id: '', fullName: user?.name ?? '', email: user?.email ?? '', role, createdAt: '' };

  const TITLES: Record<string, string> = { profile:'Profile Information', instructor:'Instructor Page', security:'Security', notifications:'Notifications', appearance:'Appearance', privacy:'Privacy', danger:'Danger Zone' };

  return (
    <>
      {header}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 shrink-0">
             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-6">
               <nav className="p-2 space-y-0.5">
                 {nav.map(n => (
                   <button key={n.id} onClick={() => setActiveTab(n.id)}
                     className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group',
                       activeTab === n.id ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                     )}>
                     <n.icon className={cn('w-4 h-4', activeTab === n.id ? 'text-white' : 'text-slate-400')} />
                     <span className="truncate">{n.label}</span>
                   </button>
                 ))}
               </nav>
             </div>
          </aside>
          <main className="flex-1 min-w-0">
             <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                   <div>
                     <h2 className="font-bold text-slate-900">{TITLES[activeTab]}</h2>
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Manage your account preferences</p>
                   </div>
                </div>
                <div className="p-6">
                   {activeTab === 'profile' && token && <ProfilePanel profile={displayProfile} token={token} onSaved={p=>setProfile(prev => prev ? {...prev,...p} : null)} />}
                   {activeTab === 'instructor' && token && <InstructorPanel profile={displayProfile} token={token} />}
                   {activeTab === 'security' && token && <SecurityPanel token={token} />}
                   {activeTab === 'notifications' && <NotificationsPanel />}
                   {activeTab === 'appearance' && <AppearancePanel />}
                   {activeTab === 'privacy' && <PrivacyPanel />}
                   {activeTab === 'danger' && <DangerPanel />}
                </div>
             </div>
          </main>
        </div>
      </div>
    </>
  );
}
