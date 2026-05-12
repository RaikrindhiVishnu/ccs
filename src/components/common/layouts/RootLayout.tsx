import type { ComponentType } from 'react';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';
import { RoleManagerLayout } from './RoleManagerLayout';
import { CcsOfficerLayout } from './CcsOfficerLayout';
import { FieldOfficerLayout } from './FieldOfficerLayout';
import { IntelligenceOfficerLayout } from './IntelligenceOfficerLayout';
import type { LayoutVariant } from '@/core/config/layoutConfig';

// ─── Map every LayoutVariant to its shell component ──────────────────────────
// To add a new role layout → create new component + add one line here.
const LAYOUT_MAP: Record<LayoutVariant, ComponentType> = {
  'sidebar-role-manager': RoleManagerLayout,
  'sidebar-ccs-officer':  CcsOfficerLayout,
  'sidebar-intelligence-officer': IntelligenceOfficerLayout,
  'header-only':          FieldOfficerLayout,
};

// ─── RootLayout — the single entry point for all authenticated pages ──────────
export const RootLayout = () => {
  const { layoutVariant } = useRoleLayout();
  const Layout = LAYOUT_MAP[layoutVariant];
  return <Layout />;
};
