import React from "react";
import BarChart from "@/components/charts/BarChart";
import { useGetAgentOnboardingVelocityQuery } from "@/features/role-manager/api/agentApi";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
interface Props {
  activeLabel?: string;
  yMax?: number;
  title?: string;
  subtitle?: string;
}

const AgentOnboardingVelocity: React.FC<Props> = ({
  title = "Agent Onboarding Velocity",
  subtitle = "Weekly overview of Onboarding of Agents",
}) => {
  const [dateRange, setDateRange] = React.useState<{
    from: Date;
    to: Date;
  }>(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);

    return { from, to };
  });

  const {
    data: apiData,
    isLoading,
    error,
  } = useGetAgentOnboardingVelocityQuery({
    startDate: `${dateRange.from.getFullYear()}-${String(dateRange.from.getMonth() + 1).padStart(2, '0')}-${String(dateRange.from.getDate()).padStart(2, '0')}`,
    endDate: `${dateRange.to.getFullYear()}-${String(dateRange.to.getMonth() + 1).padStart(2, '0')}-${String(dateRange.to.getDate()).padStart(2, '0')}`,
    offset: "0",
  });

  const generateDateRange = (start: Date, end: Date) => {
    const dates = [];
    const currentDate = new Date(start);
    // Set time to start of day to avoid timezone issues during comparison
    currentDate.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const chartData = generateDateRange(dateRange.from, dateRange.to).map((date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const matchingItem = apiData?.data?.find((item) => {
      // Handle potential timezone differences by parsing as UTC or just splitting string
      return item.onboardingDate.startsWith(dateStr);
    });

    return {
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: matchingItem ? matchingItem.totalAgents : 0,
    };
  });
const maxValue =
  chartData.length > 0
    ? Math.max(...chartData.map((item) => item.value))
    : 0;

const dynamicYMax =
  maxValue > 10
    ? Math.ceil(maxValue * 1.2)
    : 10;
  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col overflow-hidden box-border",
        "bg-[color:var(--surface-card)] rounded-3xl shadow-[var(--shadow-card)]",
        "p-[clamp(1rem,1.4vw,1.5rem)]",
      )}
    >
      <div className="flex justify-between items-start mb-[clamp(0.75rem,1.5vh,1.5rem)] shrink-0">
        <div className="flex flex-col gap-[clamp(0.25rem,0.5vh,0.5rem)]">
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

        <div className="shrink-0">
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onRangeChange={(range) => {
              if (range) setDateRange(range);
            }}
          />
        </div>
      </div>

      {/* Content */}
    <div
  className="
    relative
    w-full
    h-full
    min-h-0
    overflow-hidden
  "
>
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
            Loading...
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            Failed to load data
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
            No data available
          </div>
        ) : (
          <BarChart
            data={chartData}
            activeLabel={
              chartData.reduce(
                (max, item) => (item.value > max.value ? item : max),
                chartData[0],
              )?.label
            }
           yMax={dynamicYMax}
            tooltipLabel="Agents"
          />
        )}
      </div>
    </Card>
  );
};

export default AgentOnboardingVelocity;
