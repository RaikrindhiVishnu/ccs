import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UploadGoBack from "../../components/upload-components/UploadGoBack";
import UploadShortTimelineSidebar, { type UploadStepId } from "../../components/upload-components/UploadShortTimelineSidebar";
import UploadDocumentsTabsCard from "../../components/upload-components/UploadDocumentsTabsCard";
import UploadFilesDocument from "../../components/upload-components/UploadFilesDocument";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
}

// Sub-tabs configuration per pipeline step
const STEP_TABS_CONFIG: Record<
  string,
  { label: string; tabs: { id: string; label: string }[] }
> = {
  "legal-documents": {
    label: "Legal Documents",
    tabs: [
      { id: "land-document", label: "Land Document" },
      { id: "pattadhar-passbook", label: "Pattadhar Passbook" },
      { id: "link-document", label: "Link Document" },
      { id: "kasara-pahani", label: "Kasara Pahani & Proceeding Copies" },
      { id: "revenue-record", label: "Revenue Record" },
      { id: "lease-agreement", label: "Lease Agreement" },
      { id: "death-certificate", label: "Death Certificate" },
      { id: "partition-deed", label: "Partition Deed" },
      { id: "encumbrance-certificate", label: "Encumbrance Certificate" },
      { id: "land-coordinates", label: "Land Coordinates" },
      { id: "owner-video-kyc", label: "Owner Video KYC" },
    ],
  },
  "agriculture-report": {
    label: "Agriculture Report",
    tabs: [
      { id: "local-agriculture-officer-report", label: "Local Agriculture Officer Report" },
      { id: "last-5-years-crop-yielding", label: "Last 5 years Crop Yielding Report" },
      { id: "soil", label: "Soil Report" },
      { id: "type-of-crop", label: "Type of Crop" },
      { id: "ground-water-level", label: "Ground Water Level" },
      { id: "types-of-crop-can-be-grown", label: "Types of Crop can be grown" },
      { id: "current-yield-cost", label: "Current Yield Cost" },
      { id: "current-cultivation", label: "Current Cultivation" },
      { id: "future-crops", label: "Future Crops" },
      { id: "maintenance", label: "Maintenance" },
      { id: "natural-advantages-disadvantages", label: "Natural Advantages and Disadvantages" },
    ],
  },
  "land-boundaries": {
    label: "Land & Boundaries",
    tabs: [
      { id: "survey-map", label: "Survey Map" },
      { id: "fencing-details", label: "Fencing Details" },
    ],
  },
  "valuation": {
    label: "Valuation",
    tabs: [
      { id: "valuation-report", label: "Valuation Report" },
      { id: "market-analysis", label: "Market Analysis" },
    ],
  },
  "local-intelligence": {
    label: "Local Intelligence",
    tabs: [
      { id: "local-inquiry", label: "Local Inquiry Report" },
      { id: "neighbor-noc", label: "Neighbor NOC" },
      { id: "dispute-check", label: "Dispute Check" },
    ],
  },
};

const STEP_ORDER: UploadStepId[] = [
  "customer-information",
  "legal-documents",
  "agriculture-report",
  "land-boundaries",
  "valuation",
  "local-intelligence",
];

