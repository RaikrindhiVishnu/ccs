import {
  DashboardHeader,
  StatsCard,
  QuickActions,
  PipelineStatus,
  ScreeningChart,
  ActivityCard,
  AlertBanner,
} from "@/components/ccs";
import { statsData, activities } from "@/data/ccs/ccsDashboardData";

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
      {/* ── HEADER ── */}
      <div className="shrink-0">
        <DashboardHeader />
      </div>

      <div
        className="
          mt-[1.375rem] grid flex-1
          grid-cols-1
          lg:grid-cols-[1fr_23.75rem] lg:gap-[0.875rem]
          xl:grid-cols-[1fr_26.25rem] xl:gap-[1rem] xl:mt-[1.75rem]
          2xl:grid-cols-[1fr_30.25rem] 2xl:gap-[1.125rem] 2xl:mt-[2.125rem]
        "
      >
        {/* ════ LEFT COLUMN ════ */}
        <div className="flex flex-col">
          <div
            className="
              grid grid-cols-2
              gap-[0.75rem]
              xl:gap-[0.875rem]
              2xl:gap-[0.9375rem]
            "
          >
            {statsData.map((item) => (
              <StatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </div>

          <div
            className="
              mt-[1.75rem]
              xl:mt-[2rem]
              2xl:mt-[2.3125rem]
            "
          >
            <h2
              className="
                mb-[0.75rem] font-extrabold uppercase leading-[120%] text-[#171717]
                text-[1.125rem]
                xl:text-[1.25rem] xl:mb-[0.875rem]
                2xl:text-[1.5rem] 2xl:mb-[1rem]
              "
            >
              Pipeline Status
            </h2>
            <PipelineStatus />
          </div>

          {/* ALERT — pushed to bottom */}
          <div className="mt-auto pt-[1rem]">
            <AlertBanner />
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        {/* Figma: border-radius 33px, padding left:40 top:40 */}
        <div
          className="
            flex flex-col
            rounded-[1.5rem] bg-[var(--card)]
            px-[1.5rem] py-[1.5rem] gap-0
            xl:rounded-[1.75rem] xl:px-[2rem] xl:py-[2rem]
            2xl:rounded-[2.0625rem] 2xl:px-[2.5rem] 2xl:py-[2.5rem]
          "
        >
          {/* QUICK ACTIONS */}
          <div className="shrink-0">
            <QuickActions />
          </div>

          {/* SCREENING CHART */}
          <div
            className="
          flex min-h-0 flex-1 flex-col
          mt-[2.5rem]
          xl:mt-[3rem]
          2xl:mt-[3.5rem]
        "
          >
            <ScreeningChart />
          </div>
          {/* YOUR ACTIVITY */}
          <div
            className="
              shrink-0
              mt-[1.25rem]
              xl:mt-[1.5rem]
              2xl:mt-[1.75rem]
            "
          >
            <h3
              className="
    -mt-[0.5rem]

    font-semibold
    uppercase
    leading-[120%]
    tracking-[1px]
    text-[#000]

    text-[0.6875rem]
    mb-[0.75rem]

    xl:-mt-[0.625rem]
    xl:text-[0.75rem]
    xl:mb-[0.875rem]

    2xl:-mt-[0.75rem]
    2xl:text-[0.875rem]
    2xl:mb-[1rem]
  "
            >
              Your Activity
            </h3>
            <div
              className="
                flex flex-col
                gap-[1.125rem]
                xl:gap-[1.375rem]
                2xl:gap-[1.625rem]
              "
            >
              {activities.map((item, index) => (
                <ActivityCard
                  key={index}
                  percentage={item.percentage}
                  title={item.title}
                  subtitle={item.subtitle}
                  buttonText={item.buttonText}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
