import React from "react";

const Sidebar: React.FC = () => {
  const iconBtn = (active = false): React.CSSProperties => ({
    width: "clamp(36px, 3.61vw, 32px)",
    height: "clamp(36px, 4.17vh, 52px)",
    borderRadius: "clamp(8px, 0.83vw, 12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    flexShrink: 0,
    background: active ? "var(--sidebar-accent)" : "transparent",
  });

  return (
    <div
      style={{
        width: "clamp(44px, 4vw, 60px)",
        background: "var(--sidebar)",
        borderRadius: "clamp(12px, 1.39vw, 20px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(6px, 0.69vw, 10px)",
        boxSizing: "border-box",
        flexShrink: 0,
        marginLeft: "clamp(6px, 0.83vw, 12px)",
        marginTop: "clamp(6px, 0.83vw, 12px)",
        marginBottom: "clamp(6px, 0.83vw, 12px)",
        height: "calc(100% - clamp(12px, 1.67vw, 24px))",
      }}
    >
      {/* TOP */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2.08vh, 32px)", width: "100%", alignItems: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1",
            maxHeight: "clamp(36px,4.17vh,52px)",
            background: "var(--foreground)",
            borderRadius: "clamp(8px,0.83vw,12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="./logo.svg"
            alt="logo"
            style={{ width: "70%", height: "70%", objectFit: "contain" }}
          />
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2px,0.35vh,4px)", alignItems: "center", width: "100%" }}>
          <div style={iconBtn(true)}>
            <svg width="clamp(14px,1.39vw,20px)" height="clamp(14px,1.39vw,20px)" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="var(--sidebar-text)" strokeWidth="1.5" />
              <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="var(--sidebar-text)" strokeWidth="1.5" />
              <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="var(--sidebar-text)" strokeWidth="1.5" />
              <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="var(--sidebar-text)" strokeWidth="1.5" />
            </svg>
          </div>
          <div style={iconBtn()}>
            <svg width="clamp(14px,1.39vw,20px)" height="clamp(14px,1.39vw,20px)" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="var(--sidebar-text)" strokeWidth="1.43" />
              <path d="M2.5 17.5C2.5 14.46 5.91 12 10 12C14.09 12 17.5 14.46 17.5 17.5" stroke="var(--sidebar-text)" strokeWidth="1.43" strokeLinecap="round" />
            </svg>
          </div>
          <div style={iconBtn()}>
            <svg width="clamp(14px,1.39vw,20px)" height="clamp(14px,1.39vw,20px)" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5L17.5 6.25L10 10L2.5 6.25L10 2.5Z" stroke="var(--sidebar-text)" strokeWidth="1.33" strokeLinejoin="round" />
              <path d="M2.5 10L10 13.75L17.5 10" stroke="var(--sidebar-text)" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 13.75L10 17.5L17.5 13.75" stroke="var(--sidebar-text)" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.39vh,20px)", alignItems: "center", width: "100%" }}>
        <div style={iconBtn()}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6953 5.25343e-07C12.3278 -1.95615e-05 11.2254 -3.57479e-05 10.3585 0.116525C9.45836 0.237541 8.70048 0.496435 8.09857 1.09835C7.57363 1.62328 7.30839 2.26836 7.16916 3.02635C7.03387 3.76291 7.00799 4.6643 7.00196 5.74583C6.99966 6.16003 7.33357 6.49768 7.74778 6.49999C8.16199 6.5023 8.49964 6.16838 8.50194 5.75418C8.50803 4.66068 8.53643 3.8856 8.64448 3.29735C8.74859 2.73054 8.91577 2.40247 9.15923 2.15901C9.43599 1.88225 9.82456 1.7018 10.5583 1.60315C11.3137 1.50159 12.3148 1.5 13.7502 1.5H14.7502C16.1856 1.5 17.1867 1.50159 17.9421 1.60315C18.6759 1.7018 19.0644 1.88225 19.3412 2.15901C19.618 2.43577 19.7984 2.82435 19.8971 3.55812C19.9986 4.31347 20.0002 5.31459 20.0002 6.75V14.75C20.0002 16.1854 19.9986 17.1865 19.8971 17.9419C19.7984 18.6757 19.618 19.0642 19.3412 19.341C19.0644 19.6178 18.6759 19.7982 17.9421 19.8969C17.1867 19.9984 16.1856 20 14.7502 20H13.7502C12.3148 20 11.3137 19.9984 10.5583 19.8969C9.82456 19.7982 9.43599 19.6178 9.15923 19.341C8.91577 19.0975 8.74859 18.7695 8.64448 18.2027C8.53643 17.6144 8.50803 16.8393 8.50194 15.7458C8.49964 15.3316 8.16199 14.9977 7.74778 15C7.33357 15.0023 6.99966 15.34 7.00196 15.7542C7.00799 16.8357 7.03387 17.7371 7.16916 18.4736C7.30839 19.2316 7.57363 19.8767 8.09857 20.4017C8.70048 21.0036 9.45836 21.2625 10.3585 21.3835C11.2254 21.5 12.3278 21.5 13.6953 21.5H14.8051C16.1727 21.5 17.275 21.5 18.142 21.3835C19.0421 21.2625 19.7999 21.0036 20.4019 20.4017C21.0038 19.7997 21.2627 19.0419 21.3837 18.1418C21.5003 17.2748 21.5002 16.1725 21.5002 14.8049V6.69513C21.5002 5.32754 21.5003 4.22522 21.3837 3.35825C21.2627 2.45814 21.0038 1.70027 20.4019 1.09835C19.7999 0.496435 19.0421 0.237541 18.142 0.116525C17.275 -3.57479e-05 16.1727 -1.95615e-05 14.8051 5.25343e-07H13.6953Z" fill="var(--sidebar-text)" />
            <path d="M5.28033 7.28033C5.57322 6.98744 5.57322 6.51256 5.28033 6.21967C4.98744 5.92678 4.51256 5.92678 4.21967 6.21967L0.21967 10.2197C0.0790177 10.3603 0 10.5511 0 10.75C0 10.9489 0.0790176 11.1397 0.21967 11.2803L4.21967 15.2803C4.51256 15.5732 4.98744 15.5732 5.28033 15.2803C5.57322 14.9874 5.57322 14.5126 5.28033 14.2197L2.56066 11.5L12.75 11.5C13.1642 11.5 13.5 11.1642 13.5 10.75C13.5 10.3358 13.1642 10 12.75 10L2.56066 10L5.28033 7.28033Z" fill="var(--sidebar-text)" />
          </svg>
        </div>

        {/* Profile avatar */}
        <div style={{
          width: "100%",
          aspectRatio: "1",
          maxHeight: "clamp(36px,4.17vh,52px)",
          borderRadius: "clamp(8px,0.83vw,12px)",
          overflow: "hidden",
          background: "var(--sidebar-accent)",
          flexShrink: 0,
        }}>
          <img src="./sidebar.png" alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;