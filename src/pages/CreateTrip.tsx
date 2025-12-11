import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { weatherService } from '../services/weather.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { MapPicker } from '../components/MapPicker';
import { WeatherCard } from '../components/WeatherCard';
import type { WeatherData, TripDraft } from '../types/trip.types';

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [weatherPreview, setWeatherPreview] = useState<WeatherData | null>(null);
  
  const [form, setForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    notes: '',
    lat: 51.505,
    lng: -0.09
  });

  const handleLocationSelect = async (lat: number, lng: number) => {
    setForm(prev => ({ ...prev, lat, lng }));
    try {
      const data = await weatherService.getByLocation(lat, lng);
      setWeatherPreview(data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tripData: TripDraft = {
        title: form.title,
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        notes: form.notes,
        location: { lat: form.lat, lng: form.lng }
      };
      
      await tripService.create(tripData);
      navigate('/home');
    } catch (error) {
      alert('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pt-24">
      <h1 className="text-3xl font-bold mb-8">Plan a New Trip</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <Input 
            label="Trip Name" 
            placeholder="e.g. Summer in Italy" 
            required 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})}
          />
          <Input 
            label="Destination Name" 
            placeholder="e.g. Rome" 
            required 
            value={form.destination} 
            onChange={e => setForm({...form, destination: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              type="date" 
              required 
              value={form.startDate} 
              onChange={e => setForm({...form, startDate: e.target.value})}
            />
            <Input 
              label="End Date" 
              type="date" 
              required 
              value={form.endDate} 
              onChange={e => setForm({...form, endDate: e.target.value})}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Select Location on Map</label>
             <MapPicker onLocationSelect={handleLocationSelect} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea 
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none h-24"
              value={form.notes}
              onChange={e => setForm({...form, notes: e.target.value})}
            ></textarea>
          </div>
          <Button type="submit" className="w-full" isLoading={loading}>Save Trip</Button>
        </form>

        <div className="space-y-6">
          <div className="bg-slate-100 p-6 rounded-2xl">
            <h3 className="font-semibold mb-4 text-slate-700">Weather Preview</h3>
            {weatherPreview ? (
              <WeatherCard weather={weatherPreview} />
            ) : (
              <div className="text-center text-slate-400 text-sm py-8">Select a location on the map to see weather</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};