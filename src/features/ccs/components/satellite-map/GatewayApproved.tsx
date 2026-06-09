import * as React from "react";
import { ArrowLeft, Check, Copy } from "lucide-react";

export type GatewayApprovedProps = {
  onBack: () => void;
  onProceed: () => void;
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

function TotalSummary() {
  return (
    <div className="w-full px-[40px] pt-[24px] border-t border-[rgba(0,0,0,0.15)] flex items-center justify-between mt-[24px]">
      <div className="flex flex-col gap-[4px]">
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] tracking-[0.14px] text-[#1A1C1C]">
          Total Processing Fee
        </span>
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[12px] leading-[16px] text-[#006141]">
          (Auto Calculated)
        </span>
      </div>
      <div className="flex items-center gap-[24px]">
        <div className="flex items-baseline gap-[8px]">
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] tracking-[0.14px] text-[#717783]">
            Total =
          </span>
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[34px] text-[#1A1C1C]">
            ₹15,000
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

export default function GatewayApproved({ onBack, onProceed }: GatewayApprovedProps) {
  return (
    <div className="relative w-full h-full bg-[#F2F2F2] md:rounded-[32px] overflow-y-auto custom-scrollbar flex flex-col items-center">
      
      {/* Go Back Button */}
      <div className="absolute top-[32px] left-[52px]">
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

      <div className="flex flex-col gap-[30px] w-full max-w-[1034px] px-[20px] pb-[100px]">
        
        {/* Officer Fee Allocation Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[32px] pt-[24px] pb-[24px] shadow-sm">
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[34px] text-[#1A1C1C] px-[24px] mb-[24px]">
            Officer Fee Allocation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] px-[24px]">
            {/* RO Verification */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center">
                  <Copy className="w-[14px] h-[14px] text-[#091426]" />
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
              <div className="relative w-full h-[50px] bg-[#FFFFFF] border border-[#C1C7D3] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="text" 
                  defaultValue="5,000" 
                  className="w-full font-['Plus_Jakarta_Sans'] font-normal text-[16px] text-[#1A1C1C] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* FO Ground Inspection */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center">
                  <Copy className="w-[14px] h-[14px] text-[#091426]" />
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
              <div className="relative w-full h-[50px] bg-[#FFFFFF] border border-[#C1C7D3] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="text" 
                  defaultValue="5,000" 
                  className="w-full font-['Plus_Jakarta_Sans'] font-normal text-[16px] text-[#1A1C1C] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* IO Intelligence Report */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[34px] h-[34px] bg-[#F3F4F5] rounded-full flex items-center justify-center">
                  <Copy className="w-[14px] h-[14px] text-[#091426]" />
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
              <div className="relative w-full h-[50px] bg-[#FFFFFF] border border-[#C1C7D3] rounded-[12px] flex items-center px-[16px]">
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] text-[#717783] mr-[8px]">₹</span>
                <input 
                  type="text" 
                  defaultValue="5,000" 
                  className="w-full font-['Plus_Jakarta_Sans'] font-normal text-[16px] text-[#1A1C1C] outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <TotalSummary />
        </div>

        {/* Verification Progress Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[32px] pt-[24px] pb-[24px] shadow-sm relative">
          
          <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[28px] text-[#251914] px-[24px] mb-[32px]">
            Verification Progress
          </h2>
          
          <div className="relative flex justify-between items-start px-[80px] mb-[40px]">
            {/* Connection Line */}
            <div className="absolute top-[28px] left-[150px] right-[150px] h-[1px] bg-[rgba(224,192,180,0.5)] z-0 hidden md:block"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center z-10 w-[200px]">
              <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                <img src="https://i.pravatar.cc/150?u=srikar" alt="Srikar Patel" className="w-full h-full object-cover" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px]">
                Srikar Patel
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                Regional Office: <span className="font-normal text-[#717783]">Documentation review</span>
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10 w-[200px]">
              <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                <img src="https://i.pravatar.cc/150?u=ananthu" alt="Ananthu" className="w-full h-full object-cover" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px]">
                Ananthu
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                Field Office: <span className="font-normal text-[#717783]">Physical inspection</span>
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10 w-[200px]">
              <div className="w-[56px] h-[56px] rounded-full border border-[rgba(224,192,180,0.5)] overflow-hidden bg-gray-200 mb-[16px]">
                <img src="https://i.pravatar.cc/150?u=yakoob" alt="Yakoob Syed" className="w-full h-full object-cover" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#251914] mb-[4px]">
                Yakoob Syed
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] leading-[18px] text-[#584239] text-center">
                Intelligence Officer: <span className="font-normal text-[#717783]">Risk assessment</span>
              </span>
            </div>
          </div>

          <TotalSummary />
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
