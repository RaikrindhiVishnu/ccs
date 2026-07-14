import { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const initialNotifications = [
  {
    title: 'Urgent Action Required',
    date: 'Today',
    category: 'New Submission Aler',
    description: 'ALERT_01 submitted by agent Ram (25 lacs) is currently pending. Please review the farmland details to proceed.',
    time: '1:30PM',
    unread: true,
    descColor: '#868686',
    borderTop: 'rgba(0, 0, 0, 0.12)'
  },
  {
    title: 'Queue Management',
    date: 'Today',
    category: 'Manual Review Bottleneck',
    description: 'You currently have 24 submissions requiring manual review. Please process these to maintain your 1.2 Hrs average.',
    time: '10:30AM',
    unread: true,
    descColor: '#475569',
    borderTop: 'rgba(0, 0, 0, 0.04)'
  },
  {
    title: 'Performance Tracking',
    date: 'Yesterday',
    category: 'Screening Pace Update',
    description: "Your screening pace has increased by 2.1% this week, reaching 76%. Let's push to hit the >90% target!",
    time: '3:30PM',
    unread: false,
    descColor: '#475569',
    borderTop: 'rgba(0, 0, 0, 0.04)'
  },
  {
    title: 'Deployment Status',
    date: '22/05/26',
    category: 'Field Officer Update',
    description: 'Team A in the Hyderabad Zone is currently at 76% deployment capacity. Check GIS Map Activity.',
    time: '3:30PM',
    unread: false,
    descColor: '#475569',
    borderTop: 'rgba(0, 0, 0, 0.04)'
  }
];

export default function NotificationsPopover({ onClose }: { onClose?: () => void } = {}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate network delay
    setTimeout(() => {
      setNotifications(initialNotifications);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div ref={popoverRef} className="absolute right-0 top-[60px] w-[90vw] md:w-[380px] xl:w-[449px] max-w-[449px] h-[80vh] max-h-[594px] bg-[#FFFFFF] shadow-[0px_0px_8.1px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.08)] rounded-[24px] z-50 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[60px] px-[22px] pt-[20px] pb-[16px] shrink-0">
        <span className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[23px] text-[#000000]">
          Notifications
        </span>
        <div className="flex items-center gap-[18px]">
          <button 
            onClick={handleMarkAllRead}
            className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[18px] text-[#2780C4] hover:underline"
          >
            Mark all read
          </button>
          <button 
            onClick={handleRefresh}
            className="text-[rgba(0,0,0,0.52)] hover:text-black transition-colors"
          >
            <RefreshCw className={`w-[20px] h-[20px] ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto overscroll-contain relative scrollbar-hide">


        {notifications.map((item, i) => (
          <div 
            key={i} 
            className="flex items-start justify-between py-[20px] px-[20px] md:px-[29px]"
            style={{ borderTop: `1px solid ${item.borderTop}` }}
          >
            <div className="flex flex-col gap-[6px] flex-1 pr-[12px]">
              <div className="flex items-center gap-[10px]">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] leading-[22px] text-[#1E293B]">
                  {item.title}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] leading-[16px] text-[#94A3B8]">
                  {item.date}
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] bg-[#CBD5E1] rounded-full" />
                <span className="font-['Inter'] font-normal text-[12px] leading-[16px] text-[#94A3B8]">
                  {item.category}
                </span>
              </div>
              <p 
                className="font-['Plus_Jakarta_Sans'] font-normal text-[13px] leading-[18px] mt-[2px]"
                style={{ color: item.descColor }}
              >
                {item.description}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between self-stretch py-[4px] ml-[10px]">
              {item.unread ? (
                <div className="w-[8px] h-[8px] bg-[#2780C4] rounded-full mt-[2px]" />
              ) : (
                <div className="w-[8px] h-[8px]" />
              )}
              <span className="font-['Plus_Jakarta_Sans'] font-medium text-[10px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
