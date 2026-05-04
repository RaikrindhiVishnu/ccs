// ─── Image imports for CCS_OFFICER nav icons ──────────────────────────────────
// Replace these paths with your actual asset locations
import dashboardIcon    from '@/assets/dashboard.svg';
import farmlandReqIcon  from '@/assets/farmland-request.svg';
import farmlandListIcon from '@/assets/farmland-list.svg';


// ─── Types ───────────────────────────────────────────────────────────────────
export type LayoutVariant =
  | 'sidebar-role-manager'
  | 'sidebar-ccs-officer'
  | 'header-only';

export type NavItem = {
  label: string;
  path: string;
  icon: string;      // Lucide icon name (used by other roles)
  iconImg?: string;  // Image asset (used by CCS_OFFICER)
};

export type RoleLayoutConfig = {
  layoutVariant: LayoutVariant;
  roleLabel: string;
  navItems: NavItem[];
};

// ─── Mock Credentials ─────────────────────────────────────────────────────────
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
    name: 'Ram Varma',
    role: 'CCS_OFFICER',
  },
};

// ─── Master Layout Config ─────────────────────────────────────────────────────
export const ROLE_LAYOUT_CONFIG: Record<string, RoleLayoutConfig> = {
  ROLE_MANAGER: {
    layoutVariant: 'sidebar-role-manager',
    roleLabel: 'Role Manager',
    navItems: [
      { label: 'Dashboard', path: '/',         icon: 'LayoutDashboard' },
      { label: 'Regions',   path: '/regions',  icon: 'Map'             },
      { label: 'Officers',  path: '/officers', icon: 'Users'           },
      { label: 'Reports',   path: '/reports',  icon: 'FileBarChart'    },
      { label: 'Settings',  path: '/settings', icon: 'Settings'        },
    ],
  },

  FIELD_OFFICER: {
    layoutVariant: 'header-only',
    roleLabel: 'Field Officer',
    navItems: [
      { label: 'My Tasks', path: '/',        icon: 'ClipboardList' },
      { label: 'Visits',   path: '/visits',  icon: 'MapPin'        },
      { label: 'Reports',  path: '/reports', icon: 'FileBarChart'  },
      { label: 'Profile',  path: '/profile', icon: 'UserCircle'    },
    ],
  },

  CCS_OFFICER: {
    layoutVariant: 'sidebar-ccs-officer',
    roleLabel: 'CCS Officer',
    navItems: [
      { label: 'Dashboard',        path: '/',                 icon: 'LayoutDashboard', iconImg: dashboardIcon    },
      { label: 'Farmland Request', path: '/farmland-request', icon: 'CircleDashed',    iconImg: farmlandReqIcon  },
      { label: 'Farmland List',    path: '/farmland-list',    icon: 'MapPin',          iconImg: farmlandListIcon },
    ],
  },
};

// Fallback
export const DEFAULT_LAYOUT_CONFIG: RoleLayoutConfig =
  ROLE_LAYOUT_CONFIG.ROLE_MANAGER;