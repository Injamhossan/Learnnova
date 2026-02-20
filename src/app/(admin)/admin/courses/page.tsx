import AdminHeader from '@/components/admin/AdminHeader';
import CoursesTable from '@/components/admin/CoursesTable';

export const metadata = { title: 'Courses | Learnova Admin' };

export default function AdminCoursesPage() {
  return (
    <>
      <AdminHeader title="Courses" subtitle="Manage all platform courses" />
      <div className="flex-1 p-6 overflow-y-auto">
        <CoursesTable />
      </div>
    </>
  );
}
