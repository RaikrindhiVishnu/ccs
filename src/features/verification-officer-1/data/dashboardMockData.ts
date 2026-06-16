export interface DashboardStats {
  returnedToRO: number;
  escalatedToIO: number;
  waitingOnFieldTeam: number;
  readyToCertify: number;
}

export interface VolumeDataPoint {
  month: string;
  approved: number;
  target: number;
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  returnedToRO: 3,
  escalatedToIO: 2,
  waitingOnFieldTeam: 5,
  readyToCertify: 12,
};

export const MOCK_VOLUME_DATA: VolumeDataPoint[] = [
  { month: "Jan", approved: 200, target: 600 },
  { month: "Feb", approved: 200, target: 600 },
  { month: "Mar", approved: 320, target: 600 },
  { month: "Apr", approved: 430, target: 600 },
  { month: "May", approved: 280, target: 600 },
  { month: "Jun", approved: 200, target: 600 },
  { month: "Jul", approved: 200, target: 600 },
  { month: "Aug", approved: 430, target: 600 },
  { month: "Sep", approved: 320, target: 600 },
  { month: "Oct", approved: 200, target: 600 },
  { month: "Nov", approved: 430, target: 600 },
  { month: "Dec", approved: 320, target: 600 },
];

export const dashboardMockData = {
  dailyClearanceStatus: {
    percentage: 85,
    phases: [
      { id: "phase1", label: "20%", color: "bg-[#BDD327]", width: "20%" },
      { id: "phase2", label: "35%", color: "bg-[#2780C4]", width: "35%" },
      { id: "phase3", label: "41%", color: "bg-[#FF6812]", width: "41%" },
    ],
    stats: [
      { id: "active", count: 12, label: "Active", color: "bg-[#BDD327]" },
      { id: "cleared", count: 28, label: "Cleared", color: "bg-[#2780C4]" },
      { id: "pending", count: 15, label: "Pending", color: "bg-[#FF6812]" },
    ],
  },
  activeReview: {
    id: "GLCSOS-05",
    title: "Active Review: GLCSOS-05",
    subtitle: "Auditing Title, FMB Boundaries & RO Valuation",
    assignee: {
      name: "Arjun Wadhwa",
      role: "Regional Officer",
      id: "RO SOS 1",
      avatar: "/avatars/arjun.jpg",
    },
    progress: 75,
    buttonText: "Resume Verification",
  },
  weeklyAssetCertification: {
    totalCleared: 142,
    period: "last 7 days",
    selectedDayData: {
      day: "Tue",
      value: "14 Acres",
    },
    chartData: [
      { day: "Mon", height: "40%" },
      { day: "Tue", height: "30%" },
      { day: "Wed", height: "60%" },
      { day: "Thu", height: "35%" },
      { day: "Fri", height: "80%" },
      { day: "Sat", height: "55%" },
      { day: "Sun", height: "65%" },
    ],
  },
  immediateActionQueue: [
    {
      id: "GLCSOS-12",
      assetId: "Asset GLCSOS-12",
      taskDescription: "Task: Land Title & EC Verification | SLA: 2h remaining",
      assignee: {
        name: "Ram Varma",
        role: "Regional Officer",
        avatar: "/avatars/ram.jpg",
      },
      bgColor: "bg-[#F1F1F1]",
    },
    {
      id: "GLCSOS-08",
      assetId: "Asset GLCSOS-08",
      taskDescription: "Task: FMB & Survey Boundary Check | SLA: 4h remaining",
      assignee: {
        name: "Rakesh K.",
        role: "Regional Officer",
        avatar: "/avatars/rakesh.jpg",
      },
      bgColor: "bg-[#E5F6E6]",
    },
    {
      id: "GLCSOS-09",
      assetId: "Asset GLCSOS-09",
      taskDescription: "Task: Asset Valuation & Market Audit | SLA: 6h remaining",
      assignee: {
        name: "Janardhan S.",
        role: "Regional Officer",
        avatar: "/avatars/janardhan.jpg",
      },
      bgColor: "bg-[#F1F1F1]",
    },
  ],
  rejectionBreakdown: {
    items: [
      {
        id: "title-mismatch",
        reason: "Title/Ownership Mismatch",
        countText: "8 Cases sent back to RO",
      },
      {
        id: "fmb-error",
        reason: "FMB / Survey Dimension Error",
        countText: "5 Cases sent back to FO",
      },
      {
        id: "valuation-exceeds",
        reason: "Valuation Exceeds Guidelines",
        countText: "3 Cases sent to Intelligence",
      },
      {
        id: "missing-signatures",
        reason: "Missing RO Signatures/Stamps",
        countText: "3 Cases sent to Intelligence",
      },
    ],
  },
};
