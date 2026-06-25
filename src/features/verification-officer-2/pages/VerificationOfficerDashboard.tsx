import DailyClearanceStatus from '../components/DailyClearanceStatus';
import ActiveReviewCard from '../components/ActiveReviewCard';
import WeeklyAssetCertification from '../components/WeeklyAssetCertification';
import ImmediateActionQueue from '../components/ImmediateActionQueue';
import RejectionBreakdown from '../components/RejectionBreakdown';

export const VerificationOfficerDashboard = () => {
  return (
    <div className="w-full relative flex flex-col xl:flex-row gap-6 xl:gap-[30px] justify-center items-start">
      
      {/* Left Column */}
      <div className="flex flex-col gap-6 xl:gap-[30px] w-full xl:max-w-[876px]">
        {/* Top Row of Left Column */}
        <div className="flex flex-col md:flex-row gap-6 xl:gap-[30px] w-full">
          <DailyClearanceStatus />
          <ActiveReviewCard />
        </div>
        
        {/* Bottom Row of Left Column */}
        <div className="flex w-full">
          <ImmediateActionQueue />
        </div>
      </div>

      {/* Right Column (Unified Sidebar) */}
      <div className="bg-[#F7F8FA] rounded-[30px] p-6 w-full xl:max-w-[420px] h-auto md:min-h-0 xl:min-h-[831px] shadow-sm flex flex-col md:flex-row xl:flex-col gap-6 xl:justify-between">
        <WeeklyAssetCertification />
        <RejectionBreakdown />
      </div>

    </div>
  );
};

export default VerificationOfficerDashboard;
