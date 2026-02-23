import InstructorHeader from '@/components/instructor/InstructorHeader';
import CreateCourseForm from '@/components/instructor/CreateCourseForm';

export const metadata = { title: 'Create Course | Learnova Instructor' };

export default function CreateCoursePage() {
  return (
    <>
      <InstructorHeader
        title="Create New Course"
        subtitle="Share your knowledge with the world"
      />
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-slate-50/50">
        <CreateCourseForm />
      </div>
    </>
  );
}
