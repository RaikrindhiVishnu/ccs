import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Phone, Mail, CalendarDays, MapPin, BadgeCheck, X } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';
import { getFarmlandDetails } from '@/data/farmlandDetailsDb';
import { LandDetailsContent } from '@/components/ui/LandDetailsContent';

export const VerificationOfficerAssignedFarmlandsOwnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);
  const targetId = id || "GLCSOS 01";
  const [activeTab, setActiveTab] = React.useState<'Owner Details' | 'Family Tree' | 'Land Details'>('Owner Details');
  const [completedTabs, setCompletedTabs] = React.useState<string[]>([]);
  const [showApproveModal, setShowApproveModal] = React.useState(false);
  const [showTurnbackModal, setShowTurnbackModal] = React.useState(false);
  const [turnbackReason, setTurnbackReason] = React.useState('');

  const details = getFarmlandDetails(targetId);
  const { ownerDetails, familyTree, landDetails } = details;

  const handleBack = () => {
    navigate('/verification-officer-2/assigned-farmlands');
  };

  React.useEffect(() => {
    localStorage.removeItem(`vo2_status_${targetId}_customer`);
    localStorage.removeItem(`vo2_status_${targetId}_boundaries`);
    localStorage.removeItem(`vo2_status_${targetId}_valuation`);
    localStorage.removeItem(`vo2_status_${targetId}_agriculture`);
  }, [targetId]);

  const handleProceed = () => {
    localStorage.setItem(`vo2_status_${targetId}_customer`, 'approved');
    navigate(`/verification-officer-2/assigned-farmlands-land-boundaries/${targetId}`);
  };

  const handleApproveClick = () => {
    if (activeTab === 'Owner Details') {
      if (!completedTabs.includes('Owner Details')) {
        setCompletedTabs([...completedTabs, 'Owner Details']);
      }
      setActiveTab('Family Tree');
    } else if (activeTab === 'Family Tree') {
      if (!completedTabs.includes('Family Tree')) {
        setCompletedTabs([...completedTabs, 'Family Tree']);
      }
      setActiveTab('Land Details');
    } else {
      if (!completedTabs.includes('Land Details')) {
        setCompletedTabs([...completedTabs, 'Land Details']);
      }
      setShowApproveModal(true);
    }
  };

  const handleTurnBack = () => {
    setShowTurnbackModal(true);
  };

  const confirmTurnBack = () => {
    setShowTurnbackModal(false);
    if (activeTab === 'Owner Details') {
      setActiveTab('Family Tree');
    } else if (activeTab === 'Family Tree') {
      setActiveTab('Land Details');
    } else {
      localStorage.setItem(`vo2_status_${targetId}_customer`, 'turnedback');
      navigate(`/verification-officer-2/assigned-farmlands-land-boundaries/${targetId}`);
    }
  };

  return (
    <div 
      className="bg-[#F2F2F2] min-h-screen relative flex justify-center overflow-hidden"
    >
      <div 
        style={{
          width: '1440px',
          height: '1065px',
          position: 'relative',
          background: '#F2F2F2',
          borderRadius: '32px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(scale - 1) * 1065}px`
        }}
      >
        {/* Top Header - Back Button */}
        <div style={{
          position: 'absolute',
          width: '240px',
          height: '52px',
          left: '72px',
          top: '36px',
          filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.12))'
        }}>
          <button
            onClick={handleBack}
            style={{
              width: '240px',
              height: '52px',
              background: '#FFFFFF',
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              padding: '19px 20px',
              gap: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '110%',
              color: '#353535'
            }}>
              Go back to dashboard
            </span>
          </button>
        </div>

        {/* Top Header - Bell & Avatar */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '13px',
          position: 'absolute',
          width: '117px',
          height: '52px',
          left: 'calc(50% - 117px/2 + 621.5px)',
          top: '34px'
        }}>
          <button style={{
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <Bell className="w-6 h-6 text-[#2C2C2C]" />
          </button>
          <div style={{
            width: '52px',
            height: '52px',
            background: '#FFFFFF',
            borderRadius: '72px',
            overflow: 'hidden'
          }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* LEFT COLUMN */}
        {/* Stepper Card */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '40px',
          width: '410px',
          top: '130px',
          background: '#FFFFFF',
          borderRadius: '24px'
        }}>
          <span style={{
            position: 'absolute',
            width: '96px',
            height: '20px',
            left: '30px',
            top: '30px',
            fontFamily: "'Plus Jakarta Sans'",
            fontWeight: 500,
            fontSize: '16px',
            color: '#000000'
          }}>
            Farmland ID:
          </span>
          <span style={{
            position: 'absolute',
            left: '30px',
            top: '60px',
            fontFamily: "'Plus Jakarta Sans'",
            fontWeight: 500,
            fontSize: '35px',
            color: '#000000'
          }}>
            {targetId}
          </span>

          {/* Stepper Line */}
          <div style={{
            position: 'absolute',
            width: '244px',
            height: '0px',
            left: '110px',
            top: '136px',
            border: '1px solid rgba(0, 120, 250, 0.25)',
            transform: 'rotate(90deg)',
            transformOrigin: 'top left'
          }} />

          {/* Steps */}
          <div style={{ position: 'absolute', left: '120px', top: '130px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 0px 32px 24px', gap: '4px', width: '173px', height: '68px', boxSizing: 'content-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', width: '182px', height: '36px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '173px', height: '36px' }}>CUSTOMER INFORMATION</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '120px', top: '219px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 0px 4px 24px', gap: '4px', width: '173px', height: '22px', boxSizing: 'content-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', width: '149px', height: '18px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans'", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '149px', height: '18px' }}>LAND & BOUNDARIES</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '299px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', height: '18px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '81px', height: '18px' }}>VALUATION</span>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '377px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans'", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', height: '36px', width: '118px' }}>AGRICULTURE &<br/>REPORT</span>
          </div>

          {/* Step Dots (Exclamation in Circle) */}
          {[136, 218, 296, 374].map((top, index) => (
            <div key={index} style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: '98px',
              top: `${top}px`,
              background: '#FFFFFF',
              border: '0.2px solid rgba(0, 0, 0, 0.15)',
              borderRadius: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                background: '#FFBC8A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>!</div>
            </div>
          ))}
        </div>

        {/* Location of Land Card */}
        {activeTab === 'Owner Details' && (
          <div style={{
            position: 'absolute',
            height: '443px',
            left: '42px',
            width: '410px',
            top: '586px',
            background: '#FFFFFF',
            borderRadius: '24px'
          }}>
            <span style={{
              position: 'absolute',
              left: '24px',
              top: '30px',
              fontFamily: "'Plus Jakarta Sans'",
              fontWeight: 500,
              fontSize: '24px',
              color: '#000000'
            }}>
              Location of land
            </span>
            <div style={{
              position: 'absolute',
              left: '24px',
              top: '84px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <MapPin className="text-blue-500 w-[15px] h-[22px]" />
              <span style={{
                fontFamily: "'Poppins'",
                fontWeight: 500,
                fontSize: '16px',
                textDecorationLine: 'underline',
                color: '#1D7ABE'
              }}>
                17.4835850, 78.3805050
              </span>
            </div>
            {/* Map Image */}
            <div style={{
              position: 'absolute',
              width: '362px',
              height: '285px',
              left: '24px',
              top: '134px',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* CENTRAL MAIN CONTENT */}
        <div 
          className={`owner-details-central-card ${activeTab === 'Land Details' ? 'land-details-card' : ''}`}
          style={{
            position: 'absolute',
            height: activeTab === 'Land Details' ? '928px' : '901px',
            left: '466px',
            right: '40px',
            top: activeTab === 'Land Details' ? '133px' : '128px',
            background: '#FFFFFF',
            boxShadow: '0px 20px 40px rgba(0, 49, 50, 0.06)',
            borderRadius: '32px'
          }}
        >
          
          {/* Top Tabs */}
          <div className="owner-details-tab-bar" style={{
            position: 'absolute',
            width: '628px',
            height: '41px',
            left: 'calc(50% - 628px/2)',
            top: '40px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            zIndex: 10
          }}>
            {/* Tab 1: Owner Details */}
            <div
              onClick={() => setActiveTab('Owner Details')}
              className={`owner-details-tab tab-1 ${activeTab === 'Owner Details' ? 'active' : 'inactive'}`}
              style={{ cursor: 'pointer' }}
            >
              {completedTabs.includes('Owner Details') ? (
                <>
                  <span className={`owner-details-tab-text ${activeTab === 'Owner Details' ? 'active' : ''}`}>Owner Details</span>
                  <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                    <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                  <span className={`owner-details-tab-text ${activeTab === 'Owner Details' ? 'active' : ''}`}>Owner Details</span>
                </>
              )}
            </div>

            {/* Tab 2: Family Tree */}
            <div
              onClick={() => setActiveTab('Family Tree')}
              className={`owner-details-tab tab-2 ${activeTab === 'Family Tree' ? 'active' : 'inactive'}`}
              style={{ cursor: 'pointer' }}
            >
              {completedTabs.includes('Family Tree') ? (
                <>
                  <span className={`owner-details-tab-text ${activeTab === 'Family Tree' ? 'active' : ''}`}>Family Tree</span>
                  <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                    <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                  <span className={`owner-details-tab-text ${activeTab === 'Family Tree' ? 'active' : ''}`}>Family Tree</span>
                </>
              )}
            </div>

            {/* Tab 3: Land Details */}
            <div 
              onClick={() => setActiveTab('Land Details')}
              className={`owner-details-tab tab-3 ${activeTab === 'Land Details' ? 'active' : 'inactive'}`}
              style={{ cursor: 'pointer' }}
            >
              {completedTabs.includes('Land Details') ? (
                <>
                  <span className={`owner-details-tab-text ${activeTab === 'Land Details' ? 'active' : ''}`}>Land Details</span>
                  <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                    <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                  <span className={`owner-details-tab-text ${activeTab === 'Land Details' ? 'active' : ''}`}>Land Details</span>
                </>
              )}
            </div>
          </div>

          {activeTab === 'Owner Details' && (
            <>
              {/* Profile Header (Avatar + Name) */}
              <div style={{
                position: 'absolute',
                left: '48px',
                top: '129.5px', // centered vertically with name
                display: 'flex',
                alignItems: 'center',
                gap: '21px'
              }}>
                <img
                  src={ownerDetails.avatarUrl}
                  alt={`${ownerDetails.firstName} ${ownerDetails.lastName}`}
                  style={{
                    width: '82px',
                    height: '82px',
                    border: '4px solid #F9F9FB',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '9999px',
                    objectFit: 'cover'
                  }}
                />
                <span style={{
                  fontFamily: "'Manrope'",
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#1A1C1D'
                }}>
                  {ownerDetails.firstName} {ownerDetails.lastName}
                </span>
              </div>

              {/* Form Grid */}
              <div style={{
                position: 'absolute',
                left: '48px',
                right: '48px',
                top: '258px', // adjusted to match layout flow
                height: '408px',
              }}>
                {/* Row 1 */}
                <div className="flex gap-[48px] mb-[28px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">First Name</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] py-[12px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.firstName}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Last Name</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] py-[12px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.lastName}</span>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-[48px] mb-[28px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Phone Number</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <Phone className="w-[14px] h-[14px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.phoneNumber}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Email</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <Mail className="w-[15px] h-[12px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.email}</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-[48px] mb-[28px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Date of Birth</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <CalendarDays className="w-[14px] h-[15px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.dob}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Religion</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.religion}</span>
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-[48px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Gender</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.gender}</span>
                    </div>
                  </div>
                  <div className="flex-1"></div> {/* Empty space for grid alignment */}
                </div>
              </div>

              {/* Google Location Link */}
              <div style={{
                position: 'absolute',
                left: '48px',
                top: '694px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '16px', color: '#000000' }}>Google Location of Land</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 500, fontSize: '16px', textDecorationLine: 'underline', color: '#1D7ABE' }}>
                  {ownerDetails.locationCoords}
                </span>
              </div>
            </>
          )}

          {activeTab === 'Family Tree' && (
            <div style={{ position: 'absolute', top: '-20px', left: '48px', right: '0px', bottom: '100px' }}>
              
              {/* Dynamic Family Tree Diagram */}
              <div className="family-tree-diagram-container" style={{ position: 'relative', width: '100%', height: '100%', margin: 0, padding: 0 }}>

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
                      src={familyTree.owner.avatar}
                      alt={`${familyTree.owner.name} Active Owner Profile`}
                      className="family-tree-owner-avatar"
                    />
                    <span className="family-tree-owner-badge">OWNER</span>
                  </div>
                  <h3 className="family-tree-owner-name">{familyTree.owner.name}</h3>
                  <span className="family-tree-owner-details">{familyTree.owner.info}</span>
                </div>

                {/* LEVEL 2: Relatives Cards */}
                {/* Father Node Card */}
                <div className="family-tree-relative-card" style={{ left: '40px', top: '302px' }}>
                  <img
                    src={familyTree.father.avatar}
                    alt={`${familyTree.father.name} Profile`}
                    className="family-tree-relative-avatar"
                  />
                  <div className="family-tree-relative-info">
                    <h4 className="family-tree-relative-name">{familyTree.father.name}</h4>
                    <span className="family-tree-relative-meta">{familyTree.father.info}</span>
                  </div>
                </div>

                {/* Spouse Node Card */}
                <div className="family-tree-relative-card" style={{ left: '326px', top: '302px' }}>
                  <img
                    src={familyTree.spouse.avatar}
                    alt={`${familyTree.spouse.name} Profile`}
                    className="family-tree-relative-avatar"
                  />
                  <div className="family-tree-relative-info">
                    <h4 className="family-tree-relative-name">{familyTree.spouse.name}</h4>
                    <span className="family-tree-relative-meta">{familyTree.spouse.info}</span>
                  </div>
                </div>

                {/* Mother Node Card */}
                <div className="family-tree-relative-card" style={{ left: '612px', top: '302px' }}>
                  <img
                    src={familyTree.mother.avatar}
                    alt={`${familyTree.mother.name} Profile`}
                    className="family-tree-relative-avatar"
                  />
                  <div className="family-tree-relative-info">
                    <h4 className="family-tree-relative-name">{familyTree.mother.name}</h4>
                    <span className="family-tree-relative-meta">{familyTree.mother.info}</span>
                  </div>
                </div>

                {/* LEVEL 3: Child Cards */}
                {/* Daughter Node Card */}
                <div className="family-tree-relative-card" style={{ left: '326px', top: '462px' }}>
                  <img
                    src={familyTree.daughter.avatar}
                    alt={`${familyTree.daughter.name} Profile`}
                    className="family-tree-relative-avatar"
                  />
                  <div className="family-tree-relative-info">
                    <h4 className="family-tree-relative-name">{familyTree.daughter.name}</h4>
                    <span className="family-tree-relative-meta">{familyTree.daughter.info}</span>
                  </div>
                </div>

              </div>

            </div>
          )}
          
          {activeTab === 'Land Details' && (
            <LandDetailsContent
              stateName={landDetails.stateName}
              district={landDetails.district}
              areaCityTown={landDetails.areaCityTown}
              acquisitionCategory={landDetails.acquisitionCategory}
              agentName={landDetails.agentName}
              landConversion={landDetails.landConversion}
              valueForArea={landDetails.valueForArea}
              agentReferralLocation={landDetails.agentReferralLocation}
              geoCoords={landDetails.geoCoords}
              geoSubText={landDetails.geoSubText}
              aerialImageUrl={landDetails.aerialImageUrl}
              satelliteMapUrl={landDetails.satelliteMapUrl}
            />
          )}

          {/* Footer Actions */}
          <div style={{
            position: 'absolute',
            height: '68px',
            left: '56px',
            right: '48px',
            top: activeTab === 'Land Details' ? '836px' : '763px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleTurnBack}
                style={{
                  width: '121px',
                  height: '38px',
                  border: '1px solid rgba(0, 0, 0, 0.27)',
                  borderRadius: '33px',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 500, fontSize: '14px', color: 'rgba(0, 0, 0, 0.8)' }}>
                  Turn Back
                </span>
              </button>
              <button 
                onClick={handleApproveClick}
                style={{
                  width: '121px',
                  height: '38px',
                  background: '#2780C4',
                  borderRadius: '33px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: '14px', color: '#FFFFFF' }}>
                  Approve
                </span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {showApproveModal && (
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
              width: '256px',
              height: '30px',
              left: 'calc(50% - 256px/2)',
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
              Customer Information
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

            {/* Description */}
            <span style={{
              position: 'absolute',
              width: '428px',
              height: '75px',
              left: 'calc(50% - 428px/2)',
              top: '267px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#3D4949'
            }}>
              Proceed With ‘Land And Boundaries’ Approval For The Farmland ID: {targetId} to Complete The Verification.
            </span>

            <button 
              onClick={handleProceed}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '17px',
                gap: '17px',
                position: 'absolute',
                width: '204px',
                height: '64px',
                left: 'calc(50% - 204px/2)',
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
                Proceed
              </span>
            </button>
          </div>
        </div>
      )}

      {showTurnbackModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#F9F9F9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          {/* Top Right Profile Header inside full page background */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '13.06px',
            position: 'absolute',
            width: '117.06px',
            height: '52px',
            right: '40px',
            top: '34px',
            zIndex: 100000
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="User profile avatar"
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Rejection Reason Card */}
          <div style={{
            boxSizing: 'border-box',
            position: 'relative',
            width: '672px',
            height: '433px',
            background: '#FFFFFF',
            boxShadow: '0px 20px 40px rgba(0, 49, 50, 0.06)',
            borderRadius: '32px',
            transform: `scale(${scale})`,
            transformOrigin: 'center'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 32px',
              height: '80px',
              boxSizing: 'border-box',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '-0.6px',
                color: '#1A1C1D'
              }}>
                Turnback
              </span>
              <button 
                onClick={() => setShowTurnbackModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X className="w-[30px] h-[30px] text-black" strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              gap: '12px',
              boxSizing: 'border-box'
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#3D4949'
              }}>
                Provide the reason for turnback:
              </span>
              
              <div style={{
                boxSizing: 'border-box',
                width: '608px',
                height: '200px',
                background: '#F3F3F5',
                border: '1px solid #BCC9C9',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <textarea
                  value={turnbackReason}
                  onChange={(e) => setTurnbackReason(e.target.value)}
                  placeholder="Start writing here..."
                  style={{
                    width: '100%',
                    height: '100%',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '26px',
                    color: '#1A1C1D',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '12px',
              position: 'absolute',
              width: '254px',
              height: '38px',
              left: '386px',
              top: '360px'
            }}>
              <button 
                onClick={() => setShowTurnbackModal(false)}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                  width: '121px',
                  height: '38px',
                  border: '1px solid rgba(0, 0, 0, 0.27)',
                  borderRadius: '33px',
                  background: 'transparent',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.8)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmTurnBack}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px',
                  width: '121px',
                  height: '38px',
                  background: '#2780C4',
                  borderRadius: '33px',
                  border: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                Turnback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationOfficerAssignedFarmlandsOwnerDetails;
