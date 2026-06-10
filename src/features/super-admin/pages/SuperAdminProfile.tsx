import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, LogOut, CheckCircle2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// Reusable toggle component
const CustomToggle = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2",
      checked ? "bg-[#4CAF50]" : "bg-gray-200"
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </button>
);

const SuperAdminProfile: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="box-border min-h-screen bg-[#F6F7F6] p-[clamp(16px,2vw,32px)] overflow-auto custom-scrollbar flex flex-col items-center">
      <div className="w-full max-w-[1000px] flex flex-col gap-6">
        
        {/* Go Back Button */}
        <div>
          <button
            onClick={() => navigate('/super-admin/dashboard')}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back to Dashboard
          </button>
        </div>

        {/* ── Main Profile Banner Card ── */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
          {/* Banner Image */}
          <div className="h-[180px] w-full bg-gray-200 relative">
            <img
              src="/super-admin/412454830_4ab87760-e674-4c28-80e0-4ba647ad5166 1.svg" 
              alt="Cover"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if that specific image isn't right for cover
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=300&fit=crop";
              }}
            />
          </div>

          {/* Profile Info Section */}
          <div className="relative px-8 pb-8 pt-4 flex items-center justify-between">
            {/* Avatar overlapping banner */}
            <div className="absolute -top-16 left-8">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Vikram Aditya"
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-sm"
              />
            </div>

            {/* Name & Role (pushed right to make room for avatar) */}
            <div className="ml-[140px] flex flex-col">
              <Typography variant="h3" className="font-bold text-[1.5rem] text-[#2D3032]">
                Vikram Aditya
              </Typography>
              <Typography variant="span" className="text-[0.875rem] text-gray-500 font-medium">
                Super Admin
              </Typography>
            </div>

            {/* Verification Badge */}
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full text-[#2196F3]">
              {/* Custom detailed verified star/check icon based on design */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9997 2.66699L19.4664 5.33366L23.7331 4.53366L25.3331 8.53366L29.3331 10.667L27.9997 14.9337L30.6664 18.4003L27.9997 21.867L29.3331 26.1337L25.3331 28.267L23.7331 32.267L19.4664 31.467L15.9997 34.1337L12.5331 31.467L8.26636 32.267L6.66636 28.267L2.66636 26.1337L4.00002 21.867L1.33335 18.4003L4.00002 14.9337L2.66636 10.667L6.66636 8.53366L8.26636 4.53366L12.5331 5.33366L15.9997 2.66699Z" fill="#2196F3"/>
                <path d="M11.3334 18.0003L14.6667 21.3337L21.3334 14.667" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Personal Details Form ── */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
          <Typography variant="h4" className="font-bold text-[1.25rem] text-[#2D3032]">
            Personal details
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">First name</label>
              <input 
                type="text" 
                defaultValue="Vikram"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">Last name</label>
              <input 
                type="text" 
                defaultValue="Aditya"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">Date Of Birth</label>
              <input 
                type="text" 
                defaultValue="21/11/1986"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">Phone number</label>
              <input 
                type="text" 
                defaultValue="+91 743 222 9999"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">Email</label>
              <input 
                type="text" 
                defaultValue="vikramaditya@gmail.com"
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.8125rem] font-medium text-gray-600">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  defaultValue="XXXXXXXXXXX"
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-200 bg-white text-[0.875rem] text-[#2D3032] focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Alerts ── */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
          <Typography variant="h4" className="font-bold text-[1.25rem] text-[#2D3032]">
            Alerts
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-between bg-white rounded-xl">
              <div className="flex flex-col gap-1">
                <h5 className="text-[0.875rem] font-bold text-[#2D3032]">Notifications</h5>
                <p className="text-[0.8125rem] text-gray-500">Receive updates via Notifications</p>
              </div>
              <CustomToggle checked={notifications} onChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between bg-white rounded-xl">
              <div className="flex flex-col gap-1">
                <h5 className="text-[0.875rem] font-bold text-[#2D3032]">SMS Alerts</h5>
                <p className="text-[0.8125rem] text-gray-500">Get important alerts via SMS</p>
              </div>
              <CustomToggle checked={smsAlerts} onChange={setSmsAlerts} />
            </div>
          </div>
        </div>

        {/* ── Want to logout? ── */}
        <div className="bg-white rounded-[24px] p-6 px-8 shadow-sm border border-gray-100 flex items-center justify-between">
          <Typography variant="h4" className="font-bold text-[1.125rem] text-[#2D3032]">
            Want to logout?
          </Typography>
          
          <button 
            onClick={() => navigate('/super-admin/login')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FFF0F0] text-[#FF4B4B] hover:bg-[#FFE5E5] transition-colors font-medium text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminProfile;
