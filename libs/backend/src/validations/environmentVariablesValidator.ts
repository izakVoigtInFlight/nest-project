import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { DefaultEnvironmentVariablesSchema } from '../schemas';

export class EnvironmentVariablesValidator<T extends DefaultEnvironmentVariablesSchema> {
  private schema: ClassConstructor<T>;

  constructor(schema: ClassConstructor<T>) {
    this.schema = schema;
  }

  async validateConfig(config: Record<string, unknown>): Promise<T> {
    const validatedConfig = plainToClass(this.schema, config, { enableImplicitConversion: true });

    try {
      await validate(validatedConfig, { skipMissingProperties: false });
      return validatedConfig;
    } catch (validationErrors) {
      throw new Error(this.formatValidationErrors(validationErrors as ValidationError[]));
    }
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors.map(error => (error.constraints ? Object.values(error.constraints) : [])).join('\n');
  }
}
