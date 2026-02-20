import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StudentSidebar from '@/components/student/StudentSidebar';
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'Student Dashboard | Learnova',
  description: 'Manage your learning journey',
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== 'STUDENT') {
    if ((session?.user as any)?.role === 'ADMIN') redirect('/admin');
    if ((session?.user as any)?.role === 'INSTRUCTOR') redirect('/instructor');
    redirect('/login');
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <main className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
          {children}
        </main>
      </div>
    </SessionProviderWrapper>
  );
}
