import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../../features/auth/store/authSlice';

const AuthGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated || !user) {
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