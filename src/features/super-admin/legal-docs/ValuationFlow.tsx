import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useViewportScale } from '@/hooks/useViewportScale';
import {
  type DocumentTab,
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
  RadioGroupField,
  InputTextField,
} from './reuse';

// ─── Valuation Tabs ───────────────────────────────────────────────────────────

const VALUATION_TABS: DocumentTab[] = [
  { id: 'village-map-naksha', label: 'Village Map or Naksha', status: 'pending' },
  { id: 'sub-register-value', label: 'Sub - Register Value', status: 'pending' },
  { id: 'valuator-report', label: 'Valuator Report', status: 'pending' },
  { id: 'legal-opinion-report', label: 'Legal Opinion Report', status: 'pending' },
  { id: 'road-approach', label: 'Road Approach', status: 'pending' },
  { id: 'water-facility', label: 'Water Facility', status: 'pending' },
  { id: 'electricity-facility', label: 'Electricity Facility', status: 'pending' },
  { id: 'recent-transactions', label: 'Recent Transactions', status: 'pending' },
  { id: 'any-existing-trees', label: 'Any Existing Trees', status: 'pending' },
  { id: 'geological-advantages', label: 'Geological Advantages', status: 'pending' },
  { id: 'future-plans', label: 'Future Plans', status: 'pending' },
  { id: 'validating-disadvantages', label: 'Validating Disadvantages', status: 'pending' },
  { id: 'upcoming-infrastructures', label: 'Upcoming Infrastrucutres', status: 'pending' },
  { id: 'railway-track-connectivity', label: 'Railway Track Connectivity', status: 'pending' },
  { id: 'airport-connectivity', label: 'Airport Connectivity', status: 'pending' },
];

const ValuationFlow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const scale = useViewportScale(1440, 1080);
  const farmlandId = id || 'GLCSOS 01';

  const [tabs, setTabs] = useState<DocumentTab[]>(VALUATION_TABS.map((t) => ({ ...t })));
  const [activeTabId, setActiveTabId] = useState(VALUATION_TABS[0].id);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProceedModal, setShowProceedModal] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTabId);

  const handleApprove = () => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, status: 'approved' } : tab
      )
    );
    
    const currentIndex = tabs.findIndex((t) => t.id === activeTabId);
    if (currentIndex < tabs.length - 1) {
      setActiveTabId(tabs[currentIndex + 1].id);
    } else {
      setShowProceedModal(true);
    }
  };

  const handleRejectConfirm = () => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, status: 'rejected' } : tab
      )
    );
    setShowRejectModal(false);
  };

  const handleProceedNext = () => {
    setShowProceedModal(false);
    navigate(`/super-admin/Documents/local-intelligence/${farmlandId}`);
  };

  const navigateToStep = (stepPath: string) => {
    navigate(`/super-admin/Documents/${stepPath}/${farmlandId}`);
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen relative flex flex-col items-center overflow-hidden font-sans">
      
      {showProceedModal && (
        <ProceedModal
          onClose={() => setShowProceedModal(false)}
          onProceed={handleProceedNext}
          currentStepName="Valuation"
          nextStepName="Local Intelligence"
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
          currentStepId="valuation"
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
                {activeTabId === 'road-approach' ? (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Type of Road Approach</h3>
                    <RadioGroupField 
                      label=""
                      options={[
                        { label: 'Private Road', selected: false },
                        { label: 'Governement Road', selected: true }
                      ]}
                    />
                    <div className="mt-8">
                      <InputTextField label="Width of the Road (in Feet)" value="100" />
                    </div>
                  </>
                ) : activeTabId === 'water-facility' ? (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Water Facility</h3>
                    <RadioGroupField 
                      label=""
                      options={[
                        { label: 'Available', selected: true },
                        { label: 'Not Available', selected: false }
                      ]}
                    />
                    <div className="mt-8">
                      <DropdownField label="Primary Source of Water" value="Bore" />
                    </div>
                    <div className="mt-8">
                      <InputTextField label="Depth of the Bore(in feet)" value="100 feet" />
                    </div>
                  </>
                ) : activeTabId === 'electricity-facility' ? (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Electricity Facility</h3>
                    <RadioGroupField 
                      label=""
                      options={[
                        { label: 'Available', selected: true },
                        { label: 'Not Available', selected: false }
                      ]}
                    />
                  </>
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

export default ValuationFlow;
