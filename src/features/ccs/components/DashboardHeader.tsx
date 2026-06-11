import { useState } from 'react';
import { Bell, CalendarDays, X } from 'lucide-react';
import { format } from 'date-fns';
import { Typography } from '@/components/ui/typography';
import dashboardIcon from '@/assets/dashboard.svg';
import CalendarPopover from './CalendarPopover';
import NotificationsPopover from './NotificationsPopover';

export default function DashboardHeader() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Date range state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const formatRange = () => {
    if (!startDate) return null;
    if (startDate && !endDate) return format(startDate, 'MMM d, yyyy');
    return `${format(startDate, 'MMM d')} - ${format(endDate as Date, 'MMM d, yyyy')}`;
  };

  return (
    <div className="flex items-center justify-between relative z-20">
      <div className="flex items-center gap-[10px]">
        <img
          src={dashboardIcon}
          alt="Dashboard"
          className="h-[20px] w-[20px] shrink-0 object-contain"
        />
        <Typography
          variant="h2"
          className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold leading-[30px] text-[#000000]"
        >
          Dashboard
        </Typography>
      </div>

      <div className="flex items-center gap-[18px]">
        
        {/* Custom Date Range Display */}
        {startDate && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#E1E5EF]">
            <span className="text-[14px] font-medium text-[#14181F]">
              {formatRange()}
            </span>
            <button 
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              className="text-[#6F7C8E] hover:text-[#EF4646] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="relative z-50">
          <button 
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowNotifications(false);
            }}
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[var(--brand-tint)]"
          >
            <CalendarDays className="h-[24px] w-[24px] text-[#000000]" strokeWidth={1.5} />
          </button>
          {showCalendar && (
            <CalendarPopover 
              startDate={startDate}
              endDate={endDate}
              mode="range"
              onChange={(start: Date | null, end: Date | null) => {
                setStartDate(start);
                setEndDate(end);
              }}
              onClose={() => setShowCalendar(false)} 
            />
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowCalendar(false);
            }}
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[var(--brand-tint)]"
          >
            <div className="relative flex items-center justify-center h-[24px] w-[24px]">
              <span className="absolute right-0 top-0 h-[6px] w-[6px] rounded-full bg-[#EF4646]" />
              <Bell className="h-[24px] w-[24px] text-[#000000]" strokeWidth={1.5} />
            </div>
            <span className="sr-only">Notifications</span>
          </button>
          {showNotifications && (
            <NotificationsPopover />
          )}
        </div>
      </div>
    </div>
  );
}