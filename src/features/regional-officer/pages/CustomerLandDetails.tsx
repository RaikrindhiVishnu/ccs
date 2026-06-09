import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { farmlandsData } from '../data/farmlandsListData';
import { useViewportScale } from '@/hooks/useViewportScale';
import { getFarmlandDetails } from '@/data/farmlandDetailsDb';
import {
  CustomerStepper,
  CustomerLandDetailsForm
} from './customer-information';

const CustomerLandDetails: React.FC = () => {
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
    navigate(`/regional-officer/assigned-farmlands-family-tree/${targetId}`);
  };

  const handleDoneClick = () => {
    setShowSubmittedModal(true);
  };

  const handleStartSubmission = () => {
    setShowSubmittedModal(false);
    navigate(`/regional-officer/assigned-farmlands-land-boundaries/${targetId}`);
  };

  // State fields loaded dynamically from the data layer
  const details = getFarmlandDetails(selectedFarmland.title);
  const {
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
    satelliteMapUrl
  } = details.landDetails;

  const [showSubmittedModal, setShowSubmittedModal] = useState(false);

  return (
    <div className={`owner-details-responsive-outer-container${showSubmittedModal ? ' submit-form-no-scroll' : ''}`}>
      <div 
        className="owner-details-page-wrapper"
        style={{
          transform: `scale(${scale})`,
          marginBottom: `${(scale - 1) * 1080}px`,
          marginRight: `${(scale - 1) * 1440}px`,
        }}
      >
        {/* Go back to dashboard pill */}
        <div style={{
          position: 'absolute',
          width: '244px',
          height: '56px',
          left: '40px',
          top: '32px',
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.12))',
          zIndex: 10
        }}>
          <button
            onClick={() => navigate('/regional-officer/assigned-farmlands')}
            style={{
              width: '244px',
              height: '52px',
              background: '#FFFFFF',
              borderRadius: '60px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '19px 20px',
              gap: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" strokeWidth={1.5} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '18px',
              color: '#353535'
            }}>
              Go Back to Dashboard
            </span>
          </button>
        </div>

        {/* Top Right Profile Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '13.06px',
          position: 'absolute',
          width: '117.06px',
          height: '52px',
          left: 'calc(50% - 117.06px/2 + 621.53px)',
          top: '34px',
          zIndex: 10
        }}>
          {/* Bell Container */}
          <button style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px',
            gap: '10px',
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '40px',
            border: 'none',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <Bell className="w-6 h-6 text-[#2C2C2C]" strokeWidth={1.5} />
            <span style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              left: '32.5px',
              top: '12px',
              background: '#EF4646',
              borderRadius: '50%'
            }} />
          </button>

          {/* Avatar Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '72.5581px',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="User profile avatar"
              style={{
                width: '52px',
                height: '52px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* LEFT TOP CARD: Stepper Timeline */}
        <CustomerStepper farmlandTitle={selectedFarmland.title} targetId={targetId} />

        {/* RIGHT MAIN CARD: Customer Land Details Form */}
        <CustomerLandDetailsForm
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
          targetId={targetId}
          onBack={handleBack}
          onDoneClick={handleDoneClick}
        />

      </div>

      {/* Submitted popup modal (outside wrapper to center perfectly on screen viewport) */}
      {showSubmittedModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            boxSizing: 'border-box',
            position: 'relative',
            width: '610px',
            height: '477px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 0px 12.5px rgba(0, 0, 0, 0.15)',
            borderRadius: '24px',
            transform: `scale(${scale})`,
            transformOrigin: 'center'
          }}>
            {/* Title */}
            <span style={{
              position: 'absolute',
              width: '370px',
              height: '30px',
              left: 'calc(50% - 370px/2)',
              top: '32px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000'
            }}>
              Customer Information Submitted
            </span>

            {/* Verification Icon Container */}
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              left: 'calc(50% - 180px/2)',
              top: '85px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Outer seal (light blue tint) */}
              <svg width="180" height="180" viewBox="0 0 24 24" fill="rgba(39, 128, 196, 0.08)" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0, top: 0 }}>
                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z"/>
              </svg>

              {/* Inner seal (solid blue with white check) */}
              <div style={{
                position: 'absolute',
                width: '126px',
                height: '126px',
                left: '27px',
                top: '27px'
              }}>
                <svg width="126" height="126" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z" fill="#2780C4"/>
                  <path d="M10.09 16.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" fill="#FFFFFF"/>
                </svg>
              </div>
            </div>

            {/* Subtitle */}
            <span style={{
              position: 'absolute',
              width: '367px',
              height: '50px',
              left: 'calc(50% - 367px/2 + 0.5px)',
              top: '282px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#5C5E61'
            }}>
              Proceed With Land and Boundaries to Complete the Farmland Submission
            </span>

            {/* Start Submission Button */}
            <button 
              onClick={handleStartSubmission}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '17px',
                gap: '17px',
                position: 'absolute',
                width: '349px',
                height: '64px',
                left: 'calc(50% - 349px/2 + 0.5px)',
                top: '373px',
                background: '#2780C4',
                borderRadius: '56.1383px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '23.8163px',
                lineHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#FFFFFF'
              }}>
                Start Submission
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLandDetails;
