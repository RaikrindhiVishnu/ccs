import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';
import CreateRegionsAndAreas from '@/features/role-manager/pages/Createregionsandareas';
import CreateRoles from '@/features/role-manager/pages/Createroles';
import {
  CcsDashboard,
  RoleManagerDetails,
  AgentApprovals,
  Agentdetailpage,
  FarmlandRequest,
  FarmlandList,
  RoleManagerDashboard,
  UserDirectory,
  DesignSystem,
  Login,
  Home,
  AgentCreate,
  AgentEdit,
  RegionAndArea,
  RegionSelection,
  ActiveVerifications,
} from './routes.config';

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
      { path: '/',                            element: <CcsDashboard /> },
      { path: '/home',                        element: <Home /> },
      { path: '/pending-cases',               element: <ActiveVerifications /> },
      { path: '/farmland-request',            element: <FarmlandRequest /> },
      { path: '/farmland-list',               element: <FarmlandList /> },
      { path: '/role-manager/dashboard',      element: <RoleManagerDashboard /> },
      { path: '/role-manager/user-directory', element: <UserDirectory /> },
      { path: '/role-manager/create',         element: <CreateRegionsAndAreas /> },
      { path: '/role-manager/create-roles',   element: <CreateRoles /> },
      { path: '/role-manager/region-area',    element: <RegionAndArea /> },
      { path: '/role-manager/region-selection', element: <RegionSelection /> },
    ],
  },
];

export const publicRoutes: RouteObject[] = [
  { path: '/design-system',                  element: <DesignSystem /> },
  { path: '/role-manager/agent-create',      element: <AgentCreate /> },
  { path: '/role-manager/agent-edit',        element: <AgentEdit /> },
  { path: '/role-manager/profile',           element: <RoleManagerDetails /> },
  { path: '/role-manager/agent-approvals',   element: <AgentApprovals /> },
  { path: '/role-manager/agent-details',     element: <Agentdetailpage /> },
];