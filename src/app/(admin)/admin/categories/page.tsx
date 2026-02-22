import AdminHeader from '@/components/admin/AdminHeader';
import CategoriesManager from '@/components/admin/CategoriesManager';

export const metadata = { title: 'Categories | Learnova Admin' };

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminHeader title="Categories" subtitle="Manage course categories" />
      <div className="flex-1 p-6 overflow-y-auto">
        <CategoriesManager />
      </div>
    </>
  );
}
