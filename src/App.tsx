
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AppRouter } from './routes';

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <AppRouter />
//     </GoogleOAuthProvider>
//   );
// }

// export default App;



import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { AppRouter } from './routes/index';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  
  if (!GOOGLE_CLIENT_ID) {
    console.error("Google Client ID not found. Check .env file.");
  }

  return (
    
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <AuthProvider>
        <TripProvider>
          <AppRouter />
        </TripProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;