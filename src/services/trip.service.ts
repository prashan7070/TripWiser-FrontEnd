import api from './api';
import type { Trip, TripDraft, TripAIParams } from '../types/trip.types';

export const tripService = {
  getAll: async (): Promise<Trip[]> => {
    // const { data } = await api.get<Trip[]>('/trips');
    // return data;
    
    // MOCK DATA
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            _id: '1',
            title: 'Summer in Kyoto',
            destination: 'Kyoto, Japan',
            startDate: '2023-07-10',
            endDate: '2023-07-20',
            location: { lat: 35.0116, lng: 135.7681 },
            weatherSummary: { temp: 28, condition: 'Sunny', icon: 'sun', humidity: 60, windSpeed: 10 }
          }
        ]);
      }, 500);
    });
  },

  create: async (tripData: TripDraft): Promise<Trip> => {
    const { data } = await api.post<Trip>('/trips', tripData);
    return data;
  },

  generateAI: async (params: TripAIParams): Promise<Trip> => {
    // const { data } = await api.post<Trip>('/trips/ai-generate', params);
    // return data;

    // MOCK DATA
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: `Adventure in ${params.destination}`,
          destination: params.destination,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          location: { lat: 48.8566, lng: 2.3522 },
          itinerary: [
            { day: 1, activities: ['Arrival', 'City Walk', 'Dinner at Local Spot'] },
            { day: 2, activities: ['Morning Hike', 'Museum Visit'] }
          ]
        } as Trip);
      }, 1500);
    });
  }
};