export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export function getClientApiUrl(path: string) {
  return `${API_URL}${path}`;
}
