import { useState, useRef, useEffect } from 'react';
import { CalendarDays, X } from 'lucide-react';
import { format } from 'date-fns';
import { Typography } from '@/components/ui/typography';
import widgetIcon from '/public/super-admin/icons/Widget.svg';
import bellIconSvg from '@/assets/bellicon.svg';
import CalendarPopover from './CalendarPopover';
import NotificationsPopover from './NotificationsPopover';

interface DashboardHeaderProps {
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: (date: Date | null) => void;
  setEndDate?: (date: Date | null) => void;
}

export default function DashboardHeader({ startDate, endDate, setStartDate, setEndDate }: DashboardHeaderProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    if (!showCalendar) return;
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCalendar]);

  // Close notifications when clicking outside
  useEffect(() => {
    if (!showNotifications) return;
    const handler = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotifications]);

  const formatRange = () => {
    if (!startDate) return null;
    if (startDate && !endDate) return format(startDate, 'MMM d, yyyy');
    return `${format(startDate, 'MMM d')} - ${format(endDate as Date, 'MMM d, yyyy')}`;
  };

  return (
    <div className="flex items-center justify-between relative z-20 gap-[8px]">
      <div className="flex items-center gap-[7.49px] shrink-0">
        <img
          src={widgetIcon}
          alt="Dashboard"
          className="h-[19.98px] w-[19.98px] shrink-0 object-contain rounded-[6.24px] brightness-0"
        />
        <Typography
          variant="h2"
          className="font-['Plus_Jakarta_Sans'] text-[14px] sm:text-[16px] font-normal leading-[25px] text-[#000000] whitespace-nowrap"
        >
          Dashboard
        </Typography>
      </div>

      <div className="flex items-center gap-[8px] min-w-0 flex-1 justify-end">

        {/* Custom Date Range Display */}
        {startDate && (
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#E1E5EF] min-w-0">
            <span className="text-[12px] sm:text-[14px] font-medium text-[#14181F] truncate">
              {formatRange()}
            </span>
            <button
              onClick={() => {
                if (setStartDate) setStartDate(null);
                if (setEndDate) setEndDate(null);
              }}
              className="text-[#6F7C8E] hover:text-[#EF4646] transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="relative z-50" ref={calendarRef}>
          <button
            onClick={() => {
              setShowCalendar(!showCalendar);
              setShowNotifications(false);
            }}
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[var(--brand-tint)] p-[8px]"
          >
            <CalendarDays className="h-[24px] w-[24px] text-[#000000]" strokeWidth={1.5} />
          </button>
          {showCalendar && (
            <CalendarPopover
              startDate={startDate}
              endDate={endDate}
              mode="range"
              onChange={(start: Date | null, end: Date | null) => {
                if (setStartDate) setStartDate(start);
                if (setEndDate) setEndDate(end);
              }}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowCalendar(false);
            }}
            className="relative flex items-center justify-center transition-transform hover:scale-105"
          >
            <img src={bellIconSvg} alt="Notifications" className="h-[52px] w-[52px]" />
            <span className="sr-only">Notifications</span>
          </button>
          {showNotifications && (
            <NotificationsPopover onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </div>
  );
}