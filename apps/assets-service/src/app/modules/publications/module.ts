import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorHandler } from '@backend';
import { MongoDbPublications, MongoDbPublicationsSchema } from '../../database/models';
import { PublicationsController } from './controller';
import { PublicationsService } from './service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MongoDbPublications.name, schema: MongoDbPublicationsSchema }])],
  controllers: [PublicationsController],
  providers: [PublicationsService, ErrorHandler],
})
export class PublicationsModule {}
