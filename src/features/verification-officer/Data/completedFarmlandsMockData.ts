export interface CompletedFarmland {
  id: string;
  agentName: string;
  dateTime: string;
  location: string;
  totalAmount: string;
  areaAndCost: string;
}

export const completedFarmlandsData: CompletedFarmland[] = [
  {
    id: "GLCSOS 01",
    agentName: "Ram Varma",
    dateTime: "Oct 6, 2025 | 12:53PM",
    location: "West Godavari, Tanuku",
    totalAmount: "₹25 Lakhs",
    areaAndCost: "100 acres · ₹25,000 / acre"
  },
  {
    id: "GLCSOS 02",
    agentName: "Kishore Moore",
    dateTime: "Oct 5, 2025 | 1:03PM",
    location: "Madapeta, Kakinda",
    totalAmount: "₹1.2 Cr",
    areaAndCost: "45 acres · ₹53,000 / acre"
  },
  {
    id: "GLCSOS 03",
    agentName: "Loakhan Rai",
    dateTime: "Oct 5, 2025 | 11:20PM",
    location: "West Godavari, Tanuku",
    totalAmount: "₹80 Lakhs",
    areaAndCost: "22 acres · ₹53,000 / acre"
  },
  {
    id: "GLCSOS 04",
    agentName: "Suresh",
    dateTime: "Oct 5, 2025 | 10:53PM",
    location: "Kurnool, Kadapa",
    totalAmount: "₹45 Lakhs",
    areaAndCost: "44 acres · ₹23,000 / acre"
  },
  {
    id: "GLCSOS 05",
    agentName: "Harish",
    dateTime: "Oct 3, 2025 | 12:53PM",
    location: "Vijaywada, Amaravati",
    totalAmount: "₹1.8 Cr",
    areaAndCost: "120 acres · ₹1,00,000 / acre"
  },
  {
    id: "GLCSOS 06",
    agentName: "Chandra",
    dateTime: "Oct 3, 2025 | 1:00PM",
    location: "Bhimadole, Eluru",
    totalAmount: "₹25 Lakhs",
    areaAndCost: "10 acres · ₹25,000 / acre"
  }
];
