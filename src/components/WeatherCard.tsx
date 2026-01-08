import React from 'react';
import { Sun, Wind, Droplets, Radio, CalendarClock } from 'lucide-react';
import type { WeatherData } from '../types/trip.types';

export const WeatherCard: React.FC<{ weather: WeatherData; compact?: boolean }> = ({ weather, compact }) => {
  
  const isLive = weather.dataType === "LIVE_ACCURATE";

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
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
      
      {/* Background Decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      {/* DATA SOURCE BADGE */}
      <div className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide shadow-sm border border-white/20 ${
        isLive ? "bg-emerald-400 text-emerald-900" : "bg-amber-300 text-amber-900"
      }`}>
        {isLive ? <Radio className="w-3 h-3 animate-pulse" /> : <CalendarClock className="w-3 h-3" />}
        {isLive ? "Live Forecast" : "Seasonal Avg"}
      </div>

      {/* Main Info */}
      <div className="flex justify-between items-start mt-4">
        <div>
          <h3 className="text-4xl font-bold tracking-tight">{weather.temp}°C</h3>
          <p className="text-blue-100 text-lg font-medium">{weather.condition}</p>
          {weather.description && <p className="text-blue-200 text-xs capitalize opacity-80">{weather.description}</p>}
        </div>
        
        {/* Weather Icon (Remote or Fallback) */}
        {weather.icon && (weather.icon.includes('d') || weather.icon.includes('n')) ? (
           <img 
             src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
             alt="weather icon" 
             className="w-16 h-16 drop-shadow-md"
           />
        ) : (
           <Sun className="w-14 h-14 text-yellow-300 drop-shadow-sm" />
        )}
      </div>

      {/* Details Grid */}
      <div className="mt-6 flex gap-6 text-sm text-blue-50">
        <div className="flex items-center">
          <Droplets className="w-4 h-4 mr-1.5 opacity-75" /> 
          <span className="font-semibold">{weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind className="w-4 h-4 mr-1.5 opacity-75" /> 
          <span className="font-semibold">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {/* Footnote for Seasonal Data */}
      {!isLive && (
        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-blue-200 italic flex items-start gap-1">
          <span>*</span>
          <p>Real-time forecasts are only available for the next 5 days. This data is based on historical seasonal patterns.</p>
        </div>
      )}
    </div>
  );
};