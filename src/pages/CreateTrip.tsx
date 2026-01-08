import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { externalService } from '../services/external.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { MapPicker } from '../components/MapPicker';
import { WeatherCard } from '../components/WeatherCard';
import type { WeatherData } from '../types/trip.types';
import { Image as ImageIcon, Search, Plus, Trash2, Hotel, Check, MapPin, X, AlertTriangle,ArrowLeft  } from 'lucide-react'; 

export const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // TRIP OVERVIEW
  const [tripDetails, setTripDetails] = useState({
    title: '', startDate: '', endDate: '', budget: '', travelStyle: 'leisure', notes: ''
  });

  // STOP BUILDER
  const [currentStop, setCurrentStop] = useState({
    locationName: '', lat: 7.8731, lng: 80.7718, searchQuery: '',
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [availableHotels, setAvailableHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  
  // Activities
  const [manualActivity, setManualActivity] = useState('');
  const [addedActivities, setAddedActivities] = useState<string[]>([]);
  const [suggestedActivities, setSuggestedActivities] = useState<string[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

 
  const [addedStops, setAddedStops] = useState<any[]>([]);

  
  const handleSearchLocation = async () => {
    
    if (!tripDetails.startDate) {
      alert("📅 Please select a Start Date first! We need it to check the weather.");
      return;
    }
    if (!currentStop.searchQuery) return;
    
    try {
      // Map
      const mapData = await externalService.searchMap(currentStop.searchQuery);
      if (mapData) {
        setCurrentStop(prev => ({
          ...prev,
          locationName: mapData.displayName.split(',')[0],
          lat: mapData.lat,
          lng: mapData.lng
        }));

        // Weather (Pass Date)
        externalService.getWeather(mapData.lat, mapData.lng, tripDetails.startDate)
          .then(setWeather)
          .catch(() => {});

        // C. Hotels
        externalService.getHotels(mapData.lat, mapData.lng)
          .then(data => { setAvailableHotels(data); setSelectedHotel(null); })
          .catch(() => {});

        // D. Attractions
        setLoadingActivities(true);
        setSuggestedActivities([]);
        externalService.getAttractions(mapData.lat, mapData.lng)
          .then(data => {
            if (Array.isArray(data)) setSuggestedActivities(data);
          })
          .catch(() => {})
          .finally(() => setLoadingActivities(false));
      }
    } catch (error) {
      alert("Location not found.");
    }
  };

  const addManualActivity = () => { if (manualActivity.trim()) { setAddedActivities([...addedActivities, manualActivity.trim()]); setManualActivity(''); } };
  const addSuggestedActivity = (activity: string) => { if (!addedActivities.includes(activity)) { setAddedActivities([...addedActivities, activity]); setSuggestedActivities(prev => prev.filter(a => a !== activity)); } };
  const removeActivity = (index: number) => { setAddedActivities(prev => prev.filter((_, i) => i !== index)); };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { setCoverImage(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); } };
  const handleAddStop = () => {
    if (!currentStop.locationName) { alert("Please search for a location first."); return; }
    const newStop = {
      locationName: currentStop.locationName,
      coordinates: { lat: currentStop.lat, lng: currentStop.lng },
      order: addedStops.length + 1,
      activities: addedActivities.map(name => ({ name })),
      hotel: selectedHotel ? { name: selectedHotel.name, pricePerNight: 0, address: selectedHotel.address } : undefined
    };
    setAddedStops([...addedStops, newStop]);
    setCurrentStop(prev => ({ ...prev, searchQuery: '', locationName: '' }));
    setWeather(null);
    setAvailableHotels([]);
    setSelectedHotel(null);
    setAddedActivities([]);
    setSuggestedActivities([]);
  };
  const handleRemoveStop = (index: number) => { setAddedStops(prev => prev.filter((_, i) => i !== index)); };
  const handleSubmit = async () => {
    if (!tripDetails.title || !tripDetails.startDate) { alert("Please fill in basic details."); return; }
    if (addedStops.length === 0) { alert("Please add at least one stop."); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', tripDetails.title);
      formData.append('startDate', tripDetails.startDate);
      formData.append('endDate', tripDetails.endDate);
      formData.append('budget', tripDetails.budget);
      formData.append('travelStyle', tripDetails.travelStyle);
      formData.append('notes', tripDetails.notes);
      formData.append('status', 'active');
      if (coverImage) formData.append('coverImage', coverImage);
      formData.append('stops', JSON.stringify(addedStops));
      await tripService.create(formData);
      navigate('/home');
    } catch (error) { alert('Failed to save trip.'); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-24">

      <div className="flex items-center gap-3 mb-8">
        
        <button 
          onClick={() => navigate('/home')} 
          className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors -ml-2"
          title="Back to Home"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-800">Plan Your Journey</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: FORM */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 text-slate-700">1. Trip Overview</h3>
            <div className="w-full h-40 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden mb-4 hover:bg-slate-100">
              {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" alt="preview"/> : <div className="text-slate-400 text-sm flex flex-col items-center"><ImageIcon className="w-6 h-6 mb-1"/> <span>Upload Cover</span></div>}
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <div className="space-y-3">
              <Input label="Title" placeholder="e.g. Island Tour" value={tripDetails.title} onChange={e => setTripDetails({...tripDetails, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" label="Start" value={tripDetails.startDate} onChange={e => setTripDetails({...tripDetails, startDate: e.target.value})} />
                <Input type="date" label="End" value={tripDetails.endDate} onChange={e => setTripDetails({...tripDetails, endDate: e.target.value})} />
              </div>
              <Input type="number" label="Budget (LKR)" value={tripDetails.budget} onChange={e => setTripDetails({...tripDetails, budget: e.target.value})} />
              <div>
                <label className="text-sm font-medium text-slate-700">Style</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white" value={tripDetails.travelStyle} onChange={e => setTripDetails({...tripDetails, travelStyle: e.target.value})}>
                  <option value="leisure">Leisure</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 text-slate-700">Itinerary ({addedStops.length})</h3>
            {addedStops.length === 0 ? <p className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-xl border border-dashed">No stops yet.</p> : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {addedStops.map((stop, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800 text-sm flex items-center"><span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center mr-2">{idx + 1}</span> {stop.locationName}</div>
                      {stop.hotel && <div className="text-xs text-slate-500 mt-1 ml-7">🏨 {stop.hotel.name}</div>}
                      <div className="text-xs text-slate-400 mt-1 ml-7">{stop.activities.length} activities</div>
                    </div>
                    <button onClick={() => handleRemoveStop(idx)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
            )}
            <Button onClick={handleSubmit} isLoading={loading} className="w-full mt-4" disabled={addedStops.length === 0}>Save Trip</Button>
          </div>
        </div>

        {/* RIGHT: BUILDER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4 text-indigo-700 flex items-center"><Search className="w-5 h-5 mr-2"/> Add Destination</h3>
            
            <div className="flex gap-2 mb-4">
              <Input placeholder="Search location (e.g. Ella)" value={currentStop.searchQuery} onChange={e => setCurrentStop({...currentStop, searchQuery: e.target.value})} className="flex-grow" />
              <Button onClick={handleSearchLocation} variant="secondary">Search</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <MapPicker selectedLat={currentStop.lat} selectedLng={currentStop.lng} onLocationSelect={(lat, lng) => setCurrentStop(prev => ({...prev, lat, lng}))} />
              
              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center min-h-[150px]">
                  {weather ? <WeatherCard weather={weather} /> : (
                    <div className="text-center text-slate-400 text-sm p-4">
                      {tripDetails.startDate ? 
                        `Search a city to see forecast for ${tripDetails.startDate}` : 
                        "Select a Start Date first to check weather!"}
                    </div>
                  )}
                </div>

                {/* WEATHER WARNING ALERT */}
                {weather?.warning && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3 animate-pulse shadow-sm">
                    <AlertTriangle className="text-red-600 w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-700 font-bold text-sm">Weather Alert</h4>
                      <p className="text-red-600 text-xs mt-1">{weather.warning}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HOTELS */}
            {availableHotels.length > 0 && (
              <div className="mb-6 animate-fade-in">
                <h4 className="font-semibold text-slate-700 mb-3 flex items-center"><Hotel className="w-4 h-4 mr-2 text-teal-600"/> Select Hotel</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                  {availableHotels.map((h, i) => (
                    <div key={i} onClick={() => setSelectedHotel(h)} className={`p-3 rounded-xl border cursor-pointer ${selectedHotel?.name === h.name ? 'border-indigo-500 bg-indigo-50 ring-1' : 'border-slate-200 hover:border-indigo-300'}`}>
                      <div className="font-bold text-sm truncate">{h.name}</div>
                      <div className="text-xs text-slate-500">{h.distance}</div>
                      {selectedHotel?.name === h.name && <Check className="w-4 h-4 text-indigo-600 absolute top-2 right-2"/>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVITIES */}
            <div className="mb-6">
              <h4 className="font-semibold text-slate-700 mb-3 flex items-center"><MapPin className="w-4 h-4 mr-2 text-orange-500"/> Popular Activities</h4>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[30px]">
                {addedActivities.map((act, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center border border-indigo-200">
                    {act} <button onClick={() => removeActivity(i)} className="ml-2 hover:text-red-500 flex items-center"><X className="w-3 h-3"/></button>
                  </span>
                ))}
              </div>
              {loadingActivities && <div className="text-xs text-slate-400 animate-pulse mb-2">Finding tourist spots...</div>}
              {suggestedActivities.length > 0 && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Top things to do in {currentStop.locationName}:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedActivities.map((act, i) => (
                      <button key={i} onClick={() => addSuggestedActivity(act)} className="text-xs bg-white border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm active:scale-95">
                        + {act}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Input placeholder="Add custom activity..." value={manualActivity} onChange={e => setManualActivity(e.target.value)} onKeyPress={e => e.key === 'Enter' && addManualActivity()} />
                <Button type="button" onClick={addManualActivity} variant="secondary" size="sm">Add</Button>
              </div>
            </div>

            <Button type="button" onClick={handleAddStop} className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={!currentStop.locationName}>
              <Plus className="w-5 h-5 mr-2" /> Add Stop to Itinerary
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};