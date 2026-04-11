import { ExperienceTimeline } from '../../components/experience-timeline';
import { SectionShell } from '../../components/section-shell';
import { getExperience } from '../../services/api';

export default async function ExperiencePage() {
  const experience = (await getExperience()) ?? [];

  return (
    <main className="page-stack">
      <SectionShell
        eyebrow="Experience"
        title="A timeline designed for depth, not just dates"
        description="This page is ready to render work history from the backend in reverse chronological order."
      >
        <ExperienceTimeline items={experience} />
      </SectionShell>
    </main>
  );
}
