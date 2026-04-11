import { ExperienceAdminPanel } from '../../../../components/experience-admin-panel';
import { getAdminExperience } from '../../../../services/admin-server';

export default async function AdminExperiencePage() {
  const experience = (await getAdminExperience()) ?? [];

  return <ExperienceAdminPanel initialExperience={experience} />;
}
