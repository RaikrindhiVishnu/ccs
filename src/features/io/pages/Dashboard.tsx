import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import Prioritydonutcards from "@/features/io/components/Prioritydonutcard";
import PerformanceMetricsCard from "@/features/io/components/PerformanceMetricsCard";

const IODashboard = () => {
  return (
    <main
      className="
        relative
        w-full
        h-fit
        overflow-hidden

        rounded-[1rem]
        sm:rounded-[1.2rem]
        lg:rounded-[1.5rem]
        xl:rounded-[2rem]

        pt-[0.9rem]
        sm:pt-[1rem]
        lg:pt-[1.2rem]
        xl:pt-[1.5rem]
        2xl:pt-[1.75rem]

        px-[0.75rem]
        sm:px-[1rem]
        md:px-[1.25rem]
        xl:px-[1.8rem]
        2xl:px-[2.3rem]

        pb-[0.75rem]
        sm:pb-[0.9rem]
        lg:pb-[1rem]
        xl:pb-[1.25rem]
      "
    >
      <div className="relative z-[1]">
        {/* HEADER */}
        <IODashboardHeader />

        {/* MAIN DASHBOARD CARD */}
        <section
          className="
            relative
            overflow-hidden

            mt-[1rem]
            sm:mt-[1.1rem]
            lg:mt-[1.25rem]
            xl:mt-[1.5rem]

            rounded-[1.25rem]
            lg:rounded-[1.5rem]
            xl:rounded-[2rem]

            bg-[var(--surface-card)]

            p-[0.9rem]
            sm:p-[1rem]
            md:p-[1.25rem]
            xl:p-[1.4rem]
            2xl:p-[1.5rem]
          "
        >
          {/* BACKGROUND BLURS */}
          <div
            className="
              pointer-events-none
              absolute
              left-[-8%]
              top-[12%]

              w-[45rem]
              h-[12rem]

              rounded-full
              bg-[#EBF5FB]
              opacity-60
              blur-[140px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[-10%]
              top-[5%]

              w-[45rem]
              h-[12rem]

              rounded-full
              bg-[#F9FCE9]
              opacity-60
              blur-[140px]
            "
          />

          {/* CONTENT */}
          <div className="relative z-[1]">
            {/* STATS CARDS */}
            <FarmlandStatsCards />

            {/* SECOND ROW */}
            <div
              className="
                mt-[1rem]
                sm:mt-[1.1rem]
                lg:mt-[1.25rem]
                xl:mt-[1.5rem]

                grid
                grid-cols-1

                lg:grid-cols-[28%_1fr]
                xl:grid-cols-[32%_1fr]
                2xl:grid-cols-[437px_1fr]

                gap-[0.9rem]
                sm:gap-[1rem]
                md:gap-[1.1rem]
                xl:gap-[1.25rem]
                2xl:gap-[1.4rem]

                items-stretch
                w-full
              "
            >
              {/* LEFT DONUT CARD */}
              <div
                className="
                  min-h-[24rem]
                  lg:min-h-[28rem]
                  xl:min-h-[30.5rem]
                  h-full
                "
              >
                <Prioritydonutcards />
              </div>

              {/* RIGHT METRICS CARD */}
              <div
                className="
                  min-w-0

                  min-h-[24rem]
                  lg:min-h-[28rem]
                  xl:min-h-[30.5rem]

                  h-full
                "
              >
                <PerformanceMetricsCard />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IODashboard;