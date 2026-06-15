import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cropFieldBanner from "@/assets/crop-field-banner.png";
import profileImg from "@/assets/profile.svg";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="w-full max-w-[1244px] mx-auto px-4 md:px-0 flex flex-col gap-6 font-plus-jakarta pb-16">
      
      {/* Go Back to Dashboard Button */}
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/verification-officer-1/dashboard")}
          className="h-11 px-6 bg-white border border-[#EBEBEB] rounded-full text-[#1A1C1D] hover:bg-gray-50 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Go Back to Dashboard
        </button>
      </div>

      {/* Main Profile Container */}
      <div className="w-full bg-white border border-[#EBEBEB] rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col gap-8 shadow-sm">
        
        {/* Banner Section */}
        <div className="relative w-full rounded-[24px] overflow-hidden border border-[#EBEBEB]">
          <img
            src={cropFieldBanner}
            alt="Terraced Crops Field Cover"
            className="w-full h-[180px] object-cover"
          />
          
          {/* Banner User Info Overlay Panel */}
          <div className="bg-white px-6 py-4 md:py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-t border-[#EBEBEB]">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative">
              
              {/* Profile Avatar overlapping cover */}
              <div className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border-[6px] border-[#F59E0B] overflow-hidden shadow-md -mt-[70px] sm:-mt-[80px] bg-white">
                <img
                  src={profileImg}
                  alt="Suresh Pashyam"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col">
                <h2 className="font-extrabold text-[22px] md:text-[24px] text-[#1A1C1D]">
                  Suresh Pashyam
                </h2>
                <p className="font-semibold text-sm text-[#5D6B6B]">
                  Verification Officer
                </p>
              </div>
            </div>
            
            {/* Verified Badge */}
            <div className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#EBF5FF] text-[#2780C4]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#2780C4]"
              >
                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.52l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.7L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="flex flex-col gap-6">
          <h3 className="font-extrabold text-[20px] text-[#1A1C1D]">
            Personal details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                First name
              </label>
              <input
                type="text"
                value="Suresh"
                readOnly
                className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] px-4 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                Last name
              </label>
              <input
                type="text"
                value="Pashyam"
                readOnly
                className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] px-4 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                Date Of Birth
              </label>
              <input
                type="text"
                value="05/05/1994"
                readOnly
                className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] px-4 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                Phone number
              </label>
              <input
                type="text"
                value="+91 887284 2888"
                readOnly
                className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] px-4 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                Email
              </label>
              <input
                type="email"
                value="sureshpashyam@gmail.com"
                readOnly
                className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] px-4 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#5D6B6B] tracking-wide">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type="password"
                  value="xxxxxxxxxxxx"
                  readOnly
                  className="w-full h-12 bg-white border border-[#EBEBEB] rounded-[16px] pl-4 pr-12 font-semibold text-sm text-[#1A1C1D] outline-none cursor-default"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D6B6B] hover:text-[#1A1C1D] border-none bg-transparent cursor-pointer flex items-center justify-center p-1"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Alerts Section */}
        <div className="flex flex-col gap-4 border-t border-[#EBEBEB] pt-6">
          <h3 className="font-extrabold text-[20px] text-[#1A1C1D]">
            Alerts
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#1A1C1D]">
                Notifications
              </span>
              <span className="text-xs text-[#5D6B6B]">
                Receive updates via Notifications
              </span>
            </div>
            
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-200 border-none cursor-pointer flex items-center ${
                notificationsEnabled ? 'bg-[#10B981]' : 'bg-[#EBEBEB]'
              }`}
            >
              <div
                className={`w-[20px] h-[20px] rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                  notificationsEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="flex items-center justify-between border-t border-[#EBEBEB] pt-6">
          <span className="font-bold text-[#1A1C1D]">
            Want to logout?
          </span>
          <button
            onClick={() => navigate("/verification-officer-1/login")}
            className="bg-[#FFF5F5] hover:bg-[#FFEAEB] text-[#EF4646] font-bold px-6 py-2.5 rounded-full flex items-center gap-2 border-none cursor-pointer transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
