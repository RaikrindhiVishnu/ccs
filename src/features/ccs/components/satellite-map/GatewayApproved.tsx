import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";
import { toast } from "sonner";
import fee4 from "@/assets/fee4.svg";
import fee5 from "@/assets/fee5.svg";
import fee6 from "@/assets/fee6.svg";
export type GatewayApprovedProps = {
  onBack: () => void;
  onProceed: (fees: { roFee: number; foFee: number; ioFee: number }) => void;
  farmlandDetails?: any;
  isSidebarExpanded?: boolean;
};

function CheckmarkHeader() {
  return (
    <div className="flex flex-col items-center gap-[16px] mt-[40px] mb-[40px]">
      <div className="relative w-[96px] h-[96px] rounded-full flex items-center justify-center p-[5px]" style={{
        background: 'radial-gradient(59.38% 41.98% at 50% 50%, #2780C4 0%, #164573 100%)',
        border: '5px solid #AED6EF',
        boxShadow: '0px 10px 15px -3px rgba(39, 128, 196, 0.2), 0px 4px 6px -4px rgba(39, 128, 196, 0.2)'
      }}>
        <div className="w-[36px] h-[27px] text-[#FFFFFF] flex items-center justify-center">
          <Check className="w-full h-full" strokeWidth={4} />
        </div>
      </div>
      <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] leading-[22px] tracking-[1.39px] text-[#000000] uppercase mt-[16px]">
        GATEWAY APPROVED
      </h1>
    </div>
  );
}

