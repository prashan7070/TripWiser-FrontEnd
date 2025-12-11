import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import type { Trip } from '../types/trip.types';
import { formatDate } from '../utils/formDate';
import { WeatherCard } from './WeatherCard';

export const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/trips/${trip._id}`)}
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100"
    >
      <div className="h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
        <img 
          src={trip.coverImage || `https://source.unsplash.com/800x600/?${trip.destination}`} 
          alt={trip.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {trip.weatherSummary && (
          <div className="absolute top-3 right-3">
            <WeatherCard weather={trip.weatherSummary} compact />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-1">{trip.title}</h3>
      
      <div className="flex items-center text-slate-500 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        {trip.destination}
      </div>

      <div className="flex items-center text-slate-500 text-sm bg-slate-50 p-2 rounded-lg">
        <Calendar className="w-4 h-4 mr-2" />
        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
      </div>
    </div>
  );
};