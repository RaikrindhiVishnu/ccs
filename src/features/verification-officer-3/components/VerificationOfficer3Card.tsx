import React from 'react';
import { MapPin } from 'lucide-react';
import profileImg from '@/assets/profile.svg';
import type { VO3Farmland } from '../data/farmlandsMockData';

interface VerificationOfficer3CardProps {
  farmland: VO3Farmland;
}

export const VerificationOfficer3Card: React.FC<VerificationOfficer3CardProps> = ({ farmland }) => {
  // Determine badge color
  let badgeColor = '';
  if (farmland.priority === 'HIGH') badgeColor = 'bg-[#EF4646] text-white';
  else if (farmland.priority === 'MEDIUM') badgeColor = 'bg-[var(--btn-lime)] text-black';
  else badgeColor = 'bg-[#89C2ED] text-white'; // Low priority

  // Helper for generating deterministic placeholders based on ID
  const idNumber = parseInt(farmland.id.split('-').pop() || '1') || 1;
  const imageUrl = `https://picsum.photos/seed/${idNumber + 300}/600/300`;

  return (
    <div className="bg-white rounded-[1.5rem] overflow-hidden flex flex-col w-full shadow-sm relative transition-all duration-300 hover:shadow-md h-[31rem] border border-[#E1E2ED]/50">
      {/* Top Image Section */}
      <div className="relative w-full bg-gray-200 shrink-0 h-[13.3rem]">
        <img 
          src={imageUrl} 
          alt="Farmland Aerial View" 
          className="w-full h-full object-cover rounded-t-[1.5rem]"
        />
        
        {/* Agent Profile Pill */}
        <div className="absolute flex items-center w-[11.5rem] h-[3.625rem] left-[0.75rem] top-[0.8125rem] bg-[rgba(9,20,38,0.4)] border border-white/20 backdrop-blur-[6px] rounded-full p-[0.5rem] pr-[1rem] gap-[1rem]">
          <div className="rounded-full overflow-hidden shrink-0 w-[2.5rem] h-[2.5rem] border border-[#E1E2ED]">
            <img src={profileImg} alt={farmland.agentName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center pr-[1rem]">
            <span className="text-white font-sans font-bold text-[0.75rem] leading-[0.9375rem] whitespace-nowrap">
              {farmland.agentName}
            </span>
            <span className="text-white/70 font-sans font-normal text-[0.5625rem] leading-[0.875rem] uppercase tracking-[0.03rem]">
              Agent
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="relative flex-1 flex flex-col justify-between p-[1.5625rem]">
        
        {/* Priority Badge */}
        <div className={`absolute flex items-center justify-center uppercase font-sans font-bold ${badgeColor} top-[1.5625rem] right-[1.5625rem] px-[0.75rem] py-[0.25rem] rounded-full text-[0.625rem] leading-[0.9375rem] tracking-[0.06rem]`}>
          {farmland.priority}
        </div>

        {/* Title and Location */}
        <div className="flex flex-col gap-[0.125rem]">
          <h3 className="text-[#004AC6] font-sans text-[1.125rem] leading-[1.75rem] font-semibold">
            {farmland.id}
          </h3>
          <div className="flex items-center gap-[0.5rem] text-[#505F76]">
            <MapPin size={12} className="text-[#505F76]" />
            <span className="font-sans text-[0.75rem] leading-[0.9375rem]">
              {farmland.location}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-[0.9375rem] mt-[1rem]">
          {/* Row 1 */}
          <div className="flex justify-between items-start w-full pr-[1.25rem]">
            <div className="flex flex-col">
              <span className="text-[#737686] font-sans text-[0.625rem] leading-[0.9375rem] uppercase">Total Area</span>
              <span className="text-[#404041] font-sans font-medium text-[1rem] leading-[1.25rem] mt-[0.125rem]">{farmland.totalArea}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737686] font-sans text-[0.625rem] leading-[0.9375rem] uppercase">Amount</span>
              <span className="text-[#404041] font-sans font-medium text-[1.25rem] leading-[1.5rem] mt-[0.125rem]">{farmland.amount}</span>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-between items-start w-full pr-[1.25rem]">
            <div className="flex flex-col">
              <span className="text-[#737686] font-sans text-[0.625rem] leading-[0.9375rem] uppercase">Cost / Acre</span>
              <span className="text-[#404041] font-sans font-medium text-[1rem] leading-[1.25rem] mt-[0.125rem]">{farmland.costPerAcre}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737686] font-sans text-[0.625rem] leading-[0.9375rem] uppercase">Submission</span>
              <span className="text-[#404041] font-sans font-medium text-[1rem] leading-[1.25rem] mt-[0.125rem]">{farmland.submissionDate}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar for In-Progress items */}
        {farmland.status === "In-Progress" && farmland.progress && (
          <div className="mt-[1rem] flex flex-col gap-[0.25rem] w-full">
            <div className="flex justify-between text-[0.6875rem] text-[#505F76]">
              <span>Audit Progress</span>
              <span className="font-semibold">{farmland.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-[0.375rem]">
              <div 
                className="bg-[var(--btn-lime)] h-[0.375rem] rounded-full transition-all duration-500" 
                style={{ width: `${farmland.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button 
          className="w-full h-[3rem] rounded-[4.3125rem] mt-[1.25rem] flex items-center justify-center transition-all duration-300 hover:opacity-90 active:scale-[0.98] cursor-pointer"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)', border: 'none' }}
        >
          <span className="text-white font-sans text-[0.875rem] leading-[1.25rem] font-semibold tracking-wider">
            {farmland.status === "Completed" ? "VIEW CERTIFICATION" : "ENTER AUDIT ROOM"}
          </span>
        </button>

      </div>
    </div>
  );
};
export default VerificationOfficer3Card;
