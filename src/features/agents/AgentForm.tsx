// src/features/agents/AgentForm.tsx

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormDropdown } from "@/components/ui/Dropdown";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import SuccessIcon from "@/assets/sucess.svg";
import {
    Upload,
    FileText,
    ArrowLeft,
    BadgeCheck,
    User,
    Camera,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentFormData {
    firstName: string;
    lastName: string;
    age: string;
    phone: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    region: string;
    area: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    aadharFile?: File | null;
    panFile?: File | null;
    aadharFileName?: string;
    panFileName?: string;
    profileImage?: string;
}

interface AgentFormProps {
    /** true  → Edit mode  (pre-fills data, shows "Update Profile") */
    isEdit?: boolean;
    /** Pass existing agent data when in edit mode */
    initialData?: Partial<AgentFormData>;
    /** Called with form payload on save — wire this to your RTK mutation */
    onSave?: (data: AgentFormData) => void | Promise<void>;
    /** Called when Cancel is clicked */
    onCancel?: () => void;
    /** Loading state (e.g. RTK mutation isLoading) */
    isLoading?: boolean;
}

const emptyForm: AgentFormData = {
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    region: "",
    area: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    aadharFile: null,
    panFile: null,
    aadharFileName: "",
    panFileName: "",
};

// ─── Dropdown option lists ────────────────────────────────────────────────────
// Replace with your RTK Query fetched lists as needed

const STATE_OPTIONS = [
    "Andhra Pradesh", "Telangana", "Maharashtra",
    "Karnataka", "Tamil Nadu", "Kerala",
];

const REGION_OPTIONS = [
    "Godavari Region", "Krishna Region", "Rayalaseema Region",
    "North Coastal Region",
];

const AREA_OPTIONS = [
    "Tanuku Area", "Eluru Area", "Rajahmundry Area",
    "Kakinada Area", "Vijayawada Area",
];

const BANK_OPTIONS = [
    "HDFC Bank", "SBI", "ICICI Bank",
    "Axis Bank", "Bank of Baroda", "Canara Bank",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentForm({
    isEdit = false,
    initialData,
    onSave,
    onCancel,
    isLoading = false,
}: AgentFormProps) {
    const [formData, setFormData] = useState<AgentFormData>(emptyForm);

    // Sync initialData when editing
    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    // ── Field helpers ─────────────────────────────────────────────────────────
    const handleChange = (key: keyof AgentFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (onSave) {
            await onSave(formData);
        } else {
            // Fallback: persist locally (dev/demo only)
            localStorage.setItem("agent-data", JSON.stringify(formData));
            alert(isEdit ? "Profile Updated Successfully" : "Profile Saved Successfully");
        }
    };

    const isVerified = isEdit && !!initialData?.firstName;

    return (
        <div
            className="min-h-screen"
            style={{ background: "var(--background)", padding: "clamp(16px,2vw,32px)" }}
        >

            <button
                onClick={onCancel}
                className="
            flex items-center gap-2 px-5 py-3 mb-10
            bg-white rounded-full
            shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
            text-[#353535] hover:opacity-80 transition-opacity cursor-pointer
          "
                style={{ fontSize: "clamp(12px,0.9vw,16px)", fontFamily: "Inter, var(--font-sans)" }}
            >
                <ArrowLeft size={16} strokeWidth={1.4} />
                Go back to dashboard
            </button>
            <div
                className="max-w-[1600px] mx-auto space-y-[clamp(16px,1.5vw,24px)]"
                style={{
                    background: "#FFFFFF",
                    borderRadius: "clamp(24px,2.5vw,46px)",
                    padding: "clamp(20px,2vw,36px)",
                }}
            >

                {/* ── PROFILE BANNER CARD ──────────────────────────────────────── */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        background: "#FFFFFF",
                        borderRadius: "clamp(16px,1.5vw,24px)",
                        boxShadow: "0px 0px 6px rgba(0,0,0,0.12)",
                    }}
                >
                    {/* Banner image */}
                    <div style={{ height: "clamp(120px,13vw,180px)", overflow: "hidden" }}>
                        <img
                            src={Bannar}
                            alt="Banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Profile row */}
                    <div
                        className="flex items-end justify-between px-[clamp(20px,2vw,30px)] pb-[clamp(16px,1.5vw,24px)]"
                        style={{ marginTop: "clamp(-50px,-5vw,-70px)" }}
                    >
                        {/* Avatar + name */}
                        <div className="flex items-end gap-4">
                            <div className="relative shrink-0">

                                {/* PROFILE IMAGE */}

                                <div
                                    className="
                                    rounded-full
                                    bg-white
      border-4
      border-white
      overflow-hidden
      flex
      items-center
      justify-center
    "
                                    style={{
                                        width: "clamp(80px,8vw,160px)",
                                        height: "clamp(80px,8vw,160px)",
                                    }}
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
                                            className="
          w-[40%]
          h-[40%]
          text-[#9CA3AF]
        "
                                        />
                                    )}
                                </div>

                                {/* EDIT BUTTON */}

                                <label
                                    className="
                                    absolute
                                    bottom-1
                                    right-1

                                    w-[32px]
                                    h-[32px]

                                    rounded-full
                                    bg-white

                                    border
                                    border-[var(--border)]

                                    flex
                                    items-center
                                    justify-center

                                    shadow-sm
                                    cursor-pointer
                                    hover:opacity-80
                                    "
                                >
                                    <Camera
                                        size={16}
                                        strokeWidth={1.8}
                                        className="text-[#3E4A3D]"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            if (!file) return;

                                            const imageUrl =
                                                URL.createObjectURL(file);

                                            setFormData((prev) => ({
                                                ...prev,
                                                profileImage: imageUrl,
                                            }));
                                        }}
                                    />
                                </label>

                            </div>
                            <div className="pt-0">
                                <Typography
                                    variant="h2"
                                    className="font-bold text-[#191B1C] "
                                    style={{ fontSize: "clamp(16px,1.5vw,24px)" }}
                                >
                                    {formData.firstName
                                        ? `${formData.firstName} ${formData.lastName}`.trim()
                                        : "Agent Name"}
                                </Typography>
                                <p
                                    className="font-medium"
                                    style={{
                                        fontSize: "clamp(12px,1vw,16px)",
                                        color: "#626C70",
                                    }}
                                >
                                    Agent
                                </p>
                            </div>
                        </div>

                        {/* Verified badge */}
                        {isVerified && (
                            <div
                                className="flex items-center justify-center rounded-[4px] shrink-0"

                            >
                                <img
                                    src={SuccessIcon}
                                    alt="success"
                                    className="w-[clamp(32px,3.5vw,58px)] h-[clamp(32px,3.5vw,58px)] object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* ── REGION / AREA ASSIGNED ───────────────────────────────────── */}
                <FormSection title="Region/Area Assigned">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <FormDropdown
                            label="State"
                            options={STATE_OPTIONS}
                            value={formData.state}
                            onChange={(v) => handleChange("state", v)}
                            placeholder="Select State"
                        />
                        <FormDropdown
                            label="Region"
                            options={REGION_OPTIONS}
                            value={formData.region}
                            onChange={(v) => handleChange("region", v)}
                            placeholder="Select Region"
                        />
                        <FormDropdown
                            label="Area"
                            options={AREA_OPTIONS}
                            value={formData.area}
                            onChange={(v) => handleChange("area", v)}
                            placeholder="Select Area"
                        />
                    </div>
                </FormSection>

                {/* ── ADDRESS + PERSONAL ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-[clamp(14px,1.5vw,20px)]">
                    {/* Address */}
                    <FormSection title="Address Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,1.5vw,20px)]">
                            <Input
                                variant="form"
                                label="City"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={(e) => handleChange("city", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="District"
                                placeholder="Enter district"
                                value={formData.district}
                                onChange={(e) => handleChange("district", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="State"
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={(e) => handleChange("state", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="Pincode"
                                placeholder="Enter pincode"
                                value={formData.pincode}
                                onChange={(e) => handleChange("pincode", e.target.value)}
                            />
                        </div>
                    </FormSection>

                    {/* Personal */}
                    <FormSection title="Personal Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(14px,1.5vw,20px)]">
                            <Input
                                variant="form"
                                label="First Name"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="Last Name"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="Age"
                                placeholder="Enter age"
                                type="number"
                                value={formData.age}
                                onChange={(e) => handleChange("age", e.target.value)}
                            />
                            <Input
                                variant="form"
                                label="Phone Number"
                                placeholder="+91 XXXXX-XXXXX"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>
                    </FormSection>
                </div>

                {/* ── BANK DETAILS ─────────────────────────────────────────────── */}
                <FormSection title="Bank Details">
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
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={(e) => handleChange("accountNumber", e.target.value)}
                        />
                        <Input
                            variant="form"
                            label="IFSC Code"
                            placeholder="e.g. HDFC0001234"
                            value={formData.ifscCode}
                            onChange={(e) => handleChange("ifscCode", e.target.value)}
                        />
                    </div>
                </FormSection>

                {/* ── DOCUMENTS ────────────────────────────────────────────────── */}
                <FormSection title="Documents">
                    <div
                        className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-[0px]
    "
                    >
                        <div className="w-full max-w-[346px]">
                            <UploadBox
                                title="Aadhar Card"
                                fileName={formData.aadharFileName}
                                onFile={(file) =>
                                    setFormData((p) => ({
                                        ...p,
                                        aadharFile: file,
                                        aadharFileName: file?.name ?? "",
                                    }))
                                }
                            />
                        </div>

                        <div className="w-full max-w-[346px]">
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
                    </div>
                </FormSection>

                {/* ── ACTION BUTTONS ───────────────────────────────────────────── */}
                <div className="flex justify-end items-center gap-[clamp(12px,1vw,16px)]">

                    {/* CANCEL */}

                    <Button
                        variant="outline-dark"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="
      !h-[40px]
      !min-w-[101px]
      !px-[24px]
      !py-[8px]
      !font-[Inter]
      !font-medium
      !text-[clamp(13px,0.9vw,16px)]
      !leading-[24px]

      !normal-case
      !tracking-normal

      !shadow-none
    "
                    >
                        Cancel
                    </Button>

                    {/* SAVE PROFILE */}

                    <Button
                        variant="primary"
                        onClick={handleSave}
                        loading={isLoading}
                        className="
      !h-[40px]
      !min-w-[155px]

      !rounded-[100px]

      !px-[32px]
      !py-[8px]

      !font-[Inter]
      !font-medium

      !text-[clamp(13px,0.9vw,16px)]
      !leading-[24px]

      !normal-case
      !tracking-normal

      !bg-[linear-gradient(110.22deg,_#2680C4_0%,_#4A7BBB_100%)]

      !shadow-none
    "
                    >
                        {isEdit ? "Update Profile" : "Save Profile"}
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
            className="space-y-[clamp(14px,1.5vw,20px)]"
            style={{
                background: "#FFFFFF",
                border: "1px solid var(--border)",
                borderRadius: "clamp(16px,1.5vw,24px)",
                boxShadow: "0px 0px 6px rgba(0,0,0,0.12)",
                padding: "clamp(18px,1.8vw,30px)",
            }}
        >
            <Typography
                variant="h3"
                className="font-semibold"
                style={{
                    fontSize: "clamp(16px,1.4vw,24px)",
                    color: "#5A5C5E",
                }}
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
                className="font-medium"
                style={{
                    fontSize: "clamp(12px,0.97vw,16px)",
                    color: "#3E4A3D",
                }}
            >
                {title}
            </p>

            <div
                onClick={() => inputRef.current?.click()}
                className="
          flex flex-col items-center justify-center gap-2
          border-2 border-dashed border-[rgba(225,229,239,0.6)]
          rounded-[12px] cursor-pointer
          bg-[rgba(242,244,246,0.5)]
          hover:bg-[rgba(242,244,246,0.9)]
          transition-colors
        "
                style={{ height: "clamp(100px,9vw,128px)" }}
            >
                {fileName ? (
                    <>
                        <FileText
                            strokeWidth={1.5}
                            style={{
                                width: "clamp(20px,1.8vw,28px)",
                                height: "clamp(20px,1.8vw,28px)",
                                color: "#3E4A3D",
                            }}
                        />
                        <span
                            className="font-medium text-center px-3 truncate max-w-full"
                            style={{
                                fontSize: "clamp(11px,0.85vw,14px)",
                                color: "#191C1E",
                            }}
                        >
                            {fileName}
                        </span>
                    </>
                ) : (
                    <>
                        <Upload
                            strokeWidth={1.5}
                            style={{
                                width: "clamp(18px,1.6vw,24px)",
                                height: "clamp(18px,1.6vw,24px)",
                                color: "#3E4A3D",
                            }}
                        />
                        <span
                            className="font-medium"
                            style={{
                                fontSize: "clamp(12px,0.9vw,16px)",
                                color: "#191C1E",
                            }}
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