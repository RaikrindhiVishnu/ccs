import * as React from "react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Typography} from "@/components/ui/typography";

import {Plus} from "lucide-react";
import {useGetAllAgentsMutation} from "@/features/role-manager/api/getagents";
import {useGetAllMasterDataQuery} from "@/features/role-manager/api/masterDataApi";
import AgentRow from "../components/ui/AgentRow";
import Loader from "../components/ui/Loader";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Agent {
    id: string;
    name: string;
    location: string;
    status: "Pending Review" | "Approved" | "Rejected";
    avatarUrl?: string;
    initials?: string;
}


// ─── Main Page ────────────────────────────────────────────────────────────────

export const AgentApprovalsPage = () => {
    const navigate = useNavigate();
    const [getAllAgents, {
            isLoading
        }
    ] = useGetAllAgentsMutation();
    const {data: masterData} = useGetAllMasterDataQuery();

    const [agentList, setAgentList] = React.useState < Agent[] > ([]);

    // Resolve PENDNG status id from master data
    const pendingStatusId = React.useMemo(() => {
        const statuses = masterData ?. data ?. userRegistrationStatusResult || [];
        const pending = statuses.find((s : any) => s.code === "PENDNG");
        return pending ?. id ?? null;
    }, [masterData]);

    const fetchPendingAgents = async (statusId : number) => {
        try {
            const response = await getAllAgents({registration_status_id: statusId, limit: 0, offset: 0}).unwrap();


            const apiAgents = response ?. data || [];

            const formattedAgents: Agent[] = apiAgents.map((item : any) => ({
                id: item.id ?. toString() || "",
                name: item.name || item.full_name || `${
                    item.first_name || ""
                } ${
                    item.last_name || ""
                }`.trim(),

                location: item.location || [item.address, item.city, item.pincode].filter(Boolean).join(", ") || "Location Not Available",

                status: "Pending Review",

                avatarUrl: item.avatar || item.profile_image || "",

                initials: `${
                    item.first_name || ""
                } ${
                    item.last_name || ""
                }` ?. split(" ") ?. map(
                    (word : string) => word[0]
                ) ?. join("") ?. toUpperCase() || "NA"
            }));

            setAgentList(formattedAgents);
        } catch (error) { // ignore for now
        }
    };

    React.useEffect(() => {
        if (pendingStatusId !== null) {
            fetchPendingAgents(pendingStatusId);
        }
    }, [pendingStatusId]);

    const ITEMS_PER_PAGE = 7;
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(agentList.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleAgents = agentList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) 
            setCurrentPage((prev) => prev + 1);
        
    };

    const handlePrevPage = () => {
        if (currentPage > 1) 
            setCurrentPage((prev) => prev - 1);
        
    };

    const handleViewProfile = (id : string) => {

        navigate(`/role-manager/agent-details/${id}`);
    };

    const handleCreateAgent = () => {
        navigate("/role-manager/agent-create");
    };

    return (
        <main className="
                        w-full
                        min-h-screen
                        bg-[color:var(--surface-page)]
                        font-[family-name:var(--font-sans)]
                      ">
            <div className={
                cn("mx-auto", "max-w-[118.75rem]",
                // was max-w-[1900px] → 1900/16 = 118.75rem
                    "px-[1.5rem]", "lg:px-[2.5rem]", "xl:px-[3.5rem]", "2xl:px-[4rem]",
                // was 24px→1.5rem | 40px→2.5rem | 56px→3.5rem | 64px→4rem
                    "py-[1.5rem]", "lg:py-[2rem]", "xl:py-[2.5rem]", "2xl:py-[3rem]",
                // was 24px→1.5rem | 32px→2rem | 40px→2.5rem | 48px→3rem
                )
            }>
                {/* Header */}
                <div className="
                                    flex items-center justify-between
                                    mb-[1.5rem]
                                    lg:mb-[1.75rem]
                                    xl:mb-[2rem]
                                  ">
                    <Typography variant="h1" className="
                                          font-[family-name:var(--font-heading)]
                                          font-bold
                                          text-[color:var(--text-primary)]
                                          leading-none
                                          !text-[1.625rem]
                                          lg:!text-[1.875rem]
                                          xl:!text-[2.0625rem]
                                          2xl:!text-[2.25rem]
                                        ">
                        Agent Approvals
                    </Typography>

                    <Button variant="primary"
                        onClick={handleCreateAgent}
                        leftIcon={<Plus size={16} strokeWidth={2.2} />}
                        className="
                          !h-[2.75rem]
                          lg:!h-[3rem]
                          xl:!h-[3.25rem]
                          !rounded-[var(--btn-radius-pill)]
                          gap-1.5
                          !px-[1.125rem]
                          lg:!px-[1.375rem]
                          xl:!px-[1.625rem]
                          !text-[0.6875rem]
                          lg:!text-[0.75rem]
                          xl:!text-[0.8125rem]
                          2xl:!text-[0.875rem]
                        "
                      >
                        Create Agent
                      </Button>
                </div>

                {/* Agent List */}
                <div
                  className="
                    flex flex-col
                    gap-[0.75rem]
                    lg:gap-[0.875rem]
                    xl:gap-[1rem]
                  "
                >
                  {isLoading ? (
                    <Loader message="Loading pending applicants..." />
                  ) : visibleAgents.length > 0 ? (
                    visibleAgents.map((agent) => (
                      <AgentRow
                        key={agent.id}
                        agent={agent}
                        onViewProfile={handleViewProfile}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-sm text-[color:var(--text-secondary)] bg-[color:var(--surface-card)] rounded-[1rem] border border-[color:var(--border-soft)] shadow-sm">
                      No pending review applicants found.
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    className="
                      flex items-center justify-between
                      mt-[1.5rem] lg:mt-[1.75rem] xl:mt-[2rem]
                      bg-[color:var(--surface-card)]
                      border border-[color:var(--border-soft)]
                      rounded-[1rem]
                      px-[1.5rem] py-[1rem]
                      shadow-[0px_10px_20px_rgba(0,49,50,0.03)]
                    "
                  >
                    <span className="text-[0.8125rem] lg:text-[0.875rem] text-[color:var(--text-secondary)] font-[family-name:var(--font-sans)]">
                      Showing <span className="font-semibold text-[color:var(--text-primary)]">{startIndex + 1}</span> to <span className="font-semibold text-[color:var(--text-primary)]">{Math.min(startIndex + ITEMS_PER_PAGE, agentList.length)}</span> of <span className="font-semibold text-[color:var(--text-primary)]">{agentList.length}</span> applicants
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        variant="secondary"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="
                          !h-[2.5rem] lg:!h-[2.75rem]
                          !rounded-[0.5rem]
                          bg-transparent border border-[color:var(--border-soft)]
                          hover:bg-gray-50
                          !px-4
                          text-[0.75rem] lg:text-[0.8125rem] font-medium
                          disabled:opacity-40 disabled:cursor-not-allowed
                        "
                      >
                        Previous
                      </Button>
                      <div className="flex items-center justify-center min-w-[5rem] text-[0.8125rem] lg:text-[0.875rem] font-medium font-[family-name:var(--font-sans)] text-[color:var(--text-primary)]">
                        Page {currentPage} of {totalPages}
                      </div>
                      <Button
                        variant="secondary"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="
                          !h-[2.5rem] lg:!h-[2.75rem]
                          !rounded-[0.5rem]
                          bg-transparent border border-[color:var(--border-soft)]
                          hover:bg-gray-50
                          !px-4
                          text-[0.75rem] lg:text-[0.8125rem] font-medium
                          disabled:opacity-40 disabled:cursor-not-allowed
                        "
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
            </div>
        </main>
    );
};

export default AgentApprovalsPage;
