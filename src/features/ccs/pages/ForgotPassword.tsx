import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck } from 'lucide-react';
import { useForgotPasswordMutation } from '@/features/auth/api/authApi';
import FrameBg from '@/assets/ccs login.jpg';
import GlcLogo from '@/assets/glc-logo.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await forgotPassword({ login_id: email }).unwrap();
      navigate('/ccs/password-sent');
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to send password request.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
      <div className="relative w-full max-w-[1440px] min-h-screen lg:h-screen lg:max-h-[1024px] bg-[#F2F2F2] overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row items-center lg:justify-start">
        
        {/* Left Side - Image Background */}
        <div 
          className="relative w-full lg:flex-1 xl:flex-none xl:w-[720px] lg:m-[24px] xl:m-0 xl:ml-[80px] h-[35vh] min-h-[280px] lg:min-h-[500px] xl:min-h-0 lg:h-[calc(100%-48px)] xl:h-[calc(100%-80px)] lg:max-h-[840px] lg:rounded-[24px] bg-cover bg-center overflow-hidden flex flex-col justify-between shrink-0"
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
        <div className="w-full lg:flex-1 flex-1 lg:h-[calc(100%-48px)] xl:h-[calc(100%-80px)] lg:max-h-[840px] flex flex-col justify-between py-[32px] lg:py-[40px] px-6 lg:px-[40px] xl:px-0 xl:pl-[80px] xl:pr-[40px]">
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-[445px] mx-auto xl:mx-0 flex flex-col gap-[24px]">
              
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[42px] text-[#111827] m-0">
                  Forgot your password?
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#6B7280] m-0">
                  Enter your registered mail to receive a temporary password
                </p>
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-['Plus_Jakarta_Sans']">{error}</p>
                )}
              </div>

              <form className="flex flex-col gap-[24px] w-full" onSubmit={handleForgotSubmit}>
                <div className="flex flex-col gap-[12px] w-full">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#424751]">
                    Enter registered login ID
                  </label>
                  <div className="flex items-center w-full h-[56px] bg-[#F3F3F5] border border-[#0000001f] rounded-[32px] px-[24px] gap-[18px]">
                    <User className="text-[#6D7A7A] w-[13.33px] h-[13.33px] flex-shrink-0" strokeWidth={2} />
                    <input 
                      type="text" 
                      placeholder="Enter your registered login ID here" 
                      className="flex-1 bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-[16px] leading-[20px] text-black placeholder:text-[#6D7A7A]/30 w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-[52px] bg-[#3B75C3] shadow-[0px_10px_15px_-3px_rgba(24,92,168,0.2),0px_4px_6px_-4px_rgba(24,92,168,0.2)] hover:bg-[#2b5a99] disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] flex items-center justify-center border-none cursor-pointer mt-[8px] transition-colors relative isolation-auto"
                >
                  {isLoading ? 'Sending...' : 'Send password'}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full max-w-[445px] mx-auto xl:mx-0 flex items-center gap-[8px] lg:gap-[16px] mt-auto">
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
