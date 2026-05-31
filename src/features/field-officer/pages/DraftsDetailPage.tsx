import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DraftsDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Normalize farmland name/ID for display
  const farmIdDisplay = id ? `FL-IN-${id}` : "FL-IN-8472";

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

        {/* MAIN DRAFT PANEL CARD */}
        <div className="w-full mx-auto bg-white rounded-[40px] 2xl:rounded-[53px] p-6 2xl:p-8 shadow-md border border-gray-100/50">
          
          {/* HERO CARD IMAGE CONTAINER */}
          <div
            className="
              relative
              rounded-[32px]
              2xl:rounded-[42px]
              overflow-hidden
              h-[420px]
              2xl:h-[560px]
              shadow-inner
            "
          >
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80"
              className="w-full h-full object-cover"
              alt="draft farmland hero"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

            <div className="absolute left-10 bottom-10">
              <div className="bg-[#B4A56A] text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wider w-fit">
                MARKED FOR DRAFT
              </div>

              <h1 className="mt-4 text-white text-[48px] 2xl:text-[64px] font-bold leading-tight">
                Girish Valley Estate
              </h1>

              <p className="text-white text-[18px] 2xl:text-[24px] mt-2 flex items-center gap-1.5 opacity-90">
                <span>📍</span> Vizag, AP
              </p>
            </div>

            <div
              className="
                absolute
                right-10
                bottom-10
                bg-white
                rounded-[24px]
                px-8 py-6
                shadow-lg
                backdrop-blur-sm
                bg-white/95
              "
            >
              <p className="text-[#9CA3AF] text-[12px] font-bold uppercase tracking-wider">
                Total Valuation
              </p>

              <h1 className="text-[36px] 2xl:text-[48px] font-bold text-[#2F2F2F] mt-1">
                45 lakhs
              </h1>
            </div>
          </div>

          {/* DRAFT ASSET METRICS */}
          <div className="px-6 py-10 2xl:px-8 2xl:py-14">
            
            {/* Asset Details Header */}
            <div className="flex items-center gap-2.5 text-[22px] 2xl:text-[29px] font-bold text-[#00696B] mb-8">
              <span>ℹ️</span>
              <h2>Asset Details</h2>
            </div>

            {/* Metrics Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
              
              {/* COL 1: ID & Creation */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">FARMLAND ID</p>
                  <h3 className="text-[20px] font-semibold text-[#374151] mt-1.5">{farmIdDisplay}</h3>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">CREATION TIME</p>
                  <h3 className="text-[20px] font-semibold text-[#374151] mt-1.5">6th Oct, 12:53 PM</h3>
                </div>
              </div>

              {/* COL 2: Agent & Last Update */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">ASSIGNED AGENT</p>
                  <div className="flex items-center gap-3.5 mt-2">
                    <span className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold flex items-center justify-center text-sm border border-[#BAE6FD]">
                      R
                    </span>
                    <p className="text-[20px] font-semibold text-[#374151]">Ram</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">LAST UPDATED</p>
                  <h3 className="text-[20px] font-semibold text-[#374151] mt-1.5">8th Oct, 09:15 AM</h3>
                </div>
              </div>

              {/* COL 3: System Status & Live Status */}
              <div className="flex flex-col gap-8 border-l border-gray-100 pl-8">
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">SYSTEM STATUS</p>
                  <span className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-4 py-1.5 rounded-full text-[14px] font-bold">
                    Draft
                  </span>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">LIVE STATUS</p>
                  <span className="bg-gray-100 text-[#4B5563] px-4 py-1.5 rounded-full text-[14px] font-bold flex items-center gap-1.5 w-fit">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    NA
                  </span>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-6 mt-12 pt-6 border-t border-gray-50">
              <button 
                onClick={() => navigate(-1)}
                className="text-[#4B5563] hover:text-[#1F2937] text-[16px] 2xl:text-[21px] font-bold transition-colors cursor-pointer mr-4"
              >
                EDIT
              </button>

              <button
                onClick={() => navigate(-1)}
                className="
                  bg-[#96C9ED]
                  hover:bg-[#83badd]
                  px-12 py-3.5
                  rounded-full
                  text-black
                  text-[16px]
                  2xl:text-[21px]
                  font-bold
                  shadow-sm
                  transition-all
                  cursor-pointer
                  uppercase
                "
              >
                DELETE
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
