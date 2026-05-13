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
    region: string;
    area: string;
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
