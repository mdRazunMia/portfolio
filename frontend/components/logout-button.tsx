'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getClientApiUrl } from '../services/api-config';

export function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch(getClientApiUrl('/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      router.push('/admin/login');
      router.refresh();
      setIsSubmitting(false);
    }
  }

  return (
    <button className="ghost-button" onClick={handleLogout} type="button">
      {isSubmitting ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
