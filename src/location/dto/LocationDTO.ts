import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../interfaces/location';

export class LocationDTO implements Location {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  website?: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  contactPerson?: string;
  @ApiProperty()
  longitude: string;
  @ApiProperty()
  latitude: string;
}
