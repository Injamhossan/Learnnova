import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper';


export const metadata: Metadata = {
  title: 'Admin Dashboard | Learnova',
  description: 'Learnova platform administration',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userRole = (session?.user as any)?.role?.toUpperCase();
  if (!session || (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN')) {
    redirect('/login');
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        {/* Main content — offset by sidebar width */}
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
          {children}
        </main>
      </div>
    </SessionProviderWrapper>
  );
}
