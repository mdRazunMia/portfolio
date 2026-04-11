import { Body, Controller, Get, Put } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { UpsertProfileDto } from './dto/upsert-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Get()
  getProfile() {
    return this.profileService.getProfile();
  }

  @Put()
  upsertProfile(@Body() dto: UpsertProfileDto) {
    return this.profileService.upsertProfile(dto);
  }
}
