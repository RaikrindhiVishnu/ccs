import * as React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useGetAgentByIdMutation, useGetLocationHierarchyDetailsMutation } from "@/features/role-manager/api/roleManagerApi";
import { useGetAllGeoMasterDataQuery } from "@/features/role-manager/api/masterDataApi";
import { useApproveUserMutation } from "@/features/auth/api/authApi";
import { useUpdateAgentDetailsMutation } from "@/features/role-manager/api/agentApi";
import RaiseIssueForm from "@/features/role-manager/components/form";
import { toast } from "sonner";

import InfoField from "../components/ui/InfoField";
import SectionCard from "../components/ui/SectionCard";
import DocumentCard from "../components/ui/DocumentCard";
import BackButton from "../components/ui/BackButton";
import ProfileHeaderCard from "../components/ui/ProfileHeaderCard";
import Loader from "../components/ui/Loader";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentDetail {
    id: string;
    name: string;
    applicationId: string;
    status: "Pending Review" | "Approved" | "Rejected";
    avatarUrl?: string;
    initials?: string;
    bannerUrl?: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    operatingTerritory: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    aadhaarImageUrl?: string;
    aadhaarBackImageUrl?: string;
    panImageUrl?: string;
}
interface AgentDetailPageProps {
    onDismiss?: () => void;
    onApprove?: () => void;
}


// ─── Main Page ────────────────────────────────────────────────────────────────

