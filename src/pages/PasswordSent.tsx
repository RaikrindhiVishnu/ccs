import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FrameBg from '@/assets/ccs login.jpg';
import GlcLogo from '@/assets/glc-logo.svg';
import SharpIcon from '@/assets/sharp.svg';

export default function PasswordSent() {
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
          
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="w-full max-w-[445px] mx-auto lg:mx-0 flex flex-col items-center justify-center gap-[40px]">
              
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[32px] leading-[40px] text-black m-0 text-center">
                Password Sent Succesfully
              </h2>

              <div className="flex items-center justify-center w-[180px] h-[180px]">
                <img src={SharpIcon} alt="Verified" className="w-[180px] h-[180px]" />
              </div>

              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[20px] leading-[25px] text-[#3D4949] m-0 text-center max-w-[354px]">
                We Have Sent a Temporary Password to XXXXXXX@gmail.com
              </p>

              <button type="button" onClick={() => navigate('/ccs-login')} className="w-[204px] h-[64px] bg-[#2780C4] hover:bg-[#206aa3] rounded-full text-white font-['Plus_Jakarta_Sans'] font-semibold text-[24px] leading-[30px] flex items-center justify-center border-none cursor-pointer mt-[20px] transition-colors shadow-sm">
                Done
              </button>

            </div>
          </div>

          <div className="w-full max-w-[445px] mx-auto lg:mx-0 flex items-center gap-[8px] lg:gap-[16px] mt-auto">
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
