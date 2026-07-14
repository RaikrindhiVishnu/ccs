import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ALERTS_DATA } from "../data/alertsData";

const FarmlandAlertDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find corresponding alert item in mock data
  const alertItem = ALERTS_DATA.find((item) => item.alertId === id) || ALERTS_DATA[0];

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8 flex flex-col items-center justify-center">
      <div className="w-[92%] 2xl:w-[88%] mx-auto flex flex-col items-center">
        
        {/* Back Button Row */}
        <div className="w-full max-w-[1053px] 2xl:max-w-[1400px] 3xl:max-w-[1872px] mb-6 flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="
              bg-white
              rounded-full
              px-6 py-3
              2xl:px-8 2xl:py-4
              3xl:px-11 3xl:py-6
              flex items-center gap-2
              border border-[#E5E7EB]
              text-[#374151]
              font-semibold
              shadow-sm
              hover:bg-gray-50
              transition-colors
              cursor-pointer
              text-[14px] 2xl:text-[18px] 3xl:text-[23px]
              font-plus-jakarta
            "
          >
            <ArrowLeft className="w-4 h-4 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8" />
            Go back to dashboard
          </button>
        </div>

        {/* Detailed Form Card */}
        <div
          className="
            w-full bg-white border border-gray-100 rounded-[32px] 2xl:rounded-[42px] 3xl:rounded-[56px]
            p-10 2xl:p-14 3xl:p-20 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.03)]
            max-w-[1053px] min-h-[801px]
            2xl:max-w-[1400px] 2xl:min-h-[1066px]
            3xl:max-w-[1872px] 3xl:min-h-[1424px]
          "
        >
          {/* Header Block */}
          <div className="flex justify-between items-center pb-8 border-b border-gray-100">
            <div className="flex items-center gap-4 2xl:gap-6 3xl:gap-8">
              <img
                src={alertItem.avatar}
                className="w-16 h-16 2xl:w-22 2xl:h-22 3xl:w-28 3xl:h-28 rounded-full object-cover border-2 border-white shadow-sm"
                alt={alertItem.agent}
              />
              <h2 className="text-[24px] 2xl:text-[32px] 3xl:text-[42px] font-extrabold text-[#1A1C1D] font-plus-jakarta">
                {alertItem.agent}
              </h2>
            </div>
            
            <div className="text-[16px] 2xl:text-[21px] 3xl:text-[28px] font-medium text-gray-500 font-plus-jakarta">
              Sub ID: <span className="font-extrabold text-[#1A1C1D] ml-1">{alertItem.submissionId}</span>
            </div>
          </div>

          {/* Form Fields and Location Content */}
          <div className="flex-1 flex flex-col justify-start my-8 2xl:my-11 3xl:my-14">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 2xl:gap-x-12 2xl:gap-y-8 3xl:gap-x-16 3xl:gap-y-12">
              
              {/* First Name */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  First Name
                </label>
                <div className="bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  {alertItem.firstName}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Last Name
                </label>
                <div className="bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  {alertItem.lastName}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Phone Number
                </label>
                <div className="flex items-center gap-3.5 bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  <svg className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{alertItem.phone}</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Email
                </label>
                <div className="flex items-center gap-3.5 bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  <svg className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{alertItem.email}</span>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Date of Birth
                </label>
                <div className="flex items-center gap-3.5 bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  <svg className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{alertItem.dob}</span>
                </div>
              </div>

              {/* Religion */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Religion
                </label>
                <div className="bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  {alertItem.religion}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[13px] 2xl:text-[17px] 3xl:text-[22px] font-extrabold text-[#3D4949] uppercase tracking-wide mb-2.5 font-plus-jakarta">
                  Gender
                </label>
                <div className="bg-[#F3F4F6]/70 border border-transparent rounded-2xl px-6 py-4 2xl:px-8 2xl:py-5.5 3xl:px-11 3xl:py-7 text-[15px] 2xl:text-[20px] 3xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
                  {alertItem.gender}
                </div>
              </div>

            </div>

            {/* Google Location Link (directly below fields, left aligned) */}
            <div className="text-[14px] 2xl:text-[18px] 3xl:text-[24px] font-extrabold text-[#1A1C1D] font-plus-jakarta mt-8 2xl:mt-11 3xl:mt-14">
              Google Location of Land
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${alertItem.googleLocation}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#0284C7] underline ml-2 font-bold hover:text-[#0369a1] transition-colors"
              >
                {alertItem.googleLocation}
              </a>
            </div>
          </div>

          {/* Footer Actions (aligned bottom right, no border top line) */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate(-1)}
              className="
                text-[#3D4949] hover:text-black 
                text-[13px] 2xl:text-[17px] 3xl:text-[22px] 
                font-extrabold mr-8 uppercase cursor-pointer hover:underline tracking-wider font-plus-jakarta
              "
            >
              Dismiss
            </button>

            <button
              onClick={() => navigate(`/field-officer/farmland-workflow/${alertItem.farmlandId}`)}
              className="
                bg-[#96C9ED] hover:bg-[#83badd] 
                text-black font-extrabold 
                px-12 py-3.5 2xl:px-16 2xl:py-4.5 3xl:px-22 3xl:py-6
                rounded-full text-[12px] 2xl:text-[16px] 3xl:text-[21px] 
                cursor-pointer transition-all uppercase tracking-wider shadow-sm font-plus-jakarta
              "
            >
              Create
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmlandAlertDetailsPage;
