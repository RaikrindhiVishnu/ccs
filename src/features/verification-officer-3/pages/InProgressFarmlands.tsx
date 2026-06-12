import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import { VerificationOfficer3Card } from '../components/VerificationOfficer3Card';

export const InProgressFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  // Filter In-Progress farmlands
  const inProgressCases = VO3_FARMLANDS.filter(
    (f) => f.status === 'In-Progress'
  );

  // Apply Search and Priority filter
  const filteredCases = inProgressCases.filter((farmland) => {
    const matchesSearch =
      farmland.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmland.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmland.agentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === 'ALL' || farmland.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="w-full flex flex-col pt-[10px]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-[40px]">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-plus-jakarta font-medium text-[#191B23] text-[24px] leading-[24px]">
            In-Progress Farmland Audits
          </h1>
          <p className="font-inter font-normal text-[#505F76] text-[16px] leading-[24px]">
            Track status, update environmental reviews, and resolve pending issues for active cases.
          </p>
        </div>

        {/* Search & Filter Actions */}
        <div className="flex items-center gap-[12px] flex-wrap">
          {/* Search Bar */}
          <div 
            className="relative bg-white flex items-center w-full md:w-[384px] h-[49px] border border-[#E1E2ED] shadow-sm rounded-full px-[16px] py-[14px] pl-[48px]"
          >
            <Search size={18} className="text-[#737686] absolute left-[16px]" />
            <input 
              type="text" 
              placeholder="Search by ID, Location, or Agent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full font-inter placeholder:text-[#6B7280] text-[#191B23] text-[16px] leading-[19px]"
            />
          </div>

          {/* Priority Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              className="bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-[49px] border border-[#E1E2ED] shadow-sm rounded-full px-[28px] py-[14px] gap-[8px]"
            >
              <span className="font-inter font-normal text-[#6B7280] text-[16px] leading-[19px]">
                Priority: {priorityFilter}
              </span>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {isPriorityOpen && (
              <div 
                className="absolute bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-50 rounded-[24px] w-[180px] top-[59px] right-0 flex flex-col p-3 gap-1"
              >
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPriorityFilter(p as any);
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[14px] font-inter rounded-xl border-none cursor-pointer transition-colors ${
                      priorityFilter === p
                        ? 'bg-[#BDD327] text-black font-semibold'
                        : 'bg-transparent text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {p === 'ALL' ? 'All Priorities' : `${p} Priority`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full pb-[40px]">
          {filteredCases.map((farmland) => (
            <VerificationOfficer3Card key={farmland.id} farmland={farmland} />
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
