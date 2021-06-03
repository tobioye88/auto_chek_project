import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationDTO } from '../dto/LocationDTO';
import { LocationService } from '../services/location.service';
import { ApiBody } from '@nestjs/swagger';
import { Location } from '../interfaces/location';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':id')
  async getLocation(@Param('id') id: string) {
    return await this.locationService.getLocation(+id);
  }

  @Get()
  getAllLocations() {
    return this.locationService.getAllLocations();
  }

  @Post()
  @ApiBody({ type: LocationDTO })
  createLocation(@Body() location: Location) {
    return this.locationService.createLocation(location);
  }

  @Put(':id')
  @ApiBody({ type: LocationDTO })
  updateLocation(@Param('id') id: string, @Body() location: Location) {
    return this.locationService.updateLocation(+id, location);
  }

  @Delete(':id')
  deleteLocation(@Param('id') id: string) {
    return this.locationService.deleteLocation(+id);
  }

  @Post('calculate/distance')
  @ApiBody({ type: LocationDTO })
  calculateLocationDistance(@Body() location: LocationDTO) {
    return this.locationService.calculateLocationDistance(location);
  }
}
