import { useNavigate } from "react-router-dom";

import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import AssignedFarmlandCards from "@/features/io/components/Assignedfarmlandcard";

import { FARMLAND_CARD_DUMMY } from "@/features/io/data/Farmlandcarddummydata";

const AssignedFarmland = () => {
  const navigate = useNavigate();

  return (
    <main
      className="
        w-full
        min-h-screen
        overflow-hidden

        bg-[var(--chart-bg)]

        px-[0.875rem]
        pt-[0.875rem]
        pb-[1rem]

        sm:px-[1rem]
        sm:pt-[1rem]

        md:px-[1.25rem]
        md:pt-[1.25rem]

        lg:px-[1.5rem]
        lg:pt-[1.5rem]
        lg:pb-[1.5rem]

        xl:px-[1.75rem]
        xl:pt-[1.75rem]

        2xl:px-[2rem]
        2xl:pt-[2rem]

        min-[1800px]:px-[2.5rem]
        min-[1800px]:pt-[2.5rem]

        min-[2200px]:px-[3rem]
      "
    >
      {/* CONTAINER */}
      <div
        className="
          mx-auto
          flex
          w-full
          flex-col

          max-w-full

          min-[1400px]:max-w-[95%]

          min-[1800px]:max-w-[96%]

          min-[2200px]:max-w-[97%]

          gap-[1.25rem]

          md:gap-[1.5rem]

          lg:gap-[1.75rem]

          xl:gap-[2rem]

          2xl:gap-[2.25rem]

          min-[1800px]:gap-[2.5rem]
        "
      >
        {/* STATS */}
        <section className="w-full">
          <FarmlandStatsCards />
        </section>

        {/* HEADER */}
        <section
          className="
            flex
            flex-col

            gap-[0.875rem]

            lg:flex-row
            lg:items-center
            lg:justify-between

            xl:gap-[1rem]
          "
        >
          <IODashboardHeader
            title="Assigned Farmlands"
            description=""
            searchPlaceholder="Search Agents..."
            titleClassName="
            font-[var(--font-heading)]
            font-bold
            leading-[110%]
            tracking-[-0.04em]
            text-[clamp(1.5rem,2.361vw,2.375rem)]
            text-[var(--text-primary)]
        "
        
          />
        </section>

        {/* CARDS */}
        <section className="w-full">
                    <AssignedFarmlandCards
            data={FARMLAND_CARD_DUMMY.slice(0, 3)}
            onView={(id) =>
                navigate(`/io/farmland-document/${id}`)
            }
            />
        </section>

        {/* VIEW MORE */}
        <button
          onClick={() => navigate("/io/assigned-farmland/list")}
          className="
            flex
            w-full
            items-center
            justify-center

            rounded-[1.25rem]

            border
            border-[var(--border-default)]

            bg-[var(--surface-card)]

            font-semibold

            text-[var(--text-primary)]

            transition-all
            duration-200

            hover:bg-[var(--surface-page)]

            h-[3.25rem]

            text-[0.875rem]

            sm:h-[3.5rem]

            md:h-[3.75rem]

            lg:h-[4rem]
            lg:text-[0.9375rem]

            xl:h-[4.25rem]
            xl:text-[1rem]

            2xl:h-[4.5rem]
            2xl:text-[1.0625rem]

            min-[1800px]:h-[4.75rem]
            min-[1800px]:text-[1.125rem]
          "
        >
          View More
        </button>
      </div>
    </main>
  );
};

export default AssignedFarmland;