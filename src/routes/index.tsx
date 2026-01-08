import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { CreateTrip } from '../pages/CreateTrip';
import { TripDetails } from '../pages/TripDetails';
import { AIGenerator } from '../pages/AIGenerator';
import { Profile } from '../pages/Profile';
import { Loader2 } from 'lucide-react'; 


const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth(); 

 
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-500 text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/create-trip', element: <CreateTrip /> },
          { path: '/trips/:id', element: <TripDetails /> },
          { path: '/ai-generator', element: <AIGenerator /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;