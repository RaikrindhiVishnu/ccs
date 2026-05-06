import React from "react";
import { Edit2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface FlowItemProps {
  name: string;
  role: string;
  roleId: string;
  avatar: string;
  contact?: string;
  variant?: "detailed" | "compact";
  active?: boolean;
  onClick?: () => void;
}

export const FlowItem: React.FC<FlowItemProps> = ({
  name,
  role,
  roleId,
  avatar,
  contact,
  variant = "compact",
  active = false,
  onClick
}) => {
  if (variant === "detailed") {
    return (
      <div 
        className={cn(
          "flex flex-col gap-4 p-4 rounded-2xl transition-all relative",
          active ? "bg-[var(--tag-pill-bg)]" : "hover:bg-[var(--primary-soft)]"
        )}
      >
        <div className="flex justify-between items-start">
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover border border-[var(--border)]" />
          <div className="flex gap-2">
            <Edit2 size={16} className="text-(--muted-strong) cursor-pointer hover:text-[var(--primary)] transition-colors" />
            <Eye size={16} className="text-(--muted-strong) cursor-pointer hover:text-[var(--primary)] transition-colors" />
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <Typography variant="p" className="font-semibold text-(--text-dark)">
            {name} - {role}
          </Typography>
          <Typography variant="p" className="text-sm text-(--muted)">
            Role ID - {roleId}
          </Typography>
          {contact && (
            <Typography variant="p" className="text-sm text-(--muted)">
              Contact - {contact}
            </Typography>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer group",
        active ? "bg-[var(--primary-soft)] border-l-4 border-[var(--primary)]" : "hover:bg-[var(--primary-soft)]/50 border-l-4 border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <Typography variant="p" className="font-semibold text-[var(--text-dark)] text-sm">
            {name}
          </Typography>
          <Typography variant="p" className="text-[11px] text-[var(--muted)]">
            Role ID - {roleId}
          </Typography>
        </div>
      </div>
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 size={14} className="text-[var(--muted-strong)] cursor-pointer hover:text-[var(--primary)]" />
        <Eye size={14} className="text-[var(--muted-strong)] cursor-pointer hover:text-[var(--primary)]" />
      </div>
    </div>
  );
};
