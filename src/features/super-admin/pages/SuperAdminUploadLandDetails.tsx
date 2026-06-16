import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import UploadGoBack from "../components/UploadGoBack";
import { ChevronDown } from "lucide-react";

export const SuperAdminUploadLandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isBoundaryConfirmed = searchParams.get("boundaryConfirmed") === "true";
  const targetId = id || "GLCSOS-05";

  // State for interactive toggles & fields
  const [acquisitionCategory, setAcquisitionCategory] = useState<"purchase" | "ancestral">("ancestral");
  const [referredAgent, setReferredAgent] = useState<"default" | "other">("other");
  const [stateVal, setStateVal] = useState("Andhra Pradesh");
  const [districtVal, setDistrictVal] = useState("West Godavari");
  const [areaVal, setAreaVal] = useState("Tanuku");
  const [conversionVal, setConversionVal] = useState("Acres");
  const [valuePerArea, setValuePerArea] = useState("1,00,000.00");

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isBoundaryConfirmed) {
      navigate(`/super-admin/assigned-farmlands/${targetId}/customer-information`);
    } else {
      navigate(`/super-admin/upload/view-maps/${targetId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col justify-start items-center p-[clamp(1.77rem,2.78vw,3.33rem)] font-sans">
      <div 
        className="w-full max-w-[clamp(64rem,90vw,120rem)] flex flex-col gap-[clamp(1rem,2vw,2.5rem)]"
      >
        {/* ── Top Header - Reuses UploadGoBack ── */}
        <div className="flex justify-start w-full">
          <UploadGoBack onClick={handleBack} />
        </div>

        {/* ── Central Card ── */}
        <div className="w-full bg-white shadow-[0px_20px_40px_rgba(0,49,50,0.06)] rounded-[clamp(1.5rem,2.22vw,2rem)] p-[clamp(2.13rem,3.33vw,4rem)] relative flex flex-col gap-[clamp(2.3rem,3.6vw,4.3rem)]">
          {/* Header Title */}
          <div>
            <h2 className="font-['Manrope'] font-bold text-[clamp(1.25rem,1.944vw,2.33rem)] leading-none text-[#1A1C1D]">
              Enter land details
            </h2>
          </div>

          {/* ── Body: Form Controls ── */}
          <div className="flex flex-col gap-[clamp(2.3rem,3.6vw,4.3rem)] w-full">
            
            {/* Row 1: Acquisition Category & Agent Referral stacked vertically */}
            <div className="flex flex-col gap-[clamp(1.5rem,2vw,2.5rem)]">
              
              {/* Acquisition Category Question */}
              <div className="flex flex-col gap-[clamp(0.75rem,1.1vw,1.25rem)]">
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.8rem,1.25vw,1.5rem)] leading-tight text-black">
                  Please indicate the acquisition category for the land.
                </span>
                
                <div className="flex flex-row items-center gap-[clamp(0.75rem,1.8vw,2rem)]">
                  {/* Self Purchase Button */}
                  <button
                    type="button"
                    onClick={() => setAcquisitionCategory("purchase")}
                    className={`flex flex-row justify-center items-center gap-2.5 h-[clamp(2.09rem,2.64vw,3.17rem)] rounded-[33px] border transition-all cursor-pointer select-none ${
                      acquisitionCategory === "purchase"
                        ? "bg-[#2B2D2F] border-[#000000] text-white"
                        : "bg-white border-[rgba(0,0,0,0.26)] text-black hover:bg-gray-50"
                    }`}
                    style={{ width: "clamp(6.6875rem, 10.486vw, 12.5625rem)" }}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        acquisitionCategory === "purchase"
                          ? "bg-[#BDD327] border-white"
                          : "bg-white border-[#BDD327]"
                      }`}
                    />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.62rem,0.97vw,1.16rem)] leading-none whitespace-nowrap">
                      Self Purchase
                    </span>
                  </button>

                  {/* Ancestral Property Button */}
                  <button
                    type="button"
                    onClick={() => setAcquisitionCategory("ancestral")}
                    className={`flex flex-row justify-center items-center gap-2.5 h-[clamp(2.09rem,2.64vw,3.17rem)] rounded-[33px] border transition-all cursor-pointer select-none ${
                      acquisitionCategory === "ancestral"
                        ? "bg-[#2B2D2F] border-[#000000] text-white"
                        : "bg-white border-[rgba(0,0,0,0.26)] text-black hover:bg-gray-50"
                    }`}
                    style={{ width: "clamp(8.1875rem, 12.847vw, 15.416rem)" }}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        acquisitionCategory === "ancestral"
                          ? "bg-[#BDD327] border-white"
                          : "bg-white border-[#BDD327]"
                      }`}
                    />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.62rem,0.97vw,1.16rem)] leading-none whitespace-nowrap">
                      Ancestral Property
                    </span>
                  </button>
                </div>
              </div>

              {/* Agent Referral Question */}
              <div className="flex flex-col gap-[clamp(0.75rem,1.1vw,1.25rem)]">
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.8rem,1.25vw,1.5rem)] leading-tight text-black">
                  Please select the agent who referred the customer?
                </span>

                <div className="flex flex-row items-center gap-[clamp(0.75rem,1.8vw,2rem)]">
                  {/* Default Location Button */}
                  <button
                    type="button"
                    onClick={() => setReferredAgent("default")}
                    className={`flex flex-row justify-center items-center gap-2.5 h-[clamp(2.09rem,2.64vw,3.17rem)] rounded-[33px] border transition-all cursor-pointer select-none ${
                      referredAgent === "default"
                        ? "bg-[#2B2D2F] border-[#000000] text-white"
                        : "bg-white border-[rgba(0,0,0,0.26)] text-black hover:bg-gray-50"
                    }`}
                    style={{ width: "clamp(7.55rem, 11.806vw, 14.167rem)" }}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        referredAgent === "default"
                          ? "bg-[#BDD327] border-white"
                          : "bg-white border-[#BDD327]"
                      }`}
                    />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.62rem,0.97vw,1.16rem)] leading-none whitespace-nowrap">
                      Default Location
                    </span>
                  </button>

                  {/* Agent from other Location Button */}
                  <button
                    type="button"
                    onClick={() => setReferredAgent("other")}
                    className={`flex flex-row justify-center items-center gap-2.5 h-[clamp(2.09rem,2.64vw,3.17rem)] rounded-[33px] border transition-all cursor-pointer select-none ${
                      referredAgent === "other"
                        ? "bg-[#2B2D2F] border-[#000000] text-white"
                        : "bg-white border-[rgba(0,0,0,0.26)] text-black hover:bg-gray-50"
                    }`}
                    style={{ width: "clamp(10.486rem, 16.389vw, 19.667rem)" }}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        referredAgent === "other"
                          ? "bg-[#BDD327] border-white"
                          : "bg-white border-[#BDD327]"
                      }`}
                    />
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.62rem,0.97vw,1.16rem)] leading-none whitespace-nowrap">
                      Agent from other Location
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Row 2: State, District, Area Dropdowns (Grid 3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2.7vw,2.5rem)] w-full">
              
              {/* State Dropdown */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#3E4A3D]">
                  State
                </label>
                <div 
                  className="relative w-full bg-white border border-[#E1E5EF] rounded-xl flex items-center px-3.5 justify-between"
                  style={{ 
                    maxWidth: "clamp(17.556rem, 27.43vw, 32.917rem)",
                    height: "clamp(1.778rem, 2.778vw, 3.333rem)" 
                  }}
                >
                  <select
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  <span className="font-['Inter'] font-normal text-[clamp(0.62rem,0.97vw,1.16rem)] text-[#191C1E] pointer-events-none">
                    {stateVal}
                  </span>
                  <ChevronDown size={16} className="text-[#363434]/60 pointer-events-none" />
                </div>
              </div>

              {/* District Dropdown */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#3E4A3D]">
                  District
                </label>
                <div 
                  className="relative w-full bg-white border border-[#E1E5EF] rounded-xl flex items-center px-3.5 justify-between"
                  style={{ 
                    maxWidth: "clamp(17.556rem, 27.43vw, 32.917rem)",
                    height: "clamp(1.778rem, 2.778vw, 3.333rem)" 
                  }}
                >
                  <select
                    value={districtVal}
                    onChange={(e) => setDistrictVal(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="West Godavari">West Godavari</option>
                    <option value="East Godavari">East Godavari</option>
                    <option value="Krishna">Krishna</option>
                  </select>
                  <span className="font-['Inter'] font-normal text-[clamp(0.62rem,0.97vw,1.16rem)] text-[#191C1E] pointer-events-none">
                    {districtVal}
                  </span>
                  <ChevronDown size={16} className="text-[#363434]/60 pointer-events-none" />
                </div>
              </div>

              {/* Area/City/Town Dropdown */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#3E4A3D]">
                  Area/City/Town
                </label>
                <div 
                  className="relative w-full bg-white border border-[#E1E5EF] rounded-xl flex items-center px-3.5 justify-between"
                  style={{ 
                    maxWidth: "clamp(17.556rem, 27.43vw, 32.917rem)",
                    height: "clamp(1.778rem, 2.778vw, 3.333rem)" 
                  }}
                >
                  <select
                    value={areaVal}
                    onChange={(e) => setAreaVal(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="Tanuku">Tanuku</option>
                    <option value="Bhimavaram">Bhimavaram</option>
                    <option value="Palakollu">Palakollu</option>
                  </select>
                  <span className="font-['Inter'] font-normal text-[clamp(0.62rem,0.97vw,1.16rem)] text-[#191C1E] pointer-events-none">
                    {areaVal}
                  </span>
                  <ChevronDown size={16} className="text-[#363434]/60 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Row 3: Land Conversion & Value Per Area (Grid 2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2.7vw,2.5rem)] w-full">
              
              {/* Land Conversion Dropdown */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#3E4A3D]">
                  Land Conversion
                </label>
                <div 
                  className="relative w-full bg-white border border-[#E1E5EF] rounded-xl flex items-center px-3.5 justify-between"
                  style={{ 
                    maxWidth: "clamp(17.556rem, 27.43vw, 32.917rem)",
                    height: "clamp(1.778rem, 2.778vw, 3.333rem)" 
                  }}
                >
                  <select
                    value={conversionVal}
                    onChange={(e) => setConversionVal(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="Acres">Acres</option>
                    <option value="Cents">Cents</option>
                    <option value="Hectares">Hectares</option>
                  </select>
                  <span className="font-['Inter'] font-normal text-[clamp(0.62rem,0.97vw,1.16rem)] text-[#191C1E] pointer-events-none">
                    {conversionVal}
                  </span>
                  <ChevronDown size={16} className="text-[#363434]/60 pointer-events-none" />
                </div>
              </div>

              {/* Value Per Area Input */}
              <div className="flex flex-col gap-2.5">
                <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#3E4A3D]">
                  Value Per Area
                </label>
                <input
                  type="text"
                  value={valuePerArea}
                  onChange={(e) => setValuePerArea(e.target.value)}
                  className="w-full bg-white border border-[#E1E5EF] rounded-xl px-3.5 font-['Inter'] font-normal text-[clamp(0.62rem,0.97vw,1.16rem)] text-[#191C1E] focus:outline-none focus:border-[#3E4A3D]"
                  style={{ 
                    maxWidth: "clamp(17.556rem, 27.43vw, 32.917rem)",
                    height: "clamp(1.778rem, 2.778vw, 3.333rem)" 
                  }}
                />
              </div>

            </div>

            {/* Row 4: Select Location of Land satellite map frame */}
            <div className="flex flex-col gap-3 w-full">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.71rem,1.11vw,1.33rem)] text-black">
                Select Location of Land
              </span>
              
              {/* Satellite map mockup card */}
              <div 
                onClick={() => navigate(`/super-admin/upload/view-maps/${targetId}`)}
                className="relative w-full bg-white border border-[rgba(0,0,0,0.12)] rounded-[18px] overflow-hidden flex items-center justify-center shadow-sm select-none cursor-pointer hover:border-[#3D4A0D]/50 transition-all"
                style={{
                  maxWidth: "clamp(27.867rem, 43.542vw, 52.25rem)",
                  height: "clamp(10.756rem, 16.806vw, 20.167rem)"
                }}
              >
                {/* Sat Map Image Background */}
                <img
                  src={isBoundaryConfirmed ? "/super-admin/images/map_confirmed_boundary.png" : "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop"}
                  alt="Satellite Map Background"
                  className={`absolute inset-0 w-full object-cover transition-all ${
                    isBoundaryConfirmed ? "h-full top-0" : "-top-[70px] filter blur-[1.2px]"
                  }`}
                  style={{
                    height: isBoundaryConfirmed ? "100%" : "clamp(16.978rem, 26.528vw, 31.833rem)"
                  }}
                />
                
                {/* Gradient/Dark Overlay */}
                {!isBoundaryConfirmed && <div className="absolute inset-0 bg-black/20" />}

                {/* Floating Centered Panel */}
                {!isBoundaryConfirmed && (
                  <div 
                    className="relative z-10 flex flex-col items-center gap-3"
                    style={{
                      width: "clamp(7.2rem, 11.25vw, 13.5rem)"
                    }}
                  >
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.62rem,0.97vw,1.16rem)] text-white text-center leading-none tracking-wide drop-shadow-sm">
                      Select location on maps
                    </span>
                    
                    {/* View maps button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent double navigation
                        navigate(`/super-admin/upload/view-maps/${targetId}`);
                      }}
                      className="flex justify-center items-center rounded-[57px] font-['Plus_Jakarta_Sans'] font-medium text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                      style={{
                        width: "clamp(3.733rem, 5.833vw, 7.0rem)",
                        height: "clamp(1.289rem, 2.014vw, 2.417rem)",
                        fontSize: "clamp(0.44rem, 0.69vw, 0.83rem)",
                        background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
                      }}
                    >
                      View maps
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ── Footer / Next button ── */}
          <div className="flex justify-end w-full mt-[clamp(1.5rem,2vw,3rem)]">
            <button
              onClick={handleNext}
              className="flex justify-center items-center rounded-[57px] text-white font-['Outfit'] font-normal transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0px_4px_12px_rgba(42,48,8,0.2)]"
              style={{
                width: "clamp(4.356rem, 6.806vw, 8.167rem)",
                height: "clamp(2.089rem, 3.264vw, 3.917rem)",
                fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)",
                background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
              }}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuperAdminUploadLandDetails;
