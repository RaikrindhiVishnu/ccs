import { useState, useMemo } from "react";
import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import { RequestedInfoTable, type RequestedInfoRow } from "@/features/io/components/RequestedInfoTable";

const REQUESTS_DUMMY: RequestedInfoRow[] = [
  {
    id: "1",
    agentName: "Ananthu",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS001",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "2",
    agentName: "Sunil Varma",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS001",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "3",
    agentName: "Yakoob",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS001",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  }
];

const RequestedInfo = () => {
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    return REQUESTS_DUMMY.filter((req) =>
      req.agentName.toLowerCase().includes(search.toLowerCase()) ||
      req.farmlandId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
        lg:pb-[2rem]

        xl:px-[1.75rem]
        xl:pt-[1.75rem]

        2xl:px-[2rem]
        2xl:pt-[2rem]

        min-[1800px]:px-[2.5rem]
        min-[1800px]:pt-[2.5rem]

        min-[2200px]:px-[3rem]
      "
    >
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
        {/* Reusing Farmland stats card */}
        <section className="w-full">
          <FarmlandStatsCards />
        </section>

        {/* Dashboard Header */}
        <section className="w-full">
          <IODashboardHeader
            title="Requested Information"
            description=""
            searchPlaceholder="Search Agents..."
            searchValue={search}
            onSearchChange={setSearch}
            titleClassName="
              font-[var(--font-sans)]
              font-semibold
              text-[34px]
              leading-[40px]
              tracking-[-0.9px]
              text-[#1A1C1D]
              normal-case
            "
            searchWrapperClassName="
              !bg-[#F9F9F9]
              border
              border-[#EBEBEB]
              !h-[52px]
              !rounded-[60px]
              !px-[20px]
            "
          />
        </section>

        {/* Table Content List */}
        <section className="w-full">
          <RequestedInfoTable data={filteredRequests} />
        </section>

        {/* View More Footer Action Card */}
        <section className="w-full">
          <div
            className="
              flex
              w-full
              items-center
              justify-center
              bg-white
              border-t
              border-[rgba(226,226,228,0.3)]
              rounded-[24px]
              h-[76px]
              cursor-pointer
              hover:bg-[rgba(243,243,245,0.3)]
              transition-colors
              duration-150
              shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
            "
          >
            <span
              className="
                font-[var(--font-sans)]
                font-semibold
                text-[18px]
                text-[#1E1E1E]
              "
            >
              View More
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RequestedInfo;
