import React from 'react';
import { CustomerTabSelector } from './CustomerTabSelector';

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
  targetId,
  onBack,
  onDoneClick
}) => {
  return (
    <div className="owner-details-central-card land-details-card">
      {/* Top Tab Bar Selector */}
      <CustomerTabSelector targetId={targetId} activeTab="land" />

      {/* Header title */}
      <h3 className="land-details-header-title">Farmland Details</h3>

      {/* LEFT COLUMN DATA ITEMS */}
      <div className="land-details-data-item state-box">
        <span className="land-details-data-lbl">State</span>
        <span className="land-details-data-val">{stateName}</span>
      </div>

      <div className="land-details-data-item district-box">
        <span className="land-details-data-lbl">District</span>
        <span className="land-details-data-val">{district}</span>
      </div>

      <div className="land-details-data-item area-box">
        <span className="land-details-data-lbl">Area/City/Town</span>
        <span className="land-details-data-val">{areaCityTown}</span>
      </div>

      <div className="land-details-data-item acquisition-box">
        <span className="land-details-data-lbl">Acquisition Category</span>
        <span className="land-details-data-val">{acquisitionCategory}</span>
      </div>

      {/* CENTER PHOTO */}
      <div className="land-details-aerial-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"
          alt="Aerial view of beautiful green farmland fields"
          className="land-details-aerial-image"
        />
        <div className="land-details-aerial-image-border" />
      </div>

      {/* RIGHT COLUMN DATA ITEMS */}
      <div className="land-details-data-item agent-box">
        <span className="land-details-data-lbl">Agent</span>
        <span className="land-details-data-val">{agentName}</span>
      </div>

      <div className="land-details-data-item conversion-box">
        <span className="land-details-data-lbl">Land Conversion</span>
        <span className="land-details-data-val">{landConversion}</span>
      </div>

      <div className="land-details-data-item value-box">
        <span className="land-details-data-lbl">Value for Area</span>
        <span className="land-details-data-val">{valueForArea}</span>
      </div>

      <div className="land-details-data-item referral-box">
        <span className="land-details-data-lbl">Agent Referral Location</span>
        <span className="land-details-data-val">{agentReferralLocation}</span>
      </div>

      {/* GEO REFERENCE CARD */}
      <div className="land-details-geo-reference-card">
        <span className="land-details-geo-lbl">Geo Reference</span>
        <h4 className="land-details-geo-coords">{geoCoords}</h4>
        <span className="land-details-geo-sub">{geoSubText}</span>
      </div>

      {/* SATELLITE MAP REF THUMBNAIL */}
      <div className="land-details-map-ref-card">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
          alt="Satellite map grid reference"
          className="land-details-map-ref-image"
        />
        <div className="land-details-map-ref-overlay" />
      </div>

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
