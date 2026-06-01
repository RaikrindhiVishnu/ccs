export interface FarmlandDocument {
  id: string;
  name: string;
  status: "verified" | "pending" | "rejected";
  url: string;
  uploadedAt: string;
}

export interface FarmlandDetail {
  id: string; // e.g. "GLC SOS 01"
  code: string; // e.g. "#FL-8402"
  agentName: string;
  agentAvatar?: string;
  status: "Approved" | "Pending" | "In Review" | "Completed" | "Returned to RO" | "Escalated to IO";
  badge: "HIGH VALUE" | "LARGE ACREAGE" | "URGENT" | "STANDARD";
  location: string;
  totalArea: string;
  amount: string;
  costPerAcre: string;
  submissionDate: string;
  ownerName: string;
  ownerPhone: string;
  ownerAadhaar: string;
  ownerPan: string;
  documents: FarmlandDocument[];
  boundaryCoordinates: { lat: number; lng: number }[];
  comments: { author: string; role: string; text: string; date: string }[];
  soilType?: string;
  waterSource?: string;
  riskScore?: "Low" | "Medium" | "High";
}

export const MOCK_FARMLANDS: FarmlandDetail[] = [
  {
    id: "GLC SOS 01",
    code: "#FL-8402",
    agentName: "Kishore Moore",
    status: "Approved",
    badge: "HIGH VALUE",
    location: "Kurnool, AP",
    totalArea: "450 acres",
    amount: "₹2.4 Cr",
    costPerAcre: "₹5.3k",
    submissionDate: "01 Jun 2026",
    ownerName: "Kishore Moore",
    ownerPhone: "+91 98765 43210",
    ownerAadhaar: "4321 8765 0987",
    ownerPan: "ABCDE1234F",
    documents: [
      { id: "doc-1", name: "Land Title Deed.pdf", status: "verified", url: "#", uploadedAt: "30 May 2026" },
      { id: "doc-2", name: "Agricultural Valuation Report.pdf", status: "verified", url: "#", uploadedAt: "30 May 2026" },
      { id: "doc-3", name: "Encumbrance Certificate (EC).pdf", status: "verified", url: "#", uploadedAt: "31 May 2026" }
    ],
    boundaryCoordinates: [
      { lat: 15.8281, lng: 78.0373 },
      { lat: 15.8305, lng: 78.0395 },
      { lat: 15.8320, lng: 78.0350 },
      { lat: 15.8290, lng: 78.0330 }
    ],
    comments: [
      { author: "Kishore Moore", role: "Field Agent", text: "Soil quality checked, found high yield potential. Valuation verified.", date: "31 May 2026" }
    ],
    soilType: "Alluvial",
    waterSource: "Canal",
    riskScore: "Low"
  },
  {
    id: "GLC SOS 02",
    code: "#FL-8411",
    agentName: "Ram Varma",
    status: "Pending",
    badge: "LARGE ACREAGE",
    location: "Anantapur, AP",
    totalArea: "1,200 acres",
    amount: "₹4.8 Cr",
    costPerAcre: "₹4.0k",
    submissionDate: "28 May 2026",
    ownerName: "Ram Varma",
    ownerPhone: "+91 91234 56789",
    ownerAadhaar: "8765 4321 9876",
    ownerPan: "XYZWR9876Q",
    documents: [
      { id: "doc-4", name: "Title Deed Document.pdf", status: "verified", url: "#", uploadedAt: "27 May 2026" },
      { id: "doc-5", name: "Mandal Boundary Map.pdf", status: "pending", url: "#", uploadedAt: "27 May 2026" }
    ],
    boundaryCoordinates: [
      { lat: 14.6819, lng: 77.6006 },
      { lat: 14.6850, lng: 77.6050 },
      { lat: 14.6900, lng: 77.6010 },
      { lat: 14.6830, lng: 77.5980 }
    ],
    comments: [
      { author: "Edward Janowski", role: "Regional Officer", text: "Pending Mandal verification documents from the local survey office.", date: "29 May 2026" }
    ],
    soilType: "Alluvial",
    waterSource: "Canal",
    riskScore: "Low"
  },
  {
    id: "GLC SOS 03",
    code: "#FL-8415",
    agentName: "Arjun Vardhan",
    status: "In Review",
    badge: "URGENT",
    location: "Chittoor, AP",
    totalArea: "210 acres",
    amount: "₹8.5 Cr",
    costPerAcre: "₹4.0k",
    submissionDate: "29 May 2026",
    ownerName: "Arjun Vardhan",
    ownerPhone: "+91 88888 77777",
    ownerAadhaar: "1111 2222 3333",
    ownerPan: "PQRTS5678M",
    documents: [
      { id: "doc-6", name: "Pattadar Passbook.pdf", status: "verified", url: "#", uploadedAt: "28 May 2026" },
      { id: "doc-7", name: "Valuation Statement.pdf", status: "verified", url: "#", uploadedAt: "28 May 2026" },
      { id: "doc-8", name: "No Objection Certificate.pdf", status: "rejected", url: "#", uploadedAt: "29 May 2026" }
    ],
    boundaryCoordinates: [
      { lat: 13.2172, lng: 79.1003 },
      { lat: 13.2200, lng: 79.1050 },
      { lat: 13.2220, lng: 79.1010 },
      { lat: 13.2185, lng: 79.0980 }
    ],
    comments: [
      { author: "Arjun Vardhan", role: "Field Agent", text: "NOC document needs a fresh signature from Mandal Revenue Officer.", date: "29 May 2026" }
    ],
    soilType: "Alluvial",
    waterSource: "Canal",
    riskScore: "Low"
  },
  {
    id: "GLC SOS 04",
    code: "#FL-8416",
    agentName: "Raju Oberoi",
    status: "In Review",
    badge: "URGENT",
    location: "Guntur, AP",
    totalArea: "210 acres",
    amount: "₹5.5 Cr",
    costPerAcre: "₹4.0k",
    submissionDate: "30 May 2026",
    ownerName: "Raju Oberoi",
    ownerPhone: "+91 77777 66666",
    ownerAadhaar: "4444 5555 6666",
    ownerPan: "LMNOP9012K",
    documents: [
      { id: "doc-9", name: "Adangal Land Record.pdf", status: "verified", url: "#", uploadedAt: "29 May 2026" },
      { id: "doc-10", name: "FMB Sketch.pdf", status: "pending", url: "#", uploadedAt: "30 May 2026" }
    ],
    boundaryCoordinates: [
      { lat: 16.3067, lng: 80.4365 },
      { lat: 16.3100, lng: 80.4400 },
      { lat: 16.3120, lng: 80.4350 },
      { lat: 16.3080, lng: 80.4320 }
    ],
    comments: [
      { author: "Raju Oberoi", role: "Field Agent", text: "FMB sketch uploaded. Verification is underway.", date: "30 May 2026" }
    ],
    soilType: "Alluvial",
    waterSource: "Canal",
    riskScore: "Low"
  },
  {
    id: "GLC SOS 05",
    code: "#FL-8420",
    agentName: "Kishore Moore",
    status: "Completed",
    badge: "STANDARD",
    location: "Nellore, AP",
    totalArea: "150 acres",
    amount: "₹1.2 Cr",
    costPerAcre: "₹8.0k",
    submissionDate: "15 May 2026",
    ownerName: "Subba Reddy",
    ownerPhone: "+91 99999 88888",
    ownerAadhaar: "5555 6666 7777",
    ownerPan: "TUVWX3456Z",
    documents: [
      { id: "doc-11", name: "Title Deed Nellore.pdf", status: "verified", url: "#", uploadedAt: "14 May 2026" }
    ],
    boundaryCoordinates: [
      { lat: 14.4426, lng: 79.9864 },
      { lat: 14.4450, lng: 79.9900 },
      { lat: 14.4470, lng: 79.9850 }
    ],
    comments: [
      { author: "Edward Janowski", role: "Regional Officer", text: "Approved at Level 1 and Level 2. Ready to close.", date: "16 May 2026" }
    ],
    soilType: "Alluvial",
    waterSource: "Canal",
    riskScore: "Low"
  }
];

export type Farmland = FarmlandDetail;

