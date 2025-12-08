import { Coordinates, QiblaData } from '../types';

const KAABA_COORDS: Coordinates = {
  latitude: 21.4225,
  longitude: 39.8262,
};

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function calculateQiblaData(userCoords: Coordinates): QiblaData {
  const phi1 = toRadians(userCoords.latitude);
  const lambda1 = toRadians(userCoords.longitude);
  const phi2 = toRadians(KAABA_COORDS.latitude);
  const lambda2 = toRadians(KAABA_COORDS.longitude);

  const deltaLambda = lambda2 - lambda1;

  // Bearing calculation (Great Circle)
  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  let bearing = toDegrees(Math.atan2(y, x));
  // Normalize to 0-360
  bearing = (bearing + 360) % 360;

  // Distance calculation (Haversine)
  const R = 6371; // Earth's radius in km
  const deltaPhi = phi2 - phi1;
  
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {
    bearing,
    distance,
  };
}