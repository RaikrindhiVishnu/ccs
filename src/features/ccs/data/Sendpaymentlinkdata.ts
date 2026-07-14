export type PaymentLinkOwner = {
  name: string;
  subtitle: string;
  avatar: string;
  role: string;
  phone: string;
  email: string;
  coordinates: string;
  verified: boolean;
};

export type FarmlandOption = {
  id: string;
  label: string;
};

export const PAYMENT_LINK_OWNER_DATA: Record<string, PaymentLinkOwner> = {
  "GLC SOS 01 | 100 Acres": {
    name: "Ramudu Kumar",
    subtitle: "GLC Institutional Partner",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "Direct Owner",
    phone: "+91-9123456789",
    email: "ramudu.k@example.com",
    coordinates: "West Godavari, Tanuku",
    verified: true,
  },
  "GLC SOS 02 | 45 Acres": {
    name: "Priyaanshu S.",
    subtitle: "GLC Partner",
    avatar: "https://i.pravatar.cc/150?img=47",
    role: "Co-Owner",
    phone: "+91-9876543210",
    email: "priyaanshu@example.com",
    coordinates: "16.50, 80.62",
    verified: true,
  },
  "GLC SOS 03 | 60 Acres": {
    name: "Arjun Wadhwa",
    subtitle: "GLC Institutional Partner",
    avatar: "https://i.pravatar.cc/150?img=53",
    role: "Direct Owner",
    phone: "+91-9000011111",
    email: "arjun@example.com",
    coordinates: "16.31, 80.43",
    verified: false,
  },
};

export const PAYMENT_LINK_FARMLAND_OPTIONS: FarmlandOption[] = Object.keys(
  PAYMENT_LINK_OWNER_DATA,
).map((key) => ({
  id: key,
  label: key,
}));