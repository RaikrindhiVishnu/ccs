// ─── Mock Dashboard Data for Super Admin ──────────────────────────────────────

import type { DashboardData } from '../types/dashboard';

export const mockDashboardData: DashboardData = {
  visitors: {
    nriPercentage: 40,
    localPercentage: 60,
    vsLastWeekLabel: 'vs Last Week',
  },

  totalSales: {
    amount: 4360000,
    changePercent: 8.33,
    sparklineData: [20, 35, 25, 40, 30, 45, 38, 50, 42],
  },

  farmlandStats: {
    totalFarmlands: 14563,
    activePools: 20,
  },

  statusCards: [
    { label: 'Approved',    value: 1567, type: 'approved' },
    { label: 'Rejected',    value: 1222, type: 'rejected' },
    { label: 'In-Progress', value: 2427, type: 'in-progress' },
  ],

  salesReport: [
    { day: 'Mo', target: 10, actual: 8,  escrow: 5,  projected: 12 },
    { day: 'Tu', target: 15, actual: 12, escrow: 8,  projected: 18 },
    { day: 'We', target: 45, actual: 35, escrow: 20, projected: 40 },
    { day: 'Th', target: 20, actual: 18, escrow: 10, projected: 25 },
    { day: 'Fr', target: 25, actual: 22, escrow: 15, projected: 28 },
    { day: 'Sa', target: 18, actual: 15, escrow: 12, projected: 20 },
    { day: 'Su', target: 22, actual: 20, escrow: 14, projected: 24 },
  ],

  topPerformers: [
    {
      id: '1',
      name: 'Shaurya.K',
      amount: '₹3.1L',
      avatar: '/super-admin/performers/performer1.png',
    },
    {
      id: '2',
      name: 'Shankar.S',
      amount: '₹3.1L',
      avatar: '/super-admin/performers/performer2.png',
    },
    {
      id: '3',
      name: 'Arjun V.',
      amount: '₹4.2L',
      avatar: '/super-admin/performers/performer3.png',
      isTopPerformer: true,
    },
    {
      id: '4',
      name: 'Rahul.M',
      amount: '₹2.8L',
      avatar: '/super-admin/performers/performer4.png',
    },
    {
      id: '5',
      name: 'Ram.V',
      amount: '₹3.1L',
      avatar: '/super-admin/performers/performer5.png',
    },
  ],

  subscriberGrowth: {
    segments: [
      { label: 'Platinum', value: 561, color: '#3B3B3B' },
      { label: 'Gold',     value: 311, color: '#8B9A46' },
      { label: 'Silver',   value: 435, color: '#C5D654' },
    ],
    unitsTotal: 1247,
  },

  assignedFarmlands: [
    {
      id: "GLC-SOS-01",
      title: "GLC SOS 01",
      area: "120 acres",
      cost: "₹10,000",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60",
      badges: ["RED LATERITE", "ACTIVE YIELD"],
      agent: { name: "Ram Varma", avatar: "/super-admin/performers/performer5.png" }
    },
    {
      id: "GLC-SOS-02",
      title: "GLC SOS 02",
      area: "120 acres",
      cost: "₹10,000",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&auto=format&fit=crop&q=60",
      badges: [],
      agent: { name: "Ram Varma", avatar: "/super-admin/performers/performer5.png" }
    },
    {
      id: "GLC-SOS-03",
      title: "GLC SOS 03",
      area: "120 acres",
      cost: "₹10,000",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&auto=format&fit=crop&q=60",
      badges: ["PRISTINE WATER", "ORGANIC CERT"],
      agent: { name: "Ram Varma", avatar: "/super-admin/performers/performer5.png" }
    }
  ],

  farmlandsList: [
    {
      id: "GLC-SOS-L-01",
      title: "GLC SOS 01",
      acres: "10 Acres",
      soilType: "Red Laterite",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60",
      agent: { name: "Ram Varma", avatar: "/super-admin/performers/performer5.png" }
    },
    {
      id: "GLC-SOS-L-02",
      title: "GLC SOS 02",
      acres: "5 Acres",
      soilType: "Alluvial Gold",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&auto=format&fit=crop&q=60",
      agent: { name: "Ajesh Sharma", avatar: "/super-admin/performers/performer2.png" }
    },
    {
      id: "GLC-SOS-L-03",
      title: "GLC SOS 03",
      acres: "8 Acres",
      soilType: "Sandy Loam",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=500&auto=format&fit=crop&q=60",
      agent: { name: "Rajiv Kapoor", avatar: "/super-admin/performers/performer3.png" }
    },
    {
      id: "GLC-SOS-L-04",
      title: "GLC SOS 04",
      acres: "1.2 Acres",
      soilType: "Red Laterite",
      image: "https://images.unsplash.com/photo-1621508678036-7c08a91ec552?w=500&auto=format&fit=crop&q=60",
      agent: { name: "Vikram Gouda", avatar: "/super-admin/performers/performer1.png" }
    }
  ]
};
