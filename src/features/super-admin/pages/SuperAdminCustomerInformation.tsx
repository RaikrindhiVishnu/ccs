import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, MapPin } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';
import { mockDashboardData } from '@/features/super-admin/data/mockDashboardData';

// Modal Component
const ConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; farmlandId: string }> = ({ isOpen, onClose, farmlandId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-[500px] p-10 flex flex-col items-center shadow-2xl relative">
        <h2 className="font-bold text-2xl mb-8">Customer Information</h2>
        
        {/* Large Checkmark Badge */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-100/50 rounded-full scale-[1.5]" />
          <div className="w-24 h-24 bg-[#8DC63F] rounded-full flex items-center justify-center relative z-10 shadow-lg border-4 border-white">
            <Check size={48} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <p className="text-center font-medium text-lg leading-snug mb-8">
          Proceed With '<span className="text-[#1D7ABE]">Legal Documents</span>' for <br/>
          Farmland ID: <span className="text-[#1D7ABE]">{farmlandId}</span> for further <br/>
          Verification.
        </p>

        <button 
          onClick={onClose}
          className="bg-[#2A3125] text-white font-semibold text-lg px-12 py-4 rounded-full hover:bg-black transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

// Family Tree Tab Component
const FamilyTreeTab: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col items-center pt-8">
      {/* Container for the tree */}
      <div className="relative w-[700px] h-[500px] flex flex-col items-center">
        
        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ top: '60px' }}>
          {/* Main vertical line from owner down to horizontal bus */}
          <line x1="350" y1="110" x2="350" y2="180" stroke="#D1D5DB" strokeWidth="2" />
          {/* Horizontal bus */}
          <line x1="150" y1="180" x2="550" y2="180" stroke="#D1D5DB" strokeWidth="2" />
          
          {/* Vertical line to Father */}
          <line x1="150" y1="180" x2="150" y2="230" stroke="#D1D5DB" strokeWidth="2" />
          {/* Vertical line to Spouse */}
          <line x1="350" y1="180" x2="350" y2="230" stroke="#D1D5DB" strokeWidth="2" />
          {/* Vertical line to Mother */}
          <line x1="550" y1="180" x2="550" y2="230" stroke="#D1D5DB" strokeWidth="2" />

          {/* Vertical line from Spouse down to Daughter */}
          <line x1="350" y1="310" x2="350" y2="380" stroke="#D1D5DB" strokeWidth="2" />
        </svg>

        {/* Owner */}
        <div className="z-10 bg-[#F4F9FF] border border-[#BFDBFE] rounded-[1rem] p-4 flex flex-col items-center w-[220px] shadow-sm">
          <div className="relative">
            <img src={data.owner.avatar} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" alt={data.owner.name} />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1D7ABE] text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full uppercase">
              OWNER
            </div>
          </div>
          <span className="font-bold text-[#1F2937] mt-3">{data.owner.name}</span>
          <span className="text-[#3B82F6] text-xs font-medium mt-1">{data.owner.info}</span>
        </div>

        {/* Level 2 Container */}
        <div className="flex justify-between w-full mt-[70px] z-10 relative">
          
          {/* Father */}
          <div className="absolute left-[125px] -top-[45px] bg-[#E0E7FF] text-[#4F46E5] text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase">FATHER</div>
          <div className="bg-white border border-gray-200 rounded-[1rem] p-3 flex items-center gap-3 w-[180px] shadow-sm ml-[60px]">
            <img src={data.father.avatar} className="w-12 h-12 rounded-full object-cover" alt={data.father.name} />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2937] text-sm leading-tight">{data.father.name}</span>
              <span className="text-gray-500 text-xs">{data.father.info}</span>
            </div>
          </div>

          {/* Spouse */}
          <div className="absolute left-[322px] -top-[45px] bg-[#E0E7FF] text-[#4F46E5] text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase">SPOUSE</div>
          <div className="bg-white border border-gray-200 rounded-[1rem] p-3 flex items-center gap-3 w-[180px] shadow-sm">
            <img src={data.spouse.avatar} className="w-12 h-12 rounded-full object-cover" alt={data.spouse.name} />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2937] text-sm leading-tight">{data.spouse.name}</span>
              <span className="text-gray-500 text-xs">{data.spouse.info}</span>
            </div>
          </div>

          {/* Mother */}
          <div className="absolute left-[520px] -top-[45px] bg-[#E0E7FF] text-[#4F46E5] text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase">MOTHER</div>
          <div className="bg-white border border-gray-200 rounded-[1rem] p-3 flex items-center gap-3 w-[180px] shadow-sm mr-[60px]">
            <img src={data.mother.avatar} className="w-12 h-12 rounded-full object-cover" alt={data.mother.name} />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2937] text-sm leading-tight">{data.mother.name}</span>
              <span className="text-gray-500 text-xs">{data.mother.info}</span>
            </div>
          </div>
        </div>

        {/* Level 3 Container (Daughter) */}
        <div className="z-10 mt-[70px] relative">
          {/* Daughter Label */}
          <div className="absolute left-[60px] -top-[45px] bg-[#E0E7FF] text-[#4F46E5] text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase">DAUGHTER</div>
          <div className="bg-white border border-gray-200 rounded-[1rem] p-3 flex items-center gap-3 w-[180px] shadow-sm">
            <img src={data.daughter.avatar} className="w-12 h-12 rounded-full object-cover" alt={data.daughter.name} />
            <div className="flex flex-col">
              <span className="font-bold text-[#1F2937] text-sm leading-tight">{data.daughter.name}</span>
              <span className="text-gray-500 text-xs">{data.daughter.info}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


