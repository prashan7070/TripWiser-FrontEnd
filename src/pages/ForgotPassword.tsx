import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      alert("Check your email for the reset link!");
    } catch (error) {
      alert("Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </div>
  );
};