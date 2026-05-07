import { lazy } from 'react';

export const CcsDashboard        = lazy(() => import('../../features/dashboard/pages/CcsDashboard'));
export const RoleManagerDetails  = lazy(() => import('../../features/role-manager/pages/RoleManagerDetails'));
export const AgentApprovals      = lazy(() => import('../../features/role-manager/pages/Agentapprovals'));
export const Agentdetailpage     = lazy(() => import('../../features/role-manager/pages/Agentdetailpage'));
export const FarmlandRequest     = lazy(() => import('../../features/dashboard/pages/Farmlandrequest'));
export const FarmlandList        = lazy(() => import('../../features/dashboard/pages/Farmlandlist'));
export const RoleManagerDashboard = lazy(() => import('../../features/role-manager/pages/RoleManagerDashboard'));
export const UserDirectory       = lazy(() => import('../../features/role-manager/pages/UserDirectory'));
export const DesignSystem        = lazy(() => import('../../features/design-system/pages/DesignSystem'));
export const Login               = lazy(() => import('../../pages/Login'));
export const Home                = lazy(() => import('../../pages/Home'));
export const AgentCreate         = lazy(() => import('../../features/role-manager/pages/AgentCreate'));
export const AgentEdit           = lazy(() => import('../../features/role-manager/pages/AgentEdit'));