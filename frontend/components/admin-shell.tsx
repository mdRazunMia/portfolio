import Link from 'next/link';
import { LogoutButton } from './logout-button';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/profile', label: 'Profile' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/experience', label: 'Experience' },
];

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  email?: string;
};

export function AdminShell({
  children,
  title,
  description,
  email,
}: AdminShellProps) {
  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1 className="admin-title">Portfolio CMS</h1>
          <p className="muted-copy">{email ?? 'Authenticated session'}</p>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <section className="admin-content">
        <div className="admin-heading">
          <p className="eyebrow">Phase 3</p>
          <h2>{title}</h2>
          <p className="section-description">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
