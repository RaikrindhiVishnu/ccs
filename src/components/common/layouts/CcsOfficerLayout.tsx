import { NavLink, useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, CircleDashed, MapPin, type LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

import logo from '@/assets/glc-logo.svg';
import profImg from '@/assets/prof.jpg';

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
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const fullName = 'Ram Varma';

  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (location.pathname === '/ccs/profile') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--surface-card)] rounded-3xl xl:rounded-[2.5rem]">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="hidden lg:flex flex-col shrink-0 w-48 xl:w-52 2xl:w-60 h-full min-h-0 bg-[var(--surface-card)]">

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
                  'flex items-center gap-[14px]',
                  'rounded-[13px]',
                  'px-[26px] py-[10px]',
                  'text-[15px]',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-[#F9F9F9] text-[#2780C4] font-semibold'
                    : 'text-[#8A92A6] font-medium hover:bg-[#F9F9F9]/50 hover:text-[#2780C4]',
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
        <div className="shrink-0 px-3 py-4 xl:px-4 xl:py-5 flex flex-col items-center gap-2 mt-auto">
          <Link to="/ccs/profile" className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={profImg} alt="Profile" className="h-[50px] w-[50px] rounded-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
            <div className="hidden items-center justify-center h-[50px] w-[50px] rounded-full bg-[var(--brand-500)] text-white text-base font-bold">
              {initials}
            </div>
            <p className="text-center leading-tight text-[15px] font-semibold text-[#000000]">
              {fullName}
            </p>
          </Link>
        </div>
      </aside>

      {/* ───────────────── MAIN ───────────────── */}
      <section className="flex-1 min-h-0 h-full p-3 lg:p-4 xl:p-5 lg:pl-0">
        <div className="h-full w-full overflow-y-auto rounded-3xl xl:rounded-[2.5rem] bg-[var(--surface-page)] shadow-[var(--shadow-card)]">
          <Outlet />
        </div>
      </section>

    </div>
  );
};