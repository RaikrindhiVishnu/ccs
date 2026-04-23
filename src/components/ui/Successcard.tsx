import { useEffect, useState } from "react";
import sucess from "@/assets/sucess.svg";
import mapImageDefault from "@/assets/map.svg";

interface SuccessCardProps {
  badgeLabel?: string;
  titleLine1?: string;
  titleLine2?: string;
  redirectText?: string;
  regionName?: string;
  assignedId?: string;
  createdDate?: string;
  createdTime?: string;
  mapImage?: string | null;
  onRedirect?: () => void;
  redirectDelay?: number;
}

/* 🔥 Animated Dots */
function AnimatedDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-[6px] items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block rounded-full transition-colors duration-300"
          style={{
            width: "clamp(8px, 0.9vw, 12px)",
            height: "clamp(8px, 0.9vw, 12px)",
            backgroundColor:
              i === active
                ? "var(--primary)"
                : "var(--primary-faded)",
          }}
        />
      ))}
    </div>
  );
}

/* 🔥 Map Placeholder */
function MapPlaceholder({ regionName }: { regionName: string }) {
  return (
    <svg viewBox="0 0 200 249" width="100%" height="100%">
      <rect width="200" height="249" fill="var(--primary-light)" />
      <polygon
        points="40,220 55,60 100,40 148,65 170,130 155,220 110,240 65,238"
        fill="var(--primary-light)"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="145"
        fontSize="12"
        fill="var(--primary)"
        textAnchor="middle"
        fontWeight="600"
      >
        {regionName}
      </text>
    </svg>
  );
}

/* 🔥 Icon */
function CheckBadgeIcon() {
  return (
    <svg viewBox="0 0 140 140" width="100%" height="100%">
      <rect width="140" height="140" rx="8" fill="var(--primary-soft)" />
      <circle cx="70" cy="70" r="36" fill="var(--primary-light)" />
      <path
        d="M52 70L65 83L90 57"
        stroke="var(--primary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Successcard({
  badgeLabel = "Region Creation",
  titleLine1 = "Region",
  titleLine2 = "Created Successfully!",
  redirectText = "Redirecting to the Home Page...",
  regionName = "Godavari",
  assignedId = "GLC R00012",
  createdDate = "4/18/2026",
  createdTime = "10:15 PM",
  mapImage = mapImageDefault,
  onRedirect,
  redirectDelay = 3000,
}: SuccessCardProps) {

  useEffect(() => {
    if (!onRedirect) return;
    const id = setTimeout(onRedirect, redirectDelay);
    return () => clearTimeout(id);
  }, [onRedirect, redirectDelay]);

  return (
    <>
      {/* ANIMATION */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-card {
          animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      {/* PAGE */}
      <div
        className="min-h-screen w-full flex items-center justify-center p-6"
        style={{
          backgroundColor: "var(--background)",
          fontFamily: "var(--font-sans)",
        }}
      >

        {/* CARD */}
        <div
          className="success-card w-full flex"
          style={{
            maxWidth: "clamp(700px, 90vw, 1301px)",
            minHeight: "clamp(400px, 71.5vh, 687px)",
            backgroundColor: "var(--card)",
            borderRadius: "clamp(24px, 3.3vw, 48px)",
            padding: "clamp(24px, 3vw, 48px) clamp(24px, 4vw, 91px)",
            gap: "clamp(24px, 4vw, 60px)",
          }}
        >

          {/* LEFT */}
          <div className="flex flex-col justify-between flex-1 min-w-0">

            {/* ICON + LABEL */}
            <div className="flex flex-col gap-2">
              <div
                style={{
                  width: "clamp(60px, 13.8vw, 200px)",
                  height: "clamp(80px, 13.8vw, 200px)",
                }}
              >
                <img
                  src={sucess}
                  alt="success"
                  className="w-full h-full object-contain"
                />
                <span className="ml-[clamp(12px,1.2vw,20px)]"
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 16px)",
                    fontWeight: 600,
                    color: "var(--muted)",
                   marginLeft: "clamp(12px, 1.2vw, 20px)",
                  }}
                >
                  {badgeLabel}
                </span>
              </div>

            </div>

            {/* TITLE */}
            <div style={{ lineHeight: 1.05 }}>
              <div
                style={{
                  fontSize: "clamp(28px, 4.1vw, 60px)",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                {titleLine1}
              </div>

              <div
                style={{
                  fontSize: "clamp(28px, 4.1vw, 60px)",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {titleLine2}
              </div>
            </div>

            {/* REDIRECT */}
            <div className="flex items-center gap-2">
              <AnimatedDots />
              <span
                style={{
                  fontSize: "clamp(13px, 1.25vw, 18px)",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                {redirectText}
              </span>
            </div>

          </div>

          {/* RIGHT */}
          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: "clamp(260px, 27vw, 390px)",
              gap: "clamp(16px, 2vh, 31px)",
            }}
          >

            {/* MAP */}
            <div
              className="w-full max-w-[clamp(180px,22vw,202px)] mx-auto overflow-hidden"
              style={{
                aspectRatio: "202.65 / 249",
                borderRadius: "clamp(8px, 0.8vw, 11px)",
              }}
            >
              {mapImage ? (
                <img src={mapImage} className="w-full h-full object-cover" />
              ) : (
                <MapPlaceholder regionName={regionName} />
              )}
            </div>

            {/* INFO GRID */}
            <div
              className="w-full"
              style={{
                backgroundColor: "var(--background)",
                padding: "clamp(16px, 1.9vw, 28px)",
                borderRadius: "clamp(16px,2.2vw,32px)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(12px, 1.5vh, 20px)",
              }}
            >
              {[
                { label: "REGION NAME", value: regionName },
                { label: "ASSIGNED ID", value: assignedId },
                { label: "CREATED DATE", value: createdDate },
                { label: "CREATED TIME", value: createdTime },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span
                    style={{
                      fontSize: "clamp(9px, 0.83vw, 12px)",
                      color: "var(--muted)",
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      fontSize: "clamp(11px, 0.97vw, 14px)",
                      fontWeight: 600,
                      color: "var(--foreground)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}