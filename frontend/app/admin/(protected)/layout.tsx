import { AdminShell } from '../../../components/admin-shell';
import { requireAdminSession } from '../../../services/admin-server';

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();

  return (
    <AdminShell
      description="Manage your profile content and keep the public portfolio fully dynamic."
      email={session.user?.email}
      title="Content operations"
    >
      {children}
    </AdminShell>
  );
}
