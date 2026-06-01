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
}
