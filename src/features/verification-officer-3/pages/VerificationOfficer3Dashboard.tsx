import React from "react";
import { useNavigate } from "react-router-dom";
import VO3Header from "../components/VO3Header";
import VO3StatsCard from "../components/VO3StatsCard";
import VO3AnalyticsSection from "../components/VO3AnalyticsSection";
import VO3SectionHeader from "../components/VO3SectionHeader";
import VO3FarmlandCard from "../components/VO3FarmlandCard";
import { VO3_FARMLANDS } from "../data/farmlandsMockData";

export const VerificationOfficer3Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Filter out any cases that are in-progress (have sessionStorage key) or completed (have sessionStorage complete key)
  const assignedCases = VO3_FARMLANDS.filter((f) => {
    const savedStep = sessionStorage.getItem(`vo3_step_${f.id}`);
    const isCompleted = sessionStorage.getItem(`vo3_completed_${f.id}`) === 'true';
    return f.status === 'Assigned' && !savedStep && !isCompleted;
  });

  // Sort by priority: HIGH (1), MEDIUM (2), LOW (3)
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  const sortedAssignedCases = [...assignedCases].sort((a, b) => {
    return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
  });

  // Display only the top 3 priority cards for the immediate queue
  const displayedCards = sortedAssignedCases.slice(0, 3);

  return (
    <div className=" flex flex-col gap-[clamp(1.125rem,2.22vw,4.5rem)] select-none">
      
      {/* 1. Header component */}
      <VO3Header
        title="Verification Officer Dashboard"
        subtitle="Next-generation platform infrastructure for scaling sustainable estates."
      />

      {/* 2. Stats summary card row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[clamp(0.75rem,1.67vw,3.5rem)] w-full">
        <VO3StatsCard
          type="assigned"
          title="Assigned documents"
          value={187}
          description="Total received from IO"
        />
        <VO3StatsCard
          type="verified"
          title="Verified"
          value={142}
          description="75.9% completion rate"
        />
        <VO3StatsCard
          type="rejected"
          title="Rejected"
          value={56}
          description="6.4% rejection rate"
        />
        <VO3StatsCard
          type="pending"
          title="Pending Review"
          value={33}
          description="17.6% in progress"
        />
      </div>

      {/* 3. Analytics Chart section */}
      <VO3AnalyticsSection />

      {/* 4. Section header for Immediate Action Queue */}
      <VO3SectionHeader
        title="Immediate Action Queue"
      />

      {/* 5. Bento Grid / Farmland cards section */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-[clamp(0.75rem,1.67vw,3.5rem)] w-full">
        {displayedCards.map((card) => (
          <VO3FarmlandCard
            key={card.id}
            id={card.id}
            location={card.location}
            agentName={card.agentName}
            totalAmount={card.amount}
            valuePerAcre={card.costPerAcre}
            totalArea={card.totalArea}
            submissionDate={card.submissionDate}
            priority={card.priority}
            onActionClick={() => navigate(`/verification-officer-3/assigned-farmland/${card.id}`)}
          />
        ))}
      </div>

    </div>
  );
};

export default VerificationOfficer3Dashboard;
