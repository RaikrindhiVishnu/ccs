import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import VO3FarmlandCard from '../components/VO3FarmlandCard';

export const AssignedFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  // Filter Assigned farmlands
  const assignedCases = VO3_FARMLANDS.filter(
    (f) => f.status === 'Assigned'
  );

  // Apply Search and Priority filter
  const filteredCases = assignedCases.filter((farmland) => {
    const matchesSearch =
      farmland.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmland.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmland.agentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === 'ALL' || farmland.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="w-full flex flex-col ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[clamp(1.5rem,2.5vw,3.5rem)]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[clamp(0.125rem,0.25vw,0.5rem)]">
          <h1 className="font-plus-jakarta font-bold text-[#1A1C1D] text-[clamp(1.3rem,1.8vw,2.125rem)] leading-[clamp(2.0rem,2.77vw,3.0rem)] m-0">
            Assigned Farmlands Queue
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.85rem,1.11vw,1.25rem)] leading-[clamp(1.4rem,1.94vw,2.2rem)] m-0">
            Review and verify land Records submitted by Intelligence Officers.
          </p>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,1.67vw,2.5rem)] w-full pb-[40px]">
          {filteredCases.map((farmland) => (
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
