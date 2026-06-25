import { useNavigate } from 'react-router-dom';
import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import VO3FarmlandCard from '../components/VO3FarmlandCard';

export const AssignedFarmlands = () => {
  const navigate = useNavigate();

  // Filter Assigned farmlands
  const assignedCases = VO3_FARMLANDS.filter(
    (f) => {
      const savedStep = sessionStorage.getItem(`vo3_step_${f.id}`);
      const isCompleted = sessionStorage.getItem(`vo3_completed_${f.id}`) === 'true';
      if (savedStep || isCompleted) return false;
      return f.status === 'Assigned';
    }
  );

  return (
    <div className="w-full flex flex-col ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[clamp(1.125rem,2.5vw,4.5rem)]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[clamp(0.0938rem,0.25vw,1.0rem)]">
          <h1 className="font-plus-jakarta font-bold text-[#1A1C1D] text-[clamp(0.975rem,1.8vw,2.5rem)] leading-[clamp(1.5rem,2.77vw,4.0rem)] m-0">
            Assigned Farmlands Queue
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.6375rem,1.11vw,1.75rem)] leading-[clamp(1.05rem,1.94vw,2.5rem)] m-0">
            Review and verify land Records submitted by Intelligence Officers.
          </p>
        </div>
      </div>

      {/* Grid of Cards */}
      {assignedCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-[clamp(0.75rem,1.67vw,3.5rem)] w-full pb-[40px]">
          {assignedCases.map((farmland) => (
            <VO3FarmlandCard
              key={farmland.id}
              id={farmland.id}
              location={farmland.location}
              agentName={farmland.agentName}
              totalAmount={farmland.amount}
              valuePerAcre={farmland.costPerAcre}
              totalArea={farmland.totalArea}
              submissionDate={farmland.submissionDate}
              priority={farmland.priority}
              onActionClick={() => navigate(`/verification-officer-3/assigned-farmland/${farmland.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[rgba(225,226,237,0.5)] rounded-[24px] p-12 text-center text-[#505F76] font-medium shadow-sm w-full">
          No assigned farmlands found matching criteria.
        </div>
      )}
    </div>
  );
};

export default AssignedFarmlands;
