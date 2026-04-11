'use client';

import { FormEvent, useState } from 'react';
import { getClientApiUrl } from '../services/api-config';
import { Profile } from '../types/portfolio';

type ProfileAdminFormProps = {
  initialProfile: Profile | null;
};

export function ProfileAdminForm({ initialProfile }: ProfileAdminFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const optionalValue = (key: string) => {
      const value = String(formData.get(key) ?? '').trim();
      return value || undefined;
    };

    const payload = {
      name: String(formData.get('name') ?? ''),
      title: String(formData.get('title') ?? ''),
      summary: String(formData.get('summary') ?? ''),
      location: optionalValue('location'),
      phone: optionalValue('phone'),
      email: String(formData.get('email') ?? ''),
      github: optionalValue('github'),
      linkedin: optionalValue('linkedin'),
      avatar: optionalValue('avatar'),
    };

    try {
      const response = await fetch(getClientApiUrl('/profile'), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setStatus(response.ok ? 'Profile saved.' : 'Profile update failed.');
    } catch {
      setStatus('Backend request failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-grid">
        <label>
          <span>Name</span>
          <input defaultValue={initialProfile?.name ?? ''} name="name" required />
        </label>
        <label>
          <span>Title</span>
          <input defaultValue={initialProfile?.title ?? ''} name="title" required />
        </label>
        <label>
          <span>Email</span>
          <input defaultValue={initialProfile?.email ?? ''} name="email" required type="email" />
        </label>
        <label>
          <span>Location</span>
          <input defaultValue={initialProfile?.location ?? ''} name="location" />
        </label>
        <label>
          <span>Phone</span>
          <input defaultValue={initialProfile?.phone ?? ''} name="phone" />
        </label>
        <label>
          <span>Avatar URL</span>
          <input defaultValue={initialProfile?.avatar ?? ''} name="avatar" type="url" />
        </label>
        <label>
          <span>GitHub URL</span>
          <input defaultValue={initialProfile?.github ?? ''} name="github" type="url" />
        </label>
        <label>
          <span>LinkedIn URL</span>
          <input defaultValue={initialProfile?.linkedin ?? ''} name="linkedin" type="url" />
        </label>
      </div>
      <label>
        <span>Summary</span>
        <textarea defaultValue={initialProfile?.summary ?? ''} name="summary" required rows={6} />
      </label>
      {status ? <p className="form-status">{status}</p> : null}
      <button className="primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  );
}
