import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../../features/auth/store/authSlice';

const GuestGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  if (isAuthenticated && user) {
    if (user.role === 'CCS') return <Navigate to="/ccs/dashboard" replace />;
    if (user.role === 'FO') return <Navigate to="/field-officer/dashboard" replace />;
    if (user.role === 'RO') return <Navigate to="/regional-officer/dashboard" replace />;
    return <Navigate to="/role-manager/dashboard" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
