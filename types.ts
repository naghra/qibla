export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface QiblaData {
  bearing: number; // Degrees from North
  distance: number; // Kilometers
}

export enum CompassStatus {
  WAITING_FOR_PERMISSION = 'WAITING_FOR_PERMISSION',
  ACTIVE = 'ACTIVE',
  UNSUPPORTED = 'UNSUPPORTED',
}