import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import OwnerDetails from "../components/workflow/OwnerDetails";
import FamilyTree from "../components/workflow/FamilyTree";
import LandDetails from "../components/workflow/LandDetails";

export default function FarmlandWorkflowPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState<"owner" | "family" | "land">("owner");

  const farmlandId = id ? id.toUpperCase() : "GLCSOS 01";

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="w-[92%] 2xl:w-[88%] mx-auto">
        
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="
              bg-white
              rounded-full
              px-6 py-3
              flex items-center gap-2
              border border-[#E5E7EB]
              text-[#374151]
              font-medium
              shadow-sm
              hover:bg-gray-50
              transition-colors
              cursor-pointer
            "
          >
            <ArrowLeft size={18} />
            Go back to dashboard
          </button>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] shadow-sm relative">
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              alt="user profile"
            />
          </div>
        </div>

        {/* WORKFLOW CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR (STEP PROGRESS INDICATOR) */}
          <div className="lg:col-span-3 bg-white rounded-[36px] 2xl:rounded-[48px] p-8 2xl:p-11 shadow-sm border border-gray-100/50 min-h-[460px] 2xl:min-h-[613px] flex flex-col justify-start">
            <p className="text-[14px] font-medium text-[#9CA3AF]">Farmland ID:</p>
            <h2 className="text-[32px] 2xl:text-[42px] font-bold text-[#1F2937] tracking-tight mt-1">{farmlandId}</h2>

            {/* VERTICAL STEPS */}
            <div className="mt-12 flex flex-col gap-10 relative pl-4">
              <div className="absolute left-[23px] top-[10px] bottom-[10px] w-[2px] bg-[#E5E7EB]" />
              
              {/* STEP 1: CUSTOMER INFO */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-5 h-5 rounded-full border-4 border-[#3B82F6] bg-white flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                </div>
                <span className="text-[13px] font-bold text-[#3B82F6] uppercase tracking-wider">
                  Customer Information
                </span>
              </div>

              {/* STEP 2: LEGAL DOCUMENTS */}
              <div className="flex items-center gap-4 relative z-10 opacity-60">
                <div className="w-5 h-5 rounded-full border-4 border-gray-300 bg-white" />
                <span className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Legal Documents
                </span>
              </div>

              {/* STEP 3: AGRICULTURE REPORT */}
              <div className="flex items-center gap-4 relative z-10 opacity-60">
                <div className="w-5 h-5 rounded-full border-4 border-gray-300 bg-white" />
                <span className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">
                  Agriculture & Report
                </span>
              </div>
            </div>
          </div>

          {/* MAIN FORM PANEL */}
          <div className="lg:col-span-9 bg-white rounded-[36px] 2xl:rounded-[48px] p-10 2xl:p-14 shadow-sm border border-gray-100/50 min-h-[640px] 2xl:min-h-[853px] flex flex-col justify-between">
            <div>
              {/* SUB-TABS (Owner Details, Family Tree, Land Details) */}
              <div className="flex items-center justify-center lg:justify-end gap-4 mb-10 pb-6 border-b border-[#F3F4F6]">
                
                {/* Owner Details TAB */}
                <button
                  onClick={() => setActiveStep("owner")}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-bold border transition-all cursor-pointer
                    ${
                      activeStep === "owner"
                        ? "border-[#8DCCFF] text-[#2563EB] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] text-[#4B5563] bg-gray-50/50"
                    }
                  `}
                >
                  Owner Details
                  <span className={`text-[12px] ${activeStep !== "owner" ? "text-green-500" : "text-[#2563EB]"}`}>✓</span>
                </button>

                {/* Family Tree TAB */}
                <button
                  onClick={() => setActiveStep("family")}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-bold border transition-all cursor-pointer
                    ${
                      activeStep === "family"
                        ? "border-[#8DCCFF] text-[#2563EB] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] text-[#4B5563] bg-gray-50/50"
                    }
                  `}
                >
                  Family Tree
                  <span className={`text-[12px] ${activeStep === "land" ? "text-green-500" : "text-[#2563EB]"}`}>
                    {activeStep === "land" ? "✓" : "●"}
                  </span>
                </button>

                {/* Land Details TAB */}
                <button
                  onClick={() => setActiveStep("land")}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-bold border transition-all cursor-pointer
                    ${
                      activeStep === "land"
                        ? "border-[#8DCCFF] text-[#2563EB] bg-[#EFF6FF]"
                        : "border-[#E5E7EB] text-[#4B5563] bg-gray-50/50"
                    }
                  `}
                >
                  Land Details
                  <span className="text-[12px] text-[#2563EB]">●</span>
                </button>

              </div>

              {/* RENDER ACTIVE SCREEN */}
              <div className="transition-opacity duration-200">
                {activeStep === "owner" && (
                  <OwnerDetails
                    onNext={() => setActiveStep("family")}
                    onDismiss={() => navigate(-1)}
                  />
                )}
                {activeStep === "family" && (
                  <FamilyTree
                    onBack={() => setActiveStep("owner")}
                    onNext={() => setActiveStep("land")}
                  />
                )}
                {activeStep === "land" && (
                  <LandDetails
                    onBack={() => setActiveStep("family")}
                    onSubmit={() => navigate(-1)}
                  />
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
