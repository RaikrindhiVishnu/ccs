export interface AgentData {
  name: string;
  role: string;
  faceIdx: number;
  pendingReview: number;
  rejectedDeals: number;
  completedDeals: number;
  performanceIndex: number;
  growth: string;
  closeRatio: number;
  avgResponse: string;
  quarterPerf: string;
}

export const AGENTS_DETAILS_DATA: Record<string, AgentData> = {
  harman: {
    name: "Harman Rao",
    role: "Agent",
    faceIdx: 3,
    pendingReview: 14,
    rejectedDeals: 5,
    completedDeals: 98,
    performanceIndex: 4.1,
    growth: "+8%",
    closeRatio: 72,
    avgResponse: "2.1h",
    quarterPerf: "Stable",
  },
  brij: {
    name: "Brij Mohan",
    role: "Agent",
    faceIdx: 4,
    pendingReview: 18,
    rejectedDeals: 8,
    completedDeals: 85,
    performanceIndex: 4.0,
    growth: "+10%",
    closeRatio: 68,
    avgResponse: "2.4h",
    quarterPerf: "Stable",
  },
  ramesh: {
    name: "Ramesh Oberoi",
    role: "Agent",
    faceIdx: 0,
    pendingReview: 22,
    rejectedDeals: 11,
    completedDeals: 112,
    performanceIndex: 4.2,
    growth: "+11%",
    closeRatio: 75,
    avgResponse: "2.0h",
    quarterPerf: "Stable",
  },
  lakshaman: {
    name: "Lakshaman G.",
    role: "Agent",
    faceIdx: 1,
    pendingReview: 19,
    rejectedDeals: 6,
    completedDeals: 92,
    performanceIndex: 3.9,
    growth: "+7%",
    closeRatio: 70,
    avgResponse: "2.3h",
    quarterPerf: "Stable",
  },
  rakesh: {
    name: "Rakesh Walia",
    role: "Agent",
    faceIdx: 2,
    pendingReview: 25,
    rejectedDeals: 9,
    completedDeals: 104,
    performanceIndex: 4.1,
    growth: "+9%",
    closeRatio: 73,
    avgResponse: "2.1h",
    quarterPerf: "Stable",
  },
  ram: {
    name: "Ram Varma",
    role: "Agent",
    faceIdx: 3,
    pendingReview: 12,
    rejectedDeals: 4,
    completedDeals: 78,
    performanceIndex: 3.8,
    growth: "+6%",
    closeRatio: 65,
    avgResponse: "2.6h",
    quarterPerf: "Stable",
  },
  kishan: {
    name: "Kishan S.",
    role: "Agent",
    faceIdx: 4,
    pendingReview: 15,
    rejectedDeals: 7,
    completedDeals: 82,
    performanceIndex: 3.9,
    growth: "+8%",
    closeRatio: 67,
    avgResponse: "2.5h",
    quarterPerf: "Stable",
  },
};

export const DEFAULT_AGENT_DATA: AgentData = {
  name: "Kishore Moore",
  role: "Agent",
  faceIdx: 2,
  pendingReview: 38,
  rejectedDeals: 12,
  completedDeals: 142,
  performanceIndex: 4.3,
  growth: "+12%",
  closeRatio: 78,
  avgResponse: "1.8h",
  quarterPerf: "Stable",
};

export const FARMLAND_REPORT_DATA = [
  {
    id: "Green Land Capital SOS 01",
    date: "Oct 24, 2024",
    position: "Website",
    value: "₹41.2M",
    status: "Cleared",
  },
  {
    id: "Green Land Capital SOS 02",
    date: "Oct 22, 2024",
    position: "Regional Officer",
    value: "₹120.5M",
    status: "Rejected",
  },
  {
    id: "Green Land Capital SOS 03",
    date: "Oct 18, 2024",
    position: "CCS Officer",
    value: "₹29.1M",
    status: "Cleared",
  },
  {
    id: "Green Land Capital SOS 03",
    date: "Oct 24, 2024",
    position: "Field Officer",
    value: "₹40.2M",
    status: "Cleared",
  },
  {
    id: "Green Land Capital SOS 04",
    date: "Oct 22, 2024",
    position: "Intelligence Officer",
    value: "₹19.5M",
    status: "Processing",
  },
  {
    id: "Green Land Capital SOS 05",
    date: "Oct 18, 2024",
    position: "Website",
    value: "₹33.1M",
    status: "Cleared",
  },
];

export const SALES_REPORT_DATA = [
  {
    id: "Green Land Capital SOS 01",
    date: "Oct 24, 2024",
    position: "Website",
    value: "₹41.2M",
    status: "Cleared",
  },
  {
    id: "Green Land Capital SOS 02",
    date: "Oct 22, 2024",
    position: "Regional Officer",
    value: "₹120.5M",
    status: "Processing",
  },
  {
    id: "Green Land Capital SOS 03",
    date: "Oct 18, 2024",
    position: "CCS Officer",
    value: "₹29.1M",
    status: "Cleared",
  },
  {
    id: "Green Land Capital SOS 03",
    date: "Oct 24, 2024",
    position: "Field Officer",
    value: "₹40.2M",
    status: "Processing",
  },
  {
    id: "Green Land Capital SOS 04",
    date: "Oct 22, 2024",
    position: "Intelligence Officer",
    value: "₹19.5M",
    status: "Processing",
  },
  {
    id: "Green Land Capital SOS 05",
    date: "Oct 18, 2024",
    position: "Website",
    value: "₹33.1M",
    status: "Cleared",
  },
];
