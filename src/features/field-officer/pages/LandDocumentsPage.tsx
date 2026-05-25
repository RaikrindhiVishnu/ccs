import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { requestInfoData } from "../data/requestInfoData";
import DocumentsTabs from "../components/land-documents/DocumentsTabs";
import UploadForm from "../components/land-documents/UploadForm";

type FileItem = {
  name: string;
  size: string;
};

type DocumentState = {
  files: FileItem[];
  url: string;
  comments: string;
  isReupload: boolean;
};

const initialDocumentsState: Record<string, DocumentState> = {
  "Land Document": { files: [], url: "", comments: "", isReupload: false },
  "Pattadhar Passbook": { files: [], url: "", comments: "", isReupload: false },
  "Link Document": { files: [], url: "", comments: "", isReupload: false },
  "Kasara Pahani & Proceeding Copies": { files: [], url: "", comments: "", isReupload: false },
  "Revenue Record": { files: [], url: "", comments: "", isReupload: false },
  "Lease Agreement": { files: [], url: "", comments: "", isReupload: false },
  "Death Certificate": { files: [], url: "", comments: "", isReupload: false },
  "Partition Deed": { files: [], url: "", comments: "", isReupload: false },
  "Encumbrance Certificate": { files: [], url: "", comments: "", isReupload: false },
  "Land Coordinates": { files: [], url: "", comments: "", isReupload: false },
  "Owner KYC Video": { files: [], url: "", comments: "", isReupload: false },
};

const LandDocumentsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find corresponding request item to display correct Farmland ID
  const requestItem = requestInfoData.find((item) => item.id === Number(id)) || requestInfoData[0];
  const farmId = id ? id.toUpperCase() : "GLCSOS 01";

  // Active Tab state
  const [activeTab, setActiveTab] = useState("Land Document");
  
  // Dynamic individual tab states
  const [documentsData, setDocumentsData] = useState<Record<string, DocumentState>>(initialDocumentsState);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const currentDoc = documentsData[activeTab] || { files: [], url: "", comments: "", isReupload: false };

  const handleFilesChange = (newFiles: FileItem[]) => {
    setDocumentsData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        files: newFiles,
      },
    }));
  };

  const handleCommentChange = (newComment: string) => {
    setDocumentsData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        comments: newComment,
      },
    }));
  };

  const handleUrlChange = (newUrl: string) => {
    setDocumentsData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        url: newUrl,
      },
    }));
  };

  const handleNext = () => {
    // Show success toast dynamically using activeTab
    setToastMessage(`${activeTab} Files has been saved`);
    setShowToast(true);
    
    // Auto hide after 3 seconds, then transition the active tab to Re-upload state to simulate backend issue
    setTimeout(() => {
      setShowToast(false);
      setDocumentsData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          isReupload: true,
        },
      }));
    }, 3000);
  };

  const handleBack = () => {
    // Navigate back to the Farmland Workflow page
    navigate(`/field-officer/farmland-workflow/${farmId}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-[24px] overflow-x-hidden">
      {/* Centered Wrapper with expanded custom break sizes */}
      <div
        className="
          w-full
          max-w-[1600px]
          2xl:max-w-[1760px]
          3xl:max-w-[2200px]
          mx-auto
          px-[32px]
          2xl:px-[48px]
          3xl:px-[80px]
        "
      >
        
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="
              w-[244px]
              h-[56px]
              rounded-full
              border
              border-[#E6E6E6]
              bg-white
              text-[#4B4B4B]
              font-medium
              cursor-pointer
              hover:bg-gray-50
              transition-all
              font-plus-jakarta
              text-lg
            "
          >
            ← Go Back to Dashboard
          </button>

          <div className="flex items-center gap-4">
            <div
              className="
                w-[52px]
                h-[52px]
                rounded-full
                bg-white
                border
                border-[#ECECEC]
                flex
                items-center
                justify-center
                relative
                cursor-pointer
              "
            >
              <span className="absolute top-[14px] right-[14px] w-2 h-2 bg-red-500 rounded-full border border-white" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#8B8B8B]">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>

            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="profile"
              className="
                w-[52px]
                h-[52px]
                rounded-full
                object-cover
              "
            />
          </div>
        </div>

        {/* Top Section Layout */}
        <div
          className="
            grid
            grid-cols-[360px_minmax(0,1fr)]
            2xl:grid-cols-[400px_minmax(0,1fr)]
            3xl:grid-cols-[440px_minmax(0,1fr)]
            gap-[20px]
            mt-[16px]
            w-full
          "
        >
          
          {/* Left Sidebar */}
          <div
            className="
              w-full
              max-w-[360px]
              2xl:max-w-[400px]
              3xl:max-w-[440px]
              h-[443px]
              rounded-[24px]
              bg-white
              px-[24px]
              py-[20px]
              shadow-sm
              border
              border-gray-100/50
              flex
              flex-col
              justify-start
              shrink-0
            "
          >
            <div className="w-full">
              <p className="text-[#8B8B8B] text-sm font-plus-jakarta">
                Farmland ID:
              </p>
              <h1
                className="
                  text-[28px]
                  font-semibold
                  mt-1
                  font-plus-jakarta
                  leading-none
                "
              >
                {farmId}
              </h1>

              {/* Timeline Container */}
              <div className="relative mt-8">
                {/* Timeline Vertical Line */}
                <div
                  className="
                    absolute
                    left-[8px]
                    top-[18px]
                    w-[2px]
                    h-[120px]
                    bg-[#D9E9F8]
                  "
                />

                <div className="space-y-12">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-[18px] h-[18px] rounded-full border-[4px] border-[#2E8FFF] bg-white shrink-0 mt-[2px]" />
                    <div className="ml-1">
                      <p className="text-[16px] font-medium font-plus-jakarta leading-tight text-[#1A1C1D]">
                        CUSTOMER INFORMATION
                      </p>
                      <p className="text-[#A0A0A0] mt-0.5 font-plus-jakarta text-[14px]">
                        Oct 24 - 09:00 AM
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-[18px] h-[18px] rounded-full border-[4px] border-[#2E8FFF] bg-[#DDF0FF] shrink-0 mt-[2px]" />
                    <div className="ml-1">
                      <p className="text-[16px] text-[#2E8FFF] font-semibold font-plus-jakarta leading-tight">
                        LEGAL DOCUMENTS
                      </p>
                      <p className="text-[#2E8FFF] mt-0.5 font-plus-jakarta text-[14px]">
                        In Progress
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 items-start relative z-10 opacity-50">
                    <div className="w-[18px] h-[18px] rounded-full border-[4px] border-[#BDBDBD] bg-white shrink-0 mt-[2px]" />
                    <div className="ml-1">
                      <p className="text-[16px] font-medium font-plus-jakarta leading-tight text-[#1A1C1D]">
                        AGRICULTURE & REPORT
                      </p>
                      <p className="text-[#A0A0A0] mt-0.5 font-plus-jakarta text-[14px]">
                        Pending
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Header Navigation Panel */}
          <div
            className="
              w-full
              h-[443px]
              rounded-[24px]
              bg-white
              px-[20px]
              py-[20px]
              shadow-sm
              border
              border-gray-100/50
              overflow-y-auto
            "
          >
            <DocumentsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

        </div>

        {/* Upload Card Layout (Full Width Below) */}
        <div
          className="
            w-full
            min-h-[360px]
            rounded-[24px]
            bg-white
            px-[28px]
            py-[28px]
            shadow-sm
            border
            border-gray-100/50
            mt-[16px]
          "
        >
          <UploadForm
            isLandCoordinates={activeTab === "Land Coordinates"}
            uploadTitle={currentDoc.isReupload ? "Re - Upload" : "Upload"}
            files={currentDoc.files}
            comment={currentDoc.comments}
            url={currentDoc.url}
            onFilesChange={handleFilesChange}
            onCommentChange={handleCommentChange}
            onUrlChange={handleUrlChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        </div>

      </div>

      {/* SUCCESS TOAST POPUP (Bottom Right) */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white border border-[#E2E2E4] shadow-[0_6px_30px_rgba(0,0,0,0.08)] rounded-full px-6 py-4.5 flex items-center gap-3.5 z-[9999] transition-all transform duration-300">
          <div className="w-6 h-6 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-xs font-bold shrink-0">
            ✓
          </div>
          
          <span className="text-[15px] font-bold text-[#1A1C1D] font-plus-jakarta">
            {toastMessage}
          </span>

          <button
            onClick={() => setShowToast(false)}
            className="text-gray-400 hover:text-gray-600 ml-4 p-1 rounded-full cursor-pointer transition-colors border-none bg-transparent"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default LandDocumentsPage;
