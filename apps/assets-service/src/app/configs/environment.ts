import { ConfigModuleOptions } from '@nestjs/config';
import { EnvironmentVariablesValidator } from '@backend';
import { environment, EnviromentVariables } from '../validations';

export const configModuleOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [environment],
  validate: new EnvironmentVariablesValidator(EnviromentVariables).validateConfig,
};
