import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const ActiveGoogleButton: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Token Received:", tokenResponse.access_token);
        
        // Send token to backend
        const response: any = await authService.googleLogin(tokenResponse.access_token);
        
        // Extract Data 
        const user = response.user || response.data?.user;
        const accessToken = response.accessToken || response.data?.accessToken;
        const refreshToken = response.refreshToken || response.data?.refreshToken;

        if (user && accessToken) {
          login(user, accessToken, refreshToken);
          navigate('/home');
        } else {
          alert("Google Login Failed: No token from server.");
        }
      } catch (error) {
        console.error("Google Auth Backend Error:", error);
        alert("Google Login Failed.");
      }
    },
    onError: () => {
      console.error("Google Auth Failed on Client Side");
    },
  });

  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={() => handleGoogleLogin()} 
      className="w-full flex justify-center items-center"
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
      Continue with Google
    </Button>
  );
};

export const GoogleButton: React.FC = () => {
  if (!GOOGLE_CLIENT_ID) {
    return (
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => alert("Google Login requires VITE_GOOGLE_CLIENT_ID environment variable.")} 
        className="w-full flex justify-center items-center opacity-75"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
        Continue with Google (Disabled)
      </Button>
    );
  }

  return <ActiveGoogleButton />;
};