import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    label: "Direct Referrals (Internal)",
    value: 366,
    color: "var(--brand-400)", // Medium Blue
  },
  {
    label: "Organic Web Traffic",
    value: 197,
    color: "var(--pie-4)", // Very Light Blue
  },
  {
    label: "Social Media Campaigns",
    value: 482,
    color: "var(--pie-1)", // Sky Blue
  },
  {
    label: "Industry Events & Expos",
    value: 202,
    color: "var(--pie-3)", // Dark Blue
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AgentAcquisitionSources({
  data = DEFAULT_DATA,
  title = "Workforce structure",
  subtitle = "Yearly overview of employee statuses",
  className,
}: Props) {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

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
            className="m-0 font-medium text-[clamp(0.875rem,1.5vw,1.25rem)] leading-[110%] text-[var(--text-primary)] font-[family-name:'Plus_Jakarta_Sans',sans-serif]"
          >
            {title}
          </Typography>

          <Typography
            as="p"
            variant="p"
            className="m-0 font-normal text-[clamp(0.6875rem,1vw,0.875rem)] leading-[110%] text-[var(--text-primary)] opacity-60 font-[family-name:'Plus_Jakarta_Sans',sans-serif]"
          >
            {subtitle}
          </Typography>
        </div>

        {/* Monthly pill */}
        <button
          type="button"
          className="box-border flex flex-row items-center justify-center shrink-0 px-2 py-1.5 gap-1 border border-[color:var(--text-primary)] rounded-[1.875rem] font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-normal text-xs leading-[1.33] text-[color:var(--text-primary)] cursor-pointer bg-transparent whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
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
            width: "clamp(8.5rem,14.5vw,14.5rem)",
            height: "clamp(8.5rem,14.5vw,14.5rem)",
          }}
        >
          {/* Outer ring border (extremely subtle guide circle) */}
          <div className="absolute inset-0 rounded-full border border-black/[0.04] box-border" />

          {/* Recharts PieChart */}
          <div className="w-full h-full absolute">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.map((d) => ({ name: d.label, value: d.value }))}
                  dataKey="value"
                  innerRadius="58%"
                  outerRadius="95%"
                  paddingAngle={4}
                  cornerRadius={8}
                  stroke="#ffffff"
                  strokeWidth={3}
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Inner circle content */}
          <div
            className="absolute rounded-full bg-[var(--priority-center-bg)] flex flex-col items-center justify-center pointer-events-none"
            style={{
              width: "50%",
              height: "50%",
            }}
          >
            <Typography
              as="span"
              className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-medium text-[clamp(0.65rem,0.75vw,0.875rem)] leading-[1.3] text-[color:var(--text-strong)] opacity-60"
            >
              Total
            </Typography>
            <Typography
              as="span"
              className="font-[family-name:'Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(1.25rem,1.65vw,2.15rem)] leading-[1.2] text-[color:var(--text-strong)]"
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
