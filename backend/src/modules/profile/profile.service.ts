import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    return this.prisma.profile.findFirst({
      orderBy: { id: 'asc' },
    });
  }

  async upsertProfile(dto: UpsertProfileDto) {
    const existing = await this.prisma.profile.findFirst({
      orderBy: { id: 'asc' },
      select: { id: true },
    });

    if (existing) {
      return this.prisma.profile.update({
        where: { id: existing.id },
        data: dto,
      });
    }

    return this.prisma.profile.create({
      data: dto,
    });
  }
}
