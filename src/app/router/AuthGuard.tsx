import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/store/authSlice';

const AuthGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    let redirectPath = "/login";
    if (location.pathname.startsWith("/verification-officer-1")) {
      redirectPath = "/verification-officer-1/login";
    } else if (location.pathname.startsWith("/super-admin")) {
      redirectPath = "/super-admin/login";
    }
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;