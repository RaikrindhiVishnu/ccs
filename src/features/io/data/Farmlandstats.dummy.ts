// src/features/io/data/Farmlandstats.dummy.ts

import totalFarmlandImg from "@/assets/total-farmland.svg";
import approvedFarmlandImg from "@/assets/approved-farmland.svg";
import pendingFarmlandImg from "@/assets/pending-farmland.svg";
import assignedFarmlandImg from "@/assets/assigned-farmland.svg";

export const FARMLAND_STATS = [
  {
    label: "Total farmlands",
    value: 11766,
    icon: totalFarmlandImg,
  },
  {
    label: "Approved Farmlands",
    value: 1510,
    icon: approvedFarmlandImg,
  },
  {
    label: "Pending Farmlands",
    value: 340,
    icon: pendingFarmlandImg,
  },
  {
    label: "Assigned Farmlands",
    value: 36,
    icon: assignedFarmlandImg,
  },
];