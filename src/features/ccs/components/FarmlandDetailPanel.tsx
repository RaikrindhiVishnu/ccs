import { ArrowRight, ArrowLeft } from "lucide-react";

export type FarmlandDetail = {
  id: string;
  farmlandId: string;
  ownerName: string;
  number: string;
  email: string;
  dateOfBirth: string;
  religion: string;
  caste: string;
  valuation: string;
  totalArea: string;
  assetValue: string;
  status: "COMPLETED" | "ACTIVE" | "PENDING" | "REJECTED";
  liveOnWebsite: boolean;
  fieldNotes?: string;
};

type Props = {
  detail: FarmlandDetail | null;
  open: boolean;
  onClose: () => void;
  onHistoricalAnalysis?: (id: string) => void;
  /** Hide the Historical Agronomy Analysis button (e.g. for Farmland List view) */
  hideAnalysisButton?: boolean;
};



function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#353535]">
        {label}
      </span>
      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#353535]">
        {value}
      </span>
    </div>
  );
}

export default function FarmlandDetailPanel({
  detail,
  open,
  onClose,
  onHistoricalAnalysis,
  hideAnalysisButton = false,
}: Props) {
  return (
    <>
      {/* ── GO BACK button ── */}
      {open && (
        <button
          onClick={onClose}
          className="absolute z-50 left-[20px] md:left-[110px] lg:left-[320px] top-[16px] md:top-[37px] w-[135px] h-[52px] bg-[#FFFFFF] rounded-[60px] flex items-center justify-center gap-[8px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-[24px] h-[24px] text-[#353535]" strokeWidth={1.4} />
          <span className="font-['Inter'] font-normal text-[16px] leading-[18px] text-[#353535]">
            Go back
          </span>
        </button>
      )}

      {/* ── RIGHT PANEL ── */}
      <div
        className={`absolute z-50 right-[16px] md:right-[49px] top-[80px] md:top-[52px] w-[calc(100%-32px)] md:w-[411px] h-[682px] max-h-[calc(100vh-100px)] md:max-h-[calc(100vh-104px)] bg-[#FFFFFF] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-transparent rounded-[12px] flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-[calc(100%+49px)]"
        }`}
      >
        {detail && (
          <>
            {/* Header */}
            <div className="shrink-0 h-[61px] border-b border-[#F3F4F6] flex items-center px-[24px]">
              <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#1F2937]">
                Owners &amp; Land Details
              </h2>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-[24px] pt-[24px] pb-[20px] flex flex-col gap-[24px]">

              {/* Name */}
              <div className="flex flex-col gap-[4px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#353535]">
                  Name
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[25px] text-[#353535]">
                  {detail.ownerName}
                </span>
              </div>

              <DetailRow label="Number"        value={detail.number} />
              <DetailRow label="Email Address" value={detail.email} />
              <DetailRow label="Valuation"     value={detail.valuation} />
              <DetailRow label="Total Acres"   value={detail.totalArea} />
              <DetailRow label="Asset Value"   value={detail.assetValue} />

              {/* Status */}
              <div className="flex flex-col gap-[4px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#353535]">
                  Status
                </span>
                <span className={`font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] capitalize ${detail.status === "REJECTED" ? "text-[#E63946]" : "text-[#489C2C]"}`}>
                  {detail.status === "ACTIVE" ? "Approved" : detail.status.toLowerCase()}
                </span>
              </div>

              {/* Field Notes */}
              <div className="flex flex-col gap-[4px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[20px] text-[#353535]">
                  Field Notes
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#6B7280]">
                  {detail.fieldNotes || "N/A"}
                </span>
              </div>
            </div>

            {/* Footer — Historical Analysis button (optional) */}
            {!hideAnalysisButton && (
              <div className="shrink-0 w-full pb-[30px] pt-[10px] flex justify-center bg-[#FFFFFF] rounded-b-[12px]">
                <button
                  onClick={() => onHistoricalAnalysis?.(detail.id)}
                  className="w-[263.32px] h-[40px] bg-[#2780C4] rounded-[32px] shadow-[0px_10px_15px_-3px_rgba(9,20,38,0.2),0px_4px_6px_-4px_rgba(9,20,38,0.2)] flex items-center justify-center gap-[8px] hover:bg-[#1f669d] transition-colors"
                >
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#FFFFFF] text-center">
                    Historical Agronomy Analysis
                  </span>
                  <ArrowRight className="w-[9.33px] h-[9.33px] text-[#FFFFFF]" strokeWidth={3} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
