export interface PriorityItem {
  label: string;
  value: number;
  color: string;
}

export const PRIORITY_DATA: PriorityItem[] = [
  {
    label: "High priority",
    value: 12,
    color: "var(--priority-high)",
  },
  {
    label: "Under investigation",
    value: 28,
    color: "var(--priority-under-investigation)",
  },
  {
    label: "Resolved",
    value: 34,
    color: "var(--priority-resolved)",
  },
];

export const TOTAL = PRIORITY_DATA.reduce(
  (s, d) => s + d.value,
  0,
);