import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationDTO } from '../dto/LocationDTO';

@Entity('location')
export class LocationEntity implements LocationDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  phone: string;

  @Column()
  contactPerson: string;

  // @Column()
  // created_at: string;
}
