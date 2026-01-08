import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import { TripCard } from '../components/TripCard';
import { Button } from '../components/Button';
import { Plus, Sparkles, Loader2, Hotel, CloudSun } from 'lucide-react';
import { externalService } from '../services/external.service'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet styles

const POPULAR_LOCATIONS = [
  { name: 'Ella', lat: 6.8667, lng: 81.0466 },
  { name: 'Mirissa', lat: 5.9482, lng: 80.4716 },
  { name: 'Kandy', lat: 7.2906, lng: 80.6337 },
  { name: 'Trincomalee', lat: 8.5874, lng: 81.2152 },
  { name: 'Sigiriya', lat: 7.9570, lng: 80.7603 }
];

const HOTEL_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", // Resort
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", // Bedroom
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", // Pool
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80", // Cozy Room
];

export const Home: React.FC = () => {
  const { user } = useAuth();
  const { trips, fetchTrips, isLoading: tripsLoading } = useTrips();
  

  const [weatherSuggestions, setWeatherSuggestions] = useState<any[]>([]);
  const [hotelSuggestions, setHotelSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoadingSuggestions(true);
        
        
        const weatherPromises = POPULAR_LOCATIONS.map(async (loc) => {
          try {
            const data = await externalService.getWeather(loc.lat, loc.lng);
            return { ...loc, weather: data };
          } catch (e) { return null; }
        });

        const results = await Promise.all(weatherPromises);
        setWeatherSuggestions(results.filter(r => r !== null));

        const hotels = await externalService.getHotels(6.8667, 81.0466);
        setHotelSuggestions(hotels.slice(0, 4));

      } catch (error) {
        console.error("Failed to load suggestions", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    loadSuggestions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-24 space-y-16">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Ayubowan, {user?.firstname} 🙏</h1>
          <p className="text-slate-500 mt-2 text-lg">Where would you like to go today?</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link to="/create-trip">
            <Button variant="outline" className="h-12 px-6"><Plus className="w-5 h-5 mr-2" /> Manual Trip</Button>
          </Link>
          <Link to="/ai-generator">
            <Button className="h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white shadow-lg shadow-indigo-200">
              <Sparkles className="w-5 h-5 mr-2" /> AI Planner
            </Button>
          </Link>
        </div>
      </div>

      {/* USER TRIPS SECTION*/}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-indigo-500 pl-3">Your Upcoming Adventures</h2>
        {tripsLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-500 w-8 h-8" /></div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips.map(trip => <TripCard key={trip._id} trip={trip} />)}
          </div>
        ) : (
          <div className="p-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <p className="text-slate-500 text-lg mb-4">You haven't planned any trips yet.</p>
            <Link to="/ai-generator">
              <Button variant="secondary">Create your first plan with AI</Button>
            </Link>
          </div>
        )}
      </div>

      {/*  WEATHER MAP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <CloudSun className="w-6 h-6 mr-2 text-orange-500" /> Live Weather Map
          </h2>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 z-0 relative">
            {loadingSuggestions ? (
              <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
            ) : (
              <MapContainer center={[7.8731, 80.7718]} zoom={7} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {weatherSuggestions.map((place, idx) => (
                  <Marker key={idx} position={[place.lat, place.lng]}>
                    <Popup>
                      <div className="text-center p-1">
                        <strong className="block text-base text-slate-800">{place.name}</strong>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className="text-2xl font-bold text-blue-600">{place.weather?.temp}°C</span>
                        </div>
                        <span className="text-xs text-slate-500 capitalize">{place.weather?.description}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

        {/* Weather Cards (Right Side) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 mb-6 opacity-0 md:opacity-100">Forecasts</h2>
          {loadingSuggestions ? (
             <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>)}</div>
          ) : (
            weatherSuggestions.slice(0, 4).map((place, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <img src={`http://openweathermap.org/img/wn/${place.weather?.icon}.png`} alt="icon" className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700">{place.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">{place.weather?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-slate-800">{place.weather?.temp}°</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* HOTELS SECTION */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <Hotel className="w-6 h-6 mr-2 text-teal-500" /> Trending Stays in Ella
        </h2>
        
        {loadingSuggestions ? (
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelSuggestions.map((hotel, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer h-full flex flex-col">
                
                <div className="h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
                  
                  <img 
                    src={HOTEL_IMAGES[idx % HOTEL_IMAGES.length]} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-slate-700">
                    {hotel.distance}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800 truncate text-lg" title={hotel.name}>{hotel.name}</h3>
                  <p className="text-sm text-slate-500 truncate mb-3">{hotel.address || "Ella, Sri Lanka"}</p>
                </div>

                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(hotel.name + " " + (hotel.address || "Sri Lanka"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button size="sm" variant="outline" className="w-full rounded-xl border-slate-200 hover:border-teal-500 hover:text-teal-600">
                    Check Availability
                  </Button>
                </a>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};