import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  MapPin,
  FileBarChart,
  UserCircle,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardList,
  MapPin,
  FileBarChart,
  UserCircle,
};
const NavIcon = ({ name }: { name: string }) => {
  const Icon = ICON_MAP[name] ?? ClipboardList;
  return <Icon size={16} strokeWidth={1.8} />;
};

// ─── Component ────────────────────────────────────────────────────────────────
export const FieldOfficerLayout = () => {
  const { navItems, roleLabel } = useRoleLayout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--background)' }}>

      {/* ── Full-width Top Header ─────────────────────────────────────────── */}
      <header
        className="h-16 shrink-0 flex items-center gap-6 px-6 border-b"
        style={{
          background: 'var(--header-gradient)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: 'var(--primary)' }}
          >
            G
          </div>
          <span className="font-bold text-sm hidden sm:block" style={{ color: 'var(--text-dark)' }}>
            GLC
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 hidden md:block" style={{ background: 'var(--border-medium)' }} />

        {/* Horizontal Nav — desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                 ${isActive
                   ? 'text-white'
                   : 'hover:bg-black/5'
                 }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--primary)' : undefined,
                color: isActive ? '#fff' : 'var(--text-neutral)',
              })}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <span
            className="text-xs px-3 py-1 rounded-full font-medium hidden sm:inline-block"
            style={{
              background: 'rgba(39,128,196,0.10)',
              color: 'var(--primary)',
            }}
          >
            {roleLabel}
          </span>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: 'var(--primary)' }}
          >
            {initials}
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5 hidden sm:flex"
          >
            <LogOut size={16} strokeWidth={1.8} style={{ color: 'var(--text-subtle)' }} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X size={18} style={{ color: 'var(--text-dark)' }} />
              : <Menu size={18} style={{ color: 'var(--text-dark)' }} />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown nav */}
      {mobileOpen && (
        <div
          className="md:hidden shrink-0 border-b flex flex-col gap-1 px-4 py-3"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                 ${isActive ? 'text-white' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--primary)' : undefined,
                color: isActive ? '#fff' : 'var(--text-neutral)',
              })}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
            style={{ color: 'var(--text-subtle)' }}
          >
            <LogOut size={16} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      )}

      {/* ── Page content — full width, no sidebar ──────────────────────── */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
