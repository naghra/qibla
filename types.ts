export interface TravelerData {
  firstName: string;
  lastName: string;
  passportNumber: string;
  passportCountry?: string;
  passportIssueDate?: string;
  passportExpiryDate?: string;
  nationality: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  phoneCountry?: string;
}

export interface TravelDetails {
  arrivalDate: string;
  departureDate: string;
  flightNumber: string;
  purposeOfVisit: string;
  accommodationAddress: string;
  accommodationCity: string;
}

export interface ApplicationData {
  travelers: TravelerData[];
  travel: TravelDetails;
  plan: 'standard' | 'fast' | 'ultra';
}

export type PlanId = 'standard' | 'fast' | 'ultra';
