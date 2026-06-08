import { Typography } from "@/components/ui/typography";
import {
  DashboardHeader,
  StatsCard,
  PipelineStatus,
  ScreeningChart,
  ActivityCard,
  AlertBanner,
} from "@/features/ccs/components";
import { statsData, activities } from "@/features/ccs/data/ccsDashboardData";

export default function CcsDashboard() {
  return (
    <div
      className="
        flex min-h-full flex-col
        px-[1.375rem] py-[1.375rem]
        xl:px-[1.875rem] xl:py-[1.875rem]
        2xl:px-[2.5rem] 2xl:py-[2.5rem]
      "
    >
      <div className="shrink-0">
        <DashboardHeader />
      </div>

      <div
        className="
          mt-[1.375rem] grid grid-cols-1 items-start
          lg:grid-cols-[1fr_23.75rem] lg:gap-[0.875rem]
          xl:grid-cols-[1fr_26.25rem] xl:gap-[1rem] xl:mt-[1.75rem]
          2xl:grid-cols-[1fr_30.25rem] 2xl:gap-[1.125rem] 2xl:mt-[2.125rem]
        "
      >
        {/* ════ LEFT COLUMN ════ */}
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-[0.75rem] xl:gap-[0.875rem] 2xl:gap-[0.9375rem]">
            {statsData.slice(0, 3).map((item, index) => (
              <div key={item.title} className={index === 0 ? "col-span-2" : ""}>
                <StatsCard
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                  large={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-[1.75rem] xl:mt-[2rem] 2xl:mt-[2.3125rem]">
            <Typography
              variant="h2"
              className="mb-[0.75rem] font-extrabold uppercase leading-[120%] text-[#171717] text-[1.125rem] xl:text-[1.25rem] xl:mb-[0.875rem] 2xl:text-[1.5rem] 2xl:mb-[1rem]"
            >
              Pipeline Status
            </Typography>
            <PipelineStatus />
          </div>

          <div className="mt-[42px]">
            <AlertBanner />
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div
          className="
            flex flex-col rounded-[33px] bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
            px-[30px] pt-[30px] pb-[30px] w-full
          "
        >
          <div className="flex min-h-0 flex-1 flex-col mt-0">
            <ScreeningChart />
          </div>

          <div className="shrink-0 mt-[44px]">
            <Typography
              variant="h3"
              className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] mb-[30px]"
            >
              Recent Activity
            </Typography>
            <div className="flex flex-col gap-[28px]">
              {activities.map((item, index) => (
                <div key={index} className="flex flex-col gap-[28px]">
                  <ActivityCard
                    id={item.id}
                    description={item.description}
                    timeAgo={item.timeAgo}
                  />
                  {index < activities.length - 1 && (
                    <div className="w-full h-0 border-t border-[rgba(0,0,0,0.06)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
