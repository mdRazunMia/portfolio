import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!adminEmail || !adminPassword) {
      throw new UnauthorizedException('Admin credentials are not configured');
    }

    const emailMatches = loginDto.email === adminEmail;
    const passwordMatches =
      loginDto.password === adminPassword ||
      (await this.matchesHashedPassword(loginDto.password, adminPassword));

    if (!emailMatches || !passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: adminEmail,
      email: adminEmail,
      role: 'admin',
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  private async matchesHashedPassword(
    incomingPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const looksHashed = /^\$2[aby]\$/.test(storedPassword);

    if (!looksHashed) {
      return false;
    }

    return bcrypt.compare(incomingPassword, storedPassword);
  }
}
