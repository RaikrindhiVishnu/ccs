import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomerStepperProps {
  farmlandTitle: string;
  targetId: string;
}

export const CustomerStepper: React.FC<CustomerStepperProps> = ({
  farmlandTitle,
  targetId
}) => {
  const navigate = useNavigate();

  return (
    <div className="submit-form-left-card">
      <span className="submit-form-farmland-lbl">Farmland ID:</span>
      <h2 className="submit-form-farmland-title">{farmlandTitle}</h2>

      <div className="boundaries-timeline-line"></div>

      {/* Customer Information (Step 1 - ACTIVE) */}
      <div className="boundaries-timeline-dot dot-1 active"></div>
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`)}
        className="boundaries-timeline-node node-1 active cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#138FFF] font-bold">Customer Information</span>
        <span className="submit-form-step-date">Oct 24 • 09:00 AM</span>
      </div>

      {/* Land & Boundaries (Step 2 - Inactive) */}
      <div className="boundaries-timeline-dot dot-2 upcoming"></div>
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-land-boundaries/${targetId}`)}
        className="boundaries-timeline-node node-2 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Land & Boundaries</span>
      </div>

      {/* Valuation (Step 3 - Inactive) */}
      <div className="boundaries-timeline-dot dot-3 upcoming"></div>
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-valuation/${targetId}`)}
        className="boundaries-timeline-node node-3 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Valuation</span>
      </div>

      {/* Agriculture & Report (Step 4 - Inactive) */}
      <div className="boundaries-timeline-dot dot-4 upcoming"></div>
      <div
        onClick={() => navigate(`/regional-officer/submit-form/${targetId}`)}
        className="boundaries-timeline-node node-4 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Agriculture & Report</span>
      </div>
    </div>
  );
};
