// ─── Super Admin Dashboard Types ──────────────────────────────────────────────

export interface VisitorStats {
  nriPercentage: number;
  localPercentage: number;
  vsLastWeekLabel: string;
}

export interface TotalSales {
  amount: number;
  changePercent: number;
  sparklineData: number[];
}

export interface FarmlandStats {
  totalFarmlands: number;
  activePools: number;
}

export interface StatusCardItem {
  label: string;
  value: number;
  type: 'approved' | 'rejected' | 'in-progress';
}

export interface SalesReportDataPoint {
  day: string;
  target: number;
  actual: number;
  escrow: number;
  projected: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  amount: string;
  avatar: string;
  isTopPerformer?: boolean;
}

export interface SubscriberSegment {
  label: string;
  value: number;
  color: string;
}

export interface SubscriberGrowthData {
  segments: SubscriberSegment[];
  unitsTotal: number;
}

import { SuperAdminFarmlandData } from "../components/SuperAdminFarmlandCard";
import { FarmlandListCardData } from "../components/SuperAdminFarmlandsListCard";
import { SuperAdminUserCardData } from "../components/SuperAdminUserListCard";

export interface AssignedFarmlandDetailsData {
  id: string;
  status: {
    systemStatus: string;
    liveStatus: string;
  };
  assetDetails: {
    location: string;
    agentName: string;
    agentAvatar: string;
    creationTime: string;
    lastUpdated: string;
  };
  heroData: {
    title: string;
    location: string;
    badge: string;
    image: string;
  };
}

export interface CustomerInformationData {
  farmlandId: string;
  ownerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    religion: string;
    gender: string;
    locationLink: string;
    mapImage: string;
  };
  familyTree: {
    owner: { name: string; info: string; avatar: string };
    father: { name: string; info: string; avatar: string };
    spouse: { name: string; info: string; avatar: string };
    mother: { name: string; info: string; avatar: string };
    daughter: { name: string; info: string; avatar: string };
  };
  landDetails: {
    state: string;
    district: string;
    area: string;
    acquisitionCategory: string;
    agent: string;
    landConversion: string;
    valueForArea: string;
    agentReferralLocation: string;
    geoReference: {
      coordinates: string;
      gridElev: string;
    };
    largeAerialImage: string;
    smallMapImage: string;
  };
}

export interface DashboardData {
  visitors: VisitorStats;
  totalSales: TotalSales;
  farmlandStats: FarmlandStats;
  statusCards: StatusCardItem[];
  salesReport: SalesReportDataPoint[];
  topPerformers: TopPerformer[];
  subscriberGrowth: SubscriberGrowthData;
  assignedFarmlands: SuperAdminFarmlandData[];
  farmlandsList: FarmlandListCardData[];
  usersList: SuperAdminUserCardData[];
  assignedFarmlandDetails: AssignedFarmlandDetailsData;
  customerInformation: CustomerInformationData;
}
