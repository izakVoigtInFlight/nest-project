import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { Types } from 'mongoose';

import { MongoIdValidationPipe } from '@backend';
import { CreatePublicationValidation, UpdatePublicationValidation } from '@common';
import { GetListQueryParams } from './helpers';
import { IPublicationsModule } from './interface';
import { PublicationsService } from './service';

@Controller('publications')
export class PublicationsController implements IPublicationsModule {
  constructor(@Inject(PublicationsService) private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() dto: CreatePublicationValidation) {
    return this.publicationsService.create(dto);
  }

  @Delete(':publicationId')
  delete(@Param('publicationId', MongoIdValidationPipe) id: Types.ObjectId) {
    return this.publicationsService.delete(id);
  }

  @Get(':publicationId')
  getData(@Param('publicationId', MongoIdValidationPipe) id: Types.ObjectId) {
    return this.publicationsService.getData(id);
  }

  @Get()
  getList(@Query() queryParams: GetListQueryParams) {
    return this.publicationsService.getList(queryParams);
  }

  @Patch(':publicationId')
  update(@Param('publicationId', MongoIdValidationPipe) id: Types.ObjectId, @Body() dto: UpdatePublicationValidation) {
    return this.publicationsService.update(id, dto);
  }
}
