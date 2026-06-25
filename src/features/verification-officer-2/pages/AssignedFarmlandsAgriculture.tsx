import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, FileText, Download, Check, BadgeCheck, Search, ChevronDown, X } from 'lucide-react';
export const VerificationOfficerAssignedFarmlandsAgriculture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const currentComment = comments[activeSubTab] || '';

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
               <div className="absolute left-[90px] top-[24px] bottom-[24px] w-[1px] border-l border-[#0078FA] opacity-25"></div>

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
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#5A5C5E] uppercase">CUSTOMER INFORMATION</span>
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
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#5A5C5E] uppercase">LAND & BOUNDARIES</span>
               </div>

               {/* Step 3 */}
               <div className="relative flex items-center h-[36px]">
                 <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                   {localStorage.getItem(`vo2_status_${targetId}_valuation`) === 'approved' ? (
                     <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                       <BadgeCheck className="w-[18px] h-[18px] text-[#3D93D1]" fill="#3D93D1" />
                       <Check className="absolute w-[10px] h-[10px] text-white" strokeWidth={4} />
                     </div>
                   ) : (
                     <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                   )}
                 </div>
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#5A5C5E] uppercase">VALUATION</span>
               </div>

               {/* Step 4 */}
               <div className="relative flex items-center h-[36px]">
                 <div className="absolute -left-[30px] w-[24px] h-[24px] bg-white border-[0.2px] border-black/15 rounded-full flex items-center justify-center z-10">
                   <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                 </div>
                 <span className="font-plus-jakarta font-semibold text-[14px] leading-[18px] text-[#FFBC8A] uppercase">AGRICULTURE &<br/>REPORT</span>
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
                      style={{ border: isActive ? '1px solid #0078FA' : isCompleted ? '1px solid #A5B767' : '1px solid transparent' }}
                    >
                      {!isCompleted && (
                        <div className="w-[18px] h-[18px] bg-[#FFBC8A] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">!</div>
                      )}
                      <span className="font-plus-jakarta font-semibold text-[14px]" style={{ color: isActive ? '#0078FA' : isCompleted ? '#2780C4' : 'rgba(90, 92, 94, 0.74)' }}>
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
                   
                   {activeSubTab <= 1 && (
                     <>
                       <span className="font-plus-jakarta font-semibold text-[24px] text-black">Uploaded Files</span>
                       <div className="w-full bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex flex-col gap-6 max-h-[355px] overflow-y-auto custom-scrollbar">
                         <div className="flex flex-col gap-2 w-full max-w-[280px]">
                           <span className="font-plus-jakarta font-medium text-[12px] text-black/70">Uploaded files</span>
                           <div className="flex flex-col gap-3">
                             {[{ name: "File_name_1.pdf", size: "8MB" }, { name: "File_name_1.pdf", size: "8MB" }].map((file, fileIdx) => (
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
                       </div>
                     </>
                   )}

                   {activeSubTab === 2 && (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Soil Type</span>
                       <div className="relative w-full">
                         <button onClick={() => setIsSoilDropdownOpen(!isSoilDropdownOpen)} className="w-full h-[54px] bg-white border border-black/40 rounded-lg px-6 flex items-center justify-between cursor-pointer">
                           <span className="font-inter text-[16px]" style={{ color: soilType ? 'black' : 'rgba(0,0,0,0.4)' }}>{soilType || 'Select Soil Type'}</span>
                           <ChevronDown className="w-5 h-5 text-[#363434]" />
                         </button>
                         {isSoilDropdownOpen && (
                           <div className="absolute top-[58px] left-0 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 max-h-[200px] overflow-y-auto">
                             {soilOptions.map(opt => (
                               <div key={opt} onClick={() => { setSoilType(opt); setIsSoilDropdownOpen(false); }} className="px-4 py-3 font-inter text-[14px] text-[#1A1C1E] cursor-pointer hover:bg-gray-50" style={{ background: soilType === opt ? '#E5F1F9' : 'transparent' }}>
                                 {opt}
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                   {activeSubTab === 3 && (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Types of Crops available present?</span>
                       <div className="relative w-full">
                         <button onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)} className="w-full h-[54px] bg-white border border-black/40 rounded-lg px-6 flex items-center justify-between cursor-pointer">
                           <span className="font-inter text-[16px]" style={{ color: cropType ? 'black' : 'rgba(0,0,0,0.4)' }}>{cropType || 'Select Crop'}</span>
                           <ChevronDown className="w-5 h-5 text-[#363434]" />
                         </button>
                         {isCropDropdownOpen && (
                           <div className="absolute top-[58px] left-0 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 max-h-[200px] overflow-y-auto">
                             {cropTypeOptions.map(opt => (
                               <div key={opt} onClick={() => { setCropType(opt); setIsCropDropdownOpen(false); }} className="px-4 py-3 font-inter text-[14px] text-[#1A1C1E] cursor-pointer hover:bg-gray-50" style={{ background: cropType === opt ? '#E5F1F9' : 'transparent' }}>
                                 {opt}
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                   {activeSubTab === 4 && (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Depth of Ground Water Level</span>
                       <div className="relative w-full">
                         <button onClick={() => setIsWaterDropdownOpen(!isWaterDropdownOpen)} className="w-full h-[54px] bg-white border border-black/40 rounded-lg px-6 flex items-center justify-between cursor-pointer">
                           <span className="font-inter text-[16px]" style={{ color: groundWater ? 'black' : 'rgba(0,0,0,0.4)' }}>{groundWater || 'Select Depth'}</span>
                           <ChevronDown className="w-5 h-5 text-[#363434]" />
                         </button>
                         {isWaterDropdownOpen && (
                           <div className="absolute top-[58px] left-0 w-full bg-white border border-black/10 rounded-xl shadow-lg z-50 max-h-[200px] overflow-y-auto">
                             {waterOptions.map(opt => (
                               <div key={opt} onClick={() => { setGroundWater(opt); setIsWaterDropdownOpen(false); }} className="px-4 py-3 font-inter text-[14px] text-[#1A1C1E] cursor-pointer hover:bg-gray-50" style={{ background: groundWater === opt ? '#E5F1F9' : 'transparent' }}>
                                 {opt}
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                   {activeSubTab === 5 && (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[640px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Types of Crop can be Grown in Future</span>
                       <div className="relative w-full">
                         <button onClick={() => setIsCropsDropdownOpen(!isCropsDropdownOpen)} className="w-full min-h-[54px] bg-white border-[1.5px] border-black/40 rounded-lg px-6 py-2 flex items-center justify-between cursor-pointer">
                           {cropsGrown.length === 0 ? (
                             <span className="font-poppins text-[14px] text-black/40">Select types</span>
                           ) : (
                             <div className="flex flex-row gap-4 flex-wrap">
                               {cropsGrown.map((crop) => (
                                 <div key={crop} className="flex items-center gap-2">
                                   <div className="w-[18px] h-[18px] bg-[#3D93D1] border-[1.5px] border-[#F1F1FF] rounded-[2px] flex items-center justify-center">
                                     <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                       <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                   </div>
                                   <span className="font-poppins font-medium text-[14px] text-[#138FFF]">{crop}</span>
                                 </div>
                               ))}
                             </div>
                           )}
                           <ChevronDown className="w-5 h-5 text-[#363434] shrink-0 ml-2" />
                         </button>
                         {isCropsDropdownOpen && (
                           <div className="absolute top-[100%] mt-2 left-0 w-full bg-white border border-[#999999] rounded-lg z-50 p-4 shadow-lg">
                             <div className="w-full h-[44px] bg-white border border-[#C5C1C1] rounded-[79px] flex items-center px-4 mb-4">
                               <Search className="w-5 h-5 text-black/60 shrink-0" />
                               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className="flex-1 bg-transparent border-none outline-none ml-[10px] font-inter text-[16px] text-black" />
                             </div>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-2 h-[180px] overflow-y-auto">
                               {[1, 2, 3].map(col => (
                                 <div key={col} className="flex flex-col gap-5">
                                   {filteredCrops.filter(item => item.col === col).map((item, index) => {
                                     const isChecked = cropsGrown.includes(item.name);
                                     return (
                                       <div key={`${item.id}-${index}`} onClick={() => toggleCropSelection(item.name)} className="flex items-center gap-[10px] cursor-pointer">
                                         <div className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center border-[1.5px] ${isChecked ? 'bg-[#3D93D1] border-[#F1F1FF]' : 'bg-[#F1F1FF] border-[#85BFE5]'}`}>
                                           {isChecked && (
                                             <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                               <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                           )}
                                         </div>
                                         <span className="font-poppins font-medium text-[14px] text-[#138FFF]">{item.name}</span>
                                       </div>
                                     );
                                   })}
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                   )}

                   {activeSubTab === 6 && (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">What is the current yielding cost?</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={yieldCost} onChange={(e) => setYieldCost(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Current returns from yield?</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={yieldReturns} onChange={(e) => setYieldReturns(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   )}

                   {activeSubTab === 7 && (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">What is the Current Cultivation Type?</span>
                         <div className="flex gap-[15px]">
                           <button onClick={() => setCurrentCultivation('Self')} className={`flex items-center px-6 py-2 gap-[10px] rounded-[24px] cursor-pointer font-plus-jakarta font-medium text-[14px] ${currentCultivation === 'Self' ? 'bg-[#2780C4] text-white border-none' : 'bg-white text-black border border-black/40'}`}>
                             <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center ${currentCultivation === 'Self' ? 'bg-white border-none' : 'bg-transparent border-[1.5px] border-[#2780C4]'}`}>
                               {currentCultivation === 'Self' && <div className="w-[6px] h-[6px] bg-[#2780C4] rounded-full" />}
                             </div>
                             Self
                           </button>
                           <button onClick={() => setCurrentCultivation('Lease')} className={`flex items-center px-6 py-2 gap-[10px] rounded-[24px] cursor-pointer font-plus-jakarta font-medium text-[14px] ${currentCultivation === 'Lease' ? 'bg-[#2780C4] text-white border-none' : 'bg-white text-black border border-black/40'}`}>
                             <div className={`w-[14px] h-[14px] rounded-full flex items-center justify-center ${currentCultivation === 'Lease' ? 'bg-white border-none' : 'bg-transparent border-[1.5px] border-[#2780C4]'}`}>
                               {currentCultivation === 'Lease' && <div className="w-[6px] h-[6px] bg-[#2780C4] rounded-full" />}
                             </div>
                             Lease
                           </button>
                         </div>
                       </div>
                       <div className="flex flex-col gap-2">
                         <span className="font-plus-jakarta font-semibold text-[18px] text-black">Name</span>
                         <div className="w-full h-[54px] bg-white border border-black/20 rounded-lg relative">
                           <input type="text" value={cultivatorName} onChange={(e) => setCultivatorName(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                       <div className="flex flex-col gap-2">
                         <span className="font-plus-jakarta font-semibold text-[18px] text-black">Contact Details</span>
                         <div className="w-full h-[54px] bg-white border border-black/20 rounded-lg relative">
                           <input type="text" value={cultivatorContact} onChange={(e) => setCultivatorContact(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   )}

                   {activeSubTab === 8 && (
                     <div className="flex flex-col gap-[13px] w-full w-full lg:max-w-[618px]">
                       <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">Future crop plans suggested by Green Land Captial</span>
                       <div className="w-full h-[181px] bg-[rgba(187,219,240,0.38)] border border-[#96C9ED] rounded-[18px] p-6">
                         <textarea value={futureCrops} onChange={(e) => setFutureCrops(e.target.value)} placeholder="Write suggestion" className="w-full h-full font-inter text-[14px] leading-[17px] text-black/80 bg-transparent border-none outline-none resize-none" />
                       </div>
                     </div>
                   )}

                   {activeSubTab === 9 && (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[20px] leading-[25px] text-black">If Green Land Captial does the maintenace, what will be the suggested crop?</span>
                         <div className="relative w-full">
                           <button onClick={() => setIsMaintenanceDropdownOpen(!isMaintenanceDropdownOpen)} className="w-full min-h-[54px] bg-white border-[1.5px] border-black/40 rounded-lg px-6 py-2 flex items-center justify-between cursor-pointer">
                             {maintenanceCrops.length === 0 ? (
                               <span className="font-poppins text-[14px] text-black/40">Select Types</span>
                             ) : (
                               <div className="flex flex-row gap-4 flex-wrap">
                                 {maintenanceCrops.map((crop) => (
                                   <div key={crop} className="flex items-center gap-2">
                                     <div className="w-[18px] h-[18px] bg-[#3D93D1] border-[1.5px] border-[#F1F1FF] rounded-[2px] flex items-center justify-center">
                                       <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                         <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                     </div>
                                     <span className="font-poppins font-medium text-[14px] text-[#138FFF]">{crop}</span>
                                   </div>
                                 ))}
                               </div>
                             )}
                             <ChevronDown className="w-5 h-5 text-[#363434] shrink-0 ml-2" />
                           </button>
                           {isMaintenanceDropdownOpen && (
                             <div className="absolute top-[100%] mt-2 left-0 w-full bg-white border border-[#999999] rounded-lg z-50 p-4 shadow-lg">
                               <div className="w-full h-[44px] bg-white border border-[#C5C1C1] rounded-[79px] flex items-center px-4 mb-4">
                                 <Search className="w-5 h-5 text-black/60 shrink-0" />
                                 <input type="text" value={maintenanceSearchQuery} onChange={(e) => setMaintenanceSearchQuery(e.target.value)} placeholder="Search" className="flex-1 bg-transparent border-none outline-none ml-[10px] font-inter text-[16px] text-black" />
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-2 h-[180px] overflow-y-auto">
                                 {[1, 2, 3].map(col => (
                                   <div key={col} className="flex flex-col gap-5">
                                     {filteredMaintenanceCrops.filter(item => item.col === col).map((item, index) => {
                                       const isChecked = maintenanceCrops.includes(item.name);
                                       return (
                                         <div key={`${item.id}-${index}`} onClick={() => toggleMaintenanceCropSelection(item.name)} className="flex items-center gap-[10px] cursor-pointer">
                                           <div className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center border-[1.5px] ${isChecked ? 'bg-[#3D93D1] border-[#F1F1FF]' : 'bg-[#F1F1FF] border-[#85BFE5]'}`}>
                                             {isChecked && (
                                               <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                                 <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                               </svg>
                                             )}
                                           </div>
                                           <span className="font-poppins font-medium text-[14px] text-[#138FFF]">{item.name}</span>
                                         </div>
                                       );
                                     })}
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                       <div className="flex flex-col gap-2">
                         <span className="font-plus-jakarta font-semibold text-[24px] text-black">What will be the best returns?</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={maintenanceReturns} onChange={(e) => setMaintenanceReturns(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   )}

                   {activeSubTab === 10 && (
                     <div className="flex flex-col gap-8 w-full w-full lg:max-w-[640px]">
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">What are the Advantages?</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={advantages} onChange={(e) => setAdvantages(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                       <div className="flex flex-col gap-[13px]">
                         <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black">What are the Disadvantages?</span>
                         <div className="w-full h-[54px] bg-white border border-black/40 rounded-lg relative">
                           <input type="text" value={disadvantages} onChange={(e) => setDisadvantages(e.target.value)} className="absolute left-6 right-6 top-1/2 -translate-y-1/2 w-[calc(100%-48px)] font-inter text-[18px] text-black border-none outline-none bg-transparent" />
                         </div>
                       </div>
                     </div>
                   )}

                 </div>

                 {/* Right Content Area (Comments) */}
                 {activeSubTab !== 8 && (
                   <div className="w-full xl:w-[400px] flex flex-col gap-4 shrink-0">
                     <span className="font-plus-jakarta font-semibold text-[24px] text-black">Comments</span>
                     <div className="w-full h-[181px] bg-[rgba(187,219,240,0.38)] border border-[#96C9ED] rounded-[18px] p-6">
                       <textarea
                         value={currentComment}
                         onChange={(e) => handleCommentChange(e.target.value)}
                         className="w-full h-full bg-transparent border-none outline-none resize-none font-poppins font-normal text-[14px] leading-[21px] text-black"
                       />
                     </div>
                   </div>
                 )}

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
            <span className="font-plus-jakarta font-semibold text-[24px] leading-[30px] text-black text-center w-full mb-6">Agriculture & Report</span>
            
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
              Proceed With <span className="text-[#2780C4]">‘Agriculture & Report’</span> Approval For The Farmland ID: <span className="text-[#2780C4]">{targetId}</span> to Complete The Verification.
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
                <textarea value={turnbackReason} onChange={(e) => setTurnbackReason(e.target.value)} placeholder="Reason..." className="w-full h-full bg-transparent border-none outline-none resize-none font-inter text-[14px] leading-[20px] text-black" />
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={confirmTurnBack} className="bg-[#2780C4] rounded-[56px] border-none px-6 py-3 cursor-pointer text-white font-plus-jakarta font-semibold text-[16px]">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VerificationOfficerAssignedFarmlandsAgriculture;
