import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutGrid, CircleDashed, MapPin, LogOut, type LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

import logo from '@/assets/glc-logo.svg';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard: LayoutGrid,
  CircleDashed,
  MapPin,
};

const NavIcon = ({ name }: { name: string }) => {
  const Icon = ICON_MAP[name] ?? LayoutGrid;
  return <Icon className="lg:h-4 lg:w-4 xl:h-[1.125rem] xl:w-[1.125rem]" strokeWidth={1.6} />;
};

export const CcsOfficerLayout = () => {
  const { navItems } = useRoleLayout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--card)] rounded-3xl xl:rounded-[2.5rem]">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="hidden lg:flex flex-col shrink-0 w-48 xl:w-52 2xl:w-60 h-full min-h-0 bg-[var(--card)]">

        {/* Logo */}
        <div className="shrink-0 px-5 pt-6 pb-7 xl:px-6 xl:pt-7 xl:pb-8">
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-full max-w-[7rem] xl:max-w-[8rem] object-contain"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 xl:gap-3',
                  'rounded-xl xl:rounded-2xl',
                  'px-3 py-2.5 xl:px-4 xl:py-3',
                  'text-xs xl:text-sm',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold shadow-sm'
                    : 'text-[var(--muted-strong)] font-medium hover:bg-[var(--primary-soft)] hover:text-[var(--text-dark)]',
                ].join(' ')
              }
            >
              <span className="shrink-0">
                {item.iconImg ? (
                  <img
                    src={item.iconImg}
                    alt={item.label}
                    className="h-[1.125rem] w-[1.125rem] object-contain"
                  />
                ) : (
                  <NavIcon name={item.icon} />
                )}
              </span>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="shrink-0 px-3 py-4 xl:px-4 xl:py-5 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center h-12 w-12 xl:h-14 xl:w-14 rounded-full bg-[var(--primary)] text-white text-sm xl:text-base font-bold">
            {initials}
          </div>
          <p className="text-center leading-tight text-xs xl:text-sm font-semibold text-[var(--text-dark)]">
            {user?.name ?? 'User'}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[var(--muted-strong)] transition-colors hover:text-[var(--danger)]"
          >
            <LogOut className="h-3 w-3 xl:h-3.5 xl:w-3.5" strokeWidth={1.8} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ───────────────── MAIN ───────────────── */}
      <section className="flex-1 min-h-0 h-full p-3 lg:p-4 xl:p-5 lg:pl-0">
        <div className="h-full w-full overflow-y-auto rounded-3xl xl:rounded-[2.5rem] bg-[var(--background)] shadow-[var(--shadow-card)]">
          <Outlet />
        </div>
      </section>

    </div>
  );
};