export interface AssignedFarmland {
  id: string;
  agentName: string;
  location: string;
  priority: "HIGH PRIORITY" | "MEDIUM PRIORITY" | "LOW PRIORITY";
  totalArea: string;
  amount: string;
  costPerAcre: string;
  submissionDate: string;
}

export const assignedFarmlandsData: AssignedFarmland[] = [
  {
    id: "GLCSOS 01",
    agentName: "Ram Varma",
    location: "West Godavari, Tanuku",
    priority: "HIGH PRIORITY",
    totalArea: "10 Acres",
    amount: "1.2Cr",
    costPerAcre: "1,00,000.00",
    submissionDate: "6th Oct",
  },
  {
    id: "GLCSOS 02",
    agentName: "Krishna",
    location: "East Godavari, Tanuku",
    priority: "MEDIUM PRIORITY",
    totalArea: "2 Acres",
    amount: "1.1Cr",
    costPerAcre: "70,000.00",
    submissionDate: "6th Oct",
  },
  {
    id: "GLCSOS 03",
    agentName: "Suresh",
    location: "Kurnool, Kadapa",
    priority: "MEDIUM PRIORITY",
    totalArea: "6 Acres",
    amount: "2.1Cr",
    costPerAcre: "1,00,000.00",
    submissionDate: "5th Oct",
  },
  {
    id: "GLCSOS 04",
    agentName: "Harish",
    location: "Vijaywada, Amaravati",
    priority: "MEDIUM PRIORITY",
    totalArea: "4 Acres",
    amount: "3.2Cr",
    costPerAcre: "80,000.00",
    submissionDate: "4th Oct",
  },
  {
    id: "GLCSOS 05",
    agentName: "Chandra",
    location: "Bhimadole, Eluru",
    priority: "HIGH PRIORITY",
    totalArea: "13 Acres",
    amount: "12Cr",
    costPerAcre: "90,000.00",
    submissionDate: "4th Oct",
  },
  {
    id: "GLCSOS 06",
    agentName: "Mohan",
    location: "Guntur, Tenali",
    priority: "LOW PRIORITY",
    totalArea: "8 Acres",
    amount: "1.5Cr",
    costPerAcre: "65,000.00",
    submissionDate: "3rd Oct",
  },
];
