import { ClassConstructor } from 'class-transformer';
import { DefaultEnvironmentVariablesSchema } from '../schemas';
export declare class EnvironmentVariablesValidator<T extends DefaultEnvironmentVariablesSchema> {
    private schema;
    constructor(schema: ClassConstructor<T>);
    validateConfig(config: Record<string, unknown>): Promise<T>;
    private formatValidationErrors;
}
