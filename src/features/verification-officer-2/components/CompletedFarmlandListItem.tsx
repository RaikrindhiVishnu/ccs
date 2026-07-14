import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '@/assets/profile.svg';
import type { CompletedFarmland } from '../Data/completedFarmlandsMockData';

interface CompletedFarmlandListItemProps {
  farmland: CompletedFarmland;
}

export const CompletedFarmlandListItem: React.FC<CompletedFarmlandListItemProps> = ({ farmland }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white flex flex-row flex-wrap md:flex-nowrap items-center justify-between w-full relative gap-4"
      style={{
        minHeight: '102px',
        borderRadius: '30px',
        padding: '24px 32px',
        boxSizing: 'border-box'
      }}
    >
      
      {/* 1. Agent Info Section */}
      <div className="flex flex-row items-center" style={{ gap: '16px', minWidth: '250px' }}>
        <img 
          src={profileImg} 
          alt={farmland.agentName} 
          style={{ width: '56px', height: '56px', borderRadius: '40px', border: '2px solid #F5F7FA', objectFit: 'cover' }}
        />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center" style={{ gap: '8px' }}>
            <span className="font-plus-jakarta" style={{ fontWeight: 600, fontSize: '14px', lineHeight: '21px', color: '#5A5C5E' }}>
              {farmland.agentName}
            </span>
          </div>
          <span className="font-plus-jakarta" style={{ fontWeight: 500, fontSize: '14px', lineHeight: '21px', color: 'rgba(0, 74, 198, 0.8)' }}>
            {farmland.id}
          </span>
          <span className="font-plus-jakarta" style={{ fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#94A3B8' }}>
            {farmland.dateTime}
          </span>
        </div>
      </div>

      {/* 2. Location Section */}
      <div className="flex flex-col justify-center" style={{ minWidth: '200px' }}>
        <span className="font-plus-jakarta" style={{ fontWeight: 600, fontSize: '14px', lineHeight: '21px', color: '#5A5C5E' }}>
          {farmland.location}
        </span>
      </div>

      {/* 3. Stats Section */}
      <div className="flex flex-col justify-center" style={{ minWidth: '250px' }}>
        <span className="font-plus-jakarta" style={{ fontWeight: 600, fontSize: '16px', lineHeight: '27px', color: '#5A5C5E' }}>
          {farmland.totalAmount}
        </span>
        <span className="font-plus-jakarta" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '21px', color: '#8A8E95' }}>
          {farmland.areaAndCost}
        </span>
      </div>

      {/* 4. Action Button */}
      <div className="flex items-center justify-end">
        <button 
          onClick={() => navigate(`/verification-officer-2/completed-farmland/${encodeURIComponent(farmland.id)}`)}
          className="flex items-center justify-center hover:opacity-90 transition-opacity"
          style={{
            width: '107px',
            height: '32px',
            background: 'radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)',
            borderRadius: '24px'
          }}
        >
          <span className="font-plus-jakarta" style={{ fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#FFFFFF' }}>
            View Details
          </span>
        </button>
      </div>

    </div>
  );
};
