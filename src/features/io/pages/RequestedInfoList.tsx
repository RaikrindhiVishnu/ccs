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
    <div
      className="
        w-full
        bg-[var(--chart-bg)]
        px-[clamp(12px,2vw,24px)]
        pt-[clamp(12px,2vw,24px)]
        pb-[12px]
      "
    >
      {/* Container */}
      <div
        className="
          mx-auto
          flex
          w-full
          flex-col
          max-w-[1360px]
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

            {/* Table Content List */}
            <section className="w-full">
              <RequestedInfoTable
                data={paginatedData}
                hideCardWrapper={false}
                showPagination={false}
              />
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            flex-col
            gap-[1rem]
            rounded-[32px]
            border
            border-[#F1F5F9]
            bg-white
            px-[24px]
            py-[26px]
            h-auto
            lg:h-[76px]
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT TEXT */}
          <span
            className="
              font-[var(--font-sans)]
              font-medium
              text-[#64748B]
              text-[clamp(14px,1.11vw,16px)]
              leading-[16px]
              flex
              items-center
            "
          >
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filteredRequests.length)} of{" "}
            {filteredRequests.length.toLocaleString()}
          </span>

          {/* PAGINATION */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-[8px]
              sm:justify-end
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
                gap-[14px]
                rounded-[8px]
                border
                border-[rgba(195,198,213,0.2)]
                bg-white
                w-[103px]
                h-[30px]
                text-[12px]
                font-semibold
                font-[var(--font-sans)]
                text-black
                transition-all
                duration-200
                hover:bg-[var(--chart-bg)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9L1 5L5 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Previous</span>
            </button>

            {/* Dynamic Page Buttons */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`
                  flex
                  h-[32px]
                  w-[32px]
                  items-center
                  justify-center
                  rounded-[8px]
                  text-[12px]
                  font-semibold
                  font-[var(--font-sans)]
                  transition-all
                  duration-200
                  ${
                    page === num
                      ? "bg-[#96C9ED] text-black"
                      : "text-[#475569] hover:bg-[var(--chart-bg)]"
                  }
                `}
              >
                {num}
              </button>
            ))}

            {totalPages > 3 && (
              <>
                <div
                  className="
                    px-[8px]
                    text-[12px]
                    font-[var(--font-sans)]
                    text-[#94A3B8]
                  "
                >
                  ...
                </div>

                <button
                  onClick={() => setPage(1284)}
                  className="
                    flex
                    h-[32px]
                    w-[32px]
                    items-center
                    justify-center
                    rounded-[8px]
                    text-[12px]
                    font-semibold
                    font-[var(--font-sans)]
                    text-[#475569]
                    hover:bg-[var(--chart-bg)]
                  "
                >
                  1284
                </button>
              </>
            )}

            {/* NEXT */}
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((prev) => prev + 1)}
              className="
                flex
                items-center
                justify-center
                gap-[14px]
                rounded-[8px]
                border
                border-[rgba(195,198,213,0.2)]
                bg-white
                w-[103px]
                h-[30px]
                text-[12px]
                font-semibold
                font-[var(--font-sans)]
                text-black
                transition-all
                duration-200
                hover:bg-[var(--chart-bg)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <span>Next</span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedInfoList;