export const SuperAdminCustomerInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scale = useViewportScale(1440, 1080);
  const targetId = id || "GLCSOS 01";

  const [activeTab, setActiveTab] = useState<'owner' | 'family' | 'land'>('owner');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = mockDashboardData.customerInformation;

  const handleBack = () => {
    navigate(-1);
  };

  const handleApprove = () => {
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    setIsModalOpen(false);
    navigate('/super-admin/dashboard');
  };

  return (
    <div className="bg-[#F2F2F2] min-h-screen relative flex justify-center overflow-hidden font-sans">
      
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={handleProceed} 
        farmlandId={targetId} 
      />

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
        {/* ── Top Header - Back Button ── */}
        <div style={{ position: 'absolute', width: '240px', height: '52px', left: '72px', top: '36px' }}>
          <button
            onClick={handleBack}
            className="w-[240px] h-[52px] bg-white rounded-full flex items-center px-5 gap-2 cursor-pointer border border-gray-200 hover:bg-gray-50 shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-[#353535] shrink-0" />
            <span className="font-medium text-[16px] text-[#353535]">Go back to dashboard</span>
          </button>
        </div>

        {/* ── Top Header - Bell & Avatar ── */}
        <div style={{ position: 'absolute', right: '72px', top: '34px', display: 'flex', gap: '13px' }}>
          <button className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50">
            <Bell className="w-6 h-6 text-[#2C2C2C]" />
          </button>
          <div className="w-[52px] h-[52px] bg-white rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <img src="https://i.pravatar.cc/150?u=superadmin" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── LEFT COLUMN: Stepper Card ── */}
        <div className="absolute left-[40px] top-[130px] w-[380px] bottom-[40px] bg-white rounded-[2rem] p-8 shadow-sm">
          <span className="font-semibold text-gray-500 text-sm">Farmland ID:</span>
          <div className="font-bold text-4xl text-gray-900 mt-1 mb-12">{targetId}</div>

          {/* Stepper Timeline */}
          <div className="relative pl-4 flex flex-col gap-10">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-[10px] bottom-[10px] w-px bg-gray-200" />
            
            {/* Step 1 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-[#A3C33D] tracking-wider text-sm">CUSTOMER INFORMATION</span>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-gray-500 tracking-wider text-sm">LEGAL DOCUMENTS</span>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-gray-500 tracking-wider text-sm">AGRICULTURE REPORT</span>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-gray-500 tracking-wider text-sm">LAND & BOUNDARIES</span>
            </div>

            {/* Step 5 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-gray-500 tracking-wider text-sm">VALUATION</span>
            </div>

            {/* Step 6 */}
            <div className="relative flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10">
                <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
              </div>
              <span className="font-bold text-gray-500 tracking-wider text-sm">LOCAL INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* ── CENTRAL MAIN CONTENT ── */}
        <div className="absolute left-[440px] right-[40px] top-[130px] bottom-[40px] bg-white shadow-sm rounded-[2rem] overflow-hidden flex flex-col">
          
          {/* Top Tabs */}
          <div className="flex justify-center gap-4 pt-10 pb-6 shrink-0">
            <button 
              onClick={() => setActiveTab('owner')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-colors ${
                activeTab === 'owner' 
                ? 'bg-[#2A3125] text-white border-[#2A3125]' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="font-semibold text-sm">Owner Details</span>
              <div className="w-[18px] h-[18px] bg-[#A3C33D] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('family')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-colors ${
                activeTab === 'family' 
                ? 'bg-[#2A3125] text-white border-[#2A3125]' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="font-semibold text-sm">Family Tree</span>
              <div className="w-[18px] h-[18px] bg-[#A3C33D] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('land')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-colors ${
                activeTab === 'land' 
                ? 'bg-[#2A3125] text-white border-[#2A3125]' 
                : 'bg-[#E5E9D8] text-gray-600 border-transparent hover:bg-[#d8ddc7]'
              }`}
            >
              <span className="font-semibold text-sm">Land Details</span>
              <div className="w-[18px] h-[18px] bg-[#A3C33D] rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[60px] pb-[100px] relative">
            
            {/* ── TAB CONTENT: OWNER DETAILS ── */}
            {activeTab === 'owner' && (
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">First Name</label>
                    <div className="h-12 bg-gray-50 border border-gray-200 rounded-[1rem] px-4 flex items-center">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.firstName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Last Name</label>
                    <div className="h-12 bg-gray-50 border border-gray-200 rounded-[1rem] px-4 flex items-center">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.lastName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Email</label>
                    <div className="h-12 bg-gray-50 border border-gray-200 rounded-[1rem] px-4 flex items-center">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Phone Number</label>
                    <div className="h-12 bg-gray-50 border border-gray-200 rounded-[1rem] px-4 flex items-center">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.phoneNumber}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Date of Birth</label>
                    <div className="h-12 bg-gray-50 border border-gray-200 rounded-[1rem] px-4 flex items-center">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.dob}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Religion</label>
                    <div className="h-12 bg-white border border-gray-200 rounded-[1rem] px-4 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.religion}</span>
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-gray-700">Gender</label>
                    <div className="h-12 bg-white border border-gray-200 rounded-[1rem] px-4 flex items-center justify-between">
                      <span className="text-gray-900 font-medium">{data.ownerDetails.gender}</span>
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  <h3 className="font-bold text-xl text-gray-900">Location of land</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#1D7ABE]" size={18} />
                    <span className="text-[#1D7ABE] font-medium underline">{data.ownerDetails.locationLink}</span>
                  </div>
                  <img 
                    src={data.ownerDetails.mapImage} 
                    alt="Map" 
                    className="w-[400px] h-[250px] rounded-[1.5rem] object-cover mt-2 shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* ── TAB CONTENT: FAMILY TREE ── */}
            {activeTab === 'family' && <FamilyTreeTab data={data.familyTree} />}

            {/* ── TAB CONTENT: LAND DETAILS ── */}
            {activeTab === 'land' && (
              <div className="flex flex-col h-full w-full">
                <h3 className="text-center font-bold text-gray-400 tracking-[0.2em] mb-10">FARMLAND DETAILS</h3>
                
                <div className="flex gap-12 w-full">
                  <div className="flex flex-col gap-8 flex-1 text-right items-end justify-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">STATE</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.state}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">DISTRICT</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.district}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">AREA/CITY/TOWN</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.area}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">ACQUISITION CATEGORY</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.acquisitionCategory}</span>
                    </div>
                  </div>

                  <div className="w-[400px] shrink-0">
                    <img 
                      src={data.landDetails.largeAerialImage} 
                      className="w-full h-[320px] rounded-[2rem] object-cover shadow-sm" 
                      alt="Farmland Aerial"
                    />
                  </div>

                  <div className="flex flex-col gap-8 flex-1 text-left items-start justify-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">AGENT</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.agent}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">LAND CONVERSION</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.landConversion}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">VALUE FOR AREA</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.valueForArea}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">AGENT REFERRAL LOCATION</span>
                      <span className="font-semibold text-[#A3C33D] text-lg">{data.landDetails.agentReferralLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex justify-between items-end w-full max-w-[850px] mx-auto">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-300 text-sm tracking-wider">GEO REFERENCE</span>
                    <span className="text-gray-500 font-medium text-2xl mt-1">{data.landDetails.geoReference.coordinates}</span>
                    <span className="text-gray-400 text-sm mt-1">{data.landDetails.geoReference.gridElev}</span>
                  </div>
                  <img 
                    src={data.landDetails.smallMapImage} 
                    className="w-[200px] h-[100px] rounded-[1rem] object-cover opacity-80 mix-blend-multiply" 
                    alt="Map small"
                  />
                </div>
              </div>
            )}
            
          </div>

          {/* ── Footer Actions ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[90px] bg-white border-t border-gray-100 flex items-center justify-end px-12 gap-4">
            <button 
              className="px-8 py-2.5 rounded-full border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
            <button 
              onClick={handleApprove}
              className="px-8 py-2.5 rounded-full bg-[#2A3125] text-white font-semibold text-sm hover:bg-black transition-colors"
            >
              Approve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminCustomerInformation;

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
