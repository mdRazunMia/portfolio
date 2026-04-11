import Link from 'next/link';
import {
  getAdminExperience,
  getAdminProfile,
  getAdminProjects,
} from '../../../../services/admin-server';

export default async function AdminDashboardPage() {
  const [profile, projects, experience] = await Promise.all([
    getAdminProfile(),
    getAdminProjects(),
    getAdminExperience(),
  ]);

  return (
    <div className="admin-stack">
      <div className="info-grid">
        <article className="info-card">
          <h3>Profile</h3>
          <p>{profile?.name ?? 'No profile saved yet'}</p>
          <p>{profile?.title ?? 'Add your public identity details'}</p>
        </article>
        <article className="info-card">
          <h3>Projects</h3>
          <p>{projects?.length ?? 0} records</p>
          <p>Featured and category-based portfolio entries.</p>
        </article>
        <article className="info-card">
          <h3>Experience</h3>
          <p>{experience?.length ?? 0} timeline items</p>
          <p>Career history powering the public timeline view.</p>
        </article>
      </div>
      <div className="admin-list">
        <article className="admin-list-card">
          <h3>Quick actions</h3>
          <div className="button-row">
            <Link className="primary-button" href="/admin/profile">
              Edit profile
            </Link>
            <Link className="ghost-button" href="/admin/projects">
              Manage projects
            </Link>
            <Link className="ghost-button" href="/admin/experience">
              Manage experience
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
