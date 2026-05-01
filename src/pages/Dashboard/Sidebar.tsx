import React from "react";
import sidebarImg from "@/assets/sidebar.png";
import { LayoutGrid, Users, Layers, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

// ─── Nav items — path maps to routes ─────────────────────────────────────────
const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", path: "/"       },
  { icon: Users,      label: "Agents",    path: "/agents" },
  { icon: Layers,     label: "Regions",   path: "/regions"},
];

const Sidebar: React.FC = () => {
  const iconSize = "clamp(14px,1.39vw,20px)";

  const iconClass = `
    w-[clamp(36px,3.61vw,32px)] h-[clamp(36px,4.17vh,52px)] rounded-[clamp(8px,0.83vw,12px)]
    flex justify-center items-center cursor-pointer shrink-0
    hover:bg-[var(--sidebar-accent)] transition-colors duration-200
  `;

  return (
    <div className="w-[clamp(44px,4vw,60px)] bg-[var(--sidebar)] rounded-[clamp(12px,1.39vw,20px)] flex flex-col justify-between p-[clamp(6px,0.69vw,10px)] box-border shrink-0 ml-[clamp(6px,0.83vw,12px)] mt-[clamp(6px,0.83vw,12px)] mb-[clamp(6px,0.83vw,12px)] h-[calc(100%-clamp(12px,1.67vw,24px))]">
      {/* TOP */}
      <div className="flex flex-col gap-[clamp(12px,2.08vh,32px)] w-full items-center">
        {/* Logo */}
        <div className="w-full aspect-square max-h-[clamp(36px,4.17vh,52px)] bg-[var(--foreground)] rounded-[clamp(8px,0.83vw,12px)] flex justify-center items-center shrink-0 overflow-hidden">
          <img src="/logo.svg" alt="logo" className="w-[70%] h-[70%] object-contain" />
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-[clamp(2px,0.35vh,4px)] items-center w-full">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              title={label}
              className={({ isActive }) =>
                `${iconClass} ${isActive ? 'bg-[var(--sidebar-accent)]' : ''}`
              }
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-[var(--sidebar-text)] w-[var(--icon-size)] h-[var(--icon-size)]"
                style={{ ["--icon-size" as any]: iconSize }}
              />
            </NavLink>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-[clamp(8px,1.39vh,20px)] items-center w-full">

        {/* Logout */}
        <div className={iconClass} data-logout="true">
          <LogOut
            size={20}
            strokeWidth={1.5}
            className="text-[var(--sidebar-text)] w-[var(--icon-size)] h-[var(--icon-size)]"
            style={{ ["--icon-size" as any]: iconSize }}
          />
        </div>

        {/* Profile avatar */}
        <div className="w-full aspect-square max-h-[clamp(36px,4.17vh,52px)] rounded-[clamp(8px,0.83vw,12px)] overflow-hidden bg-[var(--sidebar-accent)] shrink-0">
          <img src={sidebarImg} alt="profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
