import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';
import CreateRegionsAndAreas from "@/features/role-manager/pages/Createregionsandareas";
import CreateRoles from "@/features/role-manager/pages/Createroles";

const CcsDashboard    = lazy(() => import('../../features/dashboard/pages/CcsDashboard'));
// const DesignSystem    = lazy(() => import('../../features/design-system/pages/DesignSystem'));
// const Login           = lazy(() => import('../../pages/Login'));
// const Home            = lazy(() => import('../../pages/Home'));
// const AgentForm       = lazy(() => import('../../features/agents/AgentForm'));

const RoleManagerDetails = lazy(() => import('../../features/role-manager/pages/RoleManagerDetails'));
const AgentApprovals     = lazy(() => import('../../features/role-manager/pages/Agentapprovals'));
const Agentdetailpage    = lazy(() => import('../../features/role-manager/pages/Agentdetailpage'));

// ── CCS Officer pages ─────────────────────────────────────────────────────────
const FarmlandRequest = lazy(() => import('../../features/dashboard/pages/Farmlandrequest'));
const FarmlandList = lazy(() => import('../../features/dashboard/pages/Farmlandlist'));
const RoleManagerDashboard = lazy(() => import('../../features/role-manager/pages/RoleManagerDashboard'));
const UserDirectory = lazy(() => import('../../features/role-manager/pages/UserDirectory'));
const DesignSystem = lazy(() => import('../../features/design-system/pages/DesignSystem'));
const Login = lazy(() => import("../../pages/Login"));
const Home = lazy(() => import("../../pages/Home"));
const AgentCreate = lazy(() => import("../../features/role-manager/pages/AgentCreate"));
const AgentEdit = lazy(() => import("../../features/role-manager/pages/AgentEdit"));
const RegionAndArea = lazy(() => import("../../features/role-manager/pages/RegionAndArea"));
const RegionSelection = lazy(() => import("../../features/role-manager/pages/RegionSelection"));

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
       { path: '/',                 element: <CcsDashboard /> },  
      { path: '/home', element: <Home /> },
       { path: '/farmland-request', element: <FarmlandRequest /> },
       { path: '/farmland-list', element: <FarmlandList /> },
      { path: '/role-manager/dashboard', element: <RoleManagerDashboard /> },
      { path: '/role-manager/user-directory', element: <UserDirectory /> },
      // Inside your router:
{ path: "/role-manager/create", element: <CreateRegionsAndAreas /> },
 { path:"/role-manager/create-roles" ,element:<CreateRoles />},
 { path: "/role-manager/region-area", element: <RegionAndArea /> },
 { path: "/role-manager/region-selection", element: <RegionSelection /> }
    ],
  },
];

export const publicRoutes: RouteObject[] = [
  { path: '/design-system',            element: <DesignSystem /> },
  { path: '/role-manager/agent-create', element: <AgentCreate /> },
  { path: '/role-manager/agent-edit',   element: <AgentEdit /> },
  { path: '/role-manager/profile',      element: <RoleManagerDetails /> },
  { path: '/role-manager/agent-approvals', element: <AgentApprovals /> },
  { path: '/role-manager/agent-details',   element: <Agentdetailpage /> },
];