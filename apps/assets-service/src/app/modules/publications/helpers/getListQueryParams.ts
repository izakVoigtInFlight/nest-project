import { IsOptional, IsString } from 'class-validator';
import { DefaultQueryParams } from '@backend';

export class GetListQueryParams extends DefaultQueryParams {
  @IsOptional()
  @IsString()
  readonly originalTitle?: string;
}