export const AgentDetailPage = ({ onDismiss, onApprove }: AgentDetailPageProps) => {
    const navigate = useNavigate();
    const [showIssueForm, setShowIssueForm] = React.useState(false);

    const { id } = useParams();
    const userId = id ? Number(id) : NaN;

    const [getAgentById, {
        data,
        isLoading
    }
    ] = useGetAgentByIdMutation();
    const [approveUser, {
        isLoading: isApproving
    }
    ] = useApproveUserMutation();
    const [updateAgentDetails, {
        isLoading: isUpdatingAgent
    }
    ] = useUpdateAgentDetailsMutation();
    const [getLocationHierarchyDetails] = useGetLocationHierarchyDetailsMutation();
    const { data: geoMasterData } = useGetAllGeoMasterDataQuery();

    // Territory assignment status
    const [hierarchyData, setHierarchyData] = React.useState<any>(null);
    const [territoryStatus, setTerritoryStatus] = React.useState<"loading" | "assigned" | "not_assigned">("loading");
    const [territoryError, setTerritoryError] = React.useState<{
        district: boolean;
        area: boolean
    }>({ district: false, area: false });

    React.useEffect(() => {
        if (!isNaN(userId)) {
            getAgentById(userId);
        }
    }, [userId, getAgentById]);

    // Parse geo_assignments (may be a JSON string or object)
    const parseGeoAssignments = (geoField: any) => {
        if (!geoField)
            return null;

        if (typeof geoField === "string") {
            try {
                return JSON.parse(geoField);
            } catch (e) {
                console.error("Failed to parse geo_assignments:", e);
            }
        }
        return geoField;
    };

    // Call getLocationHierarchyDetails when agent data is loaded
    React.useEffect(() => {
        const apiData = data?.data as any;
        if (!apiData)
            return;


        // Read district_id and mandal_id from top-level first, then fallback to geo_assignments
        const geo = parseGeoAssignments(apiData.geo_assignments);
        const districtId = apiData.district_id || geo?.district_id;
        const mandalId = apiData.mandal_id || geo?.mandal_id;

        if (districtId && mandalId) {
            setTerritoryStatus("loading");
            console.log("Fetching Hierarchy for District ID:", districtId, "Mandal ID:", mandalId);

            getLocationHierarchyDetails({ district_id: Number(districtId), mandal_id: Number(mandalId) }).unwrap().then((res) => {
                if (res?.success) {
                    setHierarchyData(res.data);
                    setTerritoryStatus("assigned");
                    setTerritoryError({ district: false, area: false });
                } else {
                    setHierarchyData(null);
                    setTerritoryStatus("not_assigned");
                    setTerritoryError({ district: true, area: true });
                }
            }).catch(() => {
                setHierarchyData(null);
                setTerritoryStatus("not_assigned");
                setTerritoryError({ district: true, area: true });
            });
        } else { // No district_id or mandal_id present at all
            setHierarchyData(null);
            setTerritoryStatus("not_assigned");
            setTerritoryError({
                district: !districtId,
                area: !mandalId
            });
        }
    }, [data, getLocationHierarchyDetails]);


    const apiData = data?.data as any;

    const geo = parseGeoAssignments(apiData?.geo_assignments);
    const districtId = apiData?.district_id || geo?.district_id;
    const mandalId = apiData?.mandal_id || geo?.mandal_id;

    const districtObj = geoMasterData?.districts?.find((d: any) => d.id === Number(districtId));
    const mandalObj = geoMasterData?.mandals?.find((m: any) => m.id === Number(mandalId));
    const stateId = apiData?.state_id || geo?.state_id || apiData?.address_state_id;
    const stateObj = geoMasterData?.states?.find((s: any) => s.id === Number(stateId));

    const districtName = districtObj?.desc || "";
    const mandalName = mandalObj?.desc || "";
    const stateName = stateObj?.desc || "";

    const agent: AgentDetail = {
        id: apiData?.id?.toString() || "",

        name: apiData?.name || apiData?.full_name || `${apiData?.first_name || ""
            } ${apiData?.last_name || ""
            }`.trim() || "No Name",

        applicationId: apiData?.id?.toString() || "N/A",

        status: "Pending Review",

        initials: `${apiData?.first_name || ""
            } ${apiData?.last_name || ""
            }`.split(" ").map(
                (word: string) => word[0]
            ).join("").toUpperCase() || "NA",

        avatarUrl: apiData?.avatar || apiData?.profile_image || "",

        bannerUrl: "",

        email: apiData?.email || "N/A",

        phone: apiData?.phone || "N/A",

        dateOfBirth: apiData?.dob ? new Date(apiData.dob).toLocaleDateString() : "N/A",

        operatingTerritory: [
            mandalName,
            districtName,
            stateName,
        ].filter(Boolean).join(", ") || "Not Assigned",

        bankName: apiData?.bank_name || "N/A",

        accountNumber: apiData?.account_number || "N/A",

        ifscCode: apiData?.ifsc_code || "N/A",

        aadhaarImageUrl: apiData?.id_proof_front_url || "",

        aadhaarBackImageUrl: apiData?.id_proof_back_url || "",

        panImageUrl: apiData?.pan_card_url || ""
    };

    const onBack = () => {
        navigate(-1);
    };

    const handleDismissClick = () => {
        if (onDismiss) {
            onDismiss();
        } else {
            navigate("/role-manager/agent-approvals");
        }
    };

    const handleApprove = async () => {
        if (territoryStatus !== "assigned") {
            toast.error("Cannot approve agent without an assigned territory.");
            return;
        }

        if (!hierarchyData || !hierarchyData.region || !hierarchyData.area) {
            toast.error("Cannot approve: No valid Region and Area mapping found for this agent's territory.");
            return;
        }

        try {
            const geo = parseGeoAssignments(apiData?.geo_assignments);

            const payload = {
                userId: Number(apiData?.id || userId || 0),
                firstName: apiData?.first_name || "Unknown",
                lastName: apiData?.last_name || "Unknown",
                emailAddress: apiData?.email || "unknown@example.com",
                phoneNumber: String(apiData?.phone || "").replace(/^\+91\s*/, "") || "0000000000",
                dob: apiData?.dob ? String(apiData.dob).split("T")[0] : "1990-01-01",
                role_id: 6,
                address: {
                    address: typeof apiData?.address === 'object' ? (apiData?.address?.address || "") : (apiData?.address || ""),
                    state_id: Number(apiData?.address_state_id || apiData?.state_id || geo?.state_id || 1),
                    city: typeof apiData?.address === 'object' ? (apiData?.address?.city || "") : (apiData?.city || ""),
                    pincode: typeof apiData?.address === 'object' ? (apiData?.address?.pincode || "") : (apiData?.pincode || "")
                },
                geo_assignments: {
                    country_id: Number(apiData?.country_id || geo?.country_id || 1),
                    state_id: Number(apiData?.state_id || geo?.state_id || 1),
                    district_id: Number(districtId || 0),
                    mandal_id: Number(mandalId || 0),
                    region_id: Number(hierarchyData?.region?.id || geo?.region_id || 0),
                    areas_id: Number(hierarchyData?.area?.id || geo?.areas_id || 0)
                },
                id_proof: {
                    bank_account_name: apiData?.account_holder_name || "N/A",
                    bank_account_number: apiData?.account_number || "N/A",
                    ifsc_code: apiData?.ifsc_code || "N/A",
                    branch: apiData?.branch || "N/A",
                    bank_name: apiData?.bank_name || "N/A",
                    id_proof_frontUrl: apiData?.id_proof_front_url || "N/A",
                    id_proof_backUrl: apiData?.id_proof_back_url || "N/A",
                    pan_card_number: apiData?.pan_number || "N/A",
                    pan_card_url: apiData?.pan_card_url || "N/A"
                }
            };

            await updateAgentDetails(payload).unwrap();

            await approveUser({
                user_id: apiData?.id || userId || 0,
                role_id: 6, // Hardcoded: AGENT role id
                role_code: "AGENT", // Hardcoded: AGENT role code
            }).unwrap();
            toast.success("Agent approved successfully!");
            if (onApprove) {
                onApprove();
            } else {
                navigate("/role-manager/agent-approvals");
            }
        } catch (error: any) {
            console.error("Error approving agent:", error);
            toast.error(error?.data?.message || "Failed to approve agent.");
        }
    };

    if (isLoading) {
        return <Loader message="Loading Agent Details..." fullscreen />;
    }

    if (isApproving || isUpdatingAgent) {
        return <Loader message="Approving Agent Registration..." fullscreen />;
    }
    return (
        <main className="
                                        w-full
                                        min-h-screen
                                        bg-[color:var(--surface-page)]
                                        font-[family-name:var(--font-sans)]
                                      ">
            <div className="
                                                  mx-auto
                                                  max-w-[118.75rem]
                                                  px-[1.5rem]
                                                  lg:px-[2.5rem]
                                                  xl:px-[3.5rem]
                                                  2xl:px-[4.5rem]
                                                  py-[1.5rem]
                                                  lg:py-[2rem]
                                                  xl:py-[2.5rem]
                                                  2xl:py-[3rem]
                                                ">
                <div className="
                                                            mb-[1.25rem]
                                                            lg:mb-[1.5rem]
                                                            xl:mb-[1.75rem]
                                                          "
                // 20px→1.25rem | 24px→1.5rem | 28px→1.75rem
                >
                    <BackButton onClick={onBack} />
                </div>

                <div className="
                                                            bg-[color:var(--surface-card)]
                                                            rounded-[1.75rem]
                                                            lg:rounded-[2.25rem]
                                                            xl:rounded-[2.875rem]
                                                            px-[1.25rem]
                                                            lg:px-[2rem]
                                                            xl:px-[3.125rem]
                                                            pt-[1.5rem]
                                                            lg:pt-[1.75rem]
                                                            xl:pt-[2rem]
                                                            pb-[2rem]
                                                            lg:pb-[2.5rem]
                                                            xl:pb-[3rem]
                                                            flex flex-col
                                                            gap-[1rem]
                                                            lg:gap-[1.125rem]
                                                            xl:gap-[1.25rem]
                                                          ">
                    <ProfileHeaderCard agent={agent} />

                    <SectionCard title="Info">
                        <div className="
                                                                                grid
                                                                                grid-cols-2
                                                                                xl:grid-cols-3
                                                                                gap-x-[1.5rem]
                                                                                lg:gap-x-[2rem]
                                                                                xl:gap-x-[2.5rem]
                                                                                gap-y-[1.25rem]
                                                                                lg:gap-y-[1.5rem]
                                                                                xl:gap-y-[1.75rem]
                                                                              ">
                            <InfoField label="Email"
                                value={
                                    agent.email
                                } />
                            <InfoField label="Phone number"
                                value={
                                    agent.phone
                                } />
                            <InfoField label="Date Of Birth"
                                value={
                                    agent.dateOfBirth
                                } />
                            <InfoField label="Operating Territory"
                                value={
                                    agent.operatingTerritory
                                }
                                className="col-span-2 xl:col-span-3" /> {/* Territory Assignment Status */}
                            {
                                territoryStatus === "loading" && (
                                    <div className="col-span-2 xl:col-span-3">
                                        <span className="text-[0.75rem] lg:text-[0.8125rem] text-[color:var(--text-secondary)] italic">
                                            Verifying territory assignment...
                                        </span>
                                    </div>
                                )
                            }

                            {
                                territoryStatus === "assigned" && hierarchyData && (
                                    <div className="col-span-2 xl:col-span-3 flex flex-col gap-1">
                                        <span className="inline-flex items-center gap-1.5 text-[0.8125rem] lg:text-[0.875rem] font-semibold text-[#16a34a]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            Territory Assigned
                                        </span>
                                        {
                                            hierarchyData.regional_officer && (
                                                <span className="text-[0.75rem] lg:text-[0.8125rem] text-[color:var(--text-secondary)]">
                                                    RO: {
                                                        hierarchyData.regional_officer.first_name
                                                    }
                                                    {
                                                        hierarchyData.regional_officer.last_name
                                                    } </span>
                                            )
                                        }
                                        {
                                            hierarchyData.field_officer && (
                                                <span className="text-[0.75rem] lg:text-[0.8125rem] text-[color:var(--text-secondary)]">
                                                    FO: {
                                                        hierarchyData.field_officer.first_name
                                                    }
                                                    {
                                                        hierarchyData.field_officer.last_name
                                                    } </span>
                                            )
                                        } </div>
                                )
                            }

                            {
                                territoryStatus === "not_assigned" && (
                                    <div className="col-span-2 xl:col-span-3 flex flex-col gap-1.5">
                                        <span className="inline-flex items-center gap-1.5 text-[0.8125rem] lg:text-[0.875rem] font-semibold text-[#dc2626]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                            Territory Not Assigned
                                        </span>
                                        {
                                            territoryError.district && (
                                                <span className="text-[0.75rem] lg:text-[0.8125rem] text-[#dc2626]/80">
                                                    • District ID — Not Assigned
                                                </span>
                                            )
                                        }
                                        {
                                            territoryError.area && (
                                                <span className="text-[0.75rem] lg:text-[0.8125rem] text-[#dc2626]/80">
                                                    • Area (Mandal) ID — Not Assigned
                                                </span>
                                            )
                                        }
                                        <span className="text-[0.6875rem] lg:text-[0.75rem] text-[color:var(--text-secondary)] mt-0.5">
                                            Agent cannot be approved until territory is properly assigned.
                                        </span>
                                    </div>
                                )
                            } </div>
                    </SectionCard>

                    <SectionCard title="Bank Details">
                        <div className="
                                                                                grid
                                                                                grid-cols-2
                                                                                xl:grid-cols-3
                                                                                gap-x-[1.5rem]
                                                                                lg:gap-x-[2rem]
                                                                                xl:gap-x-[2.5rem]
                                                                                gap-y-[1.25rem]
                                                                                lg:gap-y-[1.5rem]
                                                                              ">
                            <InfoField label="Bank Name"
                                value={
                                    agent.bankName
                                } />
                            <InfoField label="Account Number"
                                value={
                                    agent.accountNumber
                                } />
                            <InfoField label="IFSC Code"
                                value={
                                    agent.ifscCode
                                } />
                        </div>
                    </SectionCard>

                    <SectionCard title="Documents Provided">
                        <div className="
                                                                                grid grid-cols-1 md:grid-cols-3
                                                                                gap-[1.25rem]
                                                                                lg:gap-[1.5rem]
                                                                                xl:gap-[2rem]
                                                                              ">
                            <DocumentCard label="Aadhaar card (Front)"
                                imageUrl={
                                    agent.aadhaarImageUrl
                                } />
                            <DocumentCard label="Aadhaar card (Back)"
                                imageUrl={
                                    agent.aadhaarBackImageUrl
                                } />
                            <DocumentCard label="Pan card"
                                imageUrl={
                                    agent.panImageUrl
                                } />
                        </div>
                    </SectionCard>

                    <div className="
                                                                      flex items-center justify-between
                                                                      pt-[0.25rem]
                                                                    ">
                        {/* Left Side: Compose Mail */}
                        <button onClick={
                            () => setShowIssueForm(true)
                        }
                            className="
                                                                                font-medium
                                                                                font-[family-name:'Inter',sans-serif]
                                                                                text-white
                                                                                px-[1.75rem]
                                                                                lg:px-[2rem]
                                                                                py-[0.5rem]
                                                                                rounded-full
                                                                                bg-[linear-gradient(110.22deg,var(--approve-gradient-from)_0%,var(--approve-gradient-to)_100%)]
                                                                                text-[0.8125rem]
                                                                                lg:text-[0.875rem]
                                                                                xl:text-[0.9375rem]
                                                                                2xl:text-[1rem]
                                                                                hover:opacity-90
                                                                                active:scale-[0.97]
                                                                                transition-all
                                                                                duration-150
                                                                              ">
                            Compose
                        </button>

                        {/* Right Side: Dismiss and Approve actions */}
                        <div className="
                                                                              flex items-center
                                                                              gap-[0.625rem]
                                                                              lg:gap-[0.75rem]
                                                                              xl:gap-[0.875rem]
                                                                            ">
                            <button onClick={handleDismissClick}
                                className="
                                                                                        font-medium
                                                                                        font-[family-name:'Inter',sans-serif]
                                                                                        text-[color:var(--profile-text)]
                                                                                        px-[1.25rem]
                                                                                        lg:px-[1.5rem]
                                                                                        py-[0.5rem]
                                                                                        rounded-[0.375rem]
                                                                                        text-[0.8125rem]
                                                                                        lg:text-[0.875rem]
                                                                                        xl:text-[0.9375rem]
                                                                                        2xl:text-[1rem]
                                                                                        duration-150
                                                                                      ">
                                Dismiss
                            </button>

                            <button onClick={
                                territoryStatus === "assigned" ? handleApprove : undefined
                            }
                                disabled={
                                    territoryStatus !== "assigned"
                                }
                                title={
                                    territoryStatus !== "assigned" ? "Cannot approve — territory is not assigned" : "Approve this agent"
                                }
                                className={
                                    `
                                                    font-medium
                                                    font-[family-name:'Inter',sans-serif]
                                                    text-white
                                                    px-[1.75rem]
                                                    lg:px-[2rem]
                                                    py-[0.5rem]
                                                    rounded-full
                                                    text-[0.8125rem]
                                                    lg:text-[0.875rem]
                                                    xl:text-[0.9375rem]
                                                    2xl:text-[1rem]
                                                    transition-all
                                                    duration-150
                                                    ${territoryStatus === "assigned" ? "bg-[linear-gradient(110.22deg,var(--approve-gradient-from)_0%,var(--approve-gradient-to)_100%)] hover:opacity-90 active:scale-[0.97] cursor-pointer" : "bg-gray-300 cursor-not-allowed opacity-60"
                                    }
                                                  `
                                }>
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showIssueForm && (
                    <div className="
                                                      fixed
                                                      inset-0
                                                      z-50
                                                      flex
                                                      items-center
                                                      justify-center
                                                      bg-black/40
                                                      backdrop-blur-[2px]
                                                      p-4
                                                    ">
                        <RaiseIssueForm agentEmail={
                            agent.email
                        }
                            onClose={
                                () => setShowIssueForm(false)
                            } />
                    </div>
                )
            } </main>
    );
};

export default AgentDetailPage;
