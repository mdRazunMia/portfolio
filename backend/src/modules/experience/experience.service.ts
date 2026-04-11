import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const experienceId = Number(id);
    const experience = await this.prisma.experience.findUnique({
      where: { id: experienceId },
      select: { id: true },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return this.prisma.experience.update({
      where: { id: experienceId },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    const experienceId = Number(id);
    const experience = await this.prisma.experience.findUnique({
      where: { id: experienceId },
      select: { id: true },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.prisma.experience.delete({
      where: { id: experienceId },
    });

    return { success: true };
  }
}
