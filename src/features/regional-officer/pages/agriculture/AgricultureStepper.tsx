import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AgricultureStepperProps {
  farmlandTitle: string;
  targetId: string;
}

export const AgricultureStepper: React.FC<AgricultureStepperProps> = ({
  farmlandTitle,
  targetId
}) => {
  const navigate = useNavigate();

  return (
    <div className="submit-form-left-card">
      <span className="submit-form-farmland-lbl">Farmland ID:</span>
      <h2 className="submit-form-farmland-title">{farmlandTitle}</h2>

      <div className="boundaries-timeline-line"></div>

      {/* Customer Information (Step 1 - Checked Done) */}
      <div className="boundaries-timeline-dot dot-1 completed"></div>
      <div 
        onClick={() => navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`)}
        className="boundaries-timeline-node node-1 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Customer Information</span>
        <span className="submit-form-step-date">Oct 24 • 09:00 AM</span>
      </div>

      {/* Land & Boundaries (Step 2 - Checked Done) */}
      <div className="boundaries-timeline-dot dot-2 completed"></div>
      <div 
        onClick={() => navigate(`/regional-officer/assigned-farmlands-land-boundaries/${targetId}`)}
        className="boundaries-timeline-node node-2 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Land & Boundaries</span>
        <span className="submit-form-step-date">Oct 27 • 02:40 PM</span>
      </div>

      {/* Valuation (Step 3 - Checked Done) */}
      <div className="boundaries-timeline-dot dot-3 completed"></div>
      <div 
        onClick={() => navigate(`/regional-officer/assigned-farmlands-valuation/${targetId}`)}
        className="boundaries-timeline-node node-3 cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#5A5C5E]">Valuation</span>
        <span className="submit-form-step-date">Oct 27 • 02:40 PM</span>
      </div>

      {/* Agriculture & Report (Step 4 - ACTIVE) */}
      <div className="boundaries-timeline-dot dot-4 active"></div>
      <div 
        onClick={() => navigate(`/regional-officer/submit-form/${targetId}`)}
        className="boundaries-timeline-node node-4 active cursor-pointer"
      >
        <span className="submit-form-step-title uppercase text-[#138FFF] font-bold">Agriculture & Report</span>
      </div>
    </div>
  );
};
