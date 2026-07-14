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
  RadioGroupField,
  InputTextField,
} from './reuse';

// ─── Land & Boundaries Tabs (10 tabs) ─────────────────────────────────────────

const LAND_BOUNDARIES_TABS: DocumentTab[] = [
  { id: 'land-images', label: 'Land Images', status: 'pending' },
  { id: 'landscape-view', label: 'Landscape View of Farmlands', status: 'pending' },
  { id: 'shape-of-land', label: 'Shape of the Land', status: 'pending' },
  { id: 'water-electricity', label: 'Water and Electricity Facility', status: 'pending' },
  { id: 'master-plan', label: 'Master Plan', status: 'pending' },
  { id: 'survey-report', label: 'Survey Report', status: 'pending' },
  { id: 'east-boundaries', label: 'East Boundaries', status: 'pending' },
  { id: 'west-boundaries', label: 'West Boundaries', status: 'pending' },
  { id: 'north-boundaries', label: 'North Boundaries', status: 'pending' },
  { id: 'south-boundaries', label: 'South Boundaries', status: 'pending' },
];

const MOCK_COVER_IMAGE = { id: 'cover-1', name: 'Cover image.pdf', size: '8MB' };
const MOCK_UPLOADED_IMAGES = [
  { id: '1', name: 'File_name_1.pdf', size: '8MB' },
  { id: '2', name: 'File_name_1.pdf', size: '8MB' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const LandBoundariesFlow: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const scale = useViewportScale(1440, 1080);

  const farmlandId = id ?? 'GLCSOS 01';

  // State
  const [tabs, setTabs] = useState<DocumentTab[]>(
    LAND_BOUNDARIES_TABS.map((t) => ({ ...t }))
  );
  const [activeTabId, setActiveTabId] = useState(LAND_BOUNDARIES_TABS[0].id);
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

  const handleRejectConfirm = (_reason: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, status: 'rejected' as DocumentStatus } : t))
    );
    setShowRejectModal(false);
  };

  const handleProceedNext = () => {
    setShowProceedModal(false);
    navigate(`/super-admin/Documents/valuation/${farmlandId}`);
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
          currentStepName="Land & Boundaries"
          nextStepName="Valuation"
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
          currentStepId="land-boundaries"
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
                {activeTabId === 'shape-of-land' ? (
                  <DropdownField label="Shape of the Land" value="Square" />
                ) : activeTabId === 'water-electricity' ? (
                  <>
                    <RadioGroupField 
                      label="Select availability Facility" 
                      options={[
                        { label: 'Water Facility', selected: false },
                        { label: 'Electricity Facility', selected: false },
                        { label: 'Both', selected: true },
                      ]} 
                    />
                    <RadioGroupField 
                      label="Select Water Facility" 
                      options={[
                        { label: 'Bore', selected: true },
                        { label: 'Muncipal', selected: false },
                      ]} 
                    />
                    <RadioGroupField 
                      label="Select Electricity Facility" 
                      options={[
                        { label: '2 Phase', selected: false },
                        { label: '3 Phase', selected: true },
                      ]} 
                    />
                  </>
                ) : activeTabId === 'master-plan' || activeTabId === 'landscape-view' ? (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Upload Files</h3>
                    <div className="flex flex-col gap-4">
                      {MOCK_FILES.map((file) => (
                        <FileRow key={file.id} file={file} />
                      ))}
                    </div>
                  </>

                ) : activeTabId === 'survey-report' ? (
                  <>
                    <RadioGroupField 
                      label="Select Survey Report Type" 
                      options={[
                        { label: 'Private Survey Report', selected: false },
                        { label: 'Government Survey Report', selected: false },
                        { label: 'Both Survey Reports', selected: true },
                      ]} 
                    />
                    
                    <h3 className="text-[18px] font-bold text-gray-900 mb-4">Private Survey Report</h3>
                    <span className="text-[14px] font-medium text-gray-800 mb-3 block">Uploaded Files</span>
                    <div className="flex flex-col gap-3 mb-8">
                      {MOCK_FILES.map((file) => (
                        <FileRow key={file.id} file={file} />
                      ))}
                    </div>

                    <h3 className="text-[18px] font-bold text-gray-900 mb-4">Government Survey Report</h3>
                    <span className="text-[14px] font-medium text-gray-800 mb-3 block">Uploaded Files</span>
                    <div className="flex flex-col gap-3">
                      {MOCK_FILES.map((file) => (
                        <FileRow key={`gov-${file.id}`} file={file} />
                      ))}
                    </div>
                  </>

                ) : activeTabId === 'east-boundaries' ? (
                  <>
                    <DropdownField label="East Boundaries" value="Land" />
                    <h3 className="text-[20px] font-bold text-gray-900 mt-2 mb-6">Land Owner Details</h3>
                    <InputTextField label="Name" value="Krishna" />
                    <InputTextField label="Age" value="54" />
                  </>

                ) : activeTabId === 'west-boundaries' ? (
                  <>
                    <DropdownField label="West Boundaries" value="Road" />
                    <RadioGroupField 
                      label="Type of Road" 
                      options={[
                        { label: 'Private Road', selected: false },
                        { label: 'Governement Road', selected: true },
                      ]} 
                    />
                    <InputTextField label="Width of the Road" value="100 feets" />
                  </>

                ) : activeTabId === 'north-boundaries' ? (
                  <>
                    <DropdownField label="North Boundaries" value="Trees" />
                    <InputTextField label="Trees Count" value="1 - 10" />
                  </>

                ) : activeTabId === 'south-boundaries' ? (
                  <>
                    <DropdownField label="South Boundaries" value="Other" />
                  </>

                ) : (
                  <>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-5">Uploaded Files</h3>
                    
                    {/* Cover Image Sub-section */}
                    <span className="text-[13px] font-medium text-gray-500 mb-2 block">Cover image</span>
                    <FileRow file={MOCK_COVER_IMAGE} />

                    {/* Uploaded Images Sub-section */}
                    <span className="text-[13px] font-medium text-gray-500 mt-4 mb-2 block">Uploaded images</span>
                    <div className="flex flex-col gap-3">
                      {MOCK_UPLOADED_IMAGES.map((file) => (
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

export default LandBoundariesFlow;
