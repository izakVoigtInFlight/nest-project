import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { corsOptions, requestLogger, validationPipeOptions } from '@backend';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const port = configService.get<number>('port');
    const globalPrefix = configService.get<string>('globalPrefix');

    app.use(requestLogger);

    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    app.enableCors(corsOptions);
    app.use(helmet());

    app.setGlobalPrefix(globalPrefix);

    await app.listen(port);

    Logger.log(`[NestApplication] Running on: http://localhost:${port}/${globalPrefix}`);
  } catch (error) {
    Logger.error(error);

    process.exit(1);
  }
}

bootstrap();
