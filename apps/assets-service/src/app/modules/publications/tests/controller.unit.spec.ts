import { Test, TestingModule } from '@nestjs/testing';

import {
  defaultGetListQueryParams,
  defaultParamIdPublication,
  defaultPublicationReqBody,
  publicationFakerObject,
} from './helpers';
import { PublicationsController } from '../controller';
import { PublicationsService } from '../service';

describe('Publications controller unit test', () => {
  let controller: PublicationsController;
  let service: PublicationsService;

  const mockPublicationsService = {
    create: jest.fn().mockResolvedValue(publicationFakerObject),
    delete: jest.fn(),
    getData: jest.fn().mockResolvedValue(publicationFakerObject),
    getList: jest.fn().mockResolvedValue([publicationFakerObject]),
    update: jest.fn().mockResolvedValue(publicationFakerObject),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [PublicationsService],
    })
      .overrideProvider(PublicationsService)
      .useValue(mockPublicationsService)
      .compile();

    controller = moduleRef.get<PublicationsController>(PublicationsController);
    service = moduleRef.get<PublicationsService>(PublicationsService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Create endpoint', () => {
    it('should create a new publicaiton', async () => {
      const result = await controller.create(defaultPublicationReqBody);

      expect(result).toEqual(publicationFakerObject);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete endpoint', () => {
    it('should delete a publication', async () => {
      await controller.delete(defaultParamIdPublication);

      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get data endpoint', () => {
    it('should return publication data', async () => {
      const result = await controller.getData(defaultParamIdPublication);

      expect(result).toEqual(publicationFakerObject);
      expect(service.getData).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get list endpoint', () => {
    it('should return publications list', async () => {
      const result = await controller.getList(defaultGetListQueryParams);

      expect(result).toEqual([publicationFakerObject]);
      expect(service.getList).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update endpoint', () => {
    it('should update publication', async () => {
      const result = await controller.update(defaultParamIdPublication, defaultPublicationReqBody);

      expect(result).toEqual(publicationFakerObject);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
