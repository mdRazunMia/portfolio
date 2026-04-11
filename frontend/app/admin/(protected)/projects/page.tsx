import { ProjectsAdminPanel } from '../../../../components/projects-admin-panel';
import { getAdminProjects } from '../../../../services/admin-server';

export default async function AdminProjectsPage() {
  const projects = (await getAdminProjects()) ?? [];

  return <ProjectsAdminPanel initialProjects={projects} />;
}
