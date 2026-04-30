import React from "react";
import WorkforceDonut from "@/components/charts/WorkforceDonut";

type DataItem = {
  label: string;
  value: number;
  color: string;
  border?: string;
};

type Props = {
  data?: DataItem[];
};

const fallbackData: DataItem[] = [
  { label: "R.O.", value: 202, color: "var(--pie-3)" },
  { label: "I.O.", value: 202, color: "var(--pie-2)" },
  { label: "F.O.", value: 366, color: "var(--pie-4)", border: "1px solid var(--primary-light)" },
  { label: "Agents", value: 482, color: "var(--pie-1)" },
];

const WorkforceStructure: React.FC<Props> = ({ data = fallbackData }) => {
  return (
    <div
      className="card @container rounded-[var(--radius-xl)] shadow-[var(--shadow-card-sm)] p-[clamp(12px,4cqi,24px)_clamp(14px,5cqi,28px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-[clamp(8px,3cqi,16px)] shrink-0 gap-[8px]">
        <div className="min-w-0">
          <div className="font-sans font-medium text-[clamp(14px,4cqi,20px)] leading-[1.4] text-[var(--foreground)]">
            Workforce Structure
          </div>
          <div className="font-sans font-normal text-[clamp(11px,2.8cqi,14px)] leading-[1.4] text-[var(--muted)] mt-[2px]">
            Yearly overview of employee statuses
          </div>
        </div>

        {/* Year pill */}
        <div className="border border-[var(--border-strong)] rounded-[var(--btn-radius-pill)] p-[5px_4px_5px_8px] flex items-center gap-[2px] cursor-pointer shrink-0">
          <span className="font-sans font-normal text-[clamp(10px,2.5cqi,12px)] leading-[16px] text-[var(--foreground)]">
            2026
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-90 shrink-0">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-row items-center flex-1 min-h-0 gap-[clamp(10px,4cqi,20px)]">
        {/* Donut */}
        <div className="shrink-0 w-[clamp(64px,28cqi,140px)] aspect-square">
          <WorkforceDonut data={data} />
        </div>

        {/* Legend */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-[clamp(5px,2cqi,12px)]">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-[clamp(4px,1.5cqi,8px)]">
              {/* Color dot */}
              <div
                className="w-[clamp(6px,1.5cqi,9px)] h-[clamp(6px,1.5cqi,9px)] rounded-full shrink-0"
                style={{ background: item.color, border: item.border ?? "none" }}
              />

              {/* Label */}
              <span className="font-sans font-medium text-[clamp(9px,2.2cqi,11px)] leading-[1.3] text-[var(--foreground)] whitespace-nowrap shrink-0">
                {item.label}
              </span>

              {/* Dotted line */}
              <div className="flex-1 border-t border-dashed border-[var(--grid)] min-w-[4px]" />

              {/* Value */}
              <span className="font-sans font-medium text-[clamp(11px,3cqi,15px)] leading-[1.3] text-[var(--foreground)] shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkforceStructure;