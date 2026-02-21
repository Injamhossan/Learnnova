import AdminHeader from '@/components/admin/AdminHeader';
import StudentsList from '@/components/instructor/StudentsList';

export const metadata = { title: 'My Students | Instructor' };

export default function InstructorStudentsPage() {
  return (
    <>
      <AdminHeader title="My Students" subtitle="Track your student progress and engagement" />
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30">
        <StudentsList />
      </div>
    </>
  );
}
