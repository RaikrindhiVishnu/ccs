import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface VO3CompleteCardProps {
  id?: string;
  title?: string;
  location?: string;
  landSize?: string;
  landValue?: string;
  verificationDate?: string;
  imageUrl?: string;
  status?: string;
  onCardClick?: () => void;
}

export const VO3CompleteCard: React.FC<VO3CompleteCardProps> = ({
  id = "GLC-AP-001",
  title = "Mysuru Estate",
  location = "Guntur, Andhra Pradesh",
  landSize = "150Acres",
  landValue = "₹37,50,000",
  verificationDate = "12 Oct 2023, 4:30PM",
  imageUrl,
  status = "VERIFIED",
  onCardClick,
}) => {
  // Deterministic placeholder image for farmland preview if none is provided
  const placeholderId = parseInt(id.replace(/\D/g, "") || "1") || 1;
  const finalImageUrl = imageUrl || `https://picsum.photos/seed/${placeholderId + 400}/600/400`;

  return (
    <div 
      onClick={onCardClick}
      className="flex flex-col sm:flex-row select-none bg-white border border-[#F1F5F9] shadow-[0px_10px_40px_rgba(0,0,0,0.03)] rounded-[2rem] overflow-hidden w-full h-auto sm:h-[clamp(21.0rem,27.43vw,33.0rem)] relative transition-all duration-300 hover:shadow-md cursor-pointer"
    >
      {/* Left Image Section */}
      <div className="w-full sm:w-[clamp(11.0rem,15.83vw,19.0rem)] h-48 sm:h-full shrink-0 bg-gray-100">
        <img
          src={finalImageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content Section */}
      <div className="flex-1 flex flex-col justify-between p-[clamp(1.2rem,2.77vw,3.3rem)] gap-[clamp(1.0rem,1.5vw,2.5rem)]">
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between w-full gap-2 flex-wrap">
          {/* ID Badge */}
          <div className="flex items-center justify-center bg-[#F1F5F9] rounded-full px-[clamp(0.8rem,1.11vw,1.35rem)] py-[clamp(0.3rem,0.42vw,0.65rem)]">
            <Typography
              as="span"
              className="font-sans font-bold text-[#64748B] text-[clamp(0.75rem,0.97vw,1.16rem)] leading-none tracking-[0.7px]"
            >
              {id}
            </Typography>
          </div>

          {/* Status Badge */}
          {status && (
            <div className="flex items-center gap-[6px] bg-[#ECFDF5] rounded-full px-[clamp(0.8rem,1.11vw,1.35rem)] py-[clamp(0.3rem,0.42vw,0.65rem)]">
              <CheckCircle2 size={14} className="text-[#059669] shrink-0" />
              <Typography
                as="span"
                className="font-sans font-bold text-[#047857] text-[clamp(0.65rem,0.83vw,1.0rem)] leading-none tracking-[0.6px] uppercase"
              >
                {status}
              </Typography>
            </div>
          )}
        </div>

        {/* Title and Location */}
        <div className="flex flex-col gap-[clamp(0.25rem,0.4vw,0.8rem)]">
          <Typography
            as="h3"
            className="font-sans font-extrabold text-[#0F172A] text-[clamp(1.25rem,2.08vw,2.5rem)] leading-tight m-0"
          >
            {title}
          </Typography>
          <div className="flex items-center gap-[8px] text-[#64748B]">
            <MapPin size={16} className="text-[#94A3B8] shrink-0" />
            <Typography
              as="span"
              className="font-sans font-normal text-[#64748B] text-[clamp(0.85rem,1.11vw,1.33rem)] leading-none"
            >
              {location}
            </Typography>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="flex items-center gap-[clamp(0.8rem,1.25vw,2.0rem)] w-full">
          {/* Land Size Box */}
          <div className="flex-1 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-[clamp(0.8rem,1.38vw,1.65rem)] flex flex-col gap-[6px]">
            <Typography
              as="span"
              className="font-sans font-bold text-[#64748B] text-[clamp(0.65rem,0.83vw,1.0rem)] leading-none tracking-[1.2px] uppercase"
            >
              LAND SIZE
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[#0F172A] text-[clamp(1.1rem,1.67vw,2.0rem)] leading-none"
            >
              {landSize}
            </Typography>
          </div>

          {/* Land Value Box */}
          <div className="flex-1 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-[clamp(0.8rem,1.38vw,1.65rem)] flex flex-col gap-[6px]">
            <Typography
              as="span"
              className="font-sans font-bold text-[#64748B] text-[clamp(0.65rem,0.83vw,1.0rem)] leading-none tracking-[1.2px] uppercase"
            >
              LAND VALUE
            </Typography>
            <Typography
              as="span"
              className="font-sans font-bold text-[#0F172A] text-[clamp(1.1rem,1.67vw,2.0rem)] leading-none"
            >
              {landValue}
            </Typography>
          </div>
        </div>

        {/* Verification Date Footer */}
        <div className="border-t border-[#F1F5F9] pt-[clamp(0.8rem,1.38vw,2.0rem)] flex items-center justify-between gap-2 flex-wrap">
          <Typography
            as="span"
            className="font-sans font-bold text-[#94A3B8] text-[clamp(0.65rem,0.83vw,1.0rem)] leading-none tracking-[1.2px] uppercase"
          >
            VERIFICATION DATE
          </Typography>
          <Typography
            as="span"
            className="font-sans font-normal text-[#475569] text-[clamp(0.75rem,0.97vw,1.16rem)] leading-none"
          >
            {verificationDate}
          </Typography>
        </div>

      </div>
    </div>
  );
};

export default VO3CompleteCard;
