import SettingsPage from '@/components/shared/SettingsPage';
import StudentHeader from '@/components/student/StudentHeader';

export default function StudentSettingsPage() {
  return (
    <SettingsPage
      header={<StudentHeader title="Settings" subtitle="Manage your account, profile & preferences" />}
    />
  );
}
