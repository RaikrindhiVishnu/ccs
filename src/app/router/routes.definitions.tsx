import type {RouteObject}
from 'react-router-dom';
import {RootLayout} from '@/components/common/layouts/RootLayout';
import {DashboardRedirect} from './DashboardRedirect';
import {VerificationOfficer2Layout} from '@/components/common/layouts/VerificationOfficer2Layout';
import CreateRegionsAndAreas from '@/features/role-manager/pages/Createregionsandareas';
import CreateRoles from '@/features/role-manager/pages/Createroles';
import CcsProfile from '@/features/ccs/pages/CcsProfile';
import {
    CcsDashboard,
    RoleManagerDetails,
    AgentApprovals,
    Agentdetailpage,
    FarmlandRequest,
    FarmlandRequestMap,
    FarmlandRequestAnalysis,
    FarmlandRequestGateway,
    FarmlandRequestGatewayApproved,
    FarmlandRequestPayment,
    FarmlandList,
    FarmlandListMap,
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

    // Regional Officer imports
    Assignedfarmland,
    AssignedFarmlandList,
    Farmlanddocument,
    IORequestedInfo,
    IORequestedInfoList,
    IOFarmlandsList,
    IOFarmlandsListFull,
    IOFarmlandsListDetailView,
    IOProfile,
    CreateFieldOfficer,
    CreateintellegenceOfficer,
    CreateregionalOfficer,
    EditFieldOfficer,
    EditIntelligenceOfficer,
    EditRegionalOfficer,
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
    VerificationOfficerDashboard,
    VerificationOfficerAssignedFarmlands,
    VerificationOfficerInProgressFarmlands,
    VerificationOfficerCompletedFarmlands,
    VerificationOfficerCompletedFarmlandDetails,
    VerificationOfficerAssignedFarmlandsOwnerDetails,
    VerificationOfficerAssignedFarmlandsLandBoundaries,
    VerificationOfficerAssignedFarmlandsValuation,
    VerificationOfficerAssignedFarmlandsAgriculture,

    // Verification Officer 1 imports
    VerificationOfficer1Dashboard,
    VerificationOfficer1AssignedFarmlands,
    VerificationOfficer1InProgressFarmlands,
    VerificationOfficer1CompletedFarmlands,
    VerificationOfficer1CompletedFarmlandDetails,
    VerificationOfficer1AssignedFarmlandsOwnerDetails,
    VerificationOfficer1Layout,

    // Dev imports
    DraftsPage,
    FieldOfficerLayout,
    RequestInfoPage,
    FarmlandAlertsPage,
    FarmlandAlertDetailsPage,
    TopPerformerDetailsPage,
    AgentDetailsPage,
    AssignedFarmlandPage,
    FarmlandWorkflowPage,
    DraftsDetailPage,
    RequestInfoDetailsPage,
    LandDocumentsPage,
    AssignOfficersPage,
    AssignFieldOfficerPage,
    RegionDetailsView,
    AreaDetailsView,
    RegionAreaEdit,
    UpdatePassword,
    SuperAdminDashboard,
    SuperAdminLogin,
    SuperAdminFarmlands,
    SuperAdminAssignedFarmlandsList,
    SuperAdminFarmlandsListPreview,
    SuperAdminFarmlandsListFull,
    SuperAdminUsersListFull,
    SuperAdminUsersListAll,
    SuperAdminAssignedFarmlandDetails,
    SuperAdminCustomerInformation,
    SuperAdminEditFarmlandTag,
    SuperAdminUserProfile,
    SuperAdminTopPerformers,
    SuperAdminFarmlandDetails,
    SuperAdminAgentProfile,
    SuperAdminProfile
} from './routes.config';


export const guestRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />
    }, {
        path: '/super-admin/login',
        element: <SuperAdminLogin />
    },
];

