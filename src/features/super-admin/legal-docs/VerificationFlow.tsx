import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  type DocumentTab,
  type DocumentStatus,
  FLOW_STEPS,
  MOCK_FILES,
  MOCK_COMMENT,
  PdfIcon,
  FileRow,
  RejectModal,
  ProceedModal,
  PageHeader,
  StepperSidebar,
  TabsCard,
  CommentsSection,
  FooterActions,
} from './reuse';

// ─── Step Config (derived from FLOW_STEPS) ────────────────────────────────────

const VERIFICATION_STEPS = FLOW_STEPS.map((step) => ({
  ...step,
  nextStepId:
    step.id === 'customer-information' ? 'legal-documents'
    : step.id === 'legal-documents' ? 'agriculture-report'
    : step.id === 'agriculture-report' ? 'land-boundaries'
    : step.id === 'land-boundaries' ? 'valuation'
    : step.id === 'valuation' ? 'local-intelligence'
    : null,
  tabs: 
    step.id === 'legal-documents' ? [
      { id: 'land-document', label: 'Land Document', status: 'pending' as DocumentStatus },
      { id: 'pattadhar-passbook', label: 'Pattadhar Passbook', status: 'pending' as DocumentStatus },
      { id: 'link-document', label: 'Link Document', status: 'pending' as DocumentStatus },
      { id: 'kasara-pahani', label: 'Kasara Pahani & Proceeding Copies', status: 'pending' as DocumentStatus },
      { id: 'revenue-record', label: 'Revenue Record', status: 'pending' as DocumentStatus },
      { id: 'lease-agreement', label: 'Lease Agreement', status: 'pending' as DocumentStatus },
      { id: 'death-certificate', label: 'Death Certificate', status: 'pending' as DocumentStatus },
      { id: 'partition-deed', label: 'Partition Deed', status: 'pending' as DocumentStatus },
      { id: 'encumbrance-certificate', label: 'Encumbrance Certificate', status: 'pending' as DocumentStatus },
      { id: 'land-coordinates', label: 'Land Coordinates', status: 'pending' as DocumentStatus },
      { id: 'owner-video-kyc', label: 'Owner Video KYC', status: 'pending' as DocumentStatus },
    ] : step.id === 'valuation' ? [
      { id: 'guideline-value', label: 'Guideline Value', status: 'pending' as DocumentStatus },
      { id: 'market-value', label: 'Market Value', status: 'pending' as DocumentStatus },
      { id: 'future-development', label: 'Future Development', status: 'pending' as DocumentStatus },
      { id: 'growth-corridor', label: 'Growth Corridor', status: 'pending' as DocumentStatus },
      { id: 'nearest-town', label: 'Nearest Town', status: 'pending' as DocumentStatus },
      { id: 'existing-infrastructure', label: 'Existing Infrastructure', status: 'pending' as DocumentStatus },
      { id: 'nearby-amenities', label: 'Nearby Amenities', status: 'pending' as DocumentStatus },
    ] : step.id === 'local-intelligence' ? [
      { id: 'local-governance', label: 'Local Governance', status: 'pending' as DocumentStatus },
      { id: 'community-profile', label: 'Community Profile', status: 'pending' as DocumentStatus },
      { id: 'security-assessment', label: 'Security Assessment', status: 'pending' as DocumentStatus },
      { id: 'environmental-factors', label: 'Environmental Factors', status: 'pending' as DocumentStatus },
      { id: 'economic-indicators', label: 'Economic Indicators', status: 'pending' as DocumentStatus },
    ] : [] as DocumentTab[],
}));

// ─── Main Component ───────────────────────────────────────────────────────────

