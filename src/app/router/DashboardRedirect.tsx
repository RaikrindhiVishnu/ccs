import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/store/authSlice';

export const DashboardRedirect = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'CCS') return <Navigate to="/ccs/dashboard" replace />;
  if (user.role === 'FO') return <Navigate to="/field-officer/dashboard" replace />;
  if (user.role === 'RO') return <Navigate to="/regional-officer/dashboard" replace />;
  if (user.role === 'SUPERADMIN') return <Navigate to="/super-admin/dashboard" replace />;
  if (user.role === 'VO2') return <Navigate to="/verification-officer-2/dashboard" replace />;
  
  return <Navigate to="/role-manager/dashboard" replace />;
};
