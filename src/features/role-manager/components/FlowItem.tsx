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
  onEdit?: () => void;
  onView?: () => void;
}

export const FlowItem: React.FC<FlowItemProps> = ({
  name,
  role,
  roleId,
  avatar,
  contact,
  variant = "compact",
  active = false,
  onClick,
  onEdit,
  onView,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const showInitials = !avatar || imgError;
  const initials = getInitials(name);

  const renderAvatar = (sizeClass: string) => {
    if (showInitials) {
      return (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-bold uppercase shrink-0",
            "bg-[color:var(--brand-tint)] text-[color:var(--brand-500)] border border-[color:var(--brand-200)]",
            sizeClass
          )}
        >
          {initials}
        </div>
      );
    }

    return (
      <img
        src={avatar}
        alt={name}
        onError={() => setImgError(true)}
        className={cn("rounded-full object-cover shrink-0", sizeClass)}
      />
    );
  };

  if (variant === "detailed") {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 p-4 rounded-2xl transition-all relative",
        )}
      >
        <div className="flex justify-between items-start">
          {renderAvatar("w-12 h-12 text-base")}
          <div className="flex gap-2">
            <Edit2
              size={16}
              className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500) transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            />
            <Eye
              size={16}
              className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500) transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Typography
            variant="p"
            className="text-sm font-semibold text-(--text-muted)"
          >
            {name} - {role}
          </Typography>
          <Typography variant="p" className="text-sm text-(--text-muted)">
            Role ID - {roleId}
          </Typography>
          {contact && (
            <Typography variant="p" className="text-sm text-(--text-muted)">
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
        active
          ? "bg-(--primaryz-soft) border-l-4 border-(--brand-500)"
          : "hover:bg-(--brand-tint)/50 border-l-4 border-transparent",
      )}
    >
      <div className="flex items-center gap-3">
        {renderAvatar("w-10 h-10 text-xs")}
        <div className="flex flex-col">
          <Typography
            variant="p"
            className="font-semibold text-(--text-heading) text-sm"
          >
            {name}
          </Typography>
          <Typography variant="p" className="text-[11px] text-(--text-muted)">
            Role ID - {roleId}
          </Typography>
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2
          size={14}
          className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500)"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        />
        <Eye
          size={14}
          className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500)"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
        />
      </div>
    </div>
  );
};
