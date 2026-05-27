import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Check
} from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import { CustomerStepper } from './customer-information';

const FamilyTree: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);

  // Dynamic matching based on URL param
  const selectedFarmland = farmlandsData.find(
    (item) => item.id === id ||
      item.title.replace(/\s+/g, '-').toLowerCase() === id?.toLowerCase() ||
      item.title.replace(/\s+/g, '').toLowerCase() === id?.replace(/\s+/g, '').replace(/-/g, '').toLowerCase()
  ) || farmlandsData[0];

  const targetId = id || selectedFarmland.id.replace(/\s+/g, '-').toLowerCase();

  const handleBack = () => {
    navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`);
  };

  const handleNext = () => {
    navigate(`/regional-officer/assigned-farmlands-land-details/${targetId}`);
  };

  return (
    <div className="owner-details-responsive-outer-container">
      <div 
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1080}px`,
          marginRight: `${(scale - 1) * 1440}px`,
        }}
      >

      {/* Go back to dashboard pill */}
      <button
        onClick={() => navigate('/regional-officer/assigned-farmlands')}
        className="owner-details-back-pill-btn"
      >
        <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
        <span className="owner-details-back-pill-text">
          Go back to dashboard
        </span>
      </button>

      {/* LEFT TOP CARD: Farmland ID & Progress Timeline */}
      <CustomerStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

      {/* RIGHT MAIN CARD: Central Card */}
      <div className="owner-details-central-card family-tree-card">

        {/* Top Horizontal Tab Bar */}
        <div className="owner-details-tab-bar">
          {/* Tab 1 */}
          <div
            onClick={() => navigate(`/regional-officer/assigned-farmlands-upload/${targetId}`)}
            className="owner-details-tab tab-1 inactive"
          >
            <span className="owner-details-tab-text">Owner Details</span>
            <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
              <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
          </div>

          {/* Tab 2 */}
          <div
            onClick={() => navigate(`/regional-officer/assigned-farmlands-family-tree/${targetId}`)}
            className="owner-details-tab active tab-2"
          >
            <span className="owner-details-tab-text active">Family Tree</span>
            <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
              <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
          </div>

          {/* Tab 3 */}
          <div 
            onClick={() => navigate(`/regional-officer/assigned-farmlands-land-details/${targetId}`)}
            className="owner-details-tab tab-3"
          >
            <span className="owner-details-tab-text">Land Details</span>
            <div className="relative w-4.5 h-4.5 flex items-center justify-center shrink-0">
              <BadgeCheck className="w-4.5 h-4.5 text-[#3D93D1]" fill="#3D93D1" />
              <Check className="absolute w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
          </div>
        </div>

        {/* Dynamic Family Tree Diagram */}
        <div className="family-tree-diagram-container">

          {/* SVG Connector Layer */}
          <svg className="family-tree-svg-connectors">
            {/* Smooth elegant curved connection path to Father Vikram Mehta */}
            <path 
              d="M 419 202 L 419 215 C 419 238, 380 252, 330 252 L 180 252 C 133 252, 133 265, 133 302" 
              fill="none" 
              stroke="#E2E2E6" 
              strokeWidth="2" 
            />
            
            {/* Smooth elegant curved connection path to Mother Sushila Mehta */}
            <path 
              d="M 419 202 L 419 215 C 419 238, 458 252, 508 252 L 658 252 C 705 252, 705 265, 705 302" 
              fill="none" 
              stroke="#E2E2E6" 
              strokeWidth="2" 
            />
            
            {/* Straight vertical drop line to Spouse Priya Mehta */}
            <line x1="419" y1="202" x2="419" y2="302" stroke="#E2E2E6" strokeWidth="2" />
            
            {/* Straight vertical drop line from Spouse to Daughter Ananya */}
            <line x1="419" y1="374" x2="419" y2="462" stroke="#E2E2E6" strokeWidth="2" />
          </svg>

          {/* absolute positioned connection pill labels */}
          <div className="family-tree-connector-pill father-pill" style={{ left: '243px', top: '241px' }}>
            FATHER
          </div>
          <div className="family-tree-connector-pill spouse-pill" style={{ left: '394px', top: '257px' }}>
            SPOUSE
          </div>
          <div className="family-tree-connector-pill mother-pill" style={{ left: '529px', top: '241px' }}>
            MOTHER
          </div>
          <div className="family-tree-connector-pill daughter-pill" style={{ left: '388px', top: '417px' }}>
            DAUGHTER
          </div>

          {/* LEVEL 1: Active Owner Card */}
          <div className="family-tree-node-owner" style={{ left: '311px', top: '70px' }}>
            <div className="family-tree-owner-avatar-wrapper">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Arjun Mehta Active Owner Profile"
                className="family-tree-owner-avatar"
              />
              <span className="family-tree-owner-badge">OWNER</span>
            </div>
            <h3 className="family-tree-owner-name">Arjun Mehta</h3>
            <span className="family-tree-owner-details">Male, 42 yrs</span>
          </div>

          {/* LEVEL 2: Relatives Cards */}
          {/* Father Node Card */}
          <div className="family-tree-relative-card" style={{ left: '40px', top: '302px' }}>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
              alt="Vikram Mehta Profile"
              className="family-tree-relative-avatar"
            />
            <div className="family-tree-relative-info">
              <h4 className="family-tree-relative-name">Vikram Mehta</h4>
              <span className="family-tree-relative-meta">Male, 72 yrs</span>
            </div>
          </div>

          {/* Spouse Node Card */}
          <div className="family-tree-relative-card" style={{ left: '326px', top: '302px' }}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Priya Mehta Profile"
              className="family-tree-relative-avatar"
            />
            <div className="family-tree-relative-info">
              <h4 className="family-tree-relative-name">Priya Mehta</h4>
              <span className="family-tree-relative-meta">Female, 40 yrs</span>
            </div>
          </div>

          {/* Mother Node Card */}
          <div className="family-tree-relative-card" style={{ left: '612px', top: '302px' }}>
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80"
              alt="Sushila Mehta Profile"
              className="family-tree-relative-avatar"
            />
            <div className="family-tree-relative-info">
              <h4 className="family-tree-relative-name">Sushila Mehta</h4>
              <span className="family-tree-relative-meta">Female, 68 yrs</span>
            </div>
          </div>

          {/* LEVEL 3: Child Cards */}
          {/* Daughter Node Card */}
          <div className="family-tree-relative-card" style={{ left: '326px', top: '462px' }}>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="Ananya Mehta Profile"
              className="family-tree-relative-avatar"
            />
            <div className="family-tree-relative-info">
              <h4 className="family-tree-relative-name">Ananya Mehta</h4>
              <span className="family-tree-relative-meta">Female, 12 yrs</span>
            </div>
          </div>

        </div>

        {/* Footer Actions Wrapper */}
        <div className="owner-details-footer-actions family-tree-footer">
          <div className="owner-details-footer-btns-group">
            <button
              onClick={handleBack}
              className="owner-details-btn-back"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="owner-details-btn-next"
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
};

export default FamilyTree;
