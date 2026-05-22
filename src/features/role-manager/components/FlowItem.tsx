import React from "react";
import { SquarePen, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <SquarePen
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

        <div className="flex flex-col gap-1.5 mt-2">
          <span className="text-sm font-semibold text-[#191B1C] font-sans leading-tight">
            {name} - {role}
          </span>
          <span className="text-xs text-[#626C70] font-sans leading-tight">
            Role ID - {roleId}
          </span>
          {contact && (
            <span className="text-xs text-[#626C70] font-sans leading-tight mt-0.5">
              Contact - {contact}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer group border",
        active
          ? "bg-(--brand-tint) border-(--brand-200)"
          : "hover:bg-(--brand-tint)/50 border-transparent",
      )}
    >
      <div className="flex items-center gap-3">
        {renderAvatar("w-10 h-10 text-xs")}
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[#191B1C] text-sm font-sans leading-tight">
            {name}
          </span>
          <span className="text-[11px] text-[#626C70] font-sans leading-tight">
            Role ID - {roleId}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <SquarePen
          size={14}
          className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500) transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        />
        <Eye
          size={14}
          className="text-(--text-muted-strong) cursor-pointer hover:text-(--brand-500) transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
        />
      </div>
    </div>
  );
};
