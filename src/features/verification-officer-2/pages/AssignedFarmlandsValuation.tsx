import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Download, Check, BadgeCheck, X } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

export const VerificationOfficerAssignedFarmlandsValuation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1084);
  const targetId = id || "GLCSOS 01";

  // State hooks for sub-tab selection and completion tracking
  const [activeSubTab, setActiveSubTab] = React.useState<number>(0);
  const [completedSubTabs, setCompletedSubTabs] = React.useState<string[]>([]);

  // Road Approach states
  const [roadType, setRoadType] = React.useState<'Private Road' | 'Government Road'>('Government Road');
  const [roadWidth, setRoadWidth] = React.useState<string>('100');

  // Recent Transactions states
  const [txAvailability, setTxAvailability] = React.useState<'Available' | 'Not Available'>('Available');
  const [valuationPerAcre, setValuationPerAcre] = React.useState<string>('10,00,000.00');
  const [localMarketAcrePrice, setLocalMarketAcrePrice] = React.useState<string>('10,00,000.00');

  // Geological Advantages states
  const [geoAvailability, setGeoAvailability] = React.useState<'Available' | 'Not Available'>('Available');

  // Upcoming Infrastructures states
  const [upcomingInfra, setUpcomingInfra] = React.useState<string>('Highway Expansion');

  // Railway Track Connectivity states
  const [railwayAvailability, setRailwayAvailability] = React.useState<'Available' | 'Not Available'>('Available');
  const [railwayDistance, setRailwayDistance] = React.useState<string>('0 - 10 kms');

  // Airport Connectivity states
  const [airportAvailability, setAirportAvailability] = React.useState<'Available' | 'Not Available'>('Available');
  const [airportDistance, setAirportDistance] = React.useState<string>('0 - 10 kms');

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
    10: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur.",
    11: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur."
  });

  // Approve Modal state
  const [showApproveModal, setShowApproveModal] = React.useState(false);

  // Turnback modal state
  const [showTurnbackModal, setShowTurnbackModal] = React.useState(false);
  const [turnbackReason, setTurnbackReason] = React.useState('');


  // Grid pills config (12 items)
  const pills = [
    { label: "Village Map or Naksha", width: '229px' },
    { label: "Sub - Register Value", width: '218px' },
    { label: "Valuator Report", width: '188px' },
    { label: "Legal Opinion Report", width: '225px' },
    { label: "Road Approach", width: '188px' },
    { label: "Recent Transactions", width: '219px' },
    { label: "Geological Advantages", width: '240px' },
    { label: "Future Plans", width: '165px' },
    { label: "Validating Disadvantages", width: '291px' },
    { label: "Upcoming Infrastrucutres", width: '256px' },
    { label: "Railway Track Connectivity", width: '263px' },
    { label: "Airport Connectivity", width: '220px' }
  ];

  // File database per sub-tab (0 to 3)
  interface MockFile {
    name: string;
    size: string;
  }
  interface SubTabFiles {
    uploadedFiles: MockFile[];
  }

  const subTabsFilesData: Record<number, SubTabFiles> = {
    0: {
      uploadedFiles: [
        { name: "File_name_1.pdf", size: "2MB" },
        { name: "File_name_1.pdf", size: "6MB" }
      ]
    },
    1: {
      uploadedFiles: [
        { name: "File_name_1.pdf", size: "2MB" },
        { name: "File_name_1.pdf", size: "6MB" }
      ]
    },
    2: {
      uploadedFiles: [
        { name: "File_name_1.pdf", size: "2MB" },
        { name: "File_name_1.pdf", size: "6MB" }
      ]
    },
    3: {
      uploadedFiles: [
        { name: "File_name_1.pdf", size: "2MB" },
        { name: "File_name_1.pdf", size: "6MB" }
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
    if (activeSubTab < 11) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      localStorage.setItem(`vo2_status_${targetId}_valuation`, 'turnedback');
      navigate(`/verification-officer-2/assigned-farmlands-agriculture/${targetId}`);
    }
  };

  const handleApprove = () => {
    const currentLabel = pills[activeSubTab].label;
    if (!completedSubTabs.includes(currentLabel)) {
      setCompletedSubTabs([...completedSubTabs, currentLabel]);
    }

    if (activeSubTab < 11) {
      setActiveSubTab(activeSubTab + 1);
    } else {
      setShowApproveModal(true);
    }
  };

  const handleProceed = () => {
    setShowApproveModal(false);
    localStorage.setItem(`vo2_status_${targetId}_valuation`, 'approved');
    navigate(`/verification-officer-2/assigned-farmlands-agriculture/${targetId}`);
  };

  const handleCommentChange = (val: string) => {
    setComments(prev => ({
      ...prev,
      [activeSubTab]: val
    }));
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

  const currentFiles = subTabsFilesData[activeSubTab] || { uploadedFiles: [] };
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
          <div style={{ position: 'absolute', left: '143px', top: '299px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', height: '18px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', width: '81px', height: '18px' }}>VALUATION</span>
          </div>
          <div style={{ position: 'absolute', left: '143px', top: '377px' }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', textTransform: 'uppercase', color: '#FFBC8A', height: '36px', width: '118px' }}>AGRICULTURE &<br/>REPORT</span>
          </div>

          {/* Step Dots */}
          {[136, 218, 296, 374].map((top, index) => {
            const isCustomerApproved = localStorage.getItem(`vo2_status_${targetId}_customer`) === 'approved';
            const isBoundariesApproved = localStorage.getItem(`vo2_status_${targetId}_boundaries`) === 'approved';
            const showCheckmark = (index === 0 && isCustomerApproved) || (index === 1 && isBoundariesApproved);

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
              {pills.slice(6, 9).map((pill, idx) => renderPill(pill, idx + 6))}
            </div>

            {/* Row 4 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', width: '100%', height: '41.22px' }}>
              {pills.slice(9, 12).map((pill, idx) => renderPill(pill, idx + 9))}
            </div>
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
          
          {activeSubTab <= 3 ? (
            /* TABS 0 - 3: STANDARD FILES VIEW */
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
                {currentFiles.uploadedFiles.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: '12px', color: 'rgba(0, 0, 0, 0.74)' }}>
                      Uploaded files
                    </span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentFiles.uploadedFiles.map((file, fileIdx) => (
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
            /* TAB 4: ROAD APPROACH */
            <>
              {/* Type of Road Approach */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '86px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '18px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Type of Road Approach
                </span>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '25px',
                  width: '364px',
                  height: '38px'
                }}>
                  {/* Private Road button */}
                  <button
                    onClick={() => setRoadType('Private Road')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '143px',
                      height: '38px',
                      background: roadType === 'Private Road' ? '#2B2D2F' : '#FFFFFF',
                      border: roadType === 'Private Road' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '107px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: roadType === 'Private Road' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '85px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: roadType === 'Private Road' ? '#FFFFFF' : '#000000'
                      }}>
                        Private Road
                      </span>
                    </div>
                  </button>

                  {/* Government Road button */}
                  <button
                    onClick={() => setRoadType('Government Road')}
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
                      background: roadType === 'Government Road' ? '#2B2D2F' : '#FFFFFF',
                      border: roadType === 'Government Road' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '160px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: roadType === 'Government Road' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '138px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: roadType === 'Government Road' ? '#FFFFFF' : '#000000'
                      }}>
                        Governement Road
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Width of the Road (in Feet) */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                position: 'absolute',
                width: '640px',
                height: '82px',
                left: '30px',
                top: '144px'
              }}>
                <span style={{
                  width: '640px',
                  height: '20px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: 'rgba(0, 0, 0, 0.92)'
                }}>
                  Width of the Road (in Feet)
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
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
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

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
            /* TAB 5: RECENT TRANSACTIONS */
            <>
              {/* Any recent transaction in surrounding lands? */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '86px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '18px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Any recent transaction in surrounding lands?
                </span>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '25px',
                  width: '292px',
                  height: '38px'
                }}>
                  {/* Available button */}
                  <button
                    onClick={() => setTxAvailability('Available')}
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
                      background: txAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                      border: txAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '84px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: txAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '62px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        color: txAvailability === 'Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Available
                      </span>
                    </div>
                  </button>

                  {/* Not Available button */}
                  <button
                    onClick={() => setTxAvailability('Not Available')}
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
                      background: txAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                      border: txAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '111px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: txAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: txAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Not Available
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Valuation Per Acre */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                position: 'absolute',
                width: '640px',
                height: '82px',
                left: '30px',
                top: '144px',
                opacity: txAvailability === 'Not Available' ? 0.3 : 1,
                pointerEvents: txAvailability === 'Not Available' ? 'none' : 'auto'
              }}>
                <span style={{
                  width: '640px',
                  height: '20px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: 'rgba(0, 0, 0, 0.92)'
                }}>
                  Valuation Per Acre
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
                    value={valuationPerAcre}
                    onChange={(e) => setValuationPerAcre(e.target.value)}
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

              {/* Local Market Acre Price */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                position: 'absolute',
                width: '640px',
                height: '82px',
                left: '30px',
                top: '254px',
                opacity: txAvailability === 'Not Available' ? 0.3 : 1,
                pointerEvents: txAvailability === 'Not Available' ? 'none' : 'auto'
              }}>
                <span style={{
                  width: '640px',
                  height: '20px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: 'rgba(0, 0, 0, 0.92)'
                }}>
                  Locall Market Acre Price
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
                    value={localMarketAcrePrice}
                    onChange={(e) => setLocalMarketAcrePrice(e.target.value)}
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

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
            /* TAB 6: GEOLOGICAL ADVANTAGES */
            <>
              {/* Any Surrounding Mines & Geological Advantages? */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '92px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Any Surrounding Mines & Geological Advantages?
                </span>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '25px',
                  width: '307px',
                  height: '38px'
                }}>
                  {/* Available button */}
                  <button
                    onClick={() => setGeoAvailability('Available')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '135px',
                      height: '38px',
                      background: geoAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                      border: geoAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '97px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: geoAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: geoAvailability === 'Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Available
                      </span>
                    </div>
                  </button>

                  {/* Not Available button */}
                  <button
                    onClick={() => setGeoAvailability('Not Available')}
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
                      background: geoAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                      border: geoAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '111px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: geoAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: geoAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Not Available
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
            /* TAB 7: FUTURE PLANS */
            <>
              {/* Future Plans of Geographical Advantages */}
              <span style={{
                position: 'absolute',
                width: '476px',
                height: '30px',
                left: '30px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                color: '#000000'
              }}>
                Future Plans of Geographical Advantages
              </span>

              {/* Comments textarea box — left:30, top:73, 618×181px */}
              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '30px',
                top: '73px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(187, 219, 240, 0.38)',
                  border: '1px solid #96C9ED',
                  borderRadius: '18px'
                }} />
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  placeholder="Write a comment"
                  style={{
                    position: 'absolute',
                    width: '566px',
                    height: '133px',
                    left: '26px',
                    top: '24px',
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
            </>
          ) : activeSubTab === 8 ? (
            /* TAB 8: VALIDATING DISADVANTAGES */
            <>
              {/* Validating the Disadvantages of the Land */}
              <span style={{
                position: 'absolute',
                width: '550px',
                height: '30px',
                left: '30px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                color: '#000000'
              }}>
                Validating the Disadvantages of the Land
              </span>

              {/* Comments textarea box — left:30, top:73, 618×181px */}
              <div style={{
                position: 'absolute',
                width: '618px',
                height: '181px',
                left: '30px',
                top: '73px'
              }}>
                <div style={{
                  boxSizing: 'border-box',
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(187, 219, 240, 0.38)',
                  border: '1px solid #96C9ED',
                  borderRadius: '18px'
                }} />
                <textarea
                  value={currentComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  placeholder="Write a comment"
                  style={{
                    position: 'absolute',
                    width: '566px',
                    height: '133px',
                    left: '26px',
                    top: '24px',
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
            </>
          ) : activeSubTab === 9 ? (
            /* TAB 9: UPCOMING INFRASTRUCTURES */
            <>
              {/* Upcoming Infrastructures */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '97px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '13px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Upcoming Infrastructures
                </span>

                <div style={{
                  position: 'relative',
                  width: '640px',
                  height: '54px'
                }}>
                  <select
                    value={upcomingInfra}
                    onChange={(e) => setUpcomingInfra(e.target.value)}
                    style={{
                      boxSizing: 'border-box',
                      width: '640px',
                      height: '54px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 45px 0 20px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '16px',
                      color: upcomingInfra ? '#000000' : 'rgba(0, 0, 0, 0.4)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="" disabled hidden>Select Upcoming Infrastructure</option>
                    <option value="Highway Expansion">Highway Expansion</option>
                    <option value="Metro/Railway Project">Metro/Railway Project</option>
                    <option value="Industrial Corridor">Industrial Corridor</option>
                    <option value="No Major Project Planned">No Major Project Planned</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div style={{
                    position: 'absolute',
                    right: '25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    width: '12px',
                    height: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
          ) : activeSubTab === 10 ? (
            /* TAB 10: RAILWAY CONNECTIVITY */
            <>
              {/* Any Railway Track Connectivity? */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '92px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Any Railway Track Connectivity?
                </span>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '25px',
                  width: '292px',
                  height: '38px'
                }}>
                  {/* Available button */}
                  <button
                    onClick={() => setRailwayAvailability('Available')}
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
                      background: railwayAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                      border: railwayAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '84px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: railwayAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '62px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        color: railwayAvailability === 'Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Available
                      </span>
                    </div>
                  </button>

                  {/* Not Available button */}
                  <button
                    onClick={() => setRailwayAvailability('Not Available')}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 18px',
                      gap: '10px',
                      width: '147px',
                      height: '38px',
                      background: railwayAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                      border: railwayAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '111px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: railwayAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: railwayAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Not Available
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Select distance block */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '97px',
                left: '30px',
                top: '156px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '13px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Select distance
                </span>

                <div style={{
                  position: 'relative',
                  width: '640px',
                  height: '54px'
                }}>
                  <select
                    disabled={railwayAvailability === 'Not Available'}
                    value={railwayDistance}
                    onChange={(e) => setRailwayDistance(e.target.value)}
                    style={{
                      boxSizing: 'border-box',
                      width: '640px',
                      height: '54px',
                      background: railwayAvailability === 'Not Available' ? '#F5F5F5' : '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 45px 0 24px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '18px',
                      color: railwayAvailability === 'Not Available' ? 'rgba(0, 0, 0, 0.38)' : '#000000',
                      cursor: railwayAvailability === 'Not Available' ? 'not-allowed' : 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="0 - 10 kms">0 - 10 kms</option>
                    <option value="10 - 20 kms">10 - 20 kms</option>
                    <option value="20 - 50 kms">20 - 50 kms</option>
                    <option value="50+ kms">50+ kms</option>
                  </select>
                  {/* Arrow vector */}
                  <div style={{
                    position: 'absolute',
                    right: '25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    width: '12px',
                    height: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
            /* TAB 11: AIRPORT CONNECTIVITY */
            <>
              {/* Any Airport Connectivity? */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '92px',
                left: '30px',
                top: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Any Airpot Connectivity?
                </span>

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '25px',
                  width: '292px',
                  height: '38px'
                }}>
                  {/* Available button */}
                  <button
                    onClick={() => setAirportAvailability('Available')}
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
                      background: airportAvailability === 'Available' ? '#2B2D2F' : '#FFFFFF',
                      border: airportAvailability === 'Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '84px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: airportAvailability === 'Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '62px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        color: airportAvailability === 'Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Available
                      </span>
                    </div>
                  </button>

                  {/* Not Available button */}
                  <button
                    onClick={() => setAirportAvailability('Not Available')}
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
                      background: airportAvailability === 'Not Available' ? '#2B2D2F' : '#FFFFFF',
                      border: airportAvailability === 'Not Available' ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.26)',
                      borderRadius: '33px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      width: '111px',
                      height: '18px'
                    }}>
                      <div style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        background: airportAvailability === 'Not Available' ? '#3D93D1' : '#FFFFFF',
                        border: '2px solid #85BFE5',
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        width: '89px',
                        height: '18px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: airportAvailability === 'Not Available' ? '#FFFFFF' : '#000000'
                      }}>
                        Not Available
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Select distance block */}
              <div style={{
                position: 'absolute',
                width: '640px',
                height: '97px',
                left: '30px',
                top: '156px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '13px'
              }}>
                <span style={{
                  width: '640px',
                  height: '30px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '30px',
                  color: '#000000'
                }}>
                  Select distance
                </span>

                <div style={{
                  position: 'relative',
                  width: '640px',
                  height: '54px'
                }}>
                  <select
                    disabled={airportAvailability === 'Not Available'}
                    value={airportDistance}
                    onChange={(e) => setAirportDistance(e.target.value)}
                    style={{
                      boxSizing: 'border-box',
                      width: '640px',
                      height: '54px',
                      background: airportAvailability === 'Not Available' ? '#F5F5F5' : '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0 45px 0 24px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '18px',
                      color: airportAvailability === 'Not Available' ? 'rgba(0, 0, 0, 0.38)' : '#000000',
                      cursor: airportAvailability === 'Not Available' ? 'not-allowed' : 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  >
                    <option value="0 - 10 kms">0 - 10 kms</option>
                    <option value="10 - 20 kms">10 - 20 kms</option>
                    <option value="20 - 50 kms">20 - 50 kms</option>
                    <option value="50+ kms">50+ kms</option>
                  </select>
                  {/* Arrow vector */}
                  <div style={{
                    position: 'absolute',
                    right: '25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    width: '12px',
                    height: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke="#363434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <span style={{
                position: 'absolute',
                width: '182px',
                height: '30px',
                left: '716px',
                top: '30px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000'
              }}>
                Add Comments
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
              Valuation
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

export default VerificationOfficerAssignedFarmlandsValuation;
