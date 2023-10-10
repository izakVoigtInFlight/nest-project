import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

import { PublicationValidationSchema } from '@common';
import { GetListQueryParams } from '../../helpers';

export const defaultPublicationReqBody: PublicationValidationSchema = {
  categoryAirline: faker.word.words(),
  categoryProcurement: faker.word.words(),
  distributor: faker.word.words(3),
  genre: [faker.word.words(), faker.word.words()],
  lab: faker.word.words(2),
  language: [faker.word.words(), faker.word.words()],
  needDrm: faker.datatype.boolean(),
  needWireless: faker.datatype.boolean(),
  originalSynopsis: faker.word.words(15),
  originalTitle: faker.word.words(3),
  originCountry: faker.word.words(),
  quantity: faker.number.int(),
};

export const defaultParamIdPublication: Types.ObjectId = new Types.ObjectId(faker.database.mongodbObjectId());

export const defaultGetListQueryParams: GetListQueryParams = {
  page: faker.number.int({ max: 20, min: 1 }),
  perPage: faker.number.int({ max: 50, min: 10 }),
  originalTitle: faker.word.words(),
};
