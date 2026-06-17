import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UploadGoBack from "../../components/upload-components/UploadGoBack";
import { Search } from "lucide-react";

export const SuperAdminUploadViewMaps: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const targetId = id || "GLCSOS-05";

  // State
  const [searchVal, setSearchVal] = useState("");
  const [zoomLevel, setZoomLevel] = useState(15);

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    navigate(`/super-admin/upload/land-details/${targetId}?boundaryConfirmed=true`);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const handleRecenter = () => {
    setZoomLevel(15);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col justify-start items-center p-[clamp(1.77rem,2.78vw,3.33rem)] font-sans">
      <div
        className="w-full max-w-[clamp(64rem,90vw,120rem)] flex flex-col gap-[clamp(1rem,2vw,2.5rem)]"
      >
        {/* ── Top Header ── */}
        <div className="flex flex-row justify-between items-center w-full">
          <UploadGoBack onClick={handleBack} />
        </div>

        {/* ── Central Card ── */}
        <div className="w-full bg-white shadow-[0px_20px_40px_rgba(0,49,50,0.06)] rounded-[clamp(1.5rem,2.22vw,2rem)] p-[clamp(1rem,1.53vw,1.83rem)] relative flex flex-col gap-[clamp(1rem,1.53vw,1.83rem)]">

          {/* Map Container inside Card */}
          <div
            className="relative w-full bg-[#FFFFFF] border border-[rgba(0,0,0,0.12)] rounded-[18px] overflow-hidden flex items-center justify-center select-none"
            style={{
              height: "clamp(33.6rem, 52.5vw, 63.0rem)"
            }}
          >
            {/* Sat Map High-Resolution Mockup Background */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop"
              alt="Satellite View Map"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel / 15})`,
                filter: "brightness(0.9)"
              }}
            />

            {/* HUD Float Search bar input */}
            <div
              className="absolute flex flex-row items-center bg-white px-[clamp(1rem,1.38vw,1.66rem)] gap-2 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] border-none z-10"
              style={{
                top: "clamp(1rem, 2.08vw, 2.08rem)",
                right: "clamp(1rem, 2.08vw, 2.08rem)",
                width: "clamp(13.867rem, 21.667vw, 26.0rem)",
                height: "clamp(2.311rem, 3.611vw, 4.333rem)",
                borderRadius: "clamp(2.667rem, 4.167vw, 5.0rem)"
              }}
            >
              <Search size={20} className="text-[#5C5C5C]/60 shrink-0" />
              <input
                type="text"
                placeholder="Search city, area...."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-transparent outline-none font-['Inter'] font-normal text-[clamp(0.71rem,1.11vw,1.33rem)] text-[#191C1E] placeholder-[#5C5C5C]/30"
              />
            </div>

            {/* Ambient Map Grid Layer Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Float HUD Zoom Controls (Bottom Right) */}
            <div
              className="absolute flex flex-col items-center justify-around bg-[rgba(6,6,6,0.5)] border border-white/10 shadow-lg select-none z-10"
              style={{
                right: "clamp(1rem, 1.8vw, 2.5rem)",
                bottom: "clamp(5rem, 6.5vw, 8rem)",
                width: "clamp(1.528rem, 2.388vw, 2.865rem)",
                height: "clamp(3.31rem, 5.172vw, 6.207rem)",
                borderRadius: "clamp(0.38rem, 0.6vw, 0.72rem)"
              }}
            >
              {/* Zoom In Button */}
              <button
                type="button"
                onClick={handleZoomIn}
                className="w-full h-1/2 flex items-center justify-center font-['Outfit'] font-normal text-white hover:bg-white/10 active:bg-white/20 transition-colors border-b border-white/10 cursor-pointer"
                style={{
                  fontSize: "clamp(1.146rem, 1.79vw, 2.148rem)"
                }}
              >
                +
              </button>
              {/* Zoom Out Button */}
              <button
                type="button"
                onClick={handleZoomOut}
                className="w-full h-1/2 flex items-center justify-center font-['Outfit'] font-normal text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
                style={{
                  fontSize: "clamp(1.146rem, 1.79vw, 2.148rem)"
                }}
              >
                -
              </button>
            </div>

            {/* Float HUD Location Recenter Button (Bottom Right, below Zoom) */}
            <button
              type="button"
              onClick={handleRecenter}
              className="absolute flex items-center justify-center bg-[rgba(6,6,6,0.6)] border border-white/10 shadow-lg rounded-[6px] hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer z-10"
              style={{
                right: "clamp(1rem, 1.8vw, 2.5rem)",
                bottom: "clamp(1rem, 1.8vw, 2.5rem)",
                width: "clamp(1.422rem, 2.222vw, 2.667rem)",
                height: "clamp(1.422rem, 2.222vw, 2.667rem)"
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
                style={{
                  width: "clamp(0.889rem, 1.389vw, 1.667rem)",
                  height: "clamp(0.889rem, 1.389vw, 1.667rem)"
                }}
              >
                <path
                  d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1c0-.55-.45-1-1-1s-1 .45-1 1v2.06C6.83 3.52 3.52 6.83 3.06 11H1c-.55 0-1 .45-1 1s.45 1 1 1h2.06c.46 4.17 3.77 7.48 7.94 7.94V23c0 .55.45 1 1 1s1-.45 1-1v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23c.55 0 1-.45 1-1s-.45-1-1-1h-2.06zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Confirm Boundary Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={handleConfirm}
              className="flex justify-center items-center rounded-[57px] text-white font-['Outfit'] font-normal transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0px_4px_12px_rgba(42,48,8,0.2)]"
              style={{
                width: "clamp(9.2rem, 14.375vw, 17.25rem)",
                height: "clamp(2.089rem, 3.264vw, 3.917rem)",
                fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)",
                background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
              }}
            >
              Confirm Boundary
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuperAdminUploadViewMaps;
