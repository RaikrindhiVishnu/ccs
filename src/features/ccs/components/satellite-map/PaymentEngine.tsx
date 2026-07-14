import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import fee1 from "@/assets/fee1.svg";
import fee2 from "@/assets/fee2.svg";
import fee3 from "@/assets/fee3.svg";
import fee4 from "@/assets/fee4.svg";
import fee5 from "@/assets/fee5.svg";
import fee6 from "@/assets/fee6.svg";
import walletImage from "@/assets/wallet.svg";

export type PaymentEngineProps = {
  onBack: () => void;
  onSendRequest: () => void;
};

export default function PaymentEngine({ onBack, onSendRequest }: PaymentEngineProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <div className="relative w-full h-full bg-[#F2F2F2] md:rounded-[32px] overflow-y-auto custom-scrollbar flex flex-col pt-[32px] px-[52px] pb-[40px]">
      
      {/* Go Back Button */}
      <div className="mb-[32px]">
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

      <div className="flex flex-col xl:flex-row gap-[32px] w-full max-w-[1050px] mx-auto min-h-min pb-[40px]">
        
        {/* ASIDE - LEFT PANE: User Identity & Context */}
        <div className="flex flex-col gap-[24px] w-full xl:w-[362px] shrink-0">
          
          {/* User Profile Card */}
          <div className="relative bg-[#FFFFFF] border-[0.84px] border-[rgba(255,255,255,0.5)] rounded-[40px] shadow-[0px_20.9px_41.9px_-10px_rgba(9,20,38,0.05)] p-[26px] flex flex-col items-center">
            
            {/* Profile Picture */}
            <div className="relative w-[107px] h-[107px] mb-[20px]">
              <div className="absolute inset-[-3.3px] bg-gradient-to-tr from-[#00629E] to-[#BCD225] opacity-20 blur-[3.3px] rounded-full"></div>
              <img 
                src="https://i.pravatar.cc/150?u=ramudu" 
                alt="Ramudu Kumar" 
                className="relative w-full h-full object-cover rounded-full border-[3.3px] border-[#FFFFFF] shadow-[0px_16.7px_20.9px_-4.1px_rgba(0,0,0,0.1)]"
              />
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[20px] leading-[27px] tracking-[-0.5px] text-[#131600] mb-[3px]">
              Ramudu Kumar
            </h2>
            
            <div className="bg-[#E7E8E9] rounded-full px-[10px] py-[3.3px] mb-[13px]">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.4px] leading-[13px] tracking-[0.84px] uppercase text-[#45474C]">
                Senior Auditor
              </span>
            </div>

            {/* Contact Info */}
            <div className="w-full flex justify-between items-center py-[6.7px] border-b-[0.84px] border-[#F3F4F5] mt-[13px]">
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-[11.75px] leading-[17px] text-[#75777D]">
                Phone
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-medium text-[11.75px] leading-[17px] text-[#091426]">
                +91 98765 43210
              </span>
            </div>
            
            <div className="w-full flex justify-between items-center py-[6.7px] mb-[24px]">
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-[11.75px] leading-[17px] text-[#75777D]">
                Email
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-medium text-[11.75px] leading-[17px] text-[#091426]">
                ramudu.k@glc.com
              </span>
            </div>

            {/* Audit Context */}
            <div className="w-full flex flex-col gap-[13px]">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[13px] tracking-[1px] uppercase text-[#75777D] ml-[6.7px]">
                Audit Context
              </span>
              
              <div className="bg-[#F3F4F5] rounded-[26.8px] p-[13.4px] flex flex-col gap-[13.4px]">
                {/* Farmland ID */}
                <div className="flex gap-[13.4px]">
                  <div className="w-[18.4px] pt-[1.6px]"><img src={fee1} alt="Farmland ID" className="w-[13px] h-[13px] object-contain" /></div>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.4px] leading-[13px] tracking-[0.4px] uppercase text-[#75777D]">Farmland ID</span>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11.75px] leading-[17px] text-[#091426]">GLCSOS 01</span>
                  </div>
                </div>
                {/* Location */}
                <div className="flex gap-[13.4px]">
                  <div className="w-[18.4px] pt-[1.6px]"><img src={fee2} alt="Location" className="w-[13px] h-[13px] object-contain" /></div>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.4px] leading-[13px] tracking-[0.4px] uppercase text-[#75777D]">Location</span>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11.75px] leading-[17px] text-[#091426]">West Godavari, Tanuku</span>
                  </div>
                </div>
                {/* Status */}
                <div className="flex gap-[13.4px]">
                  <div className="w-[18.4px] pt-[1.6px]"><img src={fee3} alt="Status" className="w-[13px] h-[13px] object-contain" /></div>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.4px] leading-[13px] tracking-[0.4px] uppercase text-[#75777D]">Status</span>
                    <div className="flex items-center gap-[6.7px]">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11.75px] leading-[17px] text-[#091426]">Pending Final Clearance</span>
                      <div className="w-[6.7px] h-[6.7px] bg-[#FBBF24] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Portfolio Value Tile */}
          <div className="relative bg-[#091426] rounded-[40px] p-[26.8px] flex flex-col gap-[6.7px] overflow-hidden shrink-0 h-[105px]">
            <div className="absolute -right-[53.6px] -top-[53.7px] w-[107px] h-[107px] bg-[#2780C4] opacity-10 rounded-full z-0"></div>
            <span className="relative z-10 font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[13px] tracking-[1px] uppercase text-[rgba(240,241,242,0.6)]">
              Portfolio Value
            </span>
            <span className="relative z-10 font-['Plus_Jakarta_Sans'] font-bold text-[25px] leading-[30px] tracking-[-1.25px] text-[#FFFFFF]">
              ₹4.2 Cr
            </span>
          </div>

        </div>

        {/* SECTION - CENTER PANE: Payment Engine */}
        <div className="flex flex-col flex-1 w-full relative bg-[#FFFFFF] border-[0.84px] border-[rgba(255,255,255,0.5)] shadow-[0px_20.9px_41.9px_-10px_rgba(9,20,38,0.05)] rounded-[40px] overflow-hidden">
          
          {/* Main Card Content */}
          <div className="flex flex-col items-center pt-[27px] px-[27px] w-full pb-[20px]">
            
            {/* Dark Blue Total Fee Card */}
            <div className="relative w-full h-[259px] min-h-[251px] bg-[#091426] rounded-[26.8px] flex flex-col justify-center items-center overflow-hidden shrink-0">
              {/* Radial Gradient Background */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(54.59%_124.57%_at_50%_50%,#00629E_0%,rgba(0,98,158,0)_70%)] opacity-20"></div>
              
              {/* Wallet Icon */}
              <div className="relative z-10 mb-[26.8px] flex justify-center items-center">
                <div
                  className="
                    flex items-center justify-center
                    w-[67px]
                    h-[67px]
                    rounded-full
                    border-[4px]
                    border-white
                    bg-[#091426]
                    shadow-[0_0_0_5px_#B8D4E9,0_0_20px_rgba(39,128,196,0.3)]
                  "
                >
                  <img
                    src={walletImage}
                    alt="Wallet"
                    className="
                        w-[30px]
                        h-[30px]
                        object-contain
                    "
                  />
                </div>
                <div
                  className="
                    absolute inset-[-8px]
                    rounded-full
                    border-[3px]
                    border-[rgba(39,128,196,0.5)]
                    z-[-1]
                  "
                />
              </div>

              {/* Total Fee Label */}
              <span className="relative z-10 font-['Plus_Jakarta_Sans'] font-bold text-[11.75px] leading-[17px] tracking-[1.175px] uppercase text-[#BCC7DE] mb-[6.7px]">
                Total Processing Fee
              </span>
              
              {/* Fee Amount */}
              <span className="relative z-10 font-['Plus_Jakarta_Sans'] font-extrabold text-[40px] md:text-[50px] xl:text-[60.4px] leading-[60px] tracking-[-3px] text-[#FFFFFF] truncate w-full text-center">
                ₹15,000
              </span>
            </div>

            {/* Notification Text */}
            <div className="flex items-center justify-center gap-[6px] mt-[16px] mb-[24px]">
              <Check className="w-[12px] h-[12px] text-[#717783]" strokeWidth={3} />
              <span className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] leading-[17px] tracking-[0.36px] text-[#717783]">
                Notification will be sent to Investor
              </span>
            </div>

            {/* Fee Breakdown Container */}
            <div className="w-[483px] max-w-full flex flex-col gap-[20px] mb-[20px]">
              {/* Header */}
              <div className="flex items-center gap-[6.7px] w-full">
                <div className="w-[26.8px] h-[0.84px] bg-[#E7E8E9]"></div>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[13px] tracking-[1px] uppercase text-[#75777D]">
                  Fee Breakdown
                </span>
                <div className="flex-1 h-[0.84px] bg-[#E7E8E9]"></div>
              </div>

              {/* Breakdown List */}
              <div className="flex flex-col gap-[20px] w-full mt-[10px]">
                {/* RO Verification */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-[13.4px]">
                    <div className="w-[33.5px] h-[33.5px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
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
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15.1px] leading-[23px] text-[#091426]">
                    ₹5,000
                  </span>
                </div>

                {/* FO Ground Inspection */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-[13.4px]">
                    <div className="w-[33.5px] h-[33.5px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
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
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15.1px] leading-[23px] text-[#091426]">
                    ₹5,000
                  </span>
                </div>

                {/* IO Intelligence Report */}
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-[13.4px]">
                    <div className="w-[33.5px] h-[33.5px] bg-[#F3F4F5] rounded-full flex items-center justify-center shrink-0">
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
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15.1px] leading-[23px] text-[#091426]">
                    ₹5,000
                  </span>
                </div>
              </div>

              {/* Total Amount Due */}
              <div className="w-full flex justify-between items-center border-t-[1.67px] border-dashed border-[#E7E8E9] pt-[26.8px] mt-[6px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16.7px] leading-[23px] text-[#131600]">
                  Total Amount Due
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[25px] leading-[30px] text-[#131600]">
                  ₹15,000
                </span>
              </div>

            </div>
          </div>

          {/* Execution Console (Bottom Action Bar) */}
          <div className="w-full shrink-0 h-[148px] bg-[rgba(243,244,245,0.5)] border-t-[0.84px] border-[#E7E8E9] flex flex-col justify-start items-center p-[26.86px] gap-[13.43px]">
            <button 
              onClick={() => setShowSuccessModal(true)}
              className="w-[589.86px] max-w-full h-[67.14px] bg-[#2780C4] rounded-[40px] flex justify-center items-center hover:bg-[#1e6ca8] transition-colors"
              style={{
                boxShadow: "0px 16.7857px 20.9821px -4.19643px rgba(9, 20, 38, 0.2), 0px 6.71429px 8.39286px -5.03571px rgba(9, 20, 38, 0.2)"
              }}
            >
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16.7px] leading-[23px] tracking-[-0.41px] text-[#FFFFFF]">
                SEND FEE REQUEST TO INVESTOR
              </span>
            </button>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.4px] leading-[13px] tracking-[1.67px] uppercase text-[#75777D]">
              AUTHORIZED TRANSACTION VIA BIOMETRIC LINK
            </span>
          </div>

        </div>

      </div>

      {/* ── SUCCESS MODAL ── */}
      {showSuccessModal && (
        <div className="fixed z-[200] inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[4px]"></div>
          
          <div className="relative w-[90%] max-w-[576px] h-[469px] bg-[#FFFFFF] rounded-[24px] shadow-[0px_20px_40px_rgba(0,0,0,0.15)] flex flex-col items-center pt-[30px] pb-[40px] px-[56px] z-10">
            
            {/* Success Icon */}
            <div className="w-[80px] h-[80px] bg-[rgba(0,85,155,0.05)] rounded-full flex items-center justify-center mb-[16px] mt-[10px]">
              <div className="w-[36px] h-[36px] bg-[#00559B] rounded-full flex items-center justify-center">
                <Check className="w-[20px] h-[20px] text-[#FFFFFF]" strokeWidth={3} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-['Plus_Jakarta_Sans'] font-normal text-[28px] leading-[35px] tracking-[-0.7px] text-[#151C27] mb-[16px] text-center">
              Fee Request Sent Successfully
            </h2>

            {/* Description */}
            <p className="w-[449px] font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[26px] text-[#414751] text-center mb-[40px]">
              The fee request of <span className="font-bold">₹15,000</span> has been sent to the investor for approval. You will be notified once it is processed.
            </p>

            {/* Notification Pill */}
            <div className="flex items-center gap-[8px] h-[25px] bg-[#F0F3FF] rounded-full px-[16px] mb-[40px]">
              <div className="w-[6px] h-[6px] bg-[#FE9D1F] rounded-full"></div>
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[10px] leading-[13px] tracking-[1.5px] uppercase text-[#414751]">
                NOTIFICATION SENT TO INVESTOR
              </span>
            </div>

            {/* Back to dashboard button */}
            <button 
              onClick={onSendRequest}
              className="w-full max-w-[464px] h-[72px] bg-[#2880C4] rounded-[58px] shadow-[0px_4px_6px_-1px_rgba(0,85,155,0.1),0px_2px_4px_-2px_rgba(0,85,155,0.1)] flex justify-center items-center gap-[8px] hover:bg-[#1f669d] transition-colors"
            >
              <ArrowLeft className="w-[24px] h-[24px] text-[#FFFFFF]" />
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-[20px] leading-[24px] text-[#FFFFFF]">
                Back to dashboard
              </span>
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}
