import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';

function loadEnvFile() {
  const envPath = join(process.cwd(), '.env');

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const profileSeed = {
  name: 'Razun Ahmed',
  title: 'Full-Stack Developer building scalable products and WordPress solutions',
  summary:
    'I build dynamic products across web platforms with a focus on performance, maintainability, and business impact. My work spans custom WordPress plugins, modern JavaScript applications, and enterprise-grade delivery for public and private sector teams.',
  location: 'Dhaka, Bangladesh',
  phone: '+8801000000000',
  email: 'razun@example.com',
  github: 'https://github.com/razun',
  linkedin: 'https://linkedin.com/in/razun',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
};

const projectsSeed = [
  {
    title: 'WordPress Video Routing Plugin',
    description:
      'Built a production WordPress plugin workflow focused on admin usability, telemetry, and faster content operations for media-heavy teams.',
    type: 'plugin' as const,
    technologies: ['PHP', 'WordPress', 'JavaScript', 'AJAX'],
    liveUrl: 'https://example.com/plugin-case-study',
    githubUrl: 'https://github.com/razun/wp-video-routing',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    featured: true,
  },
  {
    title: 'Government Service Delivery Platform',
    description:
      'Delivered a structured frontend and backend experience for a government-facing workflow with strong emphasis on clarity, scale, and operational reliability.',
    type: 'enterprise' as const,
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'TypeScript'],
    liveUrl: 'https://example.com/gov-platform',
    githubUrl: 'https://github.com/razun/gov-service-platform',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    featured: true,
  },
  {
    title: 'Personal Portfolio CMS',
    description:
      'A dynamic portfolio platform with a CMS-style admin panel, public SEO-friendly frontend, and modular backend architecture.',
    type: 'personal' as const,
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'Tailwind CSS'],
    liveUrl: 'https://example.com/personal-portfolio',
    githubUrl: 'https://github.com/razun/personal-portfolio',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    featured: true,
  },
];

const experienceSeed = [
  {
    company: 'Independent / Contract',
    position: 'Full-Stack Developer',
    startDate: new Date('2023-01-01'),
    endDate: undefined,
    isCurrent: true,
    description:
      'Building modern web products, backend APIs, and custom plugin solutions for product teams and business stakeholders.',
    achievements: [
      'Delivered admin-driven systems that reduced hardcoded content updates.',
      'Improved page delivery performance through lean rendering patterns and optimized data flow.',
      'Handled both product implementation and deployment planning across frontend and backend stacks.',
    ],
    technologies: ['Next.js', 'NestJS', 'MongoDB', 'WordPress', 'TypeScript'],
  },
  {
    company: 'Enterprise Solutions Team',
    position: 'Software Engineer',
    startDate: new Date('2021-03-01'),
    endDate: new Date('2022-12-31'),
    isCurrent: false,
    description:
      'Worked on internal and client-facing business platforms with a focus on maintainable delivery, clear interfaces, and scalable architecture.',
    achievements: [
      'Implemented reusable UI and API patterns across multiple projects.',
      'Collaborated with stakeholders to break down complex requirements into phased releases.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

async function seed() {
  loadEnvFile();
  const prisma = new PrismaClient();

  await prisma.profile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();

  await prisma.profile.create({ data: profileSeed });
  await prisma.project.createMany({ data: projectsSeed });
  await prisma.experience.createMany({ data: experienceSeed });

  console.log('Seed completed successfully.');
  await prisma.$disconnect();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
