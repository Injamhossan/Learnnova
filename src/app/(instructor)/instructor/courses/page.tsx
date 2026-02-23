import InstructorHeader from '@/components/instructor/InstructorHeader';
import CourseList from '@/components/instructor/CourseList';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata = { title: 'My Courses | Learnova Instructor' };

export default function InstructorCoursesPage() {
  return (
    <>
      <InstructorHeader
        title="My Courses"
        subtitle="Manage your published and draft courses"
        actions={
          <Link
            href="/instructor/courses/create"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> New Course
          </Link>
        }
      />
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-slate-50/50">
        <CourseList />
      </div>
    </>
  );
}
