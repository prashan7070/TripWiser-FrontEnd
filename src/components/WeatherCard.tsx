import React from 'react';
import { Sun, Wind, Droplets } from 'lucide-react';
import type  { WeatherData } from '../types/trip.types';

export const WeatherCard: React.FC<{ weather: WeatherData; compact?: boolean }> = ({ weather, compact }) => {
  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-sm text-slate-600 bg-white/60 px-2 py-1 rounded-full backdrop-blur-sm">
        <Sun className="w-4 h-4 text-orange-500" />
        <span>{weather.temp}°C</span>
        <span>{weather.condition}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-3xl font-bold">{weather.temp}°C</h3>
          <p className="text-blue-100">{weather.condition}</p>
        </div>
        <Sun className="w-12 h-12 text-yellow-300" />
      </div>
      <div className="mt-6 flex space-x-6 text-sm text-blue-100">
        <div className="flex items-center">
          <Droplets className="w-4 h-4 mr-1" /> {weather.humidity}%
        </div>
        <div className="flex items-center">
          <Wind className="w-4 h-4 mr-1" /> {weather.windSpeed} km/h
        </div>
      </div>
    </div>
  );
};