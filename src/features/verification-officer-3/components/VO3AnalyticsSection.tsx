import React from "react";

export const VO3AnalyticsSection: React.FC = () => {
  // Donut chart calculations
  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~502.65

  // Donut chart slices: [percent, color]
  const slices = [
    { percent: 50, color: "#5B93FF", label: "High Priority", value: "50%" },
    { percent: 31, color: "#D6E77D", label: "Medium Priority", value: "31%" },
    { percent: 14, color: "#85BFE5", label: "Low Priority", value: "14%" },
    { percent: 5, color: "#F7F9FF", label: "Routine", value: "5%" },
  ];

  let currentOffset = 0;

  // Monthly Clearance Rate chart data
  const monthlyData = [
    { month: "Jan", value: 41 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 50 },
    { month: "April", value: 88, highlight: true },
    { month: "May", value: 30 },
    { month: "Jun", value: 63 },
    { month: "July", value: 81 },
    { month: "Aug", value: 43 },
    { month: "Sep", value: 100 },
    { month: "Oct", value: 36 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[411fr_897fr] gap-[clamp(1rem,1.5rem,2.5rem)] w-full h-auto select-none">

      {/* Left Panel: Case Priority Distribution */}
      <div className="flex flex-col bg-white border border-[rgba(0,0,0,0.1)] rounded-[1.5rem] p-[clamp(1.06rem,1.5rem,1.98rem)] w-full h-[clamp(18.375rem,25.875rem,34.125rem)] relative">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-[clamp(1.06rem,1.5rem,1.98rem)]">
          <h3 className="font-sans font-medium text-[var(--text-strong)] text-[clamp(0.8rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.125rem] leading-none m-0">
            Case Priority Distribution
          </h3>
          <button className="flex items-center gap-[0.25rem] px-[clamp(0.53rem,0.75rem,0.99rem)] py-[clamp(0.2rem,0.28rem,0.37rem)] bg-white border border-[rgba(0,0,0,0.14)] rounded-full text-[clamp(0.64rem,1.0vw,1.19rem)] [@media(min-width:1900px)]:text-[0.9rem] font-sans font-normal text-black cursor-pointer hover:bg-gray-50 transition-colors">
            Weekly
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Donut Chart Wrapper */}
        <div className="relative flex-1 flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            className="transform -rotate-90 max-h-[clamp(9.0rem,12.6rem,16.5rem)] max-w-[clamp(9.0rem,12.6rem,16.5rem)]"
          >
            {slices.map((slice, idx) => {
              const strokeLength = (slice.percent / 100) * circumference;
              const strokeOffset = circumference - strokeLength + currentOffset;
              currentOffset -= strokeLength;

              return (
                <circle
                  key={idx}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 hover:opacity-90 cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Donut Center text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-sans font-semibold text-[#3D4A0D] text-[clamp(1.08rem,1.7vw,2.02rem)] [@media(min-width:1900px)]:text-[1.53rem] leading-none mb-[0.25rem]">
              138
            </span>
            <span className="font-sans font-semibold text-black text-[clamp(0.46rem,0.656rem,0.87rem)] [@media(min-width:1900px)]:text-[0.656rem] leading-none uppercase tracking-wider">
              Total Cases
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-y-[clamp(0.44rem,0.625rem,0.82rem)] gap-x-[clamp(0.5rem,0.7rem,0.92rem)] mt-[clamp(0.8rem,1.25rem,1.49rem)]">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center gap-[clamp(0.35rem,0.56rem,0.66rem)]">
              <span
                className="w-[clamp(0.53rem,0.75rem,0.99rem)] h-[clamp(0.53rem,0.75rem,0.99rem)] rounded-full shrink-0"
                style={{ backgroundColor: slice.color, border: slice.color === "#F7F9FF" ? "0.5px solid rgba(0, 0, 0, 0.15)" : "none" }}
              />
              <span className="font-sans font-normal text-[#3D4949] text-[clamp(0.62rem,0.97vw,1.16rem)] [@media(min-width:1900px)]:text-[0.875rem] leading-none whitespace-nowrap">
                {slice.label} ({slice.value})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Monthly Clearance Rate */}
      <div className="flex flex-col bg-white border border-[rgba(0,0,0,0.1)] rounded-[1.577rem] p-[clamp(1.5rem,2.06rem,2.78rem)] w-full h-[clamp(18.375rem,25.875rem,34.125rem)] relative">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-[clamp(1.5rem,2.06rem,2.78rem)] px-[clamp(0.2rem,0.36rem,0.8rem)]">
          <h3 className="font-sans font-medium text-[var(--text-strong)] text-[clamp(0.8rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.125rem] leading-none m-0">
            Monthly Clearance Rate
          </h3>
          <button className="flex items-center gap-[0.25rem] px-[clamp(0.53rem,0.75rem,0.99rem)] py-[clamp(0.2rem,0.28rem,0.37rem)] bg-white border border-[rgba(0,0,0,0.14)] rounded-full text-[clamp(0.64rem,1.0vw,1.19rem)] [@media(min-width:1900px)]:text-[0.9rem] font-sans font-normal text-black cursor-pointer hover:bg-gray-50 transition-colors">
            Monthly
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Chart Content Area */}
        <div className="absolute left-[12.35%] top-[30.2%] w-[79.2%] h-[54.3%]">

          {/* Y Axis Gridlines and Labels */}
          <div className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none">
            {[
              { label: 100, value: 100 },
              { label: 80, value: 80 },
              { label: 60, value: 60 },
              { label: 40, value: 40 },
              { label: 20, value: 20 },
              { label: 10, value: 10 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="absolute left-0 w-full flex items-center h-[1px]"
                style={{ bottom: `${item.value}%` }}
              >
                {/* Y Axis Label */}
                <span className="absolute right-full mr-[clamp(1.5rem,2.5rem,3.0rem)] font-inter font-normal text-[#5A5C5E] text-[clamp(0.6rem,0.85vw,1.0rem)] [@media(min-width:1900px)]:text-[0.76rem] text-right whitespace-nowrap">
                  {item.label}
                </span>
                {/* Dashed Grid Line */}
                <div className="w-full border-t border-dashed border-[rgba(0,0,0,0.05)]" />
              </div>
            ))}
          </div>

          {/* Bar Chart Bars */}
          <div className="absolute left-0 top-0 w-full h-full z-10 flex justify-between items-end pl-[clamp(1.5rem,2.5rem,3.0rem)] pr-[clamp(0.4rem,0.625rem,0.8rem)]">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="relative flex flex-col items-center h-full justify-end group">
                {/* Bar */}
                <div
                  className="w-[clamp(1.78rem,2.41rem,3.86rem)] rounded-full flex flex-col items-center justify-start p-[clamp(0.18rem,0.24rem,0.39rem)] transition-all duration-300 hover:opacity-95"
                  style={{
                    height: `${data.value}%`,
                    background: data.highlight
                      ? "repeating-linear-gradient(-40deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px, transparent 6px), #C8DE52"
                      : "#C8DE52"
                  }}
                >
                  {/* Inside Bar Value Pill */}
                  <div className="w-[clamp(1.4rem,1.925rem,3.09rem)] h-[clamp(1.4rem,1.925rem,3.09rem)] bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="font-sans font-medium text-black text-[clamp(0.55rem,0.85vw,1.0rem)] [@media(min-width:1900px)]:text-[0.76rem]">
                      {data.value}
                    </span>
                  </div>
                </div>

                {/* X Axis Label */}
                <span
                  className={`absolute bottom-[-2.0rem] font-sans text-[clamp(0.55rem,0.86vw,1.0rem)] [@media(min-width:1900px)]:text-[0.77rem] text-center transition-opacity ${data.highlight
                      ? "text-[#C8DE52] font-semibold"
                      : "text-[#5C5C5C] opacity-50 font-normal"
                    }`}
                >
                  {data.month}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default VO3AnalyticsSection;
