import apiClient from './api';
import type { TripAIParams } from '../types/trip.types';

export const aiService = {
  generatePlan: async (params: TripAIParams) => {
    const { data } = await apiClient.post('/ai/generate', params);
    return data;
  }
};