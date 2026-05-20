import * as React from "react";

import {useNavigate, useParams} from "react-router-dom";
import { useGetAgentByIdMutation } from "@/features/role-manager/api/roleManagerApi";
import { useApproveUserMutation } from "@/features/auth/api/authApi";
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
    panImageUrl?: string;
}
interface AgentDetailPageProps {
    onDismiss?: () => void;
    onApprove?: () => void;
}



// ─── Main Page ────────────────────────────────────────────────────────────────

export const AgentDetailPage = ({onDismiss, onApprove} : AgentDetailPageProps) => {
    const navigate = useNavigate();
    const [showIssueForm, setShowIssueForm] = React.useState(false);

    const { id } = useParams();
    const userId = id ? Number(id) : NaN;

    const [getAgentById, { data, isLoading }] = useGetAgentByIdMutation();
    const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();

    React.useEffect(() => {
        if (!isNaN(userId)) {
            getAgentById(userId);
        }
    }, [userId, getAgentById]);



const apiData = data?.data as any;



const agent: AgentDetail = {
  id: apiData?.id?.toString() || "",

  name:
    apiData?.name ||
    apiData?.full_name ||
    `${apiData?.first_name || ""} ${
      apiData?.last_name || ""
    }`.trim() ||
    "No Name",

  applicationId: apiData?.id?.toString() || "N/A",

  status: "Pending Review",

  initials:
    `${apiData?.first_name || ""} ${
      apiData?.last_name || ""
    }`
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase() || "NA",

  avatarUrl:
    apiData?.avatar ||
    apiData?.profile_image ||
    "",

  bannerUrl: "",

  email: apiData?.email || "N/A",

  phone: apiData?.phone || "N/A",

  dateOfBirth: apiData?.dob
    ? new Date(apiData.dob).toLocaleDateString()
    : "N/A",

  operatingTerritory:
    [
      apiData?.address,
      apiData?.city,
      apiData?.pincode,
    ]
      .filter(Boolean)
      .join(", ") || "N/A",

  bankName: apiData?.bank_name || "N/A",

  accountNumber:
    apiData?.account_number || "N/A",

  ifscCode: apiData?.ifsc_code || "N/A",

  aadhaarImageUrl:
    apiData?.id_proof_front_url || "",

  panImageUrl:
    apiData?.pan_card_url || "",
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

    // TODO: role_id and role_code are hardcoded. Later map from master data dynamically.
    const handleApprove = async () => {
        try {
            await approveUser({
                user_id: apiData?.id || userId || 0,
                role_id: 6,        // Hardcoded: AGENT role id
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

    if (isApproving) {
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
                    <BackButton onClick={onBack}/>
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
                    <ProfileHeaderCard agent={agent}/>

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
                                }/>
                            <InfoField label="Phone number"
                                value={
                                    agent.phone
                                }/>
                            <InfoField label="Date Of Birth"
                                value={
                                    agent.dateOfBirth
                                }/>
                            <InfoField label="Operating Territory"
                                value={
                                    agent.operatingTerritory
                                }
                                className="col-span-2 xl:col-span-3"/>
                        </div>
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
                                }/>
                            <InfoField label="Account Number"
                                value={
                                    agent.accountNumber
                                }/>
                            <InfoField label="IFSC Code"
                                value={
                                    agent.ifscCode
                                }/>
                        </div>
                    </SectionCard>

                    <SectionCard title="Documents Provided">
                        <div className="
                                                grid grid-cols-2
                                                gap-[1.25rem]
                                                lg:gap-[1.5rem]
                                                xl:gap-[2rem]
                                                max-w-[48.75rem]
                                              ">
                            <DocumentCard label="Aadhaar card"
                                imageUrl={
                                    agent.aadhaarImageUrl
                                }/>
                            <DocumentCard label="Pan card"
                                imageUrl={
                                    agent.panImageUrl
                                }/>
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

                            <button onClick={handleApprove}
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
                    <RaiseIssueForm
                        agentEmail={agent.email}
                        onClose={
                            () => setShowIssueForm(false)
                        }
                    />
                </div>
            )
        } </main>
    );
};

export default AgentDetailPage;
