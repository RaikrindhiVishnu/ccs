import React from "react";
import AgentOnboardingVelocity from "./AgentOnboardingVelocity";
import RegionCreationVelocity from "./RegionCreationVelocity";
import WorkforceStructure from "./WorkforceStructure";
import RegionalCreationTargetVsActual from "./RegionalCreationTargetVsActual";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardPage: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#F2F2F2",
        display: "flex",
        flexDirection: "row",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(6px, 0.83vw, 12px)",
          gap: "clamp(6px, 0.83vw, 12px)",
          boxSizing: "border-box",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Header */}
        <div style={{ flexShrink: 0 }}>
          <Header />
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(6px, 0.83vw, 12px)",
            flex: 1,
            minHeight: 0,
            boxSizing: "border-box",
          }}
        >
          {/* Left column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 0.83vw, 12px)",
              minWidth: 0,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <AgentOnboardingVelocity />
            <RegionCreationVelocity />
          </div>

          {/* Right column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 0.83vw, 12px)",
              minWidth: 0,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 40, minHeight: 0, display: "flex" }}>
              <WorkforceStructure />
            </div>
            <div style={{ flex: 60, minHeight: 0, display: "flex" }}>
              <RegionalCreationTargetVsActual />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;