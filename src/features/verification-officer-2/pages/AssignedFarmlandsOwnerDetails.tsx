import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Phone, Mail, CalendarDays, MapPin, BadgeCheck, X } from 'lucide-react';
import { getFarmlandDetails } from '@/data/farmlandDetailsDb';
import { LandDetailsContent } from '@/components/ui/LandDetailsContent';

export const VerificationOfficerAssignedFarmlandsOwnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    <div className="bg-[#F2F2F2] min-h-screen flex flex-col items-center p-4 md:p-8 overflow-x-hidden font-inter">
      <div className="w-full w-full lg:max-w-[1440px] flex flex-col gap-6 relative">
        
        {/* Header Container */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full z-10 gap-4">
          <button
            onClick={handleBack}
            className="bg-white rounded-[60px] flex flex-row items-center px-5 py-[15px] gap-2 shadow-sm shrink-0 border-none cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" strokeWidth={1.5} />
            <span className="font-inter font-normal text-[16px] leading-[110%] text-[#353535]">
              Go back to dashboard
            </span>
          </button>

          {/* Top Right Profile Header */}
          <div className="flex flex-row items-center gap-[13px]">
            <button className="flex flex-row justify-center items-center w-[52px] h-[52px] bg-white rounded-[40px] relative shadow-sm border-none cursor-pointer">
              <Bell className="w-6 h-6 text-[#2C2C2C]" />
            </button>
            <div className="flex flex-row justify-center items-center w-[52px] h-[52px] bg-white rounded-full overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row w-full gap-6 items-start">
          
          {/* Left Column (Stepper & Location Map) */}
          <div className="flex flex-col gap-6 w-full lg:w-[410px] shrink-0">
            {/* Stepper Card */}
            <div className="w-full bg-white rounded-[24px] p-8 flex flex-col relative min-h-[443px]">
              <div className="flex flex-col gap-1 mb-8">
                <span className="font-plus-jakarta font-medium text-[16px] text-black">Farmland ID:</span>
                <span className="font-plus-jakarta font-medium text-[35px] text-black">{targetId}</span>
              </div>

              <div className="relative flex flex-col gap-10 pl-[80px]">
                {/* Vertical Line */}
                <div className="absolute left-[62px] top-[24px] bottom-[24px] w-[1px] border-l border-[#0078FA] opacity-25"></div>

                {/* Step 1 (Active) */}
                <div className="relative flex items-center h-[36px]">
                  <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                    <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                  </div>
                  <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase w-[173px]">CUSTOMER INFORMATION</span>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center h-[36px]">
                  <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                    <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                  </div>
                  <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase opacity-50 w-[173px]">LAND & BOUNDARIES</span>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center h-[36px]">
                  <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                    <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                  </div>
                  <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase opacity-50 w-[173px]">VALUATION</span>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center h-[36px]">
                  <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                    <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                  </div>
                  <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase opacity-50 w-[173px]">AGRICULTURE &<br/>REPORT</span>
                </div>
              </div>
            </div>

            {/* Location Map Card (Only shown in Owner Details tab) */}
            {activeTab === 'Owner Details' && (
              <div className="w-full bg-white rounded-[24px] p-6 flex flex-col gap-4 min-h-[443px]">
                <span className="font-plus-jakarta font-medium text-[24px] text-black">Location of land</span>
                <div className="flex items-center gap-[10px]">
                  <MapPin className="text-[#3b82f6] w-[15px] h-[22px]" />
                  <span className="font-poppins font-medium text-[16px] underline text-[#1D7ABE]">17.4835850, 78.3805050</span>
                </div>
                <div className="w-full h-auto lg:h-[285px] rounded-[24px] overflow-hidden mt-2">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80" alt="Map" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Main Tab Content) */}
          <div className="flex-1 w-full bg-white rounded-[32px] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] min-h-[901px] flex flex-col relative overflow-hidden">
            
            {/* Top Tabs */}
            <div className="w-full flex justify-center py-10 px-4 shrink-0">
              <div className="flex flex-wrap gap-5 justify-center">
                
                {/* Tab 1 */}
                <div
                  onClick={() => setActiveTab('Owner Details')}
                  className={`flex items-center justify-center h-[41px] px-6 gap-[9px] rounded-[33px] cursor-pointer ${activeTab === 'Owner Details' ? 'bg-[#DFF1FF]' : 'bg-transparent'}`}
                >
                  {completedTabs.includes('Owner Details') ? (
                    <>
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Owner Details' ? 'text-[#2780C4]' : 'text-black/50'}`}>Owner Details</span>
                      <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                        <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Owner Details' ? 'text-[#2780C4]' : 'text-black/50'}`}>Owner Details</span>
                    </>
                  )}
                </div>

                {/* Tab 2 */}
                <div
                  onClick={() => setActiveTab('Family Tree')}
                  className={`flex items-center justify-center h-[41px] px-6 gap-[9px] rounded-[33px] cursor-pointer ${activeTab === 'Family Tree' ? 'bg-[#DFF1FF]' : 'bg-transparent'}`}
                >
                  {completedTabs.includes('Family Tree') ? (
                    <>
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Family Tree' ? 'text-[#2780C4]' : 'text-black/50'}`}>Family Tree</span>
                      <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                        <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Family Tree' ? 'text-[#2780C4]' : 'text-black/50'}`}>Family Tree</span>
                    </>
                  )}
                </div>

                {/* Tab 3 */}
                <div
                  onClick={() => setActiveTab('Land Details')}
                  className={`flex items-center justify-center h-[41px] px-6 gap-[9px] rounded-[33px] cursor-pointer ${activeTab === 'Land Details' ? 'bg-[#DFF1FF]' : 'bg-transparent'}`}
                >
                  {completedTabs.includes('Land Details') ? (
                    <>
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Land Details' ? 'text-[#2780C4]' : 'text-black/50'}`}>Land Details</span>
                      <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                        <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[10px] h-[10px] rounded-full bg-[#3D93D1] shrink-0" />
                      <span className={`font-plus-jakarta font-semibold text-[14px] ${activeTab === 'Land Details' ? 'text-[#2780C4]' : 'text-black/50'}`}>Land Details</span>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 flex flex-col w-full">
              {activeTab === 'Owner Details' && (
                <div className="flex flex-col w-full px-6 lg:px-12 py-4 gap-[40px] flex-1">
                  
                  {/* Profile Info */}
                  <div className="flex items-center gap-[21px]">
                    <img src={ownerDetails.avatarUrl} alt="Owner Avatar" className="w-[82px] h-[82px] rounded-full border-[4px] border-[#F9F9FB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] object-cover" />
                    <span className="font-manrope font-bold text-[24px] text-[#1A1C1D]">{ownerDetails.firstName} {ownerDetails.lastName}</span>
                  </div>

                  {/* Form Grid */}
                  <div className="flex flex-col gap-7 w-full">
                    {/* Row 1 */}
                    <div className="flex flex-col md:flex-row gap-7 w-full">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">First Name</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center"><span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.firstName}</span></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Last Name</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center"><span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.lastName}</span></div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col md:flex-row gap-7 w-full">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Phone Number</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center gap-3">
                          <Phone className="w-3.5 h-3.5 text-[#3D4949]" />
                          <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.phoneNumber}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Email</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center gap-3">
                          <Mail className="w-[15px] h-[12px] text-[#3D4949]" />
                          <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex flex-col md:flex-row gap-7 w-full">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Date of Birth</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center gap-3">
                          <CalendarDays className="w-3.5 h-[15px] text-[#3D4949]" />
                          <span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.dob}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Religion</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center"><span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.religion}</span></div>
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="flex flex-col md:flex-row gap-7 w-full">
                      <div className="flex-1 flex flex-col gap-2">
                        <label className="font-plus-jakarta font-semibold text-[14px] text-[#3D4949] tracking-[0.35px]">Gender</label>
                        <div className="w-full h-[50px] bg-[#F3F3F5] rounded-[24px] px-4 flex items-center"><span className="font-plus-jakarta text-[16px] text-[#1A1C1D]">{ownerDetails.gender}</span></div>
                      </div>
                      <div className="flex-1 hidden md:block"></div>
                    </div>
                  </div>

                  {/* Google Location */}
                  <div className="flex items-center gap-[15px] mt-4">
                    <span className="font-plus-jakarta font-semibold text-[16px] text-black">Google Location of Land</span>
                    <span className="font-plus-jakarta font-medium text-[16px] underline text-[#1D7ABE] break-all">{ownerDetails.locationCoords}</span>
                  </div>

                </div>
              )}

              {activeTab === 'Family Tree' && (
                <div className="w-full flex-1 flex justify-center items-center relative overflow-x-auto min-h-[500px]">
                  <div className="family-tree-diagram-container" style={{ position: 'relative', width: '800px', height: '500px', margin: '0 auto', transform: 'scale(0.85) translateY(-30px)' }}>

                    <svg className="family-tree-svg-connectors" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}>
                      <path d="M 419 202 L 419 215 C 419 238, 380 252, 330 252 L 180 252 C 133 252, 133 265, 133 302" fill="none" stroke="#E2E2E6" strokeWidth="2" />
                      <path d="M 419 202 L 419 215 C 419 238, 458 252, 508 252 L 658 252 C 705 252, 705 265, 705 302" fill="none" stroke="#E2E2E6" strokeWidth="2" />
                      <line x1="419" y1="202" x2="419" y2="302" stroke="#E2E2E6" strokeWidth="2" />
                      <line x1="419" y1="374" x2="419" y2="462" stroke="#E2E2E6" strokeWidth="2" />
                    </svg>

                    <div className="family-tree-connector-pill father-pill" style={{ left: '243px', top: '241px' }}>FATHER</div>
                    <div className="family-tree-connector-pill spouse-pill" style={{ left: '394px', top: '257px' }}>SPOUSE</div>
                    <div className="family-tree-connector-pill mother-pill" style={{ left: '529px', top: '241px' }}>MOTHER</div>
                    <div className="family-tree-connector-pill daughter-pill" style={{ left: '388px', top: '417px' }}>DAUGHTER</div>

                    <div className="family-tree-node-owner" style={{ left: '311px', top: '70px' }}>
                      <div className="family-tree-owner-avatar-wrapper">
                        <img src={familyTree.owner.avatar} alt="Owner" className="family-tree-owner-avatar" />
                        <span className="family-tree-owner-badge">OWNER</span>
                      </div>
                      <h3 className="family-tree-owner-name">{familyTree.owner.name}</h3>
                      <span className="family-tree-owner-details">{familyTree.owner.info}</span>
                    </div>

                    <div className="family-tree-relative-card" style={{ left: '40px', top: '302px' }}>
                      <img src={familyTree.father.avatar} alt="Father" className="family-tree-relative-avatar" />
                      <div className="family-tree-relative-info">
                        <h4 className="family-tree-relative-name">{familyTree.father.name}</h4>
                        <span className="family-tree-relative-meta">{familyTree.father.info}</span>
                      </div>
                    </div>

                    <div className="family-tree-relative-card" style={{ left: '326px', top: '302px' }}>
                      <img src={familyTree.spouse.avatar} alt="Spouse" className="family-tree-relative-avatar" />
                      <div className="family-tree-relative-info">
                        <h4 className="family-tree-relative-name">{familyTree.spouse.name}</h4>
                        <span className="family-tree-relative-meta">{familyTree.spouse.info}</span>
                      </div>
                    </div>

                    <div className="family-tree-relative-card" style={{ left: '612px', top: '302px' }}>
                      <img src={familyTree.mother.avatar} alt="Mother" className="family-tree-relative-avatar" />
                      <div className="family-tree-relative-info">
                        <h4 className="family-tree-relative-name">{familyTree.mother.name}</h4>
                        <span className="family-tree-relative-meta">{familyTree.mother.info}</span>
                      </div>
                    </div>

                    <div className="family-tree-relative-card" style={{ left: '326px', top: '462px' }}>
                      <img src={familyTree.daughter.avatar} alt="Daughter" className="family-tree-relative-avatar" />
                      <div className="family-tree-relative-info">
                        <h4 className="family-tree-relative-name">{familyTree.daughter.name}</h4>
                        <span className="family-tree-relative-meta">{familyTree.daughter.info}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Land Details' && (
                <div className="flex-1 w-full relative">
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
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="w-full flex justify-end items-center px-6 lg:px-12 py-6 shrink-0 mt-auto border-t border-black/5 bg-white z-10">
              <div className="flex gap-3">
                <button onClick={handleTurnBack} className="flex items-center justify-center w-[121px] h-[38px] border border-black/30 rounded-[33px] bg-transparent font-plus-jakarta font-medium text-[14px] text-black/80 cursor-pointer">
                  Turn Back
                </button>
                <button onClick={handleApproveClick} className="flex items-center justify-center w-[121px] h-[38px] bg-[#2780C4] rounded-[33px] border-none font-plus-jakarta font-semibold text-[14px] text-white cursor-pointer">
                  Approve
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showApproveModal && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
          <div className="bg-white border border-black/20 shadow-[0px_0px_12.5px_rgba(0,0,0,0.15)] rounded-[24px] w-full w-full lg:max-w-[610px] flex flex-col items-center py-8 px-6 relative">
            <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black text-center w-full mb-6">Customer Information</span>
            
            <div className="relative w-[180px] h-[180px] flex justify-center items-center mb-6">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="rgba(39, 128, 196, 0.08)" className="absolute inset-0">
                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z"/>
              </svg>
              <div className="w-[126px] h-[126px] relative z-10">
                <svg width="126" height="126" viewBox="0 0 24 24" fill="none">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12z" fill="#2780C4"/>
                  <path d="M10.09 16.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" fill="#FFFFFF"/>
                </svg>
              </div>
            </div>

            <span className="font-plus-jakarta font-bold text-[20px] leading-[25px] text-center text-[#3D4949] w-full lg:max-w-[428px] mb-8">
              Proceed With ‘Land And Boundaries’ Approval For The Farmland ID: <span className="text-[#2780C4]">{targetId}</span> to Complete The Verification.
            </span>

            <button onClick={handleProceed} className="flex items-center justify-center bg-[#2780C4] rounded-[56px] border-none px-6 py-4 cursor-pointer min-w-[204px]">
              <span className="font-plus-jakarta font-semibold text-[23.8px] text-white">Proceed</span>
            </button>
          </div>
        </div>
      )}

      {showTurnbackModal && (
        <div className="fixed inset-0 bg-[#F9F9F9] flex flex-col items-center justify-center z-[9999] p-4">
          <div className="absolute top-8 right-8 flex flex-row items-center gap-[13px]">
            <button className="flex flex-row justify-center items-center p-2 w-[52px] h-[52px] bg-white rounded-full relative shadow-sm border-none cursor-pointer">
              <Bell className="w-6 h-6 text-[#2C2C2C]" strokeWidth={1.5} />
              <span className="absolute w-[5px] h-[5px] right-[14px] top-[12px] bg-[#EF4646] rounded-full" />
            </button>
            <div className="flex flex-row justify-center items-center w-[52px] h-[52px] bg-white rounded-full overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="User profile avatar" className="w-[52px] h-[52px] object-cover" />
            </div>
          </div>

          <div className="w-full w-full lg:max-w-[672px] bg-white shadow-[0px_20px_40px_rgba(0,49,50,0.06)] rounded-[32px] flex flex-col">
            <div className="flex flex-row justify-between items-center px-8 py-6 border-b border-black/5">
              <span className="font-plus-jakarta font-semibold text-[24px] leading-[32px] tracking-[-0.6px] text-[#1A1C1D]">Turnback</span>
              <button onClick={() => setShowTurnbackModal(false)} className="bg-transparent border-none cursor-pointer flex items-center justify-center p-0">
                <X className="w-[30px] h-[30px] text-black" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col p-8 gap-3">
              <span className="font-inter font-normal text-[14px] leading-[20px] text-[#3D4949]">Provide the reason for turnback:</span>
              <div className="w-full h-[200px] bg-[#F3F3F5] border border-[#BCC9C9] rounded-[16px] p-6">
                <textarea value={turnbackReason} onChange={(e) => setTurnbackReason(e.target.value)} placeholder="Start writing here..." className="w-full h-full bg-transparent border-none outline-none resize-none font-plus-jakarta text-[16px] leading-[26px] text-black" />
              </div>
              <div className="flex justify-end mt-4 gap-3">
                <button onClick={() => setShowTurnbackModal(false)} className="bg-transparent border border-black/30 rounded-[33px] px-6 py-2 cursor-pointer text-black/80 font-plus-jakarta font-medium text-[14px]">Cancel</button>
                <button onClick={confirmTurnBack} className="bg-[#2780C4] rounded-[33px] border-none px-6 py-2 cursor-pointer text-white font-plus-jakarta font-semibold text-[14px]">Turnback</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VerificationOfficerAssignedFarmlandsOwnerDetails;
