// ─── Types ───────────────────────────────────────────────────────────────────

export type LayoutVariant =
  | 'sidebar-role-manager'  // Left sidebar Style A (Navy Blue)
  | 'sidebar-ccs-officer'   // Left sidebar Style B (Dark Purple)
  | 'header-only';          // Top navigation bar, no sidebar

export type NavItem = {
  label: string;
  path: string;
  icon: string; // Lucide icon name string
};

export type RoleLayoutConfig = {
  layoutVariant: LayoutVariant;
  roleLabel: string;
  navItems: NavItem[];
};

// ─── Mock Credentials (for testing without backend) ──────────────────────────
// Update these keys to match your real API role strings when backend is ready.

export const MOCK_USERS: Record<
  string,
  { email: string; password: string; name: string; role: string }
> = {
  ROLE_MANAGER: {
    email: 'manager@glc.com',
    password: 'manager@123',
    name: 'Harish Kumar',
    role: 'ROLE_MANAGER',
  },
  FIELD_OFFICER: {
    email: 'officer@glc.com',
    password: 'officer@123',
    name: 'Ravi Shankar',
    role: 'FIELD_OFFICER',
  },
  CCS_OFFICER: {
    email: 'ccs@glc.com',
    password: 'ccs@123',
    name: 'Priya Menon',
    role: 'CCS_OFFICER',
  },
};

// ─── Master Layout Config Map ─────────────────────────────────────────────────
// KEY = exact string returned by your login API in user.role
// To add a new role → add an entry here only.

export const ROLE_LAYOUT_CONFIG: Record<string, RoleLayoutConfig> = {
  ROLE_MANAGER: {
    layoutVariant: 'sidebar-role-manager',
    roleLabel: 'Role Manager',
    navItems: [
      { label: 'Dashboard',  path: '/',          icon: 'LayoutDashboard' },
      { label: 'Regions',    path: '/regions',   icon: 'Map' },
      { label: 'Officers',   path: '/officers',  icon: 'Users' },
      { label: 'Reports',    path: '/reports',   icon: 'FileBarChart' },
      { label: 'Settings',   path: '/settings',  icon: 'Settings' },
    ],
  },

  FIELD_OFFICER: {
    layoutVariant: 'header-only',
    roleLabel: 'Field Officer',
    navItems: [
      { label: 'My Tasks',  path: '/',         icon: 'ClipboardList' },
      { label: 'Visits',    path: '/visits',   icon: 'MapPin' },
      { label: 'Reports',   path: '/reports',  icon: 'FileBarChart' },
      { label: 'Profile',   path: '/profile',  icon: 'UserCircle' },
    ],
  },

  CCS_OFFICER: {
    layoutVariant: 'sidebar-ccs-officer',
    roleLabel: 'CCS Officer',
    navItems: [
      { label: 'Dashboard',   path: '/',          icon: 'LayoutDashboard' },
      { label: 'Cases',       path: '/cases',     icon: 'FolderOpen' },
      { label: 'Schedule',    path: '/schedule',  icon: 'CalendarDays' },
      { label: 'Escalations', path: '/escalate',  icon: 'AlertTriangle' },
    ],
  },
};

// Fallback config when role is unknown
export const DEFAULT_LAYOUT_CONFIG: RoleLayoutConfig =
  ROLE_LAYOUT_CONFIG.ROLE_MANAGER;
