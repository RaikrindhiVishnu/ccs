import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Download, Check, BadgeCheck, Search, ChevronDown, X } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

export const VerificationOfficerAssignedFarmlandsAgriculture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1084);
  const targetId = id || "GLCSOS 01";

  // State hooks for sub-tab selection and completion tracking
  const [activeSubTab, setActiveSubTab] = React.useState<number>(0);
  const [completedSubTabs, setCompletedSubTabs] = React.useState<string[]>([]);

  // Soil Type states
  const [soilType, setSoilType] = React.useState<string>('Red Soil');
  const [isSoilDropdownOpen, setIsSoilDropdownOpen] = React.useState(false);
  const soilOptions = ['Alluvial Soil', 'Red Soil', 'Black Soil', 'Laterite Soil', 'Desert Soil', 'Peaty/Marshy Soil'];

  // Type of Crop states
  const [cropType, setCropType] = React.useState<string>('Rice');
  const [isCropDropdownOpen, setIsCropDropdownOpen] = React.useState(false);
  const cropTypeOptions = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Ragi', 'Bajra', 'Barley'];

  // Ground Water Level states
  const [groundWater, setGroundWater] = React.useState<string>('150 feets');
  const [isWaterDropdownOpen, setIsWaterDropdownOpen] = React.useState(false);
  const waterOptions = ['50 feets', '100 feets', '150 feets', '200 feets', '250 feets', '300 feets', '350+ feets'];

  // Types of Crop can be grown states
  const [cropsGrown, setCropsGrown] = React.useState<string[]>(['Rice', 'Corn']);
  const [isCropsDropdownOpen, setIsCropsDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const cropItems = [
    { id: 'rice-1', name: 'Rice', col: 1 },
    { id: 'corn-1', name: 'Corn', col: 1 },
    { id: 'cotton-1', name: 'Cotton', col: 1 },
    { id: 'wheat-1', name: 'Wheat', col: 1 },
    { id: 'sunflower-1', name: 'Sun Flower', col: 2 },
    { id: 'sugarcane-1', name: 'Sugar Cane', col: 2 },
    { id: 'jowar-1', name: 'Jowar', col: 3 },
    { id: 'bajra-1', name: 'Bajra', col: 3 }
  ];

  const filteredCrops = cropItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Current Yield Cost states
  const [yieldCost, setYieldCost] = React.useState<string>('5,000.00');
  const [yieldReturns, setYieldReturns] = React.useState<string>('15,000.00');

  // Current Cultivation states
  const [currentCultivation, setCurrentCultivation] = React.useState<'Self' | 'Lease'>('Self');
  const [cultivatorName, setCultivatorName] = React.useState<string>('Krishna');
  const [cultivatorContact, setCultivatorContact] = React.useState<string>('9876543210');

  // Future Crops suggestion states
  const [futureCrops, setFutureCrops] = React.useState<string>('Rice, Cotton suggested for next season.');

  // Maintenance states
  const [maintenanceCrops, setMaintenanceCrops] = React.useState<string[]>(['Wheat', 'Cotton']);
  const [isMaintenanceDropdownOpen, setIsMaintenanceDropdownOpen] = React.useState(false);
  const [maintenanceReturns, setMaintenanceReturns] = React.useState<string>('25,000.00');
  const [maintenanceSearchQuery, setMaintenanceSearchQuery] = React.useState('');

  const filteredMaintenanceCrops = cropItems.filter((item) =>
    item.name.toLowerCase().includes(maintenanceSearchQuery.toLowerCase())
  );

  // Natural Advantages & Disadvantages states
  const [advantages, setAdvantages] = React.useState<string>('Fertile soil and excellent water availability.');
  const [disadvantages, setDisadvantages] = React.useState<string>('High market price fluctuation.');

  // Comments per sub-tab
  const [comments, setComments] = React.useState<Record<number, string>>({
    0: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    7: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    8: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    9: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    10: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur."
  });

  // Approve Modal state
  const [showApproveModal, setShowApproveModal] = React.useState(false);

  // Turnback modal state
  const [showTurnbackModal, setShowTurnbackModal] = React.useState(false);
  const [turnbackReason, setTurnbackReason] = React.useState('');


  // Grid pills config (11 items)
  const pills = [
    { label: "Local Agricluture Officer Report", width: '296px' },
    { label: "Last 5 years Crop Yielding Report", width: '304px' },
    { label: "Soil", width: '108px' },
    { label: "Type Of Crop", width: '173px' },
    { label: "Ground Water Level", width: '215px' },
    { label: "Types of Crop can be grown", width: '270px' },
    { label: "Current Yield Cost", width: '206px' },
    { label: "Current Cultivation", width: '210px' },
    { label: "Future Crops", width: '170px' },
    { label: "Maintenance", width: '170px' },
    { label: "Natural Advantages and Disadvantages", width: '346px' }
  ];

  const handleBack = () => {
    navigate('/verification-officer-2/assigned-farmlands');
  };

  const handleTurnBack = () => {
    setShowTurnbackModal(true);
  };

  const confirmTurnBack = () => {
    setShowTurnbackModal(false);
    if (activeSubTab < 10) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      localStorage.setItem(`vo2_status_${targetId}_agriculture`, 'turnedback');
      navigate('/verification-officer-2/assigned-farmlands');
    }
  };

  const handleApprove = () => {
    const currentLabel = pills[activeSubTab].label;
    if (!completedSubTabs.includes(currentLabel)) {
      setCompletedSubTabs([...completedSubTabs, currentLabel]);
    }

    if (activeSubTab < 10) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      setShowApproveModal(true);
    }
  };

  const handleProceed = () => {
    setShowApproveModal(false);
    localStorage.setItem(`vo2_status_${targetId}_agriculture`, 'approved');
    navigate('/verification-officer-2/assigned-farmlands');
  };

  const handleCommentChange = (val: string) => {
    setComments(prev => ({
      ...prev,
      [activeSubTab]: val
    }));
  };

  const toggleCropSelection = (cropName: string) => {
    if (cropsGrown.includes(cropName)) {
      setCropsGrown(cropsGrown.filter((c) => c !== cropName));
    } else {
      setCropsGrown([...cropsGrown, cropName]);
    }
  };

  const toggleMaintenanceCropSelection = (cropName: string) => {
    if (maintenanceCrops.includes(cropName)) {
      setMaintenanceCrops(maintenanceCrops.filter((c) => c !== cropName));
    } else {
      setMaintenanceCrops([...maintenanceCrops, cropName]);
    }
  };

  // Reusable Pill component rendering
  const renderPill = (pill: typeof pills[0], absIdx: number, extraStyle?: React.CSSProperties) => {
    const isActive = activeSubTab === absIdx;
    const isCompleted = completedSubTabs.includes(pill.label);

    return (
      <button 
        key={absIdx}
        onClick={() => setActiveSubTab(absIdx)}
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '11.6px 16px',
          gap: '8px',
          width: pill.width,
          height: '41.22px',
          background: '#F9F9F9',
          border: isActive ? '0.73px solid #0078FA' : isCompleted ? '0.73px solid #A5B767' : '0.72px solid transparent',
          boxShadow: '0px 42px 17px rgba(0, 0, 0, 0.01)',
          borderRadius: '72.55px',
          cursor: 'pointer',
          outline: 'none',
          justifyContent: 'center',
          ...extraStyle
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', width: '100%', height: '18px', justifyContent: 'center' }}>
          {!isCompleted && (
            <div style={{
              width: '18px',
              height: '18px',
              background: '#FFBC8A',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>!</div>
          )}
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            color: isActive ? '#0078FA' : isCompleted ? '#2780C4' : 'rgba(90, 92, 94, 0.74)',
            whiteSpace: 'nowrap'
          }}>
            {pill.label}
          </span>
          {isCompleted && (
            <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
              <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
              <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
            </div>
          )}
        </div>
      </button>
    );
  };

  const currentComment = comments[activeSubTab] || "";

  return (
    <div 
      className="bg-[#F2F2F2] min-h-screen relative flex justify-center overflow-hidden"
    >
      <div 
        style={{
          width: '1440px',
          height: '1084px',
          position: 'relative',
          background: '#F9F9F9',
          borderRadius: '32px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(scale - 1) * 1084}px`
        }}
      >
        {/* Go back pill button */}
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
            onClick={handleBack}
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

        {/* LEFT COLUMN: Stepper Timeline Card */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '40px',
          width: '410px',
          top: '120px',
          background: '#FFFFFF',
          borderRadius: '24px'
        }}>
          <span style={{
            position: 'absolute',
            width: '96px',
            height: '20px',
            left: '30px',
            top: '30px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: '35px',
            color: '#000000'
          }}>
            {targetId}
          </span>

          {/* Stepper Vertical Connector Line */}
          <div style={{
            position: 'absolute',
            width: '244px',
            height: '0px',
            left: '110px',
            top: '136px',
            border: '1px solid rgba(0, 120, 250, 0.25)',
            transform: 'rotate(90deg)',
            transformOrigin: 'top left',
            zIndex: 1
          }} />

          {/* Steps */}
          <div style={{ position: 'absolute', left: '120px', top: '130px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 0px 32px 24px', gap: '4px', width: '173px', height: '68px', boxSizing: 'content-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', width: '182px', height: '36px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#5A5C5E', width: '173px', height: '36px' }}>CUSTOMER INFORMATION</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '120px', top: '219px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 0px 4px 24px', gap: '4px', width: '173px', height: '22px', boxSizing: 'content-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', width: '149px', height: '18px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#5A5C5E', width: '149px', height: '18px' }}>LAND & BOUNDARIES</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '120px', top: '299px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 0px 4px 24px', gap: '4px', width: '173px', height: '22px', boxSizing: 'content-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', width: '149px', height: '18px' }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#5A5C5E', width: '81px', height: '18px' }}>VALUATION</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '377px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', height: '36px', width: '118px' }}>AGRICULTURE &<br/>REPORT</span>
          </div>

          {/* Step Dots */}
          {[136, 218, 296, 374].map((top, index) => {
            const isCustomerApproved = localStorage.getItem(`vo2_status_${targetId}_customer`) === 'approved';
            const isBoundariesApproved = localStorage.getItem(`vo2_status_${targetId}_boundaries`) === 'approved';
            const isValuationApproved = localStorage.getItem(`vo2_status_${targetId}_valuation`) === 'approved';
            const showCheckmark = (index === 0 && isCustomerApproved) || 
                                  (index === 1 && isBoundariesApproved) || 
                                  (index === 2 && isValuationApproved);

            return (
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
                justifyContent: 'center',
                zIndex: 5
              }}>
                {showCheckmark ? (
                  <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                    <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                  </div>
                ) : (
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
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT TOP CARD: Bento Grid of Pills */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '466px',
          right: '40px',
          top: '120px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxSizing: 'border-box',
          padding: '30px'
        }}>
          {/* Bento layout wrapper */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
            {/* Row 1 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', width: '100%', height: '41.22px' }}>
              {pills.slice(0, 3).map((pill, idx) => renderPill(pill, idx))}
            </div>

            {/* Row 2 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', width: '100%', height: '41.22px' }}>
              {pills.slice(3, 6).map((pill, idx) => renderPill(pill, idx + 3))}
            </div>

            {/* Row 3 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', width: '100%', height: '41.22px' }}>
              {pills.slice(6, 10).map((pill, idx) => renderPill(pill, idx + 6))}
            </div>

            {/* Row 4 */}
            {renderPill(pills[10], 10, {
              position: 'absolute',
              left: '0px',
              top: '214px'
            })}
          </div>
        </div>

        {/* BOTTOM CARD: Sub-tab specific sections */}
        <div style={{
          position: 'absolute',
          height: '443px',
          left: '40px',
          right: '40px',
          top: '585px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxSizing: 'border-box',
          padding: '30px'
        }}>
          
          {activeSubTab <= 1 ? (
            /* TABS 0 - 1: STANDARD FILES VIEW */
            <>
              {/* UPLOADED FILES SECTION */}
              <span style={{
                position: 'absolute',
                width: '173px',
                height: '30px',
                left: '30px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Uploaded Files
              </span>

              <div style={{
                position: 'absolute',
                left: '18px',
                top: '73px',
                width: '682px',
                height: '355px',
                background: '#FFFFFF',
                border: '1.2px solid #E5E7EB',
                borderRadius: '24px',
                boxSizing: 'border-box',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                overflowY: 'auto'
              }} className="custom-scrollbar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '12px', color: 'rgba(0, 0, 0, 0.74)' }}>
                    Uploaded files
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[{ name: "File_name_1.pdf", size: "8MB" }, { name: "File_name_1.pdf", size: "8MB" }].map((file, fileIdx) => (
                      <div key={fileIdx} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 16px', 
                        background: '#E5F1F9', 
                        borderRadius: '12px',
                        width: '280px',
                        height: '59px',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '29px', height: '29px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                              {file.name}
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                              {file.size}
                            </span>
                          </div>
                        </div>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Download className="w-[18px] h-[18px] text-[#000000]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 2 ? (
            /* TAB 2: SOIL */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Soil Type
                </span>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setIsSoilDropdownOpen(!isSoilDropdownOpen)}
                    style={{
                      boxSizing: 'border-box',
                      width: '100%',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: soilType ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                      {soilType || 'Select Soil Type'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#363434]" />
                  </button>

                  {isSoilDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '58px',
                      left: 0,
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {soilOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setSoilType(opt);
                            setIsSoilDropdownOpen(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#1A1C1E',
                            cursor: 'pointer',
                            background: soilType === opt ? '#E5F1F9' : 'transparent'
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 3 ? (
            /* TAB 3: TYPE OF CROP */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Types of Crops available present?
                </span>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                    style={{
                      boxSizing: 'border-box',
                      width: '100%',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: cropType ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                      {cropType || 'Select Crop'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#363434]" />
                  </button>

                  {isCropDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '58px',
                      left: 0,
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {cropTypeOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setCropType(opt);
                            setIsCropDropdownOpen(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#1A1C1E',
                            cursor: 'pointer',
                            background: cropType === opt ? '#E5F1F9' : 'transparent'
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 4 ? (
            /* TAB 4: GROUND WATER LEVEL */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Depth of Ground Water Level
                </span>
                <div style={{ position: 'relative', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setIsWaterDropdownOpen(!isWaterDropdownOpen)}
                    style={{
                      boxSizing: 'border-box',
                      width: '100%',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: groundWater ? '#000000' : 'rgba(0, 0, 0, 0.4)' }}>
                      {groundWater || 'Select Depth'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#363434]" />
                  </button>

                  {isWaterDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '58px',
                      left: 0,
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      zIndex: 100,
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {waterOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setGroundWater(opt);
                            setIsWaterDropdownOpen(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#1A1C1E',
                            cursor: 'pointer',
                            background: groundWater === opt ? '#E5F1F9' : 'transparent'
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 5 ? (
            /* TAB 5: TYPES OF CROP CAN BE GROWN */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Types of Crop can be Grown in Future
                </span>
                <div style={{ position: 'relative', width: '640px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCropsDropdownOpen(!isCropsDropdownOpen)}
                    style={{
                      boxSizing: 'border-box',
                      width: '640px',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    {cropsGrown.length === 0 ? (
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(0, 0, 0, 0.4)' }}>
                        Select types
                      </span>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', flexWrap: 'wrap' }}>
                        {cropsGrown.map((crop) => (
                          <div key={crop} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '18px',
                              height: '18px',
                              background: '#3D93D1',
                              border: '1.5px solid #F1F1FF',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                              {crop}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <ChevronDown className="w-5 h-5 text-[#363434] shrink-0" />
                  </button>

                  {isCropsDropdownOpen && (
                    <div style={{
                      boxSizing: 'border-box',
                      position: 'absolute',
                      width: '640px',
                      height: '286px',
                      left: 0,
                      top: '63px',
                      background: '#FFFFFF',
                      border: '1px solid #999999',
                      borderRadius: '8px',
                      zIndex: 100,
                      padding: '13px 16px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        position: 'relative',
                        width: '610px',
                        height: '44px',
                        background: '#FFFFFF',
                        border: '1px solid #C5C1C1',
                        borderRadius: '79px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        marginBottom: '16px'
                      }}>
                        <Search className="w-5 h-5 text-[rgba(0,0,0,0.6)] shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search"
                          style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            marginLeft: '10px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            color: '#000000'
                          }}
                        />
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        rowGap: '20px',
                        columnGap: '10px',
                        height: '180px',
                        overflowY: 'auto'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredCrops.filter(item => item.col === 1).map((item, index) => {
                            const isChecked = cropsGrown.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredCrops.filter(item => item.col === 2).map((item, index) => {
                            const isChecked = cropsGrown.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredCrops.filter(item => item.col === 3).map((item, index) => {
                            const isChecked = cropsGrown.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 6 ? (
            /* TAB 6: CURRENT YIELD COST */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  What is the current yielding cost?
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={yieldCost}
                    onChange={(e) => setYieldCost(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '144px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  Current returns from yield?
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={yieldReturns}
                    onChange={(e) => setYieldReturns(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 7 ? (
            /* TAB 7: CURRENT CULTIVATION */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  What is the Current Cultivation Type?
                </span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentCultivation('Self')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '8px 24px',
                      gap: '10px',
                      background: currentCultivation === 'Self' ? '#2780C4' : '#FFFFFF',
                      border: currentCultivation === 'Self' ? 'none' : '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      color: currentCultivation === 'Self' ? '#FFFFFF' : '#000000'
                    }}
                  >
                    <div style={{
                      width: '14px',
                      height: '14px',
                      border: currentCultivation === 'Self' ? 'none' : '1.5px solid #2780C4',
                      background: currentCultivation === 'Self' ? '#FFFFFF' : 'transparent',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {currentCultivation === 'Self' && (
                        <div style={{ width: '6px', height: '6px', background: '#2780C4', borderRadius: '50%' }} />
                      )}
                    </div>
                    Self
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentCultivation('Lease')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '8px 24px',
                      gap: '10px',
                      background: currentCultivation === 'Lease' ? '#2780C4' : '#FFFFFF',
                      border: currentCultivation === 'Lease' ? 'none' : '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      color: currentCultivation === 'Lease' ? '#FFFFFF' : '#000000'
                    }}
                  >
                    <div style={{
                      width: '14px',
                      height: '14px',
                      border: currentCultivation === 'Lease' ? 'none' : '1.5px solid #2780C4',
                      background: currentCultivation === 'Lease' ? '#FFFFFF' : 'transparent',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {currentCultivation === 'Lease' && (
                        <div style={{ width: '6px', height: '6px', background: '#2780C4', borderRadius: '50%' }} />
                      )}
                    </div>
                    Lease
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'absolute', width: '640px', left: '30px', top: '144px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                  Name
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={cultivatorName}
                    onChange={(e) => setCultivatorName(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'absolute', width: '640px', left: '30px', top: '254px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '18px', color: '#000000' }}>
                  Contact Details
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={cultivatorContact}
                    onChange={(e) => setCultivatorContact(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : activeSubTab === 8 ? (
            /* TAB 8: FUTURE CROPS */
            <>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '13px',
                position: 'absolute',
                left: '30px',
                top: '30px',
                width: '618px'
              }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Future crop plans suggested by Green Land Captial
                </span>

                {/* Comments textarea box — 618×181px */}
                <div style={{
                  boxSizing: 'border-box',
                  width: '618px',
                  height: '181px',
                  background: 'rgba(187, 219, 240, 0.38)',
                  border: '1px solid #96C9ED',
                  borderRadius: '18px',
                  padding: '24px 26px',
                  position: 'relative'
                }}>
                  <textarea
                    value={futureCrops}
                    onChange={(e) => setFutureCrops(e.target.value)}
                    placeholder="Write suggestion"
                    style={{
                      width: '100%',
                      height: '100%',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '17px',
                      color: 'rgba(0, 0, 0, 0.8)',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>
              </div>
            </>
          ) : activeSubTab === 9 ? (
            /* TAB 9: MAINTENANCE */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '25px', color: '#000000' }}>
                  If Green Land Captial does the maintenace, what will be the suggested crop?
                </span>
                <div style={{ position: 'relative', width: '640px' }}>
                  <button
                    type="button"
                    onClick={() => setIsMaintenanceDropdownOpen(!isMaintenanceDropdownOpen)}
                    style={{
                      boxSizing: 'border-box',
                      width: '640px',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      outline: 'none'
                    }}
                  >
                    {maintenanceCrops.length === 0 ? (
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: 'rgba(0, 0, 0, 0.4)' }}>
                        Select Types
                      </span>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', flexWrap: 'wrap' }}>
                        {maintenanceCrops.map((crop) => (
                          <div key={crop} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '18px',
                              height: '18px',
                              background: '#3D93D1',
                              border: '1.5px solid #F1F1FF',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                              {crop}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <ChevronDown className="w-5 h-5 text-[#363434] shrink-0" />
                  </button>

                  {isMaintenanceDropdownOpen && (
                    <div style={{
                      boxSizing: 'border-box',
                      position: 'absolute',
                      width: '640px',
                      height: '286px',
                      left: 0,
                      top: '63px',
                      background: '#FFFFFF',
                      border: '1px solid #999999',
                      borderRadius: '8px',
                      zIndex: 100,
                      padding: '13px 16px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        position: 'relative',
                        width: '610px',
                        height: '44px',
                        background: '#FFFFFF',
                        border: '1px solid #C5C1C1',
                        borderRadius: '79px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px',
                        marginBottom: '16px'
                      }}>
                        <Search className="w-5 h-5 text-[rgba(0,0,0,0.6)] shrink-0" />
                        <input
                          type="text"
                          value={maintenanceSearchQuery}
                          onChange={(e) => setMaintenanceSearchQuery(e.target.value)}
                          placeholder="Search"
                          style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            marginLeft: '10px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            color: '#000000'
                          }}
                        />
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        rowGap: '20px',
                        columnGap: '10px',
                        height: '180px',
                        overflowY: 'auto'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredMaintenanceCrops.filter(item => item.col === 1).map((item, index) => {
                            const isChecked = maintenanceCrops.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleMaintenanceCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredMaintenanceCrops.filter(item => item.col === 2).map((item, index) => {
                            const isChecked = maintenanceCrops.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleMaintenanceCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {filteredMaintenanceCrops.filter(item => item.col === 3).map((item, index) => {
                            const isChecked = maintenanceCrops.includes(item.name);
                            return (
                              <div
                                key={`${item.id}-${index}`}
                                onClick={() => toggleMaintenanceCropSelection(item.name)}
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                              >
                                <div style={{
                                  boxSizing: 'border-box',
                                  width: '18px',
                                  height: '18px',
                                  background: isChecked ? '#3D93D1' : '#F1F1FF',
                                  border: isChecked ? '1.5px solid #F1F1FF' : '1.5px solid #85BFE5',
                                  borderRadius: '2px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {isChecked && (
                                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '14px', color: '#138FFF' }}>
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'absolute', width: '640px', left: '30px', top: '144px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                  What will be the best returns?
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={maintenanceReturns}
                    onChange={(e) => setMaintenanceReturns(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              {/* COMMENTS SECTION */}
              <span style={{
                position: 'absolute',
                width: '129px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Comments
              </span>

              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '716px',
                top: '73px',
                boxSizing: 'border-box',
                background: 'rgba(187, 219, 240, 0.38)',
                border: '1px solid #96C9ED',
                borderRadius: '18px',
                padding: '24px'
              }}>
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                    margin: 0
                  }}
                />
              </div>
            </>
          ) : (
            /* TAB 10: NATURAL ADVANTAGES AND DISADVANTAGES */
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  What are the Advantages?
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={advantages}
                    onChange={(e) => setAdvantages(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', position: 'absolute', width: '640px', left: '30px', top: '144px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  What are the Disadvantages?
                </span>
                <div style={{
                  boxSizing: 'border-box',
                  width: '640px',
                  height: '54px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    value={disadvantages}
                    onChange={(e) => setDisadvantages(e.target.value)}
                    style={{
                      position: 'absolute',
                      width: '592px',
                      height: '22px',
                      left: '24px',
                      top: 'calc(50% - 22px/2)',
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#000000',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* ACTIONS FOOTER BUTTONS */}
          <div style={{
            position: 'absolute',
            width: '254px',
            height: '38px',
            right: '25px',
            bottom: '26px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button 
              onClick={handleTurnBack}
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
              Turn Back
            </button>
            <button 
              onClick={handleApprove}
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
              Approve
            </button>
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
              width: '280px',
              height: '30px',
              left: 'calc(50% - 280px/2)',
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
              Agriculture & Report
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
              <span>
                Proceed With <span style={{ color: '#2780C4' }}>‘Agriculture & Report’</span> Approval For The Farmland ID: <span style={{ color: '#2780C4' }}>{targetId}</span> to Complete The Verification.
              </span>
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
                width: '100px',
                height: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '23.8px',
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

export default VerificationOfficerAssignedFarmlandsAgriculture;
