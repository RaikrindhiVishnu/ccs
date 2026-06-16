import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, Check, Download } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

// ─── Types ────────────────────────────────────────────────────────────────────

type DocumentStatus = 'pending' | 'approved' | 'rejected';

interface DocumentTab {
  id: string;
  label: string;
  status: DocumentStatus;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

const MOCK_FILES: UploadedFile[] = [
  { id: '1', name: 'File_name_1.pdf', size: '8MB' },
  { id: '2', name: 'File_name_1.pdf', size: '8MB' },
];

const MOCK_COMMENT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
do eiusmod. Lorem ipsum dolor sit amet, consectetur
adipiscing elit.do eiusmod. Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Lorem ipsum dolor sit amet,
consectetur.`;

// ─── Agriculture Report Tabs (11 tabs) ────────────────────────────────────────

const AGRICULTURE_TABS: DocumentTab[] = [
  { id: 'local-agriculture-officer-report', label: 'Local Agriculture Officer Report', status: 'pending' },
  { id: 'last-5-years-crop-yielding', label: 'Last 5 years Crop Yielding Report', status: 'pending' },
  { id: 'soil', label: 'Soil', status: 'pending' },
  { id: 'type-of-crop', label: 'Type of Crop', status: 'pending' },
  { id: 'ground-water-level', label: 'Ground Water Level', status: 'pending' },
  { id: 'types-of-crop-can-be-grown', label: 'Types of Crop can be grown', status: 'pending' },
  { id: 'current-yield-cost', label: 'Current Yield Cost', status: 'pending' },
  { id: 'current-cultivation', label: 'Current Cultivation', status: 'pending' },
  { id: 'future-crops', label: 'Future Crops', status: 'pending' },
  { id: 'maintenance', label: 'Maintenance', status: 'pending' },
  { id: 'natural-advantages-disadvantages', label: 'Natural Advantages and Disadvantages', status: 'pending' },
];

// ─── Sidebar Stepper Config ───────────────────────────────────────────────────

const FLOW_STEPS = [
  { id: 'customer-information', name: 'CUSTOMER INFORMATION', routePath: 'customer-information' },
  { id: 'legal-documents', name: 'LEGAL DOCUMENTS', routePath: 'legal-documents' },
  { id: 'agriculture-report', name: 'AGRICULTURE REPORT', routePath: 'agriculture-report' },
  { id: 'land-boundaries', name: 'LAND & BOUNDARIES', routePath: 'land-boundaries' },
  { id: 'valuation', name: 'VALUATION', routePath: 'valuation' },
  { id: 'local-intelligence', name: 'LOCAL INTELLIGENCE', routePath: 'local-intelligence' },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const PdfIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#FEE2E2" />
    <path d="M7 7h10v10H7V7z" fill="#fff" />
    <text x="8" y="16" fontSize="8" fill="#EF4444" fontWeight="bold" fontFamily="sans-serif">PDF</text>
  </svg>
);

const WarningIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#F59E0B" />
    <path d="M8 5v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.9" fill="#fff" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#fff" stroke="#8CB43A" strokeWidth="1.5" />
    <path d="M4.5 8L6.83 10.33 11.5 5.67" stroke="#8CB43A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Modals ───────────────────────────────────────────────────────────────────

const RejectModal: React.FC<{ onClose: () => void; onConfirm: (reason: string) => void }> = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-[500px] p-8 flex flex-col items-center shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Reject Document</h2>
        <textarea
          className="w-full h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none text-sm outline-none focus:border-red-400 mb-6"
          placeholder="Enter reason for rejection..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex gap-4 w-full justify-end">
          <button className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold" onClick={onClose}>Cancel</button>
          <button 
            className="px-6 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            onClick={() => {
              if (reason.trim()) onConfirm(reason);
            }}
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};

const StarBadge: React.FC<{ size: number; innerColor: string; outerColor: string }> = ({ size, innerColor, outerColor }) => {
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="absolute inset-0" style={{ background: outerColor, borderRadius: '25%', transform: 'rotate(0deg)' }} />
      <div className="absolute inset-0" style={{ background: outerColor, borderRadius: '25%', transform: 'rotate(30deg)' }} />
      <div className="absolute inset-0" style={{ background: outerColor, borderRadius: '25%', transform: 'rotate(60deg)' }} />
      <div className="absolute" style={{ width: size * 0.78, height: size * 0.78, background: innerColor, borderRadius: '25%', transform: 'rotate(15deg)' }} />
      <div className="absolute" style={{ width: size * 0.78, height: size * 0.78, background: innerColor, borderRadius: '25%', transform: 'rotate(45deg)' }} />
      <div className="absolute" style={{ width: size * 0.78, height: size * 0.78, background: innerColor, borderRadius: '25%', transform: 'rotate(75deg)' }} />
      <div className="relative z-10">
        <Check size={size * 0.45} strokeWidth={4} color="white" />
      </div>
    </div>
  );
};

const ProceedModal: React.FC<{
  onClose: () => void;
  onProceed: () => void;
  farmlandId: string;
}> = ({ onClose, onProceed, farmlandId }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-[500px] py-10 px-8 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative">
        <h2 className="font-bold text-[24px] mb-8 text-gray-900">Agriculture Report</h2>
        
        <div className="mb-8">
          <StarBadge size={140} outerColor="#F3F4F6" innerColor="#A3C33D" />
        </div>

        <p className="text-center font-medium text-[17px] text-gray-800 leading-[1.6] mb-10 max-w-[360px]">
          Proceed With '<span className="text-[#1D7ABE] font-bold">Land & Boundaries</span>' for
          Farmland ID: <span className="text-[#1D7ABE] font-bold">{farmlandId}</span> for further
          Verification.
        </p>

        <button 
          onClick={onProceed}
          className="bg-[#2A3125] text-white font-semibold text-[17px] px-[50px] py-[14px] rounded-full hover:bg-black transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AgricultureReportFlow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const scale = useViewportScale(1440, 1080);

  const farmlandId = id ?? 'GLCSOS 01';

  // State
  const [tabs, setTabs] = useState<DocumentTab[]>(
    AGRICULTURE_TABS.map(t => ({ ...t }))
  );
  const [activeTabId, setActiveTabId] = useState(AGRICULTURE_TABS[0].id);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProceedModal, setShowProceedModal] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTabId);

  const handleApprove = () => {
    const updatedTabs = tabs.map((t) => t.id === activeTabId ? { ...t, status: 'approved' as DocumentStatus } : t);
    setTabs(updatedTabs);
    
    const nextPending = updatedTabs.find((t) => t.status === 'pending');
    if (nextPending) {
      setActiveTabId(nextPending.id);
    } else {
      const allApproved = updatedTabs.every((t) => t.status === 'approved');
      if (allApproved) {
        setShowProceedModal(true);
      }
    }
  };

  const handleRejectConfirm = (reason: string) => {
    setTabs((prev) =>
      prev.map((t) => t.id === activeTabId ? { ...t, status: 'rejected' as DocumentStatus } : t)
    );
    setShowRejectModal(false);
  };

  const handleProceedNext = () => {
    setShowProceedModal(false);
    navigate(`/super-admin/Documents/land-boundaries/${farmlandId}`);
  };

  const navigateToStep = (stepPath: string, stepId: string) => {
    if (stepId === 'customer-information') {
      navigate(`/super-admin/assigned-farmlands/${farmlandId}/customer-information`);
    } else {
      navigate(`/super-admin/Documents/${stepPath}/${farmlandId}`);
    }
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen relative flex flex-col items-center overflow-hidden font-sans pt-4">
      
      {/* ── Proceed Modal ── */}
      {showProceedModal && (
        <ProceedModal
          onClose={() => setShowProceedModal(false)}
          onProceed={handleProceedNext}
          farmlandId={farmlandId}
        />
      )}

      {/* ── Reject Modal ── */}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleRejectConfirm}
        />
      )}

      {/* ── Top Breadcrumb ── */}
      <div 
        className="w-[1440px] flex justify-start mb-4 px-10" 
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center', zIndex: 10 }}
      >
        <span className="text-gray-400 font-semibold text-[13px] tracking-wide">
          Super Admin / Agriculture Report {currentTab ? `/ ${currentTab.label}` : ''}
        </span>
      </div>

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
        <div className="absolute w-[240px] h-[52px] left-[40px] top-[40px]">
          <button
            onClick={() => navigate('/super-admin/dashboard')}
            className="w-full h-full bg-white rounded-full flex items-center px-5 gap-3 cursor-pointer border border-gray-200 hover:bg-gray-50 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#353535] shrink-0" />
            <span className="font-medium text-[15px] text-[#353535]">Go Back to Dashboard</span>
          </button>
        </div>

        {/* ── Top Header - Bell & Avatar ── */}
        <div className="absolute right-[40px] top-[40px] flex gap-[13px]">
          <button className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <Bell className="w-6 h-6 text-[#2C2C2C]" />
          </button>
          <div className="w-[52px] h-[52px] bg-white rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <img src="https://i.pravatar.cc/150?u=superadmin" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ── LEFT COLUMN: Stepper Card ── */}
        <div className="absolute left-[40px] top-[120px] w-[380px] bottom-[40px] bg-white rounded-[2rem] p-10 shadow-sm">
          <span className="font-semibold text-gray-500 text-sm">Farmland ID:</span>
          <div className="font-bold text-4xl text-gray-900 mt-1 mb-16">{farmlandId}</div>

          {/* Stepper Timeline */}
          <div className="relative pl-4 flex flex-col gap-[48px]">
            {/* Vertical Line connecting dots */}
            <div className="absolute left-[27px] top-[10px] bottom-[10px] w-px bg-gray-200" />
            
            {FLOW_STEPS.map((step) => {
              const isCurrent = step.id === 'agriculture-report';
              return (
                <div 
                  key={step.id} 
                  className={`relative flex items-center gap-6 cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => navigateToStep(step.routePath, step.id)}
                >
                  <div className="w-6 h-6 rounded-full bg-white border border-[#A3C33D] flex items-center justify-center relative z-10 shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-[#A3C33D]" />
                  </div>
                  <span className={`font-bold tracking-wider text-[13px] ${isCurrent ? 'text-[#A3C33D]' : 'text-gray-500'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT TOP: Tabs Card ── */}
        <div className="absolute left-[440px] right-[40px] top-[120px] h-[400px] bg-white shadow-sm rounded-[2rem] p-10">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const isApproved = tab.status === 'approved';

              const bgClass = isActive ? 'bg-[#2A3125]' : isApproved ? 'bg-white' : 'bg-[#F9FAFB]';
              const textClass = isActive ? 'text-white' : 'text-gray-700';
              const borderClass = isActive 
                ? 'border-[#2A3125]' 
                : isApproved 
                  ? 'border-[#8CB43A]' 
                  : 'border-gray-100';

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${bgClass} ${textClass} ${borderClass} hover:opacity-90 font-semibold text-[14px]`}
                >
                  {tab.label}
                  <div className="flex items-center justify-center">
                    {isApproved ? <CheckIcon /> : <WarningIcon />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT BOTTOM: Upload & Comments Card ── */}
        <div className="absolute left-[440px] right-[40px] top-[540px] bottom-[40px] bg-white shadow-sm rounded-[2rem] p-10 flex flex-col">
          <div className="flex gap-16 flex-1">
            
            {/* Upload Files Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-[22px] font-bold text-gray-900 mb-6">Uploaded Files</h3>
              <div className="flex flex-col gap-4">
                {MOCK_FILES.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 bg-[#F0F4F8] rounded-2xl p-4 transition-colors hover:bg-[#e6ebf1]">
                    <PdfIcon />
                    <div className="flex-1 flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900 leading-tight">{file.name}</span>
                      <span className="text-[12px] font-medium text-gray-400 mt-0.5">{file.size}</span>
                    </div>
                    <button className="p-2 hover:bg-white rounded-full transition-colors">
                      <Download size={20} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-[22px] font-bold text-gray-900 mb-6">Comments</h3>
              <div className="bg-[#EFF6FF] rounded-2xl p-6 text-[15px] leading-relaxed text-gray-700 min-h-[160px]">
                {MOCK_COMMENT}
              </div>
            </div>
            
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-5 mt-8 pt-6">
            <button 
              onClick={() => setShowRejectModal(true)}
              className="px-10 py-3.5 rounded-full border border-red-400 text-red-500 font-semibold text-[15px] hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
            <button 
              onClick={handleApprove}
              disabled={currentTab?.status === 'approved'}
              className={`px-12 py-3.5 rounded-full font-semibold text-[15px] transition-colors ${
                currentTab?.status === 'approved' 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-[#2A3125] text-white hover:bg-black cursor-pointer'
              }`}
            >
              {currentTab?.status === 'approved' ? 'Approved ✓' : 'Approve'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgricultureReportFlow;
