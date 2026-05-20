import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { cardsData } from '../data/requestedInfoData';

const RequestedInfoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Robust matching for ID (handles 'GLCSOS 01' or 'glcsos-01')
  const selectedCard = cardsData.find(
    (card) =>
      card.id.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
      card.id.toLowerCase() === id?.toLowerCase()
  );

  if (!selectedCard) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center font-plus-jakarta p-6">
        <h2 className="text-xl font-bold text-red-600">Asset Card not found</h2>
        <button
          onClick={() => navigate('/regional-officer/requested-info')}
          className="mt-4 px-6 py-2 bg-[#2780C4] text-white rounded-full font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col font-plus-jakarta px-8 py-8 items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1407px] requested-info-container animate-in fade-in duration-300">
        {/* Go back to dashboard Button */}
        <button
          onClick={() => navigate('/regional-officer/requested-info')}
          className="back-dashboard-btn"
        >
          <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
          <span className="back-dashboard-btn-text">
            Go back to dashboard
          </span>
        </button>

        {/* Workbench Layout */}
        <div className="workbench-layout">
          {/* Main Content Card (Center 50% equivalent) */}
          <div className="executive-summary-card">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              <h2 className="text-[24px] font-extrabold text-[#131600] tracking-[-0.6px] leading-tight">
                Asset Executive Summary
              </h2>
              {/* Status Badge */}
              <div className="status-badge-returned">
                <span className="status-badge-dot"></span>
                <span className="status-badge-text">
                  RETURNED FOR INFORMATION
                </span>
              </div>
            </div>

            {/* Identity Badge */}
            <div className="agent-identity-badge">
              <img
                src={selectedCard.agentAvatar}
                alt={selectedCard.agentName}
                className="agent-avatar-large"
              />
              <div className="flex flex-col gap-1">
                <h3 className="agent-name-heading">
                  {selectedCard.agentName}
                </h3>
                <a
                  href={`mailto:${selectedCard.agentEmail}`}
                  className="agent-email-link"
                >
                  <Mail className="w-4 h-4 text-[#00629E]" />
                  {selectedCard.agentEmail}
                </a>
              </div>
            </div>

            {/* Inset Ledger Grid */}
            <div className="ledger-grid">
              
              {/* Area Card */}
              <div className="ledger-card">
                <span className="ledger-card-label">
                  AREA
                </span>
                <span className="ledger-card-value">
                  {selectedCard.area}
                </span>
              </div>

              {/* Total Valuation Card */}
              <div className="ledger-card">
                <span className="ledger-card-label">
                  TOTAL VALUATION
                </span>
                <span className="ledger-card-value">
                  {selectedCard.valuation}
                </span>
              </div>

              {/* Location Card (span 2 on md) */}
              <div className="ledger-card ledger-card-full">
                <span className="ledger-card-label">
                  LOCATION
                </span>
                <div className="ledger-card-location-wrapper">
                  <MapPin className="w-5 h-5 text-[#00629E] shrink-0" />
                  <span className="ledger-card-value">
                    {selectedCard.location}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Actions Side Card (Right 25%) */}
          <div className="actions-card">
            
            <div className="flex flex-col gap-6 w-full">
              <h3 className="actions-card-title">
                Actions
              </h3>
              
              <div className="actions-buttons-container">
                {/* EDIT Button */}
                <button
                  onClick={() => alert(`Initiating edit protocol for ${selectedCard.id}`)}
                  className="action-btn-primary"
                >
                  EDIT
                </button>

                {/* VIEW REASON Button */}
                <button
                  onClick={() => navigate(`/regional-officer/requested-info-reason/${selectedCard.id.replace(/\s+/g, '-').toLowerCase()}`)}
                  className="action-btn-secondary"
                >
                  VIEW REASON
                </button>
              </div>
            </div>

            {/* Bottom note */}
            <div className="actions-card-footer-text">
              Review the returned documents carefully before resubmitting for Phase 2 clearing.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedInfoDetails;
