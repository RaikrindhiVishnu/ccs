import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AssignedFarmlandCards from "@/features/io/components/Assignedfarmlandcard";
import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import { FARMLAND_CARD_DUMMY } from "@/features/io/data/Farmlandcarddummydata";

const ITEMS_PER_PAGE = 6;

const AssignedFarmlandList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    return FARMLAND_CARD_DUMMY.filter((item) =>
      item.agentName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main
      className="
        w-full
        min-h-screen

        bg-[var(--chart-bg)]

        px-[0.875rem]
        pt-[0.875rem]
        pb-[1rem]

        sm:px-[1rem]
        sm:pt-[1rem]

        md:px-[1.25rem]
        md:pt-[1.25rem]

        md:px-[1.5rem]
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
      {/* MAIN CONTAINER */}
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

          md:gap-[1.75rem]

          xl:gap-[2rem]

          2xl:gap-[2.25rem]

          min-[1800px]:gap-[2.5rem]
        "
      >
        {/* CONTENT CARD */}
        <div
          className="
            flex
            w-full
            flex-col

            rounded-[1.5rem]

            border
            border-[var(--border-default)]

            bg-[var(--surface-card)]

            p-[1rem]

            gap-[1.5rem]

            sm:p-[1.25rem]

            lg:rounded-[2rem]
            md:p-[1.5rem]
            md:gap-[1.75rem]

            xl:p-[1.75rem]
            xl:gap-[2rem]

            2xl:p-[2rem]
            2xl:gap-[2.25rem]
          "
        >
          {/* HEADER */}
          <IODashboardHeader
            title="Assigned Farmlands"
            description=""
            searchPlaceholder="Search Agents..."
            searchValue={search}
            onSearchChange={setSearch}
            titleClassName="
                  font-[var(--font-heading)]
                  font-bold
                  leading-[110%]
                  tracking-[-0.04em]
                  text-[clamp(1.1333rem,2.361vw,2.8332rem)]
                  text-[var(--text-primary)]
                      
                  "
            searchWrapperClassName="!bg-[var(--chart-bg)]"
          />

          {/* GRID */}
          <AssignedFarmlandCards
            data={paginatedData}
            onView={(id) => navigate(`/io/farmland-document/${id}`)}
          />
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            flex-col

            gap-[1rem]

            rounded-[1.5rem]

            border
            border-[var(--border-default)]

            bg-[var(--surface-card)]

            px-[1rem]
            py-[1rem]

            sm:px-[1.25rem]

            lg:min-h-[4.75rem]
            md:flex-row
            lg:items-center
            lg:justify-between

            md:px-[1.5rem]

            xl:px-[2rem]

            2xl:min-h-[5rem]
          "
        >
          {/* LEFT TEXT */}
          <span
            className="
              text-[0.8125rem]
              font-medium

              text-[var(--text-secondary)]

              sm:text-[0.875rem]

              xl:text-[1rem]
            "
          >
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filteredData.length)} of{" "}
            {filteredData.length.toLocaleString()}
          </span>

          {/* PAGINATION */}
          <div
            className="
              flex
              flex-wrap
              items-center

              gap-[0.375rem]

              sm:justify-end

              xl:gap-[0.5rem]
            "
          >
            {/* PREVIOUS */}
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
                flex
                items-center
                justify-center

                gap-[0.5rem]

                rounded-[0.5rem]

                border
                border-[var(--border-default)]

                bg-[var(--surface-card)]

                px-[0.875rem]

                h-[1.875rem]

                text-[0.75rem]
                font-semibold

                text-[var(--text-primary)]

                transition-all
                duration-200

                hover:bg-[var(--chart-bg)]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <span>‹</span>
              Previous
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`
                  flex
                  h-[2rem]
                  w-[2rem]
                  items-center
                  justify-center

                  rounded-[0.4375rem]

                  text-[0.75rem]
                  font-semibold

                  transition-all
                  duration-200

                  ${
                    page === num
                      ? "bg-[var(--btn-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--chart-bg)]"
                  }
                `}
              >
                {num}
              </button>
            ))}

            <div
              className="
                px-[0.25rem]

                text-[0.75rem]

                text-[var(--text-secondary)]
              "
            >
              ...
            </div>

            <button
              className="
                flex
                h-[2rem]
                min-w-[2rem]
                items-center
                justify-center

                rounded-[0.4375rem]

                px-[0.375rem]

                text-[0.75rem]
                font-semibold

                text-[var(--text-secondary)]

                hover:bg-[var(--chart-bg)]
              "
            >
              1284
            </button>

            {/* NEXT */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="
                flex
                items-center
                justify-center

                gap-[0.5rem]

                rounded-[0.5rem]

                border
               border-[var(--border-default)]

                bg-[var(--surface-card)]

                px-[0.875rem]

                h-[1.875rem]

                text-[0.75rem]
                font-semibold

                text-[var(--text-primary)]

                transition-all
                duration-200

                hover:bg-[var(--chart-bg)]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssignedFarmlandList;
