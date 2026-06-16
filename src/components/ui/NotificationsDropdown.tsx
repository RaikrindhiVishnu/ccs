import * as React from "react";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationsDropdownProps {
  onClose: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ onClose }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const notifications = [
    {
      id: 1,
      title: "Alert: Batch of 15 Pending Farmlands...",
      type: "New update",
      desc: "A batch of farmlands has passed initial review. Please check zone assignments.",
      time: "1:30PM",
      isUnread: true,
    },
    {
      id: 2,
      title: "High Priority: Immediate Review For #1024",
      type: "Review Request",
      desc: "Marked as high priority. Needs environment impact validation before Friday.",
      time: "10:30AM",
      isUnread: true,
    },
    {
      id: 3,
      title: "Trend Alert: Critical Sunday Rejection Spike",
      type: "Regional Expansion",
      desc: "Significant rejection rate deviation. Investigate common rejection Causes",
      time: "3:30PM",
      isUnread: false,
    },
    {
      id: 4,
      title: "Information Uploaded: Environment Impact data for #315",
      type: "Regional Expansion",
      desc: "Social media Campaigns are currently your top registration channel.",
      time: "3:30PM",
      isUnread: false,
    },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      onClose();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute top-[calc(100%+0.75rem)] right-0
        w-[clamp(22rem,28vw,28rem)]
        bg-white
        border border-[rgba(0,0,0,0.08)]
        rounded-[24px]
        shadow-[0px_10px_30px_rgba(0,0,0,0.08)]
        z-50
        flex flex-col
        overflow-hidden
        animate-in fade-in slide-in-from-top-2 duration-200
      "
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-6 py-4">
        <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(1rem,1.25vw,1.4rem)] text-black">
          Notifications
        </span>
        <button
          onClick={handleRefresh}
          className="p-1 text-black/60 hover:text-black transition-colors cursor-pointer border-none bg-transparent"
        >
          <RefreshCw
            className={cn(
              "w-[clamp(1.1rem,1.39vw,1.6rem)] h-[clamp(1.1rem,1.39vw,1.6rem)]",
              isRefreshing && "animate-spin"
            )}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[rgba(0,0,0,0.12)] w-full" />

      {/* List */}
      <div
        className="
          flex-grow overflow-y-auto max-h-[clamp(24rem,30.8vw,35rem)]
          divide-y divide-[rgba(0,0,0,0.04)]
          scrollbar-thin scrollbar-thumb-[var(--brand-tint)]
        "
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "p-6 flex flex-col gap-2 transition-colors hover:bg-slate-50 cursor-pointer relative",
              n.isUnread && "bg-slate-50/50"
            )}
          >
            {/* Top row: Title & unread dot */}
            <div className="flex flex-row justify-between items-start gap-4">
              <h4 className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.85rem,1.04vw,1.2rem)] text-[#1E293B] leading-snug">
                {n.title}
              </h4>
              {n.isUnread && (
                <span className="w-2 h-2 rounded-full bg-[#7A951C] shrink-0 mt-1.5" />
              )}
            </div>

            {/* Subtitle / category */}
            <div className="flex items-center gap-1.5 text-[clamp(0.7rem,0.83vw,0.95rem)] text-[#94A3B8] font-medium font-[family-name:var(--font-sans)]">
              <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
              <span>{n.type}</span>
            </div>

            {/* Description */}
            <p className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.75rem,0.9vw,1.05rem)] text-[#868686] leading-relaxed pr-6">
              {n.desc}
            </p>

            {/* Bottom time stamp */}
            <div className="flex justify-end text-[clamp(0.65rem,0.76vw,0.9rem)] text-[#94A3B8] font-medium font-[family-name:var(--font-sans)] mt-1">
              {n.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
