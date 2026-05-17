import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import DashboardSidebar from "@/features/role-manager/components/layout/Sidebar";
import { useRoleLayout } from "@/core/hooks/useRoleLayout";
import { useGetAllGeoMasterDataQuery } from "@/features/role-manager/api/masterDataApi";
import { setGeoMasterData } from "@/features/role-manager/store/roleManagerSlice";

export const RoleManagerLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { navItems } = useRoleLayout();

  // Load geo master data centrally for all role manager pages
  const { data: geoData } = useGetAllGeoMasterDataQuery();

  useEffect(() => {
    if (geoData) {
      dispatch(setGeoMasterData(geoData));
    }
  }, [geoData, dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--surface-page)" }}
    >
      {/* ── Existing Dashboard Sidebar — no modifications ─────────────────── */}
      {/* Logout click is passed down so the icon button actually works       */}
      <div
        onClick={(e) => {
          // The LogOut button is at the bottom of the sidebar.
          // We detect a click on its wrapper div and trigger logout.
          const target = e.target as HTMLElement;
          if (target.closest("[data-logout]")) {
            handleLogout();
          }
        }}
      >
        <DashboardSidebar navItems={navItems} />
      </div>

      {/* ── Page content — full height, no header ──────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
