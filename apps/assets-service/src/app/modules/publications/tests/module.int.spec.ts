import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { ErrorHandler } from '@backend';
import { defaultPublicationReqBody } from './helpers';
import { PublicationsController } from '../controller';
import { PublicationsService } from '../service';
import { NestApplication } from '@nestjs/core';
import { MongoDbPublications, MongoDbPublicationsSchema } from '../../../database/models';

describe('Publications module integration test', () => {
  let app: NestApplication;
  let controller: PublicationsController;
  let service: PublicationsService;
  let mongoMemoryDb: MongoMemoryServer;
  let errorHandler: ErrorHandler;

  beforeAll(async () => {
    mongoMemoryDb = new MongoMemoryServer();
    await mongoMemoryDb.start();

    const uri = mongoMemoryDb.getUri();

    const mockErrorHandler = {
      handle: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: MongoDbPublications.name, schema: MongoDbPublicationsSchema }]),
      ],
      controllers: [PublicationsController],
      providers: [
        PublicationsService,
        {
          provide: ErrorHandler,
          useValue: mockErrorHandler,
        },
      ],
    }).compile();

    controller = moduleRef.get<PublicationsController>(PublicationsController);
    service = moduleRef.get<PublicationsService>(PublicationsService);
    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoMemoryDb.stop();
  });

  describe('Create endpoint', () => {
    it('should create a new publication', async () => {
      await controller.create(defaultPublicationReqBody);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(defaultPublicationReqBody);
    });
  });
});
