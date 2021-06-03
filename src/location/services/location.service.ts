import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../entity/LocationEntity';
import { LocationDTO } from '../dto/LocationDTO';
import { distanceCalculator } from './distanceCalculatorService';
import { ResponseHelper } from '../helpers/responseHelper';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    public locationRepository: Repository<LocationEntity>,
  ) {}

  getLocation(id: number): Promise<LocationEntity> {
    return this.locationRepository.findOne(id);
  }

  getAllLocations(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  createLocation(location: LocationDTO): Promise<LocationEntity> {
    return this.locationRepository.save(location);
  }

  async updateLocation(
    id: number,
    location: LocationDTO,
  ): Promise<LocationEntity> {
    await this.locationRepository.update(id, location);
    return this.locationRepository.findOne(id);
  }

  deleteLocation(id: number) {
    return this.locationRepository.delete(id);
  }

  async calculateLocationDistance(location: LocationDTO) {
    try {
      // validate
      if (
        location == null ||
        location.latitude.length == 0 ||
        location.longitude.length == 0
      )
        throw { message: 'Invalid Request' };

      const lastLocation: LocationEntity =
        await this.locationRepository.findOneOrFail({
          order: { id: 'DESC' },
        });
      if (lastLocation == null) throw { message: 'Initial Location not added' };
      const distanceInKM = distanceCalculator(lastLocation, location);
      return ResponseHelper.success({ distanceInKM });
    } catch (e) {
      return ResponseHelper.error(null, e.message);
    }
  }
}
