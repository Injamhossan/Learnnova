import AdminHeader from '@/components/admin/AdminHeader';
import CreateCourseForm from '@/components/instructor/CreateCourseForm';

export const metadata = { title: 'Create Course | Instructor' };

export default function CreateCoursePage() {
  return (
    <>
      <AdminHeader title="Create New Course" subtitle="Share your knowledge with the world" />
      <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30">
        <CreateCourseForm />
      </div>
    </>
  );
}
