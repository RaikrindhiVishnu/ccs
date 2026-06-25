import { useNavigate } from 'react-router-dom';
import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import VO3CompleteCard from '../components/VO3CompleteCard';

export const CompletedFarmlands = () => {
  const navigate = useNavigate();

  // Filter completed farmlands dynamically
  const completedCases = VO3_FARMLANDS.filter((f) => {
    const isCompleted = sessionStorage.getItem(`vo3_completed_${f.id}`) === 'true';
    return f.status === 'Completed' || isCompleted;
  });

  return (
    <div className="w-full flex flex-col ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[clamp(1.125rem,2.5vw,4.5rem)]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[clamp(0.0938rem,0.25vw,1.0rem)]">
          <h1 className="font-plus-jakarta font-bold text-[#1A1C1D] text-[clamp(0.975rem,1.8vw,2.5rem)] tracking-[-1.2px] leading-[clamp(1.65rem,3.33vw,4.0rem)] m-0">
            Completed Farmlands
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.6375rem,1.11vw,1.5rem)] leading-[clamp(1.05rem,1.94vw,2.5rem)] m-0">
            Fully audited and verified farmland assets.
          </p>
        </div>

      </div>

      {/* Grid of Cards */}
      {completedCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(0.6rem,1.11vw,1.5rem)] gap-y-[clamp(0.75rem,1.52vw,2.0rem)] w-full pb-[40px]">
          {completedCases.map((farmland) => (
            <VO3CompleteCard
              key={farmland.id}
              id={farmland.id}
              title={farmland.agentName ? `${farmland.agentName}'s Farm` : farmland.id}
              location={farmland.location}
              landSize={farmland.totalArea}
              landValue={farmland.amount.includes('₹') ? farmland.amount : `₹${farmland.amount}`}
              verificationDate={farmland.submissionDate.includes('Oct') ? `${farmland.submissionDate} 2023, 11:30AM` : farmland.submissionDate}
              status="VERIFIED"
              onCardClick={() => navigate(`/verification-officer-3/completed-farmland/${farmland.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[rgba(225,226,237,0.5)] rounded-[24px] p-12 text-center text-[#505F76] font-medium shadow-sm w-full">
          No completed farmlands found matching criteria.
        </div>
      )}
    </div>
  );
};

export default CompletedFarmlands;
