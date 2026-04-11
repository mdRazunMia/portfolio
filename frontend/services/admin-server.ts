import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Experience, Profile, Project } from '../types/portfolio';
import { API_URL } from './api-config';

type AdminUser = {
  sub: string;
  email: string;
  role: string;
};

export type AdminSession = {
  user: AdminUser | null;
};

async function serverFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Cookie: `accessToken=${token}` } : {}),
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession> {
  const result = await serverFetch<{ user: AdminUser | null }>('/auth/me');
  return {
    user: result?.user ?? null,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session.user) {
    redirect('/admin/login');
  }

  return session;
}

export async function getAdminProfile() {
  return serverFetch<Profile>('/profile');
}

export async function getAdminProjects() {
  return serverFetch<Project[]>('/projects');
}

export async function getAdminExperience() {
  return serverFetch<Experience[]>('/experience');
}
