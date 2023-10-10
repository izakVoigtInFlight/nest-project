import { ArrayMinSize, IsArray, IsBoolean, IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdatePublicationValidation {
  @IsOptional()
  @IsString()
  categoryAirline?: string;

  @IsOptional()
  @IsString()
  categoryProcurement?: string;

  @IsOptional()
  @IsString()
  distributor?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  genre?: string[];

  @IsOptional()
  @IsString()
  lab?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  language?: string[];

  @IsOptional()
  @IsBoolean()
  needDrm?: boolean;

  @IsOptional()
  @IsBoolean()
  needWireless?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  originalSynopsis?: string;

  @IsOptional()
  @IsString()
  originalTitle?: string;

  @IsOptional()
  @IsString()
  originCountry?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
