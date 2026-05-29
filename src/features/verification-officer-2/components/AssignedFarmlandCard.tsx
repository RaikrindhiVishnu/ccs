import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import profileImg from '@/assets/profile.svg';
import type { AssignedFarmland } from '../Data/assignedFarmlandsMockData';

interface AssignedFarmlandCardProps {
  farmland: AssignedFarmland;
}

export const AssignedFarmlandCard: React.FC<AssignedFarmlandCardProps> = ({ farmland }) => {
  const navigate = useNavigate();

  // Determine badge color
  let badgeColor = '';
  if (farmland.priority === 'HIGH PRIORITY') badgeColor = 'bg-[rgba(238,74,68,0.86)] text-[#FFFFFF]';
  else if (farmland.priority === 'MEDIUM PRIORITY') badgeColor = 'bg-[rgba(215,238,68,0.8)] text-[#413D3D]';
  else badgeColor = 'bg-[#89C2ED] text-white'; // Low priority

  // Helper for generating deterministic placeholders based on ID (for visual variety)
  const idNumber = parseInt(farmland.id.split(' ')[1]) || 1;
  const imageUrl = `https://picsum.photos/seed/${idNumber + 100}/600/300`;

  return (
    <div className="bg-white rounded-[24px] overflow-hidden flex flex-col w-full shadow-sm relative" style={{ height: '490px', border: '1px solid rgba(225, 226, 237, 0.5)' }}>
      
      {/* Top Image Section */}
      <div className="relative w-full bg-gray-200 shrink-0" style={{ height: '213px' }}>
        <img 
          src={imageUrl} 
          alt="Farmland Aerial View" 
          className="w-full h-full object-cover"
          style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
        />
        
        {/* Agent Profile Pill */}
        <div className="absolute flex items-center" style={{ width: '184.54px', height: '58.62px', left: '12px', top: '13px', background: 'rgba(9, 20, 38, 0.4)', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(6px)', borderRadius: '9999px', padding: '8.31px 16.59px 8.31px 8.31px', gap: '16.55px' }}>
          <div className="rounded-full overflow-hidden shrink-0" style={{ width: '40px', height: '40px', border: '1px solid #E1E2ED' }}>
            <img src={profileImg} alt={farmland.agentName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center pr-4">
            <span className="text-white font-plus-jakarta font-bold text-[12px] leading-[15px]">
              {farmland.agentName}
            </span>
            <span className="text-[rgba(255,255,255,0.7)] font-plus-jakarta font-normal text-[9px] leading-[14px] uppercase tracking-[0.45px]">
              Agent
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="relative flex-1 flex flex-col justify-between" style={{ padding: '25px' }}>
        
        {/* Priority Badge */}
        <div className={`absolute flex items-center justify-center uppercase font-plus-jakarta font-bold ${badgeColor}`} style={{ top: '25px', right: '25px', padding: '3.875px 12.41px 4.915px 12.42px', borderRadius: '9999px', fontSize: '10px', lineHeight: '15px', letterSpacing: '1px' }}>
          {farmland.priority}
        </div>

        {/* Title and Location */}
        <div className="flex flex-col gap-[2px]">
          <h3 className="text-[#004AC6] font-inter text-[18px] leading-[28px]">
            {farmland.id}
          </h3>
          <div className="flex items-center gap-[8px] text-[#505F76]">
            <MapPin size={12} className="text-[#505F76]" />
            <span className="font-inter text-[12px] leading-[15px]">
              {farmland.location}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-[15px] mt-[20px]">
          {/* Row 1 */}
          <div className="flex justify-between items-start w-full pr-[20px]">
            <div className="flex flex-col">
              <span className="text-[#737686] font-inter text-[10px] leading-[15px] uppercase">Total Area</span>
              <span className="text-[#404041] font-inter font-medium text-[18px] leading-[22px] mt-[2px]">{farmland.totalArea}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737686] font-inter text-[10px] leading-[15px] uppercase">Amount</span>
              <span className="text-[#404041] font-inter font-medium text-[24px] leading-[28px] mt-[2px]">{farmland.amount}</span>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-between items-start w-full pr-[20px]">
            <div className="flex flex-col">
              <span className="text-[#737686] font-inter text-[10px] leading-[15px] uppercase">Cost / Acre</span>
              <span className="text-[#404041] font-inter font-medium text-[18px] leading-[22px] mt-[2px]">{farmland.costPerAcre}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737686] font-inter text-[10px] leading-[15px] uppercase">Submission</span>
              <span className="text-[#404041] font-inter font-medium text-[18px] leading-[22px] mt-[2px]">{farmland.submissionDate}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate(`/verification-officer-2/assigned-farmlands-owner-details/${encodeURIComponent(farmland.id)}`)}
          className="w-full h-[48px] rounded-[69px] mt-[25px] flex items-center justify-center transition-opacity hover:opacity-90"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)' }}
        >
          <span className="text-white font-inter text-[14px] leading-[20px]">
            ENTER AUDIT ROOM
          </span>
        </button>

      </div>
    </div>
  );
};
