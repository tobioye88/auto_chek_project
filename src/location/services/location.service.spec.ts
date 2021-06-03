import { LocationService } from './location.service';
import { Test } from '@nestjs/testing';
import {
  Repository,
  createConnection,
  getRepository,
  getConnection,
} from 'typeorm';
import { LocationEntity } from '../entity/LocationEntity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from '../interfaces/location';

describe('LocationService', () => {
  let service: LocationService;
  let repository: Repository<LocationEntity>;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(LocationEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [LocationEntity],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(LocationEntity, testConnectionName);
    service = new LocationService(repository);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be get one location', async (done) => {
    // save a location
    // fetch a location
    // assert that it is same location
    const savedLocation = await getSavedLocation(repository);
    const fetchedLocation = await service.getLocation(savedLocation.id);
    expect(fetchedLocation.id).toBeDefined();
    expect(fetchedLocation.latitude).toBe(savedLocation.latitude);
    expect(fetchedLocation.longitude).toBe(savedLocation.longitude);
    expect(fetchedLocation.contactPerson).toBe(savedLocation.contactPerson);
    done();
  });

  it('should get all location', async (done) => {
    // save 2 locations
    // fetch all locations
    // assert that they return all locations
    await getSavedLocation(repository);
    await getSavedLocation(repository);

    const savedLocations: Location[] = await service.getAllLocations();
    expect(savedLocations.length).toBeGreaterThan(1);
    done();
  });

  it('should create a location', async (done) => {
    // create a location
    const location: Location = getMockLocation();
    // fetch location
    const createdLocation = await service.createLocation(location);
    // assert that the location is the same
    expect(createdLocation.id).toBeDefined();
    expect(createdLocation.latitude).toBe(location.latitude);
    expect(createdLocation.longitude).toBe(location.longitude);
    done();
  });

  it('should update location', async (done) => {
    // save a location
    const savedLocation = await getSavedLocation(repository);
    // update location
    savedLocation.name = 'Hogwarts Street';
    const updatedLocation = await service.updateLocation(
      savedLocation.id,
      savedLocation,
    );

    // compare changes
    expect(updatedLocation.name).toBe(savedLocation.name);
    done();
  });

  it('should delete location', async (done) => {
    // save a location
    const savedLocation = await getSavedLocation(repository);
    // delete location
    await service.deleteLocation(savedLocation.id);
    // check that location doesn't exist
    const deletedLocation = await repository.findOne(savedLocation.id);
    expect(deletedLocation).toBeUndefined();
    done();
  });

  it('should calculate location distance', async (done) => {
    // save a location
    await getSavedLocation(repository);
    const location = getMockLocations();
    // delete location
    const result: { data: any; message: string } =
      await service.calculateLocationDistance(location[1]);
    // check that location doesn't exist
    expect(result.data.distanceInKM).toBeGreaterThan(1);
    done();
  });
});

async function getSavedLocation(repository: Repository<LocationEntity>) {
  const location = getMockLocation();
  return await repository.save(location);
}

function getMockLocation() {
  return <Location>{
    name: 'new location',
    description: 'somewhere far away',
    website: '',
    phone: '0802223333',
    contactPerson: 'James Brown',
    longitude: '-1.7297222222222221',
    latitude: '53.32055555555556',
  };
}

function getMockLocations() {
  return <Location[]>[
    {
      name: 'new location',
      description: 'somewhere far away',
      website: '',
      phone: '0802223333',
      contactPerson: 'James Brown',
      longitude: '-1.7297222222222221',
      latitude: '53.32055555555556',
    },
    {
      name: 'new location',
      description: 'somewhere far away',
      website: '',
      phone: '0802223333',
      contactPerson: 'James Brown',
      longitude: '-1.6997222222222223',
      latitude: '53.31861111111111',
    },
  ];
}
