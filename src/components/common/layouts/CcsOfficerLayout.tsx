import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, CircleDashed, MapPin, type LucideIcon } from 'lucide-react';
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
  const location = useLocation();

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
    <div className="flex h-screen w-full overflow-hidden bg-[#FFFFFF] rounded-none">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="hidden lg:flex flex-col shrink-0 w-[291px] h-full min-h-0 bg-[#FFFFFF] pt-[30px]">

        {/* Logo */}
        <div className="shrink-0 flex justify-start pl-[38px] pt-[3px] pb-[70px]">
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-[140px] h-auto object-contain"
          />
        </div>

        {/* Nav Links */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-[24px] space-y-[6px]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-[12px]',
                  'rounded-[12.7px]',
                  'px-[16px] py-[12px]',
                  'font-[\'Plus_Jakarta_Sans\'] text-[15px]',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-[#F2F2F2] text-[#2780C4] font-semibold'
                    : 'text-[#7F8397] font-medium hover:bg-[#F9F9F9] hover:text-[#2780C4]',
                ].join(' ')
              }
            >
              <span className="shrink-0 flex items-center justify-center w-[23.46px] h-[23.46px]">
                {item.iconImg ? (
                  <img
                    src={item.iconImg}
                    alt={item.label}
                    className="h-[18px] w-[18px] object-contain"
                  />
                ) : (
                  <NavIcon name={item.icon} />
                )}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="shrink-0 flex flex-col items-center gap-[14.66px] mt-auto pb-[40px]">
          <Link to="/ccs/profile" className="flex flex-col items-center gap-[14.66px] hover:opacity-80 transition-opacity">
            <img src={profImg} alt="Profile" className="h-[76.25px] w-[76.25px] rounded-full object-cover border-[1.95px] border-[#FFFFFF]" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
            <div className="hidden items-center justify-center h-[76.25px] w-[76.25px] rounded-full bg-[var(--brand-500)] text-white text-base font-bold">
              {initials}
            </div>
            <p className="text-center leading-[20px] text-[16.6px] font-semibold text-[#000000]">
              {fullName}
            </p>
          </Link>
        </div>
      </aside>

      {/* ───────────────── MAIN ───────────────── */}
      <section className="flex-1 min-h-0 h-full py-[30px] pr-[30px] pl-0">
        <div className="h-full w-full overflow-y-auto rounded-[43px] bg-[#F2F2F2] shadow-sm">
          <Outlet />
        </div>
      </section>

    </div>
  );
};