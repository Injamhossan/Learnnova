import AdminHeader from '@/components/admin/AdminHeader';
import AdminSettings from '@/components/admin/AdminSettings';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Settings | Learnova Admin' };

export default async function AdminSettingsPage() {
  const session = await auth();
  const role = (session?.user as any)?.role?.toUpperCase();

  // Only Super Admin can access Settings
  if (role !== 'SUPER_ADMIN') {
    redirect('/admin');
  }

  return (
    <>
      <AdminHeader title="Settings" subtitle="Super Admin only — system configuration" />
      <div className="flex-1 p-6 overflow-y-auto">
        <AdminSettings />
      </div>
    </>
  );
}
