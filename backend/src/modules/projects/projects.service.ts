import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(type?: string) {
    return this.prisma.project.findMany({
      where: type ? { type: type as 'plugin' | 'enterprise' | 'personal' } : undefined,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    const projectId = Number(id);
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.prisma.project.update({
      where: { id: projectId },
      data: dto,
    });
  }

  async remove(id: string) {
    const projectId = Number(id);
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return { success: true };
  }
}
