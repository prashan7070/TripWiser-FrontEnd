import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppRouter } from './router';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;