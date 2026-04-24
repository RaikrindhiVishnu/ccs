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
    <div className="flex items-center" style={{ gap: "clamp(4px, 0.5vw, 8px)" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block rounded-full transition-colors duration-300"
          style={{
            width: "clamp(7px, 0.8vw, 11px)",
            height: "clamp(7px, 0.8vw, 11px)",
            backgroundColor: i === active ? "var(--primary)" : "var(--primary-faded)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Map Placeholder ── */
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
        x="100" y="145"
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
        className="w-full flex items-center justify-center"
        style={{
          minHeight: "100dvh",
          padding: "clamp(12px, 2vw, 24px)",
          backgroundColor: "var(--background)",
          fontFamily: "var(--font-sans)",
          overflow: "hidden",
        }}
      >

        {/* CARD */}
        <div
          className="success-card w-full flex"
          style={{
            maxWidth: "clamp(700px, 90vw, 1301px)",
            minHeight: "clamp(380px, 68vh, 640px)",
            backgroundColor: "var(--card)",
            borderRadius: "clamp(24px, 3.3vw, 48px)",
            padding: "clamp(20px, 2.5vw, 40px) clamp(20px, 3vw, 70px)",
            gap: "clamp(20px, 3vw, 48px)",
            overflow: "hidden",
          }}
        >

          {/* ── LEFT ── */}
          <div className="flex flex-col justify-between flex-1 min-w-0">

            {/* ICON + LABEL */}
            <div className="flex flex-col" style={{ gap: "clamp(6px, 0.6vw, 10px)" }}>
              <div
                style={{
                  width: "clamp(60px, 13vw, 180px)",
                  height: "clamp(60px, 13vw, 180px)",
                }}
              >
                <img
                  src={sucess}
                  alt="success"
                  className="w-full h-full object-contain"
                />
              </div>

              <span
                style={{
                  fontSize: "clamp(11px, 1.1vw, 16px)",
                  fontWeight: 600,
                  color: "var(--muted)",
                  marginLeft: "clamp(8px, 2vw, 20px)",
                }}
              >
                {badgeLabel}
              </span>
            </div>

            {/* TITLE */}
            <div style={{ lineHeight: 1.05 }}>
              <div
                style={{
                  fontSize: "clamp(26px, 4vw, 56px)",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                {titleLine1}
              </div>
              <div
                style={{
                  fontSize: "clamp(26px, 4vw, 56px)",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {titleLine2}
              </div>
            </div>

            {/* REDIRECT */}
            <div className="flex items-center mt-0" style={{ gap: "clamp(6px, 0.7vw, 10px)" }}>
              <AnimatedDots />
              <span
                style={{

                  fontSize: "clamp(13px, 1.2vw, 18px)",
                  fontWeight: 600,
                  color: "var(--primary)",
                }}
              >
                {redirectText}
              </span>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div
            className="flex flex-col items-center justify-center flex-shrink-0"
            style={{
              width: "100%",
              maxWidth: "360px",
              minWidth: "240px",
              gap: "clamp(14px, 1.6vh, 24px)",
              padding: "clamp(14px, 1.8vw, 24px)",
              borderRadius: "clamp(20px, 2vw, 32px)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
              background: "#fff",
              overflow: "hidden",
            }}
          >

            {/* MAP */}
            <div
              className="w-full overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "202.65px",
                minWidth: "150px",
                aspectRatio: "242.65 / 249",
                borderRadius: "11px",
                margin: "0 auto",
              }}
            >
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
            <div
              className="w-full"
              style={{
                backgroundColor: "var(--background)",
                padding: "clamp(12px, 1.5vw, 20px)",
                paddingLeft: "clamp(16px, 2vw, 28px)", // 🔥 push content right
                borderRadius: "clamp(18px, 2vw, 28px)",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                columnGap: "clamp(16px, 2vw, 24px)",
                rowGap: "clamp(10px, 1.2vh, 18px)",
              }}
            >
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
                  <span
                    style={{
                      fontSize: "clamp(10px, 0.75vw, 12px)",
                      color: "var(--muted)",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      fontSize: "clamp(11px, 0.9vw, 14px)",
                      fontWeight: 600,
                      color: "var(--foreground)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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