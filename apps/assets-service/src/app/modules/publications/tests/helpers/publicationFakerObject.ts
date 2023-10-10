import { faker } from '@faker-js/faker';
import { mongoDefaultFakerObject } from '@common';
import { MongoDbPublications } from '../../../../database/models';

export const publicationFakerObject: MongoDbPublications = {
  ...mongoDefaultFakerObject,
  categoryAirline: faker.word.words(),
  categoryProcurement: faker.word.words(),
  distributor: faker.word.words(3),
  genre: [faker.word.words(), faker.word.words()],
  lab: faker.word.words(2),
  language: [faker.word.words(), faker.word.words()],
  needDrm: faker.datatype.boolean(),
  needWireless: faker.datatype.boolean(),
  notes: faker.word.words(10),
  originalSynopsis: faker.word.words(15),
  originalTitle: faker.word.words(3),
  originCountry: faker.word.words(),
  quantity: faker.number.int(),
};
