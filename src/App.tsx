import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { AppRouter } from './routes/index';
import { AuthProvider } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { ErrorBoundary } from './components/ErrorBoundary';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  if (!GOOGLE_CLIENT_ID) {
    console.warn("⚠️ Google Client ID is missing. Google Sign-In will be disabled.");
  }

  const content = (
    <ErrorBoundary>
      <AuthProvider>
        <TripProvider>
          <AppRouter />
        </TripProvider>
      </AuthProvider>
    </ErrorBoundary>
  );

  return GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {content}
    </GoogleOAuthProvider>
  ) : (
    content
  );
}

export default App;