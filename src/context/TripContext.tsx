import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import type { Trip } from '../types/trip.types';
import { tripService } from '../services/trip.service';

interface TripContextType {
  trips: Trip[];
  isLoading: boolean;
  fetchTrips: () => Promise<void>;
  deleteTrip: (id: string) => Promise<void>; 
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //Fetch Trips
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

  
  const deleteTrip = async (id: string) => {
    try {
      
      await tripService.delete(id);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
    } catch (error) {
      console.error("Failed to delete trip", error);
      alert("Failed to delete trip");
    }
  };

  return (
    <TripContext.Provider value={{ trips, isLoading, fetchTrips, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrips must be used within a TripProvider");
  return context;
};