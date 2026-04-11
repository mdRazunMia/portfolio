'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getClientApiUrl } from '../services/api-config';

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    };

    try {
      const response = await fetch(getClientApiUrl('/auth/login'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError('Login failed. Check your configured admin credentials.');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('The backend is unreachable right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-form login-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input name="email" required type="email" />
      </label>
      <label>
        <span>Password</span>
        <input name="password" required type="password" />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
