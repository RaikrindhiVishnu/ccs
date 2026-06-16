import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Target, Wallet, Landmark } from "lucide-react";

export default function SuperAdminPoolCreated() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;

  const {
    targetAmount = "1,00,00,000",
    minInvestment = "50,000",
    lockInPeriod = "36 Months",
    selectedPool = "Pool A",
    location: poolLocation = "Hyderabad, Telangana",
    farmlandId = "GLCSOS - 045",
    area = "1.00 Acres",
    raisedAmount = "₹1 Cr",
  } = state || {};

  const [showPublishedCard, setShowPublishedCard] = useState(false);

  return (
    <div style={s.page}>
      <div style={s.content}>
        <button style={s.goBackBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Go back
        </button>

        <h1 style={s.pageTitle}>Preview - {farmlandId?.replace(/\s+/g, "") || "GLCSOS - 045"}</h1>

        {/* Image banner */}
        <div style={s.imageWrap}>
          <img
            style={s.image}
            alt="Farm layout preview"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
          />
          <div style={s.imageTools}>
            <button style={s.iconBtn}>+</button>
            <button style={s.iconBtn}>−</button>
            <button style={s.iconBtn}>◎</button>
          </div>
        </div>

        <div style={s.mainGrid}>
          {/* Left sidebar: Created Pools */}
          <div style={s.sidebar}>
            <div style={s.sidebarHeader}>Created Pools ({(state?.createdPools ?? []).length})</div>
            {(state?.createdPools ?? []).map((p: any, i: number) => (
              <div key={i} style={{ ...s.poolItem, ...(p.active ? s.poolItemActive : {}) }}>
                <div style={s.poolDot} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={s.poolName}>{p.name}</div>
                  <div style={s.poolMeta}>{p.area}</div>
                </div>
                <Plus size={16} color="#9aa39c" style={{ marginLeft: "auto" }} />
              </div>
            ))}
          </div>

          {/* Right: Pool Details card */}
          <div style={s.detailsCol}>
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Pool Details</span>
              </div>

              <div style={s.fieldsGrid}>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Pool Name</div>
                  <div style={s.fieldValue}>{selectedPool}</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Area (Auto Calculated)</div>
                  <div style={s.fieldValue}>{area}</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Location</div>
                  <div style={s.fieldValue}>{poolLocation}</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Assigned ID</div>
                  <div style={s.fieldValue}>{farmlandId}</div>
                </div>
              </div>

              <div style={{ height: 1, background: "#eee", margin: "16px 0" }} />

              <div style={s.sectionTitle}>Investment Information</div>
              <div style={s.fieldsGrid}>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Target Amount (₹)</div>
                  <div style={s.fieldValue}>{targetAmount}</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Minimum Investment (₹)</div>
                  <div style={s.fieldValue}>{minInvestment}</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Maximum Investment (₹)</div>
                  <div style={s.fieldValue}>10,00,00,000</div>
                </div>
                <div style={s.fieldGroup}>
                  <div style={s.fieldLabel}>Lock‑in Period</div>
                  <div style={s.fieldValue}>{lockInPeriod}</div>
                </div>
              </div>
            </div>

            {/* Summary strip */}
            <div style={s.summaryStrip}>
              <div style={s.summaryItem}>
                <Landmark size={18} />
                <div>
                  <div style={s.summaryLabel}>Area</div>
                  <div style={s.summaryValue}>{area}</div>
                </div>
              </div>
              <div style={s.summaryItem}>
                <Wallet size={18} />
                <div>
                  <div style={s.summaryLabel}>Raised amount</div>
                  <div style={s.summaryValue}>{raisedAmount}</div>
                </div>
              </div>
              <div style={s.summaryItem}>
                <Target size={18} />
                <div>
                  <div style={s.summaryLabel}>Target Amount</div>
                  <div style={s.summaryValue}>₹1 Cr</div>
                </div>
              </div>
              <div style={s.summaryItem}>
                <MapPin size={18} />
                <div>
                  <div style={s.summaryLabel}>Location</div>
                  <div style={s.summaryValue}>{poolLocation}</div>
                </div>
              </div>
            </div>

            {/* Bottom action */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={s.publishBtn} onClick={() => setShowPublishedCard(true)}>
                Publish Pools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Published Card */}
      {showPublishedCard && (
        <div style={s.publishedCardOverlay}>
          <div style={s.publishedCard}>
            <h2 style={s.publishedTitle}>Pool Published!</h2>
            <p style={s.publishedText}>Your pool has been successfully published.</p>
            <button style={s.publishedDoneBtn} onClick={() => { setShowPublishedCard(false); navigate('/super-admin/pool-buying/all'); }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  topBar: { background: "#111213", padding: "12px 28px", borderBottom: "1px solid #1e1f21" },
  breadcrumb: { color: "#9aa39c", fontSize: 12 },
  content: { padding: "20px 24px 28px", maxWidth: 1260, margin: "0 auto" },
  goBackBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 22,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 500,
    color: "#1f2937",
    cursor: "pointer",
    marginBottom: 16,
  },
  pageTitle: { fontSize: 20, fontWeight: 700, color: "#111", background: "#fff", padding: "14px 16px", borderRadius: 12, margin: 0 },
  imageWrap: {
    position: "relative",
    marginTop: 16,
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
  },
  image: { width: "100%", height: 360, objectFit: "cover", display: "block" },
  imageTools: {
    position: "absolute",
    right: 12,
    bottom: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    fontSize: 16,
    lineHeight: "32px",
    textAlign: "center" as const,
    cursor: "pointer",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: 18,
    marginTop: 18,
  },
  sidebar: {
    background: "#fff",
    borderRadius: 14,
    padding: 14,
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
    alignSelf: "start",
  },
  sidebarHeader: { fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 8 },
  poolItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #eef0f2",
    background: "#fafafa",
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "default",
    marginBottom: 8,
  },
  poolItemActive: { background: "#f2f9f4", borderColor: "#d7f0db" },
  poolDot: { width: 8, height: 8, borderRadius: 4, background: "#c5e86c" },
  poolName: { fontSize: 13, fontWeight: 600, color: "#111" },
  poolMeta: { fontSize: 12, color: "#6b7280" },
  detailsCol: { display: "flex", flexDirection: "column", gap: 14 },
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 16px 12px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
  },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#111" },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
  fieldLabel: { fontSize: 11.5, fontWeight: 600, color: "#6b7280" },
  fieldValue: {
    background: "#f9fafb",
    border: "1px solid #eef0f2",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13.5,
    color: "#111",
    minHeight: 38,
    display: "flex",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 8 },
  summaryStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    background: "#fff",
    borderRadius: 14,
    padding: 12,
    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f9fafa",
    border: "1px solid #eef0f2",
    borderRadius: 12,
    padding: "10px 12px",
  },
  summaryLabel: { fontSize: 11.5, color: "#6b7280" },
  summaryValue: { fontSize: 13.5, fontWeight: 700, color: "#111" },
  publishBtn: {
    background: "#3b4e22",
    color: "#fff",
    border: "none",
    borderRadius: 26,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.15)",
  },
  // Published Card styles
  publishedCardOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  publishedCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "24px",
    width: 300,
    textAlign: "center" as const,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  publishedTitle: {
    margin: "0 0 12px",
    fontSize: 18,
    fontWeight: 700,
    color: "#111",
  },
  publishedText: {
    margin: "0 0 20px",
    fontSize: 14,
    color: "#333",
  },
  publishedDoneBtn: {
    background: "#3b4e22",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 16px",
    fontSize: 14,
    cursor: "pointer",
  },
};
