import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { GoogleButton } from '../auth/GoogleButton';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response: any = await authService.login(formData);
      console.log("Full Login Response:", response);
      
      const userData = response.user || response.data?.user || response.data;
      const token = response.accessToken || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;

      if (token && userData) {
      
        login(userData, token, refreshToken);
        console.log("Login successful, navigating...");
        navigate('/home');
      } else {
        console.error("Token not found in response");
        alert("Login Error: No token received from server");
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email" type="email" required
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <Input 
            label="Password" type="password" required
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button type="submit" className="w-full" isLoading={loading}>Sign In</Button>
        </form>
        <div className="my-6 flex items-center"><div className="flex-grow border-t border-slate-200"></div><span className="mx-4 text-slate-400 text-sm">OR</span><div className="flex-grow border-t border-slate-200"></div></div>
        <GoogleButton />
        <p className="mt-6 text-center text-sm text-slate-600">Don't have an account? <Link to="/register" className="text-blue-600 font-medium">Sign Up</Link></p>
      </div>
    </div>
  );
};