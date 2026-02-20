import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import EnrollmentChart from '@/components/admin/EnrollmentChart';
import RecentUsers from '@/components/admin/RecentUsers';
import PopularCourses from '@/components/admin/PopularCourses';

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader
        title="Admin Dashboard"
        subtitle="Platform overview and key metrics"
      />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats Row */}
        <DashboardStats />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnrollmentChart />
          </div>
          <div>
            <RecentUsers />
          </div>
        </div>

        {/* Popular Courses */}
        <PopularCourses />
      </div>
    </>
  );
}
