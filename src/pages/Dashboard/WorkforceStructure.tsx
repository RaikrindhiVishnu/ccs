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
  { label: "R.O.", value: 202, color: "#1D4E77" },
  { label: "I.O.", value: 202, color: "#2780C4" },
  { label: "F.O.", value: 366, color: "#87C0E4", border: "1px solid rgba(39, 128, 196, 0.2)" },
  { label: "Agents", value: 482, color: "#C6E1F4" },
];

const WorkforceStructure: React.FC<Props> = ({ data = fallbackData }) => {
  return (
    <div className="card p-[clamp(12px,2vw,24px)_clamp(16px,2.5vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[clamp(12px,2vh,24px)] shrink-0">
        <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
          <div className="font-sans font-medium text-[clamp(14px,1.5vw,20px)] leading-tight text-[var(--foreground)]">
            Workforce Structure
          </div>
          <div className="font-sans font-normal text-[clamp(11px,1vw,14px)] leading-tight text-[var(--foreground)] opacity-60">
            Yearly overview of employee statuses
          </div>
        </div>

        {/* Year pill */}
        <div className="box-border flex items-center p-[5px_4px_5px_8px] border border-[var(--border-strong)] rounded-[30px] cursor-pointer shrink-0">
          <span className="font-sans font-normal text-[12px] text-[var(--foreground)]">
            2026
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-90 shrink-0">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-row items-center flex-1 min-h-0 gap-[clamp(16px,4vw,32px)]">
        {/* Donut */}
        <div className="shrink-0 w-[clamp(100px,30%,160px)] aspect-square">
          <WorkforceDonut data={data} />
        </div>

        {/* Legend List */}
        <div className="flex-1 flex flex-col justify-center gap-[clamp(8px,2vh,16px)]">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: item.color, border: item.border ?? "none" }}
              />
              <span className="font-sans font-medium text-[clamp(10px,1vw,12px)] text-[var(--foreground)] whitespace-nowrap">
                {item.label}
              </span>
              <div className="flex-1 border-t border-dashed border-[#2C2C2C] opacity-10 min-w-[10px]" />
              <span className="font-sans font-bold text-[clamp(12px,1.2vw,16px)] text-[var(--foreground)]">
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