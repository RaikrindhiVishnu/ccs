import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CircleDashed, MapPin, History, ChevronRight, ChevronLeft, type LucideIcon } from 'lucide-react';
import { useRoleLayout } from '@/core/hooks/useRoleLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/authSlice';
import { motion } from 'framer-motion';

import logo from '@/assets/glc-logo.svg';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard: LayoutDashboard,
  CircleDashed,
  MapPin,
  History,
};

const NavIcon = ({ name, isActive }: { name: string; isActive?: boolean }) => {
  const Icon = ICON_MAP[name] ?? LayoutDashboard;
  return (
    <Icon
      className={`lg:h-4 lg:w-4 xl:h-[1.125rem] xl:w-[1.125rem] shrink-0 ${name === 'LayoutDashboard' && isActive ? 'fill-current' : 'fill-none'}`}
      strokeWidth={1.6}
    />
  );
};

export const CcsOfficerLayout = () => {
  const { navItems } = useRoleLayout();
  const location = useLocation();
  // By default, expanded on large screens, collapsed on tablet.
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 1024);

  const currentUser = useSelector(selectCurrentUser);

  const user = currentUser;
  const fullName = (user as any)?.name || (currentUser?.first_name ? `${currentUser.first_name} ${currentUser.last_name ?? ''}`.trim() : 'CCS User');
  const profileUrl = user?.profile_url || currentUser?.profile_url || null;

  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Close sidebar on route change if on mobile/tablet
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsExpanded(false);
    }
  }, [location.pathname]);

  // Handle resize to auto-collapse/expand based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (location.pathname === '/ccs/profile') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FFFFFF] rounded-none relative">
      
      {/* Invisible overlay to close sidebar when clicking outside on mobile/tablet */}
      {isExpanded && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 z-[90] lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* ───────────────── SIDEBAR ───────────────── */}
      <aside 
        className={`
          flex flex-col shrink-0 h-full min-h-0 bg-[#FFFFFF] pt-[30px] transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-[291px] absolute z-[100] md:relative shadow-2xl md:shadow-none' : 'w-[88px] relative z-[100] border-r border-gray-100'}
        `}
      >
        
        {/* Header (Logo & Toggle Button) */}
        <div className={`shrink-0 flex ${isExpanded ? 'items-center justify-between pl-[32px] pr-[16px]' : 'flex-col items-center gap-[24px] px-0'} pt-[3px] pb-[50px]`}>
          {/* Logo */}
          <div className={`flex justify-center shrink-0 ${!isExpanded ? 'mt-[10px]' : ''}`}>
            <img
              src={logo}
              alt="Green Land Capital"
              className={`h-auto object-contain transition-all duration-300 ${isExpanded ? 'w-[140px]' : 'w-[50px]'}`}
            />
          </div>

          {/* Toggle Button */}
          <button 
            className={`flex items-center justify-center w-[32px] h-[32px] rounded-lg bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors shrink-0`}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? <ChevronLeft size={18} strokeWidth={2} /> : <ChevronRight size={18} strokeWidth={2} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className={`flex-1 min-h-0 overflow-y-auto space-y-[6px] ${isExpanded ? 'px-[24px]' : 'px-[12px]'}`}>
          {navItems.map((item) => {
            const isVerificationActive = item.label === 'Assigned Farmlands' && 
              (location.pathname.includes('/farmland-request') || 
               location.pathname.includes('/geospatial-audit') ||
               location.pathname.includes('/pending-cases'));
               
            const isFarmlandsListActive = item.label === 'Farmlands List' && 
              location.pathname.includes('/farmland-list');

            const MotionNavLink = motion(NavLink);

            return (
            <MotionNavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={!isExpanded ? item.label : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={({ isActive }) => {
                const trulyActive = isActive || isVerificationActive || isFarmlandsListActive;
                return [
                  'flex items-center',
                  isExpanded ? 'gap-[12px] px-[16px] justify-start' : 'justify-center px-0',
                  'rounded-[12.7px]',
                  'py-[12px]',
                  'font-[\'Plus_Jakarta_Sans\'] text-[15px]',
                  'transition-colors duration-200',
                  trulyActive
                    ? 'bg-[#F2F2F2] text-[#2780C4] font-semibold'
                    : 'text-[#7F8397] font-medium hover:bg-[#F9F9F9] hover:text-[#2780C4]',
                ].join(' ');
              }}
            >
              {({ isActive }) => {
                const trulyActive = isActive || isVerificationActive || isFarmlandsListActive;
                return (
                <>
                  <span className="shrink-0 flex items-center justify-center w-[23.46px] h-[23.46px]">
                    {item.iconImg ? (
                      <img
                        src={item.iconImg}
                        alt={item.label}
                        className="h-[18px] w-[18px] object-contain transition-all duration-200"
                        style={{
                          filter: trulyActive
                            ? 'brightness(0) saturate(100%) invert(41%) sepia(40%) saturate(1464%) hue-rotate(168deg) brightness(91%) contrast(88%)'
                            : 'none'
                        }}
                      />
                    ) : (
                      <NavIcon name={item.icon || ''} isActive={trulyActive} />
                    )}
                  </span>
                  {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}
                </>
              )}}
            </MotionNavLink>
          )})}
        </nav>

        {/* User Section */}
        <div className="shrink-0 flex flex-col items-center gap-[14.66px] mt-auto pb-[40px]">
          <Link 
            to="/ccs/profile" 
            className={`flex flex-col items-center gap-[14.66px] hover:opacity-80 transition-opacity ${isExpanded ? 'w-[92px]' : 'w-full'}`}
            title={fullName}
          >
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile"
                className={`${isExpanded ? 'h-[76.25px] w-[76.25px]' : 'h-[40px] w-[40px]'} rounded-full object-cover border-[1.95px] border-[#FFFFFF] transition-all duration-300`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`${profileUrl ? 'hidden' : 'flex'} items-center justify-center ${isExpanded ? 'h-[76.25px] w-[76.25px] text-base' : 'h-[40px] w-[40px] text-xs'} rounded-full bg-[var(--brand-500)] text-white font-bold border-[1.95px] border-[#FFFFFF] transition-all duration-300`}>
              {initials}
            </div>
            {isExpanded && (
              <p className="text-center leading-[20px] text-[16.618px] font-semibold font-['Inter'] text-[#000000] w-full truncate">
                {fullName}
              </p>
            )}
          </Link>
        </div>
      </aside>

      {/* ───────────────── MAIN ───────────────── */}
      <section className="flex-1 min-h-0 h-full py-[30px] pr-[30px] pl-[30px] md:pl-0 relative flex flex-col">
        <div data-lenis-prevent="true" className="h-full w-full overflow-y-auto rounded-[43px] bg-[#F2F2F2] shadow-sm relative z-0">
          <Outlet />
        </div>
      </section>

    </div>
  );
};