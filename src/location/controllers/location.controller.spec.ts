import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../services/location.service';
import { LocationController } from './location.controller';

class fakeLocationService {}

describe('LocationController', () => {
  let controller: LocationController;
  const fakeService = new fakeLocationService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    })
      .overrideProvider(LocationService)
      .useValue(fakeService)
      .compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
