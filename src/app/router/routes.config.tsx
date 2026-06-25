import { lazy } from "react";

export const CcsDashboard = lazy(() => import("../../features/ccs/pages/CcsDashboard"),);
export const RoleManagerDetails = lazy(() => import("../../features/role-manager/pages/RoleManagerDetails"),);
export const UpdatePassword = lazy(() => import("../../features/role-manager/pages/UpdatePassword"),);
export const AgentApprovals = lazy(() => import("../../features/role-manager/pages/Agentapprovals"),);
export const Agentdetailpage = lazy(() => import("../../features/role-manager/pages/Agentdetailpage"),);
export const FarmlandRequest = lazy(() => import("../../features/ccs/pages/Farmlandrequest"),);
export const FarmlandRequestMap = lazy(() => import("../../features/ccs/pages/FarmlandRequestMap"),);
export const FarmlandRequestAnalysis = lazy(() => import("../../features/ccs/pages/FarmlandRequestAnalysis"),);
export const FarmlandRequestGateway = lazy(() => import("../../features/ccs/pages/FarmlandRequestGateway"),);
export const FarmlandRequestGatewayApproved = lazy(() => import("../../features/ccs/pages/FarmlandRequestGatewayApproved"),);
export const FarmlandRequestPayment = lazy(() => import("../../features/ccs/pages/FarmlandRequestPayment"),);
export const FarmlandList = lazy(() => import("../../features/ccs/pages/Farmlandlist"),);
export const FarmlandListMap = lazy(() => import("../../features/ccs/pages/FarmlandListMap"),);
export const RoleManagerDashboard = lazy(() => import("../../features/role-manager/pages/RoleManagerDashboard"),);
export const UserDirectory = lazy(() => import("../../features/role-manager/pages/UserDirectory"),);
export const DesignSystem = lazy(() => import("../../features/design-system/pages/DesignSystem"),);
export const Login = lazy(() => import("../../pages/Login"));
export const CcsLogin = lazy(() => import("../../features/ccs/pages/CCSLogin"));
export const UpdateDefaultPassword = lazy(() => import("../../features/ccs/pages/UpdateDefaultPassword"));
export const ChangePassword = lazy(() => import("../../features/ccs/pages/ChangePassword"));
export const ForgotPassword = lazy(() => import("../../features/ccs/pages/ForgotPassword"));
export const PasswordSent = lazy(() => import("../../features/ccs/pages/PasswordSent"));
export const Home = lazy(() => import("../../pages/Home"));
export const AgentCreate = lazy(() => import("../../features/role-manager/pages/AgentCreate"),);
export const AgentEdit = lazy(() => import("../../features/role-manager/pages/AgentEdit"),);
export const RegionAndArea = lazy(() => import("../../features/role-manager/pages/RegionAndArea"),);
export const RegionSelection = lazy(() => import("../../features/role-manager/pages/RegionSelection"),);
export const ActiveVerifications = lazy(() => import("../../features/ccs/pages/Activeverifications"),);
export const GeospatialAudit = lazy(() => import("../../features/ccs/pages/Geospatialauditscreen"),);
export const SendPaymentLink = lazy(() => import("../../features/ccs/pages/payment"),);
export const ProcessingFeeScreen = lazy(() => import("../../features/ccs/pages/ProcessingFeeScreen"),);

// Intelligence Officer (from upstream)
export const IODashboard = lazy(() => import("../../features/io/pages/Dashboard"),);

