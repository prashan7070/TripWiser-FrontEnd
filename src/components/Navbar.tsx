import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
     
      const threshold = window.innerHeight - 80; 
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 
  const isLanding = location.pathname === '/';

  
  const isTransparent = isLanding && !scrolled;

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isTransparent 
      ? "bg-transparent border-transparent" // Invisible
      : "bg-white/95 backdrop-blur-md shadow-sm" // White Glass
  }`;

  const textClass = isTransparent ? "text-white" : "text-slate-800";
  const iconClass = isTransparent ? "text-white" : "text-blue-600";
  const buttonClass = isTransparent 
    ? "bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm" 
    : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Compass className={`w-8 h-8 ${iconClass} transition-colors group-hover:rotate-45 duration-500`} />
            <span className={`text-2xl font-bold tracking-tight ${textClass} transition-colors`}>
              TripWiser
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* User Profile */}
                <div className={`flex items-center gap-3 pl-4 border-l ${isTransparent ? 'border-white/30' : 'border-slate-200'}`}>
                  <div className="text-right hidden sm:block">
                    <p className={`text-sm font-semibold ${textClass}`}>Hi, {user.firstname}</p>
                  </div>
                  
                  <Link to="/profile" className="relative group cursor-pointer">
                    <div className={`h-10 w-10 rounded-full border-2 ${isTransparent ? 'border-white/50' : 'border-white'} shadow-sm overflow-hidden flex items-center justify-center transition-all hover:scale-105`}>
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <UserIcon className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-blue-500'}`} />
                      )}
                    </div>
                  </Link>

                  <button 
                    onClick={handleLogout} 
                    className={`p-2 transition-colors rounded-full hover:bg-white/10 ${isTransparent ? 'text-white hover:text-red-300' : 'text-slate-400 hover:text-red-500'}`}
                    title="Log Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              // Login / Sign Up Buttons
              <div className="flex items-center gap-6">
                <Link 
                  to="/login" 
                  className={`font-medium transition-colors hover:opacity-80 ${textClass}`}
                >
                  Log In
                </Link>
                <Link to="/register">
                  <Button className={`${buttonClass} border-none`}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
