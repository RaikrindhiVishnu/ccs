import { useRef, useState } from "react";
import { useAppSelector } from "@/core/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormDropdown } from "@/components/ui/Dropdown";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { Upload, FileText, ArrowLeft, User, Camera } from "lucide-react";
import { useCreateAgentMutation } from "../api/agentApi";
import { uploadToPresignedUrl } from "@/core/utils/fileUpload";
import type { AgentFormData, AgentFormProps } from "../types/agent";

const emptyForm: AgentFormData = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    region: "",
    area: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    bankBranch: "",
    panNumber: "",
    aadharFile: null,
    aadharBackFile: null,
    panFile: null,
    aadharFileName: "",
    aadharBackFileName: "",
    panFileName: "",
};

// ─── Dropdown option lists ────────────────────────────────────────────────────

const REGION_OPTIONS = [
    "Godavari Region",
    "Krishna Region",
    "Rayalaseema Region",
    "North Coastal Region",
];

const AREA_OPTIONS = [
    "Tanuku Area",
    "Eluru Area",
    "Rajahmundry Area",
    "Kakinada Area",
    "Vijayawada Area",
];

const BANK_OPTIONS = [
    "HDFC Bank",
    "SBI",
    "ICICI Bank",
    "Axis Bank",
    "Bank of Baroda",
    "Canara Bank",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentForm({
    isEdit = false,
    initialData,
    onSave,
    onCancel,
    isLoading = false,
}: AgentFormProps) {
    // Get states from Redux store
    const states = useAppSelector((state) => state.roleManager.states);
    const stateOptions = states.map((s) => s.desc);

    // Initialise directly from initialData — no useEffect needed
    const [formData, setFormData] = useState<AgentFormData>(() => ({
        ...emptyForm,
        ...initialData,
    }));

    const [createAgent, { isLoading: isSubmitting }] = useCreateAgentMutation();

    const handleChange = (key: keyof AgentFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            // 1. Upload Documents (Mock)
            const [aadharFrontUrl, aadharBackUrl, panUrl] = await Promise.all([
                formData.aadharFile ? uploadToPresignedUrl(formData.aadharFile) : Promise.resolve(""),
                formData.aadharBackFile ? uploadToPresignedUrl(formData.aadharBackFile) : Promise.resolve(""),
                formData.panFile ? uploadToPresignedUrl(formData.panFile) : Promise.resolve(""),
            ]);

            // 2. Construct API Payload
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                countryCode: "+91", // Default
                emailAddress: formData.email,
                phoneNumber: formData.phone,
                dob: formData.dob,
                role_id: 1, // Hardcoded for Agent
                address: {
                    address: formData.address,
                    state_id: 1, // Dummy ID
                    city: formData.city,
                    pincode: formData.pincode,
                },
                geo_assignments: {
                    country_id: 1,
                    state_id: 1,
                    district_id: 1,
                    mandal_id: 1,
                    region_id: 1,
                    areas_id: 1,
                },
                id_proof: {
                    bank_account_name: `${formData.firstName} ${formData.lastName}`,
                    bank_account_number: formData.accountNumber,
                    ifsc_code: formData.ifscCode,
                    branch: formData.bankBranch,
                    bank_name: formData.bankName,
                    id_proof_frontUrl: aadharFrontUrl,
                    id_proof_backUrl: aadharBackUrl,
                    pan_card_number: formData.panNumber,
                    pan_card_url: panUrl,
                },
            };

            // 3. Trigger API Call
            await createAgent(payload).unwrap();

            alert(isEdit ? "Profile Updated Successfully" : "Agent Created Successfully");
            if (onCancel) onCancel();
        } catch (err) {
            console.error("Failed to save agent:", err);
            alert("Error: " + (err as any)?.data?.message || "Something went wrong");
        }
    };

    const isVerified = isEdit && !!initialData?.firstName;

    return (
        <div className="min-h-screen bg-[color:var(--surface-page)] p-[clamp(16px,2vw,32px)]">
            {/* ── Go Back ── */}
            <button
                onClick={onCancel}
                className="
                    flex items-center gap-2 px-5 py-3 mb-10
                    bg-[color:var(--surface-card)] rounded-full
                    shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
                    text-[color:var(--text-secondary)]
                    text-[length:clamp(12px,0.9vw,16px)]
                    font-[family-name:var(--font-inter)]
                    hover:opacity-80 transition-opacity cursor-pointer
                "
            >
                <ArrowLeft size={16} strokeWidth={1.4} />
                Go back to dashboard
            </button>
            <Typography
                variant="h3"
                className="font-bold text-[clamp(20px,2vw,32px)] text-[color:var(--text-primary)] mb-6"
            >
                {isEdit ? "Edit Agent" : "Create Agent"}
            </Typography>

            {/* ── Outer card ── */}
            <div
                className="
                    max-w-[1600px] mx-auto
                    space-y-[clamp(16px,1.5vw,24px)]
                    bg-[color:var(--surface-card)]
                    rounded-[clamp(24px,2.5vw,46px)]
                    p-[clamp(20px,2vw,36px)]
                "
            >
                {/* ── PROFILE BANNER CARD ──────────────────────────────────────── */}
                <div
                    className="
                        relative overflow-hidden
                        bg-[color:var(--surface-card)]
                        rounded-[clamp(16px,1.5vw,24px)]
                        shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
                    "
                >
                    {/* Banner image */}
                    <div className="h-[clamp(80px,13vw,140px)] overflow-hidden">
                        <img
                            src={Bannar}
                            alt="Banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Profile row */}
                    <div
                        className="
                            flex items-end justify-between
                            px-[clamp(20px,2vw,30px)] pb-[clamp(16px,1.5vw,24px)]
                            -mt-[clamp(50px,5vw,70px)]
                        "
                    >
                        {/* Avatar + name */}
                        <div className="flex items-end gap-4">
                            <div className="relative shrink-0">
                                {/* Profile image */}
                                <div
                                    className="
                                        rounded-full bg-[color:var(--surface-card)]
                                        border-4 border-[color:var(--surface-card)]
                                        overflow-hidden
                                        flex items-center justify-center
                                        w-[clamp(80px,8vw,160px)] h-[clamp(80px,8vw,160px)]
                                    "
                                >
                                    {formData.profileImage ? (
                                        <img
                                            src={formData.profileImage}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User
                                            strokeWidth={1.5}
                                            className="w-[40%] h-[40%] text-[color:var(--text-muted)]"
                                        />
                                    )}
                                </div>

                                {/* Edit button */}
                                <label
                                    className="
                                        absolute bottom-1 right-1
                                        w-[32px] h-[32px]
                                        rounded-full bg-[color:var(--surface-card)]
                                        border border-[color:var(--border)]
                                        flex items-center justify-center
                                        shadow-sm cursor-pointer hover:opacity-80
                                    "
                                >
                                    <Camera
                                        size={16}
                                        strokeWidth={1.8}
                                        className="text-[color:var(--label-color)]"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const imageUrl = URL.createObjectURL(file);
                                            setFormData((prev) => ({
                                                ...prev,
                                                profileImage: imageUrl,
                                            }));
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Name + role */}
                            <div className="pt-20">
                                <Typography
                                    variant="h2"
                                    className="font-bold text-[color:var(--profile-text)] text-[length:clamp(16px,1.5vw,24px)]"
                                >
                                    {formData.firstName
                                        ? `${formData.firstName} ${formData.lastName}`.trim()
                                        : "Agent Name"}
                                </Typography>
                                <p className="font-medium text-[length:clamp(12px,1vw,16px)] text-[color:var(--text-supporting)]">
                                    Agent
                                </p>
                            </div>
                        </div>

                        {/* Verified badge */}
                        {isVerified && (
                            <div className="flex items-center justify-center rounded-[4px] shrink-0">
                                <img
                                    src={SuccessIcon}
                                    alt="success"
                                    className="w-[clamp(32px,3.5vw,58px)] h-[clamp(32px,3.5vw,58px)] object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* ── ENTER AGENT INFORMATION ──────────────────────────────────── */}
                <FormSection title="Enter Agent Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <Input
                            variant="form"
                            label="First Name"
                            placeholder="Enter First name"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Last Name"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="D.O.B."
                            placeholder="Enter Age"
                            value={formData.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Mail"
                            placeholder="Enter Mail ID"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="State"
                            placeholder="Enter State"
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="City / Village"
                            placeholder="Enter City / Village"
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Pin Code"
                            placeholder="Enter Pin Code"
                            value={formData.pincode}
                            onChange={(e) => handleChange("pincode", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="PAN Card Number"
                            placeholder="Enter PAN Number"
                            value={formData.panNumber}
                            onChange={(e) => handleChange("panNumber", e.target.value)}
                        />
                    </div>
                </FormSection>

                {/* ── SELECT STATE, REGION & AREA ──────────────────────────────── */}
                <FormSection title="Select State, Region & Area">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <FormDropdown
                            label="State"
                            options={stateOptions}
                            value={formData.state}
                            onChange={(v) => handleChange("state", v)}
                            placeholder="Andhra Pradesh"
                        />
                        <div>
                            <FormDropdown
                                label="Region"
                                options={REGION_OPTIONS}
                                value={formData.region}
                                onChange={(v) => handleChange("region", v)}
                                placeholder="Godavari Region"
                            />
                            <div className="mt-3 space-y-2">
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                                    RO : Jayanth kumar (GLC 0012)
                                </p>
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                                    IO : Jayanth kumar (GLC 0012)
                                </p>
                            </div>
                        </div>
                        <div>
                            <FormDropdown
                                label="Area"
                                options={AREA_OPTIONS}
                                value={formData.area}
                                onChange={(v) => handleChange("area", v)}
                                placeholder="Tanuku Area"
                            />
                            <div className="mt-3">
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                                    FO : Ram Verma (GLC 0019)
                                </p>
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* ── BANK DETAILS ─────────────────────────────────────────────── */}
                <FormSection title="Enter Bank Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <FormDropdown
                            label="Bank Name"
                            options={BANK_OPTIONS}
                            value={formData.bankName}
                            onChange={(v) => handleChange("bankName", v)}
                            placeholder="Select Bank"
                        />
                        <Input
                            variant="form"
                            label="Account Number"
                            placeholder="Enter Account Number"
                            value={formData.accountNumber}
                            onChange={(e) => handleChange("accountNumber", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="IFSC Code"
                            placeholder="Enter IFSC Code"
                            value={formData.ifscCode}
                            onChange={(e) => handleChange("ifscCode", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="Bank Branch"
                            placeholder="Enter Bank Branch"
                            value={formData.bankBranch}
                            onChange={(e) => handleChange("bankBranch", e.target.value)}
                        />
                    </div>
                </FormSection>

                {/* ── UPLOAD DOCUMENTS ─────────────────────────────────────────── */}
                <FormSection title="Upload Documents">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,30px)]">
                        <UploadBox
                            title="Aadhar Card (Front)"
                            fileName={formData.aadharFileName}
                            onFile={(file) =>
                                setFormData((p) => ({
                                    ...p,
                                    aadharFile: file,
                                    aadharFileName: file?.name ?? "",
                                }))
                            }
                        />
                        <UploadBox
                            title="Aadhar Card (Back)"
                            fileName={formData.aadharBackFileName}
                            onFile={(file) =>
                                setFormData((p) => ({
                                    ...p,
                                    aadharBackFile: file,
                                    aadharBackFileName: file?.name ?? "",
                                }))
                            }
                        />
                        <UploadBox
                            title="Pan Card"
                            fileName={formData.panFileName}
                            onFile={(file) =>
                                setFormData((p) => ({
                                    ...p,
                                    panFile: file,
                                    panFileName: file?.name ?? "",
                                }))
                            }
                        />
                    </div>
                </FormSection>

                {/* ── ACTION BUTTONS ───────────────────────────────────────────── */}
                <div className="flex justify-end items-center gap-[clamp(12px,1vw,16px)] pt-4">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="
                            text-[clamp(12px,0.9vw,16px)] font-medium text-[color:var(--text-primary)]
                            px-6 py-2 hover:opacity-70 transition-opacity disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>

                    <Button
                        variant="primary"
                        onClick={handleSave}
                        loading={isLoading || isSubmitting}
                        className="
                            !h-[44px] !min-w-[180px]
                            !rounded-[100px]
                            !px-[32px] !py-[8px]
                            !font-[family-name:var(--font-inter)] !font-medium
                            !text-[length:clamp(13px,0.9vw,16px)]
                            !bg-[linear-gradient(110.22deg,_#2680C4_0%,_#4A7BBB_100%)]
                            !shadow-none
                        "
                    >
                        {isEdit ? "Update Profile" : "Create Profile"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── FormSection ──────────────────────────────────────────────────────────────

function FormSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                space-y-[clamp(14px,1.5vw,20px)]
                bg-[color:var(--surface-card)]
                border border-[color:var(--border)]
                rounded-[clamp(16px,1.5vw,24px)]
                shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
                p-[clamp(18px,1.8vw,30px)]
            "
        >
            <Typography
                variant="h3"
                className="font-semibold text-[length:clamp(16px,1.4vw,24px)] text-[color:var(--text-subtle)]"
            >
                {title}
            </Typography>
            {children}
        </div>
    );
}

// ─── UploadBox ────────────────────────────────────────────────────────────────

function UploadBox({
    title,
    fileName,
    onFile,
}: {
    title: string;
    fileName?: string;
    onFile: (file: File | null) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-[clamp(8px,0.8vw,14px)]">
            <p
                className="
                    font-medium
                    text-[length:clamp(12px,0.97vw,16px)]
                    text-[color:var(--label-color)]
                    font-[family-name:var(--font-sans)]
                "
            >
                {title}
            </p>

            <div
                onClick={() => inputRef.current?.click()}
                className="
                    flex flex-col items-center justify-center gap-2
                    h-[clamp(100px,9vw,128px)]
                    border-2 border-dashed border-[color:var(--border-default)]
                    rounded-[var(--radius-dropdown)]
                    cursor-pointer
                    bg-[color:var(--input)]
                    hover:brightness-95
                    transition-colors
                "
            >
                {fileName ? (
                    <>
                        <FileText
                            strokeWidth={1.5}
                            className="
                                w-[clamp(20px,1.8vw,28px)] h-[clamp(20px,1.8vw,28px)]
                                text-[color:var(--label-color)]
                            "
                        />
                        <span
                            className="
                                font-medium text-center px-3 truncate max-w-full
                                text-[length:clamp(11px,0.85vw,14px)]
                                text-[color:var(--profile-text)]
                                font-[family-name:var(--font-sans)]
                            "
                        >
                            {fileName}
                        </span>
                    </>
                ) : (
                    <>
                        <Upload
                            strokeWidth={1.5}
                            className="
                                w-[clamp(18px,1.6vw,24px)] h-[clamp(18px,1.6vw,24px)]
                                text-[color:var(--label-color)]
                            "
                        />
                        <span
                            className="
                                font-medium
                                text-[length:clamp(12px,0.9vw,16px)]
                                text-[color:var(--profile-text)]
                                font-[family-name:var(--font-sans)]
                            "
                        >
                            Upload File
                        </span>
                    </>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
        </div>
    );
}