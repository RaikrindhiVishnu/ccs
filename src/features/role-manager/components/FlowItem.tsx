import React from "react";
import { SquarePen, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";

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

  const isS3Key = Boolean(avatar && !avatar.startsWith("http") && !avatar.startsWith("data:"));
  const { data: s3Data } = useGeneratePresignedUrlQuery(avatar || "", { skip: !isS3Key });
  const finalUrl = isS3Key ? s3Data?.url : avatar;

  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const showInitials = !avatar || !finalUrl || imgError;
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
        src={finalUrl}
        alt={name}
        onError={() => setImgError(true)}
        className={cn("rounded-full object-cover shrink-0", sizeClass)}
      />
    );
  };

  if (variant === "detailed") {
    return (
      <div
        className="
          flex flex-col
          px-5 py-4
          min-h-[180px]
        "
      >
        <div className="flex items-start justify-between">
          {renderAvatar("w-12 h-12 min-[1920px]:w-16 min-[1920px]:h-16 min-[2560px]:w-20 min-[2560px]:h-20 text-base")}

          <div className="flex items-center gap-2">
            <SquarePen
              size={16}
              className="text-[#626C70] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            />

            <Eye
              size={16}
              className="text-[#626C70] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <span className="text-[15px] min-[1920px]:text-[18px] min-[2560px]:text-[22px] font-semibold text-[#191B1C] leading-[22px]">
            {name} - {role}
          </span>

          <span className="text-sm min-[1920px]:text-base min-[2560px]:text-lg text-[#626C70] leading-5">
            Role ID - {roleId}
          </span>

          {contact && (
            <span className="text-sm min-[1920px]:text-base min-[2560px]:text-lg text-[#626C70] leading-5">
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
        `
        flex items-center justify-between
        rounded-[20px]
        px-4 py-3
        min-h-[74px]
        border
        transition-all
        cursor-pointer
        `,
        active
          ? "bg-[#F3F8FF] border-[#B9D7FF]"
          : "border-transparent hover:bg-[#F8FAFB]"
      )}
    >
      <div className="flex items-center gap-3">
        {renderAvatar("w-11 h-11 min-[1920px]:w-14 min-[1920px]:h-14 min-[2560px]:w-18 min-[2560px]:h-18 text-xs")}

        <div className="flex flex-col">
          <span className="font-semibold text-[14px] text-[#191B1C] leading-5">
            {name}
          </span>

          <span className="text-xs text-[#626C70] leading-4">
            Role ID - {roleId}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SquarePen
          size={15}
          className="text-[#626C70] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
        />

        <Eye
          size={15}
          className="text-[#626C70] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
        />
      </div>
    </div>
  );
};
