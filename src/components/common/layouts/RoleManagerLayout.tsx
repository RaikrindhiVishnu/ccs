import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Users,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Map,
  Users,
  FileBarChart,
  Settings,
};
const NavIcon = ({ name }: { name: string }) => {
  const Icon = ICON_MAP[name] ?? LayoutDashboard;
  return <Icon size={18} strokeWidth={1.8} />;
};

// ─── Component ────────────────────────────────────────────────────────────────
export const RoleManagerLayout = () => {
  const { navItems, roleLabel } = useRoleLayout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>

      {/* ── Sidebar A — Navy Blue ─────────────────────────────────────────── */}
      <aside
        className="relative flex flex-col shrink-0 transition-all duration-300 ease-in-out"
        style={{
          width: collapsed ? '64px' : '240px',
          background: '#0F2942',
        }}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 z-20 w-6 h-6 rounded-full bg-white border shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ borderColor: 'var(--border)' }}
        >
          {collapsed
            ? <ChevronRight size={12} className="text-[#0F2942]" />
            : <ChevronLeft size={12} className="text-[#0F2942]" />}
        </button>

        {/* Logo */}
        <div
          className="h-16 flex items-center shrink-0 border-b overflow-hidden"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            padding: collapsed ? '0 0 0 18px' : '0 20px',
            gap: '10px',
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#2780C4] flex items-center justify-center font-bold text-white text-sm shrink-0">
            G
          </div>
          {!collapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <p className="text-white text-sm font-bold leading-none tracking-wide">GLC</p>
              <p className="text-white/40 text-[10px] mt-0.5 uppercase tracking-widest">{roleLabel}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 overflow-hidden whitespace-nowrap
                 ${collapsed ? 'justify-center px-0' : 'px-3'}
                 ${isActive
                   ? 'bg-[#2780C4] text-white'
                   : 'text-white/55 hover:bg-white/10 hover:text-white'
                 }`
              }
            >
              <span className="shrink-0"><NavIcon name={item.icon} /></span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/10 hover:text-white/80 transition-colors overflow-hidden whitespace-nowrap
              ${collapsed ? 'justify-center px-0' : 'px-3'}`}
          >
            <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top header */}
        <header
          className="h-16 shrink-0 flex items-center justify-between px-6 border-b"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100">
              <Bell size={16} strokeWidth={1.8} style={{ color: 'var(--text-subtle)' }} />
            </button>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium hidden sm:inline-block"
              style={{ background: 'rgba(39,128,196,0.10)', color: 'var(--primary)' }}
            >
              {roleLabel}
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'var(--primary)' }}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
