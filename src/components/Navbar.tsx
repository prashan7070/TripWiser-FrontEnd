import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, Plus } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800 tracking-tight">TripWiser</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/create-trip">
                  <Button variant="outline" className="hidden sm:flex text-sm">
                    <Plus className="w-4 h-4 mr-2" /> New Trip
                  </Button>
                </Link>
                <div className="hidden sm:block text-sm font-medium text-slate-700">
                  Hi, {user.firstname}
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-slate-500 hover:text-red-600 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
             
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Log In
                </Link>
                <Link to="/register">
                  <Button className="px-5 py-2">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};