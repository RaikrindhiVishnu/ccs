import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutGrid, Shield, FileText, LogOut, type LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';

import logo from '@/assets/glc-logo.svg';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard: LayoutGrid,
  Shield: Shield,
  FileText: FileText,
};

const NavIcon = ({ name }: { name: string }) => {
  const Icon = ICON_MAP[name] ?? LayoutGrid;
  return <Icon className="lg:h-4 lg:w-4 xl:h-[1.125rem] xl:w-[1.125rem]" strokeWidth={1.6} />;
};

export const IntelligenceOfficerLayout = () => {
  const { navItems, roleLabel } = useRoleLayout();
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
    : 'IO';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside className="hidden lg:flex flex-col shrink-0 w-64 h-full min-h-0 border-r border-slate-200">

        {/* Logo & Role Badge */}
        <div className="shrink-0 px-6 pt-8 pb-6 flex flex-col gap-4">
          <img
            src={logo}
            alt="Green Land Capital"
            className="w-32 object-contain"
          />
          <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit">
            {roleLabel}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3',
                  'rounded-xl',
                  'px-4 py-3',
                  'text-sm',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-md'
                    : 'text-slate-500 font-medium hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              <span className="shrink-0">
                <NavIcon name={item.icon} />
              </span>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="shrink-0 p-6 mt-auto border-t border-slate-100 flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="leading-tight text-sm font-bold text-slate-900 truncate">
              {user?.name ?? 'User'}
            </p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-red-600 w-fit"
            >
              <LogOut className="h-3 w-3" strokeWidth={1.8} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <section className="flex-1 min-h-0 h-full flex flex-col bg-slate-50/50">
        <header className="h-16 shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
          <h1 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            GLC Intelligence Terminal
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold uppercase">System Active</span>
            </div>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-auto p-8">
           <Outlet />
        </div>
      </section>

    </div>
  );
};
