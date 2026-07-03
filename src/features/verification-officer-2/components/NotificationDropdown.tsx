import { RefreshCw } from 'lucide-react';
import { useEffect, useRef } from 'react';

const notifications = [
  {
    id: 1,
    title: 'Urgent Action Required',
    date: 'Today',
    subtitle: 'New Submission Alert',
    description: 'ALERT_01 submitted by agent Ram (25 lacs) is currently pending. Please review the farmland details to proceed.',
    time: '1:30PM',
    isNew: true
  },
  {
    id: 2,
    title: 'Queue Management',
    date: 'Today',
    subtitle: 'Manual Review Bottleneck',
    description: 'You currently have 24 submissions requiring manual review. Please process these to maintain your 1.2 Hrs average.',
    time: '10:30AM',
    isNew: true
  },
  {
    id: 3,
    title: 'Performance Tracking',
    date: 'Yesterday',
    subtitle: 'Screening Pace Update',
    description: "Your screening pace has increased by 2.1% this week, reaching 76%. Let's push to hit the >90% target!",
    time: '3:30PM',
    isNew: false
  },
  {
    id: 4,
    title: 'Deployment Status',
    date: '22/05/26',
    subtitle: 'Field Officer Update',
    description: 'Team A in the Hyderabad Zone is currently at 76% deployment capacity. Check GIS Map Activity.',
    time: '3:30PM',
    isNew: false
  }
];

export const NotificationDropdown = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-[calc(100%+24px)] right-0 w-[calc(100vw-32px)] sm:w-[449px] bg-white border border-black/10 rounded-[24px] shadow-[0px_10px_40px_rgba(0,0,0,0.1)] z-50 flex flex-col font-plus-jakarta origin-top-right animate-in fade-in zoom-in-95 duration-200" 
      style={{ maxHeight: 'min(594px, calc(100vh - 120px))' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-black/10 shrink-0">
        <h3 className="text-[18px] leading-[23px] font-medium text-black">Notifications</h3>
        <button className="text-black/50 hover:text-black transition-colors" aria-label="Refresh">
          <RefreshCw size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#89CCFF] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        {notifications.map((notif, index) => (
          <div key={notif.id} className={`flex justify-between px-6 py-5 ${index !== notifications.length - 1 ? 'border-b border-black/5' : ''}`}>
            
            {/* Left Content */}
            <div className="flex flex-col gap-1.5 flex-1 pr-4">
              <div className="flex items-center gap-3">
                <span className="text-[#1E293B] font-bold text-[15px] leading-[22px]">{notif.title}</span>
                <span className="text-[#94A3B8] font-medium text-[12px] leading-[16px]">{notif.date}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#CBD5E1]"></div>
                <span className="text-[#94A3B8] font-normal text-[12px] leading-[16px] font-inter">{notif.subtitle}</span>
              </div>
              
              <p className="text-[#475569] font-normal text-[13px] leading-[18px] mt-0.5">
                {notif.description}
              </p>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-between items-end shrink-0 w-[43px]">
              {notif.isNew ? (
                <div className="w-2 h-2 rounded-full bg-[#2780C4] mt-1"></div>
              ) : (
                <div className="w-2 h-2 mt-1"></div>
              )}
              <span className="text-[#94A3B8] font-medium text-[10px] leading-[16px]">{notif.time}</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
