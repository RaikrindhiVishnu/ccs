import { ArrowRight } from 'lucide-react';
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";

export type FarmlandRequestItem = {
  id: string;
  farmlandId: string;
  location: string;
  priority: 'High' | 'Medium' | 'Low';
  agentName: string;
  createdDate: string;
  totalAcres: string;
  valuation: string;
  assetValue: string;
  agentImg?: string;
};

type Props = {
  item: FarmlandRequestItem;
  onClick?: (id: string) => void;
};

// Abbreviations that must remain uppercase
const PRESERVE_UPPER = new Set(['A.P.', 'T.S.', 'WG', 'EG', 'NTR', 'AP', 'TS', 'N/A']);

/** Convert a location string to title case, preserving known abbreviations */
function toTitleCase(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .split(',')
    .map(segment =>
      segment
        .trim()
        .split(' ')
        .map(word => {
          if (!word) return word;
          if (PRESERVE_UPPER.has(word.toUpperCase()) || PRESERVE_UPPER.has(word)) return word.toUpperCase();
          // If the word contains dots (abbreviation like A.P.) keep it as-is
          if (word.includes('.')) return word;
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ')
    )
    .join(', ');
}

export default function FarmlandRequestCard({ item, onClick }: Props) {
  const isHigh = item.priority === 'High';
  const isS3Key = Boolean(item.agentImg && !item.agentImg.startsWith("http") && !item.agentImg.startsWith("data:"));
  const { data: s3Data } = useGeneratePresignedUrlQuery(item.agentImg || "", { skip: !isS3Key });
  const finalAgentImg = isS3Key ? s3Data?.url : item.agentImg;

  return (
    <div
      className="bg-white rounded-[32px] box-border w-full flex flex-col p-[26px] transition-shadow hover:shadow-md"
    >
      {/* ── CARD HEADER ── */}
      <div className="flex items-start justify-between h-[56px]">
        <div className="flex flex-col gap-[4px]">
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[30px] text-[#1A1C1D] truncate max-w-[200px] sm:max-w-[250px]">
            {item.farmlandId}
          </span>
          <span className="font-['Inter'] font-medium text-[18px] leading-[22px] text-[rgba(61,73,73,0.7)] truncate max-w-[200px] sm:max-w-[250px]">
            {toTitleCase(item.location)}
          </span>
        </div>

        {/* Priority Badge */}
        <div
          className={`box-border flex flex-row items-center px-[12px] py-[4px] rounded-full border shrink-0 ${isHigh
              ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]'
              : 'bg-[#FFFBEB] border-[#FEF3C7] text-[#D97706]'
            }`}
        >
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[12px] leading-[16px]">
            {item.priority}
          </span>
        </div>
      </div>

      {/* ── DATA GRID ── */}
      <div className="grid grid-cols-3 gap-y-[29px] gap-x-[10px] mt-[38px]">
        {/* AGENT NAME */}
        <div className="flex flex-col gap-[3px]">
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[rgba(61,73,73,0.6)]">
            Agent name
          </span>
          <div className="flex flex-row items-center gap-[6px] pr-2">
            {finalAgentImg ? (
              <img 
                src={finalAgentImg} 
                alt="Agent" 
                className="w-[20px] h-[20px] rounded-full object-cover shrink-0" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.agentName)}&background=F3F4F6&color=164573`;
                }}
              />
            ) : null}
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[20px] leading-[24px] text-[#1A1C1D] truncate">
              {item.agentName}
            </span>
          </div>
        </div>

        {/* CREATED DATE */}
        <div className="flex flex-col gap-[4px]">
          <span className="font-['Inter'] font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[rgba(61,73,73,0.6)]">
            Created date
          </span>
          <span className="font-['Inter'] font-semibold text-[16px] leading-[24px] text-[#1A1C1D] truncate">
            {item.createdDate}
          </span>
        </div>

        {/* TOTAL ACRES */}
        <div className="flex flex-col gap-[4px]">
          <span className="font-['Inter'] font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[rgba(61,73,73,0.6)]">
            Total acres
          </span>
          <span className="font-['Inter'] font-semibold text-[16px] leading-[24px] text-[#1A1C1D] truncate">
            {item.totalAcres}
          </span>
        </div>

        {/* VALUATION */}
        <div className="flex flex-col gap-[4px]">
          <span className="font-['Inter'] font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[rgba(61,73,73,0.6)]">
            Valuation
          </span>
          <span className="font-['Inter'] font-semibold text-[16px] leading-[24px] text-[#1A1C1D] truncate">
            {item.valuation}
          </span>
        </div>

        {/* ASSET VALUE */}
        <div className="flex flex-col gap-[4px] col-span-2">
          <span className="font-['Inter'] font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[rgba(61,73,73,0.6)]">
            Asset Value
          </span>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#1A1C1D] truncate">
            {item.assetValue}
          </span>
        </div>
      </div>

      {/* ── CTA BUTTON ── */}
      <button
        onClick={() => onClick?.(item.id)}
        className="w-full flex flex-row justify-center items-center py-[10px] px-[24px] gap-[7.99px] bg-[#2780C4] rounded-[32px] transition-colors hover:bg-[#1f669d] mt-[30px]"
        style={{ height: '44px', boxShadow: '0px 10px 15px -3px rgba(9, 20, 38, 0.2), 0px 4px 6px -4px rgba(9, 20, 38, 0.2)' }}
      >
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-center text-[#FFFFFF]">
          Start Verification
        </span>
        <div className="w-[9.33px] h-[9.33px] flex items-center justify-center text-white">
          <ArrowRight className="w-[12px] h-[12px] text-[#FFFFFF]" strokeWidth={2.5} />
        </div>
      </button>
    </div>
  );
}