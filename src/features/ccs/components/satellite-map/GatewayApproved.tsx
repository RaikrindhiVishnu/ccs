import { ArrowLeft, Check } from "lucide-react";
import fee4 from "@/assets/fee4.svg";
import fee5 from "@/assets/fee5.svg";
import fee6 from "@/assets/fee6.svg";
export type GatewayApprovedProps = {
  onBack: () => void;
  onProceed: () => void;
  farmlandDetails?: any;
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

export default function GatewayApproved({ onBack, onProceed, farmlandDetails }: GatewayApprovedProps) {
  // Extract officers and fees safely
  const officers = farmlandDetails?.assigned_officers || farmlandDetails?.officers || [];
  
  // Try to find specific officers by role or fallback to default array positions if roles are not explicitly named
  const roName = officers.find((o: any) => o?.role?.includes('RO') || o?.role?.includes('Regional'))?.name 
    || officers[0]?.name || "Data not available";
  const foName = officers.find((o: any) => o?.role?.includes('FO') || o?.role?.includes('Field'))?.name 
    || officers[1]?.name || "Data not available";
  const ioName = officers.find((o: any) => o?.role?.includes('IO') || o?.role?.includes('Intelligence'))?.name 
    || officers[2]?.name || "Data not available";

  const roAvatar = officers.find((o: any) => o?.role?.includes('RO'))?.profile_url || "https://i.pravatar.cc/150?u=ro";
  const foAvatar = officers.find((o: any) => o?.role?.includes('FO'))?.profile_url || "https://i.pravatar.cc/150?u=fo";
  const ioAvatar = officers.find((o: any) => o?.role?.includes('IO'))?.profile_url || "https://i.pravatar.cc/150?u=io";

  // Fee details extraction
  const fees = farmlandDetails?.fee_allocation || farmlandDetails?.fees || {};
  const roFee = fees?.ro_fee || fees?.regional_office_fee || 0;
  const foFee = fees?.fo_fee || fees?.field_office_fee || 0;
  const ioFee = fees?.io_fee || fees?.intelligence_officer_fee || 0;
  
  const formatFee = (val: number) => val === 0 ? "0" : val.toLocaleString('en-IN');
  const totalProcessingFee = formatFee(Number(roFee) + Number(foFee) + Number(ioFee));

  return (
    <div className="relative w-full h-full bg-[#F2F2F2] md:rounded-[32px] overflow-y-auto custom-scrollbar flex flex-col items-center">
      
      {/* Go Back Button */}
      <div className="w-full flex justify-start pt-[24px] pl-[24px] md:absolute md:top-[32px] md:left-[52px] md:p-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-[8px] w-[135px] h-[52px] bg-[#FFFFFF] rounded-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-[24px] h-[24px] text-[#353535]" strokeWidth={1.4} />
          <span className="font-['Inter'] font-normal text-[16px] leading-[18px] text-[#353535]">
            Go back
          </span>
        </button>
      </div>

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
                <span className="w-full font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467]">
                  {formatFee(roFee)}
                </span>
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
                <span className="w-full font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467]">
                  {formatFee(foFee)}
                </span>
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
                <span className="w-full font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#475467]">
                  {formatFee(ioFee)}
                </span>
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
          
          {officers.length === 0 ? (
            <div className="flex w-full justify-center items-center py-8">
              <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] text-[#717783]">
                Data not available
              </span>
            </div>
          ) : (
            <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start px-[20px] md:px-[80px] mb-[40px] gap-[32px] md:gap-[0px]">
              {/* Connection Line */}
              <div className="absolute top-[28px] left-[150px] right-[150px] h-[1px] bg-[rgba(224,192,180,0.5)] z-0 hidden md:block"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                  <img src={roAvatar} alt={roName} className="w-full h-full object-cover" />
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {roName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Regional Office: <span className="font-normal text-[#717783]">Documentation review</span>
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                  <img src={foAvatar} alt={foName} className="w-full h-full object-cover" />
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {foName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Field Office: <span className="font-normal text-[#717783]">Physical inspection</span>
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center z-10 w-full md:w-[200px]">
                <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                  <img src={ioAvatar} alt={ioName} className="w-full h-full object-cover" />
                </div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px] text-center">
                  {ioName}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                  Intelligence Officer: <span className="font-normal text-[#717783]">Risk assessment</span>
                </span>
              </div>
            </div>
          )}

          <TotalSummary total={totalProcessingFee} />
        </div>
        
        {/* Proceed Button */}
        <div className="w-full flex justify-end mt-[10px]">
          <button 
            onClick={onProceed}
            className="flex items-center justify-center w-[107px] h-[40px] bg-[#2780C4] text-[#FFFFFF] rounded-[32px] font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] shadow-[0px_10px_15px_-3px_rgba(9,20,38,0.2),0px_4px_6px_-4px_rgba(9,20,38,0.2)] hover:bg-[#1f669d] transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>

    </div>
  );
}
