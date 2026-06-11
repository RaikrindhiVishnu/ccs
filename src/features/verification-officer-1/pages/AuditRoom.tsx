import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Check, 
  AlertCircle, 
  Phone, 
  MapPin, 
  FileText, 
  Send,
  FileCheck,
  Mail,
  CalendarDays
} from 'lucide-react';
import { MOCK_FARMLANDS, type FarmlandDocument } from '../data/farmlandsMockData';

export const AuditRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const targetId = id || "GLC SOS 01";

  // Find targeted farmland details
  const farmland = MOCK_FARMLANDS.find(item => item.id === targetId) || MOCK_FARMLANDS[0];

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'owner' | 'family' | 'land' | 'docs'>('owner');

  // Verify state of documents
  const [docsState, setDocsState] = useState<FarmlandDocument[]>(farmland.documents);
  const [decision, setDecision] = useState<'approve' | 'request_info' | 'escalate' | 'reject' | null>(null);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDocumentAction = (docId: string, status: 'verified' | 'rejected') => {
    setDocsState(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, status } : doc
    ));
  };

  const handleBack = () => {
    navigate('/verification-officer-1/assigned-farmlands');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision) return;

    // Simulate save
    setSubmitted(true);
    setTimeout(() => {
      navigate('/verification-officer-1/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col font-plus-jakarta pb-12">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D9DFE0] rounded-full hover:bg-gray-50 transition-colors shadow-sm cursor-pointer border-none"
        >
          <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
          <span className="font-plus-jakarta font-semibold text-sm text-[#353535]">
            Go Back to Dashboard
          </span>
        </button>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-3">
          <button className="w-[52px] h-[52px] rounded-full bg-white border border-[#D9DFE0] flex items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer p-0 border-none">
            <Bell className="w-5 h-5 text-[#2C2C2C]" />
            <span className="absolute top-[16px] right-[16px] w-2.5 h-2.5 bg-[#EF4646] rounded-full border-2 border-white"></span>
          </button>
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden border border-[#D9DFE0]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="flex-1 bg-white rounded-[32px] border border-[#E5EAEB] p-12 text-center flex flex-col items-center justify-center gap-4 max-w-[800px] mx-auto w-full mt-10 shadow-lg">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
            <FileCheck className="w-10 h-10" />
          </div>
          <h2 className="font-plus-jakarta font-extrabold text-2xl text-[#1E1E1E]">
            Verification Submitted!
          </h2>
          <p className="font-plus-jakarta text-[#5D6B6B] text-base max-w-md">
            The decision for <span className="font-bold text-[#2780C4]">{farmland.id}</span> has been processed. Redirecting back to dashboard...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          
          {/* LEFT SIDEBAR SECTION */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Stepper Checklist Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[24px] p-6 shadow-sm flex flex-col relative">
              <span className="font-plus-jakarta text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Farmland ID</span>
              <h2 className="font-plus-jakarta font-extrabold text-2xl text-[#1A1C1D] mt-1">{farmland.id}</h2>
              <p className="text-[#5D6B6B] text-xs font-semibold mt-1 mb-6">{farmland.code} • Level 1 Verification</p>

              {/* Vertical Stepper Checkpoints */}
              <div className="relative pl-8 flex flex-col gap-8">
                {/* Vertical Line Connector */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-[#E2E8F0]" />

                {/* Step 1 */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-[30px] top-0 w-[24px] h-[24px] rounded-full bg-[#BDD327] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    1
                  </div>
                  <span className="font-plus-jakarta text-xs font-extrabold text-[#1E1E1E] uppercase tracking-wider">Customer Information</span>
                  <span className="text-[10px] text-[#A0AEC0]">Personal identity, KYC records</span>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-[30px] top-0 w-[24px] h-[24px] rounded-full bg-[#BDD327] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    2
                  </div>
                  <span className="font-plus-jakarta text-xs font-extrabold text-[#1E1E1E] uppercase tracking-wider">Land & Boundaries</span>
                  <span className="text-[10px] text-[#A0AEC0]">Geo coordinates, border polygon</span>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-[30px] top-0 w-[24px] h-[24px] rounded-full bg-[#BDD327] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    3
                  </div>
                  <span className="font-plus-jakarta text-xs font-extrabold text-[#1E1E1E] uppercase tracking-wider">Agriculture Valuation</span>
                  <span className="text-[10px] text-[#A0AEC0]">Land worth, yield estimation reports</span>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col gap-1">
                  <div className="absolute -left-[30px] top-0 w-[24px] h-[24px] rounded-full bg-[#F59E0B] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm animate-pulse">
                    !
                  </div>
                  <span className="font-plus-jakarta text-xs font-extrabold text-[#1E1E1E] uppercase tracking-wider">Verification Review</span>
                  <span className="text-[10px] text-[#A0AEC0]">Officer 1 decision dispatch</span>
                </div>
              </div>
            </div>

            {/* Location of land card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
              <span className="font-plus-jakarta font-bold text-lg text-[#1E1E1E]">Location of land</span>
              
              <div className="flex items-center gap-2 text-[#1D7ABE]">
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="font-plus-jakarta font-bold text-sm underline cursor-pointer">
                  17.4835850, 78.3805050
                </span>
              </div>

              {/* Graphic boundaries box */}
              <div className="relative w-full h-[200px] rounded-2xl overflow-hidden bg-[#F2F4F5] border border-[#ECECEC] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
                  alt="Sat map reference"
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                />
                
                {/* SVG path mockup of coordinates polygon overlay */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="30,40 70,30 85,70 45,80" fill="rgba(189, 211, 39, 0.25)" stroke="#BDD327" strokeWidth="2" />
                  <circle cx="30" cy="40" r="2.5" fill="#BDD327" />
                  <circle cx="70" cy="30" r="2.5" fill="#BDD327" />
                  <circle cx="85" cy="70" r="2.5" fill="#BDD327" />
                  <circle cx="45" cy="80" r="2.5" fill="#BDD327" />
                </svg>
                
                <span className="absolute bottom-3 left-3 bg-[#000000]/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded">
                  Area Boundary Polygon
                </span>
              </div>
            </div>

          </div>

          {/* MAIN WORKSPACE SECTION */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            
            {/* Core Tabs Navigation Card */}
            <div className="bg-white border border-[#EBEBEB] rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col min-h-[680px]">
              
              {/* Tab Header bar */}
              <div className="flex flex-wrap justify-center bg-[#F4F5F6] p-1.5 rounded-[30px] w-full max-w-lg mx-auto gap-1 mb-8 shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('owner')}
                  className={`flex-1 min-w-[90px] px-3 py-2.5 rounded-full font-plus-jakarta font-bold text-xs md:text-sm transition-all cursor-pointer border-none ${
                    activeTab === 'owner' 
                      ? 'bg-white text-[#2780C4] shadow-xs' 
                      : 'bg-transparent text-[#5D6B6B] hover:text-[#1A1C1D]'
                  }`}
                >
                  Owner Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('family')}
                  className={`flex-1 min-w-[90px] px-3 py-2.5 rounded-full font-plus-jakarta font-bold text-xs md:text-sm transition-all cursor-pointer border-none ${
                    activeTab === 'family' 
                      ? 'bg-white text-[#2780C4] shadow-xs' 
                      : 'bg-transparent text-[#5D6B6B] hover:text-[#1A1C1D]'
                  }`}
                >
                  Family Tree
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('land')}
                  className={`flex-1 min-w-[90px] px-3 py-2.5 rounded-full font-plus-jakarta font-bold text-xs md:text-sm transition-all cursor-pointer border-none ${
                    activeTab === 'land' 
                      ? 'bg-white text-[#2780C4] shadow-xs' 
                      : 'bg-transparent text-[#5D6B6B] hover:text-[#1A1C1D]'
                  }`}
                >
                  Land Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('docs')}
                  className={`flex-1 min-w-[90px] px-3 py-2.5 rounded-full font-plus-jakarta font-bold text-xs md:text-sm transition-all cursor-pointer border-none ${
                    activeTab === 'docs' 
                      ? 'bg-white text-[#2780C4] shadow-xs' 
                      : 'bg-transparent text-[#5D6B6B] hover:text-[#1A1C1D]'
                  }`}
                >
                  Documents
                </button>
              </div>

              {/* Tab Content Areas */}
              <div className="flex-1 w-full">
                
                {/* 1. Tab: Owner Details */}
                {activeTab === 'owner' && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#F9F9FB] shadow-xs">
                        <img
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
                          alt="Owner avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-plus-jakarta text-xs text-[#5D6B6B] font-bold">Land Owner Profile</span>
                        <h3 className="font-plus-jakarta font-extrabold text-2xl text-[#1A1C1D] mt-0.5">{farmland.ownerName}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">First Name</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          {farmland.ownerName.split(" ")[0]}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Last Name</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          {farmland.ownerName.split(" ")[1] || "Kumar"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Phone Number</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center gap-[12px] font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          <Phone className="w-[16px] h-[16px] text-[#3D4949]" />
                          <span>{farmland.ownerPhone}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Email Address</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center gap-[12px] font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          <Mail className="w-[16px] h-[14px] text-[#3D4949]" />
                          <span>{farmland.ownerName.toLowerCase().replace(/\s+/g, '')}@gmail.com</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Date of Birth</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center gap-[12px] font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          <CalendarDays className="w-[16px] h-[17px] text-[#3D4949]" />
                          <span>13/01/1986</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Religion</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          Hindu
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-plus-jakarta font-bold text-[13px] text-[#3D4949] tracking-[0.35px]">Gender</label>
                        <div className="w-full h-[52px] bg-[#F3F3F5] rounded-[24px] px-[20px] flex items-center font-plus-jakarta text-base text-[#1A1C1D] font-medium border border-gray-100">
                          Male
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Tab: Family Tree */}
                {activeTab === 'family' && (
                  <div className="flex flex-col gap-6 animate-fadeIn relative">
                    <span className="font-plus-jakarta text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Generational Heir Chart</span>
                    
                    {/* Render the Family Tree SVG Connectors and Node Cards */}
                    <div className="relative w-full h-[480px] bg-[#FAFDFE] rounded-[24px] border border-sky-100/50 overflow-auto no-scrollbar flex items-center justify-center">
                      
                      {/* SVG connector lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '760px' }}>
                        {/* Parent connections */}
                        <path 
                          d="M 380 180 L 380 200 C 380 215, 330 225, 270 225 L 180 225 C 130 225, 130 235, 130 270" 
                          fill="none" 
                          stroke="#D8E3E9" 
                          strokeWidth="2.5" 
                        />
                        <path 
                          d="M 380 180 L 380 200 C 380 215, 430 225, 490 225 L 580 225 C 630 225, 630 235, 630 270" 
                          fill="none" 
                          stroke="#D8E3E9" 
                          strokeWidth="2.5" 
                        />
                        
                        {/* Spouse and Child connections */}
                        <line x1="380" y1="180" x2="380" y2="270" stroke="#D8E3E9" strokeWidth="2.5" />
                        <line x1="380" y1="340" x2="380" y2="400" stroke="#D8E3E9" strokeWidth="2.5" />
                      </svg>

                      <div className="relative w-full h-full min-w-[760px]">
                        {/* Connector labels */}
                        <div className="absolute px-3 py-1 bg-[#EEF2F6] rounded-full text-[9px] font-bold text-[#64748B] border border-slate-200" style={{ left: '210px', top: '210px' }}>FATHER</div>
                        <div className="absolute px-3 py-1 bg-[#EEF2F6] rounded-full text-[9px] font-bold text-[#64748B] border border-slate-200" style={{ left: '358px', top: '220px' }}>SPOUSE</div>
                        <div className="absolute px-3 py-1 bg-[#EEF2F6] rounded-full text-[9px] font-bold text-[#64748B] border border-slate-200" style={{ left: '480px', top: '210px' }}>MOTHER</div>
                        <div className="absolute px-3 py-1 bg-[#EEF2F6] rounded-full text-[9px] font-bold text-[#64748B] border border-slate-200" style={{ left: '352px', top: '360px' }}>DAUGHTER</div>

                        {/* LEVEL 1: Active Owner Card */}
                        <div className="absolute w-[180px] bg-white border-2 border-[#3D93D1] rounded-[20px] p-4 text-center shadow-md flex flex-col items-center gap-1.5" style={{ left: '290px', top: '40px' }}>
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xs">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" alt="Arjun Mehta" className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-[#3D93D1] text-white text-[8px] font-extrabold py-0.5 tracking-wider">OWNER</span>
                          </div>
                          <h4 className="font-plus-jakarta font-bold text-sm text-[#1A1C1D]">{farmland.ownerName}</h4>
                          <span className="text-[10px] text-[#A0AEC0] font-bold">Male, 42 yrs</span>
                        </div>

                        {/* LEVEL 2: Relatives Cards */}
                        {/* Father Node Card */}
                        <div className="absolute w-[170px] bg-white border border-[#E2E8F0] rounded-[20px] p-3 flex items-center gap-3 shadow-xs" style={{ left: '40px', top: '270px' }}>
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">Vikram Mehta</h4>
                            <span className="text-[10px] text-[#A0AEC0]">Male, 72 yrs</span>
                          </div>
                        </div>

                        {/* Spouse Node Card */}
                        <div className="absolute w-[170px] bg-white border border-[#E2E8F0] rounded-[20px] p-3 flex items-center gap-3 shadow-xs" style={{ left: '295px', top: '270px' }}>
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">Priya Mehta</h4>
                            <span className="text-[10px] text-[#A0AEC0]">Female, 40 yrs</span>
                          </div>
                        </div>

                        {/* Mother Node Card */}
                        <div className="absolute w-[170px] bg-white border border-[#E2E8F0] rounded-[20px] p-3 flex items-center gap-3 shadow-xs" style={{ left: '545px', top: '270px' }}>
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">Sushila Mehta</h4>
                            <span className="text-[10px] text-[#A0AEC0]">Female, 68 yrs</span>
                          </div>
                        </div>

                        {/* LEVEL 3: Daughter Node Card */}
                        <div className="absolute w-[170px] bg-white border border-[#E2E8F0] rounded-[20px] p-3 flex items-center gap-3 shadow-xs" style={{ left: '295px', top: '400px' }}>
                          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-plus-jakarta font-bold text-xs text-[#1A1C1D]">Ananya Mehta</h4>
                            <span className="text-[10px] text-[#A0AEC0]">Female, 12 yrs</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Tab: Land Details */}
                {activeTab === 'land' && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                    <h3 className="font-plus-jakarta font-bold text-lg text-[#1A1C1D] mb-2">Farmland Details</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left Data Items */}
                      <div className="lg:col-span-4 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">State</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">Andhra Pradesh</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">District</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">{farmland.location.split(",")[0]}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Area/City/Town</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">Rural Zone Alpha</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Acquisition Category</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">Direct Purchase</span>
                        </div>
                      </div>

                      {/* Center Aerial Photo */}
                      <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="relative w-full h-[256px] rounded-[24px] overflow-hidden bg-gray-100 border border-gray-100 shadow-md">
                          <img
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80"
                            alt="Aerial view of farmland"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] text-[#A0AEC0] mt-3 font-semibold uppercase tracking-wider">Drone survey orthomosaic mapping</span>
                      </div>

                      {/* Right Data Items */}
                      <div className="lg:col-span-4 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Agent</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">{farmland.agentName}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Land Conversion</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">Registered Agricultural</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Value for Area</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">{farmland.amount} ({farmland.totalArea})</span>
                        </div>
                        <div className="flex flex-col gap-1.5 p-4 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                          <span className="font-plus-jakarta text-[11px] text-[#737686] font-bold uppercase tracking-wider">Referral Location</span>
                          <span className="font-plus-jakarta text-sm font-semibold text-[#1A1C1D]">{farmland.location}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. Tab: Documents Verification */}
                {activeTab === 'docs' && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <span className="font-plus-jakarta font-bold text-sm text-[#5D6B6B]">
                      Ensure all required land documents are audited and approved before submitting.
                    </span>

                    <div className="flex flex-col gap-3 mt-2">
                      {docsState.map((doc) => {
                        let statusColor = "";
                        if (doc.status === "verified") statusColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                        else if (doc.status === "rejected") statusColor = "bg-rose-50 text-rose-700 border-rose-100";
                        else statusColor = "bg-amber-50 text-amber-700 border-amber-100";

                        return (
                          <div 
                            key={doc.id}
                            className="bg-[#F8F9FA] border border-[#ECECEC] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white border border-[#E5EAEB] flex items-center justify-center text-[#2780C4]">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-plus-jakarta font-semibold text-sm text-[#1E1E1E]">{doc.name}</span>
                                <span className="text-[10px] text-[#A0AEC0] uppercase mt-0.5">Uploaded {doc.uploadedAt}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status badge */}
                              <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold uppercase ${statusColor}`}>
                                {doc.status}
                              </span>

                              {/* Action buttons */}
                              <div className="flex gap-1 ml-2">
                                <button
                                  type="button"
                                  onClick={() => handleDocumentAction(doc.id, 'verified')}
                                  className="w-8 h-8 rounded-full border border-emerald-200 bg-white hover:bg-emerald-50 flex items-center justify-center text-emerald-600 cursor-pointer p-0"
                                  title="Approve Document"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDocumentAction(doc.id, 'rejected')}
                                  className="w-8 h-8 rounded-full border border-rose-200 bg-white hover:bg-rose-50 flex items-center justify-center text-rose-600 cursor-pointer p-0"
                                  title="Reject Document"
                                >
                                  <AlertCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Form Footer */}
              <form onSubmit={handleSubmit} className="border-t border-[#F1F3F4] pt-6 mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-plus-jakarta font-bold text-sm text-[#1E1E1E]">Submit Verification Action</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
                    
                    <button
                      type="button"
                      onClick={() => setDecision('approve')}
                      className={`h-11 rounded-xl flex items-center justify-center border font-plus-jakarta font-bold text-xs cursor-pointer transition-all ${
                        decision === 'approve'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-extrabold'
                          : 'border-[#D9DFE0] bg-white text-[#5D6B6B] hover:bg-gray-50'
                      }`}
                    >
                      Approve (VO2 Stage)
                    </button>

                    <button
                      type="button"
                      onClick={() => setDecision('request_info')}
                      className={`h-11 rounded-xl flex items-center justify-center border font-plus-jakarta font-bold text-xs cursor-pointer transition-all ${
                        decision === 'request_info'
                          ? 'border-amber-600 bg-amber-50 text-amber-700 font-extrabold'
                          : 'border-[#D9DFE0] bg-white text-[#5D6B6B] hover:bg-gray-50'
                      }`}
                    >
                      Request Info (RO)
                    </button>

                    <button
                      type="button"
                      onClick={() => setDecision('escalate')}
                      className={`h-11 rounded-xl flex items-center justify-center border font-plus-jakarta font-bold text-xs cursor-pointer transition-all ${
                        decision === 'escalate'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-extrabold'
                          : 'border-[#D9DFE0] bg-white text-[#5D6B6B] hover:bg-gray-50'
                      }`}
                    >
                      Escalate (IO)
                    </button>

                    <button
                      type="button"
                      onClick={() => setDecision('reject')}
                      className={`h-11 rounded-xl flex items-center justify-center border font-plus-jakarta font-bold text-xs cursor-pointer transition-all ${
                        decision === 'reject'
                          ? 'border-rose-600 bg-rose-50 text-rose-700 font-extrabold'
                          : 'border-[#D9DFE0] bg-white text-[#5D6B6B] hover:bg-gray-50'
                      }`}
                    >
                      Reject Case
                    </button>

                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-plus-jakarta font-bold text-xs text-[#5D6B6B] uppercase tracking-wider">Verification Comments / Remarks</label>
                  <textarea
                    placeholder="Enter audit logs or checklist notes..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full h-24 border border-[#D9DFE0] rounded-xl p-3 font-plus-jakarta text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#2780C4]/30"
                  />
                </div>

                <div className="flex justify-end gap-3 items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="h-11 px-6 rounded-full border border-gray-300 hover:bg-gray-50 text-sm font-plus-jakarta font-bold text-[#5D6B6B] cursor-pointer bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!decision}
                    className="h-11 px-8 rounded-full bg-[#2780C4] hover:bg-[#2069A1] text-white text-sm font-plus-jakarta font-bold cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed flex items-center gap-2 border-none"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Decision</span>
                  </button>
                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AuditRoom;
