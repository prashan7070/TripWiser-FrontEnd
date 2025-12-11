import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useTrips } from '../context/TripContext';
import { TripCard } from '../components/TripCard';
import { Button } from '../components/Button';
import { Plus, Sparkles, Loader2 } from 'lucide-react';

export const Home: React.FC = () => {
  const { user } = useAuth(); 
  const { trips, fetchTrips, isLoading } = useTrips(); 

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.firstname} 👋</h1>
          <p className="text-slate-500 mt-2">Here are your upcoming adventures.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Link to="/create-trip" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full"><Plus className="w-4 h-4 mr-2" /> Manual Trip</Button>
          </Link>
          <Link to="/ai-generator" className="flex-1 md:flex-none">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 border-none"><Sparkles className="w-4 h-4 mr-2" /> AI Plan</Button>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-500"/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.length > 0 ? (
            trips.map(trip => <TripCard key={trip._id} trip={trip} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500">No trips planned yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};