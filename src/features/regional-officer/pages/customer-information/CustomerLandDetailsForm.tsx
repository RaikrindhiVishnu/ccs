import React from 'react';
import { CustomerTabSelector } from './CustomerTabSelector';
import { LandDetailsContent } from '@/components/ui/LandDetailsContent';

interface CustomerLandDetailsFormProps {
  stateName: string;
  district: string;
  areaCityTown: string;
  acquisitionCategory: string;
  agentName: string;
  landConversion: string;
  valueForArea: string;
  agentReferralLocation: string;
  geoCoords: string;
  geoSubText: string;
  aerialImageUrl?: string;
  satelliteMapUrl?: string;
  targetId: string;
  onBack: () => void;
  onDoneClick: () => void;
}

export const CustomerLandDetailsForm: React.FC<CustomerLandDetailsFormProps> = ({
  stateName,
  district,
  areaCityTown,
  acquisitionCategory,
  agentName,
  landConversion,
  valueForArea,
  agentReferralLocation,
  geoCoords,
  geoSubText,
  aerialImageUrl,
  satelliteMapUrl,
  targetId,
  onBack,
  onDoneClick
}) => {
  return (
    <div className="owner-details-central-card land-details-card">
      {/* Top Tab Bar Selector */}
      <CustomerTabSelector targetId={targetId} activeTab="land" />

      {/* Render reusable Farmland Details layout content */}
      <LandDetailsContent
        stateName={stateName}
        district={district}
        areaCityTown={areaCityTown}
        acquisitionCategory={acquisitionCategory}
        agentName={agentName}
        landConversion={landConversion}
        valueForArea={valueForArea}
        agentReferralLocation={agentReferralLocation}
        geoCoords={geoCoords}
        geoSubText={geoSubText}
        aerialImageUrl={aerialImageUrl}
        satelliteMapUrl={satelliteMapUrl}
      />

      {/* BOTTOM FOOTER ACTIONS */}
      <div className="land-details-footer-actions-group">
        <button onClick={onBack} className="owner-details-btn-back">
          Back
        </button>
        <button onClick={onDoneClick} className="owner-details-btn-next done-theme">
          Done
        </button>
      </div>
    </div>
  );
};

