import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { cardsData } from '../data/requestedInfoData';

const RequestedInfoReason: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Robust matching for ID (handles 'GLCSOS 01' or 'glcsos-01')
  const selectedCard = cardsData.find(
    (card) =>
      card.id.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
      card.id.toLowerCase() === id?.toLowerCase()
  );

  const handleDone = () => {
    navigate(`/regional-officer/requested-info-details/${id}`);
  };

  return (
    <div className="rejection-reason-page animate-in fade-in duration-300">
      
      {/* Top Right Actions Block (Notification Bell & Profile Avatar) */}
      <div className="reason-top-header">
        <button className="bell-badge-btn">
          <Bell className="w-6 h-6 text-[#2C2C2C]" />
          <span className="bell-badge-dot"></span>
        </button>
        <div className="profile-badge-avatar-container">
          <img
            src={selectedCard?.agentAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
            alt="Profile Avatar"
            className="profile-badge-avatar-image"
          />
        </div>
      </div>

      {/* Main Centered Rejection Reason Card */}
      <div className="rejection-reason-card">
        
        {/* Card Header */}
        <div className="rejection-card-header">
          <h2 className="rejection-card-title">
            Returning Reason
          </h2>
        </div>

        {/* Card Body */}
        <div className="rejection-card-body">
          {/* Meta Info */}
          <div className="rejection-meta-info">
            <span className="rejection-meta-label">Returned by:</span>
            <span className="rejection-meta-value">Verification Officer Sravan</span>
          </div>

          {/* Reason Inset Box */}
          <div className="rejection-reason-content-box">
            <p className="rejection-paragraph-primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="rejection-paragraph-secondary">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="rejection-card-footer">
          <button
            onClick={handleDone}
            className="rejection-done-btn"
          >
            DONE
          </button>
        </div>

      </div>

    </div>
  );
};

export default RequestedInfoReason;
