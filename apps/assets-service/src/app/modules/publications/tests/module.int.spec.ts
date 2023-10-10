import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { ErrorHandler } from '@backend';
import { defaultCreatePublication } from './helpers';
import { MongoDbPublications } from '../../../database/models';
import { PublicationsController } from '../controller';
import { PublicationsService } from '../service';

describe('Publications module integration test', () => {
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
      controllers: [PublicationsController],
      providers: [
        PublicationsService,
        {
          provide: getModelToken(MongoDbPublications.name),
          useFactory: () => {
            return mongoose
              .createConnection(uri)
              .model(MongoDbPublications.name, new mongoose.Schema(MongoDbPublications));
          },
        },
        {
          provide: ErrorHandler,
          useValue: mockErrorHandler,
        },
      ],
    }).compile();

    controller = moduleRef.get<PublicationsController>(PublicationsController);
    service = moduleRef.get<PublicationsService>(PublicationsService);
  });

  afterAll(async () => {
    if (mongoMemoryDb) {
      await mongoMemoryDb.stop();
    }
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
  });

  describe('Create endpoint', () => {
    it('should create a new publication', async () => {
      const result = await controller.create(defaultCreatePublication);

      console.log(result);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(defaultCreatePublication);
    });
  });
});
