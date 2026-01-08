import apiClient from './api';
import type { Trip } from '../types/trip.types';

export const tripService = {
  
  // Get All Trips
  //  GET /api/v1/trip
  getAll: async (): Promise<Trip[]> => {
    const { data } = await apiClient.get<Trip[]>('/trip');
    return data;
  },

  //Get Single Trip by ID 
  //GET /api/v1/trip/:id
  getById: async (id: string): Promise<Trip> => {
    const { data } = await apiClient.get<Trip>(`/trip/${id}`);
    return data;
  },

  // Create Trip
  // POST /api/v1/trip/create
  // FormData
  create: async (formData: FormData): Promise<Trip> => {
    const { data } = await apiClient.post<Trip>('/trip/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  //Delete Trip
  //DELETE /api/v1/trip/:id
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/trip/${id}`);
  }
};