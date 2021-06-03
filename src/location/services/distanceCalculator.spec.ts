import { distanceCalculator } from './distanceCalculatorService';
import { Location } from '../../../dist/location/interfaces/location';

describe('User Controller', () => {
  const location1: Location = <Location>{
    name: 'new location',
    description: 'somewhere far away',
    website: '',
    phone: '0802223333',
    contactPerson: 'James Brown',
    longitude: '-1.7297222222222221',
    latitude: '53.32055555555556',
  };

  const location2: Location = <Location>{
    name: 'new location',
    description: 'somewhere far away',
    website: '',
    phone: '0802223333',
    contactPerson: 'James Brown',
    longitude: '-1.6997222222222223',
    latitude: '53.31861111111111',
  };

  it('should be equal', () => {
    expect(distanceCalculator(location1, location2)).toBe(2.004367838271627);
  });

  it('should be equal to zero when null values are sent', () => {
    expect(distanceCalculator(null, null)).toBe(0);
  });
});