export const authRoutes: RouteObject[] = [
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <DashboardRedirect />
            },
            {
                path: '/ccs/dashboard',
                element: <CcsDashboard />
            },
            {
                path: '/ccs/profile',
                element: <CcsProfile />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/pending-cases',
                element: <ActiveVerifications />
            }, {
                path: '/geospatial-audit',
                element: <GeospatialAudit />
            }, {
                path: '/farmland-request',
                element: <FarmlandRequest />
            }, {
                path: '/farmland-request/map/:id',
                element: <FarmlandRequestMap />
            }, {
                path: '/farmland-request/analysis/:id',
                element: <FarmlandRequestAnalysis />
            }, {
                path: '/farmland-request/gateway/:id',
                element: <FarmlandRequestGateway />
            }, {
                path: '/farmland-request/gateway-approved/:id',
                element: <FarmlandRequestGatewayApproved />
            }, {
                path: '/farmland-request/payment/:id',
                element: <FarmlandRequestPayment />
            }, {
                path: '/farmland-list',
                element: <FarmlandList />
            }, {
                path: '/farmland-list/map/:id',
                element: <FarmlandListMap />
            }, {
                path: '/send-payment-link',
                element: <SendPaymentLink />
            }, {
                path: '/processing-fee',
                element: <ProcessingFeeScreen />
            }, {
                path: '/role-manager/dashboard',
                element: <RoleManagerDashboard />
            }, {
                path: '/role-manager/user-directory',
                element: <UserDirectory />
            }, {
                path: '/role-manager/create-regions-and-areas',
                element: <CreateRegionsAndAreas />
            }, {
                path: '/role-manager/create-roles',
                element: <CreateRoles />
            }, {
                path: '/role-manager/region-area-dashboard',
                element: <RegionAndArea />
            }, {
                path: '/role-manager/region-creation',
                element: <RegionSelection />
            }, {
                path: '/io/dashboard',
                element: <IODashboard />
            }, {
                path: '/field-officer/dashboard',
                element: <FieldOfficerDashboard />
            },

            // Dev additions
            {
                path: '/io/Assignedfarmland',
                element: <Assignedfarmland />
            }, {
                path: '/io/assigned-farmland/list',
                element: <AssignedFarmlandList />
            }, {
                path: '/io/requested-info',
                element: <IORequestedInfo />
            }, {
                path: '/io/requested-info/list',
                element: <IORequestedInfoList />
            }, {
                path: '/io/farmlands-list',
                element: <IOFarmlandsList />
            }, {
                path: '/io/farmlands-list/list',
                element: <IOFarmlandsListFull />
            }, {
                path: '/role-manager/agent-create',
                element: <AgentCreate />
            }, {
                path: '/role-manager/field-officer-create',
                element: <CreateFieldOfficer />
            }, {
                path: '/role-manager/intellegence-officer-create',
                element: <CreateintellegenceOfficer />
            }, {
                path: '/role-manager/regional-officer-create',
                element: <CreateregionalOfficer />
            }, {
                path: '/role-manager/agent-edit',
                element: <AgentEdit />
            }, {
                path: '/role-manager/edit-field-officer',
                element: <EditFieldOfficer />
            }, {
                path: '/role-manager/edit-field-officer/:id',
                element: <EditFieldOfficer />
            }, {
                path: '/role-manager/edit-intelligence-officer',
                element: <EditIntelligenceOfficer />
            }, {
                path: '/role-manager/edit-intelligence-officer/:id',
                element: <EditIntelligenceOfficer />
            }, {
                path: '/role-manager/edit-regional-officer/:id',
                element: <EditRegionalOfficer />
            }, {
                path: '/role-manager/profile',
                element: <RoleManagerDetails />
            }, {
                path: '/role-manager/profile/:id',
                element: <RoleManagerDetails />
            }, {
                path: '/role-manager/update-password',
                element: <UpdatePassword />
            }, {
                path: '/role-manager/agent-approvals',
                element: <AgentApprovals />
            }, {
                path: '/role-manager/agent-details/:id',
                element: <Agentdetailpage />
            },

            {
                path: '/super-admin/dashboard',
                element: <SuperAdminDashboard />
            }, {
                path: '/super-admin/farmlands',
                element: <SuperAdminFarmlands />
            }, {
                path: '/super-admin/assigned-farmlands',
                element: <SuperAdminAssignedFarmlandsList />
            }, {
                path: '/super-admin/farmlands-list',
                element: <SuperAdminFarmlandsListPreview />
            }, {
                path: '/super-admin/farmlands-list/all',
                element: <SuperAdminFarmlandsListFull />
            }, {
                path: '/super-admin/users-list',
                element: <SuperAdminUsersListFull />
            }, {
                path: '/super-admin/users-list/all',
                element: <SuperAdminUsersListAll />
            }, {
                path: '/super-admin/edit-farmland-tag/:id',
                element: <SuperAdminEditFarmlandTag />
            }, {
                path: '/super-admin/assigned-farmlands/:id',
                element: <SuperAdminAssignedFarmlandDetails />
            }, {
                path: '/super-admin/assigned-farmlands/:id/customer-information',
                element: <SuperAdminCustomerInformation />
            }, {
                path: '/super-admin/user-profile/:id',
                element: <SuperAdminUserProfile />
            }, {
                path: '/super-admin/top-performers',
                element: <SuperAdminTopPerformers />
            }, {
                path: '/super-admin/farmlands-list/:id',
                element: <SuperAdminFarmlandDetails />
            }, {
                path: '/super-admin/agent-profile/:id',
                element: <SuperAdminAgentProfile />
            }, {
                path: '/super-admin/profile',
                element: <SuperAdminProfile />
            },
        ]

    },
    {
        path: '/io/farmland-document/:id',
        element: <Farmlanddocument />
    },
    {
        path: '/io/farmlands-list/detail/:id',
        element: <IOFarmlandsListDetailView />
    },
    {
        path: '/io/requested-info-reason/:id',
        element: <RequestedInfoReason />
    },
    {
        path: '/io/profile',
        element: <IOProfile />
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
        path: "verification-officer-2",
        element: <VerificationOfficer2Layout />,
        children: [
            {
                index: true,
                element: <VerificationOfficerDashboard />,
            },
            {
                path: "dashboard",
                element: <VerificationOfficerDashboard />,
            },
            {
                path: "assigned-farmlands",
                element: <VerificationOfficerAssignedFarmlands />,
            },
            {
                path: "in-progress-farmlands",
                element: <VerificationOfficerInProgressFarmlands />,
            },
            {
                path: "completed-farmland",
                element: <VerificationOfficerCompletedFarmlands />,
            },
        ],
    },
    {
        path: '/verification-officer-2/completed-farmland/:id',
        element: <VerificationOfficerCompletedFarmlandDetails />,
    },
    {
        path: '/verification-officer-2/assigned-farmlands-owner-details/:id',
        element: <VerificationOfficerAssignedFarmlandsOwnerDetails />,
    },
    {
        path: '/verification-officer-2/assigned-farmlands-land-boundaries/:id',
        element: <VerificationOfficerAssignedFarmlandsLandBoundaries />,
    },
    {
        path: '/verification-officer-2/assigned-farmlands-valuation/:id',
        element: <VerificationOfficerAssignedFarmlandsValuation />,
    },
    {
        path: '/verification-officer-2/assigned-farmlands-agriculture/:id',
        element: <VerificationOfficerAssignedFarmlandsAgriculture />,
    },
    {
        path: "verification-officer-1",
        element: <VerificationOfficer1Layout />,
        children: [
            {
                index: true,
                element: <VerificationOfficer1Dashboard />,
            },
            {
                path: "dashboard",
                element: <VerificationOfficer1Dashboard />,
            },
            {
                path: "assigned-farmlands",
                element: <VerificationOfficer1AssignedFarmlands />,
            },
            {
                path: "in-progress-farmlands",
                element: <VerificationOfficer1InProgressFarmlands />,
            },
            {
                path: "completed-farmland",
                element: <VerificationOfficer1CompletedFarmlands />,
            },
        ],
    },
    {
        path: '/verification-officer-1/completed-farmland/:id',
        element: <VerificationOfficer1CompletedFarmlandDetails />,
    },
    {
        path: '/verification-officer-1/assigned-farmlands-owner-details/:id',
        element: <VerificationOfficer1AssignedFarmlandsOwnerDetails />,
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
    {
        path: "/role-manager/region-creation",
        element: <RegionSelection />,
    },
    {
        path: "/role-manager/assign-officers",
        element: <AssignOfficersPage />,
    },
    {
        path: "/role-manager/assign-field-officer",
        element: <AssignFieldOfficerPage />,
    },
    {
        path: "/role-manager/region-edit/:regionId",
        element: <RegionAreaEdit />,
    },
    {
        // Full-screen map for viewing/editing regions — no sidebar layout
        path: "/role-manager/region-area-edit",
        element: <RegionAreaEdit />,
    },
    {
        // Full-screen details view for a specific region
        path: "/role-manager/region-details/:regionId",
        element: <RegionDetailsView />,
    },
    {
        // Full-screen details view for a specific area
        path: "/role-manager/area-details/:areaId",
        element: <AreaDetailsView />,
    },
    {
        element: <FieldOfficerLayout />,
        children: [
            { path: '/field-officer/dashboard',       element: <FieldOfficerDashboard /> },
            { path: '/field-officer/drafts',          element: <DraftsPage /> },
            { path: '/field-officer/request-info',    element: <RequestInfoPage /> },
            { path: '/field-officer/alerts',          element: <FarmlandAlertsPage /> },
            { path: '/field-officer/alerts/:id',      element: <FarmlandAlertDetailsPage /> },
            { path: '/field-officer/top-performer/:id', element: <TopPerformerDetailsPage /> },
            { path: '/field-officer/agent-details/:id', element: <AgentDetailsPage /> },
            { path: '/field-officer/assigned-farmland/:id', element: <AssignedFarmlandPage /> },
            { path: '/field-officer/farmland-workflow/:id', element: <FarmlandWorkflowPage /> },
            { path: '/field-officer/draft-details/:id', element: <DraftsDetailPage /> },
            { path: '/field-officer/request-info/:id', element: <RequestInfoDetailsPage /> },
            { path: '/field-officer/land-documents/:id', element: <LandDocumentsPage /> },
        ],
    },
];

export const publicRoutes: RouteObject[] = [
    {
        path: '/design-system',
        element: <DesignSystem />
    },
    {
        path: '/design-system',
        element: <DesignSystem />
    },
    {
        path: '/role-manager/agent-create',
        element: <AgentCreate />
    },
    {
        path: '/role-manager/agent-edit',
        element: <AgentEdit />
    }, {
        path: '/role-manager/agent-approvals',
        element: <AgentApprovals />
    }, {
        path: '/role-manager/agent-details',
        element: <Agentdetailpage />
    },
];
