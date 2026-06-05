import { useState, useMemo } from "react";
import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import { RequestedInfoTable, type RequestedInfoRow } from "@/features/io/components/RequestedInfoTable";

// 25 dummy items to support pagination
const PAGINATED_REQUESTS_DUMMY: RequestedInfoRow[] = [
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
    farmlandId: "GLC SOS002",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "3",
    agentName: "Yakoob",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS003",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "4",
    agentName: "Rahul Sharma",
    agentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS004",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "5",
    agentName: "Sravan Yadav",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS005",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "6",
    agentName: "Sai Nivas",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS006",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "7",
    agentName: "Ananthu",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS007",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "8",
    agentName: "Sunil Varma",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS008",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "9",
    agentName: "Yakoob",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS009",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "10",
    agentName: "Rahul Sharma",
    agentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS010",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "11",
    agentName: "Sravan Yadav",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS011",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "12",
    agentName: "Sai Nivas",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLC SOS012",
    creationTime: "6th Oct - 12.53 PM",
    amount: "25 lacs",
    status: "Returned",
    publishedTime: "6th Oct - 12.53 PM"
  },
  {
    id: "13",
    agentName: "Arun Kumar",
    farmlandId: "GLC SOS013",
    creationTime: "7th Oct - 10.30 AM",
    amount: "18 lacs",
    status: "Approved",
    publishedTime: "7th Oct - 11.00 AM"
  },
  {
    id: "14",
    agentName: "Dileep",
    farmlandId: "GLC SOS014",
    creationTime: "7th Oct - 11.15 AM",
    amount: "30 lacs",
    status: "Pending",
    publishedTime: "7th Oct - 11.45 AM"
  },
  {
    id: "15",
    agentName: "Prasad",
    farmlandId: "GLC SOS015",
    creationTime: "8th Oct - 09.00 AM",
    amount: "15 lacs",
    status: "Returned",
    publishedTime: "8th Oct - 09.30 AM"
  }
];

const ITEMS_PER_PAGE = 7;

const RequestedInfoList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredRequests = useMemo(() => {
    return PAGINATED_REQUESTS_DUMMY.filter((req) =>
      req.agentName.toLowerCase().includes(search.toLowerCase()) ||
      req.farmlandId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    return filteredRequests.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredRequests, page]);

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
      {/* Container */}
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
            rounded-[32px]
            p-[clamp(16px,2.5vw,34px)]
            flex
            flex-col
            gap-[24px]
            relative
            overflow-hidden
          "
        >
          {/* Ellipse Gradient glow background from Figma */}
          <div
            className="
              absolute
              w-[899px]
              height-[213px]
              left-[520px]
              top-[94px]
              bg-[var(--priority-card-bg)]
              opacity-66
              blur-[200.75px]
              pointer-events-none
              rounded-full
            "
            style={{ height: "213px" }}
          />

          {/* Content layer */}
          <div className="relative z-10 flex flex-col gap-[24px]">
            {/* Back option row */}
       

            {/* Dashboard Header - Styled Exactly like RequestedInfo.tsx */}
            <section className="w-full">
              <IODashboardHeader
                title="Requested Information"
                description=""
                searchPlaceholder="Search Agents..."
                searchValue={search}
                onSearchChange={(val) => {
                  setSearch(val);
                  setPage(1);
                }}
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
                  !bg-[var(--chart-bg)]
                  border
                  border-[var(--border-subtle)]
                  !h-[clamp(40px,3.61vw,68px)]
                  !rounded-[60px]
                  !px-[clamp(14px,1.39vw,28px)]
                "
              />
            </section>

            {/* Table Content List - Reusing same Figma card CSS wrapper internally */}
            <section className="w-full">
              <RequestedInfoTable
                data={paginatedData}
                hideCardWrapper={false}
                showPagination={true}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={filteredRequests.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RequestedInfoList;