// Regional Officer
export const RegionalOfficerDashboard = lazy(() => import("../../features/regional-officer/pages/RegionalOfficerDashboard"),);
export const AssignedFarmlands = lazy(() => import("../../features/regional-officer/pages/AssignedFarmlands"),);
export const RequestedInfo = lazy(() => import("../../features/regional-officer/pages/RequestedInfo"),);
export const RequestedInfoDetails = lazy(() => import("../../features/regional-officer/pages/RequestedInfoDetails"),);
export const RequestedInfoReason = lazy(() => import("../../features/regional-officer/pages/RequestedInfoReason"),);
export const Drafts = lazy(() => import("../../features/regional-officer/pages/Drafts"),);
export const FarmlandsList = lazy(() => import("../../features/regional-officer/pages/FarmlandsList"),);
export const FarmlandDetails = lazy(() => import("../../features/regional-officer/pages/FarmlandDetails"),);
export const LandDocument = lazy(() => import("../../features/regional-officer/pages/LandDocument"),);
export const FamilyTree = lazy(() => import("../../features/regional-officer/pages/FamilyTree"),);
export const LandDetails = lazy(() => import("../../features/regional-officer/pages/LandDetails"),);
export const CustomerLandDetails = lazy(() => import("../../features/regional-officer/pages/CustomerLandDetails"),);
export const SubmitForm = lazy(() => import("../../features/regional-officer/pages/SubmitForm"),);
export const LandBoundaries = lazy(() => import("../../features/regional-officer/pages/LandBoundaries"),);
export const RegionalOfficerLayout = lazy(() => import("../../components/common/layouts/Regionalofficerlayout"),);

// Field Officer
export const FieldOfficerDashboard = lazy(() => import("../../features/field-officer/pages/FieldOfficerDashboard"),);

// Verification Officer
export const VerificationOfficerDashboard = lazy(() => import("../../features/verification-officer-2/pages/VerificationOfficerDashboard"),);
export const VerificationOfficerAssignedFarmlands = lazy(() => import("../../features/verification-officer-2/pages/AssignedFarmlands"),);
export const VerificationOfficerInProgressFarmlands = lazy(() => import("../../features/verification-officer-2/pages/InProgressFarmlands"),);
export const VerificationOfficerCompletedFarmlands = lazy(() => import("../../features/verification-officer-2/pages/CompletedFarmlands"),);
export const VerificationOfficerCompletedFarmlandDetails = lazy(() => import("../../features/verification-officer-2/pages/CompletedFarmlandDetails"),);
export const VerificationOfficerAssignedFarmlandsOwnerDetails = lazy(() => import("../../features/verification-officer-2/pages/AssignedFarmlandsOwnerDetails"),);
export const VerificationOfficerAssignedFarmlandsLandBoundaries = lazy(() => import("../../features/verification-officer-2/pages/AssignedFarmlandsLandBoundaries"),);
export const VerificationOfficerAssignedFarmlandsValuation = lazy(() => import("../../features/verification-officer-2/pages/AssignedFarmlandsValuation"),);
export const VerificationOfficerAssignedFarmlandsAgriculture = lazy(() => import("../../features/verification-officer-2/pages/AssignedFarmlandsAgriculture"),);
export const VerificationOfficerLayout = lazy(() => import("../../components/common/layouts/VerificationOfficer2Layout"),);

// Verification Officer 1 (VO1)
export const VerificationOfficer1Dashboard = lazy(
  () => import("../../features/verification-officer-1/pages/Dashboard"),
);
export const VerificationOfficer1AssignedFarmlands = lazy(
  () => import("../../features/verification-officer-1/pages/AssignedFarmlands"),
);
export const VerificationOfficer1InProgressFarmlands = lazy(
  () => import("../../features/verification-officer-1/pages/InProgressFarmlands"),
);
export const VerificationOfficer1CompletedFarmlands = lazy(
  () => import("../../features/verification-officer-1/pages/CompletedFarmlands"),
);
export const VerificationOfficer1CompletedFarmlandDetails = lazy(
  () => import("../../features/verification-officer-1/pages/CompletedFarmlandDetails"),
);
export const VerificationOfficer1AssignedFarmlandsOwnerDetails = lazy(
  () => import("../../features/verification-officer-1/pages/AuditRoom"),
);
export const VerificationOfficer1Layout = lazy(
  () => import("../../components/common/layouts/VerificationOfficer1Layout"),
);
export const VerificationOfficer1Login = lazy(
  () => import("../../features/verification-officer-1/pages/Login"),
);
export const VerificationOfficer1Profile = lazy(
  () => import("../../features/verification-officer-1/pages/Profile"),
);

