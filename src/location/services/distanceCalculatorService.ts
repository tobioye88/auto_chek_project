import { LocationDTO } from '../dto/LocationDTO';

export function distanceCalculator(
  location1: LocationDTO,
  location2: LocationDTO,
) {
  if (location1 == null || location2 == null) return 0;
  if (location1.longitude == null || location2.longitude == null) return 0;
  if (location1.latitude == null || location2.latitude == null) return 0;
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  let lon1 = +location1.longitude;
  let lon2 = +location2.longitude;
  let lat1 = +location1.latitude;
  let lat2 = +location2.latitude;

  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;

  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  // calculate the result
  return c * r;
}
