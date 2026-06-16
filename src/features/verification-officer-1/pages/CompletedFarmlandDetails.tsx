import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MapPin, Check, Globe } from 'lucide-react';

import { DETAILS_MAPPING } from '../data/completedMockData';

export const CompletedFarmlandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Normalize id for matching
  const lookupKey = id ? decodeURIComponent(id) : "GLC SOS 02";
  const selectedFarmland = DETAILS_MAPPING[lookupKey] || DETAILS_MAPPING["GLC SOS 02"];

  const handleBack = () => {
    navigate('/verification-officer-1/completed-farmland');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFA] w-full flex items-center justify-center p-4 md:p-8 font-plus-jakarta">
      <style>{`
        /* Default Responsive Layout Styles */
        .details-container {
          width: 100%;
          max-width: 1244px;
          height: auto;
          background-color: transparent;
          box-sizing: border-box;
          padding: 24px 0px;
        }
        .details-banner {
          height: 280px;
          margin-bottom: 24px;
        }
        .details-card {
          min-height: 260px;
          padding: 24px;
        }
        .banner-overlay-padding {
          padding: 24px;
        }
        .avatar-gap-agent {
          gap: 8px;
        }
        .details-grid-gap {
          gap: 16px;
        }
        .gap-scale-grid {
          gap: 24px;
        }
        .margin-scale-title {
          margin-bottom: 20px;
        }
        .done-btn {
          padding: 0 24px;
          height: 38px;
          font-size: 11px;
        }

        /* 1440px Screen Resolution Specification */
        @media (min-width: 1440px) {
          .details-container {
            width: 1280px !important;
            height: 1210px !important;
            max-width: 1280px !important;
            padding: 0px !important;
          }
          .details-banner {
            height: 350px !important;
            margin-bottom: 32px !important;
          }
          .details-card {
            height: 450px !important;
            padding: 32px !important;
          }
          .banner-overlay-padding {
            padding: 32px !important;
          }
          .avatar-gap-agent {
            gap: 10px !important;
          }
          .details-grid-gap {
            gap: 24px !important;
          }
          .gap-scale-grid {
            gap: 32px !important;
          }
          .margin-scale-title {
            margin-bottom: 24px !important;
          }

          /* Text scale rules */
          .text-scale-title { font-size: 24px !important; }
          .text-scale-subtitle { font-size: 18px !important; }
          .text-scale-label { font-size: 10px !important; }
          .text-scale-value { font-size: 14px !important; }
          .text-scale-banner-title { font-size: 32px !important; }
          .text-scale-banner-val { font-size: 24px !important; }

          /* Icon / Avatar scale rules */
          .icon-scale-lg { width: 20px !important; height: 20px !important; }
          .icon-scale-md { width: 14px !important; height: 14px !important; }
          .avatar-scale-md { width: 32px !important; height: 32px !important; }
          .avatar-scale-lg { width: 52px !important; height: 52px !important; }

          /* Header Button scale rules */
          .header-btn {
            padding: 10px 20px !important;
          }
          .done-btn {
            padding: 0 44px !important;
            height: 44px !important;
            font-size: 12px !important;
          }

          /* Status containers */
          .status-box {
            padding: 18px 24px !important;
            border-radius: 20px !important;
          }
          .status-icon-container {
            width: 32px !important;
            height: 32px !important;
          }
          .valuation-box {
            padding: 16px 24px !important;
            border-radius: 20px !important;
            min-width: 160px !important;
          }
          .completed-tag {
            padding: 4px 12px !important;
            border-radius: 14px !important;
            font-size: 9px !important;
          }
        }

        /* 1920px Screen Resolution Specification (Proportionally Scaled from 1440) */
        @media (min-width: 1920px) {
          .details-container {
            width: 1707px !important;
            height: 1613px !important;
            max-width: 1707px !important;
            padding: 0px !important;
          }
          .details-banner {
            height: 466px !important;
            margin-bottom: 42px !important;
          }
          .details-card {
            height: 600px !important;
            padding: 42px !important;
          }
          .banner-overlay-padding {
            padding: 42px !important;
          }
          .avatar-gap-agent {
            gap: 14px !important;
          }
          .details-grid-gap {
            gap: 32px !important;
          }
          .gap-scale-grid {
            gap: 42px !important;
          }
          .margin-scale-title {
            margin-bottom: 32px !important;
          }

          /* Text scale rules */
          .text-scale-title { font-size: 32px !important; }
          .text-scale-subtitle { font-size: 24px !important; }
          .text-scale-label { font-size: 13px !important; }
          .text-scale-value { font-size: 18px !important; }
          .text-scale-banner-title { font-size: 42px !important; }
          .text-scale-banner-val { font-size: 32px !important; }

          /* Icon / Avatar scale rules */
          .icon-scale-lg { width: 28px !important; height: 28px !important; }
          .icon-scale-md { width: 20px !important; height: 20px !important; }
          .avatar-scale-md { width: 42px !important; height: 42px !important; }
          .avatar-scale-lg { width: 72px !important; height: 72px !important; }

          /* Header Button scale rules */
          .header-btn {
            padding: 14px 28px !important;
          }
          .done-btn {
            padding: 0 60px !important;
            height: 58px !important;
            font-size: 16px !important;
          }

          /* Status containers */
          .status-box {
            padding: 24px 32px !important;
            border-radius: 28px !important;
          }
          .status-icon-container {
            width: 42px !important;
            height: 42px !important;
          }
          .valuation-box {
            padding: 22px 32px !important;
            border-radius: 28px !important;
            min-width: 220px !important;
          }
          .completed-tag {
            padding: 6px 18px !important;
            border-radius: 28px !important;
            font-size: 12px !important;
          }
        }

        /* 2560px Screen Resolution Specification (Proportionally Scaled from 1440) */
        @media (min-width: 2560px) {
          .details-container {
            width: 2276px !important;
            height: 2151px !important;
            max-width: 2276px !important;
            padding: 0px !important;
          }
          .details-banner {
            height: 622px !important;
            margin-bottom: 56px !important;
          }
          .details-card {
            height: 800px !important;
            padding: 56px !important;
          }
          .banner-overlay-padding {
            padding: 56px !important;
          }
          .avatar-gap-agent {
            gap: 20px !important;
          }
          .details-grid-gap {
            gap: 42px !important;
          }
          .gap-scale-grid {
            gap: 56px !important;
          }
          .margin-scale-title {
            margin-bottom: 42px !important;
          }

          /* Text scale rules */
          .text-scale-title { font-size: 42px !important; }
          .text-scale-subtitle { font-size: 32px !important; }
          .text-scale-label { font-size: 18px !important; }
          .text-scale-value { font-size: 24px !important; }
          .text-scale-banner-title { font-size: 56px !important; }
          .text-scale-banner-val { font-size: 42px !important; }

          /* Icon / Avatar scale rules */
          .icon-scale-lg { width: 38px !important; height: 38px !important; }
          .icon-scale-md { width: 28px !important; height: 28px !important; }
          .avatar-scale-md { width: 56px !important; height: 56px !important; }
          .avatar-scale-lg { width: 96px !important; height: 96px !important; }

          /* Header Button scale rules */
          .header-btn {
            padding: 20px 38px !important;
          }
          .done-btn {
            padding: 0 80px !important;
            height: 78px !important;
            font-size: 22px !important;
          }

          /* Status containers */
          .status-box {
            padding: 32px 42px !important;
            border-radius: 36px !important;
          }
          .status-icon-container {
            width: 56px !important;
            height: 56px !important;
          }
          .valuation-box {
            padding: 30px 42px !important;
            border-radius: 36px !important;
            min-width: 300px !important;
          }
          .completed-tag {
            padding: 8px 24px !important;
            border-radius: 36px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
      
      <div className="details-container flex flex-col justify-between box-border">
        {/* 1. Top Header Row */}
        <div className="flex items-center justify-between w-full pb-4">
          <button
            onClick={handleBack}
            className="header-btn flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D9DFE0] rounded-full hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="icon-scale-lg w-4 h-4 text-[#353535] shrink-0" />
            <span className="text-scale-value font-plus-jakarta font-bold text-xs text-[#353535]">
              Go Back to Dashboard
            </span>
          </button>

          {/* Notifications and Profile */}
          <div className="flex items-center gap-3">
            <button className="avatar-scale-lg w-[52px] h-[52px] rounded-full bg-white border border-[#D9DFE0] flex items-center justify-center relative hover:bg-gray-50 transition-colors cursor-pointer p-0">
              <Bell className="icon-scale-lg w-5 h-5 text-[#2C2C2C]" />
            </button>
            <div className="avatar-scale-lg w-[52px] h-[52px] rounded-full overflow-hidden border border-[#D9DFE0] cursor-pointer" onClick={() => navigate('/verification-officer-1/profile')}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. Page Title */}
        <div className="margin-scale-title">
          <h1 className="text-scale-title font-plus-jakarta font-extrabold text-[24px] text-[#1E1E1E]">
            Completed Farmlands
          </h1>
        </div>

        {/* 3. Hero Agricultural Banner */}
        <div className="details-banner relative w-full rounded-[32px] overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"
            alt="Completed Estate"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark to transparent horizontal gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          {/* Content Overlays */}
          <div className="absolute inset-0 banner-overlay-padding flex flex-col md:flex-row md:items-end md:justify-between justify-end gap-6 z-10">
            
            {/* Left Details */}
            <div className="flex flex-col gap-2 text-white">
              <div className="completed-tag bg-white/20 border border-white/20 px-3 py-1 rounded-[14px] w-fit">
                <span className="font-bold tracking-wider uppercase text-[#E2E8F0]">
                  COMPLETED
                </span>
              </div>
              <h2 className="text-scale-banner-title font-plus-jakarta font-extrabold text-[32px] leading-tight select-none">
                {selectedFarmland.estateName}
              </h2>
              <div className="flex items-center gap-1 text-white/95 mt-0.5">
                <MapPin className="icon-scale-md w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-scale-value font-bold text-xs">{selectedFarmland.location}</span>
              </div>
            </div>

            {/* Right Valuation Box */}
            <div className="valuation-box bg-white px-6 py-4 rounded-[20px] shadow-lg flex flex-col justify-center self-start md:self-end">
              <span className="text-[#8E9D9D] text-scale-label font-bold uppercase tracking-wider block">
                TOTAL VALUATION
              </span>
              <span className="text-scale-banner-val font-plus-jakarta font-black text-[#1E1E1E] mt-1">
                {selectedFarmland.valuation}
              </span>
            </div>

          </div>
        </div>

        {/* 4. Details Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-scale-grid w-full items-stretch">
          
          {/* Left Side: Asset Details */}
          <div className="details-card bg-white border border-[#E5EAEB] rounded-[28px] flex flex-col justify-between box-border">
            <div>
              <h3 className="text-scale-subtitle font-plus-jakarta font-extrabold text-[#1E1E1E] mb-6">
                Asset Details
              </h3>
              
              {/* Field Agent */}
              <div className="flex flex-col gap-1.5 mb-6">
                <span className="text-scale-label font-plus-jakarta text-[#A0AEC0] uppercase tracking-wider font-bold">
                  ASSIGNED AGENT
                </span>
                <div className="flex items-center avatar-gap-agent">
                  <div className="avatar-scale-md w-7 h-7 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                    <img 
                      src={selectedFarmland.agentAvatar} 
                      alt={selectedFarmland.agentName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-scale-value font-bold text-[#1A1C1D]">{selectedFarmland.agentName}</span>
                </div>
              </div>

              {/* Area and ID row */}
              <div className="grid grid-cols-2 details-grid-gap">
                <div className="flex flex-col gap-1">
                  <span className="text-scale-label font-plus-jakarta text-[#A0AEC0] uppercase tracking-wider font-bold">
                    FARMLAND ID
                  </span>
                  <span className="text-scale-value font-bold text-[#1A1C1D] uppercase">
                    {lookupKey}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-scale-label font-plus-jakarta text-[#A0AEC0] uppercase tracking-wider font-bold">
                    ACRE
                  </span>
                  <span className="text-scale-value font-bold text-[#1A1C1D]">
                    {selectedFarmland.area}
                  </span>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
              <span className="text-scale-label font-plus-jakarta text-[#A0AEC0] uppercase tracking-wider font-bold">
                LAST UPDATED
              </span>
              <span className="text-scale-value font-bold text-[#1A1C1D]">
                {selectedFarmland.lastUpdated}
              </span>
            </div>
          </div>

          {/* Right Side: Current Status */}
          <div className="details-card bg-white border border-[#E5EAEB] rounded-[28px] flex flex-col justify-between box-border">
            <div>
              <h3 className="text-scale-subtitle font-plus-jakarta font-extrabold text-[#1E1E1E] mb-6">
                Current Status
              </h3>

              <div className="flex flex-col gap-4">
                {/* System Status Box */}
                <div className="status-box flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] px-6 py-4.5 rounded-[20px] box-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#8E9D9D] text-scale-label font-bold uppercase tracking-wider">
                      SYSTEM STATUS
                    </span>
                    <span className="text-scale-value font-extrabold text-[#1A1C1D]">
                      Live
                    </span>
                  </div>
                  <div className="status-icon-container w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 shrink-0 bg-white">
                    <Check className="icon-scale-lg stroke-[3]" />
                  </div>
                </div>

                {/* Live Status Box */}
                <div className="status-box flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] px-6 py-4.5 rounded-[20px] box-border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#8E9D9D] text-scale-label font-bold uppercase tracking-wider">
                      LIVE STATUS
                    </span>
                    <span className="text-scale-value font-extrabold text-[#1A1C1D]">
                      NA
                    </span>
                  </div>
                  <div className="status-icon-container w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 shrink-0 bg-white">
                    <Globe className="icon-scale-lg stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5. DONE Action Button outside the cards grid */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleBack}
            className="done-btn px-8 bg-[#2780C4] hover:bg-[#2069A1] text-white font-plus-jakarta font-extrabold tracking-wider rounded-full cursor-pointer hover:shadow-md transition-all border-none flex items-center justify-center"
          >
            DONE
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompletedFarmlandDetails;
