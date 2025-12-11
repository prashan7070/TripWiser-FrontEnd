import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const GoogleButton: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const data = await authService.googleLogin(codeResponse.access_token);
        login(data.user, data.accessToken, data.refreshToken);
        navigate('/home');
      } catch (error) {
        console.error('Google Auth Failed', error);
      }
    },
  });

  return (
    <Button type="button" variant="outline" onClick={() => handleGoogleLogin()} className="w-full flex justify-center items-center">
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
      Continue with Google
    </Button>
  );
};