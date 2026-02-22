import AdminHeader from '@/components/admin/AdminHeader';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export const metadata = { title: 'Analytics | Learnova Admin' };

export default function AdminAnalyticsPage() {
  return (
    <>
      <AdminHeader title="Analytics" subtitle="Operational metrics and platform insights" />
      <div className="flex-1 p-6 overflow-y-auto">
        <AnalyticsDashboard />
      </div>
    </>
  );
}
