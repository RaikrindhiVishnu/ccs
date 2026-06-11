import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    return REQUESTS_DUMMY.filter((req) =>
      req.agentName.toLowerCase().includes(search.toLowerCase()) ||
      req.farmlandId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div
      className="
        w-full
        px-[0.875rem]
        pt-[0.875rem]
        pb-[0.875rem]

        sm:px-[1rem]
        sm:pt-[1rem]

        md:px-[1.25rem]
        md:pt-[1.25rem]

        lg:px-[1.5rem]
        lg:pt-[1.5rem]

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
        {/* Main White Card Container (Figma Frame 2147239837) */}
        <div
          className="
            w-full
            bg-white
            rounded-[clamp(16px,2.22vw,32px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
            flex
            flex-col
            pl-[clamp(16px,2.36vw,34px)]
            pr-[clamp(16px,1.53vw,22px)]
            pt-[clamp(20px,2.15vw,31px)]
            pb-[clamp(20px,2.15vw,31px)]
            gap-[clamp(16px,2vw,32px)]
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
                text-[clamp(24px,2.36vw,48px)]
                leading-[clamp(28px,2.78vw,56px)]
                tracking-[-0.9px]
                text-[var(--text-primary)]
                normal-case
              "
              searchWrapperClassName="
                !bg-[#F9F9F9]
                border
                border-[var(--border-subtle)]
                !h-[clamp(40px,3.61vw,68px)]
                !rounded-[60px]
                !px-[clamp(14px,1.39vw,28px)]
              "
            />
          </section>

          {/* Table Content List */}
          <section className="w-full">
            <RequestedInfoTable data={filteredRequests} />
          </section>
        </div>

        {/* View More Footer Action Card (Figma Background+HorizontalBorder) */}
        <section className="w-full">
          <div
            onClick={() => navigate("/io/requested-info/list")}
            className="
              flex
              w-full
              items-center
              justify-center
              bg-white
              border-t
              border-[rgba(226,226,228,0.3)]
              rounded-[clamp(12px,1.67vw,24px)]
              h-[clamp(50px,5.28vw,90px)]
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
                text-[clamp(14px,1.25vw,22px)]
                text-[var(--text-primary)]
              "
            >
              View More
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RequestedInfo;
