import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper';


export const metadata: Metadata = {
  title: 'Admin Dashboard | Learnova',
  description: 'Learnova platform administration',
};

import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userRole = (session?.user as any)?.role?.toUpperCase();
  if (!session || (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN')) {
    if (userRole === 'INSTRUCTOR') redirect('/instructor');
    if (userRole === 'STUDENT') redirect('/student');
    redirect('/login');
  }

  return (
    <SessionProviderWrapper>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </SessionProviderWrapper>
  );
}
