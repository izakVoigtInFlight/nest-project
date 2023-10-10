import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ErrorHandler } from '@backend';
import { PublicationValidationSchema } from '@common';
import { MongoDbPublications } from '../../database/models';
import { GetListQueryParams } from './helpers';
import { IPublicationsModule } from './interface';

@Injectable()
export class PublicationsService implements IPublicationsModule {
  constructor(
    @InjectModel(MongoDbPublications.name) private readonly publicationsModel: Model<MongoDbPublications>,
    @Inject(ErrorHandler) private readonly errorHandler: ErrorHandler,
  ) {}

  public async create(dto: PublicationValidationSchema) {
    try {
      const newPublication = await this.publicationsModel.create(dto);

      return newPublication;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  public async delete(id: Types.ObjectId) {
    try {
      const publication = await this.publicationsModel.findByIdAndDelete(id);

      if (!publication) throw new NotFoundException('Publication not found');
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  public async getData(id: Types.ObjectId) {
    try {
      const publication = await this.publicationsModel.findById(id).lean();

      if (!publication) throw new NotFoundException('Publication not found');

      return publication;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  public async getList(queryParams: GetListQueryParams) {
    const { page, perPage, originalTitle } = queryParams;
    const skip = (page - 1) * perPage;

    const query = this.publicationsModel.find();

    if (originalTitle) {
      query.where('originalTitle').regex(new RegExp(originalTitle, 'i'));
    }

    try {
      const [publications, total] = await Promise.all([
        query.skip(skip).limit(perPage).lean().exec(),
        this.publicationsModel.countDocuments(query.getQuery()),
      ]);

      return {
        total,
        page,
        perPage,
        publications,
      };
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  public async update(id: Types.ObjectId, dto: PublicationValidationSchema) {
    try {
      const publication = await this.publicationsModel.findByIdAndUpdate(id, dto, { new: true }).lean();

      if (!publication) throw new NotFoundException('Publication not found');

      return publication;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}
