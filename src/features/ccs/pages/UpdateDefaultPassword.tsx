import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FrameBg from '@/assets/ccs login.jpg';
import GlcLogo from '@/assets/glc-logo.svg';

export default function UpdateDefaultPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
      <div className="relative w-full max-w-[1440px] h-screen max-h-[1024px] bg-[#F2F2F2] overflow-hidden flex flex-col lg:flex-row items-center lg:justify-start">
        
        {/* Left Side - Image Background */}
        <div 
          className="relative w-full lg:w-[720px] lg:ml-[80px] h-[40vh] lg:h-[calc(100%-80px)] lg:max-h-[840px] lg:rounded-[24px] bg-cover bg-center overflow-hidden flex flex-col justify-between shrink-0"
          style={{ backgroundImage: `url('${FrameBg}')` }}
        >
           {/* Top Left Logo */}
           <div className="p-4 lg:p-[32px]">
              <img src={GlcLogo} alt="Green Land Capital" className="w-[100px] lg:w-[134px] object-contain drop-shadow-md" />
           </div>

           <div className="w-full text-center mt-auto mb-8 lg:mb-[60px]">
             <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[28px] lg:text-[48px] leading-[1.2] lg:leading-[60px] text-white drop-shadow-lg">
               Welcome To<br/>Green Land Capital
             </h1>
             
             {/* Pagination Dots */}
             <div className="hidden lg:flex items-center justify-center gap-[8px] mt-[40px]">
               <div className="w-[36px] h-0 border-[4px] border-[#BDBDBD] rounded-full"></div>
               <div className="w-[36px] h-0 border-[4px] border-[#BDBDBD] rounded-full"></div>
               <div className="w-[54px] h-0 border-[4px] border-[#FFFFFF] rounded-full"></div>
             </div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:flex-1 h-[60vh] lg:h-[calc(100%-80px)] lg:max-h-[840px] flex flex-col justify-between py-[20px] lg:py-[40px] px-6 lg:px-0 lg:pl-[80px] lg:pr-[40px]">
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-[454px] mx-auto lg:mx-0 flex flex-col gap-[36px]">
              
              <div className="flex flex-col gap-3">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[42px] text-[#111827] m-0">
                  Update Default<br/>Password
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#6B7280] m-0">
                  You are currently logging in with a system-generated password sent to your email. For your security, we strongly recommend setting a new password now.
                </p>
              </div>

              <div className="flex flex-col gap-[22px] w-full">
                <button type="button" onClick={() => navigate('/ccs/change-password')} className="w-full h-[52px] bg-[#3B75C3] hover:bg-[#2b5a99] shadow-[0px_12px_48px_rgba(0,0,0,0.06)] rounded-full text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[16px] flex items-center justify-center border-none cursor-pointer transition-all">
                  Set new password
                </button>
                <button type="button" onClick={() => navigate('/ccs/login')} className="w-full py-2 bg-transparent text-[#424751] hover:text-[#2b3038] font-['Plus_Jakarta_Sans'] font-bold text-[15px] leading-[22px] flex items-center justify-center border-none cursor-pointer transition-colors">
                  Continue to login
                </button>
              </div>

            </div>
          </div>

          <div className="w-full max-w-[454px] mx-auto lg:mx-0 flex items-center gap-[8px] lg:gap-[16px] mt-auto">
             <ShieldCheck className="text-[#006D3A] w-[16px] h-[20px] flex-shrink-0" />
             <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] text-[#3D4949]/80">
               Secured by TechGy Innovations. End-to-end encrypted connection.
             </span>
          </div>

        </div>
      </div>
    </div>
  );
}
