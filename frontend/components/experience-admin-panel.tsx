'use client';

import { useState } from 'react';
import { getClientApiUrl } from '../services/api-config';
import { Experience } from '../types/portfolio';

type ExperienceDraft = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  achievements: string;
  technologies: string;
};

const emptyDraft: ExperienceDraft = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  achievements: '',
  technologies: '',
};

function toPayload(draft: ExperienceDraft) {
  return {
    company: draft.company,
    position: draft.position,
    startDate: draft.startDate,
    endDate: draft.isCurrent ? undefined : draft.endDate || undefined,
    isCurrent: draft.isCurrent,
    description: draft.description,
    achievements: draft.achievements
      .split('\n')
      .map((value) => value.trim())
      .filter(Boolean),
    technologies: draft.technologies
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

export function ExperienceAdminPanel({
  initialExperience,
}: {
  initialExperience: Experience[];
}) {
  const [items, setItems] = useState(initialExperience);
  const [draft, setDraft] = useState<ExperienceDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const url = editingId
      ? getClientApiUrl(`/experience/${editingId}`)
      : getClientApiUrl('/experience');
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
        setStatus('Experience save failed.');
        return;
      }

      const saved = (await response.json()) as Experience;
      setItems((current) => {
        if (!editingId) {
          return [saved, ...current];
        }

        return current.map((item) => (String(item.id) === editingId ? saved : item));
      });
      setDraft(emptyDraft);
      setEditingId(null);
      setStatus(editingId ? 'Experience updated.' : 'Experience created.');
    } catch {
      setStatus('Backend request failed.');
    }
  }

  function startEdit(item: Experience) {
    setEditingId(String(item.id));
    setDraft({
      company: item.company,
      position: item.position,
      startDate: item.startDate.slice(0, 10),
      endDate: item.endDate ? item.endDate.slice(0, 10) : '',
      isCurrent: item.isCurrent,
      description: item.description,
      achievements: item.achievements.join('\n'),
      technologies: item.technologies.join(', '),
    });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this experience entry?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(getClientApiUrl(`/experience/${id}`), {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        setStatus('Experience delete failed.');
        return;
      }

      setItems((current) => current.filter((item) => String(item.id) !== id));
      if (editingId === id) {
        setEditingId(null);
        setDraft(emptyDraft);
      }
      setStatus('Experience deleted.');
    } catch {
      setStatus('Backend request failed.');
    }
  }

  return (
    <div className="admin-stack">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-grid">
          <label>
            <span>Company</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, company: event.target.value }))}
              required
              value={draft.company}
            />
          </label>
          <label>
            <span>Position</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, position: event.target.value }))}
              required
              value={draft.position}
            />
          </label>
          <label>
            <span>Start date</span>
            <input
              onChange={(event) => setDraft((current) => ({ ...current, startDate: event.target.value }))}
              required
              type="date"
              value={draft.startDate}
            />
          </label>
          <label>
            <span>End date</span>
            <input
              disabled={draft.isCurrent}
              onChange={(event) => setDraft((current) => ({ ...current, endDate: event.target.value }))}
              type="date"
              value={draft.endDate}
            />
          </label>
          <label className="checkbox-row">
            <input
              checked={draft.isCurrent}
              onChange={(event) => setDraft((current) => ({ ...current, isCurrent: event.target.checked }))}
              type="checkbox"
            />
            <span>Current role</span>
          </label>
          <label>
            <span>Technologies</span>
            <input
              onChange={(event) =>
                setDraft((current) => ({ ...current, technologies: event.target.value }))
              }
              placeholder="React, Next.js, NestJS"
              value={draft.technologies}
            />
          </label>
        </div>
        <label>
          <span>Description</span>
          <textarea
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            required
            rows={5}
            value={draft.description}
          />
        </label>
        <label>
          <span>Achievements, one per line</span>
          <textarea
            onChange={(event) =>
              setDraft((current) => ({ ...current, achievements: event.target.value }))
            }
            rows={5}
            value={draft.achievements}
          />
        </label>
        {status ? <p className="form-status">{status}</p> : null}
        <div className="button-row">
          <button className="primary-button" type="submit">
            {editingId ? 'Update experience' : 'Create experience'}
          </button>
          {editingId ? (
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
        {items.map((item) => (
          <article className="admin-list-card" key={item.id}>
            <div>
              <p className="project-type">{item.isCurrent ? 'Current role' : 'Experience'}</p>
              <h3>
                {item.position} at {item.company}
              </h3>
              <p>{item.description}</p>
            </div>
            <div className="chip-row">
              {item.technologies.map((tech) => (
                <span className="chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="button-row">
              <button className="ghost-button" onClick={() => startEdit(item)} type="button">
                Edit
              </button>
              <button
                className="danger-button"
                onClick={() => handleDelete(String(item.id))}
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
