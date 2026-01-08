import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user.types';
import { userService } from '../services/user.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // 
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await userService.getMe();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token invalid, logging out");
          logout();
        }
      }
   
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshProfile = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};