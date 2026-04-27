import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load protected pages
const DashboardHome = lazy(() => import('../../features/dashboard/pages/DashboardHome'));

/**
 * Protected route definitions
 */
export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardHome />,
  },
  // Add more protected routes here as the app grows
];
