export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyPlan {
  day: number;
  activities: string[];
}

export interface Trip {
  _id?: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
  location: Location;
  budget?: number;
  type?: 'adventure' | 'chill' | 'family' | 'romantic' | 'business';
  itinerary?: DailyPlan[];
  weatherSummary?: WeatherData;
  coverImage?: string;
}

export type TripDraft = Omit<Trip, '_id' | 'weatherSummary'>;

export interface TripAIParams {
  destination: string;
  days: number;
  budget: string;
  type: string;
}