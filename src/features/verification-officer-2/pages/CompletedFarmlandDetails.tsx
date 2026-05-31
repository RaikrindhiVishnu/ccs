import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MapPin } from 'lucide-react';
import { completedFarmlandsData } from '../Data/completedFarmlandsMockData';

export const VerificationOfficerCompletedFarmlandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the matched farmland item, or default to the first one
  const selectedFarmland = completedFarmlandsData.find(
    (item) => item.id === id || 
              item.id.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
              item.id.replace(/\s+/g, '').toLowerCase() === id?.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
  ) || completedFarmlandsData[0];

  const handleBack = () => {
    navigate('/verification-officer-2/completed-farmland');
  };

  return (
    <div className="farmland-details-page-fluid">
      
      {/* Top Header Row (Go Back Button & Actions Badge) */}
      <div className="details-fluid-header-row">
        <button
          onClick={handleBack}
          className="back-dashboard-pill-btn-fluid"
        >
          <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
          <span className="back-dashboard-pill-text-fluid">
            Go Back to Dashboard
          </span>
        </button>

        {/* Notifications and Profile */}
        <div className="details-fluid-badges-container">
          <button className="details-fluid-bell-badge-btn">
            <Bell className="w-5 h-5 text-[#2C2C2C]" />
            <span className="details-fluid-bell-badge-dot"></span>
          </button>
          <div className="details-fluid-profile-badge">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Profile Avatar"
              className="details-fluid-profile-image"
            />
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="details-fluid-title-container">
        <h1 className="details-fluid-main-heading">
          Farmlands List
        </h1>
      </div>

      {/* Hero Section Container */}
      <div className="details-fluid-hero-card">
        {/* Lush Green Farm Image overlay */}
        <div className="details-fluid-hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80"
            alt="Lush green farmland landscape"
            className="details-fluid-hero-image"
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="details-fluid-hero-left-overlay">
          <div className="details-fluid-status-capsule">
            <span className="details-fluid-status-text">
              COMPLETED
            </span>
          </div>
          <h2 className="details-fluid-hero-title">
            {selectedFarmland.id}
          </h2>
          <div className="details-fluid-hero-location">
            <MapPin className="w-4 h-4 text-[#EEEEF0] shrink-0" />
            <span className="details-fluid-hero-location-text">
              {selectedFarmland.location}
            </span>
          </div>
        </div>

        {/* Hero Floating Stats Cards */}
        <div className="details-fluid-hero-stats-wrapper">
          <div className="details-fluid-stat-card">
            <span className="fluid-stat-label">LAND EXTEND</span>
            <span className="fluid-stat-value">{selectedFarmland.areaAndCost.split('·')[0].trim()}</span>
          </div>
          <div className="details-fluid-stat-card">
            <span className="fluid-stat-label">TOTAL AMOUNT</span>
            <span className="fluid-stat-value">{selectedFarmland.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout Details */}
      <div className="details-fluid-bento-grid">
        
        {/* Section 1: Asset Details Card (Left side) */}
        <div className="details-fluid-bento-card">
          <div className="fluid-bento-header">
            <h3 className="fluid-bento-header-title">Asset Details</h3>
          </div>

          <div className="fluid-bento-body">
            <div className="fluid-bento-item">
              <span className="fluid-bento-label">FARMLAND ID</span>
              <span className="fluid-bento-value-primary">{selectedFarmland.id}</span>
            </div>

            <div className="fluid-bento-item">
              <span className="fluid-bento-label">ASSIGNED AGENT</span>
              <div className="fluid-bento-agent-row">
                <div className="fluid-bento-agent-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt={selectedFarmland.agentName}
                    className="fluid-bento-agent-avatar-img"
                  />
                </div>
                <span className="fluid-bento-agent-name">
                  {selectedFarmland.agentName}
                </span>
              </div>
            </div>

            <div className="fluid-bento-timestamp-row">
              <div className="fluid-bento-timestamp-item">
                <span className="fluid-bento-timestamp-label">CREATION TIME</span>
                <span className="fluid-bento-timestamp-value">{selectedFarmland.dateTime.split('|')[0] || "6th Oct, 12:53 PM"}</span>
              </div>
              <div className="fluid-bento-timestamp-item">
                <span className="fluid-bento-timestamp-label">LAST UPDATED</span>
                <span className="fluid-bento-timestamp-value">{"8th Oct, 09:15 AM"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Current Status Card (Right side) */}
        <div className="details-fluid-bento-card">
          <div className="fluid-bento-header">
            <h3 className="fluid-bento-header-title">Current Status</h3>
          </div>

          <div className="fluid-bento-body-status">
            <div className="fluid-bento-status-block">
              <div className="fluid-bento-status-text-stack">
                <span className="fluid-bento-status-label">SYSTEM STATUS</span>
                <span className="fluid-bento-status-value">Active</span>
              </div>
            </div>

            <div className="fluid-bento-status-block">
              <div className="fluid-bento-status-text-stack">
                <span className="fluid-bento-status-label">LIVE STATUS</span>
                <span className="fluid-bento-status-value">NA</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Actions Footer */}
      <div className="details-fluid-footer">
        <button
          onClick={handleBack}
          className="details-fluid-done-btn"
        >
          Done
        </button>
      </div>

    </div>
  );
};

export default VerificationOfficerCompletedFarmlandDetails;
