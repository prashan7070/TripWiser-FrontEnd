import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { GoogleButton } from '../auth/GoogleButton';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    firstname: '', lastname: '', email: '', password: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register({ ...formData, role: "USER" });
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input 
              label="First Name" 
              required
              value={formData.firstname}
              onChange={(e) => setFormData({...formData, firstname: e.target.value})}
            />
            <Input 
              label="Last Name" 
              required
              value={formData.lastname}
              onChange={(e) => setFormData({...formData, lastname: e.target.value})}
            />
          </div>
          <Input 
            label="Email" 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Password" 
            type="password" 
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button type="submit" className="w-full mt-4" isLoading={loading}>Sign Up</Button>
        </form>

        <div className="my-6 flex items-center"><div className="flex-grow border-t border-slate-200"></div><span className="mx-4 text-slate-400 text-sm">OR</span><div className="flex-grow border-t border-slate-200"></div></div>
        <GoogleButton />
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};