import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(['plugin', 'enterprise', 'personal'])
  type!: 'plugin' | 'enterprise' | 'personal';

  @IsArray()
  @IsString({ each: true })
  technologies!: string[];

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
