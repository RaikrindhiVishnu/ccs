import * as Icons from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { type NavItem } from "@/core/config/layoutConfig";
import { useAppSelector } from "@/core/hooks";

interface SidebarProps {
  navItems?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems = [] }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="w-[76px] bg-[#191B1C] rounded-[24px] flex flex-col justify-between p-3.5 box-border shrink-0 ml-4 mt-4 mb-4 h-[calc(100vh-32px)]">
      {/* TOP */}
      <div className="flex flex-col gap-9 w-full items-center">
        {/* Logo */}
        <div className="w-12 h-12 bg-[#0F1011] rounded-2xl flex justify-center items-center shrink-0 overflow-hidden">
          <img src="/logo.svg" alt="logo" className="w-[60%] h-[60%] object-contain" />
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-3 items-center w-full">
          {navItems.map(({ icon, label, path }) => {
            const IconComponent = (Icons as any)[icon] || Icons.HelpCircle;
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                title={label}
                className={({ isActive }) =>
                  `w-12 h-12 rounded-xl flex justify-center items-center cursor-pointer shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2D3032] text-white'
                      : 'text-[#8E9093] hover:bg-[#252729] hover:text-white'
                  }`
                }
              >
                <IconComponent
                  size={22}
                  strokeWidth={1.5}
                />
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 items-center w-full">
        {/* Logout */}
        <div
          data-logout="true"
          className="w-12 h-12 rounded-xl flex justify-center items-center cursor-pointer shrink-0 transition-all duration-200 text-[#8E9093] hover:bg-[#252729] hover:text-white"
          title="Logout"
        >
          <Icons.LogOut
            size={22}
            strokeWidth={1.5}
          />
        </div>

        {/* Profile avatar */}
        <div
          onClick={() => navigate("/role-manager/profile")}
          className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 shrink-0 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center text-[#8E9093]"
          title="Profile"
        >
          {(user as any)?.profile_url ? (
            <img src={(user as any).profile_url} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <Icons.User size={24} strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
