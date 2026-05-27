import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { assignedFarmlandsData } from '../Data/assignedFarmlandsMockData';
import { AssignedFarmlandCard } from '../components/AssignedFarmlandCard';

export const AssignedFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  return (
    <div className="w-full flex flex-col pt-[10px]">
      
      {/* Header Section */}
      <div className="flex items-center justify-between w-full" style={{ marginBottom: '40px', height: '52px' }}>
        
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-plus-jakarta font-medium text-[#191B23]" style={{ fontSize: '24px', lineHeight: '24px' }}>
            Assigned Farmlands
          </h1>
          <p className="font-inter font-normal text-[#505F76]" style={{ fontSize: '16px', lineHeight: '24px' }}>
            Manage and review assigned farmlands.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          
          {/* Search Bar */}
          <div 
            className="relative bg-white flex items-center"
            style={{ width: '384px', height: '49px', border: '1px solid #E1E2ED', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '9999px', padding: '14px 16px 14px 48px' }}
          >
            <Search size={18} className="text-[#737686] absolute" style={{ left: '16px' }} />
            <input 
              type="text" 
              placeholder="Search by ID, Location, or Agent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full font-inter placeholder:text-[#6B7280] text-[#6B7280]"
              style={{ fontSize: '16px', lineHeight: '19px' }}
            />
          </div>

          {/* Priority Dropdown Container */}
          <div className="relative">
            <button 
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              className="bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              style={{ width: '133px', height: '49px', border: '1px solid #E1E2ED', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '9999px', padding: '14px 28px', gap: '8px' }}
            >
              <span className="font-inter font-normal text-[#6B7280]" style={{ fontSize: '16px', lineHeight: '19px' }}>Priority</span>
              <ChevronDown size={16} className="text-[#6B7280]" />
            </button>

            {/* Dropdown Menu */}
            {isPriorityOpen && (
              <div 
                className="absolute bg-white shadow-lg z-50"
                style={{ 
                  width: '173px', 
                  height: '149px', 
                  borderRadius: '24px', 
                  top: '59px', 
                  right: '0',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="relative w-full h-full">
                  
                  {/* High Priority */}
                  <button 
                    className="absolute cursor-pointer hover:opacity-90 flex items-center justify-center"
                    style={{ 
                      width: '148px', 
                      height: '30px', 
                      left: '13px', 
                      top: '23px', 
                      background: 'rgba(50, 59, 10, 0.8)', 
                      borderRadius: '12px',
                      border: 'none'
                    }}
                  >
                    <span className="font-inter font-normal text-white" style={{ fontSize: '12px', lineHeight: '15px' }}>
                      High Priority
                    </span>
                  </button>

                  {/* Medium */}
                  <button 
                    className="absolute cursor-pointer bg-transparent border-none w-full text-left hover:opacity-70"
                    style={{ 
                      left: '52px', 
                      top: '67px',
                      width: 'fit-content'
                    }}
                  >
                    <span className="font-inter font-normal text-black" style={{ fontSize: '12px', lineHeight: '15px' }}>
                      Medium
                    </span>
                  </button>

                  {/* Low */}
                  <button 
                    className="absolute cursor-pointer bg-transparent border-none w-full text-left hover:opacity-70"
                    style={{ 
                      left: '52px', 
                      top: '107px',
                      width: 'fit-content'
                    }}
                  >
                    <span className="font-inter font-normal text-black" style={{ fontSize: '12px', lineHeight: '15px' }}>
                      Low
                    </span>
                  </button>

                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full pb-[40px]">
        {assignedFarmlandsData.map((farmland) => (
          <AssignedFarmlandCard key={farmland.id} farmland={farmland} />
        ))}
      </div>

    </div>
  );
};

export default AssignedFarmlands;
