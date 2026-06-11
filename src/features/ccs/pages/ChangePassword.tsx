import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import FrameBg from '@/assets/ccs login.jpg';
import GlcLogo from '@/assets/glc-logo.svg';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
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
            <div className="w-full max-w-[445px] mx-auto lg:mx-0 flex flex-col gap-[24px]">
              
              <div className="flex flex-col gap-[8px] mb-[12px]">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[42px] text-[#111827] m-0">
                  Change password
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#6B7280] m-0">
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </div>

              <form className="flex flex-col gap-[24px] w-full" onSubmit={(e) => { e.preventDefault(); navigate('/ccs/login'); }}>
                <div className="flex flex-col gap-[12px] w-full">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#424751]">
                    New Password
                  </label>
                  <div className="flex items-center w-full h-[56px] bg-[#F3F3F5] border border-[#0000001f] rounded-[32px] px-[24px] gap-[18px]">
                    <Lock className="text-[#6D7A7A] w-[13.33px] h-[17.5px] flex-shrink-0" strokeWidth={2} />
                    <input 
                      type={showNewPw ? "text" : "password"} 
                      placeholder="Enter your password" 
                      className="flex-1 bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[20px] text-black placeholder:text-[#6D7A7A]/30 w-full"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="border-none bg-transparent cursor-pointer p-0 flex items-center justify-center flex-shrink-0">
                       {showNewPw ? <Eye className="text-[#9CA3AF] w-[18px] h-[18px]" /> : <EyeOff className="text-[#9CA3AF] w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] w-full">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#424751]">
                    Confirm New Password
                  </label>
                  <div className="flex items-center w-full h-[56px] bg-[#F3F3F5] border border-[#0000001f] rounded-[32px] px-[24px] gap-[18px]">
                    <Lock className="text-[#6D7A7A] w-[13.33px] h-[17.5px] flex-shrink-0" strokeWidth={2} />
                    <input 
                      type={showConfirmPw ? "text" : "password"} 
                      placeholder="Re-enter new password" 
                      className="flex-1 bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[20px] text-black placeholder:text-[#6D7A7A]/30 w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="border-none bg-transparent cursor-pointer p-0 flex items-center justify-center flex-shrink-0">
                       {showConfirmPw ? <Eye className="text-[#9CA3AF] w-[18px] h-[18px]" /> : <EyeOff className="text-[#9CA3AF] w-[18px] h-[18px]" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full h-[52px] bg-[#3B75C3] shadow-[0px_10px_15px_-3px_rgba(24,92,168,0.2),0px_4px_6px_-4px_rgba(24,92,168,0.2)] hover:bg-[#2b5a99] rounded-full text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] flex items-center justify-center border-none cursor-pointer mt-[8px] transition-colors relative isolation-auto">
                  Update password
                </button>
              </form>
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
