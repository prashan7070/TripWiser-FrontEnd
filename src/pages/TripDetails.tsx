import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { externalService } from '../services/external.service';
import { MapPicker } from '../components/MapPicker';
import { WeatherCard } from '../components/WeatherCard';
import { Loader2, Calendar, MapPin, DollarSign, Clock, Trash2,Compass, ArrowLeft  } from 'lucide-react';
import { Button } from '../components/Button';
import type { Trip, WeatherData } from '../types/trip.types';

export const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTripData = async () => {
      if (!id) return;
      try {
        // Fetch Real Trip Data
        const data = await tripService.getById(id);
        setTrip(data);

        //Fetch Real Weather for the first stop
        if (data.stops && data.stops.length > 0) {
          const firstStop = data.stops[0];
          const weatherData = await externalService.getWeather(
            firstStop.coordinates.lat, 
            firstStop.coordinates.lng
          );
          setWeather(weatherData);
        }
      } catch (error) {
        console.error("Error loading trip:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this trip?")) {
      await tripService.delete(id!);
      navigate('/home');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-600"/></div>;
  if (!trip) return <div className="text-center py-20">Trip not found</div>;

  // Format Date Helper
  const formatDate = (date: Date | string) => new Date(date).toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-24">
      

      <div className="relative flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
       
        
        <button 
          onClick={() => navigate('/home')} 
          className="hidden md:flex absolute -left-16 top-1 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>

        {/* mobile */}

        <button 
          onClick={() => navigate('/home')} 
          className="md:hidden flex items-center text-slate-500 mb-2 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>



        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{trip.title}</h1>
          <div className="flex items-center gap-4 text-slate-500">
             <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {trip.stops[0]?.locationName}</span>
             <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
          </div>
        </div>



        <div className="flex gap-2">
           <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200" onClick={handleDelete}>
             <Trash2 className="w-4 h-4 mr-2" /> Delete Trip
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COL: Itinerary & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Cover Image (If exists) */}
          {trip.coverImage && (
            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-md">
              <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Itinerary */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Itinerary</h3>
            <div className="space-y-8">
              {trip.stops.map((stop, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-blue-100 pb-2">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                  <h4 className="font-bold text-lg text-slate-900 mb-1">Stop {index + 1}: {stop.locationName}</h4>
                  
                  {stop.hotel && (
                    <div className="text-sm text-blue-600 font-medium mb-3 bg-blue-50 inline-block px-3 py-1 rounded-lg">
                      🏨 Stay: {stop.hotel.name}
                    </div>
                  )}

                  <ul className="space-y-2 mt-2">
                     {stop.activities.map((act: any, i: number) => (
                       <li key={i} className="flex items-center text-slate-600 text-sm">
                         <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-3"></span>
                         {act.name}
                       </li>
                     ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {trip.notes && (
               <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm border border-yellow-100">
                 <strong>📝 Notes:</strong> {trip.notes}
               </div>
            )}
          </div>
          
          {/* Map Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-[400px] overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Trip Map</h3>
 
            <MapPicker 
              readonly 
              route={trip.stops.map(stop => ({
                lat: stop.coordinates.lat,
                lng: stop.coordinates.lng,
                label: stop.locationName
              }))}
            />

          </div>
        </div>

        {/* RIGHT COL: Weather & Summary */}
        <div className="space-y-6">
          {/* Weather Widget */}
          {weather && <WeatherCard weather={weather} />}
          
          {/* Trip Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4 text-slate-800">Trip Summary</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-2"/> Status</span>
                <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded capitalize">{trip.status}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                <span className="flex items-center"><DollarSign className="w-4 h-4 mr-2"/> Budget</span>
                <span className="font-medium text-slate-900">{trip.budget} LKR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Compass className="w-4 h-4 mr-2"/> Style</span>
                <span className="font-medium text-slate-900 capitalize">{trip.travelStyle}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};