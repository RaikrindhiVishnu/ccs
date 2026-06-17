import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  type DocumentTab,
  type DocumentStatus,
  FLOW_STEPS,
  MOCK_FILES,
  MOCK_COMMENT,
  FileRow,
  RejectModal,
  ProceedModal,
  PageHeader,
  StepperSidebar,
  TabsCard,
  CommentsSection,
  FooterActions,
  DropdownField,
  TextField,
  MultiTagField,
  DualTextField,
} from './reuse';

// ─── Agriculture Report Tabs (11 tabs) ────────────────────────────────────────

const AGRICULTURE_TABS: DocumentTab[] = [
  { id: 'soil-certificate', label: 'Soil Certificate', status: 'pending' },
  { id: 'water-certificate', label: 'Water Certificate', status: 'pending' },
  { id: 'soil', label: 'Soil', status: 'pending' },
  { id: 'type-of-crop', label: 'Type of crop', status: 'pending' },
  { id: 'ground-water-level', label: 'Ground Water Level', status: 'pending' },
  { id: 'types-of-crop-can-be-grown', label: 'Types of crop can be grown', status: 'pending' },
  { id: 'current-yield-cost', label: 'Current Yield Cost', status: 'pending' },
  { id: 'current-cultivation', label: 'Current Cultivation', status: 'pending' },
  { id: 'future-crops', label: 'Future Crops', status: 'pending' },
  { id: 'farmer-agriculture-certificate', label: 'Farmer Agriculture Certificate', status: 'pending' },
  { id: 'mro-reports', label: 'MRO Reports', status: 'pending' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const AgricultureReportFlow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const scale = useViewportScale(1440, 1080);

  const farmlandId = id ?? 'GLCSOS 01';

  // State
  const [tabs, setTabs] = useState<DocumentTab[]>(
    AGRICULTURE_TABS.map((t) => ({ ...t }))
  );
  const [activeTabId, setActiveTabId] = useState(AGRICULTURE_TABS[0].id);
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
    navigate(`/super-admin/Documents/land-boundaries/${farmlandId}`);
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

  return (
    <div className="bg-[#1A1A1A] min-h-screen relative flex flex-col items-center overflow-hidden font-sans">
      
      {/* ── Modals ── */}
      {showProceedModal && (
        <ProceedModal
          onClose={() => setShowProceedModal(false)}
          onProceed={handleProceedNext}
          currentStepName="Agriculture Report"
          nextStepName="Land & Boundaries"
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
        className="w-[1440px] h-[1024px] bg-[#F9FAFB] relative overflow-hidden"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(scale - 1) * 1065}px`
        }}
      >
        <PageHeader />

        <StepperSidebar
          farmlandId={farmlandId}
          currentStepId="agriculture-report"
          steps={FLOW_STEPS}
          onNavigate={navigateToStep}
        />

        {/* ── RIGHT CONTENT (Responsive Flex) ── */}
        <div className="absolute left-[440px] right-[40px] top-[120px] bottom-[40px] flex flex-col gap-6">
          <TabsCard tabs={tabs} activeTabId={activeTabId} onTabClick={setActiveTabId} />

          <div className="bg-white shadow-sm rounded-[2rem] p-10 flex flex-col min-h-0" style={{ flex: 6 }}>
            <div className="flex gap-16 flex-1 overflow-y-auto pr-4 custom-scrollbar">
              
              {/* Left Section - Conditional based on active tab */}
              <div className="flex-1 flex flex-col">
                {activeTabId === 'soil' ? (
                  <DropdownField label="Soil Type" value="Alfiso(Black soil)" />

                ) : activeTabId === 'type-of-crop' ? (
                  <DropdownField label="Types of crops available present?" value="Alfiso(Black soil)" />

                ) : activeTabId === 'ground-water-level' ? (
                  <TextField label="Depth of the Ground Water level" value="100 feets" />

                ) : activeTabId === 'types-of-crop-can-be-grown' ? (
                  <MultiTagField label="Types of crops can be grown in future?" tags={['Rice', 'Corn']} />

                ) : activeTabId === 'current-yield-cost' ? (
                  <DualTextField 
                    label1="What is the current yielding cost?" value1="1,00,000.00" 
                    label2="Current returns from yield?" value2="1,00,000.00" 
                  />

                ) : activeTabId === 'current-cultivation' ? (
                  <DropdownField label="What is the current cultivation?" value="Paddy" />

                ) : activeTabId === 'future-crops' ? (
                  <MultiTagField label="What are the future crops planned?" tags={['Wheat', 'Sugarcane']} />

                ) : (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Uploaded Files</h3>
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
        </div>

      </div>
    </div>
  );
};

export default AgricultureReportFlow;
