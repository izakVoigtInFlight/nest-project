import { IsEnum, IsString } from 'class-validator';
import { NodeEnvEnum } from '../utils';

export class DefaultEnvironmentVariablesSchema {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: string;

  @IsString()
  PORT: number;

  @IsString()
  GLOBAL_PREFIX: string;
}
