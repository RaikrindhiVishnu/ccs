import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/store/authSlice';

/**
 * Route wrapper that prevents authenticated users from accessing public pages (e.g., Login).
 */
const PublicRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    // Redirect to home if already logged in
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
