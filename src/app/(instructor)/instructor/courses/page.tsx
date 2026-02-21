import AdminHeader from '@/components/admin/AdminHeader';
import CourseList from '@/components/instructor/CourseList';

export const metadata = { title: 'My Courses | Instructor' };

export default function InstructorCoursesPage() {
  return (
    <>
      <AdminHeader title="My Courses" subtitle="Manage and monitor your course performance" />
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30">
        <CourseList />
      </div>
    </>
  );
}
