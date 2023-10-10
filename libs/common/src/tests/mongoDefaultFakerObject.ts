import { faker } from '@faker-js/faker';

export const mongoDefaultFakerObject = {
  _id: faker.database.mongodbObjectId(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};
