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

        md:px-[1.5rem]
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

          md:gap-[1.75rem]

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
            rounded-[clamp(17.0496px,2.22vw,32.0px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
            flex
            flex-col
            pl-[clamp(18.1248px,2.36vw,34.0px)]
            pr-[clamp(12px,1.53vw,22.0px)]
            pt-[clamp(16.512px,2.15vw,31.0px)]
            pb-[clamp(16.512px,2.15vw,31.0px)]
            gap-[clamp(15.36px,2.0vw,32.0px)]
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
                text-[clamp(18.1248px,2.36vw,48.0px)]
                leading-[clamp(21.3504px,2.78vw,56.0px)]
                tracking-[-0.9px]
                text-[var(--text-primary)]
                normal-case
              "
              searchWrapperClassName="
                !bg-[#F9F9F9]
                border
                border-[var(--border-subtle)]
                !h-[clamp(30px,3.61vw,68.0px)]
                !rounded-[60px]
                !px-[clamp(10.6752px,1.39vw,28.0px)]
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
              rounded-[clamp(12.8256px,1.67vw,24.0px)]
              h-[clamp(40.5504px,5.28vw,90.0px)]
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
                text-[clamp(10.5px,1.25vw,22.0px)]
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
