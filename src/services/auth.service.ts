import api from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types';

export const authService = {

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<void> => {
    await api.post('/auth/register', credentials);
  },

  googleLogin: async (token: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/google', { token });
    return data;
  },

  logout: async (): Promise<void> => {
    
  },

  changePassword: async (passData: any): Promise<void> => {
    await api.put('/auth/change-password', passData);
  },

  
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

 
  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.put(`/auth/reset-password/${token}`, { password });
  }


};