export const LegalUploadDocument: React.FC = () => {
  const { step, id } = useParams<{ step: string; id: string }>();
  const navigate = useNavigate();
  const targetId = id || "GLCSOS-05";

  // Validate the current step or default to legal-documents
  const currentStepId = (step && STEP_TABS_CONFIG[step] ? step : "legal-documents") as UploadStepId;
  const stepConfig = STEP_TABS_CONFIG[currentStepId];

  // State
  const [activeTabId, setActiveTabId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Store uploaded files per step and tab ID
  // Structure: { [stepId]: { [tabId]: UploadedFileItem[] } }
  const [uploadedStore, setUploadedStore] = useState<
    Record<string, Record<string, UploadedFileItem[]>>
  >({});

  // Store comments per step and tab ID
  // Structure: { [stepId]: { [tabId]: string } }
  const [commentsStore, setCommentsStore] = useState<
    Record<string, Record<string, string>>
  >({});

  // Sync active tab when step changes
  useEffect(() => {
    if (stepConfig && stepConfig.tabs.length > 0) {
      setActiveTabId(stepConfig.tabs[0].id);
    }
    setShowSuccessModal(false);
  }, [currentStepId]);

  const activeTabLabel = stepConfig?.tabs.find((t) => t.id === activeTabId)?.label || "";
  const currentTabFiles = uploadedStore[currentStepId]?.[activeTabId] || [];
  const currentTabComment = commentsStore[currentStepId]?.[activeTabId] || "";

  // Check if a tab is complete (has at least one uploaded file)
  const isTabComplete = (tabId: string) => {
    const files = uploadedStore[currentStepId]?.[tabId];
    return files && files.length > 0;
  };

  const addFiles = (fileList: FileList) => {
    const newFiles: UploadedFileItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;

      newFiles.push({
        id: Date.now().toString() + i,
        name: file.name,
        size: sizeStr,
        progress: 0,
        status: "uploading",
      });
    }

    // Update state to include new files
    setUploadedStore((prev) => {
      const stepData = prev[currentStepId] || {};
      const tabData = stepData[activeTabId] || [];
      return {
        ...prev,
        [currentStepId]: {
          ...stepData,
          [activeTabId]: [...tabData, ...newFiles],
        },
      };
    });

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 25) + 15;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
        setUploadedStore((prev) => {
          const stepData = prev[currentStepId] || {};
          const tabData = stepData[activeTabId] || [];
          return {
            ...prev,
            [currentStepId]: {
              ...stepData,
              [activeTabId]: tabData.map((f) =>
                f.id === fileId ? { ...f, progress: 100, status: "completed" as const } : f
              ),
            },
          };
        });
      } else {
        setUploadedStore((prev) => {
          const stepData = prev[currentStepId] || {};
          const tabData = stepData[activeTabId] || [];
          return {
            ...prev,
            [currentStepId]: {
              ...stepData,
              [activeTabId]: tabData.map((f) =>
                f.id === fileId ? { ...f, progress: progressVal } : f
              ),
            },
          };
        });
      }
    }, 300);
  };

  const deleteFile = (fileId: string) => {
    setUploadedStore((prev) => {
      const stepData = prev[currentStepId] || {};
      const tabData = stepData[activeTabId] || [];
      return {
        ...prev,
        [currentStepId]: {
          ...stepData,
          [activeTabId]: tabData.filter((f) => f.id !== fileId),
        },
      };
    });
  };

  const handleCommentChange = (val: string) => {
    setCommentsStore((prev) => {
      const stepData = prev[currentStepId] || {};
      return {
        ...prev,
        [currentStepId]: {
          ...stepData,
          [activeTabId]: val,
        },
      };
    });
  };

  // Navigation handlers
  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePreviousStep = () => {
    const stepIndex = STEP_ORDER.indexOf(currentStepId);
    if (stepIndex > 0) {
      const prevStepId = STEP_ORDER[stepIndex - 1];
      if (prevStepId === "customer-information") {
        navigate(`/super-admin/upload/customer-information/${targetId}`);
      } else {
        navigate(`/super-admin/upload/documents/${prevStepId}/${targetId}`);
      }
    }
  };

  const handleNextStep = () => {
    const stepIndex = STEP_ORDER.indexOf(currentStepId);
    if (stepIndex < STEP_ORDER.length - 1) {
      const nextStepId = STEP_ORDER[stepIndex + 1];
      navigate(`/super-admin/upload/documents/${nextStepId}/${targetId}`);
    } else {
      // Completed last step! Show final success modal
      setShowSuccessModal(true);
    }
  };

  // Navigating through sub-tabs
  const handlePrevTab = () => {
    const currentTabIdx = stepConfig.tabs.findIndex((t) => t.id === activeTabId);
    if (currentTabIdx > 0) {
      setActiveTabId(stepConfig.tabs[currentTabIdx - 1].id);
    } else {
      // Go to previous overall step
      handlePreviousStep();
    }
  };

  const handleNextTab = () => {
    const currentTabIdx = stepConfig.tabs.findIndex((t) => t.id === activeTabId);
    if (currentTabIdx < stepConfig.tabs.length - 1) {
      setActiveTabId(stepConfig.tabs[currentTabIdx + 1].id);
    } else {
      // Completed all tabs of this step, go to next overall step
      handleNextStep();
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col justify-start items-center p-[clamp(1.5rem,2.78vw,3.33rem)] font-sans">

      {/* ── Success Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="box-sizing-border-box bg-white border border-[rgba(0,0,0,0.2)] shadow-[0px_0px_12.5px_rgba(0,0,0,0.15)] rounded-[24px] flex flex-col items-center justify-between p-8 relative animate-in zoom-in-95 duration-200"
            style={{
              width: "clamp(20rem, 37.43vw, 33.6875rem)",
              height: "clamp(22rem, 34.38vw, 30.9375rem)",
            }}
          >
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(1.15rem,1.67vw,1.5rem)] text-black text-center mt-2">
              Farmland Upload Completed
            </h3>

            {/* Large Checkmark Badge */}
            <div className="relative flex items-center justify-center w-[clamp(7rem,12.5vw,11.25rem)] h-[clamp(7rem,12.5vw,11.25rem)] bg-[#2A3008]/[0.08] rounded-full shrink-0">
              <div className="w-[clamp(5rem,8.75vw,7.875rem)] h-[clamp(5rem,8.75vw,7.875rem)] flex items-center justify-center">
                <svg className="w-full h-full text-[#BDD327]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
            </div>

            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.85rem,1.2vw,1.25rem)] leading-snug text-[#3D4949] text-center max-w-[320px]">
              All pipeline documents for <span className="text-[#0052cc]">{targetId}</span> have been successfully uploaded!
            </span>

            <button
              type="button"
              onClick={() => navigate("/super-admin/dashboard")}
              className="flex items-center justify-center text-white rounded-[57px] shadow-lg hover:scale-105 active:scale-95 cursor-pointer font-['Plus_Jakarta_Sans'] font-normal w-[clamp(15rem,27.64vw,24.875rem)] h-[clamp(2.5rem,3.89vw,3.5rem)] shrink-0 mb-2"
              style={{
                background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
              }}
            >
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-white text-[clamp(0.95rem,1.25vw,1.125rem)]">
                Go to Dashboard
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[clamp(64rem,90vw,120rem)] flex flex-col gap-[clamp(1.5rem,2vw,2.5rem)]">

        {/* ── Top Header ── */}
        <div className="flex justify-start w-full">
          <UploadGoBack onClick={handleGoBack} />
        </div>

        {/* ── Main Layout ── */}
        <div className="w-full flex flex-col lg:flex-row gap-[clamp(1.5rem,2vw,2.5rem)] items-start">

          {/* Left Column: Short Timeline Sidebar */}
          <UploadShortTimelineSidebar
            farmlandId={targetId}
            activeStep={currentStepId}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />

          {/* Right Column: Cards Stack */}
          <div className="flex-1 flex flex-col gap-[clamp(1rem,1.875vw,2.5rem)] w-full">
            {/* Sub-Tabs Selector Card */}
            <UploadDocumentsTabsCard
              tabs={stepConfig?.tabs || []}
              activeTabId={activeTabId}
              onTabSelect={setActiveTabId}
              isTabComplete={isTabComplete}
            />

            {/* Upload Container Card */}
            <UploadFilesDocument
              activeTabLabel={activeTabLabel}
              uploadedFiles={currentTabFiles}
              commentValue={currentTabComment}
              onCommentChange={handleCommentChange}
              onFileUpload={addFiles}
              onFileDelete={deleteFile}
              onPrevTab={handlePrevTab}
              onNextTab={handleNextTab}
              isFinishStep={activeTabId === stepConfig?.tabs[stepConfig.tabs.length - 1]?.id}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default LegalUploadDocument;
