import Link from 'next/link';
import { Project } from '../types/portfolio';

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects.length) {
    return <p className="empty-state">Projects will appear here once content is added.</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.id}>
          <p className="project-type">{project.type}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="chip-row">
            {project.technologies.map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <div className="project-links">
            {project.liveUrl ? <Link href={project.liveUrl}>Live</Link> : null}
            {project.githubUrl ? <Link href={project.githubUrl}>Code</Link> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
