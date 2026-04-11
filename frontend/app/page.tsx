import { Hero } from '../components/hero';
import { ProjectGrid } from '../components/project-grid';
import { SectionShell } from '../components/section-shell';
import { getProfile, getProjects } from '../services/api';

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const featuredProjects = (projects ?? []).filter((project) => project.featured).slice(0, 3);

  return (
    <main className="page-stack">
      <Hero profile={profile} featuredCount={featuredProjects.length} />
      <SectionShell
        eyebrow="Highlights"
        title="Featured work"
        description="Projects are loaded from the API so the homepage can stay fresh without code edits."
      >
        <ProjectGrid projects={featuredProjects} />
      </SectionShell>
    </main>
  );
}
