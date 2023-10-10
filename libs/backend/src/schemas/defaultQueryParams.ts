import { IsInt, IsNotEmpty } from 'class-validator';

export class DefaultQueryParams {
  @IsNotEmpty()
  @IsInt()
  readonly page: number;

  @IsNotEmpty()
  @IsInt()
  readonly perPage: number;
}
