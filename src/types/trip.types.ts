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
  description?: string;
  warning?: string | null;
  dataType?: "LIVE_ACCURATE" | "SEASONAL_AVERAGE";
}

export interface Activity {
  _id?: string;
  name: string;
  isCompleted?: boolean;
}

export interface TripStop {
  _id?: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  order: number;
  hotel?: {
    name?: string;
    pricePerNight?: number;
    address?: string;
  };
  activities: Activity[];
}


export interface Trip {
  _id: string;
  userId?: string;
  title: string;
  startDate: string; 
  endDate: string;
  budget: number | string; 
  
  travelStyle: string; 
  status: 'draft' | 'active' | 'completed';
  stops: TripStop[]; 
  coverImage?: string;
  notes?: string;
  isAiGenerated?: boolean;
  weatherSummary?: WeatherData;
}


export type TripDraft = Omit<Trip, '_id' | 'weatherSummary'>;

export interface TripAIParams {
  destination: string;
  days: number;
  budget: string;
  type: string;
  tripDate?: string;
}