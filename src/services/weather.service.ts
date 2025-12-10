import api from './api';
import type { WeatherData } from '../types/trip.types';

export const weatherService = {
  getByLocation: async (lat: number, lng: number): Promise<WeatherData> => {
    // const { data } = await api.get<WeatherData>(`/weather?lat=${lat}&lon=${lng}`);
    // return data;
    
    // MOCK DATA
    return { temp: 24, condition: 'Partly Cloudy', icon: 'cloud', humidity: 55, windSpeed: 12 };
  }
};