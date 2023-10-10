import { Types } from 'mongoose';

import { DefaultPaginationReturn } from '@backend';
import { PublicationValidationSchema } from '@common';
import { MongoDbPublications } from '../../database/models';
import { GetListQueryParams } from './helpers';

interface GetList extends DefaultPaginationReturn {
  publications: MongoDbPublications[];
}

export interface IPublicationsModule {
  create: (dto: PublicationValidationSchema) => Promise<MongoDbPublications>;
  delete: (id: Types.ObjectId) => Promise<void>;
  getData: (id: Types.ObjectId) => Promise<MongoDbPublications>;
  getList: (queryParams: GetListQueryParams) => Promise<GetList>;
  update: (id: Types.ObjectId, dto: PublicationValidationSchema) => Promise<MongoDbPublications>;
}
