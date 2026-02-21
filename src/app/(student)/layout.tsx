import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import StudentLayoutShell from '@/components/student/StudentLayoutShell';
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

  const userRole = (session?.user as any)?.role?.toUpperCase();
  if (!session || userRole !== 'STUDENT') {
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') redirect('/admin');
    if (userRole === 'INSTRUCTOR') redirect('/instructor');
    redirect('/login');
  }

  return (
    <SessionProviderWrapper>
      <StudentLayoutShell>{children}</StudentLayoutShell>
    </SessionProviderWrapper>
  );
}
