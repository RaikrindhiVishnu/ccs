import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  AlertTriangle,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  AlertTriangle,
};
const NavIcon = ({ name }: { name: string }) => {
  const Icon = ICON_MAP[name] ?? LayoutDashboard;
  return <Icon size={18} strokeWidth={1.8} />;
};

// ─── Component ────────────────────────────────────────────────────────────────
export const CcsOfficerLayout = () => {
  const { navItems, roleLabel } = useRoleLayout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>

      {/* ── Sidebar B — Dark Purple / Indigo ─────────────────────────────── */}
      <aside
        className="w-72 flex flex-col shrink-0"
        style={{ background: '#1A1A2E', borderRight: '1px solid rgba(255,255,255,0.04)' }}
      >
        {/* Branded header */}
        <div
          className="h-20 flex items-center gap-4 px-6 shrink-0"
          style={{ background: '#12122A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0"
            style={{ background: '#7C3AED', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
          >
            CCS
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold leading-none tracking-wide">GLC Platform</p>
            <p className="text-white/40 text-[10px] mt-1 uppercase tracking-widest">{roleLabel}</p>
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 pt-6 pb-2 shrink-0">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white/20">
            Main Menu
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                 ${isActive
                   ? 'bg-[#7C3AED] text-white shadow-lg'
                   : 'text-white/45 hover:bg-white/5 hover:text-white/80'
                 }`
              }
              style={({ isActive }) =>
                isActive ? { boxShadow: '0 4px 12px rgba(124,58,237,0.30)' } : {}
              }
            >
              <span className="shrink-0"><NavIcon name={item.icon} /></span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User block + logout */}
        <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: '#7C3AED' }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate leading-none">{user?.name ?? 'User'}</p>
              <p className="text-white/35 text-[11px] truncate mt-0.5">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/35 hover:bg-white/5 hover:text-white/70 transition-colors"
          >
            <LogOut size={15} strokeWidth={1.8} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content — no header, sidebar only ──────────────────────── */}
      <main className="flex-1 overflow-auto" style={{ background: 'var(--background)' }}>
        <Outlet />
      </main>
    </div>
  );
};
