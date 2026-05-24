import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AssignedFarmlandPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Normalize farmland name/ID for display
  const farmName = id ? id.replace(/-/g, " ").toUpperCase() : "GLC SOS – 001";

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="w-[92%] 2xl:w-[88%] mx-auto">

        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between">
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
            Go Back to Dashboard
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

        {/* TITLE */}
        <h1 className="mt-10 text-[42px] 2xl:text-[56px] font-semibold text-[#2F2F2F]">
          Assigned Farmlands
        </h1>

        {/* HERO CARD */}
        <div
          className="
            mt-8
            relative
            rounded-[40px]
            overflow-hidden
            h-[420px]
            2xl:h-[560px]
            shadow-md
          "
        >
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="assigned farmland hero"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

          <div className="absolute left-14 bottom-14">
            <div className="bg-[#B4A56A] text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider w-fit">
              REQUESTED INFORMATION
            </div>

            <h1 className="mt-5 text-white text-[56px] 2xl:text-[75px] font-semibold leading-tight">
              {farmName}
            </h1>

            <p className="text-white text-[20px] mt-2 flex items-center gap-1.5 opacity-90">
              <span>📍</span> West Godavari, AP
            </p>
          </div>

          <div
            className="
              absolute
              right-14
              bottom-14
              bg-white
              rounded-[24px]
              px-10 py-8
              shadow-lg
              backdrop-blur-sm
              bg-white/95
            "
          >
            <p className="text-[#9CA3AF] text-[13px] font-bold uppercase tracking-wider">
              Total Valuation
            </p>

            <h1 className="text-[44px] 2xl:text-[58px] font-bold text-[#2F2F2F] mt-1">
              25 lakhs
            </h1>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          {/* LEFT: ASSET DETAILS */}
          <div className="bg-white rounded-[36px] 2xl:rounded-[48px] p-10 2xl:p-14 shadow-sm border border-gray-100/50">
            <h2 className="text-[28px] 2xl:text-[37px] font-bold text-[#1A1C1D]">
              Asset Details
            </h2>

            <div className="mt-10">
              <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">FARMLAND ID</p>
              <h3 className="text-[22px] font-semibold text-[#374151] mt-1">{id || "GLCSOS 01"}</h3>
            </div>

            <div className="mt-10">
              <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">ASSIGNED AGENT</p>

              <div className="flex items-center gap-3.5 mt-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  alt="Ravi Kumar"
                />

                <p className="text-[18px] font-medium text-[#374151]">Ravi Kumar</p>
              </div>
            </div>

            <div className="flex gap-20 mt-12">
              <div>
                <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                  CREATION TIME
                </p>

                <p className="mt-2 text-[18px] font-medium text-[#374151]">
                  6th Oct, 12:53 PM
                </p>
              </div>

              <div>
                <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                  LAST UPDATED
                </p>

                <p className="mt-2 text-[18px] font-medium text-[#374151]">
                  8th Oct, 09:15 AM
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CURRENT STATUS */}
          <div className="bg-white rounded-[36px] 2xl:rounded-[48px] p-10 2xl:p-14 shadow-sm border border-gray-100/50 flex flex-col justify-between">
            <div>
              <h2 className="text-[28px] 2xl:text-[37px] font-bold text-[#1A1C1D]">
                Current Status
              </h2>

              <div className="mt-10 space-y-6">

                <div className="bg-[#F7F7F7] rounded-[24px] p-8">
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                    SYSTEM STATUS
                  </p>

                  <h3 className="text-[24px] font-semibold text-[#10B981] mt-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    Active
                  </h3>
                </div>

                <div className="bg-[#F7F7F7] rounded-[24px] p-8">
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                    LIVE STATUS
                  </p>

                  <h3 className="text-[24px] font-semibold text-[#6B7280] mt-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                    NA
                  </h3>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-6 mt-12">
          <button 
            onClick={() => navigate(-1)}
            className="text-[#6B7280] hover:text-[#1F2937] text-[18px] font-semibold transition-colors cursor-pointer"
          >
            BACK
          </button>

          <button
            onClick={() =>
              navigate(`/field-officer/farmland-workflow/${id || "1"}`)
            }
            className="
              bg-[#8DCCFF]
              hover:bg-[#72beff]
              px-14 py-4.5
              rounded-full
              text-white
              text-[18px]
              font-bold
              shadow-md
              hover:shadow-lg
              transition-all
              cursor-pointer
            "
          >
            UPLOAD
          </button>
        </div>

      </div>
    </div>
  );
};

export default AssignedFarmlandPage;
