import * as React from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Shield,
  FileText,
  Bell,
  List,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/core/hooks";
import { useRoleLayout } from "@/core/hooks/useRoleLayout";
import { Typography } from "@/components/ui/typography";

import logo from "@/assets/glc-logo.svg";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard: LayoutGrid,
  Shield: Shield,
  FileText: FileText,
  List: List,
};

const NavIcon = ({ name, iconImg }: { name: string; iconImg?: string }) => {
  if (iconImg) {
    return (
      <img
        src={iconImg}
        alt=""
        className="
          object-contain shrink-0
          w-[0.75rem] h-[0.75rem]
          sm:w-[0.8rem] sm:h-[0.8rem]
          lg:w-[0.9rem] lg:h-[0.9rem]
          xl:w-[1rem] xl:h-[1rem]
          2xl:w-[1.05rem] 2xl:h-[1.05rem]
        "
      />
    );
  }

  const Icon = ICON_MAP[name] ?? LayoutGrid;

  return (
    <Icon
      className="
        w-[0.75rem] h-[0.75rem]
        sm:w-[0.8rem] sm:h-[0.8rem]
        lg:w-[0.9rem] lg:h-[0.9rem]
        xl:w-[1rem] xl:h-[1rem]
        2xl:w-[1.05rem] 2xl:h-[1.05rem]
      "
      strokeWidth={1.7}
    />
  );
};

const NavItem = ({
  item,
  isActive,
}: {
  item: {
    path: string;
    label: string;
    icon: string;
    iconImg?: string;
  };
  isActive: boolean;
}) => (
  <div
    className={cn(
      `
      group
      flex items-center
      rounded-full
      transition-all duration-200
      whitespace-nowrap
      select-none
      cursor-pointer

      py-[0.3rem]
      sm:py-[0.35rem]
      lg:py-[0.4rem]
      xl:py-[0.42rem]

      px-[0.35rem]
      sm:px-[0.42rem]
      lg:px-[0.55rem]
      xl:px-[0.72rem]
      2xl:px-[0.82rem]

      gap-[0.25rem]
      sm:gap-[0.28rem]
      lg:gap-[0.32rem]
      xl:gap-[0.42rem]
      `,
      isActive
        ? "bg-[var(--btn-navy)] text-[var(--surface-sidebar-text)]"
        : "bg-[var(--surface-card)] text-[var(--text-primary)] hover:bg-[var(--btn-navy)] hover:text-[var(--surface-sidebar-text)]",
    )}
  >
    {/* ICON */}
    <span
      className={cn(
        `
        flex items-center justify-center
        shrink-0
        rounded-full
        transition-all duration-200

        w-[1.5rem] h-[1.5rem]
        sm:w-[1.65rem] sm:h-[1.65rem]
        lg:w-[1.9rem] lg:h-[1.9rem]
        xl:w-[2.25rem] xl:h-[2.25rem]
        2xl:w-[2.4rem] 2xl:h-[2.4rem]
        `,
        isActive
          ? "bg-[var(--surface-card)] text-[var(--btn-navy)]"
          : "bg-[var(--surface-card)] text-[var(--text-primary)] group-hover:bg-[var(--surface-card)] group-hover:text-[var(--btn-navy)]",
      )}
    >
      <NavIcon name={item.icon} iconImg={item.iconImg} />
    </span>

    {/* LABEL */}
    <span
      className={cn(
        `
        leading-[110%]
        transition-colors duration-200

              text-[0.6rem]
        sm:text-[0.65rem]
        lg:text-[0.78rem]
        xl:text-[1.125rem]
        2xl:text-[1.25rem]
                `,
        isActive
          ? "font-normal font-[var(--font-inter)] text-[var(--surface-sidebar-text)]"
          : "font-bold font-[var(--font-sans)] group-hover:text-[var(--surface-sidebar-text)]",
      )}
    >
      {item.label}
    </span>
  </div>
);

