export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export const REGIONAL_OFFICER_NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/regional-officer/dashboard" },
  { id: "assigned-farmlands", label: "Assigned Farmlands", path: "/regional-officer/assigned-farmlands" },
  { id: "requested-info", label: "Requested Info.", path: "/regional-officer/requested-info" },
  { id: "drafts", label: "Drafts", path: "/regional-officer/drafts" },
  { id: "farmlands-list", label: "Farmlands List", path: "/regional-officer/farmlands-list" },
];
