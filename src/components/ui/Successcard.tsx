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

/* ── Animated Dots ── */
function AnimatedDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-[clamp(4px,0.5vw,8px)]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`inline-block rounded-full transition-colors duration-300 w-[clamp(7px,0.8vw,11px)] h-[clamp(7px,0.8vw,11px)] ${i === active ? "bg-[var(--brand-500)]" : "bg-[var(--brand-tint-strong)]"}`}
        />
      ))}
    </div>
  );
}

/* ── Map Placeholder ── */
function MapPlaceholder({ regionName }: { regionName: string }) {
  return (
    <svg viewBox="0 0 200 249" width="100%" height="100%">
      <rect width="200" height="249" fill="var(--brand-200)" />
      <polygon
        points="40,220 55,60 100,40 148,65 170,130 155,220 110,240 65,238"
        fill="var(--brand-200)"
        stroke="var(--brand-500)"
        strokeWidth="1.5"
      />
      <text
        x="100" y="145"
        fontSize="12"
        fill="var(--brand-500)"
        textAnchor="middle"
        fontWeight="600"
      >
        {regionName}
      </text>
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
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .success-card {
          animation: fadeSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
      <div
        className="w-full flex items-center justify-center min-h-screen p-[clamp(12px,2vw,24px)] bg-[var(--surface-page)] font-sans overflow-hidden"
      >
        {/* CARD */}
        <div
          className="success-card w-full flex max-w-[clamp(700px,90vw,1301px)] min-h-[clamp(380px,68vh,640px)] bg-[var(--surface-card)] rounded-[clamp(24px,3.3vw,48px)] p-[clamp(20px,2.5vw,40px)_clamp(20px,3vw,70px)] gap-[clamp(20px,3vw,48px)] overflow-hidden"
        >
          {/* ── LEFT ── */}
          <div className="flex flex-col justify-between flex-1 min-w-0">
            {/* ICON + LABEL */}
            <div className="flex flex-col gap-[clamp(6px,0.6vw,10px)]">
              <div className="w-[clamp(60px,13vw,180px)] h-[clamp(60px,13vw,180px)]">
                <img
                  src={sucess}
                  alt="success"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-[clamp(11px,1.1vw,16px)] font-semibold text-[var(--text-muted)] ml-[clamp(8px,2vw,20px)]">
                {badgeLabel}
              </span>
            </div>

            {/* TITLE */}
            <div className="leading-[1.05]">
              <div className="text-[clamp(26px,4vw,56px)] font-semibold text-[var(--brand-500)]">
                {titleLine1}
              </div>
              <div className="text-[clamp(26px,4vw,56px)] font-bold text-[var(--text-primary)]">
                {titleLine2}
              </div>
            </div>

            {/* REDIRECT */}
            <div className="flex items-center mt-0 gap-[clamp(6px,0.7vw,10px)]">
              <AnimatedDots />
              <span className="text-[clamp(13px,1.2vw,18px)] font-semibold text-[var(--brand-500)]">
                {redirectText}
              </span>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full max-w-[360px] min-w-[240px] gap-[clamp(14px,1.6vh,24px)] p-[clamp(14px,1.8vw,24px)] rounded-[clamp(20px,2vw,32px)] shadow-[0_10px_25px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
            {/* MAP */}
            <div className="w-full overflow-hidden max-w-[202.65px] min-w-[150px] aspect-[242.65/249] rounded-[11px] mx-auto">
              {mapImage ? (
                <img
                  src={mapImage}
                  alt={regionName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <MapPlaceholder regionName={regionName} />
              )}
            </div>

            {/* INFO GRID */}
            <div className="w-full bg-[var(--surface-page)] p-[clamp(12px,1.5vw,20px)] pl-[clamp(16px,2vw,28px)] rounded-[clamp(18px,2vw,28px)] grid grid-cols-2 gap-x-[clamp(16px,2vw,24px)] gap-y-[clamp(10px,1.2vh,18px)]">
              {[
                {
                  label: titleLine1 === "Area" ? "AREA NAME" : "REGION NAME",
                  value: regionName
                },
                { label: "ASSIGNED ID", value: assignedId },
                { label: "CREATED DATE", value: createdDate },
                { label: "CREATED TIME", value: createdTime },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-[clamp(10px,0.75vw,12px)] text-[var(--text-muted)] font-medium tracking-[0.03em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.label}
                  </span>

                  <span className="text-[clamp(11px,0.9vw,14px)] font-semibold text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
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