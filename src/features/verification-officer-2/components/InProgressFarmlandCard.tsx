import React from 'react';
import { MapPin } from 'lucide-react';
import profileImg from '@/assets/profile.svg';
import type { InProgressFarmland } from '../Data/inProgressFarmlandsMockData';

interface InProgressFarmlandCardProps {
  farmland: InProgressFarmland;
}

export const InProgressFarmlandCard: React.FC<InProgressFarmlandCardProps> = ({ farmland }) => {
  return (
    <div 
      className="bg-white flex flex-col w-full"
      style={{
        height: '360px',
        padding: '24px',
        gap: '24px',
        border: '1px solid rgba(225, 226, 237, 0.5)',
        borderRadius: '24px',
        boxSizing: 'border-box'
      }}
    >
      
      {/* Header */}
      <div 
        className="flex flex-row items-center w-full"
        style={{
          gap: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(225, 226, 237, 0.5)'
        }}
      >
        <img 
          src={profileImg} 
          alt={farmland.agentName} 
          style={{ width: '40px', height: '40px', borderRadius: '40px', objectFit: 'cover' }}
        />
        <div className="flex flex-col flex-1">
          <span className="font-inter font-normal" style={{ fontSize: '16px', lineHeight: '24px', color: '#191B23' }}>
            {farmland.agentName}
          </span>
          <span className="font-inter font-normal" style={{ fontSize: '12px', lineHeight: '16px', color: '#737686' }}>
            {farmland.dateTime}
          </span>
        </div>
      </div>

      {/* Title & Location */}
      <div className="flex flex-col w-full" style={{ gap: '4px' }}>
        <span className="font-inter font-normal" style={{ fontSize: '18px', lineHeight: '28px', color: '#004AC6' }}>
          {farmland.id}
        </span>
        <div className="flex flex-row items-center" style={{ gap: '4px' }}>
          <MapPin size={14} color="#505F76" />
          <span className="font-inter font-normal" style={{ fontSize: '16px', lineHeight: '24px', color: '#505F76' }}>
            {farmland.location}
          </span>
        </div>
      </div>

      {/* Stats Block */}
      <div 
        className="flex flex-row items-center w-full"
        style={{
          height: '81px',
          background: '#F3F3FE',
          border: '1px solid rgba(225, 226, 237, 0.3)',
          borderRadius: '8px',
          padding: '17px',
          boxSizing: 'border-box'
        }}
      >
        <div className="flex flex-row items-center w-full justify-between">
          
          <div className="flex flex-col" style={{ gap: '4px', flex: 1 }}>
            <span className="font-inter font-normal uppercase" style={{ fontSize: '10px', lineHeight: '15px', color: '#737686' }}>
              Area
            </span>
            <span className="font-inter font-normal" style={{ fontSize: '14px', lineHeight: '20px', color: '#191B23' }}>
              {farmland.totalArea}
            </span>
          </div>

          <div className="flex flex-col" style={{ gap: '4px', flex: 1 }}>
            <span className="font-inter font-normal uppercase" style={{ fontSize: '10px', lineHeight: '15px', color: '#737686' }}>
              Cost/Acre
            </span>
            <span className="font-inter font-normal" style={{ fontSize: '14px', lineHeight: '20px', color: '#505F76' }}>
              {farmland.costPerAcre}
            </span>
          </div>

          <div 
            className="flex flex-col pl-[16px]" 
            style={{ 
              gap: '4px', 
              borderLeft: '1px solid rgba(225, 226, 237, 0.5)',
              minWidth: '85px'
            }}
          >
            <span className="font-inter font-normal uppercase" style={{ fontSize: '10px', lineHeight: '15px', color: '#737686' }}>
              Amount
            </span>
            <span className="font-inter font-normal" style={{ fontSize: '18px', lineHeight: '28px', color: '#191B23' }}>
              {farmland.amount}
            </span>
          </div>

        </div>
      </div>

      {/* Action Button */}
      <button 
        className="flex items-center justify-center w-full mt-auto hover:opacity-90 transition-opacity"
        style={{
          height: '48px',
          background: 'radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)',
          boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: '69px'
        }}
      >
        <span className="font-inter font-normal text-white" style={{ fontSize: '14px', lineHeight: '20px' }}>
          Resume Verification
        </span>
      </button>

    </div>
  );
};
