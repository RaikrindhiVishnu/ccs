import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VO3Header from "../components/VO3Header";
import VO3StatsCard from "../components/VO3StatsCard";
import VO3AnalyticsSection from "../components/VO3AnalyticsSection";
import VO3SectionHeader from "../components/VO3SectionHeader";
import VO3FarmlandCard from "../components/VO3FarmlandCard";

export const VerificationOfficer3Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const cardsData = [
    {
      id: "GLC-AP-113",
      location: "Srikakulam, AP",
      agentName: "Sravan",
      totalAmount: "₹85,00,000",
      valuePerAcre: "₹4,25,000",
      totalArea: "80 Acres",
      submissionDate: "Oct 12, 2025",
    },
    {
      id: "GLC-AP-289",
      location: "Kurnool, AP",
      agentName: "Ananthu",
      totalAmount: "₹85,00,000",
      valuePerAcre: "₹4,25,000",
      totalArea: "80 Acres",
      submissionDate: "Oct 12, 2025",
    },
    {
      id: "GLC-AP-125",
      location: "Vijayawada, AP",
      agentName: "Vishnu",
      totalAmount: "₹85,00,000",
      valuePerAcre: "₹4,25,000",
      totalArea: "80 Acres",
      submissionDate: "Oct 12, 2025",
    },
    {
      id: "GLC-AP-089",
      location: "Kurnool, AP",
      agentName: "Ananthu",
      totalAmount: "₹85,00,000",
      valuePerAcre: "₹4,25,000",
      totalArea: "80 Acres",
      submissionDate: "Oct 12, 2025",
    },
  ];

  const displayedCards = showAll ? cardsData : cardsData.slice(0, 3);

  return (
    <div className=" flex flex-col gap-[clamp(1.5rem,2.22vw,4.5rem)] select-none">
      
      {/* 1. Header component */}
      <VO3Header
        title="Verification Officer Dashboard"
        subtitle="Next-generation platform infrastructure for scaling sustainable estates."
      />

      {/* 2. Stats summary card row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,1.67vw,3.5rem)] w-full">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,1.67vw,3.5rem)] w-full">
        {displayedCards.map((card) => (
          <VO3FarmlandCard
            key={card.id}
            id={card.id}
            location={card.location}
            agentName={card.agentName}
            totalAmount={card.totalAmount}
            valuePerAcre={card.valuePerAcre}
            totalArea={card.totalArea}
            submissionDate={card.submissionDate}
            onActionClick={() => navigate("/verification-officer-3/assigned-farmlands")}
          />
        ))}
      </div>

    </div>
  );
};

export default VerificationOfficer3Dashboard;
