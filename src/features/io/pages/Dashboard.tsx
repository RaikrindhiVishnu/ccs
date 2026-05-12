import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import Prioritydonutcards from "@/features/io/components/Prioritydonutcard";
import PerformanceMetricsCard from "@/features/io/components/PerformanceMetricsCard";

const IODashboard = () => {
  return (
    <section
      className="
        relative

        w-full

        rounded-[2rem]

        bg-[var(--surface-card)]

        overflow-hidden

        p-[1.35rem]

        xl:p-[1.55rem]

        2xl:p-[1.75rem]
      "
    >
      {/* ───────────────────────────── */}
      {/* BACKGROUND BLURS */}
      {/* ───────────────────────────── */}

      <div
        className="
          absolute

          left-[-8%]
          top-[18%]

          w-[56rem]
          h-[13rem]

          rounded-full

          bg-[var(--performance-card-bg)]

          opacity-60

          blur-[12rem]

          pointer-events-none
        "
      />

      <div
        className="
          absolute

          right-[-5%]
          top-[8%]

          w-[56rem]
          h-[13rem]

          rounded-full

          bg-[var(--priority-card-bg)]

          opacity-60

          blur-[12rem]

          pointer-events-none
        "
      />

      {/* ───────────────────────────── */}
      {/* CONTENT */}
      {/* ───────────────────────────── */}

      <div className="relative z-[1]">
        {/* TOP STATS */}

        <FarmlandStatsCards />

        {/* SECOND ROW */}

        <div
          className="
            mt-[1.4rem]

            grid

            grid-cols-1

            xl:grid-cols-[26.5rem_minmax(0,1fr)]

            gap-[1.4rem]

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
      </div>
    </section>
  );
};

export default IODashboard;