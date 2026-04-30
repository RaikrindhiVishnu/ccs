import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';

const DashboardHome = lazy(() => import('../../features/dashboard/pages/DashboardHome'));
const DesignSystem = lazy(() => import('../../features/design-system/pages/DesignSystem'));
const Login = lazy(() => import("../../pages/Login"));
const Home = lazy(() => import("../../pages/Home"));

export const guestRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
];

export const authRoutes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/',     element: <DashboardHome /> },
      { path: '/home', element: <Home /> },
    ]
  }
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
];
