export interface CompletedFarmland {
  id: string;
  location: string;
  agentName: string;
  agentAvatar: string;
  area: string;
  amount: string;
  verifiedTime: string;
  ownerName: string;
  ownerId: string;
  ownerAvatar: string;
  image: string;
}

export interface EstateDetail {
  estateName: string;
  location: string;
  valuation: string;
  agentName: string;
  agentAvatar: string;
  area: string;
  lastUpdated: string;
}

export const COMPLETED_DATA: CompletedFarmland[] = [
  {
    id: "GLC SOS 01",
    location: "Godavari District, AP",
    agentName: "Prakash Rao",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    area: "250 Acres",
    amount: "₹ 65.0 Lakhs",
    verifiedTime: "Verified: Today, 11:30 AM",
    ownerName: "Prakash Rao",
    ownerId: "GL-PR-092",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 02",
    location: "Kurnool, AP",
    agentName: "Ram Varma",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    area: "100 Ac",
    amount: "₹ 25L",
    verifiedTime: "Verified: 6th Oct, 10:30 AM",
    ownerName: "Ram Varma",
    ownerId: "GL-RV-110",
    ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 03",
    location: "Anantapur, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 04",
    location: "Chittoor, AP",
    agentName: "Kiran Kumar",
    agentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    area: "85 Ac",
    amount: "₹ 18L",
    verifiedTime: "Verified: 4th Oct, 09:45 AM",
    ownerName: "Kiran Kumar",
    ownerId: "GL-KK-391",
    ownerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 05",
    location: "Guntur, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 06",
    location: "Nellore, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 07",
    location: "Kadapah, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  }
];

export const DETAILS_MAPPING: Record<string, EstateDetail> = {
  "GLC SOS 01": {
    estateName: "Godavari Greenfield Estate",
    location: "Godavari District, AP",
    valuation: "65.0 Lakhs",
    agentName: "Prakash Rao",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    area: "250 AC",
    lastUpdated: "Today, 11:30 AM",
  },
  "GLC SOS 02": {
    estateName: "Girish Valley Estate",
    location: "West Godvari, AP",
    valuation: "25 Lakhs",
    agentName: "Ram Varma",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    area: "100 AC",
    lastUpdated: "6th Oct, 10:30 AM",
  },
  "GLC SOS 03": {
    estateName: "Anantapur Serene Farms",
    location: "Anantapur, AP",
    valuation: "32 Lakhs",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 AC",
    lastUpdated: "5th Oct, 14:15 PM",
  },
  "GLC SOS 04": {
    estateName: "Chittoor High-Yield Fields",
    location: "Chittoor, AP",
    valuation: "18 Lakhs",
    agentName: "Kiran Kumar",
    agentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    area: "85 AC",
    lastUpdated: "4th Oct, 09:45 AM",
  },
  "GLC SOS 05": {
    estateName: "Guntur Cotton Estates",
    location: "Guntur, AP",
    valuation: "32 Lakhs",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 AC",
    lastUpdated: "5th Oct, 14:15 PM",
  },
  "GLC SOS 06": {
    estateName: "Nellore Paddy Fields",
    location: "Nellore, AP",
    valuation: "32 Lakhs",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 AC",
    lastUpdated: "5th Oct, 14:15 PM",
  },
  "GLC SOS 07": {
    estateName: "Kadapah Redsoil Lands",
    location: "Kadapah, AP",
    valuation: "32 Lakhs",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 AC",
    lastUpdated: "5th Oct, 14:15 PM",
  },
};
