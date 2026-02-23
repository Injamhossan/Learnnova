import SettingsPage from '@/components/shared/SettingsPage';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = { title: 'Settings | Learnova Admin' };

// Accessible to all admins (not just super admin anymore)
export default function AdminSettingsPage() {
  return (
    <SettingsPage
      header={<AdminHeader title="Settings" subtitle="Manage your account, profile & preferences" />}
    />
  );
}
