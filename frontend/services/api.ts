import { Experience, Profile, Project } from '../types/portfolio';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getProfile() {
  return fetchFromApi<Profile>('/profile');
}

export async function getProjects(type?: Project['type']) {
  const query = type ? `?type=${type}` : '';
  return fetchFromApi<Project[]>(`/projects${query}`);
}

export async function getExperience() {
  return fetchFromApi<Experience[]>('/experience');
}