function TotalSummary({ total }: { total: string }) {
  return (
    <div className="w-full px-[20px] md:px-[40px] pt-[24px] border-t border-[rgba(0,0,0,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between mt-[24px] gap-[16px] md:gap-[0px]">
      <div className="flex flex-col gap-[4px]">
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] tracking-[0.14px] text-[#1A1C1C]">
          Total Processing Fee
        </span>
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[12px] leading-[16px] text-[#006141]">
          (Auto Calculated)
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-[16px] md:gap-[24px]">
        <div className="flex items-baseline gap-[8px]">
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] tracking-[0.14px] text-[#717783]">
            Total =
          </span>
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[34px] text-[#1A1C1C]">
            ₹{total}
          </span>
        </div>
        <div className="flex items-center gap-[8px] bg-[rgba(0,124,85,0.1)] rounded-full px-[12px] py-[6px]">
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] leading-[17px] tracking-[0.36px] text-[#006141]">
            Auto Calculated
          </span>
          <Check className="w-[12px] h-[12px] text-[#006141]" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

export default function GatewayApproved({ onBack, onProceed, farmlandDetails, isSidebarExpanded = false }: GatewayApprovedProps) {
  // Extract officers and fees safely
  const officers = farmlandDetails?.assigned_officers || farmlandDetails?.officers || [];
  
  // Try to find specific officers by role or fallback to default array positions if roles are not explicitly named
  const roName = officers.find((o: any) => o?.role?.includes('RO') || o?.role?.includes('Regional'))?.name 
    || officers[0]?.name || "NA";
  const foName = officers.find((o: any) => o?.role?.includes('FO') || o?.role?.includes('Field'))?.name 
    || officers[1]?.name || "NA";
  const ioName = officers.find((o: any) => o?.role?.includes('IO') || o?.role?.includes('Intelligence'))?.name 
    || officers[2]?.name || "NA";

  const rawRoAvatar = officers.find((o: any) => o?.role?.includes('RO'))?.profile_url || "";
  const rawFoAvatar = officers.find((o: any) => o?.role?.includes('FO'))?.profile_url || "";
  const rawIoAvatar = officers.find((o: any) => o?.role?.includes('IO'))?.profile_url || "";

  const isRoS3 = Boolean(rawRoAvatar && !rawRoAvatar.startsWith("http") && !rawRoAvatar.startsWith("data:"));
  const isFoS3 = Boolean(rawFoAvatar && !rawFoAvatar.startsWith("http") && !rawFoAvatar.startsWith("data:"));
  const isIoS3 = Boolean(rawIoAvatar && !rawIoAvatar.startsWith("http") && !rawIoAvatar.startsWith("data:"));

  const { data: roS3 } = useGeneratePresignedUrlQuery(rawRoAvatar, { skip: !isRoS3 });
  const { data: foS3 } = useGeneratePresignedUrlQuery(rawFoAvatar, { skip: !isFoS3 });
  const { data: ioS3 } = useGeneratePresignedUrlQuery(rawIoAvatar, { skip: !isIoS3 });

  const roAvatar = (isRoS3 ? roS3?.url : rawRoAvatar) || "https://ui-avatars.com/api/?name=RO&background=F3F4F6&color=164573";
  const foAvatar = (isFoS3 ? foS3?.url : rawFoAvatar) || "https://ui-avatars.com/api/?name=FO&background=F3F4F6&color=164573";
  const ioAvatar = (isIoS3 ? ioS3?.url : rawIoAvatar) || "https://ui-avatars.com/api/?name=IO&background=F3F4F6&color=164573";

  // Fee details extraction
  const fees = farmlandDetails?.fee_allocation || farmlandDetails?.fees || {};
  
  const [roFee, setRoFee] = useState<number>(fees?.ro_fee || fees?.regional_office_fee || 0);
  const [foFee, setFoFee] = useState<number>(fees?.fo_fee || fees?.field_office_fee || 0);
  const [ioFee, setIoFee] = useState<number>(fees?.io_fee || fees?.intelligence_officer_fee || 0);

  useEffect(() => {
    if (fees) {
      if (fees.ro_fee !== undefined || fees.regional_office_fee !== undefined) setRoFee(fees.ro_fee || fees.regional_office_fee);
      if (fees.fo_fee !== undefined || fees.field_office_fee !== undefined) setFoFee(fees.fo_fee || fees.field_office_fee);
      if (fees.io_fee !== undefined || fees.intelligence_officer_fee !== undefined) setIoFee(fees.io_fee || fees.intelligence_officer_fee);
    }
  }, [fees]);
  
  const formatFee = (val: number) => val === 0 ? "0" : val.toLocaleString('en-IN');
  const totalProcessingFee = formatFee(Number(roFee) + Number(foFee) + Number(ioFee));

  return (
    <div className="relative w-full h-full bg-[#F2F2F2] md:rounded-[32px] overflow-y-auto custom-scrollbar flex flex-col items-center">
      
      {/* Go Back Button */}
      <button
        onClick={onBack}
        className="absolute z-50 top-[16px] md:top-[37px] left-[20px] md:left-[24px] w-[52px] h-[52px] bg-[#FFFFFF] rounded-[60px] flex items-center justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
        title="Go back"
      >
        <ArrowLeft className="w-[24px] h-[24px] text-[#353535]" strokeWidth={1.4} />
      </button>

      <CheckmarkHeader />

      <div className="flex flex-col gap-[30px] w-full px-[20px] pb-[100px]" style={{ maxWidth: '1034px' }}>
        
        {/* Officer Fee Allocation Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[32px] pt-[24px] pb-[24px] shadow-sm">
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[34px] text-[#1A1C1C] px-[24px] mb-[24px]">
            Officer Fee Allocation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] px-[24px]">
            {/* RO Verification */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
                  <img src={fee4} alt="RO Verification" className="w-[14px] h-[12.5px] object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13.4px] leading-[20px] text-[#091426]">
                    RO Verification
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] leading-[13px] text-[#45474C]">
                    Regional Office documentation review
                  </span>
                </div>
              </div>
              <div className="relative w-full max-w-[236px] h-[50px] bg-[#F8F9FA] border border-[#E4E7EC] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="number" 
                  value={roFee} 
                  onChange={(e) => setRoFee(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full bg-transparent font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467] outline-none" 
                />
              </div>
            </div>

            {/* FO Ground Inspection */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
                  <img src={fee5} alt="FO Ground Inspection" className="w-[14px] h-[14px] object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13.4px] leading-[20px] text-[#091426]">
                    FO Ground Inspection
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] leading-[13px] text-[#45474C]">
                    Field Officer physical site audit
                  </span>
                </div>
              </div>
              <div className="relative w-full max-w-[236px] h-[50px] bg-[#F8F9FA] border border-[#E4E7EC] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="number" 
                  value={foFee} 
                  onChange={(e) => setFoFee(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full bg-transparent font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467] outline-none" 
                />
              </div>
            </div>

            {/* IO Intelligence Report */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
                  <img src={fee6} alt="IO Intelligence Report" className="w-[14px] h-[14px] object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13.4px] leading-[20px] text-[#091426]">
                    IO Intelligence Report
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] leading-[13px] text-[#45474C]">
                    Intelligence Officer risk assessment
                  </span>
                </div>
              </div>
              <div className="relative w-full max-w-[236px] h-[50px] bg-[#F8F9FA] border border-[#E4E7EC] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="number" 
                  value={ioFee} 
                  onChange={(e) => setIoFee(e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full bg-transparent font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467] outline-none" 
                />
              </div>
            </div>
          </div>

          <TotalSummary total={totalProcessingFee} />
        </div>

        {/* Verification Progress Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[32px] pt-[24px] pb-[24px] shadow-sm relative">
          
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[28px] text-[#251914] px-[24px] mb-[32px]">
            Verification Progress
          </h2>
          
          <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start px-[20px] md:px-[80px] mb-[40px] gap-[32px] md:gap-[0px]">

              {/* Step 1 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px] flex items-center justify-center text-gray-500">
                  {roAvatar ? <img src={roAvatar} alt={roName} className="w-full h-full object-cover" /> : <span className="text-[12px]">N/A</span>}
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {roName === 'NA' ? 'NA' : roName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Regional Office: <span className="font-normal text-[#717783]">Documentation review</span>
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px] flex items-center justify-center text-gray-500">
                  {foAvatar ? <img src={foAvatar} alt={foName} className="w-full h-full object-cover" /> : <span className="text-[12px]">N/A</span>}
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {foName === 'NA' ? 'NA' : foName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Field Office: <span className="font-normal text-[#717783]">Physical inspection</span>
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px] flex items-center justify-center text-gray-500">
                  {ioAvatar ? <img src={ioAvatar} alt={ioName} className="w-full h-full object-cover" /> : <span className="text-[12px]">N/A</span>}
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {ioName === 'NA' ? 'NA' : ioName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Intelligence Officer: <span className="font-normal text-[#717783]">Risk assessment</span>
                </span>
              </div>
            </div>

          <TotalSummary total={totalProcessingFee} />
        </div>
        
        {/* Proceed Button */}
        <div className="w-full flex justify-end mt-[10px]">
          <button 
            onClick={() => {
              if (!roName || roName === "NA" || !foName || foName === "NA" || !ioName || ioName === "NA") {
                toast.error("Please assign all 3 verification officers before proceeding.");
                return;
              }
              onProceed({ roFee, foFee, ioFee });
            }}
            className="flex items-center justify-center w-[107px] h-[40px] bg-[#2780C4] text-[#FFFFFF] rounded-[32px] font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] shadow-[0px_10px_15px_-3px_rgba(9,20,38,0.2),0px_4px_6px_-4px_rgba(9,20,38,0.2)] hover:bg-[#1f669d] transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>

    </div>
  );
}
