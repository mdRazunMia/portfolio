import Link from 'next/link';
import { ProjectGrid } from '../../components/project-grid';
import { SectionShell } from '../../components/section-shell';
import { getProjects } from '../../services/api';
import { Project } from '../../types/portfolio';

const filters: Array<{ type?: Project['type']; label: string; href: string }> = [
  { label: 'All', href: '/projects' },
  { type: 'plugin', label: 'Plugins', href: '/projects?type=plugin' },
  { type: 'enterprise', label: 'Enterprise', href: '/projects?type=enterprise' },
  { type: 'personal', label: 'Personal', href: '/projects?type=personal' },
];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: Project['type'] }>;
}) {
  const params = await searchParams;
  const projects = (await getProjects(params.type)) ?? [];

  return (
    <main className="page-stack">
      <SectionShell
        eyebrow="Projects"
        title="Work filtered by product context"
        description="The public portfolio is already wired for plugin, enterprise, and personal project categories."
      >
        <div className="filter-row">
          {filters.map((filter) => {
            const activeType = params.type ?? '';
            const filterType = filter.type ?? '';

            return (
              <Link
                className={activeType === filterType ? 'filter-pill active' : 'filter-pill'}
                href={filter.href}
                key={filter.href}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
        <ProjectGrid projects={projects} />
      </SectionShell>
    </main>
  );
}
