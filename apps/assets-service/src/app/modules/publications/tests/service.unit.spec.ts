import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';

import { ErrorHandler } from '@backend';
import { MongoDbPublications } from '../../../database/models';
import {
  defaultCreatePublication,
  defaultGetListQueryParams,
  defaultParamIdPublication,
  defaultUpdatePublication,
  publicationFakerObject,
} from './helpers';
import { PublicationsService } from '../service';

describe('Publications service unit test', () => {
  let service: PublicationsService;
  let publicationModel: Model<MongoDbPublications>;
  let errorHandler: ErrorHandler;

  const mockPublicationModel = {
    create: jest.fn().mockResolvedValue(publicationFakerObject),
    findById: jest.fn().mockResolvedValue(publicationFakerObject),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn().mockResolvedValue(publicationFakerObject),
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    lean: jest.fn(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockReturnValueOnce([publicationFakerObject]),
    where: jest.fn().mockImplementation(() => ({
      regex: jest.fn(),
    })),
    countDocuments: jest.fn().mockReturnValueOnce(faker.number.int({ max: 50, min: 10 })),
  };
  const mockErrorHandler = {
    handle: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PublicationsService,
        {
          provide: getModelToken(MongoDbPublications.name),
          useValue: mockPublicationModel,
        },
        {
          provide: ErrorHandler,
          useValue: mockErrorHandler,
        },
      ],
    }).compile();

    service = moduleRef.get<PublicationsService>(PublicationsService);
    publicationModel = moduleRef.get<Model<MongoDbPublications>>(getModelToken(MongoDbPublications.name));
    errorHandler = moduleRef.get<ErrorHandler>(ErrorHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create publication', () => {
    it('should create a new publication', async () => {
      const result = await service.create(defaultCreatePublication);

      expect(result).toEqual(publicationFakerObject);
      expect(publicationModel.create).toHaveBeenCalledTimes(1);
    });

    it('should try to create a new publication, fail and send the error to the erroHandler to deal with properly', async () => {
      jest.spyOn(publicationModel, 'create').mockRejectedValue(new Error());

      await service.create(defaultCreatePublication);

      expect(errorHandler.handle).toHaveBeenCalledTimes(1);
      expect(errorHandler.handle).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Delete publication', () => {
    it('should delete a publication', async () => {
      await service.delete(defaultParamIdPublication);

      expect(publicationModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(publicationModel.findByIdAndDelete).toHaveBeenCalledWith(defaultParamIdPublication);
    });

    it('should try to delete a publication but do not find it', async () => {
      jest.spyOn(publicationModel, 'findByIdAndDelete').mockResolvedValue(undefined);

      await service.delete(defaultParamIdPublication);

      expect(publicationModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(publicationModel.findByIdAndDelete).toHaveBeenCalledWith(defaultParamIdPublication);
    });

    it('should try to delete a publication, fail and send the error to the erroHandler to deal with properly', async () => {
      jest.spyOn(publicationModel, 'findByIdAndDelete').mockRejectedValue(new Error());

      await service.delete(defaultParamIdPublication);

      expect(errorHandler.handle).toHaveBeenCalledTimes(1);
      expect(errorHandler.handle).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Get data publication', () => {
    it('should get a publication data', async () => {
      await service.getData(defaultParamIdPublication);

      expect(publicationModel.findById).toHaveBeenCalledTimes(1);
      expect(publicationModel.findById).toHaveBeenCalledWith(defaultParamIdPublication);
    });

    it('should try to find a publication data but do not find it', async () => {
      jest.spyOn(publicationModel, 'findById').mockResolvedValue(undefined);

      await service.getData(defaultParamIdPublication);

      expect(publicationModel.findById).toHaveBeenCalledTimes(1);
      expect(publicationModel.findById).toHaveBeenCalledWith(defaultParamIdPublication);
    });

    it('should try to find a publication data, fail and send the error to the erroHandler to deal with properly', async () => {
      jest.spyOn(publicationModel, 'findById').mockRejectedValue(new Error());

      await service.getData(defaultParamIdPublication);

      expect(errorHandler.handle).toHaveBeenCalledTimes(1);
      expect(errorHandler.handle).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Get list publications', () => {
    it('should get a publications list', async () => {
      await service.getList(defaultGetListQueryParams);

      expect(publicationModel.find).toHaveBeenCalledTimes(1);
    });

    it('should try to get a publications list, fail and send the error to the erroHandler to deal with properly', async () => {
      await service.getList(defaultGetListQueryParams);

      expect(errorHandler.handle).toHaveBeenCalledTimes(1);
      expect(errorHandler.handle).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('Update publication', () => {
    it('should update a publication', async () => {
      await service.update(defaultParamIdPublication, defaultUpdatePublication);

      expect(publicationModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(publicationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        defaultParamIdPublication,
        defaultUpdatePublication,
        { new: true },
      );
    });

    it('should try to update a publication but do not find it', async () => {
      jest.spyOn(publicationModel, 'findByIdAndUpdate').mockResolvedValue(undefined);

      await service.update(defaultParamIdPublication, defaultUpdatePublication);

      expect(publicationModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(publicationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        defaultParamIdPublication,
        defaultUpdatePublication,
        { new: true },
      );
    });

    it('should try to update a publication, fail and send the error to the erroHandler to deal with properly', async () => {
      jest.spyOn(publicationModel, 'findById').mockRejectedValue(new Error());

      await service.update(defaultParamIdPublication, defaultUpdatePublication);

      expect(errorHandler.handle).toHaveBeenCalledTimes(1);
      expect(errorHandler.handle).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
