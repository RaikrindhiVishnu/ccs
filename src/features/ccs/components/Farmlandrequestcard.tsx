import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

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
};

type Props = {
  item: FarmlandRequestItem;
  onClick?: (id: string) => void;
};

export default function FarmlandRequestCard({ item, onClick }: Props) {
  const isHigh = item.priority === 'High';

  return (
    <Card
      className="
        relative flex flex-col justify-between
        rounded-[32px] border-0 bg-[#FFFFFF]
        p-[32px] shadow-sm
        transition-shadow hover:shadow-md
        min-h-[338px] w-full
      "
    >
      {/* ── CARD HEADER ── */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col gap-1">
          <Typography
            variant="h3"
            className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold leading-[30px] text-[#1A1C1D]"
          >
            {item.farmlandId}
          </Typography>
          <Typography
            as="span"
            variant="span"
            className="font-['Inter'] text-[18px] font-medium leading-[22px] text-[#3D4949] opacity-70"
          >
            {item.location}
          </Typography>
        </div>

        {/* Priority Badge */}
        <div
          className={`flex items-center justify-center px-3 py-1 rounded-full border ${isHigh
              ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]'
              : 'bg-[#FFFBEB] border-[#FEF3C7] text-[#D97706]'
            }`}
        >
          <span className="font-['Plus_Jakarta_Sans'] text-[12px] leading-[16px]">
            {item.priority}
          </span>
        </div>
      </div>

      {/* ── DATA GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 mb-8">
        <InfoField label="AGENT NAME" value={item.agentName} valueClassName="text-[20px]" />
        <InfoField label="CREATED DATE" value={item.createdDate} />
        <InfoField label="TOTAL ACRES" value={item.totalAcres} />
        <InfoField label="VALUATION" value={item.valuation} />
        <InfoField label="ASSET VALUE" value={item.assetValue} />
      </div>

      {/* ── CTA BUTTON ── */}
      <button
        onClick={() => onClick?.(item.id)}
        className="w-full h-[44px] flex items-center justify-center gap-2 bg-[#2780C4] rounded-[32px] hover:bg-[#1f669d] transition-colors"
      >
        <span className="font-['Plus_Jakarta_Sans'] text-[14px] font-bold leading-[20px] text-[#FFFFFF]">
          Start Verification
        </span>
        <div className="w-[16px] h-[16px] flex items-center justify-center">
          <ArrowRight className="w-[14px] h-[14px] text-[#FFFFFF]" strokeWidth={2.5} />
        </div>
      </button>
    </Card>
  );
}

/* ── InfoField helper ── */
function InfoField({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string; }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <span className="font-['Plus_Jakarta_Sans'] text-[12px] font-medium leading-[16px] tracking-[0.6px] uppercase text-[#3D4949] opacity-60 whitespace-nowrap">
        {label}
      </span>
      <span className={`font-['Plus_Jakarta_Sans'] font-semibold leading-[24px] text-[#1A1C1D] break-words ${valueClassName || 'text-[16px]'}`}>
        {value}
      </span>
    </div>
  );
}