import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/components/common/layouts/RootLayout';
import { DashboardRedirect } from './DashboardRedirect';
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
  RegionalOfficerDashboard,
  AssignedFarmlands,
  RequestedInfo,
  RequestedInfoDetails,
  RequestedInfoReason,
  Drafts,
  FarmlandsList,
  FarmlandDetails,
  LandDocument,
  FamilyTree,
  LandDetails,
  CustomerLandDetails,
  SubmitForm,
  LandBoundaries,
  RegionalOfficerLayout,
  FieldOfficerDashboard,
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
      { path: '/',                              element: <DashboardRedirect /> },
      { path: '/ccs/dashboard',                 element: <CcsDashboard /> },
      { path: '/home',                          element: <Home /> },
      { path: '/pending-cases',                 element: <ActiveVerifications /> },
      { path: '/geospatial-audit',              element: <GeospatialAudit /> },
      { path: '/farmland-request',              element: <FarmlandRequest /> },
      { path: '/farmland-list',                 element: <FarmlandList /> },
      { path: '/send-payment-link',             element: <SendPaymentLink /> },
      { path: '/processing-fee',                element: <ProcessingFeeScreen /> },
      { path: '/role-manager/dashboard',        element: <RoleManagerDashboard /> },
      { path: '/role-manager/user-directory',   element: <UserDirectory /> },
      { path: '/role-manager/create',           element: <CreateRegionsAndAreas /> },
      { path: '/role-manager/create-roles',     element: <CreateRoles /> },
      { path: '/role-manager/region-area',      element: <RegionAndArea /> },
      { path: '/role-manager/region-selection', element: <RegionSelection /> },
      { path: '/io/dashboard',                  element: <IODashboard /> },
      { path: '/field-officer/dashboard',       element: <FieldOfficerDashboard /> },
    ],
  },
  {
    element: <RegionalOfficerLayout />,
    children: [
      { path: '/regional-officer/dashboard',          element: <RegionalOfficerDashboard /> },
      { path: '/regional-officer/assigned-farmlands', element: <AssignedFarmlands /> },
      { path: '/regional-officer/requested-info',     element: <RequestedInfo /> },
      { path: '/regional-officer/drafts',             element: <Drafts /> },
      { path: '/regional-officer/farmlands-list',     element: <FarmlandsList /> },
    ],
  },
  {
    path: '/regional-officer/requested-info-details/:id',
    element: <RequestedInfoDetails />,
  },
  {
    path: '/regional-officer/requested-info-reason/:id',
    element: <RequestedInfoReason />,
  },
  {
    path: '/regional-officer/farmlands-list-details/:id',
    element: <FarmlandDetails />,
  },
  {
    path: '/regional-officer/assigned-farmlands-details/:id',
    element: <FarmlandDetails />,
  },
  {
    path: '/regional-officer/assigned-farmlands-upload/:id',
    element: <LandDocument />,
  },
  {
    path: '/regional-officer/assigned-farmlands-family-tree/:id',
    element: <FamilyTree />,
  },
  {
    path: '/regional-officer/assigned-farmlands-land-details/:id',
    element: <CustomerLandDetails />,
  },
  {
    path: '/regional-officer/assigned-farmlands-valuation/:id',
    element: <LandDetails />,
  },
  {
    path: '/regional-officer/submit-form/:id',
    element: <SubmitForm />,
  },
  {
    path: '/regional-officer/assigned-farmlands-land-boundaries/:id',
    element: <LandBoundaries />,
  },
];

export const publicRoutes: RouteObject[] = [
  { path: '/design-system',                 element: <DesignSystem /> },
  { path: '/role-manager/agent-create',     element: <AgentCreate /> },
  { path: '/role-manager/agent-edit',       element: <AgentEdit /> },
  { path: '/role-manager/profile',          element: <RoleManagerDetails /> },
  { path: '/role-manager/agent-approvals',  element: <AgentApprovals /> },
  { path: '/role-manager/agent-details',    element: <Agentdetailpage /> },
];