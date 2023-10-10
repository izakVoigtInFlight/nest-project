import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import * as request from 'supertest';

import { validationPipeOptions } from '@backend';
import { MongoDbPublications } from '../../../database/models';
import { defaultCreatePublication, defaultUpdatePublication, publicationFakerObject } from './helpers';
import { PublicationsModule } from '../module';

describe('Publications module e2e test', () => {
  let app: NestApplication;
  let mongoMemoryDb: MongoMemoryServer;
  let publicationsModel: Model<MongoDbPublications>;
  let publication: MongoDbPublications;

  const rootPath = '/publications';

  beforeAll(async () => {
    mongoMemoryDb = new MongoMemoryServer();
    await mongoMemoryDb.start();

    const uri = mongoMemoryDb.getUri();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), PublicationsModule],
    }).compile();

    publicationsModel = moduleRef.get<Model<MongoDbPublications>>(getModelToken(MongoDbPublications.name));

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

    await app.init();
  });

  beforeEach(async () => {
    await publicationsModel.deleteMany({});

    publication = await publicationsModel.create(defaultCreatePublication);
  });

  afterAll(async () => {
    await app.close();
    await mongoMemoryDb.stop();
  });

  describe('(POST) create publication endpoint', () => {
    it('should create a new publication', () => {
      return request
        .default(app.getHttpServer())
        .post(rootPath)
        .send(publicationFakerObject)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body).toEqual({
            ...publicationFakerObject,
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          });
        });
    });

    it('should try to create a new publication with an invalid request body', () => {
      const invalidBody = {
        categoryAirline: faker.word.words(),
        categoryProcurement: faker.word.words(),
        distributor: faker.word.words(3),
        genre: [faker.word.words(), faker.word.words()],
        lab: faker.word.words(2),
        language: [faker.word.words(), faker.word.words()],
        needDrm: faker.datatype.boolean(),
        needWireless: faker.datatype.boolean(),
        originalSynopsis: faker.word.words(15),
        originalTitle: '', // Empty title
        originCountry: faker.word.words(),
        quantity: faker.number.float(), // Invalid float
      };

      return request
        .default(app.getHttpServer())
        .post(rootPath)
        .send(invalidBody)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual([
            'originalTitle should not be empty',
            'quantity must be an integer number',
          ]);
          expect(response.body.error).toEqual('Bad Request');
        });
    });
  });

  describe('(DELETE) delete publication endpoint', () => {
    it('should delete a publication', () => {
      // @ts-ignore
      return request.default(app.getHttpServer()).delete(`${rootPath}/${publication._id}`).expect(200);
    });

    it('should try to delete an unexistent publication', () => {
      return request
        .default(app.getHttpServer())
        .delete(`${rootPath}/${faker.database.mongodbObjectId()}`)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Publication not found');
        });
    });

    it('should try to delete a publication with an invalid ID', () => {
      return request
        .default(app.getHttpServer())
        .delete(`${rootPath}/test`)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Invalid ID');
        });
    });
  });

  describe('(GET) get publication data endpoint', () => {
    it('should get publication data', () => {
      return (
        request
          .default(app.getHttpServer())
          // @ts-ignore
          .get(`${rootPath}/${publication._id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(response => {
            expect(response.body).toEqual({
              ...defaultCreatePublication,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            });
          })
      );
    });

    it('should try to get an unexistent publication', () => {
      return request
        .default(app.getHttpServer())
        .delete(`${rootPath}/${faker.database.mongodbObjectId()}`)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Publication not found');
        });
    });

    it('should try to delete a publication with an invalid ID', () => {
      return request
        .default(app.getHttpServer())
        .delete(`${rootPath}/test`)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Invalid ID');
        });
    });
  });

  describe('(GET) get publications list endpoint', () => {
    it('should get publications list', () => {
      return request
        .default(app.getHttpServer())
        .get(`${rootPath}?page=1&perPage=10`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body).toEqual({
            total: 1,
            page: 1,
            perPage: 10,
            publications: [
              {
                ...defaultCreatePublication,
                _id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            ],
          });
        });
    });

    it('should try to get publications list with an invalid originalTitle', () => {
      return request
        .default(app.getHttpServer())
        .get(`${rootPath}?page=1&perPage=10&originalTitle=${publication.categoryAirline}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body).toEqual({
            total: 0,
            page: 1,
            perPage: 10,
            publications: [],
          });
        });
    });
  });

  describe('(PATCH) update publication endpoint', () => {
    it('should update a publication', () => {
      return (
        request
          .default(app.getHttpServer())
          // @ts-ignore
          .patch(`${rootPath}/${publication._id}`)
          .send(defaultUpdatePublication)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(response => {
            expect(response.body).toEqual({
              ...defaultCreatePublication,
              ...defaultUpdatePublication,
              _id: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            });
          })
      );
    });

    it('should try to update a publication with an invalid body', () => {
      const invalidBody = {
        language: faker.number.float(), // Invalid float
      };

      return (
        request
          .default(app.getHttpServer())
          // @ts-ignore
          .patch(`${rootPath}/${publication._id}`)
          .send(invalidBody)
          .expect(400)
          .expect('Content-Type', /json/)
          .expect(response => {
            expect(response.body.message).toEqual([
              'language must contain at least 1 elements',
              'each value in language must be a string',
              'language must be an array',
            ]);
            expect(response.body.error).toEqual('Bad Request');
          })
      );
    });

    it('should try to update an unexistent publication', () => {
      return request
        .default(app.getHttpServer())
        .patch(`${rootPath}/${faker.database.mongodbObjectId()}`)
        .send(defaultUpdatePublication)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Publication not found');
        });
    });

    it('should try to update a publication with an invalid ID', () => {
      return request
        .default(app.getHttpServer())
        .patch(`${rootPath}/test`)
        .send(defaultUpdatePublication)
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(response => {
          expect(response.body.message).toEqual('Invalid ID');
        });
    });
  });
});
