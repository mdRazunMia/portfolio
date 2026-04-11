'use client';

import { useMemo, useState } from 'react';
import { getClientApiUrl } from '../services/api-config';
import { Project } from '../types/portfolio';

type ProjectsAdminPanelProps = {
  initialProjects: Project[];
};

type ProjectDraft = {
  title: string;
  description: string;
  type: Project['type'];
  technologies: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
};

const emptyDraft: ProjectDraft = {
  title: '',
  description: '',
  type: 'personal',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  image: '',
  featured: false,
};

function toPayload(draft: ProjectDraft) {
  const optionalUrl = (value: string) => {
    const trimmed = value.trim();
    return trimmed || undefined;
  };

  return {
    title: draft.title,
    description: draft.description,
    type: draft.type,
    technologies: draft.technologies
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
    liveUrl: optionalUrl(draft.liveUrl),
    githubUrl: optionalUrl(draft.githubUrl),
    image: optionalUrl(draft.image),
    featured: draft.featured,
  };
}

export function ProjectsAdminPanel({ initialProjects }: ProjectsAdminPanelProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [draft, setDraft] = useState<ProjectDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const url = editingId
      ? getClientApiUrl(`/projects/${editingId}`)
      : getClientApiUrl('/projects');
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPayload(draft)),
      });

      if (!response.ok) {
        setStatus('Project save failed.');
        return;
      }

      const saved = (await response.json()) as Project;
      setProjects((current) => {
        if (!editingId) {
          return [saved, ...current];
        }

        return current.map((project) => (String(project.id) === editingId ? saved : project));
      });
      setDraft(emptyDraft);
      setEditingId(null);
      setStatus(editingId ? 'Project updated.' : 'Project created.');
    } catch {
      setStatus('Backend request failed.');
    }
  }

  function startEdit(project: Project) {
    setEditingId(String(project.id));
    setDraft({
      title: project.title,
      description: project.description,
      type: project.type,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      image: project.image ?? '',
      featured: project.featured,
    });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this project?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(getClientApiUrl(`/projects/${id}`), {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        setStatus('Project delete failed.');
        return;
      }

      setProjects((current) => current.filter((project) => String(project.id) !== id));
      if (editingId === id) {
        setDraft(emptyDraft);
        setEditingId(null);
      }
      setStatus('Project deleted.');
    } catch {
      setStatus('Backend request failed.');
    }
  }

  return (
    <div className="admin-stack">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-grid">
          <label>
            <span>Title</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              required
              value={draft.title}
            />
          </label>
          <label>
            <span>Type</span>
            <select
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  type: event.target.value as Project['type'],
                }))
              }
              value={draft.type}
            >
              <option value="plugin">Plugin</option>
              <option value="enterprise">Enterprise</option>
              <option value="personal">Personal</option>
            </select>
          </label>
          <label>
            <span>Live URL</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, liveUrl: event.target.value }))}
              type="url"
              value={draft.liveUrl}
            />
          </label>
          <label>
            <span>GitHub URL</span>
            <input
              onChange={(event) =>
                setDraft((current) => ({ ...current, githubUrl: event.target.value }))
              }
              type="url"
              value={draft.githubUrl}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))}
              type="url"
              value={draft.image}
            />
          </label>
          <label>
            <span>Technologies</span>
            <input
              onChange={(event) =>
                setDraft((current) => ({ ...current, technologies: event.target.value }))
              }
              placeholder="Next.js, NestJS, MongoDB"
              value={draft.technologies}
            />
          </label>
        </div>
        <label>
          <span>Description</span>
          <textarea
            onChange={(event) =>
              setDraft((current) => ({ ...current, description: event.target.value }))
            }
            required
            rows={5}
            value={draft.description}
          />
        </label>
        <label className="checkbox-row">
          <input
            checked={draft.featured}
            onChange={(event) =>
              setDraft((current) => ({ ...current, featured: event.target.checked }))
            }
            type="checkbox"
          />
          <span>Mark as featured</span>
        </label>
        {status ? <p className="form-status">{status}</p> : null}
        <div className="button-row">
          <button className="primary-button" type="submit">
            {isEditing ? 'Update project' : 'Create project'}
          </button>
          {isEditing ? (
            <button
              className="ghost-button"
              onClick={() => {
                setEditingId(null);
                setDraft(emptyDraft);
              }}
              type="button"
            >
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="admin-list">
        {projects.map((project) => (
          <article className="admin-list-card" key={project.id}>
            <div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="chip-row">
              {project.technologies.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="button-row">
              <button className="ghost-button" onClick={() => startEdit(project)} type="button">
                Edit
              </button>
              <button
                className="danger-button"
                onClick={() => handleDelete(String(project.id))}
                type="button"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
