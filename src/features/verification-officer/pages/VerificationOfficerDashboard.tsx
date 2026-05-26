import React from 'react';
import DailyClearanceStatus from '../components/DailyClearanceStatus';
import ActiveReviewCard from '../components/ActiveReviewCard';
import WeeklyAssetCertification from '../components/WeeklyAssetCertification';
import ImmediateActionQueue from '../components/ImmediateActionQueue';
import RejectionBreakdown from '../components/RejectionBreakdown';

export const VerificationOfficerDashboard = () => {
  return (
    <div className="w-full relative flex gap-[30px] justify-center items-start">
      
      {/* Left Column */}
      <div className="flex flex-col gap-[30px] w-full max-w-[876px]">
        {/* Top Row of Left Column */}
        <div className="flex gap-[30px] w-full">
          <DailyClearanceStatus />
          <ActiveReviewCard />
        </div>
        
        {/* Bottom Row of Left Column */}
        <div className="flex w-full">
          <ImmediateActionQueue />
        </div>
      </div>

      {/* Right Column (Unified Sidebar) */}
      <div className="bg-[#F7F8FA] rounded-[30px] p-6 w-full max-w-[420px] h-[831px] shadow-sm flex flex-col justify-between">
        <WeeklyAssetCertification />
        <RejectionBreakdown />
      </div>

    </div>
  );
};

export default VerificationOfficerDashboard;
