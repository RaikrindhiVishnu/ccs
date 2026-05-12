import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Shield,
  FileText,
  Bell,
  List,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
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
          object-contain
          shrink-0

          w-[0.95rem]
          h-[0.95rem]

          xl:w-[1rem]
          xl:h-[1rem]
        "
      />
    );
  }

  const Icon = ICON_MAP[name] ?? LayoutGrid;

  return (
    <Icon
      className="
        w-[0.95rem]
        h-[0.95rem]

        xl:w-[1rem]
        xl:h-[1rem]
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

      py-[0.42rem]

      px-[0.6rem]
      xl:px-[0.72rem]
      2xl:px-[0.82rem]

      gap-[0.35rem]
      xl:gap-[0.42rem]
      `,
      isActive
        ? `
          bg-[var(--btn-navy)]
          text-[var(--surface-sidebar-text)]
        `
        : `
          bg-[var(--surface-card)]
          text-[var(--text-primary)]

          hover:bg-[var(--btn-navy)]
          hover:text-[var(--surface-sidebar-text)]
        `,
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

        w-[2.1rem]
        h-[2.1rem]

        xl:w-[2.25rem]
        xl:h-[2.25rem]

        2xl:w-[2.4rem]
        2xl:h-[2.4rem]
        `,
        isActive
          ? `
            bg-[var(--surface-card)]
            text-[var(--btn-navy)]
          `
          : `
            bg-[var(--surface-card)]
            text-[var(--text-primary)]

            group-hover:bg-[var(--surface-card)]
            group-hover:text-[var(--btn-navy)]
          `,
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

        text-[0.8rem]
        xl:text-[0.88rem]
        2xl:text-[0.95rem]
        `,
        isActive
          ? `
            font-normal
            font-[Inter]
            text-[var(--surface-sidebar-text)]
          `
          : `
            font-bold
            font-[Plus_Jakarta_Sans]

            group-hover:text-[var(--surface-sidebar-text)]
          `,
      )}
    >
      {item.label}
    </span>
  </div>
);
export const IntelligenceOfficerLayout = () => {
  const { navItems } = useRoleLayout();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  /* Logout */

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/login", {
      replace: true,
    });
  };

  /* Initials */

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "IO";

  return (
    <div
      className="
        flex flex-col

        w-full
        h-screen

        overflow-hidden

        bg-[var(--surface-page)]

        pt-[0.4rem]
        xl:pt-[0.55rem]
        2xl:pt-[0.7rem]
      "
    >
      {/* ═══════════════════════════════════ */}
      {/* HEADER */}
      {/* ═══════════════════════════════════ */}

      <header
        className="
          shrink-0

          w-full

          flex items-center justify-between

          rounded-[2rem]

          bg-[var(--surface-page)]

          h-[4.25rem]
          xl:h-[4.5rem]
          2xl:h-[4.75rem]

          px-[1.35rem]
          xl:px-[1.75rem]
          2xl:px-[2.25rem]

          mx-auto

          max-w-[98.5%]
        "
      >
        {/* LOGO */}

        <div className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="Green Land Capital"
            className="
              object-contain

              w-[6rem]
              xl:w-[6.75rem]
              2xl:w-[7.5rem]
            "
          />
        </div>

        {/* NAVIGATION */}

        <nav
          className="
            flex items-center

            gap-[0.45rem]
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

            gap-[0.6rem]
            xl:gap-[0.75rem]
            2xl:gap-[0.82rem]
          "
        >
          {/* BELL */}

          <button
            className="
              relative

              flex items-center justify-center

              rounded-full

              bg-[var(--surface-card)]

              transition-colors

              hover:bg-[var(--surface-page)]

              w-[2.75rem]
              h-[2.75rem]

              xl:w-[3rem]
              xl:h-[3rem]

              2xl:w-[3.25rem]
              2xl:h-[3.25rem]
            "
            aria-label="Notifications"
          >
            <Bell
              strokeWidth={1.5}
              color="var(--text-primary)"
              className="
                w-[1.1rem]
                h-[1.1rem]

                xl:w-[1.2rem]
                xl:h-[1.2rem]
              "
            />

            {/* RED DOT */}

            <span
              className="
                absolute

                rounded-full

                bg-[var(--status-danger)]

                w-[0.42rem]
                h-[0.42rem]

                top-[0.72rem]
                right-[0.72rem]

                xl:top-[0.8rem]
                xl:right-[0.8rem]
              "
            />
          </button>

          {/* AVATAR */}

          <button
            onClick={handleLogout}
            title="Logout"
            className="
              relative
              overflow-hidden

              flex items-center justify-center

              rounded-full

              bg-[var(--surface-card)]

              transition-opacity

              hover:opacity-90

              w-[2.75rem]
              h-[2.75rem]

              xl:w-[3rem]
              xl:h-[3rem]

              2xl:w-[3.25rem]
              2xl:h-[3.25rem]
            "
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="
                  w-full
                  h-full
                  rounded-full
                  object-cover
                "
              />
            ) : (
              <Typography
                as="span"
                variant="span"
                className="
                  text-[0.72rem]
                  xl:text-[0.78rem]

                  font-bold

                  text-[var(--text-primary)]

                  font-[Plus_Jakarta_Sans]
                "
              >
                {initials}
              </Typography>
            )}
          </button>
        </div>
      </header>
      <main
        className="
          flex-1
          min-h-0

          overflow-auto

          pt-[0.35rem]

          px-[1.35rem]
          xl:px-[1.75rem]
          2xl:px-[2.25rem]

          pb-[1.35rem]
          xl:pb-[1.75rem]
        "
      >
        <Outlet />
      </main>
    </div>
  );
};
