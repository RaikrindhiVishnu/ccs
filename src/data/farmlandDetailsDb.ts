export interface OwnerDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dob: string;
  religion: string;
  gender: string;
  locationCoords: string;
  mapImageUrl: string;
  avatarUrl: string;
}

export interface FamilyTreeNode {
  name: string;
  info: string;
  avatar: string;
}

export interface FamilyTree {
  owner: FamilyTreeNode;
  father: FamilyTreeNode;
  spouse: FamilyTreeNode;
  mother: FamilyTreeNode;
  daughter: FamilyTreeNode;
}

export interface LandDetails {
  stateName: string;
  district: string;
  areaCityTown: string;
  acquisitionCategory: string;
  agentName: string;
  landConversion: string;
  valueForArea: string;
  agentReferralLocation: string;
  geoCoords: string;
  geoSubText: string;
  aerialImageUrl?: string;
  satelliteMapUrl?: string;
}

export interface FarmlandDetails {
  id: string;
  ownerDetails: OwnerDetails;
  familyTree: FamilyTree;
  landDetails: LandDetails;
}

export const farmlandDetailsDatabase: Record<string, FarmlandDetails> = {
  "GLCSOS 01": {
    id: "GLCSOS 01",
    ownerDetails: {
      firstName: "Ramudu",
      lastName: "Kumar",
      phoneNumber: "+91-9123456789",
      email: "ramudu@gmail.com",
      dob: "13/01/1986",
      religion: "Hindu",
      gender: "Male",
      locationCoords: "17.4835850, 78.3805050",
      mapImageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    },
    familyTree: {
      owner: { name: "Arjun Mehta", info: "Male, 42 yrs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      father: { name: "Vikram Mehta", info: "Male, 72 yrs", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      spouse: { name: "Priya Mehta", info: "Female, 40 yrs", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
      mother: { name: "Sushila Mehta", info: "Female, 68 yrs", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80" },
      daughter: { name: "Ananya Mehta", info: "Female, 12 yrs", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" }
    },
    landDetails: {
      stateName: "Andhra Pradesh",
      district: "West Godavari",
      areaCityTown: "Thanuku",
      acquisitionCategory: "Ancestral Property",
      agentName: "Agent Vinod",
      landConversion: "Acres",
      valueForArea: "1,00,000.00",
      agentReferralLocation: "Another Location",
      geoCoords: "N 38.2975°   W 122.2869°",
      geoSubText: "GRID: 84T-QK • ELEV: 12m",
      aerialImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      satelliteMapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
    }
  },
  "GLCSOS 02": {
    id: "GLCSOS 02",
    ownerDetails: {
      firstName: "Krishna",
      lastName: "Murthy",
      phoneNumber: "+91-9848022338",
      email: "krishna.murthy@yahoo.com",
      dob: "05/08/1979",
      religion: "Hindu",
      gender: "Male",
      locationCoords: "16.9890640, 82.2474650",
      mapImageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    familyTree: {
      owner: { name: "Krishna Murthy", info: "Male, 46 yrs", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      father: { name: "Satyanarayana", info: "Male, 75 yrs", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80" },
      spouse: { name: "Lakshmi", info: "Female, 42 yrs", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      mother: { name: "Parvathi", info: "Female, 70 yrs", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
      daughter: { name: "Sita", info: "Female, 15 yrs", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" }
    },
    landDetails: {
      stateName: "Andhra Pradesh",
      district: "East Godavari",
      areaCityTown: "Mandapeta",
      acquisitionCategory: "Purchased Land",
      agentName: "Agent Vinod",
      landConversion: "Acres",
      valueForArea: "85,000.00",
      agentReferralLocation: "Primary Location",
      geoCoords: "N 16.9890°   E 82.2474°",
      geoSubText: "GRID: 89R-TL • ELEV: 15m",
      aerialImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      satelliteMapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
    }
  },
  "GLCSOS 03": {
    id: "GLCSOS 03",
    ownerDetails: {
      firstName: "Suresh",
      lastName: "Reddy",
      phoneNumber: "+91-9988776655",
      email: "suresh.reddy@gmail.com",
      dob: "24/11/1988",
      religion: "Hindu",
      gender: "Male",
      locationCoords: "15.8281000, 78.0373000",
      mapImageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    familyTree: {
      owner: { name: "Suresh Reddy", info: "Male, 37 yrs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      father: { name: "Rami Reddy", info: "Male, 68 yrs", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
      spouse: { name: "Kalyani", info: "Female, 34 yrs", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
      mother: { name: "Radhamma", info: "Female, 62 yrs", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80" },
      daughter: { name: "Kavya", info: "Female, 8 yrs", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" }
    },
    landDetails: {
      stateName: "Andhra Pradesh",
      district: "Kurnool",
      areaCityTown: "Nandyal",
      acquisitionCategory: "Leasehold Property",
      agentName: "Agent Vinod",
      landConversion: "Acres",
      valueForArea: "1,20,000.00",
      agentReferralLocation: "Another Location",
      geoCoords: "N 15.8281°   E 78.0373°",
      geoSubText: "GRID: 76F-QD • ELEV: 24m",
      aerialImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      satelliteMapUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
    }
  }
};

export const getFarmlandDetails = (id: string): FarmlandDetails => {
  // Normalize key lookup to handle spaces, casing, or hyphens (e.g. GLCSOS-01 -> GLCSOS 01)
  const normalizedId = id.replace(/-/g, ' ').toUpperCase();
  return farmlandDetailsDatabase[normalizedId] || farmlandDetailsDatabase["GLCSOS 01"];
};
