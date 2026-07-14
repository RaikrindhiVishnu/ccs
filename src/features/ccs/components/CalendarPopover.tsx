import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isBefore
} from 'date-fns';

type Props = {
  selectedDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: any;
  onClose: () => void;
  isInModal?: boolean;
  mode?: "start" | "end" | "range"; // Single date or range selection mode
};

export default function CalendarPopover({ 
  selectedDate, 
  startDate, 
  endDate, 
  onChange, 
  onClose, 
  isInModal = false, 
  mode = "start" 
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate : (startDate ? startDate : new Date())
  );
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate ?? null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate ?? null);
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustPosition = () => {
      if (!popoverRef.current) return;

      const rect = popoverRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const popoverWidth = 284;
      const popoverHeight = 364;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + 8;
      // Right-align by default for header elements on the right
      let left = rect.right - popoverWidth;

      // Check if popover would overflow to the left
      if (left < 8) {
        left = 8;
      }

      // Check if popover would overflow to the right
      if (left + popoverWidth > viewportWidth) {
        left = viewportWidth - popoverWidth - 8;
      }
      if (left < 8) left = 8; // Prevent going off left screen

      // Check if popover would overflow to the bottom
      if (top + popoverHeight > viewportHeight) {
        // Only flip to top if there is more space at the top than the bottom
        if (rect.top > viewportHeight - rect.bottom) {
          top = rect.top - popoverHeight - 8;
        }
      }

      popoverRef.current.style.position = 'fixed';
      popoverRef.current.style.top = `${top}px`;
      popoverRef.current.style.left = `${left}px`;
      popoverRef.current.style.zIndex = '9999';
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);
    window.addEventListener('scroll', adjustPosition, true);
    return () => {
      window.removeEventListener('resize', adjustPosition);
      window.removeEventListener('scroll', adjustPosition, true);
    };
  }, [isInModal]);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDateToRender = startOfWeek(monthStart);
  const endDateToRender = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDateToRender, end: endDateToRender });

  const handleDayClick = (day: Date) => {
    if (mode === "range") {
      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        setTempStartDate(day);
        setTempEndDate(null);
      } else if (tempStartDate && !tempEndDate) {
        if (isBefore(day, tempStartDate)) {
          setTempStartDate(day);
        } else {
          setTempEndDate(day);
        }
      }
    } else {
      setTempDate(day);
      if (onChange) onChange(day);
      onClose();
    }
  };

  const handleApply = () => {
    if (mode === "range" && tempStartDate && tempEndDate) {
      if (onChange) onChange(tempStartDate, tempEndDate);
      onClose();
    } else if (mode !== "range" && tempDate) {
      if (onChange) onChange(tempDate);
      onClose();
    }
  };

  return (
    <div ref={popoverRef} className={`fixed w-[284px] bg-[#FFFFFF] shadow-[0px_4px_6px_rgba(0,0,0,0.1),0px_10px_20px_rgba(0,0,0,0.15)] rounded-[12px] z-50 flex flex-col p-[16px] gap-[8px] max-h-[calc(100vh-12px)] overflow-y-auto pointer-events-auto`}>
      
      {/* Header */}
      <div className="flex items-center justify-between w-[252px] h-[32px] mx-auto">
        <button onClick={handlePrevMonth} className="flex items-center justify-center w-[32px] h-[32px] bg-[#FFFFFF] border border-[#DCE0E5] rounded-[8px] shadow-[inset_0px_12px_12px_rgba(255,255,255,0.12),inset_0px_-2px_2px_rgba(48,48,48,0.1)] transition-colors hover:bg-gray-50">
          <ArrowLeft className="w-[16px] h-[16px] text-[#14181F]" />
        </button>
        <span className="font-['Inter'] font-medium text-[15px] leading-[21px] text-center text-[#14181F] flex-1">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button onClick={handleNextMonth} className="flex items-center justify-center w-[32px] h-[32px] bg-[#FFFFFF] border border-[#DCE0E5] rounded-[8px] shadow-[inset_0px_12px_12px_rgba(255,255,255,0.12),inset_0px_-2px_2px_rgba(48,48,48,0.1)] transition-colors hover:bg-gray-50">
          <ArrowRight className="w-[16px] h-[16px] text-[#14181F]" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="flex items-center w-[252px] h-[36px] mx-auto mt-2">
        {daysOfWeek.map(day => (
          <div key={day} className="flex-1 flex items-center justify-center font-['Inter'] font-normal text-[15px] leading-[21px] text-[#6F7C8E]">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="w-[252px] mx-auto grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());
          
          let isSelected = false;
          let isInRange = false;
          let isStart = false;
          let isEnd = false;

          if (mode === "range") {
            isStart = tempStartDate ? isSameDay(day, tempStartDate) : false;
            isEnd = tempEndDate ? isSameDay(day, tempEndDate) : false;
            isSelected = isStart || isEnd;
            if (tempStartDate && tempEndDate && day > tempStartDate && day < tempEndDate) {
              isInRange = true;
            }
          } else {
            isSelected = tempDate ? isSameDay(day, tempDate) : false;
          }

          let bgClass = "bg-transparent";
          let textClass = isCurrentMonth ? "text-[#14181F]" : "text-[#6F7C8E]";
          let radiusClass = "rounded-[8px]";

          if (isSelected) {
            bgClass = "bg-[#2780C4]";
            textClass = "text-[#FFFFFF]";
            if (mode === "range") {
              if (isStart && !isEnd) radiusClass = "rounded-l-[8px]";
              else if (!isStart && isEnd) radiusClass = "rounded-r-[8px]";
              else if (isStart && isEnd) radiusClass = "rounded-[8px]";
            }
          } else if (isInRange) {
            bgClass = "bg-[#E0EDFF]";
            textClass = "text-[#14181F]";
            radiusClass = "rounded-none";
          } else if (isToday) {
            bgClass = "bg-[#E0EDFF]";
            textClass = "text-[#2780C4] font-bold";
          }

          return (
            <div 
              key={i} 
              onClick={() => handleDayClick(day)}
              className={`w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:bg-blue-100 ${bgClass} ${radiusClass} transition-colors`}
            >
              <span className={`font-['Inter'] font-medium text-[15px] leading-[21px] text-center ${textClass}`}>
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-[12px] w-[252px] mx-auto pt-[12px] border-t border-[#DCE0E5] mt-auto">
        {/* Date preview */}
        {mode === "range" ? (
          <div className="flex items-center gap-2 text-center justify-center text-[13px] text-[#14181F]">
            {tempStartDate && (
              <span className="font-medium text-[#2780C4]">
                {format(tempStartDate, "dd/MM/yyyy")}
              </span>
            )}
            {tempStartDate && tempEndDate && <span>-</span>}
            {tempEndDate && (
              <span className="font-medium text-[#2780C4]">
                {format(tempEndDate, "dd/MM/yyyy")}
              </span>
            )}
          </div>
        ) : (
          tempDate && (
            <div className="flex items-center gap-2 text-center justify-center text-[13px] text-[#14181F]">
              <span className="font-medium text-[#2780C4]">
                {format(tempDate, "dd/MM/yyyy")}
              </span>
            </div>
          )
        )}

        {/* Hint shown when only start date is picked in range mode */}
        {mode === "range" && tempStartDate && !tempEndDate && (
          <p className="text-center text-[11px] text-[#6F7C8E] font-['Inter'] leading-[16px] -mt-1">
            Now pick an end date
          </p>
        )}
        
        {/* Buttons */}
        <div className="flex items-center justify-end gap-[8px]">
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-[66px] h-[32px] bg-[#FFFFFF] border border-[#DCE0E5] rounded-[8px] shadow-[inset_0px_12px_12px_rgba(255,255,255,0.12),inset_0px_-2px_2px_rgba(48,48,48,0.1)] transition-colors hover:bg-gray-50"
          >
            <span className="font-['Inter'] font-medium text-[15px] leading-[21px] text-[#14181F]">
              Cancel
            </span>
          </button>
          {mode === "range" && (
            <button 
              onClick={handleApply}
              disabled={!tempStartDate || !tempEndDate}
              className="flex items-center justify-center w-[66px] h-[32px] bg-[#2780C4] rounded-[8px] transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              <span className="font-['Inter'] font-medium text-[15px] leading-[21px] text-[#FFFFFF]">
                Apply
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
