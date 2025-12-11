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



const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
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
          
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;