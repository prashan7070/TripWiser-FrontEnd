import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import  type { Trip } from '../types/trip.types';
import { MapPicker } from '../components/MapPicker';
import { WeatherCard } from '../components/WeatherCard';
import { Loader2, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '../utils/formDate';
import { Button } from '../components/Button';

export const TripDetails: React.FC = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      setTrip({
        _id: '1',
        title: 'Summer in Kyoto',
        destination: 'Kyoto, Japan',
        startDate: '2023-07-10',
        endDate: '2023-07-20',
        location: { lat: 35.0116, lng: 135.7681 },
        weatherSummary: { temp: 28, condition: 'Sunny', icon: 'sun', humidity: 60, windSpeed: 10 },
        notes: "Remember to buy a rail pass.",
        itinerary: [
           { day: 1, activities: ['Arrive at KIX', 'Check in hotel'] },
           { day: 2, activities: ['Fushimi Inari', 'Kiyomizu-dera'] }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading || !trip) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{trip.title}</h1>
            <div className="flex items-center gap-4 text-slate-500 mb-6">
               <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {trip.destination}</span>
               <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
            </div>
            
            <div className="prose prose-slate max-w-none">
              <h3 className="text-xl font-bold mb-3">Itinerary</h3>
              <div className="space-y-4">
                {trip.itinerary?.map(day => (
                  <div key={day.day} className="border-l-4 border-indigo-200 pl-4 py-1">
                    <span className="font-bold text-indigo-600 block text-sm uppercase tracking-wide">Day {day.day}</span>
                    <ul className="mt-1 list-disc list-inside text-slate-700">
                       {day.activities.map((act, i) => <li key={i}>{act}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              {trip.notes && (
                 <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm">
                   <strong>Notes:</strong> {trip.notes}
                 </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-96">
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <MapPicker initialLat={trip.location.lat} initialLng={trip.location.lng} readonly />
          </div>
        </div>

        <div className="space-y-6">
          {trip.weatherSummary && <WeatherCard weather={trip.weatherSummary} />}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Trip Summary</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium text-slate-900">10 Days</span>
              </div>
              <div className="flex justify-between">
                <span>Budget</span>
                <span className="font-medium text-slate-900">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span className="font-medium text-slate-900 capitalize">Leisure</span>
              </div>
            </div>
            <Button className="w-full mt-6" variant="outline">Edit Trip</Button>
          </div>
        </div>
      </div>
    </div>
  );
};