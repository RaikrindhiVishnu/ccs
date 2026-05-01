import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';

const RoleManagerDashboard = lazy(() => import('../../features/role-manager/pages/RoleManagerDashboard'));
const DesignSystem = lazy(() => import('../../features/design-system/pages/DesignSystem'));
const Login = lazy(() => import("../../pages/Login"));
const Home = lazy(() => import("../../pages/Home"));
const AgentForm = lazy(() => import("../../features/agents/AgentForm"));

const RoleManagerDetails = lazy( () => import("../../features/profile/RoleManagerDetails"));
const AgentApprovals = lazy(
  () => import("../../features/profile/Agentapprovals")
);
const Agentdetailpage = lazy(
  () => import("../../features/profile/Agentdetailpage")
);
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
      { path: '/',    element: <RoleManagerDashboard /> },
      { path: '/home', element: <Home /> },
    ]
  }
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/design-system',
    element: <DesignSystem />,
  },
   {
    path: "/agent-form",
    element: <AgentForm />,
  },
  {
    path: "/profile",
    element: <RoleManagerDetails />,
  },
    {
    path: "/agent-approvals",
    element: <AgentApprovals />,
  },
   {
    path: "/agent-details",
    element: <Agentdetailpage />,
  },
];
