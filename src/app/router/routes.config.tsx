import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const DashboardHome = lazy(() => import('../../features/dashboard/pages/DashboardHome'));
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
    path: '/',
    element: <DashboardHome />,
  },
  {
    path: "/home",
    element: <Home />,
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