// Verification Officer 3 (VO3)
export const VerificationOfficer3Dashboard = lazy(
  () => import("../../features/verification-officer-3/pages/VerificationOfficer3Dashboard"),
);
export const VerificationOfficer3AssignedFarmlands = lazy(
  () => import("../../features/verification-officer-3/pages/AssignedFarmlands"),
);
export const VerificationOfficer3InProgressFarmlands = lazy(
  () => import("../../features/verification-officer-3/pages/InProgressFarmlands"),
);
export const VerificationOfficer3CompletedFarmlands = lazy(
  () => import("../../features/verification-officer-3/pages/CompletedFarmlands"),
);
export const VerificationOfficer3Layout = lazy(
  () => import("../../components/common/layouts/VerificationOfficer3Layout"),
);

// Dev Imports
export const Assignedfarmland = lazy(() => import("../../features/io/pages/Assignedfarmland"),);
export const AssignedFarmlandList = lazy(() => import("../../features/io/components/AssignedFarmlandList"),);
export const Farmlanddocument = lazy(() => import("../../features/io/components/Farmlanddocument"),);
export const IORequestedInfo = lazy(() => import("../../features/io/pages/RequestedInfo"),);
export const IORequestedInfoList = lazy(() => import("../../features/io/pages/RequestedInfoList"),);
export const IOFarmlandsList = lazy(() => import("../../features/io/pages/FarmlandsList"),);
export const IOFarmlandsListFull = lazy(() => import("../../features/io/pages/FarmlandsListFull"),);
export const IOFarmlandsListDetailView = lazy(() => import("../../features/io/pages/FarmlandsListDetailView"),);
export const IOProfile = lazy(() => import("../../features/io/pages/Profile"),);
export const CreateFieldOfficer = lazy(() => import("../../features/role-manager/pages/Createfieldofficer"),);
export const CreateintellegenceOfficer = lazy(() => import("../../features/role-manager/pages/Createintelligenceofficer"),);
export const CreateregionalOfficer = lazy(() => import("../../features/role-manager/pages/Createregionalofficer"),);
export const EditFieldOfficer = lazy(() => import("../../features/role-manager/pages/Createfieldofficer"),);
export const EditIntelligenceOfficer = lazy(() => import("../../features/role-manager/pages/Createintelligenceofficer"),);
export const EditRegionalOfficer = lazy(() => import("../../features/role-manager/pages/Createregionalofficer"),);

export const DraftsPage = lazy(() => import("../../features/field-officer/pages/DraftsPage"),);
export const FieldOfficerLayout = lazy(() => import("../../components/common/layouts/FieldOfficerLayout"),);
export const RequestInfoPage = lazy(() => import("../../features/field-officer/pages/RequestInfoPage"),);
export const FarmlandAlertsPage = lazy(() => import("../../features/field-officer/pages/FarmlandAlertsPage"),);
export const FarmlandAlertDetailsPage = lazy(() => import("../../features/field-officer/pages/FarmlandAlertDetailsPage"),);
export const TopPerformerDetailsPage = lazy(() => import("../../features/field-officer/pages/TopPerformerDetailsPage"),);
export const AgentDetailsPage = lazy(() => import("../../features/field-officer/pages/AgentDetailsPage"),);
export const AssignedFarmlandPage = lazy(() => import("../../features/field-officer/pages/AssignedFarmlandPage"),);
export const FarmlandWorkflowPage = lazy(() => import("../../features/field-officer/pages/FarmlandWorkflowPage"),);
export const DraftsDetailPage = lazy(() => import("../../features/field-officer/pages/DraftsDetailPage"),);
export const RequestInfoDetailsPage = lazy(() => import("../../features/field-officer/pages/RequestInfoDetailsPage"),);
export const LandDocumentsPage = lazy(() => import("../../features/field-officer/pages/LandDocumentsPage"),);
export const AssignOfficersPage = lazy(() => import("../../features/role-manager/pages/AssignOfficers"),);
export const AssignFieldOfficerPage = lazy(() => import("../../features/role-manager/pages/AssignFieldOfficer"),);

// ─── Region & Area View / Edit pages (placeholder — wire to API when ready) ───
export const RegionEdit = lazy(() => import("../../features/role-manager/pages/RegionAreaEdit"),);
export const RegionDetailsView = lazy(() => import("../../features/role-manager/pages/RegionDetailsView"),);
export const AreaDetailsView = lazy(() => import("../../features/role-manager/pages/AreaDetailsView"),);
export const RegionAreaEdit = lazy(() => import("../../features/role-manager/pages/RegionAreaEdit"),);

// Super Admin
export const SuperAdminDashboard = lazy(() => import("../../features/super-admin/pages/SuperAdminDashboard"),);
export const SuperAdminLogin = lazy(() => import("../../features/super-admin/pages/SuperAdminLogin"),);
export const SuperAdminFarmlands = lazy(() => import("../../features/super-admin/pages/SuperAdminFarmlands"),);
export const UploadSuperAdmin = lazy(() => import("../../features/super-admin/pages/upload-docs/UploadSuperAdmin"),);
export const SuperAdminFarmlandsListPreview = lazy(() => import("../../features/super-admin/pages/SuperAdminFarmlandsListPreview"),);
export const SuperAdminFarmlandsListFull = lazy(() => import("../../features/super-admin/pages/SuperAdminFarmlandsListFull"),);
export const SuperAdminUsersListFull = lazy(() => import("../../features/super-admin/pages/SuperAdminUsersListFull"),);
export const SuperAdminUsersListAll = lazy(() => import("../../features/super-admin/pages/SuperAdminUsersListAll"),);
export const SuperAdminEditFarmlandTag = lazy(() => import("../../features/super-admin/pages/SuperAdminEditFarmlandTag"),);
export const SuperAdminAssignedFarmlandsList = lazy(() => import("../../features/super-admin/pages/SuperAdminAssignedFarmlandsList"),);
export const SuperAdminAssignedFarmlandDetails = lazy(() => import("../../features/super-admin/pages/SuperAdminAssignedFarmlandDetails"),);
export const SuperAdminCustomerInformation = lazy(() => import("../../features/super-admin/pages/SuperAdminCustomerInformation"),);
export const SuperAdminUserProfile = lazy(() => import("../../features/super-admin/pages/SuperAdminUserProfile"),);
export const SuperAdminTopPerformers = lazy(() => import("../../features/super-admin/pages/SuperAdminTopPerformers"),);
export const SuperAdminFarmlandDetails = lazy(() => import("../../features/super-admin/pages/SuperAdminFarmlandDetails"),);
export const SuperAdminAgentProfile = lazy(() => import("../../features/super-admin/pages/SuperAdminAgentProfile"),);
export const SuperAdminProfile = lazy(() => import("../../features/super-admin/pages/SuperAdminProfile"),);
export const SuperAdminPoolBuying = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolBuying"),);
export const SuperAdminPoolCreate = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolCreate"),);
export const SuperAdminPoolBuyingAll = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolBuyingAll"),);
export const SuperAdminPoolDetails = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolDetails"),);
export const SuperAdminPoolInvestorDetails = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolInvestorDetails"),);
export const SuperAdminPoolPublished = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolPublished"));
export const SuperAdminPoolCreated = lazy(() => import("../../features/super-admin/pool/SuperAdminPoolCreated"));
export const SuperAdminLegalDocuments = lazy(() => import('../../features/super-admin/legal-docs/VerificationFlow'));
export const SuperAdminAgricultureReport = lazy(() => import('../../features/super-admin/legal-docs/AgricultureReportFlow'));
export const SuperAdminUploadLandDetails = lazy(() => import("../../features/super-admin/pages/upload-docs/SuperAdminUploadLandDetails"),);
export const SuperAdminUploadViewMaps = lazy(() => import("../../features/super-admin/pages/upload-docs/SuperAdminUploadViewMaps"),);
export const SuperAdminUploadCustomerInformation = lazy(() => import("../../features/super-admin/pages/upload-docs/SuperAdminUploadCustomerInformation"),);
export const LegalUploadDocument = lazy(() => import("../../features/super-admin/pages/upload-docs/LegalUploadDocument"),);

export const SuperAdminLandBoundaries = lazy(() => import('../../features/super-admin/legal-docs/LandBoundariesFlow'));
export const SuperAdminValuation = lazy(() => import('../../features/super-admin/legal-docs/ValuationFlow'));
export const SuperAdminLocalIntelligence = lazy(() => import('../../features/super-admin/legal-docs/LocalIntelligenceFlow'));
