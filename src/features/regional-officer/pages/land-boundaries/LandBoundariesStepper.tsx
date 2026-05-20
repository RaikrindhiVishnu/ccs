import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LandBoundariesStepperProps {
  farmlandTitle: string;
  targetId: string;
}

export const LandBoundariesStepper: React.FC<LandBoundariesStepperProps> = ({
  farmlandTitle,
  targetId
}) => {
  const navigate = useNavigate();

  return (
    <div className="submit-form-left-card">
      <span className="submit-form-farmland-lbl">Farmland ID:</span>
      <h2 className="submit-form-farmland-title">{farmlandTitle}</h2>

      <div className="boundaries-timeline-line"></div>

      {/* Customer Information (Step 1 - Completed) */}
      <div className="boundaries-timeline-dot dot-1 completed"></div>
      <div
        onClick={() => navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`)}
        className="boundaries-timeline-node node-1 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Customer Information</span>
        <span className="submit-form-step-date">Oct 24 • 09:00 AM</span>
      </div>

      {/* Land & Boundaries (Step 2 - ACTIVE) */}
      <div className="boundaries-timeline-dot dot-2 active"></div>
      <div className="boundaries-timeline-node node-2 active">
        <span className="submit-form-step-title uppercase text-[#138FFF] font-bold">Land & Boundaries</span>
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
