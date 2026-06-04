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
}

export const RequestedInfoTable = ({ data }: RequestedInfoTableProps) => {
  const navigate = useNavigate();

  // Color mappings for the status badges
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Returned":
        return "bg-[#3C78B9] text-white";
      case "Approved":
        return "bg-[var(--status-success)] text-white";
      default:
        return "bg-amber-500 text-white";
    }
  };

  return (
    <Card
      className="
        w-full
        overflow-hidden
        bg-white
        border-none
        shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
        rounded-[clamp(1rem,2.22vw,2.5rem)]
      "
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          {/* TABLE HEADER */}
          <thead>
            <tr
              className="
                h-[clamp(3.5rem,4.51vw,5rem)]
                bg-[rgba(243,243,245,0.5)]
                border-b border-[rgba(226,226,228,0.5)]
              "
            >
              <th className="pl-[clamp(1.5rem,2.22vw,2.5rem)] text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[22%]">
                Agent Name
              </th>
              <th className="text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[15%]">
                Farmland ID
              </th>
              <th className="text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[18%]">
                Creation Time
              </th>
              <th className="text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[12%]">
                Amount
              </th>
              <th className="text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[12%]">
                Status
              </th>
              <th className="text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-[#3D4949] uppercase font-[var(--font-sans)] w-[18%]">
                Published Time
              </th>
              <th className="pr-[clamp(1.5rem,2.22vw,2.5rem)] text-right text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold tracking-[clamp(0.4px,0.04vw,0.8px)] text-black uppercase font-[var(--font-sans)] w-[10%]">
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
                  h-[clamp(4.5rem,6.46vw,7.5rem)]
                  border-b border-[rgba(226,226,228,0.3)]
                  last:border-none
                  hover:bg-[rgba(243,243,245,0.2)]
                  transition-colors
                  duration-150
                "
              >
                {/* Agent Name with Avatar */}
                <td className="pl-[clamp(1.5rem,2.22vw,2.5rem)]">
                  <div className="flex items-center gap-[clamp(0.75rem,1.11vw,1.25rem)]">
                    {row.agentAvatar ? (
                      <img
                        src={row.agentAvatar}
                        alt={row.agentName}
                        className="w-[clamp(2rem,2.78vw,3rem)] h-[clamp(2rem,2.78vw,3rem)] rounded-full object-cover border border-[#1D2900]/10"
                      />
                    ) : (
                      <div className="w-[clamp(2rem,2.78vw,3rem)] h-[clamp(2rem,2.78vw,3rem)] rounded-full bg-[#EBF5FB] flex items-center justify-center font-bold text-[#1D5E9C] text-sm uppercase">
                        {row.agentName.slice(0, 2)}
                      </div>
                    )}
                    <span className="font-[var(--font-sans)] font-semibold text-[clamp(0.8125rem,0.97vw,1.15rem)] text-[#1A1C1D]">
                      {row.agentName}
                    </span>
                  </div>
                </td>

                {/* Farmland ID */}
                <td className="text-[clamp(0.75rem,0.97vw,1.1rem)] font-[var(--font-sans)] font-normal text-[#3D4949]">
                  {row.farmlandId}
                </td>

                {/* Creation Time */}
                <td className="text-[clamp(0.75rem,0.97vw,1.1rem)] font-[var(--font-sans)] font-normal text-[#3D4949]">
                  {row.creationTime}
                </td>

                {/* Amount */}
                <td className="text-[clamp(0.75rem,0.97vw,1.1rem)] font-[var(--font-sans)] font-semibold text-[#1D5E9C]">
                  {row.amount}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`
                      inline-flex items-center justify-center
                      px-[clamp(0.5rem,0.83vw,1rem)] py-[clamp(0.2rem,0.28vw,0.4rem)]
                      text-[clamp(0.6875rem,0.83vw,0.95rem)] font-semibold leading-none
                      rounded-full
                      ${getStatusStyle(row.status)}
                    `}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Published Time */}
                <td className="text-[clamp(0.75rem,0.97vw,1.1rem)] font-[var(--font-sans)] font-normal text-[#3D4949]">
                  {row.publishedTime}
                </td>

                {/* Action Button */}
                <td className="pr-[clamp(1.5rem,2.22vw,2.5rem)] text-right">
                  <Button
                    onClick={() => navigate(`/io/farmland-document/${row.farmlandId}`)}
                    className="
                      bg-[#96C9ED]
                      hover:bg-[#7db3db]
                      text-black
                      font-bold
                      text-[clamp(0.6875rem,0.83vw,0.95rem)]
                      tracking-[clamp(0.4px,0.04vw,0.8px)]
                      uppercase
                      rounded-full
                      px-[clamp(0.75rem,1.11vw,1.25rem)]
                      py-[clamp(0.2rem,0.28vw,0.4rem)]
                      h-[clamp(1.5rem,1.94vw,2.25rem)]
                      w-[clamp(3.5rem,4.51vw,5.5rem)]
                      shadow-none
                      border-none
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
    </Card>
  );
};
