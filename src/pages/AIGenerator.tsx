import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { aiService } from '../services/ai.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Sparkles, ArrowRight, AlertTriangle, Calendar, ArrowLeft } from 'lucide-react';

export const AIGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'preview'>('input');
  
  const [generatedTrip, setGeneratedTrip] = useState<any>(null);

  const [prefs, setPrefs] = useState({
    destination: '',
    days: 3,
    budget: '50000',
    type: 'adventure',
    tripDate: 'August'
  });

  const generateTrip = async () => {
    setLoading(true);
    try {
      const data = await aiService.generatePlan({
        destination: prefs.destination,
        days: prefs.days,
        budget: prefs.budget,
        type: prefs.type,
        tripDate: prefs.tripDate 
      });
      
      console.log("AI Response:", data);
      setGeneratedTrip(data);
      setStep('preview');
    } catch (e) {
      console.error(e);
      alert("AI Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    if (!generatedTrip) return;
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Basic Fields
      formData.append('title', generatedTrip.title || `Trip to ${prefs.destination}`);
      formData.append('budget', prefs.budget.toString());
      formData.append('travelStyle', prefs.type);
      formData.append('isAiGenerated', 'true');
      formData.append('status', 'active');

      // Dates Logic
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + prefs.days);

      formData.append('startDate', today.toISOString());
      formData.append('endDate', endDate.toISOString());

      const stopsToSave = generatedTrip.stops || [];
      formData.append('stops', JSON.stringify(stopsToSave));

      // Fetch and append cover image
      const mainLocation = generatedTrip.stops?.[0]?.locationName || prefs.destination || "Sri Lanka";
      const imageUrl = await fetchCityImage(mainLocation);
      formData.append('coverImage', imageUrl);


      await tripService.create(formData);
      navigate('/home');
    } catch (e) {
      console.error("Save Error:", e);
      alert('Error saving trip');
    } finally {
      setLoading(false);
    }
  };


  const fetchCityImage = async (cityName: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${cityName}`
    );
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pages[pageId]?.original?.source) {
      return pages[pageId].original.source;
    }
  } catch (error) {
    console.error("Image fetch failed", error);
  }
  // Fallback if Wiki fails
  return "https://images.unsplash.com/photo-1586616788220-3796d19491ba?auto=format&fit=crop&q=80&w=1000";
  };


  return (
    <div className="max-w-2xl mx-auto px-4 py-20 pt-28">


      <div className="relative mb-10 text-center">
      
    
      <button 
        onClick={() => navigate('/home')} 
        className="absolute left-0 top-2 p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
        title="Back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

     
      <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
        <Sparkles className="w-6 h-6 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-800">AI Trip Planner</h1>
      <p className="text-slate-500 mt-2">Let our AI build the perfect Sri Lankan journey for you.</p>
      
    </div>

      {step === 'input' ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 space-y-6">
          <Input 
            label="Where do you want to go?" 
            placeholder="e.g. Ella, Sigiriya"
            value={prefs.destination}
            onChange={e => setPrefs({...prefs, destination: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Days" 
              type="number" 
              value={prefs.days}
              onChange={e => setPrefs({...prefs, days: parseInt(e.target.value)})}
            />
            <Input 
              label="Budget (LKR)" 
              type="number" 
              value={prefs.budget}
              onChange={e => setPrefs({...prefs, budget: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Travel Style</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={prefs.type}
                onChange={e => setPrefs({...prefs, type: e.target.value})}
              >
                <option value="adventure">Adventure</option>
                <option value="leisure">Leisure (Relaxing)</option>
                <option value="cultural">Cultural</option>
                <option value="luxury">Luxury</option>
                <option value="family">Family</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Month
              </label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={prefs.tripDate}
                onChange={e => setPrefs({...prefs, tripDate: e.target.value})}
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <Button 
            onClick={generateTrip} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 text-lg" 
            isLoading={loading}
          >
            Generate Itinerary <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 animate-fade-in">
          
          <h2 className="text-2xl font-bold mb-2 text-slate-800">{generatedTrip?.title}</h2>
          
          {generatedTrip?.weatherWarning && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl flex gap-3 items-start text-orange-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Weather Alert</p>
                <p className="text-sm">{generatedTrip.weatherWarning}</p>
                {generatedTrip.alternativeLocation && (
                  <p className="text-sm mt-1 font-semibold">
                    Suggestion: Try {generatedTrip.alternativeLocation} instead!
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-6 mb-8">
            {generatedTrip?.stops?.map((stop: any, index: number) => (
              <div key={index} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-indigo-700 text-lg">Stop {stop.order}: {stop.locationName}</h4>
                </div>
                
                {stop.hotel && (
                  <div className="mb-3 text-sm text-slate-600 bg-white p-2 rounded-lg border border-slate-200 inline-block">
                    🏨 <strong>Stay:</strong> {stop.hotel.name} (~{stop.hotel.pricePerNight} LKR)
                  </div>
                )}

                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {stop.activities?.map((act: any, i: number) => (
                    <li key={i}>{act.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('input')} className="flex-1">
              Back to Edit
            </Button>
            <Button onClick={saveTrip} className="flex-1 bg-green-600 hover:bg-green-700">
              Save Trip <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};