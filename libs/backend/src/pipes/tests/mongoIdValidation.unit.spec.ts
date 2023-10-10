import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { MongoIdValidationPipe } from '..';

describe('MongoIdValidationPipe', () => {
  let pipe: MongoIdValidationPipe;

  beforeEach(() => {
    pipe = new MongoIdValidationPipe();
  });

  it('should transform a valid ObjectId string', () => {
    const validObjectId = faker.database.mongodbObjectId();

    const transformedValue = pipe.transform(validObjectId);

    expect(transformedValue).toBeDefined();
    expect(transformedValue).toBeInstanceOf(Object);
    expect(transformedValue.toHexString()).toEqual(validObjectId);
  });

  it('should throw BadRequestException for an invalid ObjectId string', () => {
    const invalidObjectId = 'invalidObjectId';

    expect(() => pipe.transform(invalidObjectId)).toThrowError(BadRequestException);
  });
});
