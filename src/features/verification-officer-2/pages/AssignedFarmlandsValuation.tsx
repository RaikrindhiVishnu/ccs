import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Download, Check, BadgeCheck, X, ChevronDown } from 'lucide-react';
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

  const currentComment = comments[activeSubTab] || '';
  const currentFiles = subTabsFilesData[activeSubTab] || { uploadedFiles: [] };

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
            <span className="font-plus-jakarta font-normal text-[16px] leading-[18px] text-[#353535]">
              Go Back to Dashboard
            </span>
          </button>

          {/* Top Right Profile Header */}
          <div className="flex flex-row items-center gap-[13px]">
            <button className="flex flex-row justify-center items-center p-2 w-[52px] h-[52px] bg-white rounded-full relative shadow-sm border-none cursor-pointer">
              <Bell className="w-6 h-6 text-[#2C2C2C]" strokeWidth={1.5} />
              <span className="absolute w-[5px] h-[5px] right-[14px] top-[12px] bg-[#EF4646] rounded-full" />
            </button>
            <div className="flex flex-row justify-center items-center w-[52px] h-[52px] bg-white rounded-full overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" alt="User profile avatar" className="w-[52px] h-[52px] object-cover" />
            </div>
          </div>
        </div>

        {/* Main Grid: Stepper and Content */}
        <div className="flex flex-col lg:flex-row w-full gap-6">
           {/* LEFT COLUMN: Stepper Timeline Card */}
           <div className="w-full lg:w-[410px] bg-white rounded-[24px] flex flex-col p-8 shrink-0 relative min-h-[443px]">
             <div className="flex flex-col gap-1 mb-8">
               <span className="font-plus-jakarta font-medium text-[16px] text-black">Farmland ID:</span>
               <span className="font-plus-jakarta font-medium text-[35px] text-black">{targetId}</span>
             </div>

             <div className="relative flex flex-col gap-10 pl-[80px]">
               {/* Vertical Line */}
               <div className="absolute left-[62px] top-[24px] bottom-[24px] w-[1px] border-l border-[#0078FA] opacity-25"></div>

               {/* Step 1 */}
               <div className="relative flex items-center h-[36px]">
                 <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                   {localStorage.getItem(`vo2_status_${targetId}_customer`) === 'approved' ? (
                     <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                       <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                       <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                     </div>
                   ) : (
                     <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                   )}
                 </div>
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#5A5C5E] uppercase w-[173px]">CUSTOMER INFORMATION</span>
               </div>

               {/* Step 2 */}
               <div className="relative flex items-center h-[36px]">
                 <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                   {localStorage.getItem(`vo2_status_${targetId}_boundaries`) === 'approved' ? (
                     <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                       <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                       <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                     </div>
                   ) : (
                     <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                   )}
                 </div>
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#5A5C5E] uppercase w-[173px]">LAND & BOUNDARIES</span>
               </div>

               {/* Step 3 (Active) */}
               <div className="relative flex items-center h-[36px]">
                 <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                   <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                 </div>
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase w-[173px]">VALUATION</span>
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

           {/* Content Column */}
           <div className="flex-1 flex flex-col gap-6 min-w-0">
             
             {/* Bento Grid Pills */}
             <div className="w-full bg-white rounded-[24px] p-6 lg:p-8 flex flex-wrap gap-4 min-h-[150px] content-start">
               {pills.map((pill, idx) => {
                  const isActive = activeSubTab === idx;
                  const isCompleted = completedSubTabs.includes(pill.label);
                  return (
                    <button 
                      key={idx}
                      onClick={() => setActiveSubTab(idx)}
                      className="flex flex-row items-center justify-center px-4 py-[11px] gap-2 h-[41px] bg-[#F9F9F9] rounded-[72px] shadow-sm cursor-pointer whitespace-nowrap"
                      style={{ border: isActive ? '1px solid #0078FA' : isCompleted ? '1px solid #2780C4' : '1px solid transparent' }}
                    >
                      {!isCompleted && (
                        <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">!</div>
                      )}
                      <span className="font-plus-jakarta font-semibold text-[14px] text-[rgba(90,92,94,0.74)]">
                        {pill.label}
                      </span>
                      {isCompleted && (
                        <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                          <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                          <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  );
               })}
             </div>

             {/* BOTTOM CARD: Sub-tab specific sections */}
             <div className="w-full bg-white rounded-[24px] p-6 lg:p-8 flex flex-col gap-8 min-h-[443px] relative">
               
               <div className="flex flex-col xl:flex-row gap-8 w-full flex-1">
                 
                 {/* Left Content Area (Forms/Files) */}
                 <div className="flex-1 flex flex-col gap-6 min-w-0">
                   
                   {activeSubTab <= 3 ? (
                     <>
                       <span className="font-plus-jakarta font-semibold text-[24px] text-black">Uploaded Files</span>
                       <div className="w-full bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex flex-col gap-6 max-h-[355px] overflow-y-auto custom-scrollbar">
                         {currentFiles.uploadedFiles && currentFiles.uploadedFiles.length > 0 && (
                           <div className="flex flex-col gap-2 w-full max-w-[280px]">
                             <span className="font-plus-jakarta font-medium text-[12px] text-black/70">Uploaded files</span>
                             <div className="flex flex-col gap-3">
                               {currentFiles.uploadedFiles.map((file, fileIdx) => (
                                 <div key={fileIdx} className="flex items-center justify-between px-4 py-3 bg-[#E5F1F9] rounded-[12px] w-full h-[59px]">
                                   <div className="flex items-center gap-[10px]">
                                     <div className="w-[29px] h-[29px] bg-white rounded flex items-center justify-center">
                                       <FileText className="w-[17px] h-[17px] text-[#F15642]" />
                                     </div>
                                     <div className="flex flex-col">
                                       <span className="font-inter text-[14px] text-black">{file.name}</span>
                                       <span className="font-inter text-[8px] text-black/70">{file.size}</span>
                                     </div>
                                   </div>
                                   <button className="border-none bg-transparent cursor-pointer">
                                     <Download className="w-[18px] h-[18px] text-black" />
                                   </button>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                     </>
                   ) : activeSubTab === 4 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[18px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Type of Road Approach</span>
                         <div className="flex flex-row flex-wrap gap-4">
                           {['Private Road', 'Government Road'].map(opt => (
                             <button key={opt} onClick={() => setRoadType(opt)} className={`flex items-center px-[18px] py-[10px] gap-[10px] rounded-[33px] cursor-pointer ${roadType === opt ? 'bg-[#2B2D2F] border-black' : 'bg-white border-black/25'} border`}>
                               <div className="w-3 h-3 rounded-full border-2 border-[#85BFE5] bg-white flex items-center justify-center shrink-0">
                                 {roadType === opt && <div className="w-full h-full bg-[#3D93D1] rounded-full" />}
                               </div>
                               <span className={`font-plus-jakarta font-semibold text-[14px] ${roadType === opt ? 'text-white' : 'text-black'}`}>{opt}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                       <div className="flex flex-col gap-2">
                         <span className="font-plus-jakarta font-semibold text-[16px] text-black/90">Width of the Road (in Feet)</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={roadWidth} onChange={(e) => setRoadWidth(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   ) : activeSubTab === 5 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[18px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Any recent transaction in surrounding lands?</span>
                         <div className="flex flex-row flex-wrap gap-4">
                           {['Available', 'Not Available'].map(opt => (
                             <button key={opt} onClick={() => setTxAvailability(opt)} className={`flex items-center px-[18px] py-[10px] gap-[10px] rounded-[33px] cursor-pointer ${txAvailability === opt ? 'bg-[#2B2D2F] border-black' : 'bg-white border-black/25'} border`}>
                               <div className="w-3 h-3 rounded-full border-2 border-[#85BFE5] bg-white flex items-center justify-center shrink-0">
                                 {txAvailability === opt && <div className="w-full h-full bg-[#3D93D1] rounded-full" />}
                               </div>
                               <span className={`font-plus-jakarta font-semibold text-[14px] ${txAvailability === opt ? 'text-white' : 'text-black'}`}>{opt}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                       <div className={`flex flex-col gap-2 ${txAvailability === 'Not Available' ? 'opacity-30 pointer-events-none' : ''}`}>
                         <span className="font-plus-jakarta font-semibold text-[16px] text-black/90">Valuation Per Acre</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={valuationPerAcre} onChange={(e) => setValuationPerAcre(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                       <div className={`flex flex-col gap-2 ${txAvailability === 'Not Available' ? 'opacity-30 pointer-events-none' : ''}`}>
                         <span className="font-plus-jakarta font-semibold text-[16px] text-black/90">Local Market Acre Price</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={localMarketAcrePrice} onChange={(e) => setLocalMarketAcrePrice(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   ) : activeSubTab === 6 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[24px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Any Surrounding Mines & Geological Advantages?</span>
                         <div className="flex flex-row flex-wrap gap-4">
                           {['Available', 'Not Available'].map(opt => (
                             <button key={opt} onClick={() => setGeoAvailability(opt)} className={`flex items-center px-[18px] py-[10px] gap-[10px] rounded-[33px] cursor-pointer ${geoAvailability === opt ? 'bg-[#2B2D2F] border-black' : 'bg-white border-black/25'} border`}>
                               <div className="w-3 h-3 rounded-full border-2 border-[#85BFE5] bg-white flex items-center justify-center shrink-0">
                                 {geoAvailability === opt && <div className="w-full h-full bg-[#3D93D1] rounded-full" />}
                               </div>
                               <span className={`font-plus-jakarta font-semibold text-[14px] ${geoAvailability === opt ? 'text-white' : 'text-black'}`}>{opt}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                     </div>
                   ) : activeSubTab === 7 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] text-black">Future Plans of Geographical Advantages</span>
                     </div>
                   ) : activeSubTab === 8 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] text-black">Validating the Disadvantages of the Land</span>
                     </div>
                   ) : activeSubTab === 9 ? (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] text-black">Upcoming Infrastructures</span>
                       <div className="relative w-full">
                         <select value={upcomingInfra} onChange={(e) => setUpcomingInfra(e.target.value)} className="w-full h-[54px] bg-white border border-black/40 rounded-lg px-6 font-plus-jakarta text-[16px] text-black appearance-none outline-none cursor-pointer">
                           <option value="" disabled hidden>Select Upcoming Infrastructure</option>
                           <option value="Highway Expansion">Highway Expansion</option>
                           <option value="Metro/Railway Project">Metro/Railway Project</option>
                           <option value="Industrial Corridor">Industrial Corridor</option>
                           <option value="No Major Project Planned">No Major Project Planned</option>
                         </select>
                         <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#363434] pointer-events-none" />
                       </div>
                     </div>
                   ) : activeSubTab === 10 ? (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[24px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Any Railway Track Connectivity?</span>
                         <div className="flex flex-row flex-wrap gap-4">
                           {['Available', 'Not Available'].map(opt => (
                             <button key={opt} onClick={() => setRailwayAvailability(opt)} className={`flex items-center px-[18px] py-[10px] gap-[10px] rounded-[33px] cursor-pointer ${railwayAvailability === opt ? 'bg-[#2B2D2F] border-black' : 'bg-white border-black/25'} border`}>
                               <div className="w-3 h-3 rounded-full border-2 border-[#85BFE5] bg-white flex items-center justify-center shrink-0">
                                 {railwayAvailability === opt && <div className="w-full h-full bg-[#3D93D1] rounded-full" />}
                               </div>
                               <span className={`font-plus-jakarta font-semibold text-[14px] ${railwayAvailability === opt ? 'text-white' : 'text-black'}`}>{opt}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                       <div className="flex flex-col gap-[13px] w-full">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Select distance</span>
                         <div className="relative w-full">
                           <select disabled={railwayAvailability === 'Not Available'} value={railwayDistance} onChange={(e) => setRailwayDistance(e.target.value)} className={`w-full h-[54px] border border-black/40 rounded-lg px-6 font-inter text-[18px] appearance-none outline-none ${railwayAvailability === 'Not Available' ? 'bg-[#F5F5F5] text-black/40 cursor-not-allowed' : 'bg-white text-black cursor-pointer'}`}>
                             <option value="0 - 10 kms">0 - 10 kms</option>
                             <option value="10 - 20 kms">10 - 20 kms</option>
                             <option value="20 - 50 kms">20 - 50 kms</option>
                             <option value="50+ kms">50+ kms</option>
                           </select>
                           <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#363434] pointer-events-none" />
                         </div>
                       </div>
                     </div>
                   ) : (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[24px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Any Airport Connectivity?</span>
                         <div className="flex flex-row flex-wrap gap-4">
                           {['Available', 'Not Available'].map(opt => (
                             <button key={opt} onClick={() => setAirportAvailability(opt)} className={`flex items-center px-[18px] py-[10px] gap-[10px] rounded-[33px] cursor-pointer ${airportAvailability === opt ? 'bg-[#2B2D2F] border-black' : 'bg-white border-black/25'} border`}>
                               <div className="w-3 h-3 rounded-full border-2 border-[#85BFE5] bg-white flex items-center justify-center shrink-0">
                                 {airportAvailability === opt && <div className="w-full h-full bg-[#3D93D1] rounded-full" />}
                               </div>
                               <span className={`font-plus-jakarta font-semibold text-[14px] ${airportAvailability === opt ? 'text-white' : 'text-black'}`}>{opt}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                       <div className="flex flex-col gap-[13px] w-full">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">Select distance</span>
                         <div className="relative w-full">
                           <select disabled={airportAvailability === 'Not Available'} value={airportDistance} onChange={(e) => setAirportDistance(e.target.value)} className={`w-full h-[54px] border border-black/40 rounded-lg px-6 font-inter text-[18px] appearance-none outline-none ${airportAvailability === 'Not Available' ? 'bg-[#F5F5F5] text-black/40 cursor-not-allowed' : 'bg-white text-black cursor-pointer'}`}>
                             <option value="0 - 10 kms">0 - 10 kms</option>
                             <option value="10 - 20 kms">10 - 20 kms</option>
                             <option value="20 - 50 kms">20 - 50 kms</option>
                             <option value="50+ kms">50+ kms</option>
                           </select>
                           <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#363434] pointer-events-none" />
                         </div>
                       </div>
                     </div>
                   )}

                 </div>

                 {/* Right Content Area (Comments) */}
                 <div className="w-full xl:w-[400px] flex flex-col gap-4 shrink-0 mt-8 xl:mt-0">
                   <span className="font-plus-jakarta font-semibold text-[24px] text-black">{activeSubTab >= 7 && activeSubTab <= 8 ? 'Write a comment' : 'Add Comments'}</span>
                   <div className="w-full h-[181px] bg-[rgba(187,219,240,0.38)] border border-[#96C9ED] rounded-[18px] p-6">
                     <textarea value={currentComment} onChange={(e) => handleCommentChange(e.target.value)} placeholder={activeSubTab >= 7 && activeSubTab <= 8 ? "Write a comment" : ""} className="w-full h-full bg-transparent border-none outline-none resize-none font-poppins text-[14px] leading-[21px] text-black" />
                   </div>
                 </div>

               </div>

               {/* Actions Footer */}
               <div className="flex flex-row justify-end items-center gap-3 w-full mt-4">
                 <button onClick={handleTurnBack} className="flex items-center justify-center px-[10px] w-[121px] h-[38px] border border-black/30 rounded-[33px] bg-transparent font-plus-jakarta font-medium text-[14px] text-black/80 cursor-pointer">
                   Turn Back
                 </button>
                 <button onClick={handleApprove} className="flex items-center justify-center px-[10px] w-[121px] h-[38px] bg-[#2780C4] rounded-[33px] border-none font-plus-jakarta font-semibold text-[14px] text-white cursor-pointer">
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
            <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black text-center w-full mb-6">Valuation</span>
            
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
              Proceed With <span className="text-[#2780C4]">‘Valuation’</span> Approval For The Farmland ID: <span className="text-[#2780C4]">{targetId}</span> to Complete The Verification.
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
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" alt="User profile avatar" className="w-[52px] h-[52px] object-cover" />
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

export default VerificationOfficerAssignedFarmlandsValuation;
