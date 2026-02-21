import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'Instructor Dashboard | Learnova',
  description: 'Manage your courses and students',
};

import InstructorLayoutShell from '@/components/instructor/InstructorLayoutShell';

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
      <InstructorLayoutShell>{children}</InstructorLayoutShell>
    </SessionProviderWrapper>
  );
}
