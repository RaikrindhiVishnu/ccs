import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface RequestedInfoRow {
  id: string;
  agentName: string;
  agentAvatar?: string;
  farmlandId: string;
  creationTime: string;
  amount: string;
  status: "Returned" | "Pending" | "Approved";
  publishedTime: string;
}

interface RequestedInfoTableProps {
  data: RequestedInfoRow[];
  hideCardWrapper?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const RequestedInfoTable = ({
  data,
  hideCardWrapper = false,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 7,
}: RequestedInfoTableProps) => {
  const navigate = useNavigate();

  // Color mappings for the status badges
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Returned":
        return "bg-[var(--brand-500)] text-white";
      case "Approved":
        return "bg-[var(--status-success)] text-white";
      default:
        return "bg-[var(--status-warning)] text-white";
    }
  };

  const tableContent = (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        {/* TABLE HEADER */}
        <thead>
          <tr
            className="
              h-[clamp(50px,4.51vw,75px)]
              bg-[rgba(243,243,245,0.5)]
              border-b border-[rgba(226,226,228,0.5)]
            "
          >
             <th className="pl-[clamp(16px,1.67vw,32px)] text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[22%]">
              Agent Name
            </th>
            <th className="text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[15%]">
              Farmland ID
            </th>
            <th className="text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[18%]">
              Creation Time
            </th>
            <th className="text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[12%]">
              Amount
            </th>
            <th className="text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[12%]">
              Status
            </th>
            <th className="text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[18%]">
              Published Time
            </th>
            <th className="pr-[clamp(16px,1.67vw,32px)] text-right text-[clamp(10px,0.83vw,14px)] font-semibold tracking-[0.6px] text-[var(--text-secondary)] uppercase font-[var(--font-sans)] w-[10%]">
              Action
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id + idx}
              className="
                h-[clamp(75px,6.46vw,110px)]
                border-b border-[rgba(226,226,228,0.3)]
                last:border-none
                hover:bg-[rgba(243,243,245,0.2)]
                transition-colors
                duration-150
              "
            >
              {/* Agent Name with Avatar */}
              <td className="pl-[clamp(16px,1.67vw,32px)]">
                <div className="flex items-center gap-[clamp(12px,1.11vw,22px)]">
                  {row.agentAvatar ? (
                    <img
                      src={row.agentAvatar}
                      alt={row.agentName}
                      className="w-[clamp(32px,2.78vw,52px)] h-[clamp(32px,2.78vw,52px)] rounded-full object-cover border border-[#1D2900]/10"
                    />
                  ) : (
                    <div className="w-[clamp(32px,2.78vw,52px)] h-[clamp(32px,2.78vw,52px)] rounded-full bg-[var(--performance-card-bg)] flex items-center justify-center font-semibold text-[var(--pie-3)] text-sm uppercase">
                      {row.agentName.slice(0, 2)}
                    </div>
                  )}
                  <span className="font-[var(--font-sans)] font-semibold text-[clamp(12px,0.97vw,16px)] leading-[clamp(16px,1.39vw,24px)] text-[var(--text-primary)]">
                    {row.agentName}
                  </span>
                </div>
              </td>

              {/* Farmland ID */}
              <td className="text-[clamp(12px,0.97vw,16px)] leading-[clamp(16px,1.39vw,24px)] font-[var(--font-sans)] font-normal text-[var(--text-secondary)]">
                {row.farmlandId}
              </td>

              {/* Creation Time */}
              <td className="text-[clamp(12px,0.97vw,16px)] leading-[clamp(16px,1.39vw,24px)] font-[var(--font-sans)] font-normal text-[var(--text-secondary)]">
                {row.creationTime}
              </td>

              {/* Amount */}
              <td className="text-[clamp(12px,0.97vw,16px)] leading-[clamp(16px,1.39vw,24px)] font-[var(--font-sans)] font-semibold text-[var(--pie-3)]">
                {row.amount}
              </td>

              {/* Status */}
              <td>
                <span
                  className={`
                    inline-flex items-center justify-center
                    px-[clamp(8px,0.83vw,16px)] py-[clamp(2px,0.28vw,6px)]
                    h-[clamp(18px,1.67vw,32px)]
                    text-[clamp(10px,0.83vw,14px)] font-semibold leading-none
                    rounded-full
                    ${getStatusStyle(row.status)}
                  `}
                >
                  {row.status}
                </span>
              </td>

              {/* Published Time */}
              <td className="text-[clamp(12px,0.97vw,16px)] leading-[clamp(16px,1.39vw,24px)] font-[var(--font-sans)] font-normal text-[var(--text-secondary)]">
                {row.publishedTime}
              </td>

              {/* Action Button */}
              <td className="pr-[clamp(16px,1.67vw,32px)] text-right">
                <Button
                  onClick={() => navigate(`/io/farmland-document/${row.farmlandId}?mode=requested`, { state: { fromRequestedInfo: true } })}
                  className="
                    !bg-[var(--btn-secondary)]
                    hover:opacity-90
                    !text-[#000000]
                    !font-[var(--font-sans)]
                    !font-bold
                    !text-[clamp(10px,0.83vw,14px)]
                    !leading-[clamp(12px,1.11vw,20px)]
                    !tracking-[0.6px]
                    !uppercase
                    !rounded-full
                    !h-[clamp(24px,1.94vw,34px)]
                    !w-[clamp(50px,4.51vw,80px)]
                    !shadow-none
                    !border-none
                    !px-0
                    !py-0
                    inline-flex
                    items-center
                    justify-center
                    transition-all
                  "
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const paginationFooter = showPagination && (
    <div className="flex flex-col gap-[1rem] w-full lg:flex-row lg:items-center lg:justify-between px-[24px] py-[16px] border-t border-[rgba(226,226,228,0.3)]">
      {/* Left text */}
      <span className="text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] font-medium text-[var(--label-color)]">
        Showing {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems.toLocaleString()}
      </span>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-[0.5rem] sm:justify-end">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="flex items-center justify-center gap-1 px-2 py-1 text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] font-semibold text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-all"
        >
          &lt; Previous
        </button>

        {/* Page Buttons */}
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            onClick={() => onPageChange?.(num)}
            className={`flex h-[clamp(28px,2.22vw,40px)] w-[clamp(28px,2.22vw,40px)] items-center justify-center rounded-[clamp(6px,0.56vw,10px)] text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] font-semibold transition-all ${
              currentPage === num
                ? "bg-[var(--btn-secondary)] text-[var(--text-strong)]"
                : "text-[var(--label-color)] hover:bg-[var(--chart-bg)]"
            }`}
          >
            {num}
          </button>
        ))}

        {totalPages > 3 && (
          <>
            <span className="text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] text-[var(--label-color)] px-1">...</span>
            <button
              onClick={() => onPageChange?.(1284)}
              className="flex h-[clamp(28px,2.22vw,40px)] px-2 items-center justify-center rounded-[clamp(6px,0.56vw,10px)] text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] font-semibold text-[var(--label-color)] hover:bg-[var(--chart-bg)]"
            >
              1284
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="flex items-center justify-center gap-1 px-2 py-1 text-[clamp(12px,0.97vw,16px)] font-[var(--font-sans)] font-semibold text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-all"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );

  if (hideCardWrapper) {
    return (
      <div className="flex flex-col w-full">
        {tableContent}
        {paginationFooter}
      </div>
    );
  }

  return (
    <Card
      className="
        w-full
        overflow-hidden
        bg-white
        border-none
        shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
        rounded-[clamp(16px,2.22vw,32px)]
        flex
        flex-col
      "
    >
      {tableContent}
      {paginationFooter}
    </Card>
  );
};
