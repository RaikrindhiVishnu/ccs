import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import DashboardSidebar from "@/features/role-manager/components/layout/Sidebar";
import { useRoleLayout } from "@/core/hooks/useRoleLayout";
import { useGetAllGeoMasterDataQuery, useGetAllMasterDataQuery } from "@/features/role-manager/api/masterDataApi";
import { setGeoMasterData } from "@/features/role-manager/store/roleManagerSlice";

export const RoleManagerLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { navItems } = useRoleLayout();

  // Load geo master data centrally for all role manager pages
  const { data: geoData } = useGetAllGeoMasterDataQuery();

  // Load all master data at layout level (after login / page refresh)
  const { data: allMasterData } = useGetAllMasterDataQuery();

  useEffect(() => {
    if (geoData) {
      dispatch(setGeoMasterData(geoData));
    }
  }, [geoData, dispatch]);

  useEffect(() => {
    if (allMasterData) {
      console.log("[RoleManagerLayout] All Master Data Response:", allMasterData);
    }
  }, [allMasterData]);

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
      <main data-lenis-prevent="true" className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
