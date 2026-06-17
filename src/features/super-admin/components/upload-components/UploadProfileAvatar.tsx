import React from "react";

interface UploadProfileAvatarProps {
  className?: string;
  style?: React.CSSProperties;
  avatarUrl?: string;
  onNotificationsClick?: () => void;
}

export const UploadProfileAvatar: React.FC<UploadProfileAvatarProps> = ({
  className = "",
  style,
  avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  onNotificationsClick,
}) => {
  return (
    <div
      className={`flex flex-row items-center p-0 select-none ${className}`}
      style={{
        gap: "clamp(0.58rem, 0.91vw, 1.09rem)", // 13.06px base
        width: "clamp(5.2rem, 8.13vw, 9.75rem)", // 117.06px base
        height: "clamp(2.31rem, 3.61vw, 4.33rem)", // 52px base
        ...style,
      }}
    >
      {/* ── Bell / Notifications Button (Frame 1171277098) ── */}
      <button
        type="button"
        onClick={onNotificationsClick}
        className="flex items-center justify-center p-2 bg-white rounded-full border-none cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-[0px_0px_4px_rgba(0,0,0,0.12)] shrink-0"
        style={{
          width: "clamp(2.31rem, 3.61vw, 4.33rem)", // 52px base
          height: "clamp(2.31rem, 3.61vw, 4.33rem)", // 52px base
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "clamp(1.07rem, 1.67vw, 2.0rem)", // 24px base
            height: "clamp(1.07rem, 1.67vw, 2.0rem)", // 24px base
          }}
        >
          {/* Bell outline */}
          <path
            d="M18 17H6C5.45 17 5 16.55 5 16V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V16C19 16.55 18.55 17 18 17Z"
            stroke="#2C2C2C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bell clapper */}
          <path
            d="M9.5 20C9.5 21.38 10.62 22.5 12 22.5C13.38 22.5 14.5 21.38 14.5 20"
            stroke="#2C2C2C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Red notification dot */}
          <circle cx="17.5" cy="7.5" r="3.5" fill="#EF4646" />
        </svg>
      </button>

      {/* ── Profile Avatar Container (Frame 2147239617) ── */}
      <div
        className="bg-white rounded-full overflow-hidden flex items-center justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.12)] shrink-0"
        style={{
          width: "clamp(2.31rem, 3.61vw, 4.33rem)", // 52px base
          height: "clamp(2.31rem, 3.61vw, 4.33rem)", // 52px base
          padding: "clamp(0.2rem, 0.3vw, 0.4rem)",
        }}
      >
        <img
          src={avatarUrl}
          alt="Profile Avatar"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default UploadProfileAvatar;
