import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load public pages
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const DesignSystem = lazy(() => import('../../features/design-system/pages/DesignSystem'));

/**
 * Public route definitions
 */
export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
];
