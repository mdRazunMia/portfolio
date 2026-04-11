import { redirect } from 'next/navigation';
import { AdminLoginForm } from '../../../components/admin-login-form';
import { getAdminSession } from '../../../services/admin-server';

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session.user) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <p className="eyebrow">Admin Access</p>
        <h1>Sign in to manage your portfolio content.</h1>
        <p className="section-description">
          Phase 3 connects this login directly to the NestJS auth endpoint and the
          `httpOnly` admin cookie.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
