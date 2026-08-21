import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import SuperAdminSidebar from "@/features/super-admin/components/layout/Sidebar";
import { useRoleLayout } from "@/core/hooks/useRoleLayout";

export const SuperAdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { navItems } = useRoleLayout();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

  const isDocumentFlow = location.pathname.includes("/Documents/");

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--surface-page)" }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      {!isDocumentFlow && (
        <div
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-logout]")) {
              handleLogout();
            }
          }}
        >
          <SuperAdminSidebar navItems={navItems} />
        </div>
      )}

      {/* ── Page content ────────────────────────────────────────────────────── */}
      <main data-lenis-prevent="true" className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
