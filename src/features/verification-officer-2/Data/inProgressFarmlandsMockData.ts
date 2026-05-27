export interface InProgressFarmland {
  id: string;
  agentName: string;
  dateTime: string;
  location: string;
  totalArea: string;
  costPerAcre: string;
  amount: string;
}

export const inProgressFarmlandsData: InProgressFarmland[] = [
  {
    id: "GLCSOS 01",
    agentName: "Ram Varma",
    dateTime: "6th Oct - 12:32 PM",
    location: "West Godavari, Tanuku",
    totalArea: "10 acres",
    costPerAcre: "1,00,000.00",
    amount: "1.2Cr"
  },
  {
    id: "GLCSOS 02",
    agentName: "Krishna",
    dateTime: "5th Oct - 1:23 PM",
    location: "East Godavari, Tanuku",
    totalArea: "24 acres",
    costPerAcre: "90,000.00",
    amount: "50Cr"
  },
  {
    id: "GLCSOS 03",
    agentName: "Harish",
    dateTime: "5th Oct - 12:02 PM",
    location: "Vijaywada, Amaravati",
    totalArea: "12 acres",
    costPerAcre: "12,00,000.00",
    amount: "23Cr"
  },
  {
    id: "GLCSOS 04",
    agentName: "Mohan",
    dateTime: "5th Oct - 11:32 AM",
    location: "Mandapeta, Kakinada",
    totalArea: "1 acre",
    costPerAcre: "90,000.00",
    amount: "50 Lakhs"
  },
  {
    id: "GLCSOS 05",
    agentName: "Chandra",
    dateTime: "5th Oct - 10:02 AM",
    location: "Bhimadole, Eluru",
    totalArea: "0.8 acres",
    costPerAcre: "82,000.00",
    amount: "25 Lakhs"
  },
  {
    id: "GLCSOS 06",
    agentName: "Suresh",
    dateTime: "4th Oct - 5:43 PM",
    location: "Kurnool, Kadapa",
    totalArea: "100 acres",
    costPerAcre: "18,00,000.00",
    amount: "90Cr"
  }
];