const NotificationsDropdown = ({ onClose }: { onClose: () => void }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const notifications = [
    {
      id: 1,
      title: "Alert: Batch of 15 Pending Farmlands...",
      type: "New update",
      desc: "A batch of farmlands has passed initial review. Please check zone assignments.",
      time: "1:30PM",
      isUnread: true,
    },
    {
      id: 2,
      title: "High Priority: Immediate Review For #1024",
      type: "Review Request",
      desc: "Marked as high priority. Needs environment impact validation before Friday.",
      time: "10:30AM",
      isUnread: true,
    },
    {
      id: 3,
      title: "Trend Alert: Critical Sunday Rejection Spike",
      type: "Regional Expansion",
      desc: "Significant rejection rate deviation. Investigate common rejection Causes",
      time: "3:30PM",
      isUnread: false,
    },
    {
      id: 4,
      title: "Information Uploaded: Environment Impact data for #315",
      type: "Regional Expansion",
      desc: "Social media Campaigns are currently your top registration channel.",
      time: "3:30PM",
      isUnread: false,
    },
  ];

  React.useEffect(() => {
    const handleClickOutside = () => {
      onClose();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute top-[calc(100%+0.75rem)] right-0
        w-[clamp(22rem,28vw,28rem)]
        bg-white
        border border-[rgba(0,0,0,0.08)]
        rounded-[24px]
        shadow-[0px_10px_30px_rgba(0,0,0,0.08)]
        z-50
        flex flex-col
        overflow-hidden
        animate-in fade-in slide-in-from-top-2 duration-200
      "
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-6 py-4">
        <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(1rem,1.25vw,1.4rem)] text-black">
          Notifications
        </span>
        <button
          onClick={handleRefresh}
          className="p-1 text-black/60 hover:text-black transition-colors cursor-pointer"
        >
          <RefreshCw
            className={cn(
              "w-[clamp(1.1rem,1.39vw,1.6rem)] h-[clamp(1.1rem,1.39vw,1.6rem)]",
              isRefreshing && "animate-spin"
            )}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[rgba(0,0,0,0.12)] w-full" />

      {/* List */}
      <div
        className="
          flex-1 overflow-y-auto max-h-[clamp(24rem,30.8vw,35rem)]
          divide-y divide-[rgba(0,0,0,0.04)]
          scrollbar-thin scrollbar-thumb-[var(--brand-tint)]
        "
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "p-6 flex flex-col gap-2 transition-colors hover:bg-slate-50 cursor-pointer relative",
              n.isUnread && "bg-slate-50/50"
            )}
          >
            {/* Top row: Title & unread dot */}
            <div className="flex flex-row justify-between items-start gap-4">
              <h4 className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.85rem,1.04vw,1.2rem)] text-[#1E293B] leading-snug">
                {n.title}
              </h4>
              {n.isUnread && (
                <span className="w-2 h-2 rounded-full bg-[#7A951C] shrink-0 mt-1.5" />
              )}
            </div>

            {/* Subtitle / category */}
            <div className="flex items-center gap-1.5 text-[clamp(0.7rem,0.83vw,0.95rem)] text-[#94A3B8] font-medium font-[family-name:var(--font-sans)]">
              <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
              <span>{n.type}</span>
            </div>

            {/* Description */}
            <p className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.75rem,0.9vw,1.05rem)] text-[#868686] leading-relaxed pr-6">
              {n.desc}
            </p>

            {/* Bottom time stamp */}
            <div className="flex justify-end text-[clamp(0.65rem,0.76vw,0.9rem)] text-[#94A3B8] font-medium font-[family-name:var(--font-sans)] mt-1">
              {n.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const IntelligenceOfficerLayout = () => {
  const { navItems } = useRoleLayout();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const isDashboard = location.pathname === "/io/dashboard";

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    "Intelligence Officer"
    : "Intelligence Officer";

  const initials = fullName
    ? fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "IO";

  return (
    <div
      className="
    relative
    flex flex-col
    w-full
    min-h-screen
    overflow-hidden

    bg-[var(--chart-bg)]

    pt-[0.25rem]
    sm:pt-[0.3rem]
    lg:pt-[0.35rem]
    xl:pt-[0.55rem]
    2xl:pt-[0.7rem]
  "
    >
      {/* ═══════════════════════════════════ */}
      {/* DASHBOARD BACKGROUND BLURS         */}
      {/* ═══════════════════════════════════ */}

      {isDashboard && (
        <div
          className="
        fixed inset-0
        pointer-events-none
        z-0
        overflow-hidden
      "
        >
          <div className="absolute left-[-14rem] top-[-2.875rem] w-[28.5625rem] h-[19rem] rounded-full bg-[var(--priority-card-bg)] blur-[1.45rem]" />

          <div className="absolute left-[-7.75rem] top-[10.25rem] w-[11.75rem] h-[14.8125rem] rounded-full bg-[var(--performance-card-bg)] blur-[1.56rem]" />

          <div className="absolute left-[13.9375rem] top-[-2.1875rem] w-[32.3125rem] h-[14.125rem] rounded-full bg-[var(--performance-card-bg)] blur-[1.45rem]" />

          <div className="absolute left-[39.9375rem] top-[-2.875rem] w-[27.375rem] h-[15.75rem] rounded-full bg-[var(--priority-card-bg)] blur-[1.45rem]" />

          <div className="absolute right-[-1.625rem] top-[-1.4375rem] w-[22.9375rem] h-[20.875rem] rounded-full bg-[var(--performance-card-bg)] opacity-70 blur-[1.45rem]" />

          <div className="absolute left-[-3rem] top-[3.25rem] w-[38.9375rem] h-[13.6875rem] rounded-full bg-[var(--priority-card-bg)] opacity-40 blur-[1.45rem]" />

          <div className="absolute left-[29.75rem] top-[5.9375rem] w-[22.9375rem] h-[8.875rem] rounded-full bg-[var(--performance-card-bg)] blur-[1.45rem]" />

          <div className="absolute left-[43rem] top-[5.75rem] w-[25.125rem] h-[9.875rem] rounded-full bg-[var(--performance-card-bg)] opacity-70 blur-[1.45rem]" />
        </div>
      )}

      {/* ═══════════════════════════════════ */}
      {/* HEADER                             */}
      {/* ═══════════════════════════════════ */}

      <header
        className="
      relative z-[50]
      shrink-0 w-full
      flex items-center justify-between

      bg-transparent

      rounded-[1rem]
      sm:rounded-[1.25rem]
      lg:rounded-[1.5rem]
      xl:rounded-[2rem]

      h-[3.25rem]
      sm:h-[3.5rem]
      lg:h-[4rem]
      xl:h-[4.5rem]
      2xl:h-[4.75rem]

      px-[0.4rem]
      sm:px-[0.5rem]
      lg:px-[0.7rem]
      xl:px-[1rem]
      2xl:px-[1.25rem]
    "
      >
        {/* LOGO */}
        <div className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Green Land Capital"
            className="
          object-contain
         w-[4.5rem] h-[2.2rem]
sm:w-[5rem] sm:h-[2.4rem]
lg:w-[6rem] lg:h-[2.9rem]
xl:w-[7.5rem] xl:h-[3.625rem]
2xl:w-[7.8rem] 2xl:h-[3.8rem]

        "
          />
        </div>

        {/* NAVIGATION */}
        <nav
          className="
        flex items-center

        gap-[0.2rem]
        sm:gap-[0.25rem]
        lg:gap-[0.38rem]
        xl:gap-[0.6rem]
        2xl:gap-[0.75rem]
      "
        >
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {({ isActive }) => <NavItem item={item} isActive={isActive} />}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div
          className="
    shrink-0
    flex items-center

    gap-[0.45rem]
    sm:gap-[0.55rem]
    lg:gap-[0.7rem]
    xl:gap-[0.82rem]
    2xl:gap-[0.9rem]
  "
        >
          {/* BELL CONTAINER */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications((prev) => !prev);
              }}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-colors outline-none",
                "w-[2rem] h-[2rem] sm:w-[2.25rem] sm:h-[2.25rem] lg:w-[2.7rem] lg:h-[2.7rem] xl:w-[3.25rem] xl:h-[3.25rem]",
                showNotifications
                  ? "bg-[#B8D327] hover:bg-[#a5bf20]"
                  : "bg-[var(--surface-card)] hover:bg-[var(--surface-page)]"
              )}
              aria-label="Notifications"
            >
              <Bell
                strokeWidth={1.5}
                color={showNotifications ? "#FFFFFF" : "var(--text-primary)"}
                className="w-[0.9rem] h-[0.9rem] sm:w-[1rem] sm:h-[1rem] lg:w-[1.15rem] lg:h-[1.15rem] xl:w-[1.5rem] xl:h-[1.5rem]"
              />

              {!showNotifications && (
                <span
                  className="
                    absolute rounded-full
                    bg-[var(--status-danger)]
                    w-[0.25rem] h-[0.25rem]
                    lg:w-[0.32rem] lg:h-[0.32rem]
                    xl:w-[0.32rem] xl:h-[0.32rem]
                    top-[0.45rem] right-[0.45rem]
                    xl:top-[0.9rem] xl:right-[0.9rem]
                  "
                />
              )}
            </button>

            {showNotifications && (
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* AVATAR */}
          <button
            onClick={() => navigate("/io/profile")}
            title="Profile"
            className="
      relative overflow-hidden
      flex items-center justify-center
      rounded-full

      bg-[var(--surface-card)]
      transition-opacity
      hover:opacity-90

      w-[2rem] h-[2rem]
      sm:w-[2.25rem] sm:h-[2.25rem]
      lg:w-[2.7rem] lg:h-[2.7rem]
      xl:w-[3.25rem] xl:h-[3.25rem]
      2xl:w-[3.25rem] 2xl:h-[3.25rem]
    "
          >
            {(user as any)?.avatarUrl ? (
              <img
                src={(user as any).avatarUrl}
                alt={fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Typography
                as="span"
                variant="span"
                className="
          font-bold
          font-[var(--font-sans)]
          text-[var(--text-primary)]

          text-[0.6rem]
          sm:text-[0.7rem]
          lg:text-[0.82rem]
          xl:text-[1rem]
        "
              >
                {initials}
              </Typography>
            )}
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════ */}
      {/* PAGE CONTENT                       */}
      {/* ═══════════════════════════════════ */}

      <main
        className="
      relative z-[1]
      flex-1 min-h-0
      overflow-auto

      pt-[0.2rem]
      sm:pt-[0.25rem]
      lg:pt-[0.3rem]
      xl:pt-[0.35rem]

      px-0

      pb-[0.75rem]
      sm:pb-[0.9rem]
      lg:pb-[1.2rem]
      xl:pb-[1.35rem]
      2xl:pb-[1.75rem]
    "
      >
        <Outlet />
      </main>
    </div>
  );
};
