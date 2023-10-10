import { defaultEnvironmentVariables, DefaultEnvironmentVariablesSchema } from '@backend';
import { IsString } from 'class-validator';

export const environment = () => ({
  ...defaultEnvironmentVariables(),
  mongoDbUri: process.env.MONGODB_URI,
});

export class EnviromentVariables extends DefaultEnvironmentVariablesSchema {
  @IsString()
  MONGODB_URI: string;
}
