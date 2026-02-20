import AdminHeader from '@/components/admin/AdminHeader';
import UsersTable from '@/components/admin/UsersTable';

export const metadata = { title: 'Users | Learnova Admin' };

export default function AdminUsersPage() {
  return (
    <>
      <AdminHeader title="Users" subtitle="Manage all platform users" />
      <div className="flex-1 p-6 overflow-y-auto">
        <UsersTable />
      </div>
    </>
  );
}
