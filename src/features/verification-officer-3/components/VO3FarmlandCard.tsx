import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import defaultProfileImg from "@/assets/profile.svg";

interface VO3FarmlandCardProps {
  id?: string;
  location?: string;
  agentName?: string;
  agentImage?: string;
  totalAmount?: string;
  valuePerAcre?: string;
  totalArea?: string;
  submissionDate?: string;
  imageUrl?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  progress?: number;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const VO3FarmlandCard: React.FC<VO3FarmlandCardProps> = ({
  id = "GLC-AP-113",
  location = "Srikakulam, AP",
  agentName = "Sravan",
  agentImage,
  totalAmount = "₹85,00,000",
  valuePerAcre = "₹4,25,000",
  totalArea = "80 Acres",
  submissionDate = "Oct 12, 2025",
  imageUrl,
  priority,
  progress,
  actionLabel = "Enter Audit Room",
  onActionClick,
}) => {
  // Deterministic placeholder image for farmland preview if none is provided
  const placeholderId = parseInt(id.split("-").pop() || "1") || 1;
  const finalImageUrl = imageUrl || `https://picsum.photos/seed/${placeholderId + 100}/600/400`;

  return (
    <div className="flex flex-col select-none bg-white rounded-[2rem] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] border border-[#E1E2ED]/50 overflow-hidden w-full min-h-[clamp(28.31rem,44.24vw,70.0rem)] relative transition-all duration-300 hover:shadow-md">
      
      {/* Top Image Section */}
      <div className="relative w-full h-[clamp(11.38rem,17.78vw,28.0rem)] shrink-0 bg-gray-100">
        <img
          src={finalImageUrl}
          alt={`Farmland ${id}`}
          className="w-full h-full object-cover"
        />

        {/* Priority Badge */}
        {priority && (
          <div className="absolute flex items-center gap-[clamp(0.27rem,0.42vw,0.75rem)] left-[clamp(0.75rem,1.18vw,2.1rem)] top-[clamp(0.84rem,1.32vw,2.35rem)] z-10 px-[clamp(0.5rem,0.78vw,1.38rem)] py-[clamp(0.25rem,0.39vw,0.69rem)] bg-black/40 backdrop-blur-[6px] rounded-full border border-white/15 text-white select-none">
            <span
              className={`w-[clamp(0.35rem,0.56vw,0.99rem)] h-[clamp(0.35rem,0.56vw,0.99rem)] rounded-full shrink-0 ${
                priority === "HIGH"
                  ? "bg-[#EF4646]"
                  : priority === "MEDIUM"
                  ? "bg-[#BDD327]"
                  : "bg-[#85BFE5]"
              }`}
            />
            <Typography
              as="span"
              className="font-sans font-bold text-[clamp(0.55rem,0.8vw,1.425rem)] leading-none tracking-wider uppercase text-white/95"
            >
              {priority} Priority
            </Typography>
          </div>
        )}

        {/* Gradient Overlay for Location readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Location Tag */}
        <div className="absolute flex items-center gap-[0.375rem] left-[clamp(1.2rem,2.6vw,4.5rem)] bottom-[clamp(0.8rem,1.3vw,2.4rem)] z-10 text-white/90">
          <MapPin size={14} className="text-white shrink-0" />
          <Typography
            as="span"
            className="font-sans font-medium text-[clamp(0.625rem,0.97vw,1.734rem)] leading-none"
          >
            {location}
          </Typography>
        </div>
      </div>

      {/* Bottom Content Body Section */}
      <div className="flex-1 flex flex-col justify-between p-[clamp(1.5rem,2.22vw,3.5rem)] gap-[clamp(1.0rem,1.67vw,3.0rem)]">
        
        {/* Row 1: Farm ID & Agent Info */}
        <div className="flex justify-between items-start w-full gap-[0.5rem] flex-wrap">
          {/* Farm ID */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-bold text-[#6D7A7A] text-[clamp(0.53rem,0.83vw,1.48rem)] leading-none tracking-[0.075rem] uppercase"
            >
              FARM ID
            </Typography>
            <Typography
              as="h3"
              className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.89rem,1.39vw,2.47rem)] leading-tight m-0"
            >
              {id}
            </Typography>
          </div>

          {/* Agent Info */}
          <div className="flex items-center gap-[clamp(0.5rem,0.83vw,1.5rem)]">
            <div className="w-[clamp(1.78rem,2.78vw,4.95rem)] h-[clamp(1.78rem,2.78vw,4.95rem)] rounded-full overflow-hidden shrink-0 border border-white/20 bg-gray-200">
              <img
                src={agentImage || defaultProfileImg}
                alt={agentName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-[0.125rem]">
              <Typography
                as="span"
                className="font-sans font-bold text-[#3D4949] text-[clamp(0.49rem,0.76vw,1.365rem)] leading-none tracking-[0.034rem] uppercase"
              >
                ASSIGNED AGENT
              </Typography>
              <Typography
                as="span"
                className="font-sans font-normal text-[var(--text-primary)] text-[clamp(0.625rem,0.97vw,1.734rem)] leading-tight"
              >
                {agentName}
              </Typography>
            </div>
          </div>
        </div>

        {/* Stats Grid: Row 2 & Row 3 in Figma */}
        <div className="grid grid-cols-2 gap-x-[clamp(0.8rem,1.11vw,1.95rem)] gap-y-[clamp(0.6rem,0.83vw,1.5rem)] w-full">
          {/* Box 1: Total Amount */}
          <div className="flex flex-col justify-center bg-[#F9F9FB] rounded-[1rem] p-[clamp(0.8rem,1.11vw,1.95rem)] h-[clamp(3.56rem,5.56vw,9.9rem)] gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.53rem,0.83vw,1.485rem)] leading-none"
            >
              Total Amount
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.8rem,1.25vw,2.235rem)] leading-tight tracking-tight"
            >
              {totalAmount}
            </Typography>
          </div>

          {/* Box 2: Value per Acre */}
          <div className="flex flex-col justify-center bg-[#F9F9FB] rounded-[1rem] p-[clamp(0.8rem,1.11vw,1.95rem)] h-[clamp(3.56rem,5.56vw,9.9rem)] gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.53rem,0.83vw,1.485rem)] leading-none"
            >
              Value per Acre
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.8rem,1.25vw,2.235rem)] leading-tight tracking-tight"
            >
              {valuePerAcre}
            </Typography>
          </div>

          {/* Box 3: Total Area */}
          <div className="flex flex-col justify-center bg-[#F9F9FB] rounded-[1rem] p-[clamp(0.8rem,1.11vw,1.95rem)] h-[clamp(3.56rem,5.56vw,9.9rem)] gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.53rem,0.83vw,1.485rem)] leading-none"
            >
              Total Area
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.8rem,1.25vw,2.235rem)] leading-tight tracking-tight"
            >
              {totalArea}
            </Typography>
          </div>

          {/* Box 4: Submission */}
          <div className="flex flex-col justify-center bg-[#F9F9FB] rounded-[1rem] p-[clamp(0.8rem,1.11vw,1.95rem)] h-[clamp(3.56rem,5.56vw,9.9rem)] gap-[0.25rem]">
            <Typography
              as="span"
              className="font-sans font-normal text-[#3D4949] text-[clamp(0.53rem,0.83vw,1.485rem)] leading-none"
            >
              Submission
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.8rem,1.25vw,2.235rem)] leading-tight tracking-tight"
            >
              {submissionDate}
            </Typography>
          </div>
        </div>

        {/* Progress Bar for In-Progress audits */}
        {progress !== undefined && (
          <div className="flex flex-col gap-[clamp(0.2rem,0.3vw,0.6rem)] w-full mb-1">
            <div className="flex justify-between items-center text-[clamp(0.65rem,1.0vw,1.77rem)] text-[#505F76]">
              <span className="font-sans font-medium">Audit Progress</span>
              <span className="font-sans font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-[#F3F4F6] rounded-full h-[clamp(0.27rem,0.42vw,0.75rem)] overflow-hidden">
              <div
                className="bg-[#BDD327] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={onActionClick}
          className="w-full h-[clamp(2.13rem,3.33vw,5.94rem)] bg-[#96C8EC] hover:bg-[#85bfe5] text-black rounded-full font-sans font-bold text-[clamp(0.625rem,0.97vw,1.734rem)] tracking-[0.022rem] border-none transition-all duration-300 shadow-sm shrink-0"
        >
          {actionLabel}
        </Button>
      </div>

    </div>
  );
};

export default VO3FarmlandCard;
