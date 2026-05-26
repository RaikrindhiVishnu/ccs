import { lazy } from "react";

export const CcsDashboard = lazy(
  () => import("../../features/ccs/pages/CcsDashboard"),
);
export const RoleManagerDetails = lazy(
  () => import("../../features/role-manager/pages/RoleManagerDetails"),
);
export const AgentApprovals = lazy(
  () => import("../../features/role-manager/pages/Agentapprovals"),
);
export const Agentdetailpage = lazy(
  () => import("../../features/role-manager/pages/Agentdetailpage"),
);
export const FarmlandRequest = lazy(
  () => import("../../features/ccs/pages/Farmlandrequest"),
);
export const FarmlandList = lazy(
  () => import("../../features/ccs/pages/Farmlandlist"),
);
export const RoleManagerDashboard = lazy(
  () => import("../../features/role-manager/pages/RoleManagerDashboard"),
);
export const UserDirectory = lazy(
  () => import("../../features/role-manager/pages/UserDirectory"),
);
export const DesignSystem = lazy(
  () => import("../../features/design-system/pages/DesignSystem"),
);
export const Login = lazy(() => import("../../pages/Login"));
export const Home = lazy(() => import("../../pages/Home"));
export const AgentCreate = lazy(
  () => import("../../features/role-manager/pages/AgentCreate"),
);
export const AgentEdit = lazy(
  () => import("../../features/role-manager/pages/AgentEdit"),
);
export const RegionAndArea = lazy(
  () => import("../../features/role-manager/pages/RegionAndArea"),
);
export const RegionSelection = lazy(
  () => import("../../features/role-manager/pages/RegionSelection"),
);
export const ActiveVerifications = lazy(
  () => import("../../features/ccs/pages/Activeverifications"),
);
export const GeospatialAudit = lazy(
  () => import("../../features/ccs/pages/Geospatialauditscreen"),
);
export const SendPaymentLink = lazy(
  () => import("../../features/ccs/pages/payment"),
);
export const ProcessingFeeScreen = lazy(
  () => import("../../features/ccs/pages/ProcessingFeeScreen"),
);

// Intelligence Officer (from upstream)
export const IODashboard = lazy(
  () => import("../../features/io/pages/Dashboard"),
);

// Regional Officer
export const RegionalOfficerDashboard = lazy(
  () => import("../../features/regional-officer/pages/RegionalOfficerDashboard"),
);
export const AssignedFarmlands = lazy(
  () => import("../../features/regional-officer/pages/AssignedFarmlands"),
);
export const RequestedInfo = lazy(
  () => import("../../features/regional-officer/pages/RequestedInfo"),
);
export const RequestedInfoDetails = lazy(
  () => import("../../features/regional-officer/pages/RequestedInfoDetails"),
);
export const RequestedInfoReason = lazy(
  () => import("../../features/regional-officer/pages/RequestedInfoReason"),
);
export const Drafts = lazy(
  () => import("../../features/regional-officer/pages/Drafts"),
);
export const FarmlandsList = lazy(
  () => import("../../features/regional-officer/pages/FarmlandsList"),
);
export const FarmlandDetails = lazy(
  () => import("../../features/regional-officer/pages/FarmlandDetails"),
);
export const LandDocument = lazy(
  () => import("../../features/regional-officer/pages/LandDocument"),
);
export const FamilyTree = lazy(
  () => import("../../features/regional-officer/pages/FamilyTree"),
);
export const LandDetails = lazy(
  () => import("../../features/regional-officer/pages/LandDetails"),
);
export const CustomerLandDetails = lazy(
  () => import("../../features/regional-officer/pages/CustomerLandDetails"),
);
export const SubmitForm = lazy(
  () => import("../../features/regional-officer/pages/SubmitForm"),
);
export const LandBoundaries = lazy(
  () => import("../../features/regional-officer/pages/LandBoundaries"),
);
export const RegionalOfficerLayout = lazy(
  () => import("../../components/common/layouts/Regionalofficerlayout"),
);

// Field Officer
export const FieldOfficerDashboard = lazy(
  () => import("../../features/field-officer/pages/FieldOfficerDashboard"),
);

// Verification Officer
export const VerificationOfficerDashboard = lazy(
  () => import("../../features/verification-officer/pages/VerificationOfficerDashboard"),
);
export const VerificationOfficerAssignedFarmlands = lazy(
  () => import("../../features/verification-officer/pages/AssignedFarmlands"),
);
export const VerificationOfficerInProgressFarmlands = lazy(
  () => import("../../features/verification-officer/pages/InProgressFarmlands"),
);
export const VerificationOfficerCompletedFarmlands = lazy(
  () => import("../../features/verification-officer/pages/CompletedFarmlands"),
);
export const VerificationOfficerCompletedFarmlandDetails = lazy(
  () => import("../../features/verification-officer/pages/CompletedFarmlandDetails"),
);
export const VerificationOfficerAssignedFarmlandsOwnerDetails = lazy(
  () => import("../../features/verification-officer/pages/AssignedFarmlandsOwnerDetails"),
);
export const VerificationOfficerLayout = lazy(
  () => import("../../components/common/layouts/verificationofficer"),
);

// Dev Imports
export const Assignedfarmland = lazy(
  () => import("../../features/io/pages/Assignedfarmland"),
);
export const AssignedFarmlandList = lazy(
  () => import("../../features/io/components/AssignedFarmlandList"),
);
export const Farmlanddocument = lazy(
  () => import("../../features/io/components/Farmlanddocument"),
);
export const CreateFieldOfficer = lazy(
  () => import("../../features/role-manager/pages/Createfieldofficer"),
);
export const CreateintellegenceOfficer = lazy(
  () => import("../../features/role-manager/pages/Createintelligenceofficer"),
);
export const CreateregionalOfficer = lazy(
  () => import("../../features/role-manager/pages/Createregionalofficer"),
);
export const EditFieldOfficer = lazy(
  () => import("../../features/role-manager/pages/Createfieldofficer"),
);
export const EditIntelligenceOfficer = lazy(
  () => import("../../features/role-manager/pages/Createintelligenceofficer"),
);
export const EditRegionalOfficer = lazy(
  () => import("../../features/role-manager/pages/Createregionalofficer"),
);
