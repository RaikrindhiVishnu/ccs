import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';

const CcsDashboard    = lazy(() => import('../../features/dashboard/pages/CcsDashboard'));
const DesignSystem    = lazy(() => import('../../features/design-system/pages/DesignSystem'));
const Login           = lazy(() => import('../../pages/Login'));
const Home            = lazy(() => import('../../pages/Home'));
const AgentForm       = lazy(() => import('../../features/agents/AgentForm'));

const RoleManagerDetails = lazy(() => import('../../features/profile/RoleManagerDetails'));
const AgentApprovals     = lazy(() => import('../../features/profile/Agentapprovals'));
const Agentdetailpage    = lazy(() => import('../../features/profile/Agentdetailpage'));

// ── CCS Officer pages ─────────────────────────────────────────────────────────
const FarmlandRequest = lazy(() => import('../../features/dashboard/pages/Farmlandrequest'));
// const FarmlandList = lazy(() => import('../../features/dashboard/pages/FarmlandList'));

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
      { path: '/',                 element: <CcsDashboard /> },   // ← was DashboardHome
      { path: '/home',             element: <Home /> },
      { path: '/farmland-request', element: <FarmlandRequest /> },
      // { path: '/farmland-list', element: <FarmlandList /> },
    ],
  },
];

export const publicRoutes: RouteObject[] = [
  { path: '/design-system',   element: <DesignSystem /> },
  { path: '/agent-form',      element: <AgentForm /> },
  { path: '/profile',         element: <RoleManagerDetails /> },
  { path: '/agent-approvals', element: <AgentApprovals /> },
  { path: '/agent-details',   element: <Agentdetailpage /> },
];