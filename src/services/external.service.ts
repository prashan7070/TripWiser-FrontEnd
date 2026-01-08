import apiClient from './api';

export const externalService = {


  getWeather: async (lat: number, lng: number, date?: string) => {
    // Pass the date if it exists
    const query = date ? `&date=${date}` : '';
    const { data } = await apiClient.get(`/weather?lat=${lat}&lng=${lng}${query}`);
    return data;
  },

  searchMap: async (query: string) => {
    const { data } = await apiClient.get(`/map/search?query=${query}`);
    return data;
  },

  getHotels: async (lat: number, lng: number) => {
    const { data } = await apiClient.get(`/hotel?lat=${lat}&lng=${lng}`);
    return data;
  },

  getAttractions: async (lat: number, lng: number) => {
    const { data } = await apiClient.get(`/attraction?lat=${lat}&lng=${lng}`);
    return data;
  }

};