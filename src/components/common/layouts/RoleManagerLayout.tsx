import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import DashboardSidebar from "@/pages/Dashboard/Sidebar";

export const RoleManagerLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--background)" }}
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
        <DashboardSidebar />
      </div>

      {/* ── Page content — full height, no header ──────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
