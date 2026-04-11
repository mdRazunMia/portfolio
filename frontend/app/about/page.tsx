import { SectionShell } from '../../components/section-shell';
import { getProfile, getProjects } from '../../services/api';

export default async function AboutPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const projectCount = projects?.length ?? 0;

  return (
    <main className="page-stack">
      <SectionShell
        eyebrow="About"
        title={profile?.title ?? 'A portfolio shaped for serious engineering work'}
        description={profile?.summary}
      >
        <div className="info-grid">
          <article className="info-card">
            <h3>Profile</h3>
            <p>{profile?.name ?? 'Your profile data will appear here.'}</p>
            <p>{profile?.location ?? 'Location pending'}</p>
          </article>
          <article className="info-card">
            <h3>Project coverage</h3>
            <p>{projectCount} project records currently available through the API.</p>
            <p>The admin panel will keep this section dynamic instead of hardcoded.</p>
          </article>
        </div>
      </SectionShell>
    </main>
  );
}
