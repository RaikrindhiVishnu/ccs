import type { FarmlandDetail } from "@/features/ccs/components/FarmlandDetailPanel";

export const FARMLAND_DETAILS: Record<string, FarmlandDetail> = {
  "1": {
    id: "1",
    farmlandId: "GLCSOS 01",
    ownerName: "Ramudu Kumar",
    email: "ramudu@gmail.com",
    dateOfBirth: "13/01/1986",
    religion: "Hindu",
    caste: "Hindu",
    totalArea: "70 Acres",
    assetValue: "₹25 Lakhs per Acre",
  },
  "2": {
    id: "2",
    farmlandId: "GLCSOS 02",
    ownerName: "Priyaanshu S.",
    email: "priyaanshu@gmail.com",
    dateOfBirth: "22/05/1990",
    religion: "Hindu",
    caste: "OC",
    totalArea: "45 Acres",
    assetValue: "₹26 Lakhs per Acre",
  },
  // ...rest of your entries
};