import SettingsPage from '@/components/shared/SettingsPage';
import InstructorHeader from '@/components/instructor/InstructorHeader';

export default function InstructorSettingsPage() {
  return (
    <SettingsPage
      header={<InstructorHeader title="Settings" subtitle="Manage your account, profile & preferences" />}
    />
  );
}
