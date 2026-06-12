import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import VO3ProgressCard from '../components/VO3ProgressCard';

export const InProgressFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  const baseCases = [
    { id: "GLCSOS 01", location: "Tanuku, Andhra Pradesh", agentName: "Ananthu", totalArea: "14.5 Acres", costPerAcre: "₹24L", estimatedValue: "₹3.48Cr", priority: "HIGH" as const },
    { id: "GLCSOS 02", location: "Kakinada, Andhra Pradesh", agentName: "Ram Varma", totalArea: "18.2 Acres", costPerAcre: "₹18L", estimatedValue: "₹3.28Cr", priority: "MEDIUM" as const },
    { id: "GLCSOS 03", location: "Nellore, Andhra Pradesh", agentName: "Sravan Kumar", totalArea: "10.0 Acres", costPerAcre: "₹32L", estimatedValue: "₹3.20Cr", priority: "LOW" as const },
    { id: "GLCSOS 04", location: "Chittoor, Andhra Pradesh", agentName: "Praveen Raj", totalArea: "22.4 Acres", costPerAcre: "₹15L", estimatedValue: "₹3.36Cr", priority: "HIGH" as const },
    { id: "GLCSOS 05", location: "Guntur, Andhra Pradesh", agentName: "Manoj Swamy", totalArea: "15.0 Acres", costPerAcre: "₹22L", estimatedValue: "₹3.30Cr", priority: "MEDIUM" as const },
    { id: "GLCSOS 06", location: "Eluru, Andhra Pradesh", agentName: "Anil Kumar", totalArea: "12.8 Acres", costPerAcre: "₹20L", estimatedValue: "₹2.56Cr", priority: "LOW" as const },
    { id: "GLCSOS 07", location: "Anantapur, Andhra Pradesh", agentName: "Sanjay Dutt", totalArea: "19.5 Acres", costPerAcre: "₹19L", estimatedValue: "₹3.70Cr", priority: "HIGH" as const },
    { id: "GLCSOS 08", location: "Kadapa, Andhra Pradesh", agentName: "Vijay Prasad", totalArea: "11.2 Acres", costPerAcre: "₹25L", estimatedValue: "₹2.80Cr", priority: "MEDIUM" as const },
    { id: "GLCSOS 09", location: "Kurnool, Andhra Pradesh", agentName: "Rajesh Goud", totalArea: "16.0 Acres", costPerAcre: "₹21L", estimatedValue: "₹3.36Cr", priority: "LOW" as const },
  ];

  // Apply Search and Priority filter
  const filteredCases = baseCases.filter((farmland) => {
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
           In-Progress Farmlands
          </h1>
          <p className="font-plus-jakarta font-normal text-[#3D4949] text-[clamp(0.85rem,1.11vw,1.25rem)] leading-[clamp(1.4rem,1.94vw,2.2rem)] m-0">
         Resume the verification of the farmlands          </p>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,1.67vw,2.5rem)] w-full pb-[40px]">
          {filteredCases.map((farmland) => (
            <VO3ProgressCard
              key={farmland.id}
              id={farmland.id}
              location={farmland.location}
              agentName={farmland.agentName}
              totalArea={farmland.totalArea}
              costPerAcre={farmland.costPerAcre}
              estimatedValue={farmland.estimatedValue}
              status="IN PROGRESS"
              actionLabel="Resume Verification"
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
