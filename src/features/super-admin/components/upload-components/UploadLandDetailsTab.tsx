import React from "react";

interface UploadLandDetailsTabProps {
  setActiveTab: (tab: "owner" | "family" | "land") => void;
  onNextClick: () => void;
}

export const UploadLandDetailsTab: React.FC<UploadLandDetailsTabProps> = ({
  setActiveTab,
  onNextClick,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-[clamp(0.5rem,1.5vw,2rem)] w-full animate-in fade-in duration-300">
      
      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.5rem,1.04vw,0.9375rem)] tracking-[0.7px] text-[#5A5C5E] uppercase text-center mb-[clamp(0.8rem,1.67vw,1.5rem)]">
        Farmland Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-[clamp(1rem,3.33vw,3rem)] items-center justify-center w-full mb-[clamp(1rem,2.22vw,2rem)]">
        
        {/* Left Column */}
        <div className="flex flex-col gap-[clamp(1rem,2.22vw,2rem)] text-left md:text-right w-full">
          {/* State */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              State
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.6rem,1.25vw,1.125rem)] text-[#9BB424]">
              Andhra Pradesh
            </span>
          </div>
          
          {/* District */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              District
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.6rem,1.25vw,1.125rem)] text-[#9BB424]">
              West Godavari
            </span>
          </div>

          {/* Area/City/Town */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              Area/City/Town
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.6rem,1.25vw,1.125rem)] text-[#9BB424]">
              Thanuku
            </span>
          </div>
        </div>

        {/* Middle Column: Aerial Image */}
        <div className="relative w-full max-w-[clamp(13.9rem,28.96vw,26.0625rem)] aspect-[417/306] rounded-[clamp(0.96rem,2.01vw,1.8125rem)] overflow-hidden border-[0.65px] border-white/50 shadow-[0px_0px_39px_rgba(0,0,0,0.05)] bg-[#F1F5F9] shrink-0 mx-auto">
          <img 
            src="/super-admin/images/farmland1.png" 
            alt="Farmland Aerial View" 
            className="w-full h-full object-cover animate-in fade-in duration-300" 
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[clamp(1rem,2.22vw,2rem)] text-left w-full">
          {/* Land Conversion */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              Land Conversion
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.6rem,1.25vw,1.125rem)] text-[#9BB424]">
              Acres
            </span>
          </div>

          {/* Value for Area */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              Value for Area
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.53rem,1.11vw,1.0rem)] text-[#9BB424]">
              1,00,000.00
            </span>
          </div>

          {/* Acquisition Category */}
          <div className="flex flex-col gap-[clamp(0.125rem,0.28vw,0.25rem)] w-full">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[1.1px] text-[#8A96A3] uppercase">
              Acquisition Category
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.6rem,1.25vw,1.125rem)] text-[#9BB424]">
              Ancestral Property
            </span>
          </div>
        </div>

      </div>

      {/* Bottom section: Geo Reference & Map Reference Preview */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-[clamp(1rem,2.22vw,2rem)] mt-auto mb-[clamp(0.8rem,1.67vw,1.5rem)]">
        
        {/* Geo Reference Details */}
        <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] text-left w-full md:w-auto">
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.4rem,0.83vw,0.75rem)] tracking-[0.55px] text-[#9AA3AD] uppercase">
            Geo Reference
          </span>
          <h4 className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.8rem,1.67vw,1.5rem)] text-[#5A5C5E] leading-tight tracking-[-0.56px]">
            N 38.2975° &nbsp; W 122.2869°
          </h4>
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.47rem,0.97vw,0.875rem)] text-[#9AA3AD] leading-[18px]">
            GRID: 84T-QK &nbsp;•&nbsp; ELEV: 12m
          </span>
        </div>

        {/* Map Reference card */}
        <div className="box-sizing-border-box w-full max-w-[clamp(8rem,16.67vw,15.0rem)] h-[clamp(4rem,8.33vw,7.5rem)] bg-[#F2F4F6] border border-[rgba(0,0,0,0.08)] rounded-[clamp(0.77rem,1.6vw,1.4375rem)] overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
          <img 
            src="/super-admin/images/map_confirmed_boundary.png" 
            alt="Map Reference" 
            className="w-full h-full object-cover" 
          />
        </div>

      </div>

      {/* Navigation Buttons Row */}
      <div className="flex flex-row justify-end items-center gap-[clamp(1rem,2.08vw,1.875rem)] pt-[clamp(0.8rem,1.67vw,1.5rem)] border-t border-gray-100 w-full mt-[clamp(0.8rem,1.67vw,1.5rem)]">
        <button
          type="button"
          onClick={() => setActiveTab("family")}
          className="font-['Plus_Jakarta_Sans'] font-medium text-black hover:opacity-75 uppercase cursor-pointer tracking-wider text-[clamp(0.47rem,0.97vw,0.875rem)]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNextClick}
          className="flex items-center justify-center text-white rounded-[57px] shadow-lg hover:scale-105 active:scale-95 cursor-pointer font-['Plus_Jakarta_Sans'] font-normal w-[clamp(3.33rem,6.94vw,6.25rem)] h-[clamp(1.56rem,3.26vw,2.9375rem)]"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
          }}
        >
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-white text-[clamp(0.6rem,1.25vw,1.125rem)]">
            Next
          </span>
        </button>
      </div>

    </div>
  );
};
