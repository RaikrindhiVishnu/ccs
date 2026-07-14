export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedSuccessResponse<T> extends SuccessResponse<T> {
  meta: PaginationMeta;
}

// Example Schemas for CCS endpoints (placeholders based on endpoint names)

export interface MasterDataItem {
  id: number;
  code: string;
  description: string;
  [key: string]: any;
}

export interface MasterData {
  userRolesResult?: MasterDataItem[];
  tagResult?: MasterDataItem[];
  clientInterestsResult?: MasterDataItem[];
  facilitiesResult?: MasterDataItem[];
  milestoneStageStatusResult?: MasterDataItem[];
  leadStatusResult?: MasterDataItem[];
  milestoneStagesResult?: MasterDataItem[];
  notificationTypesResult?: MasterDataItem[];
  payoutStatusResult?: MasterDataItem[];
  farmlandStatusResult?: MasterDataItem[];
  userRegistrationStatusResult?: MasterDataItem[];
  [key: string]: any;
}

export interface GeoMasterData {
  countrys?: (string | number)[][];
  states?: (string | number)[][];
  districts?: (string | number)[][];
  mandals?: (string | number)[][];
  [key: string]: any;
}

export interface DashboardFarmlandDetails {
  total_farmlands: number;
  approved_farmlands: number;
  pending_farmlands: number;
}

export interface PipelineStatus {
  screeningPercentage: number;
  totalTimeTakenMinutes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_url?: string;
  [key: string]: any;
}

export interface ScreeningOutcome {
  "Approved farmlands": number;
  "rejected farmlands": number;
}

export interface RecentActivity {
  farmland_id: string;
  status: string;
}

export interface RecentActivityResponse {
  data: RecentActivity[];
}

export interface Farmland {
  farmland_id: number;
  farmland_code: string;
  farmland_priority: number;
  agent_name: string;
  created_on: string;
  status: string;
  total_acres: number;
  price_per_acre: number;
  total_asset_price: string;
  [key: string]: any;
}

export interface PaginatedFarmlandResponse {
  farmlands: Farmland[];
}

export interface ApproveFarmlandRequest {
  farmland_id: number;
  mile_stone_status_id: number;
  mile_store_stage_id: number;
}
