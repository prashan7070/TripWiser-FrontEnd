import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await authService.resetPassword(token, password);
      alert("Password reset! Login with new password.");
      navigate('/login');
    } catch (error) {
      alert("Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="password" label="New Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
      </div>
    </div>
  );
};