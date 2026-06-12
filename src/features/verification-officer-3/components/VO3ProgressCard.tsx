import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import defaultProfileImg from "@/assets/profile.svg";

interface VO3ProgressCardProps {
  id?: string;
  location?: string;
  agentName?: string;
  agentImage?: string;
  totalArea?: string;
  costPerAcre?: string;
  estimatedValue?: string;
  status?: string;
  imageUrl?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const VO3ProgressCard: React.FC<VO3ProgressCardProps> = ({
  id = "GLCSOS 01",
  location = "Tanuku, Andhra Pradesh",
  agentName = "Ananthu",
  agentImage,
  totalArea = "14.5 Acres",
  costPerAcre = "₹24L",
  estimatedValue = "₹3.48Cr",
  status = "IN PROGRESS",
  imageUrl,
  actionLabel = "Resume Verification",
  onActionClick,
}) => {
  // Deterministic placeholder image for farmland preview if none is provided
  const placeholderId = parseInt(id.replace(/\D/g, "") || "1") || 1;
  const finalImageUrl = imageUrl || `https://picsum.photos/seed/${placeholderId + 200}/600/400`;

  return (
    <div className="flex flex-col select-none bg-white rounded-[clamp(1.5rem,2.22vw,2.0rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] border border-[#E1E2ED]/50 overflow-hidden w-full h-[clamp(22.0rem,27.29vw,25.0rem)] relative transition-all duration-300 hover:shadow-md">
      
      {/* Top Image Section */}
      <div className="relative w-full h-[clamp(8.0rem,11.11vw,10.0rem)] shrink-0 bg-gray-100">
        <img
          src={finalImageUrl}
          alt={`Farmland ${id}`}
          className="w-full h-full object-cover"
        />

        {/* Status Badge */}
        {status && (
          <div className="absolute right-[clamp(0.6rem,1.11vw,1.0rem)] top-[clamp(0.6rem,0.97vw,0.875rem)] z-10 px-[clamp(0.6rem,0.83vw,0.9rem)] py-[clamp(0.15rem,0.2vw,0.25rem)] bg-white/95 backdrop-blur-[6px] rounded-full border border-white/10 shadow-sm flex items-center justify-center">
            <Typography
              as="span"
              className="font-sans font-bold text-[clamp(0.55rem,0.69vw,0.75rem)] leading-none tracking-[0.5px] uppercase text-[#0F7340]"
            >
              {status}
            </Typography>
          </div>
        )}

        {/* Gradient Overlay for Title & Location readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

        {/* Title and Location */}
        <div className="absolute flex flex-col gap-[3.5px] left-[clamp(0.8rem,1.11vw,1.25rem)] bottom-[clamp(0.8rem,1.11vw,1.25rem)] z-10 text-white w-[80%]">
          <Typography
            as="h3"
            className="font-sans font-bold text-[clamp(0.95rem,1.25vw,1.35rem)] leading-none tracking-[-0.45px] m-0 text-white"
          >
            {id}
          </Typography>
          <div className="flex items-center gap-[4px] text-white/80">
            <MapPin size={12} className="text-white shrink-0 opacity-80" />
            <Typography
              as="span"
              className="font-sans font-normal text-[clamp(0.65rem,0.83vw,0.9rem)] leading-none truncate"
            >
              {location}
            </Typography>
          </div>
        </div>
      </div>

      {/* Bottom Content Body Section */}
      <div className="flex-1 flex flex-col justify-between p-[clamp(1.0rem,1.67vw,1.5rem)] gap-[clamp(1.0rem,1.67vw,1.5rem)]">
        
        {/* Agent Info */}
        <div className="flex items-center gap-[clamp(0.5rem,0.83vw,1.0rem)] w-full">
          <div className="w-[clamp(2.0rem,2.77vw,2.5rem)] h-[clamp(2.0rem,2.77vw,2.5rem)] rounded-full overflow-hidden shrink-0 border border-white/20 bg-gray-200">
            <img
              src={agentImage || defaultProfileImg}
              alt={agentName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-[0.125rem]">
            <Typography
              as="span"
              className="font-sans font-bold text-[#3D4949] text-[clamp(0.55rem,0.76vw,0.8rem)] leading-none tracking-[0.55px] uppercase"
            >
              ASSIGNED AGENT
            </Typography>
            <Typography
              as="span"
              className="font-sans font-normal text-[#1A1C1D] text-[clamp(0.75rem,0.97vw,1.0rem)] leading-tight"
            >
              {agentName}
            </Typography>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {/* Total Area */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.55rem,0.76vw,0.8rem)] leading-none"
            >
              Total Area
            </Typography>
            <Typography
              as="span"
              className="font-sans font-semibold text-black text-[clamp(0.95rem,1.25vw,1.35rem)] leading-none tracking-tight"
            >
              {totalArea}
            </Typography>
          </div>

          {/* Cost / Acre */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.55rem,0.76vw,0.8rem)] leading-none"
            >
              Cost / Acre
            </Typography>
            <Typography
              as="span"
              className="font-sans font-semibold text-[#1A1C1D] text-[clamp(0.95rem,1.25vw,1.35rem)] leading-none tracking-tight"
            >
              {costPerAcre}
            </Typography>
          </div>

          {/* Est. Value */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.55rem,0.76vw,0.8rem)] leading-none"
            >
              Est. Value
            </Typography>
            <Typography
              as="span"
              className="font-sans font-semibold text-[#1A1C1D] text-[clamp(0.95rem,1.25vw,1.35rem)] leading-none tracking-tight"
            >
              {estimatedValue}
            </Typography>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onActionClick}
          className="w-full h-[clamp(2.5rem,3.33vw,3.5rem)] bg-[#96C8EC] hover:bg-[#85bfe5] text-black rounded-full font-sans font-bold text-[clamp(0.75rem,0.97vw,1.0rem)] tracking-[0.35px] border-none transition-all duration-300 shadow-sm shrink-0"
        >
          {actionLabel}
        </Button>
      </div>

    </div>
  );
};

export default VO3ProgressCard;
