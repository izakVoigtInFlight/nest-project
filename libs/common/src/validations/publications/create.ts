import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePublicationValidation {
  @IsNotEmpty()
  @IsString()
  readonly categoryAirline: string;

  @IsNotEmpty()
  @IsString()
  readonly categoryProcurement: string;

  @IsNotEmpty()
  @IsString()
  readonly distributor: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly genre: string[];

  @IsNotEmpty()
  @IsString()
  readonly lab: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly language: string[];

  @IsNotEmpty()
  @IsBoolean()
  readonly needDrm: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly needWireless: boolean;

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  readonly originalSynopsis: string;

  @IsNotEmpty()
  @IsString()
  readonly originalTitle: string;

  @IsNotEmpty()
  @IsString()
  readonly originCountry: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly quantity: number;
}
