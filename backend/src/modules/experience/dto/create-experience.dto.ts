import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  company!: string;

  @IsString()
  position!: string;

  @IsDateString()
  startDate!: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  achievements!: string[];

  @IsArray()
  @IsString({ each: true })
  technologies!: string[];
}
