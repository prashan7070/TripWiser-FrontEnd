import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { CloudSun, Sparkles, ArrowRight, Compass, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 
import { useEffect } from 'react';

export const Landing: React.FC = () => {

  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-100">
      
    
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster=""
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mt-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/30 mb-8 text-sm font-medium text-teal-50 shadow-lg">
            <Star className="w-4 h-4 text-yellow-400 mr-2 fill-yellow-400" />
            #1 Travel Planner for Sri Lanka
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-lg">
            Discover the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">
              Wonder of Asia
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Experience Sri Lanka like never before. From the surf of Arugam Bay to the mist of Knuckles Range. 
            Plan, visualize, and explore with AI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link to="/register">
              <Button className="bg-teal-600 hover:bg-teal-500 text-white px-10 py-5 text-lg rounded-full shadow-lg shadow-teal-900/40 w-full sm:w-auto transition-transform hover:scale-105 border-0 ring-4 ring-teal-600/20">
                Start My Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-5 text-lg rounded-full shadow-lg w-full sm:w-auto border-0">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
           <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* 2. DESTINATIONS GRID */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Curated Sri Lankan Experiences</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We have mapped out the island's hidden gems. Click to see details or add them to your plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
            
            <div className="md:col-span-2 md:row-span-2 group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer h-full min-h-[300px]">
  
                <img 
                  src="/sigiriya rock.jpg" 
                  alt="Sigiriya Lion Rock" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              
                <div className="absolute bottom-8 left-8 text-white z-20">
                  <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded text-white mb-2 inline-block">CULTURAL TRIANGLE</span>
                  <h3 className="text-3xl font-bold">Sigiriya Rock Fortress</h3>
                  <p className="text-slate-300 mt-2">The 8th wonder of the world.</p>
                </div>
            </div>

            

            {/* Mirissa */}
            <div className="md:col-span-1 group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop" 
                alt="Sri Lanka Coast" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Mirissa</h3>
                <p className="text-slate-300 text-sm">Sunset at Coconut Hill</p>
              </div>
            </div>


            <div className="md:col-span-1 group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
              <img 
                src="/nine arch bridge.jpg" 
                alt="Nine Arch Bridge" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Ella</h3>
                <p className="text-slate-300 text-sm">Nine Arch Bridge</p>
              </div>
            </div>

            {/* 4. Galle */}
            <div className="md:col-span-2 group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop" 
                alt="Unawatuna Swing" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className="bg-teal-500 text-xs font-bold px-2 py-1 rounded text-white mb-2 inline-block">SOUTH COAST</span>
                <h3 className="text-2xl font-bold">Unawatuna & Galle</h3>
                <p className="text-slate-300 text-sm">Colonial vibes & rope swings.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURES*/}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 space-y-32">
          
          {/* Feature : AI */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                AI that knows Sri Lanka better than a guide.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Avoid the tourist traps. Our AI builds custom itineraries based on your budget (`LKR`), travel style, and the season. 
                Whether you want the cultural triangle or a surf trip.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-700 flex items-center justify-center mr-3 text-sm">1</div> 
                  Calculates travel times between Hill Country roads
                </li>
                <li className="flex items-center text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-700 flex items-center justify-center mr-3 text-sm">2</div> 
                  Suggests authentic local food stops
                </li>
              </ul>
            </div>
            <div className="flex-1">
               {/* Decorative generic travel abstract */}
               <img 
                 src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                 className="rounded-[2rem] shadow-2xl shadow-teal-900/10 rotate-2 hover:rotate-0 transition-transform duration-500" 
                 alt="Planning"
               />
            </div>
          </div>

          {/* Feature : Weather */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <CloudSun className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Real-time Tropical Weather.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Sri Lanka is tropical. It can be sunny in Galle but raining in Trincomalee. 
                Get precise, location-based weather data for every stop on your trip.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
                 <CloudSun className="w-12 h-12 text-yellow-500" />
                 <div>
                    <div className="text-sm text-slate-500">Current Forecast: Colombo</div>
                    <div className="font-bold text-2xl text-slate-800">31°C <span className="text-sm font-normal text-slate-500">Scattered Clouds</span></div>
                 </div>
              </div>
            </div>
            <div className="flex-1">
               <img 
                 src="/srilanka beach.jpg" 
                 className="rounded-[2rem] shadow-2xl shadow-orange-900/10 -rotate-2 hover:rotate-0 transition-transform duration-500" 
                 alt="Sunny Beach"
               />
            </div>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-teal-900 to-slate-900 text-white relative overflow-hidden">
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8">Your Sri Lankan story starts here.</h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who planned their perfect island getaway with TripWiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/register">
                <Button className="bg-white text-teal-900 hover:bg-teal-50 px-10 py-4 text-lg rounded-full font-bold h-auto border-0">
                  Plan My Trip Now
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/*  FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-white mb-6">
              <Compass className="w-8 h-8 text-teal-500" />
              <span className="text-2xl font-bold">TripWiser</span>
            </div>
            <p className="max-w-sm text-base leading-relaxed">
              The smartest way to explore Sri Lanka. From the chaotic streets of Pettah to the quiet hills of Haputale, we guide you every step of the way.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Platform</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/login" className="hover:text-teal-400 transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-teal-400 transition-colors">Register</Link></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Weather Map</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">About</h4>
            <ul className="space-y-3 text-base">
              <li>Our Story</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
          © 2024 TripWiser Sri Lanka. All rights reserved. Made with ❤️ for the island.
        </div>
      </footer>
    </div>
  );
};


