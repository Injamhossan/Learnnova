import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import InstructorSidebar from '@/components/instructor/InstructorSidebar';
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'Instructor Dashboard | Learnova',
  description: 'Manage your courses and students',
};

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userRole = (session?.user as any)?.role?.toUpperCase();
  if (!session || userRole !== 'INSTRUCTOR') {
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') redirect('/admin');
    if (userRole === 'STUDENT') redirect('/student');
    redirect('/login');
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-slate-50 flex">
        <InstructorSidebar />
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
          {children}
        </main>
      </div>
    </SessionProviderWrapper>
  );
}
