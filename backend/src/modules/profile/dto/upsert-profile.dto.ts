import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpsertProfileDto {
  @IsString()
  name!: string;

  @IsString()
  title!: string;

  @IsString()
  summary!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsUrl()
  github?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
