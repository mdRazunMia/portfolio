export type Profile = {
  name: string;
  title: string;
  summary: string;
  location?: string;
  phone?: string;
  email: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  type: 'plugin' | 'enterprise' | 'personal';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
};

export type Experience = {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};
