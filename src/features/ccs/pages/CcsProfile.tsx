import { useState } from 'react';
import { ArrowLeft, Edit, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/core/hooks';
import { logOut } from '@/features/auth/store/authSlice';

export default function CcsProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex justify-center pb-[100px] overflow-y-auto font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-[1440px] px-[40px] xl:px-[98px] pt-[38px] flex flex-col">
        
        {/* Back Button */}
        <Link 
          to="/ccs/dashboard" 
          className="inline-flex self-start items-center gap-[8px] bg-[#FFFFFF] rounded-[60px] px-[20px] py-[15px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] transition-transform hover:-translate-x-1"
        >
          <ArrowLeft className="w-[24px] h-[24px] text-[#000000]" strokeWidth={1.5} />
          <span className="font-normal text-[16px] leading-[18px] text-[#000000]">Go Back to Dashboard</span>
        </Link>
        
        {/* Main Card Container */}
        <div className="mt-[52px] bg-[#FFFFFF] rounded-[46px] w-full flex flex-col items-center px-[20px] xl:px-[50px] py-[32px] gap-[34px]">
          
          {/* Profile Banner Card */}
          <div className="w-full xl:w-[1144px] h-[291px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] relative shrink-0">
            {/* Banner Background */}
            <div 
              className="absolute left-0 right-0 top-0 h-[181px] rounded-t-[24px] bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')` }}
            />
            
            {/* Profile Picture */}
            <img 
              src="/src/assets/prof.jpg" 
              alt="Profile" 
              className="absolute left-[41px] top-[93px] w-[176px] h-[176px] rounded-full object-cover border-[6px] border-[#FFFFFF] shadow-sm z-10 bg-[#FFFFFF]"
            />

            {/* Profile Name and Role */}
            <div className="absolute left-[237px] top-[206px] flex flex-col z-10">
              <span className="font-bold text-[24px] leading-[30px] text-[#000000]">Ram Varma</span>
              <span className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-60">CCS</span>
            </div>
          </div>

          {/* Personal Details Card */}
          <div className="w-full xl:w-[1144px] h-auto min-h-[274px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] p-[30px] shrink-0">
            <h2 className="font-semibold text-[24px] leading-[30px] text-[#000000] mb-[28px]">
              Personal details
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-[24px] gap-y-[28px]">
              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">First name</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">Ram</span>
                </div>
              </div>
              
              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Last name</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">Varma</span>
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Date Of Birth</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">03/09/1996</span>
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Phone number</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">+91 992 325 7593</span>
                </div>
              </div>

              {/* Field */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Email</label>
                <div className="w-full h-[40px] bg-[#FFFFFF] border border-[#E1E5EF] rounded-[12px] flex items-center px-[14px]">
                  <span className="font-normal text-[14px] text-[#000000]">ramvarmaradhrapu@gmail.com</span>
                </div>
              </div>

              {/* Password Action */}
              <div className="flex flex-col justify-between gap-[10px]">
                <label className="font-medium text-[16px] leading-[20px] text-[#000000] opacity-80">Password</label>
                <button className="w-full h-[40px] border border-[#2780C4] rounded-[12px] flex items-center justify-between px-[20px] hover:bg-[rgba(39,128,196,0.05)] transition-colors">
                  <span className="font-semibold text-[14px] leading-[20px] text-[#2780C4]">Update Your Password</span>
                  <Edit className="w-[18px] h-[18px] text-[#2780C4]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="w-full xl:w-[1144px] h-[151px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] p-[24px] xl:px-[30px] flex flex-col gap-[24px] shrink-0">
            <h2 className="font-semibold text-[24px] leading-[30px] text-[#000000]">
              Alerts
            </h2>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[8px]">
                <span className="font-semibold text-[18px] leading-[23px] text-[#000000] opacity-80">Notifications</span>
                <span className="font-normal text-[14px] leading-[18px] text-[#000000]">Receive updates via Notifications</span>
              </div>
              
              {/* Toggle switch */}
              <div 
                className={`relative w-[36px] h-[20px] rounded-full flex items-center px-[2px] cursor-pointer transition-colors ${alertsEnabled ? 'bg-[#4CAF50]' : 'bg-[#E0E0E0]'}`}
                onClick={() => setAlertsEnabled(!alertsEnabled)}
              >
                <div 
                  className={`w-[16px] h-[16px] bg-[#FFFFFF] rounded-full transition-transform ${alertsEnabled ? 'translate-x-[16px]' : 'translate-x-0'}`} 
                />
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="w-full xl:w-[1144px] h-[85px] bg-[#FFFFFF] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] rounded-[24px] flex items-center justify-between px-[30px] shrink-0">
            <span className="font-medium text-[18px] leading-[23px] text-[#000000]">
              Want to logout?
            </span>
            
            <button 
              onClick={handleLogout}
              className="bg-[rgba(249,34,34,0.08)] rounded-[8px] flex items-center justify-center gap-[8px] w-[124px] h-[44px] hover:bg-[rgba(249,34,34,0.12)] transition-colors"
            >
              <LogOut className="w-[20px] h-[20px] text-[#FF2D2D]" strokeWidth={2} />
              <span className="font-medium text-[16px] leading-[20px] text-[#FF2D2D]">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
