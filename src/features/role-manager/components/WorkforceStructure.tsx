import React, { useState, useRef, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

// ─── Types ────────────────────────────────────────────────────────────────────

type DataItem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data?: DataItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

// ─── Figma constants ──────────────────────────────────────────────────────────

const DEFAULT_DATA: DataItem[] = [
  {
    label: "Social Media Campaigns",
    value: 482,
    color: "var(--pie-3)",
  },
  {
    label: "Direct Referrals (Internal)",
    value: 366,
    color: "var(--brand-400)",
  },
  {
    label: "Industry Events & Expos",
    value: 202,
    color: "var(--pie-4)",
  },
  {
    label: "Organic Web Traffic",
    value: 197,
    color: "var(--pie-1)",
  },
];

// ─── Donut helpers ────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const GAP = 1.5;
  const s = polarToCartesian(cx, cy, r, startAngle + GAP);
  const e = polarToCartesian(cx, cy, r, endAngle - GAP);
  const large = endAngle - startAngle - GAP * 2 > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AgentAcquisitionSources({
  data = DEFAULT_DATA,
  title = "Agent Acquisition Sources",
  subtitle = "Platform registration channels for active agents.",
  className,
}: Props) {
  // ── Donut geometry ───────────────────────────────────────────────────────
  const CX = 104,
    CY = 104,
    R_OUTER = 97,
    R_INNER = 55;
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  const arcs = useMemo(() => {
    let angle = 0;
    return data.map((d) => {
      const sweep = (d.value / total) * 360;
      const start = angle;
      angle += sweep;
      return { ...d, start, end: angle };
    });
  }, [data, total]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Card
      className={`w-full h-full flex flex-col min-h-0 box-border bg-[color:var(--surface-card)] rounded-[2rem] shadow-[var(--shadow-card-sm)] p-[clamp(1rem,1.67vw,2rem)] ${className ?? ""}`}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-[clamp(0.75rem,1.5vh,1.5rem)] shrink-0">
        {/* Title + subtitle */}
        <div className="flex flex-col gap-0.5">
          <Typography
            as="p"
            variant="p"
            className="m-0 font-medium text-[clamp(0.875rem,1.5vw,1.25rem)] leading-[110%] text-[var(--text-primary)]"
          >
            {title}
          </Typography>

          <Typography
            as="p"
            variant="p"
            className="m-0 font-normal text-[clamp(0.6875rem,1vw,0.875rem)] leading-[110%] text-[var(--text-primary)] opacity-60"
          >
            {subtitle}
          </Typography>
        </div>

        {/* Monthly pill */}
        <button
          type="button"
          className="box-border flex flex-row items-center justify-center shrink-0 px-2 py-1.5 gap-1 border border-[color:var(--text-primary)] rounded-[1.875rem] font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-normal text-xs leading-[1.33] text-[color:var(--text-primary)] cursor-pointer bg-transparent whitespace-nowrap"
        >
          Monthly
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-90 shrink-0"
            aria-hidden
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Body: donut + legend ──────────────────────────────────────────── */}
      <div className="flex flex-row items-center flex-1 min-h-0 gap-[clamp(1rem,3vw,2rem)]">
        {/* ── Donut ────────────────────────────────────────────────────── */}
        <div
          className="relative shrink-0 flex items-center justify-center"
          style={{
            width: "clamp(7rem,13vw,13rem)",
            height: "clamp(7rem,13vw,13rem)",
          }}
        >
          {/* Outer ring border */}
          <div className="absolute inset-0 rounded-full border border-[color:var(--priority-ring-border)]" />

          {/* SVG donut */}
          <svg
            viewBox="0 0 208 208"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            {arcs.map((arc) => (
              <path
                key={arc.label}
                d={describeArc(
                  CX,
                  CY,
                  (R_OUTER + R_INNER) / 2,
                  arc.start,
                  arc.end,
                )}
                fill="none"
                stroke={arc.color}
                strokeWidth={R_OUTER - R_INNER}
                strokeLinecap="butt"
              />
            ))}
          </svg>

          {/* Inner circle */}
          <div
            className="relative z-10 flex flex-col items-center justify-center rounded-full"
            style={{
              width: "clamp(3.25rem,6.5vw,6.5rem)",
              height: "clamp(3.25rem,6.5vw,6.5rem)",
              background: "var(--priority-center-bg)",
            }}
          >
            <Typography
              as="span"
              variant="span"
              className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-medium text-[clamp(0.5rem,0.65vw,0.625rem)] leading-[1.3] text-[color:var(--text-strong)]"
            >
              Total
            </Typography>
            <Typography
              as="span"
              variant="span"
              className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-semibold text-[clamp(0.75rem,1.15vw,1.125rem)] leading-[1.28] text-[color:var(--text-strong)]"
            >
              {total.toLocaleString()}
            </Typography>
          </div>
        </div>

        {/* ── Legend ───────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center gap-[clamp(0.5rem,1.5vh,0.875rem)]">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-[0.4375rem]">
              {/* Dot */}
              <span
                aria-hidden
                className="inline-block rounded-full shrink-0"
                style={{
                  width: "clamp(0.375rem,0.56vw,0.5rem)",
                  height: "clamp(0.375rem,0.56vw,0.5rem)",
                  background: item.color,
                }}
              />

              {/* Label */}
              <Typography
                as="span"
                variant="span"
                className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-medium text-[clamp(0.5625rem,0.65vw,0.625rem)] leading-[1.3] shrink-0 text-[color:var(--text-strong)]"
              >
                {item.label}
              </Typography>

              {/* Dashed separator line */}
              <div
                className="flex-1 min-w-[0.625rem]"
                style={{
                  borderTop: "1px dashed #2C2C2C",
                  opacity: 0.08,
                }}
                aria-hidden
              />

              {/* Value */}
              <Typography
                as="span"
                variant="span"
                className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-medium text-[clamp(0.6875rem,0.9vw,0.875rem)] leading-[1.29] shrink-0 text-[color:var(--text-strong)]"
              >
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AgentAcquisitionSources;
