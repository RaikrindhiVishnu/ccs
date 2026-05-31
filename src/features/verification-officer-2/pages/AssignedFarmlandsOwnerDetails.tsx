import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Phone, Mail, CalendarDays, MapPin, BadgeCheck } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

export const VerificationOfficerAssignedFarmlandsOwnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);
  const targetId = id || "GLCSOS 01";
  const [activeTab, setActiveTab] = React.useState<'Owner Details' | 'Family Tree' | 'Land Details'>('Family Tree');
  const [completedTabs] = React.useState<string[]>(['Owner Details']);

  const handleBack = () => {
    navigate('/verification-officer-2/assigned-farmlands');
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
        {activeTab !== 'Family Tree' && (
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
        <div style={{
          position: 'absolute',
          height: '901px',
          left: '466px',
          right: '40px',
          top: '128px',
          background: '#FFFFFF',
          boxShadow: '0px 20px 40px rgba(0, 49, 50, 0.06)',
          borderRadius: '32px'
        }}>
          
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
                top: '129.5px', // centered vertically with Ramudu Kumar
                display: 'flex',
                alignItems: 'center',
                gap: '21px'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                  alt="Ramudu Kumar"
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
                  Ramudu Kumar
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
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Ramudu</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Last Name</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] py-[12px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Kumar</span>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-[48px] mb-[28px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Phone Number</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <Phone className="w-[14px] h-[14px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">+91-9123456789</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Email</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <Mail className="w-[15px] h-[12px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">ramudu@gmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-[48px] mb-[28px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Date of Birth</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center gap-[12px]">
                      <CalendarDays className="w-[14px] h-[15px] text-[#3D4949]" />
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">13/01/1986</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Religion</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Hindu</span>
                    </div>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-[48px]">
                  <div className="flex-1 flex flex-col gap-[8px]">
                    <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Gender</label>
                    <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-[16px] flex items-center">
                      <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">Male</span>
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
                  17.4835850, 78.3805050
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

            </div>
          )}
          
          {activeTab === 'Land Details' && (
            <div style={{ position: 'absolute', top: '129px', left: '48px', right: '48px', bottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <h3 className="font-plus-jakarta text-[#5A5C5E] text-[20px] font-semibold mb-[8px]">Land Details</h3>
               <p className="font-plus-jakarta text-[#94A3B8] text-[14px]">The land details will be displayed here.</p>
            </div>
          )}

          {/* Footer Actions */}
          <div style={{
            position: 'absolute',
            height: '68px',
            left: '56px',
            right: '48px',
            top: '763px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleBack}
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
                onClick={handleBack}
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
    </div>
  );
};

export default VerificationOfficerAssignedFarmlandsOwnerDetails;
