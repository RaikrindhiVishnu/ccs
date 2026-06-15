import { useNavigate } from 'react-router-dom';
import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import VO3ProgressCard from '../components/VO3ProgressCard';

export const InProgressFarmlands = () => {
  const navigate = useNavigate();

  // Filter In-Progress farmlands dynamically
  const inProgressCases = VO3_FARMLANDS.filter((f) => {
    const savedStep = sessionStorage.getItem(`vo3_step_${f.id}`);
    const isCompleted = sessionStorage.getItem(`vo3_completed_${f.id}`) === 'true';
    if (isCompleted) return false;
    return f.status === 'In-Progress' || !!savedStep;
  });

  return (
    <div className="w-full flex flex-col ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[clamp(1.5rem,2.5vw,4.5rem)]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[clamp(0.125rem,0.25vw,1.0rem)]">
          <h1 className="font-plus-jakarta font-bold text-[#1A1C1D] text-[clamp(1.3rem,1.8vw,2.5rem)] leading-[clamp(2.0rem,2.77vw,4.0rem)] m-0">
           In-Progress Farmlands
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.85rem,1.11vw,1.75rem)] leading-[clamp(1.4rem,1.94vw,2.5rem)] m-0">
         Resume the verification of the farmlands          </p>
        </div>
      </div>

      {/* Grid of Cards */}
      {inProgressCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,1.67vw,3.5rem)] w-full pb-[40px]">
          {inProgressCases.map((farmland) => (
            <VO3ProgressCard
              key={farmland.id}
              id={farmland.id}
              location={farmland.location}
              agentName={farmland.agentName}
              totalArea={farmland.totalArea}
              costPerAcre={farmland.costPerAcre.includes('₹') ? farmland.costPerAcre : `₹${farmland.costPerAcre}`}
              estimatedValue={farmland.amount.includes('₹') ? farmland.amount : `₹${farmland.amount}`}
              status="IN PROGRESS"
              actionLabel="Resume Verification"
              onActionClick={() => navigate(`/verification-officer-3/assigned-farmland/${farmland.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[rgba(225,226,237,0.5)] rounded-[24px] p-12 text-center text-[#505F76] font-medium shadow-sm w-full">
          No in-progress farmlands found matching criteria.
        </div>
      )}
    </div>
  );
};

export default InProgressFarmlands;
