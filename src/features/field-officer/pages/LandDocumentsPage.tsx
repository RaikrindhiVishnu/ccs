import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { requestInfoData } from "../data/requestInfoData";
import { timelineData } from "../data/landDocumentsData";
import DocumentsTabs from "../components/land-documents/DocumentsTabs";
import TimelineView from "../components/land-documents/TimelineView";
import UploadForm from "../components/land-documents/UploadForm";

type TimelineItem = {
  id: number;
  date: string;
  time: string;
  comment: string;
  files: string[];
  updatedBy: string;
  issueBy?: string;
  issueComment?: string;
};

const LandDocumentsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find corresponding request item to display correct Farmland ID
  const requestItem = requestInfoData.find((item) => item.id === Number(id)) || requestInfoData[0];
  const farmId = requestItem.farmlandId;

  // Tabs & Stepper state
  const [activeTab, setActiveTab] = useState("Land Document");
  
  // Local Timeline state so that edits are reflected live
  const [timelineState, setTimelineState] = useState<TimelineItem[]>(timelineData);
  
  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<TimelineItem | null>(null);

  const handleEditClick = (item: TimelineItem) => {
    setCurrentEditItem(item);
    setEditMode(true);
  };

  const handleSaveUpload = (itemId: number, updatedComment: string, updatedFiles: string[]) => {
    setTimelineState((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              comment: updatedComment,
              files: updatedFiles,
              updatedBy: "Phani Krishna (Updated)", // Simulating current user edit
            }
          : item
      )
    );
    setEditMode(false);
    setCurrentEditItem(null);
  };

  const handleCancelUpload = () => {
    setEditMode(false);
    setCurrentEditItem(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="w-[92%] 2xl:w-[88%] mx-auto">
        
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between mb-8 2xl:mb-11">
          <button
            onClick={() => navigate(-1)}
            className="
              bg-white
              rounded-full
              px-6 py-3
              2xl:px-8 2xl:py-4
              flex items-center gap-2
              border border-[#E5E7EB]
              text-[#374151]
              font-semibold
              shadow-sm
              hover:bg-gray-50
              transition-colors
              cursor-pointer
              text-[14px] 2xl:text-[18px]
              font-plus-jakarta
            "
          >
            <ArrowLeft size={18} />
            Go Back to Details
          </button>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 2xl:w-13 2xl:h-13 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] shadow-sm relative cursor-pointer hover:bg-gray-50">
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="2xl:w-6 2xl:h-6">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              className="w-12 h-12 2xl:w-15 2xl:h-15 rounded-full object-cover border-2 border-white shadow-sm"
              alt="user profile"
            />
          </div>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-11 items-stretch">
          
          {/* LEFT SIDEBAR: Stepper Card */}
          <div className="lg:col-span-3 bg-white rounded-[36px] 2xl:rounded-[48px] p-8 2xl:p-11 shadow-md border border-gray-100/50 flex flex-col justify-start">
            <p className="text-[#9CA3AF] text-[12px] 2xl:text-[16px] font-extrabold uppercase tracking-wider font-plus-jakarta">
              Farmland ID:
            </p>
            <h1 className="text-[36px] 2xl:text-[48px] font-bold text-[#1A1C1D] leading-tight font-plus-jakarta mt-1 mb-10 2xl:mb-14">
              {farmId}
            </h1>

            {/* Timeline Stepper */}
            <div className="relative pl-8 2xl:pl-11 space-y-10 2xl:space-y-14">
              {/* Connector line */}
              <div className="absolute left-[8px] 2xl:left-[11px] top-3 bottom-3 w-[2px] bg-gray-200" />

              {/* Step 1: Customer Information */}
              <div className="relative">
                <div className="absolute -left-[32px] 2xl:-left-[43px] top-1.5 w-4 h-4 2xl:w-6 2xl:h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-gray-300" />
                </div>
                <div>
                  <h4 className="text-[15px] 2xl:text-[20px] font-bold text-gray-400 font-plus-jakarta uppercase tracking-wider">
                    Customer Information
                  </h4>
                  <p className="text-[11px] 2xl:text-[14px] text-gray-400 font-bold mt-1 font-plus-jakarta">
                    Oct 24 – 09:00 AM
                  </p>
                </div>
              </div>

              {/* Step 2: Legal Documents (Active) */}
              <div className="relative">
                {/* Active circle indicator */}
                <div className="absolute -left-[32px] 2xl:-left-[43px] top-1.5 w-4 h-4 2xl:w-6 2xl:h-6 rounded-full bg-white border-2 border-[#1C5F9D] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-[#1C5F9D]" />
                </div>
                <div>
                  <h4 className="text-[15px] 2xl:text-[20px] font-extrabold text-[#1C5F9D] font-plus-jakarta uppercase tracking-wider">
                    Legal Documents
                  </h4>
                  <p className="text-[11px] 2xl:text-[14px] text-[#1C5F9D] font-bold mt-1 font-plus-jakarta">
                    In Progress
                  </p>
                </div>
              </div>

              {/* Step 3: Agriculture & Report */}
              <div className="relative">
                <div className="absolute -left-[32px] 2xl:-left-[43px] top-1.5 w-4 h-4 2xl:w-6 2xl:h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-gray-300" />
                </div>
                <div>
                  <h4 className="text-[15px] 2xl:text-[20px] font-bold text-gray-400 font-plus-jakarta uppercase tracking-wider">
                    Agriculture & Report
                  </h4>
                  <p className="text-[11px] 2xl:text-[14px] text-gray-400 font-bold mt-1 font-plus-jakarta">
                    Pending
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-9 flex flex-col gap-6 2xl:gap-8">
            
            {/* Top Document Tabs Card */}
            <div className="bg-white rounded-[36px] 2xl:rounded-[48px] p-8 2xl:p-11 shadow-md border border-gray-100/50">
              <DocumentsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Bottom Timeline or Upload Card */}
            <div className="bg-white rounded-[36px] 2xl:rounded-[48px] p-8 2xl:p-11 shadow-md border border-gray-100/50 flex-1">
              {!editMode ? (
                <TimelineView
                  timeline={timelineState}
                  onEditClick={handleEditClick}
                />
              ) : (
                currentEditItem && (
                  <UploadForm
                    editItem={currentEditItem}
                    onSave={handleSaveUpload}
                    onCancel={handleCancelUpload}
                  />
                )
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LandDocumentsPage;
