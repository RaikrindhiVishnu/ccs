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
    <div className="flex flex-col w-full h-full px-4 py-4 lg:px-6 lg:py-6 overflow-x-hidden">
      {/* Header */}
      <div className="w-full shrink-0 relative z-50 mb-[39px]">
        <DashboardHeader />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-[19px] items-stretch w-full">

        {/* ════ LEFT COLUMN ════ */}
        <div className="flex flex-col w-full h-full justify-between">

          <div className="flex flex-col w-full gap-[36px]">
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-[18px]">
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

            {/* Pipeline Status */}
            <div className="flex flex-col">
              <Typography
                variant="h2"
                className="mb-[29px] font-['Plus_Jakarta_Sans'] font-extrabold uppercase leading-[120%] text-[#171717] text-[24px]"
              >
                PIPELINE STATUS
              </Typography>
              <PipelineStatus />
            </div>
          </div>

          {/* Alert Banner */}
          <div className="mt-auto pt-[29px]">
            <AlertBanner />
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div
          className="flex flex-col bg-[#FFFFFF] rounded-[33px] px-[31px] pt-[30px] pb-[30px] w-full h-full relative"
        >
          <div className="flex-none mb-[30px]">
            <ScreeningChart />
          </div>

          <div className="flex-1 flex flex-col mt-[15px] min-h-0">
            <Typography
              variant="h3"
              className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] mb-[24px] text-center"
            >
              RECENT ACTIVITY
            </Typography>
            <div className="flex flex-col gap-[24px] overflow-y-auto pr-2 pb-2 flex-1">
              {activities.map((item, index) => (
                <div key={index} className="flex flex-col gap-[24px]">
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
