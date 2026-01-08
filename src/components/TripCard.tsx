import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Trip } from '../types/trip.types';

export const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  const navigate = useNavigate();

  
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };


  const bgImage = trip.coverImage && trip.coverImage !== "" 
    ? trip.coverImage 
    : `https://images.unsplash.com/photo-1586616788220-3796d19491ba?auto=format&fit=crop&q=80&w=800`;

  return (
    <div 
      onClick={() => navigate(`/trips/${trip._id}`)}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={bgImage} 
          alt={trip.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-4 text-white">
           <h3 className="text-lg font-bold shadow-sm">{trip.title}</h3>
           <div className="flex items-center text-xs opacity-90">
             <MapPin className="w-3 h-3 mr-1" />
             {trip.stops?.[0]?.locationName || "Sri Lanka"}
           </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </div>

        <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-50">
           <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-md capitalize">
             {trip.travelStyle}
           </span>
           <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
             <ArrowRight className="w-5 h-5" />
           </span>
        </div>
      </div>
    </div>
  );
};