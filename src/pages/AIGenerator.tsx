import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/trip.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Trip } from '../types/trip.types';

export const AIGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'preview'>('input');
  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);

  const [prefs, setPrefs] = useState({
    destination: '',
    days: 3,
    budget: 'Medium',
    type: 'adventure'
  });

  const generateTrip = async () => {
    setLoading(true);
    try {
      const data = await tripService.generateAI(prefs);
      setGeneratedTrip(data);
      setStep('preview');
    } catch (e) {
      alert("AI Generation failed");
    }
  };

  const saveTrip = async () => {
    if (!generatedTrip) return;
    try {
      await tripService.create(generatedTrip);
      navigate('/home');
    } catch (e) { alert('Error saving'); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 pt-28">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold">AI Trip Planner</h1>
        <p className="text-slate-500 mt-2">Tell us your preferences, we'll build the plan.</p>
      </div>

      {step === 'input' ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 space-y-6">
          <Input 
            label="Where do you want to go?" 
            placeholder="e.g. Paris, Bali, New York"
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vibe</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white"
                value={prefs.type}
                onChange={e => setPrefs({...prefs, type: e.target.value})}
              >
                <option value="adventure">Adventure</option>
                <option value="chill">Chill</option>
                <option value="romantic">Romantic</option>
                <option value="family">Family</option>
              </select>
            </div>
          </div>
          <Button 
            onClick={generateTrip} 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            isLoading={loading}
          >
            Generate Itinerary <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50">
          <h2 className="text-2xl font-bold mb-4">{generatedTrip?.title}</h2>
          <div className="space-y-4 mb-8">
            {generatedTrip?.itinerary?.map((day) => (
              <div key={day.day} className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-indigo-600 mb-2">Day {day.day}</h4>
                <ul className="list-disc list-inside text-sm text-slate-700">
                  {day.activities.map((act, i) => <li key={i}>{act}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('input')} className="flex-1">Back</Button>
            <Button onClick={saveTrip} className="flex-1 bg-green-600 hover:bg-green-700">
              Save Trip <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};