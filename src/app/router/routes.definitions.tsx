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
  GeospatialAudit,
  SendPaymentLink,
  ProcessingFeeScreen,
  IODashboard,
<<<<<<< HEAD
  Assignedfarmland,
  AssignedFarmlandList,
    Farmlanddocument,
      CreateFieldOfficer,
       CreateintellegenceOfficer,
       CreateregionalOfficer,
       EditFieldOfficer,
EditIntelligenceOfficer,
EditRegionalOfficer,
=======
  RegionalOfficerDashboard,
  RegionalOfficerLayout,
  FieldOfficerDashboard,
  DraftsPage,
  FieldOfficerLayout,
  RequestInfoPage,
  FarmlandAlertsPage,
>>>>>>> bhanu
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
      { path: "/", element: <RoleManagerDashboard /> },
      { path: "/ccs/dashboard", element: <CcsDashboard /> },
      { path: "/home", element: <Home /> },
      { path: "/pending-cases", element: <ActiveVerifications /> },
      { path: "/geospatial-audit", element: <GeospatialAudit /> },
      { path: "/farmland-request", element: <FarmlandRequest /> },
      { path: "/farmland-list", element: <FarmlandList /> },
      { path: "/send-payment-link", element: <SendPaymentLink /> },
      { path: "/processing-fee", element: <ProcessingFeeScreen /> },
      { path: "/role-manager/dashboard", element: <RoleManagerDashboard /> },
      { path: "/role-manager/user-directory", element: <UserDirectory /> },
      {
        path: "/role-manager/create-regions-and-areas",
        element: <CreateRegionsAndAreas />,
      },
      { path: "/role-manager/create-roles", element: <CreateRoles /> },
      {
        path: "/role-manager/region-area-dashboard",
        element: <RegionAndArea />,
      },
      { path: "/role-manager/region-creation", element: <RegionSelection /> },
      { path: "/io/dashboard", element: <IODashboard /> },
      { path: "/io/Assignedfarmland", element: <Assignedfarmland /> },
      { path: "/io/assigned-farmland/list", element: <AssignedFarmlandList /> },
      {
        path: "/io/farmland-document/:id",
        element: <Farmlanddocument />,
      },
      { path: "/role-manager/agent-create", element: <AgentCreate /> },
      { path: "/role-manager/field-officer-create", element: <CreateFieldOfficer /> },
      { path: "/role-manager/intellegence-officer-create", element: <CreateintellegenceOfficer /> },
      { path: "/role-manager/regional-officer-create", element: <CreateregionalOfficer /> },
      { path: "/role-manager/agent-edit", element: <AgentEdit /> },
      {
        path: "/role-manager/edit-field-officer",
        element: <EditFieldOfficer />,
      },
      {
        path: "/role-manager/edit-field-officer/:id",
        element: <EditFieldOfficer />,
      },
      {
        path: "/role-manager/edit-intelligence-officer",
        element: <EditIntelligenceOfficer />,
      },
      {
        path: "/role-manager/edit-intelligence-officer/:id",
        element: <EditIntelligenceOfficer />,
      },
      {
        path: "/role-manager/edit-regional-officer/:id",
        element: <EditRegionalOfficer />,
      },
      { path: "/role-manager/profile/:id", element: <RoleManagerDetails /> },
      { path: "/role-manager/agent-approvals", element: <AgentApprovals /> },
      { path: "/role-manager/agent-details/:id", element: <Agentdetailpage /> },   
 ],
  },
  {
    element: <FieldOfficerLayout />,
    children: [
      { path: '/field-officer/dashboard',       element: <FieldOfficerDashboard /> },
      { path: '/field-officer/drafts',          element: <DraftsPage /> },
      { path: '/field-officer/request-info',    element: <RequestInfoPage /> },
      { path: '/field-officer/alerts',          element: <FarmlandAlertsPage /> },
    ],
  },
  {
    element: <RegionalOfficerLayout />,
    children: [
      { path: '/regional-officer/dashboard', element: <RegionalOfficerDashboard /> },
    ],
  },
];

export const publicRoutes: RouteObject[] = [
<<<<<<< HEAD
  { path: '/design-system',                    element: <DesignSystem /> },
=======
  { path: '/design-system',                 element: <DesignSystem /> },
  { path: '/role-manager/agent-create',     element: <AgentCreate /> },
  { path: '/role-manager/agent-edit',       element: <AgentEdit /> },
  { path: '/role-manager/profile',          element: <RoleManagerDetails /> },
  { path: '/role-manager/agent-approvals',  element: <AgentApprovals /> },
  { path: '/role-manager/agent-details',    element: <Agentdetailpage /> },
>>>>>>> bhanu
];