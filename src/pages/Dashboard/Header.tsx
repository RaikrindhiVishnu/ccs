import React from "react";
import "../../index.css";
const Header: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "18.55vh",
        background: "var(--header-gradient)",
        borderRadius: "clamp(12px, 1.67vw, 24px)",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {/* Ellipse 72 — green blur left */}
      <div
        style={{
          position: "absolute",
          width: "clamp(60px, 8.75vw, 126px)",
          height: "clamp(60px, 8.75vw, 126px)",
          left: "clamp(-20px, -2.57vw, -37px)",
          top: "clamp(150px, 30.76vh, 315px)",
          background: "#F2FFDB",
          filter: "blur(80px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ellipse 67 — wide yellow blur top */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "clamp(10px, 2.25vh, 23px)",
          left: 0,
          top: "clamp(140px, 27.73vh, 284px)",
          background: "#F2FFDA",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ellipse 68 — wide yellow blur bottom */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "clamp(8px, 1.56vh, 16px)",
          left: 0,
          top: "clamp(145px, 28.42vh, 291px)",
          background: "#F2FFDA",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── ROW 1: Dashboard label + Search + Bell ── */}
      <div
        style={{
          position: "absolute",
          top: "clamp(8px, 1.95vh, 20px)",
          left: "clamp(12px, 1.81vw, 26px)",
          right: "clamp(12px, 1.81vw, 26px)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        {/* Dashboard label */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(2px, 0.35vw, 5px)" }}>
          <svg
            width="clamp(8px, 0.9vw, 13px)"
            height="clamp(8px, 0.9vw, 13px)"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect x="1" y="1" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="var(--foreground)" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: "clamp(8px, 1.17vh, 12px)",
              color: "var(--foreground)",
            }}
          >
            Dashboard
          </span>
        </div>

        {/* Search + Bell */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(3px, 0.56vw, 8px)",
            flexShrink: 0,
          }}
        >
          {/* Search pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(3px, 0.4vw, 6px)",
              padding: "0 clamp(8px, 1.11vw, 16px)",
              background: "var(--card)",
              borderRadius: "clamp(20px, 4vw, 60px)",
              width: "clamp(80px, 13.89vw, 200px)",
              height: "clamp(18px, 3.32vh, 34px)",
              boxSizing: "border-box",
            }}
          >
            <svg
              width="clamp(8px, 0.9vw, 14px)"
              height="clamp(8px, 0.9vw, 14px)"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="var(--foreground)" strokeOpacity="0.5" strokeWidth="1.5" />
              <path d="M16.5 16.5L21 21" stroke="var(--foreground)" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(8px, 1.17vh, 12px)",
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              Search...
            </span>
          </div>

          {/* Bell */}
          <div
            style={{
              width: "clamp(18px, 3.32vh, 34px)",
              height: "clamp(18px, 3.32vh, 34px)",
              background: "var(--card)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src="/bellicon.svg"
              alt="notification"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* ── Title + Subtitle ── */}
      <div
        style={{
          position: "absolute",
          left: "clamp(12px, 1.81vw, 26px)",
          top: "clamp(40px, 7.71vh, 79px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "clamp(4px, 0.78vh, 8px)",
          zIndex: 1,
        }}
      >
        {/* Title — Figma: Inter 500 36px uppercase */}
        <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: "clamp(14px, 3.52vh, 36px)",
            lineHeight: "120%",
            textTransform: "uppercase",
            color: "var(--foreground)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Role Manager
        </h1>

        {/* Subtitle — Figma: Inter 400 14px opacity 0.6 */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: "clamp(7px, 1.37vh, 14px)",
            lineHeight: "18px",
            color: "var(--muted)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>
    </div>
  );
};

export default Header;