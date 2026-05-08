import type { Column } from "../components/DynamicTable";

export const TABLE_COLUMNS: Column[] = [
  { key: "state", label: "State" },
  { key: "region", label: "Region" },
  { key: "area", label: "Area" },
];

export const TABLE_DATA: Record<string, string | number>[] = [
  { state: "Andhra Pradesh", region: 44, area: 446 },
  { state: "Telangana", region: 15, area: 450 },
  { state: "Tamil Nadu", region: 44, area: 436 },
  { state: "Karnataka", region: 69, area: 239 },
  { state: "Maharashtra", region: 112, area: 567 },
  { state: "Gujarat", region: 43, area: 113 },
  { state: "Kerala", region: 19, area: 142 },
];
