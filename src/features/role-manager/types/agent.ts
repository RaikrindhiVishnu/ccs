// ─── Form Types ──────────────────────────────────────────────────────────────

export interface AgentFormData {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  district: string;
  mandal: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  bankBranch: string;
  panNumber: string;
  aadharFile?: File | null;
  aadharBackFile?: File | null;
  panFile?: File | null;
  aadharFileName?: string;
  aadharBackFileName?: string;
  panFileName?: string;
  profileImage?: string;
}

export interface AgentFormProps {
  /** true  → Edit mode  (pre-fills data, shows "Update Profile") */
  isEdit?: boolean;
  /** Pass existing agent data when in edit mode */
  initialData?: Partial<AgentFormData>;
  /** Called with form payload on save — wire this to your RTK mutation */
  onSave?: (data: AgentFormData) => void | Promise<void>;
  /** Called when Cancel is clicked */
  onCancel?: () => void;
  /** Loading state (e.g. RTK mutation isLoading) */
  isLoading?: boolean;
  /** Role type (AG, FO, RO, etc.) */
  roleType?: string;
  isViewMode?: boolean;
  from?: string;
}

// ─── API Types ───────────────────────────────────────────────────────────────

export interface CreateAgentRequest {
  firstName: string;
  lastName: string;
  countryCode: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;
  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };
  geo_assignments: {
    country_id: number;
    state_id: number;
    district_id: number;
    mandal_id: number;
    region_id: number;
    areas_id: number;
  };
  id_proof: {
    bank_account_name: string;
    bank_account_number: string;
    ifsc_code: string;
    branch: string;
    bank_name: string;
    id_proof_frontUrl: string;
    id_proof_backUrl: string;
    pan_card_number: string;
    pan_card_url: string;
  };

}

export interface AgentOnboardingVelocityRequest {
  startDate: string;
  endDate: string;
  offset: string;
}

export interface AgentOnboardingVelocityItem {
  onboardingDate: string;
  totalAgents: number;
}

export interface AgentOnboardingVelocityResponse {
  success: boolean;
  data: AgentOnboardingVelocityItem[];
}

export interface RegionCreationVelocityItem {
  creationDate: string;
  totalRegions: number;
}

export interface RegionCreationVelocityResponse {
  success: boolean;
  data: RegionCreationVelocityItem[];
}
export interface RoleCreationOverviewItem {
  assignmentDate: string;
  totalRO: number;
  totalIO: number;
  totalFO: number;
  totalAgents: number;
}

export interface RoleCreationOverviewResponse {
  success: boolean;
  data: RoleCreationOverviewItem[];
}

export interface CreateRegionalOfficerRequest {
  firstName: string;
  lastName: string;
  countryCode: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;

  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };

  geo_assignments: {
    country_id: number;
    state_id: number;
    region_id: number;
  };

  id_proof: {
    id_proof_frontUrl: string;
    id_proof_backUrl: string;
    pan_card_number: string;
    pan_card_url: string;
  };
}

export interface UpdateAgentRequest {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;
  isVerified?: number;
  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };
  geo_assignments: {
    country_id?: number;
    state_id?: number;
    district_id?: number;
    mandal_id?: number;
    region_id?: number;
    areas_id?: number;
  };
  id_proof?: any;
}

export interface UpdateFieldOfficerRequest {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;
  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };
  geo_assignments: {
    state_id: number;
    region_id: number;
  };
}

export interface UpdateRegionalOfficerRequest {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;

  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };

  geo_assignments: {
    state_id: number;
    region_id: number;
  };
}
export interface CreateFieldOfficerRequest {
  firstName: string;
  lastName: string;
  countryCode: string;
  emailAddress: string;
  phoneNumber: string;
  dob: string;
  role_id: number;

  address: {
    address: string;
    state_id: number;
    city: string;
    pincode: string;
  };

  geo_assignments: {
    country_id: number;
    state_id: number;
    region_id: number;
    areas_id: number;
  };

  id_proof: {
    id_proof_frontUrl: string;
    id_proof_backUrl: string;
    pan_card_number: string;
    pan_card_url: string;
  };
}

export interface GetAgentsRequest {
  is_verified: number;
}

export interface AgentResponse {
  id: number;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  location?: string;
  city?: string;
  address?: string;
  pincode?: string;
  avatar?: string;
  profile_image?: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  id_proof_front_url?: string;
  pan_card_url?: string;
}

export interface GetAgentsApiResponse {
  data: AgentResponse[];
}

export interface GetAgentByIdResponse {
  data: AgentResponse;
}