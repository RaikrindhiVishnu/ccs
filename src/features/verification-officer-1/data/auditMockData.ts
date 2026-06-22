export interface OwnerDetails {
  avatar: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  religion: string;
  gender: string;
  googleLocation: string;
}

export interface FamilyMember {
  avatar: string;
  name: string;
  details: string;
}

export interface FamilyTree {
  owner: FamilyMember;
  father: FamilyMember;
  spouse: FamilyMember;
  mother: FamilyMember;
  daughter: FamilyMember;
}

export interface LandDetails {
  state: string;
  district: string;
  area: string;
  acquisitionCategory: string;
  image: string;
  agent: string;
  conversion: string;
  value: string;
  referralLocation: string;
  geoReference: string;
  grid: string;
  satelliteMapImage: string;
}

export interface UploadedFile {
  name: string;
  size: string;
}

export const OWNER_DETAILS: OwnerDetails = {
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  name: "Arjun Mehta",
  firstName: "Arjun",
  lastName: "Mehta",
  phone: "+91-9123456789",
  email: "arjunmehta@gmail.com",
  dob: "13/01/1984",
  religion: "Hindu",
  gender: "Male",
  googleLocation: "17.4835850,78.3805050",
};

export const FAMILY_TREE_NODES: FamilyTree = {
  owner: {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Arjun Mehta",
    details: "Male, 42 yrs",
  },
  father: {
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    name: "Vikram Mehta",
    details: "Male, 72 yrs",
  },
  spouse: {
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    name: "Priya Mehta",
    details: "Female, 40 yrs",
  },
  mother: {
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80",
    name: "Sushila Mehta",
    details: "Female, 68 yrs",
  },
  daughter: {
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    name: "Ananya Mehta",
    details: "Female, 12 yrs",
  },
};

export const LAND_DETAILS: LandDetails = {
  state: "Andhra Pradesh",
  district: "West Godavari",
  area: "Thanuku",
  acquisitionCategory: "Ancestral Property",
  image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80",
  agent: "Agent Vinod",
  conversion: "Acres",
  value: "1,00,000.00",
  referralLocation: "Another Location",
  geoReference: "N 38.2975° W 122.2869°",
  grid: "84T-QK • ELEV: 12m",
  satelliteMapImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&auto=format&fit=crop&q=80",
};

export const DEFAULT_LEGAL_CHECKS: Record<string, boolean> = {
  "Land Document": true,
  "Pattadhar Passbook": true,
  "Link Document": true,
  "Kasara Pahani & Proceeding Copies": true,
  "Revenue Record": true,
  "Lease Agreement": true,
  "Death Certificate": true,
  "Partition Deed": true,
  "Encumbrance Certificate": true,
  "Land Coordinates": true,
  "Owner KYC Video": true,
};

export const UPLOADED_FILES: UploadedFile[] = [
  { name: "File_name.pdf", size: "6MB" },
  { name: "File_name_1.pdf", size: "8MB" },
];
