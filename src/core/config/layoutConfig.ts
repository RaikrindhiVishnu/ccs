// ─── Image imports for CCS_OFFICER nav icons ──────────────────────────────────
// Replace these paths with your actual asset locations
import dashboardIcon    from '@/assets/dashboard.svg';
import farmlandReqIcon  from '@/assets/farmland-request.svg';
// import farmlandListIcon from '@/assets/farmland-list.svg';
// import poolIcon         from '@/assets/poolicon.svg';
import io1 from '@/assets/io1.svg';
import io2 from '@/assets/io2.svg';
import io3 from '@/assets/io3.svg';
import io4 from '@/assets/io4.svg';

//for superadmin side bar//

import widgetIcon from "/public/super-admin/icons/Widget.svg";
import assignedIcon from "/public/super-admin/icons/assignedicon.svg";
import farmlandListIcon from "/public/super-admin/icons/farmlisticon.svg";
import userIcon from "/public/super-admin/icons/usericon.svg";
import poolIcon from "/public/super-admin/icons/poolicon.svg";
import uploadIcon from "@/assets/uploadicon.svg";

// ─── Types ───────────────────────────────────────────────────────────────────
export type LayoutVariant =
  | 'sidebar-role-manager'
  | 'sidebar-super-admin'
  | 'sidebar-ccs-officer'
  | 'sidebar-intelligence-officer'
  | 'sidebar-regional-officer'
  | 'header-only';

export type NavItem = {
  label: string;
  path: string;
  icon?: string;      // Lucide icon name (used by other roles)
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
    role: 'ROLEMNGR',
  },
  FIELD_OFFICER: {
    email: 'officer@glc.com',
    password: 'officer@123',
    name: 'Ravi Shankar',
    role: 'FO',
  },
  CCS_OFFICER: {
    email: 'ccs@glc.com',
    password: 'ccs@123',
    name: 'Ram Varma',
    role: 'CCS',
  },
  IO_OFFICER: {
    email: 'io@glc.com',
    password: 'io@123',
    name: 'Arjun ',
    role: 'IO',
  },
  REGIONAL_OFFICER: {
    email: 'regional@glc.com',
    password: 'regional@123',
    name: 'Edward Janowski',
    role: 'RO',
  },
  SUPER_ADMIN: {
    email: 'superadmin@glc.com',
    password: 'superadmin@123',
    name: 'Super Admin',
    role: 'SADMIN',
  },
  VO3_OFFICER: {
    email: 'vo3@glc.com',
    password: 'vo3@123',
    name: 'Verification Officer 3',
    role: 'VO3',
  },
};

// ─── Master Layout Config ─────────────────────────────────────────────────────
export const ROLE_LAYOUT_CONFIG: Record<string, RoleLayoutConfig> = {
  SADMIN: {
  layoutVariant: "sidebar-super-admin",
  roleLabel: "Super Admin",
  navItems: [
    {
      label: "Dashboard",
      path: "/super-admin/dashboard",
      iconImg: widgetIcon,
    },
    {
      label: "Assigned Farmlands",
      path: "/super-admin/farmlands",
      iconImg: assignedIcon,
    },
    {
      label: "Farmlands List",
      path: "/super-admin/farmlands-list",
      iconImg: farmlandListIcon,
    },
    {
      label: "User Management",
      path: "/super-admin/users-list",
      iconImg: userIcon,
    },
    {
      label: "Pool Buying",
      path: "/super-admin/pool-buying",
      iconImg: poolIcon,
    },
    {
      label: "Upload",
      path: "/super-admin/upload",
      iconImg: uploadIcon,
    },
  ],
},

  ROLEMNGR: {
    layoutVariant: 'sidebar-role-manager',
    roleLabel: 'Role Manager',
    navItems: [
      { label: 'Dashboard',     path: '/role-manager/dashboard',      icon: 'LayoutDashboard' },
      { label: 'User Directory', path: '/role-manager/user-directory', icon: 'Users' },
      { label: 'Regions',    path: '/role-manager/region-area-dashboard',   icon: 'Map' },
      { label: 'Agent Approvals', path: '/role-manager/agent-approvals', icon: 'User' },
    ],
  },

  FO: {
    layoutVariant: 'header-only',
    roleLabel: 'Field Officer',
    navItems: [
      { label: 'My Tasks', path: '/field-officer/dashboard', icon: 'ClipboardList' },
      { label: 'Visits',   path: '/visits',                  icon: 'MapPin'        },
      { label: 'Reports',  path: '/reports',                 icon: 'FileBarChart'  },
      { label: 'Profile',  path: '/profile',                 icon: 'UserCircle'    },
    ],
  },

  CCS: {
    layoutVariant: 'sidebar-ccs-officer',
    roleLabel: 'CCS Officer',
    navItems: [
      { label: 'Dashboard',          path: '/ccs/dashboard',                 icon: 'LayoutDashboard', iconImg: dashboardIcon    },
      { label: 'Assigned Farmlands', path: '/farmland-request', icon: 'CircleDashed',    iconImg: farmlandReqIcon  },
      { label: 'Farmlands List',     path: '/farmland-list',    icon: 'MapPin',          iconImg: farmlandListIcon },
    ],
  },

  IO: {
    layoutVariant: 'sidebar-intelligence-officer',
    roleLabel: 'Intelligence Officer',
    navItems: [
      { label: 'Dashboard',          path: '/io/dashboard',          icon: 'LayoutDashboard', iconImg: io1 },
      { label: 'Assigned Farmlands', path: '/io/Assignedfarmland', icon: 'Shield',          iconImg: io2 },
      { label: 'Requested info',     path: '/io/requested-info',     icon: 'FileText',        iconImg: io3 },
      { label: 'Farmlands list',     path: '/io/farmlands-list',     icon: 'List',            iconImg: io4 },
    ],
  },

  RO: {
    layoutVariant: 'sidebar-regional-officer',
    roleLabel: 'Regional Officer',
    navItems: [
      { label: 'Dashboard', path: '/regional-officer/dashboard',          icon: 'LayoutDashboard' },
      { label: 'Farmlands', path: '/regional-officer/assigned-farmlands', icon: 'Map'             },
      { label: 'Reports',   path: '/regional-officer/reports',            icon: 'FileText'        },
    ],
  },

  VO3: {
    layoutVariant: 'header-only',
    roleLabel: 'Verification Officer 3',
    navItems: [
      { label: 'Dashboard',            path: '/verification-officer-3/dashboard',           icon: 'LayoutDashboard' },
      { label: 'Assigned',             path: '/verification-officer-3/assigned-farmlands',  icon: 'Shield' },
      { label: 'In-Progress Farmland', path: '/verification-officer-3/in-progress-farmlands', icon: 'FileText' },
      { label: 'Completed Farmlands',  path: '/verification-officer-3/completed-farmlands',  icon: 'List' },
    ],
  },
};

// Fallback
export const DEFAULT_LAYOUT_CONFIG: RoleLayoutConfig =
  ROLE_LAYOUT_CONFIG.ROLEMNGR;