import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import Prioritydonutcards from "@/features/io/components/Prioritydonutcard";
import PerformanceMetricsCard from "@/features/io/components/PerformanceMetricsCard";

const IODashboard = () => {
  return (
    <main
      className="
        relative

        h-fit
        w-full

        overflow-hidden

        rounded-[1.25rem]
        xl:rounded-[1.5rem]
        2xl:rounded-[2rem]

        pt-[1rem]
        lg:pt-[1.1rem]
        xl:pt-[1.5rem]
        2xl:pt-[1.75rem]

        px-[1rem]
        lg:px-[1.1rem]
        xl:px-[1.5rem]
        2xl:px-[1.75rem]

        pb-[0.5rem]
        lg:pb-[0.55rem]
        xl:pb-[0.75rem]
        2xl:pb-[0.875rem]
      "
    >
      <div className="relative z-[1]">

        {/* HEADER */}
        <IODashboardHeader />

        {/* WHITE DASHBOARD CARD */}
        <section
          className="
            mt-[1rem]
            lg:mt-[1.1rem]
            xl:mt-[1.3rem]
            2xl:mt-[1.5rem]

            rounded-[1.25rem]
            xl:rounded-[1.5rem]
            2xl:rounded-[2rem]

            bg-[var(--surface-card)]

            p-[1rem]
            lg:p-[1.1rem]
            xl:p-[1.5rem]
            2xl:p-[1.75rem]
          "
        >
          {/* STATS */}
          <FarmlandStatsCards />

          {/* SECOND ROW */}
          <div
            className="
              mt-[1rem]
              lg:mt-[1.1rem]
              xl:mt-[1.35rem]
              2xl:mt-[1.5rem]

              grid
              grid-cols-1
              lg:grid-cols-[17rem_minmax(0,1fr)]
              xl:grid-cols-[20rem_minmax(0,1fr)]
              2xl:grid-cols-[21rem_minmax(0,1fr)]

              gap-[1rem]
              lg:gap-[1.1rem]
              xl:gap-[1.35rem]
              2xl:gap-[1.5rem]

              items-stretch
            "
          >
            {/* LEFT */}
            <div className="h-full">
              <Prioritydonutcards />
            </div>

            {/* RIGHT */}
            <div className="h-full min-w-0">
              <PerformanceMetricsCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IODashboard;