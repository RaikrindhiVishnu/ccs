import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { requestInfoData } from "../data/requestInfoData";
import ReturningReasonModal from "../components/request-info/ReturningReasonModal";

const RequestInfoDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  // Find request item in mock data
  const requestItem = requestInfoData.find((item) => item.id === Number(id)) || requestInfoData[0];

  // Map farmlandId to estate name and background image
  const farmInfo = {
    name: requestItem.farmlandId === "GLCSOS 01" || requestItem.farmlandId === "GLCSOS 02" 
      ? "Girish Valley Estate" 
      : "Srinivasa Valley Farms",
    location: requestItem.farmlandId === "GLCSOS 01" || requestItem.farmlandId === "GLCSOS 02"
      ? "Vizag, AP"
      : "West Godavari, AP",
    image: requestItem.farmlandId === "GLCSOS 01" || requestItem.farmlandId === "GLCSOS 02"
      ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    valuation: requestItem.amount,
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
            Go Back to Dashboard
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

        {/* MAIN PANEL CARD */}
        <div className="w-full bg-white rounded-[40px] 2xl:rounded-[53px] p-6 2xl:p-9 shadow-md border border-gray-100/50">
          
          {/* HERO CARD IMAGE CONTAINER */}
          <div
            className="
              relative
              rounded-[32px]
              2xl:rounded-[42px]
              overflow-hidden
              h-[380px]
              2xl:h-[500px]
              shadow-inner
            "
          >
            <img
              src={farmInfo.image}
              className="w-full h-full object-cover"
              alt="farmland hero"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

            <div className="absolute left-10 bottom-10 2xl:left-14 2xl:bottom-14">
              <div className="bg-white/40 text-black px-4 py-1.5 rounded-full text-[11px] 2xl:text-[14px] font-bold tracking-wider w-fit backdrop-blur-sm uppercase">
                Requested Info
              </div>

              <h1 className="mt-4 text-white text-[42px] 2xl:text-[56px] font-bold leading-tight font-plus-jakarta">
                {farmInfo.name}
              </h1>

              <p className="text-white text-[16px] 2xl:text-[21px] mt-2 flex items-center gap-1.5 opacity-90 font-medium">
                <span>📍</span> {farmInfo.location}
              </p>
            </div>

            <div
              className="
                absolute
                right-10
                bottom-10
                2xl:right-14
                2xl:bottom-14
                bg-white
                rounded-[24px]
                2xl:rounded-[32px]
                px-8 py-6
                2xl:px-11 2xl:py-8
                shadow-lg
                backdrop-blur-sm
                bg-white/95
              "
            >
              <p className="text-[#9CA3AF] text-[12px] 2xl:text-[16px] font-extrabold uppercase tracking-wider font-plus-jakarta">
                Total Valuation
              </p>

              <h1 className="text-[36px] 2xl:text-[48px] font-bold text-[#1A1C1D] mt-1 font-plus-jakarta">
                {farmInfo.valuation}
              </h1>
            </div>
          </div>

          {/* DRAFT ASSET METRICS */}
          <div className="px-6 py-10 2xl:px-10 2xl:py-14">
            
            {/* Asset Details Header */}
            <div className="flex items-center gap-2.5 text-[22px] 2xl:text-[29px] font-bold text-[#00696B] mb-8">
              <svg className="w-6 h-6 2xl:w-8 2xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="font-plus-jakarta">Asset Details</h2>
            </div>

            {/* Metrics Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12 2xl:gap-x-16">
              
              {/* COL 1: ID & Creation */}
              <div className="flex flex-col gap-8 2xl:gap-11">
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta">FARMLAND ID</p>
                  <h3 className="text-[20px] 2xl:text-[26px] font-bold text-[#3D4949] mt-1.5 font-plus-jakarta">{requestItem.farmlandId}</h3>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta">CREATION TIME</p>
                  <h3 className="text-[20px] 2xl:text-[26px] font-bold text-[#3D4949] mt-1.5 font-plus-jakarta">{requestItem.createdTime}</h3>
                </div>
              </div>

              {/* COL 2: Agent & Last Update */}
              <div className="flex flex-col gap-8 2xl:gap-11">
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta">ASSIGNED AGENT</p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold flex items-center justify-center text-sm 2xl:text-lg border border-[#BAE6FD]">
                      {requestItem.agentName.charAt(0)}
                    </span>
                    <p className="text-[20px] 2xl:text-[26px] font-bold text-[#3D4949] font-plus-jakarta">{requestItem.agentName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta">LAST UPDATED</p>
                  <h3 className="text-[20px] 2xl:text-[26px] font-bold text-[#3D4949] mt-1.5 font-plus-jakarta">8th Oct, 09:15 AM</h3>
                </div>
              </div>

              {/* COL 3: System Status & Live Status */}
              <div className="flex flex-col gap-8 2xl:gap-11 border-l border-gray-100 pl-8 2xl:pl-12">
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta mb-2.5">SYSTEM STATUS</p>
                  <span className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] px-4 py-1.5 rounded-full text-[14px] 2xl:text-[18px] font-bold uppercase font-plus-jakarta">
                    {requestItem.status}
                  </span>
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-[11px] 2xl:text-[15px] font-bold uppercase tracking-wider font-plus-jakarta mb-2.5">LIVE STATUS</p>
                  <span className="bg-gray-100 text-[#4B5563] px-4 py-1.5 rounded-full text-[14px] 2xl:text-[18px] font-bold flex items-center gap-2 w-fit font-plus-jakarta">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                    NA
                  </span>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-6 mt-12 pt-6 border-t border-gray-100">
              <button 
                onClick={() => navigate(`/field-officer/land-documents/${requestItem.id}`)}
                className="text-[#3D4949] hover:text-black text-[14px] 2xl:text-[18px] font-bold transition-colors cursor-pointer mr-4 uppercase tracking-wider hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="
                  bg-[#96C9ED]
                  hover:bg-[#83badd]
                  px-12 py-3.5
                  2xl:px-16 2xl:py-4.5
                  rounded-full
                  text-black
                  text-[14px]
                  2xl:text-[18px]
                  font-bold
                  shadow-sm
                  transition-all
                  cursor-pointer
                  uppercase
                  tracking-wider
                "
              >
                View
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Returning Reason Modal Popup */}
      {showModal && (
        <ReturningReasonModal 
          onClose={() => setShowModal(false)} 
          returnedBy={`Verification Officer Sravan`}
        />
      )}
    </div>
  );
};

export default RequestInfoDetailsPage;