const VerificationFlow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const scale = useViewportScale(1440, 1080);

  const farmlandId = id ?? 'GLCSOS 01';

  // Determine current step from URL
  const pathSegments = location.pathname.split('/');
  const stepSlug = pathSegments[pathSegments.indexOf('Documents') + 1] || 'legal-documents';
  const currentStep = VERIFICATION_STEPS.find((s) => s.routePath === stepSlug) || VERIFICATION_STEPS[1];
  const nextStep = currentStep.nextStepId 
    ? VERIFICATION_STEPS.find((s) => s.id === currentStep.nextStepId) 
    : null;

  // State
  const [tabs, setTabs] = useState<DocumentTab[]>(
    currentStep.tabs.map((t) => ({ ...t }))
  );
  const [activeTabId, setActiveTabId] = useState(currentStep.tabs[0]?.id || '');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProceedModal, setShowProceedModal] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTabId);

  const handleApprove = () => {
    const updatedTabs = tabs.map((t) =>
      t.id === activeTabId ? { ...t, status: 'approved' as DocumentStatus } : t
    );
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
      prev.map((t) => (t.id === activeTabId ? { ...t, status: 'rejected' as DocumentStatus } : t))
    );
    setShowRejectModal(false);
  };

  const handleProceedNext = () => {
    setShowProceedModal(false);
    if (!nextStep) {
      navigate('/super-admin/dashboard');
    } else if (nextStep.id === 'customer-information') {
      navigate(`/super-admin/assigned-farmlands/${farmlandId}/customer-information`);
    } else {
      navigate(`/super-admin/Documents/${nextStep.routePath}/${farmlandId}`);
    }
  };

  const navigateToStep = (stepPath: string, stepId: string) => {
    if (stepId === 'dashboard') {
      navigate('/super-admin/dashboard');
    } else if (stepId === 'customer-information') {
      navigate(`/super-admin/assigned-farmlands/${farmlandId}/customer-information`);
    } else {
      navigate(`/super-admin/Documents/${stepPath}/${farmlandId}`);
    }
  };

  // Capitalize nicely for modal
  const currentStepTitleCase = currentStep.name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-[#1A1A1A] min-h-screen relative flex flex-col items-center overflow-hidden font-sans">
      
      {/* ── Modals ── */}
      {showProceedModal && (
        <ProceedModal
          onClose={() => setShowProceedModal(false)}
          onProceed={handleProceedNext}
          currentStepName={currentStepTitleCase}
          nextStepName={nextStep ? nextStep.name.toLowerCase() : 'Dashboard'}
          farmlandId={farmlandId}
        />
      )}
      {showRejectModal && (
        <RejectModal
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleRejectConfirm}
        />
      )}

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
        <PageHeader />

        <StepperSidebar
          farmlandId={farmlandId}
          currentStepId={currentStep.id}
          steps={FLOW_STEPS}
          onNavigate={navigateToStep}
        />

        {/* ── RIGHT TOP: Tabs Card ── */}
        {tabs.length > 0 && (
          <TabsCard tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTabId} />
        )}

        {/* ── RIGHT BOTTOM: Content Card ── */}
        {tabs.length > 0 && (
          <div className="absolute left-[440px] right-[40px] top-[540px] bottom-[40px] bg-white shadow-sm rounded-[2rem] p-10 flex flex-col">
            <div className="flex gap-16 flex-1">
              
              {/* Left Section - Conditional: Land Coordinates URL or Uploaded Files */}
              <div className="flex-1 flex flex-col">
                {activeTabId === 'land-coordinates' ? (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Land Coordinates</h3>
                    <div className="bg-[#F0F4F8] rounded-2xl p-4">
                      <a 
                        href="https://maps.app.goo.gl/w7pRkwAgPbcdzwAu7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[14px] text-[#1D7ABE] font-medium break-all hover:underline"
                      >
                        https://maps.app.goo.gl/w7pRkwAgPbcdzwAu7
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Uploaded File</h3>
                    <div className="flex flex-col gap-4">
                      {MOCK_FILES.map((file) => (
                        <FileRow key={file.id} file={file} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <CommentsSection comment={MOCK_COMMENT} />
            </div>

            <FooterActions
              isApproved={currentTab?.status === 'approved'}
              onReject={() => setShowRejectModal(true)}
              onApprove={handleApprove}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default VerificationFlow;
