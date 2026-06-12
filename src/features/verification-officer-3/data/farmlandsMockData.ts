export interface VO3Farmland {
  id: string;
  agentName: string;
  location: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  totalArea: string;
  amount: string;
  costPerAcre: string;
  submissionDate: string;
  status: "Assigned" | "In-Progress" | "Completed";
  progress?: number; // percentage completed
}

export const VO3_FARMLANDS: VO3Farmland[] = [
  {
    id: "GLC-VO3-01",
    agentName: "Anil Kumar",
    location: "Chittoor, Madanapalle",
    priority: "HIGH",
    totalArea: "15 Acres",
    amount: "2.4 Cr",
    costPerAcre: "1,60,000.00",
    submissionDate: "10th Oct",
    status: "Assigned",
  },
  {
    id: "GLC-VO3-02",
    agentName: "Sanjay Dutt",
    location: "Visakhapatnam, Anakapalle",
    priority: "MEDIUM",
    totalArea: "8 Acres",
    amount: "1.8 Cr",
    costPerAcre: "2,25,000.00",
    submissionDate: "9th Oct",
    status: "Assigned",
  },
  {
    id: "GLC-VO3-03",
    agentName: "Vijay Prasad",
    location: "Nellore, Gudur",
    priority: "LOW",
    totalArea: "5 Acres",
    amount: "95 L",
    costPerAcre: "1,90,000.00",
    submissionDate: "9th Oct",
    status: "Assigned",
  },
  {
    id: "GLC-VO3-04",
    agentName: "Praveen Raj",
    location: "Anantapur, Gooty",
    priority: "HIGH",
    totalArea: "22 Acres",
    amount: "4.1 Cr",
    costPerAcre: "1,86,000.00",
    submissionDate: "8th Oct",
    status: "In-Progress",
    progress: 65,
  },
  {
    id: "GLC-VO3-05",
    agentName: "Manoj Swamy",
    location: "Kadapa, Proddatur",
    priority: "MEDIUM",
    totalArea: "12 Acres",
    amount: "1.9 Cr",
    costPerAcre: "1,58,000.00",
    submissionDate: "7th Oct",
    status: "In-Progress",
    progress: 40,
  },
  {
    id: "GLC-VO3-06",
    agentName: "Rajesh Goud",
    location: "Kurnool, Nandyal",
    priority: "LOW",
    totalArea: "10 Acres",
    amount: "1.5 Cr",
    costPerAcre: "1,50,000.00",
    submissionDate: "6th Oct",
    status: "Completed",
  },
  {
    id: "GLC-VO3-07",
    agentName: "Venkat Rao",
    location: "Krishna, Machilipatnam",
    priority: "HIGH",
    totalArea: "18 Acres",
    amount: "3.5 Cr",
    costPerAcre: "1,94,000.00",
    submissionDate: "5th Oct",
    status: "Completed",
  },
];
