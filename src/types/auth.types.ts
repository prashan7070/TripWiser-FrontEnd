import type { User } from './user.types';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}