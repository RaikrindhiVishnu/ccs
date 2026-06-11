import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Download, Check, BadgeCheck, X } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

export const VerificationOfficerAssignedFarmlandsLandBoundaries: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1084);
  const targetId = id || "GLCSOS 01";

  // State hooks for sub-tab selection and completion tracking
  const [activeSubTab, setActiveSubTab] = React.useState<number>(0);
  const [completedSubTabs, setCompletedSubTabs] = React.useState<string[]>([]);

  // Facility selection states for sub-tab index 3 (Water and Electricity Facility)
  const [availabilityFacility, setAvailabilityFacility] = React.useState<'water' | 'electricity' | 'both'>('both');
  const [waterFacility, setWaterFacility] = React.useState<'bore' | 'municipal'>('bore');
  const [electricityFacility, setElectricityFacility] = React.useState<'2phase' | '3phase'>('3phase');

  // Any Existing Trees states
  const [treeAvailability, setTreeAvailability] = React.useState<'Available' | 'Not Available'>('Available');
  const [treeCount, setTreeCount] = React.useState<string>('0 - 10');
  const [isTreeCountDropdownOpen, setIsTreeCountDropdownOpen] = React.useState(false);

  // Survey Report states
  const [surveyReportType, setSurveyReportType] = React.useState<'private' | 'government' | 'both'>('both');

  // Approve Modal state
  const [showApproveModal, setShowApproveModal] = React.useState(false);

  // Turnback modal state
  const [showTurnbackModal, setShowTurnbackModal] = React.useState(false);
  const [turnbackReason, setTurnbackReason] = React.useState('');

  // Boundary selector states (for index 7, 8, 9, 10)
  const [boundarySelections, setBoundarySelections] = React.useState<Record<number, string>>({
    7: 'Land',
    8: 'Road',
    9: 'Tress',
    10: 'Other'
  });
  const [isBoundaryDropdownOpen, setIsBoundaryDropdownOpen] = React.useState(false);
  const [roadTypeSelections, setRoadTypeSelections] = React.useState<Record<number, string>>({
    8: 'Private Road'
  });
  const [isTreesDropdownOpen, setIsTreesDropdownOpen] = React.useState(false);
  const [treesSelections, setTreesSelections] = React.useState<Record<number, string>>({
    9: '1 - 10'
  });


  // Grid pills config (11 items)
  const pills = [
    { label: "Land Images", width: '161px' },
    { label: "Landscape View of Farmlands", width: '281px' },
    { label: "Shape of the Land", width: '203px' },
    { label: "Water and Electricity Facility", width: '273px' },
    { label: "Any Existing Trees", width: '202px' },
    { label: "Master Plan", width: '198px' },
    { label: "Survey Report", width: '178px' },
    { label: "East Boundaries", width: '191px' },
    { label: "West Boundaries", width: '197px' },
    { label: "North Boundaries", width: '201px' },
    { label: "South Boundaries", width: '202px' }
  ];

  // File database per sub-tab
  interface MockFile {
    name: string;
    size: string;
  }
  interface SubTabFiles {
    coverImage?: MockFile;
    uploadedImages: MockFile[];
  }

  const subTabsFilesData: Record<number, SubTabFiles> = {
    0: { // Land Images
      coverImage: { name: "Cover Image.pdf", size: "6MB" },
      uploadedImages: [
        { name: "File_name_1.pdf", size: "8MB" },
        { name: "File_name_1.pdf", size: "8MB" }
      ]
    },
    1: { // Landscape View of Farmlands
      uploadedImages: [
        { name: "File_name_1.pdf", size: "8MB" },
        { name: "File_name_1.pdf", size: "8MB" }
      ]
    },
    2: { // Shape of the Land
      uploadedImages: [
        { name: "File_name_1.pdf", size: "8MB" },
        { name: "File_name_1.pdf", size: "8MB" }
      ]
    },
    3: { // Water and Electricity Facility
      uploadedImages: [
        { name: "Water_Connection_Receipt.pdf", size: "2MB" },
        { name: "Electricity_Bill.pdf", size: "3MB" }
      ]
    },
    4: { // Any Existing Trees
      uploadedImages: [
        { name: "Tree_Inventory.pdf", size: "4MB" }
      ]
    },
    5: { // Master Plan
      uploadedImages: [
        { name: "Master_Plan_2026.pdf", size: "12MB" }
      ]
    },
    6: { // Survey Report
      uploadedImages: [
        { name: "Government_Survey_Report.pdf", size: "15MB" }
      ]
    },
    7: { // East Boundaries
      uploadedImages: [
        { name: "East_Boundary_Photos.pdf", size: "6MB" }
      ]
    },
    8: { // West Boundaries
      uploadedImages: [
        { name: "West_Boundary_Photos.pdf", size: "6MB" }
      ]
    },
    9: { // North Boundaries
      uploadedImages: [
        { name: "North_Boundary_Photos.pdf", size: "6MB" }
      ]
    },
    10: { // South Boundaries
      uploadedImages: [
        { name: "South_Boundary_Photos.pdf", size: "6MB" }
      ]
    }
  };

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
      localStorage.setItem(`vo2_status_${targetId}_boundaries`, 'turnedback');
      navigate(`/verification-officer-2/assigned-farmlands-valuation/${targetId}`);
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
    localStorage.setItem(`vo2_status_${targetId}_boundaries`, 'approved');
    navigate(`/verification-officer-2/assigned-farmlands-valuation/${targetId}`);
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

  const currentFiles = subTabsFilesData[activeSubTab] || { uploadedImages: [] };
  const currentContainerHeight = activeSubTab === 6 
    ? (surveyReportType === 'both' ? 1767 : 1345) 
    : 1084;

  return (
    <div 
      className="bg-[#F2F2F2] min-h-screen relative flex justify-center overflow-hidden"
    >
      <div 
        style={{
          width: '1440px',
          height: `${currentContainerHeight}px`,
          position: 'relative',
          background: '#F9F9F9',
          borderRadius: '32px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(scale - 1) * currentContainerHeight}px`
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
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '149px', height: '18px' }}>LAND & BOUNDARIES</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '299px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', height: '18px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '81px', height: '18px' }}>VALUATION</span>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '377px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', height: '36px', width: '118px' }}>AGRICULTURE &<br/>REPORT</span>
          </div>

          {/* Step Dots */}
          {[136, 218, 296, 374].map((top, index) => {
            const isCustomerApproved = localStorage.getItem(`vo2_status_${targetId}_customer`) === 'approved';
            const showCheckmark = index === 0 && isCustomerApproved;

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

            {/* Row 4 (South Boundaries absolute) */}
            {renderPill(pills[10], 10, {
              position: 'absolute',
              left: '0px',
              top: '214px'
            })}
          </div>
        </div>

        {/* BOTTOM CARD: Uploaded Files & Comments */}
        <div style={{
          position: 'absolute',
          height: activeSubTab === 6
            ? (surveyReportType === 'both' ? '1126px' : '720px')
            : '443px',
          left: '40px',
          right: '40px',
          top: '585px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxSizing: 'border-box',
          padding: '30px'
        }}>
          
          {activeSubTab === 6 ? (
            /* SURVEY REPORT SUB-TAB */
            <>
              <span style={{
                position: 'absolute',
                width: '304px',
                height: '30px',
                left: '30px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                color: '#000000'
              }}>
                Select Survey Report Type
              </span>

              {/* Row 1 selection toggles */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '32px', position: 'absolute', width: '478px', height: '38px', left: '30px', top: '97px' }}>
                {/* Private Button */}
                <button 
                  type="button"
                  onClick={() => setSurveyReportType('private')}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 18px',
                    gap: '10px',
                    width: '204px',
                    height: '38px',
                    background: surveyReportType === 'private' ? '#2780C4' : '#FFFFFF',
                    border: surveyReportType === 'private' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)',
                    borderRadius: '33px',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '168px', height: '18px' }}>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '12px',
                      height: '12px',
                      background: '#FFFFFF',
                      border: '2px solid #85BFE5',
                      borderRadius: '50%',
                      flexShrink: 0
                    }} />
                    <span style={{
                      width: '146px',
                      height: '18px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: surveyReportType === 'private' ? '#FFFFFF' : '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      Private Survey Report
                    </span>
                  </div>
                </button>

                {/* Government Button */}
                <button 
                  type="button"
                  onClick={() => setSurveyReportType('government')}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 18px',
                    gap: '10px',
                    width: '242px',
                    height: '38px',
                    background: surveyReportType === 'government' ? '#2780C4' : '#FFFFFF',
                    border: surveyReportType === 'government' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)',
                    borderRadius: '33px',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '206px', height: '18px' }}>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '12px',
                      height: '12px',
                      background: '#FFFFFF',
                      border: '2px solid #85BFE5',
                      borderRadius: '50%',
                      flexShrink: 0
                    }} />
                    <span style={{
                      width: '184px',
                      height: '18px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: surveyReportType === 'government' ? '#FFFFFF' : '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      Government Survey Report
                    </span>
                  </div>
                </button>
              </div>

              {/* Both Button (Row 2) */}
              <button 
                type="button"
                onClick={() => setSurveyReportType('both')}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 18px',
                  gap: '10px',
                  width: '196px',
                  height: '38px',
                  background: surveyReportType === 'both' ? '#2780C4' : '#FFFFFF',
                  border: surveyReportType === 'both' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)',
                  borderRadius: '33px',
                  cursor: 'pointer',
                  outline: 'none',
                  position: 'absolute',
                  left: '30px',
                  top: '156px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '160px', height: '18px' }}>
                  <div style={{
                    boxSizing: 'border-box',
                    width: '12px',
                    height: '12px',
                    background: '#FFFFFF',
                    border: '2px solid #85BFE5',
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  <span style={{
                    width: '138px',
                    height: '18px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: surveyReportType === 'both' ? '#FFFFFF' : '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Both Survey Reports
                  </span>
                </div>
              </button>

              {/* Private Block */}
              {(surveyReportType === 'private' || surveyReportType === 'both') && (
                <div style={{
                  position: 'absolute',
                  width: '1319px',
                  height: '403px',
                  left: '30px',
                  top: '241px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '19px'
                }}>
                  {/* Private Survey Report Card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '682px', height: '403px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                      Private Survey Report
                    </span>
                    <div style={{
                      width: '682px',
                      height: '355px',
                      background: '#FFFFFF',
                      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: '24px',
                      position: 'relative'
                    }}>
                      {/* File 1 */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 16px', 
                        background: '#E5F1F9', 
                        borderRadius: '12px',
                        width: '280px',
                        height: '59px',
                        boxSizing: 'border-box',
                        position: 'absolute',
                        left: '32px',
                        top: '30px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '29px', height: '29px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                              File_name_1.pdf
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                              8MB
                            </span>
                          </div>
                        </div>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Download className="w-[18px] h-[18px] text-[#000000]" />
                        </button>
                      </div>

                      {/* File 2 */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 16px', 
                        background: '#E5F1F9', 
                        borderRadius: '12px',
                        width: '280px',
                        height: '59px',
                        boxSizing: 'border-box',
                        position: 'absolute',
                        left: '32px',
                        top: '97px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '29px', height: '29px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                              File_name_1.pdf
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                              8MB
                            </span>
                          </div>
                        </div>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Download className="w-[18px] h-[18px] text-[#000000]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', width: '618px', height: '224px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                      Comments
                    </span>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '618px',
                      height: '181px',
                      background: 'rgba(187, 219, 240, 0.38)',
                      border: '1px solid #96C9ED',
                      borderRadius: '18px',
                      padding: '24px',
                      position: 'relative'
                    }}>
                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '21px',
                        color: '#000000',
                        margin: 0
                      }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Government Block */}
              {(surveyReportType === 'government' || surveyReportType === 'both') && (
                <div style={{
                  position: 'absolute',
                  width: '1319px',
                  height: '403px',
                  left: '30px',
                  top: surveyReportType === 'both' ? '675px' : '241px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '19px'
                }}>
                  {/* Government Survey Report Card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '682px', height: '403px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                      Government Survey Report
                    </span>
                    <div style={{
                      width: '682px',
                      height: '355px',
                      background: '#FFFFFF',
                      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                      borderRadius: '24px',
                      position: 'relative'
                    }}>
                      {/* File 1 */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 16px', 
                        background: '#E5F1F9', 
                        borderRadius: '12px',
                        width: '280px',
                        height: '59px',
                        boxSizing: 'border-box',
                        position: 'absolute',
                        left: '32px',
                        top: '30px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '29px', height: '29px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                              File_name_1.pdf
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                              8MB
                            </span>
                          </div>
                        </div>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Download className="w-[18px] h-[18px] text-[#000000]" />
                        </button>
                      </div>

                      {/* File 2 */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '12px 16px', 
                        background: '#E5F1F9', 
                        borderRadius: '12px',
                        width: '280px',
                        height: '59px',
                        boxSizing: 'border-box',
                        position: 'absolute',
                        left: '32px',
                        top: '97px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '29px', height: '29px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                              File_name_1.pdf
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                              8MB
                            </span>
                          </div>
                        </div>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                          <Download className="w-[18px] h-[18px] text-[#000000]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', width: '618px', height: '224px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', color: '#000000' }}>
                      Comments
                    </span>
                    <div style={{
                      boxSizing: 'border-box',
                      width: '618px',
                      height: '181px',
                      background: 'rgba(187, 219, 240, 0.38)',
                      border: '1px solid #96C9ED',
                      borderRadius: '18px',
                      padding: '24px',
                      position: 'relative'
                    }}>
                      <p style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '21px',
                        color: '#000000',
                        margin: 0
                      }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {activeSubTab === 3 ? (
                /* QUESTIONS SELECTORS SECTION FOR WATER & ELECTRICITY */
                <div style={{
              position: 'absolute',
              width: '640px',
              height: '321px',
              left: '31px',
              top: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}>
              {/* Question 1: Select availability Facility */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '640px', height: '87px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '20px', color: '#000000' }}>
                  Select availability Facility
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px' }}>
                  {/* Water Facility Option */}
                  <button 
                    onClick={() => setAvailabilityFacility('water')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '150px',
                      height: '38px',
                      border: availabilityFacility === 'water' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: availabilityFacility === 'water' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '114px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: availabilityFacility === 'water' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        Water Facility
                      </span>
                    </div>
                  </button>

                  {/* Electricity Facility Option */}
                  <button 
                    onClick={() => setAvailabilityFacility('electricity')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '178px',
                      height: '38px',
                      border: availabilityFacility === 'electricity' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: availabilityFacility === 'electricity' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '142px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: availabilityFacility === 'electricity' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        Electricity Facility
                      </span>
                    </div>
                  </button>

                  {/* Both Option */}
                  <button 
                    onClick={() => setAvailabilityFacility('both')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '91px',
                      height: '38px',
                      border: availabilityFacility === 'both' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: availabilityFacility === 'both' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '55px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: availabilityFacility === 'both' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        Both
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Question 2: Select Water Facility */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '640px', height: '87px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '20px', color: '#000000' }}>
                  Select Water Facility
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px' }}>
                  {/* Bore Option */}
                  <button 
                    onClick={() => setWaterFacility('bore')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '91px',
                      height: '38px',
                      border: waterFacility === 'bore' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: waterFacility === 'bore' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '55px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: waterFacility === 'bore' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        Bore
                      </span>
                    </div>
                  </button>

                  {/* Municipal Option */}
                  <button 
                    onClick={() => setWaterFacility('municipal')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '120px',
                      height: '38px',
                      border: waterFacility === 'municipal' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: waterFacility === 'municipal' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '84px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: waterFacility === 'municipal' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        Muncipal
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Question 3: Select Electricity Facility */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '640px', height: '87px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '20px', color: '#000000' }}>
                  Select Electricity Facility
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '27px' }}>
                  {/* 2 Phase Option */}
                  <button 
                    onClick={() => setElectricityFacility('2phase')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '110px',
                      height: '38px',
                      border: electricityFacility === '2phase' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: electricityFacility === '2phase' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '74px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: electricityFacility === '2phase' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        2 Phase
                      </span>
                    </div>
                  </button>

                  {/* 3 Phase Option */}
                  <button 
                    onClick={() => setElectricityFacility('3phase')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '111px',
                      height: '38px',
                      border: electricityFacility === '3phase' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      background: electricityFacility === '3phase' ? '#2780C4' : '#FFFFFF',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '75px', height: '18px' }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: electricityFacility === '3phase' ? '#FFFFFF' : '#000000',
                        whiteSpace: 'nowrap'
                      }}>
                        3 Phase
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : activeSubTab === 4 ? (
            /* QUESTIONS SELECTORS SECTION FOR ANY EXISTING TREES */
            <div style={{
              position: 'absolute',
              width: '640px',
              height: '321px',
              left: '30px',
              top: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}>
              {/* Question 1: Any Existing Tress available surrounding land? */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '640px', height: '86px' }}>
                <span style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif", 
                  fontWeight: 600, 
                  fontSize: '24px', 
                  lineHeight: '30px', 
                  color: '#000000',
                  margin: 0
                }}>
                  Any Existing Tress available surrounding land?
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '25px', width: '292px', height: '38px' }}>
                  {/* Available Button */}
                  <button 
                    type="button"
                    onClick={() => {
                      setTreeAvailability('Available');
                    }}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '120px',
                      height: '38px',
                      background: treeAvailability === 'Available' ? '#3D92D0' : '#FFFFFF',
                      border: treeAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '84px', height: '18px' }}>
                      {/* Ellipse 488 select dot */}
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: treeAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        width: '62px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: treeAvailability === 'Available' ? '#FFFFFF' : '#000000',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        Available
                      </span>
                    </div>
                  </button>

                  {/* Not Available Button */}
                  <button 
                    type="button"
                    onClick={() => {
                      setTreeAvailability('Not Available');
                    }}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '147px',
                      height: '38px',
                      background: treeAvailability === 'Not Available' ? '#3D92D0' : '#FFFFFF',
                      border: treeAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '111px', height: '18px' }}>
                      {/* Ellipse 488 select dot */}
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: treeAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: treeAvailability === 'Not Available' ? '#FFFFFF' : '#000000',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        Not Available
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Question 2: Tress count */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px', 
                  width: '640px', 
                  height: '82px',
                  position: 'relative',
                  opacity: treeAvailability === 'Not Available' ? 0.3 : 1,
                  pointerEvents: treeAvailability === 'Not Available' ? 'none' : 'auto'
                }}
              >
                <span style={{ 
                  fontFamily: "'Plus Jakarta Sans', sans-serif", 
                  fontWeight: 600, 
                  fontSize: '16px', 
                  lineHeight: '20px', 
                  color: 'rgba(0, 0, 0, 0.92)' 
                }}>
                  Tress count
                </span>
                
                {/* Selector Box */}
                <div 
                  onClick={() => setIsTreeCountDropdownOpen(!isTreeCountDropdownOpen)}
                  style={{
                    boxSizing: 'border-box',
                    width: '640px',
                    height: '54px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.4)',
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px'
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '22px',
                    color: '#000000'
                  }}>
                    {treeCount}
                  </span>
                  
                  {/* Chevron Down Arrow Icon */}
                  <svg 
                    style={{
                      position: 'absolute',
                      right: '26px',
                      top: 'calc(50% - 4px)',
                      width: '13px',
                      height: '8px'
                    }}
                    viewBox="0 0 13 8" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L6.5 6.5L12 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Dropdown Options List */}
                {isTreeCountDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '86px',
                    left: '0px',
                    width: '640px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {['0 - 10', '10 - 20', '20 - 50', '50+'].map((opt) => (
                      <div 
                        key={opt}
                        onClick={() => {
                          setTreeCount(opt);
                          setIsTreeCountDropdownOpen(false);
                        }}
                        style={{
                          padding: '12px 24px',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '16px',
                          color: '#000000',
                          cursor: 'pointer',
                          background: treeCount === opt ? '#F3F3F5' : '#FFFFFF',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (treeCount !== opt) e.currentTarget.style.background = '#F9F9F9';
                        }}
                        onMouseLeave={(e) => {
                          if (treeCount !== opt) e.currentTarget.style.background = '#FFFFFF';
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeSubTab >= 7 ? (
            /* BOUNDARY SELECTORS SECTION FOR EAST, WEST, NORTH, SOUTH */
            <>
              {/* Boundary Title & Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '13px', position: 'absolute', width: '640px', height: '97px', left: '30px', top: '30px' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                  {pills[activeSubTab].label}
                </span>
                
                <div style={{ position: 'relative', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setIsBoundaryDropdownOpen(!isBoundaryDropdownOpen)}
                    style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', cursor: 'pointer', outline: 'none' }}
                  >
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', color: boundarySelections[activeSubTab] ? '#000000' : 'rgba(0,0,0,0.4)' }}>
                      {boundarySelections[activeSubTab] || `What is on the ${pills[activeSubTab].label.toLowerCase().split(' ')[0]} side?`}
                    </span>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {isBoundaryDropdownOpen && (
                    <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                      {['Land', 'Road', 'Water Body', 'Tress', 'Other'].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setBoundarySelections(prev => ({ ...prev, [activeSubTab]: opt }));
                            setIsBoundaryDropdownOpen(false);
                          }}
                          style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1C1E', cursor: 'pointer', transition: 'background 0.2s', background: boundarySelections[activeSubTab] === opt ? '#E5F1F9' : 'transparent' }}
                          onMouseEnter={(e) => { if (boundarySelections[activeSubTab] !== opt) e.currentTarget.style.background = '#F9FAFB'; }}
                          onMouseLeave={(e) => { if (boundarySelections[activeSubTab] !== opt) e.currentTarget.style.background = 'transparent'; }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {boundarySelections[activeSubTab] === 'Land' && (
                <>
                  <span style={{ position: 'absolute', width: '640px', height: '30px', left: '30px', top: '155px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                    Owner details of land
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '203px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>Name</span>
                    <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                      <input type="text" placeholder="Krishna" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '303px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>Age</span>
                    <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                      <input type="text" placeholder="43" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                    </div>
                  </div>
                </>
              )}

              {boundarySelections[activeSubTab] === 'Road' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '18px', position: 'absolute', width: '640px', height: '86px', left: '30px', top: '155px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '24px', lineHeight: '30px', color: '#000000' }}>
                      Type of Road
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '25px', width: '364px', height: '38px' }}>
                      
                      <div 
                        onClick={() => setRoadTypeSelections(prev => ({ ...prev, [activeSubTab]: 'Private Road' }))}
                        style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px 18px', gap: '10px', width: '143px', height: '38px', borderRadius: '33px', cursor: 'pointer', border: roadTypeSelections[activeSubTab] === 'Private Road' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)', background: roadTypeSelections[activeSubTab] === 'Private Road' ? '#2780C4' : 'transparent' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '10px' }}>
                          <div style={{ boxSizing: 'border-box', width: '12px', height: '12px', background: '#FFFFFF', border: '2px solid #85BFE5', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {roadTypeSelections[activeSubTab] === 'Private Road' && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                          </div>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '18px', color: roadTypeSelections[activeSubTab] === 'Private Road' ? '#FFFFFF' : '#000000', whiteSpace: 'nowrap' }}>
                            Private Road
                          </span>
                        </div>
                      </div>

                      <div 
                        onClick={() => setRoadTypeSelections(prev => ({ ...prev, [activeSubTab]: 'Government Road' }))}
                        style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '10px 18px', gap: '10px', width: '196px', height: '38px', borderRadius: '33px', cursor: 'pointer', border: roadTypeSelections[activeSubTab] === 'Government Road' ? '1px solid #FFFFFF' : '1px solid rgba(0, 0, 0, 0.26)', background: roadTypeSelections[activeSubTab] === 'Government Road' ? '#2780C4' : 'transparent' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '10px' }}>
                          <div style={{ boxSizing: 'border-box', width: '12px', height: '12px', background: '#FFFFFF', border: '2px solid #85BFE5', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {roadTypeSelections[activeSubTab] === 'Government Road' && <div style={{ width: '4px', height: '4px', background: '#2780C4', borderRadius: '50%' }} />}
                          </div>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '18px', color: roadTypeSelections[activeSubTab] === 'Government Road' ? '#FFFFFF' : '#000000', whiteSpace: 'nowrap' }}>
                            Government Road
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '269px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>
                      Width of the Road <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>(in Feet)</span>
                    </span>
                    <div style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', position: 'relative' }}>
                      <input type="text" placeholder="100" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, background: 'transparent', border: 'none', padding: '0 24px', fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', outline: 'none' }} />
                    </div>
                  </div>
                </>
              )}

              {boundarySelections[activeSubTab] === 'Tress' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '8px', position: 'absolute', width: '640px', height: '82px', left: '30px', top: '162px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.92)' }}>
                      Trees Count
                    </span>
                    <div style={{ position: 'relative', width: '100%' }}>
                      <button
                        type="button"
                        onClick={() => setIsTreesDropdownOpen(!isTreesDropdownOpen)}
                        style={{ boxSizing: 'border-box', width: '640px', height: '54px', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', cursor: 'pointer', outline: 'none' }}
                      >
                        <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '18px', color: treesSelections[activeSubTab] ? '#000000' : 'rgba(0,0,0,0.4)' }}>
                          {treesSelections[activeSubTab] || '1 - 10'}
                        </span>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {isTreesDropdownOpen && (
                        <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '12px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                          {['1 - 10', '11 - 50', '51 - 100', '100+'].map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setTreesSelections(prev => ({ ...prev, [activeSubTab]: opt }));
                                setIsTreesDropdownOpen(false);
                              }}
                              style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1C1E', cursor: 'pointer', transition: 'background 0.2s', background: treesSelections[activeSubTab] === opt ? '#E5F1F9' : 'transparent' }}
                              onMouseEnter={(e) => { if (treesSelections[activeSubTab] !== opt) e.currentTarget.style.background = '#F9FAFB'; }}
                              onMouseLeave={(e) => { if (treesSelections[activeSubTab] !== opt) e.currentTarget.style.background = 'transparent'; }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            /* STANDARD FILES VIEW */
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
                {/* Cover image attachment if available */}
                {currentFiles.coverImage && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '12px', color: 'rgba(0, 0, 0, 0.74)' }}>
                      Cover image
                    </span>
                    <div style={{ 
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
                            {currentFiles.coverImage.name}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', color: 'rgba(0, 0, 0, 0.7)' }}>
                            {currentFiles.coverImage.size}
                          </span>
                        </div>
                      </div>
                      <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <Download className="w-[18px] h-[18px] text-[#000000]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Uploaded files / images list */}
                {currentFiles.uploadedImages.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '12px', color: 'rgba(0, 0, 0, 0.74)' }}>
                      {activeSubTab === 0 ? "Uploaded images" : "Uploaded files"}
                    </span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentFiles.uploadedImages.map((file, fileIdx) => (
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
                )}
              </div>
            </>
          )}

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
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#000000',
              margin: 0
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.
            </p>
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
              Land and Boundaries
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
                Proceed With <span style={{ color: '#2780C4' }}>‘Valuation’</span> Approval For The Farmland ID: <span style={{ color: '#2780C4' }}>{targetId}</span> to Complete The Verification.
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

export default VerificationOfficerAssignedFarmlandsLandBoundaries;
