import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import type { Trip } from '../types/trip.types';
import { tripService } from '../services/trip.service';

interface TripContextType {
  trips: Trip[];
  isLoading: boolean;
  fetchTrips: () => Promise<void>;
  addTrip: (trip: Trip) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrips = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await tripService.getAll();
      setTrips(data);
    } catch (error) {
      console.error("Failed to fetch trips", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTrip = (trip: Trip) => {
    setTrips((prev) => [...prev, trip]);
  };

  return (
    <TripContext.Provider value={{ trips, isLoading, fetchTrips, addTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrips must be used within a TripProvider");
  return context;
};