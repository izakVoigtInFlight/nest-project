import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configModuleOptions, mongoDbOptions } from './configs';
import { PublicationsModule } from './modules/publications/module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), MongooseModule.forRootAsync(mongoDbOptions), PublicationsModule],
})
export class AppModule {}
