import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const DashboardHome = lazy(() => import('../../features/dashboard/pages/DashboardHome'));
const DesignSystem = lazy(() => import('../../features/design-system/pages/DesignSystem'));

export const guestRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardHome />,
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
];
