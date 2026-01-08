import apiClient from './api';

export const userService = {
  // Get Current User Profile
  getMe: async () => {
    const { data } = await apiClient.get('/user/me');
    return data;
  },

  // Update Profile (With Image Upload)
  update: async (formData: FormData) => {
    const { data } = await apiClient.put('/user/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
};