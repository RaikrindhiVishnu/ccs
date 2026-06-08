import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isWithinInterval, isBefore
} from 'date-fns';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
};

export default function CalendarPopover({ startDate, endDate, onChange, onClose }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStart, setTempStart] = useState<Date | null>(startDate);
  const [tempEnd, setTempEnd] = useState<Date | null>(endDate);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDateToRender = startOfWeek(monthStart);
  const endDateToRender = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDateToRender, end: endDateToRender });

  const handleDayClick = (day: Date) => {
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(day);
      setTempEnd(null);
    } else if (tempStart && !tempEnd) {
      if (isBefore(day, tempStart)) {
        setTempStart(day);
      } else {
        setTempEnd(day);
      }
    }
  };

  const handleDone = () => {
    onChange(tempStart, tempEnd);
    onClose();
  };

  return (
    <div className="absolute right-0 top-[60px] w-[284px] h-[364px] bg-[#FFFFFF] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[8px] z-50 flex flex-col p-[16px] gap-[8px]">
      
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
      <div className="w-[252px] h-[196px] mx-auto flex flex-wrap content-start">
        {days.map((day, i) => {
          const isSelectedStart = tempStart && isSameDay(day, tempStart);
          const isSelectedEnd = tempEnd && isSameDay(day, tempEnd);
          const isWithin = tempStart && tempEnd && isWithinInterval(day, { start: tempStart, end: tempEnd }) && !isSelectedStart && !isSelectedEnd;
          const isCurrentMonth = isSameMonth(day, currentMonth);

          let bgClass = "bg-transparent";
          let textClass = isCurrentMonth ? "text-[#14181F]" : "text-[#6F7C8E]";
          let radiusClass = "rounded-[8px]";

          if (isSelectedStart) {
            bgClass = "bg-[#2780C4]";
            textClass = "text-[#FFFFFF]";
            radiusClass = tempEnd ? "rounded-l-[8px] rounded-r-none" : "rounded-[8px]";
          } else if (isSelectedEnd) {
            bgClass = "bg-[#2780C4]";
            textClass = "text-[#FFFFFF]";
            radiusClass = "rounded-r-[8px] rounded-l-none";
          } else if (isWithin) {
            bgClass = "bg-[#E0EDFF]";
            textClass = "text-[#14181F]";
            radiusClass = "rounded-none";
          }

          // Force same day selection to be fully rounded
          if (isSelectedStart && isSelectedEnd) {
             radiusClass = "rounded-[8px]";
          }

          return (
            <div 
              key={i} 
              onClick={() => handleDayClick(day)}
              className={`w-[36px] h-[36px] flex items-center justify-center cursor-pointer hover:bg-blue-50 ${bgClass} ${radiusClass}`}
            >
              <span className={`font-['Inter'] font-medium text-[15px] leading-[21px] text-center ${textClass}`}>
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end w-[252px] h-[44px] mx-auto pt-[12px] gap-[8px] border-t border-[#DCE0E5] mt-auto">
        <button 
          onClick={onClose}
          className="flex items-center justify-center w-[66px] h-[32px] bg-[#FFFFFF] border border-[#DCE0E5] rounded-[8px] shadow-[inset_0px_12px_12px_rgba(255,255,255,0.12),inset_0px_-2px_2px_rgba(48,48,48,0.1)] transition-colors hover:bg-gray-50"
        >
          <span className="font-['Inter'] font-medium text-[15px] leading-[21px] text-[#14181F]">
            Cancel
          </span>
        </button>
        <button 
          onClick={handleDone}
          className="flex items-center justify-center w-[54px] h-[32px] bg-[#2780C4] rounded-[8px] shadow-[inset_0px_12px_12px_rgba(255,255,255,0.12),inset_0px_-2px_2px_rgba(48,48,48,0.1)] transition-colors hover:bg-blue-600"
        >
          <span className="font-['Inter'] font-medium text-[15px] leading-[21px] text-[#FFFFFF]">
            Done
          </span>
        </button>
      </div>
    </div>
  );
}
