import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';
import { setCredentials } from "@/features/auth/store/authSlice";
import { UserRole, ROLE_CODES } from "@/features/auth/types";
import FrameBg from '@/assets/ccs login.jpg';
import GlcLogo from '@/assets/glc-logo.svg';

export default function CCSLogin() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const mockUser = { login_id: "ccs@glc.com", password: "ccs@123456", role_id: UserRole.CCS, first_name: "CCS", last_name: "Officer", id: 103 };

    if (loginId === mockUser.login_id && password === mockUser.password) {
      const roleCode = ROLE_CODES[mockUser.role_id];
      dispatch(
          setCredentials({
            user: {
              id: mockUser.id,
              login_id: mockUser.login_id,
              first_name: mockUser.first_name,
              last_name: mockUser.last_name,
              role_id: mockUser.role_id,
              role: roleCode,
              is_first_login: 0,
            },
            accessToken: "mock-token-" + roleCode.toLowerCase(),
            refreshToken: "mock-refresh-" + roleCode.toLowerCase(),
          })
      );
      navigate('/ccs/dashboard');
    } else {
      setError('Invalid login ID or password.');
    }
  };

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
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:flex-1 h-[60vh] lg:h-[calc(100%-80px)] lg:max-h-[840px] flex flex-col justify-between py-[20px] lg:py-[40px] px-6 lg:px-0 lg:pl-[80px] lg:pr-[40px]">
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-[454px] mx-auto lg:mx-0 flex flex-col gap-[28px]">
              
              <div className="flex flex-col gap-3">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] lg:text-[40px] leading-[1.2] lg:leading-[50px] tracking-[-0.9px] text-[#1A1C1D] m-0">
                  Central Command<br/>System Login
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] lg:text-[16px] leading-[1.5] lg:leading-[26px] text-[#3D4949] m-0">
                  Secure access for authorized CCS. Please authenticate to continue.
                </p>
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-['Plus_Jakarta_Sans']">{error}</p>
                )}
              </div>

              <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] text-[#3D4949]">
                    Login ID
                  </label>
                  <div className="flex items-center w-full h-[56px] bg-[#F3F3F5] border border-black/10 rounded-[32px] px-6 gap-[18px]">
                    <User className="text-[#6D7A7A] w-[16px] h-[16px] flex-shrink-0" strokeWidth={2} />
                    <input 
                      type="text" 
                      placeholder="Enter your assigned ID" 
                      className="flex-1 bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-[16px] text-black placeholder:text-[#6D7A7A]/30 w-full"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] text-[#3D4949]">
                    Password
                  </label>
                  <div className="flex items-center w-full h-[56px] bg-[#F3F3F5] border border-black/10 rounded-[32px] px-6 gap-[18px]">
                    <Lock className="text-[#6D7A7A] w-[16px] h-[16px] flex-shrink-0" strokeWidth={2} />
                    <input 
                      type={showPw ? "text" : "password"} 
                      placeholder="Enter Password" 
                      className="flex-1 bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-[16px] text-black placeholder:text-[#6D7A7A]/30 w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="border-none bg-transparent cursor-pointer p-0 flex items-center justify-center flex-shrink-0">
                       {showPw ? <Eye className="text-[#6D7A7A] w-[18px] h-[18px]" /> : <EyeOff className="text-[#6D7A7A] w-[18px] h-[18px]" />}
                    </button>
                  </div>
                  <div className="w-full text-right mt-[4px]">
                     <button type="button" onClick={() => navigate('/ccs/forgot-password')} className="bg-transparent border-none p-0 cursor-pointer font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#3D4949] hover:underline">
                       Forgot Password?
                     </button>
                  </div>
                </div>

                <button type="submit" className="w-full h-[52px] bg-[#2780C4] hover:bg-[#206aa3] rounded-[48px] text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] flex items-center justify-center border-none cursor-pointer mt-[8px] transition-colors">
                  Login
                </button>
              </form>
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
