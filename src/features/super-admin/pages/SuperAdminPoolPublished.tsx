import { useNavigate } from "react-router-dom";

// ── Icons (inline SVGs) ────────────────────────────────────────────────────────

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 1 6 6v3l1.5 2.5H2.5L4 11V8a6 6 0 0 1 6-6z" stroke="#555" strokeWidth="1.4" />
    <path d="M8 16a2 2 0 0 0 4 0" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
    {/* Starburst / seal shape */}
    <path
      d="M45 5 L50.5 18 L64 12 L62 26.5 L76 28 L68 39 L80 45 L68 51 L76 62 L62 63.5 L64 78 L50.5 72 L45 85 L39.5 72 L26 78 L28 63.5 L14 62 L22 51 L10 45 L22 39 L14 28 L28 26.5 L26 12 L39.5 18 Z"
      fill="#e8f5d0"
      stroke="#d0e8a0"
      strokeWidth="1"
    />
    {/* Inner filled circle */}
    <circle cx="45" cy="45" r="22" fill="#8fbc2a" />
    {/* Checkmark */}
    <path
      d="M34 45 L41 52 L56 37"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────

export default function SuperAdminPoolPublished() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>
      {/* Top bar */}
      <div style={s.topBar}>
        <span style={s.breadcrumb}>Super Admin / Legal Documents / Confirmation</span>
      </div>

      {/* Main white card container */}
      <div style={s.outerCard}>
        {/* Header row */}
        <div style={s.header}>
          <button style={s.goBackBtn} onClick={() => navigate("/super-admin/pool-buying")}>
            <ArrowLeftIcon /> Go Back to Dashboard
          </button>
          <div style={s.headerRight}>
            <button style={s.iconBtn}><BellIcon /></button>
            <div style={s.avatar}>
              <img
                src="https://i.pravatar.cc/36?img=8"
                alt="avatar"
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.style.background = "#8fbc5a";
                }}
              />
            </div>
          </div>
        </div>

        {/* Centered success card */}
        <div style={s.centerArea}>
          <div style={s.successCard}>
            <h2 style={s.successTitle}>Pools Published</h2>

            <div style={s.badgeWrapper}>
              <VerifiedBadge />
            </div>

            <p style={s.successText}>
              Created Pools for hyderabad location<br />
              have been succesfully published
            </p>

            <button
              style={s.doneBtn}
              onClick={() => navigate("/super-admin/pool-buying")}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#1a1a1a",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#1a1a1a",
    padding: "12px 28px",
  },
  breadcrumb: { color: "#888", fontSize: 12 },

  outerCard: {
    flex: 1,
    background: "white",
    margin: "0 20px 20px",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 28px",
    borderBottom: "1px solid #f4f4f4",
  },
  goBackBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "white",
    border: "1px solid #e0e0e0",
    borderRadius: 22,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 500,
    color: "#222",
    cursor: "pointer",
  },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  iconBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 6, borderRadius: 8 },
  avatar: { width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#eee" },
  centerArea: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" },
  successCard: { background: "white", border: "1px solid #ebebeb", borderRadius: 20, padding: "40px 48px 36px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 420, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" },
  successTitle: { fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 24px", textAlign: "center", letterSpacing: -0.2 },
  badgeWrapper: { marginBottom: 24 },
  successText: { fontSize: 14, color: "#666", textAlign: "center", lineHeight: 1.6, margin: "0 0 28px" },
  doneBtn: { background: "#2a2f1e", color: "white", border: "none", borderRadius: 28, padding: "14px 64px", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: 0.1, width: "100%" },
};
