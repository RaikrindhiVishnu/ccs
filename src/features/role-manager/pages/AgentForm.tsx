import { useRef } from "react";                          // removed useState for files
import { useAppSelector } from "@/core/hooks";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { Upload, FileText, ArrowLeft, User, Camera } from "lucide-react";
import { useCreateAgentMutation } from "../api/agentApi";
import type { AgentFormProps } from "../types/agent";
import { useForm, Controller } from "react-hook-form";   // added Controller
import type { Control } from "react-hook-form";          // type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import { agentSchema, type AgentFormValues } from "@/components/validations/agentSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { toast } from "sonner";
import { useState } from "react";                        // kept only for profileImage

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

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentForm({
    isEdit = false,
    initialData,
    onCancel,
    isLoading = false,
}: AgentFormProps) {
    const states = useAppSelector((state) => state.roleManager.states);
    const stateOptions = states.map((s) => s.desc);

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [createAgent, { isLoading: isSubmitting }] = useCreateAgentMutation();

    const { control, handleSubmit, watch } = useForm<AgentFormValues>({
        resolver: zodResolver(agentSchema),
        defaultValues: {
            firstName: initialData?.firstName ?? "",
            lastName: initialData?.lastName ?? "",
            dob: initialData?.dob ?? "",
            email: initialData?.email ?? "",
            phone: initialData?.phone ?? "",
            address: initialData?.address ?? "",
            addressState: initialData?.state ?? "",
            city: initialData?.city ?? "",
            pincode: initialData?.pincode ?? "",
            panNumber: initialData?.panNumber ?? "",
            state: initialData?.state ?? "",
            region: initialData?.region ?? "",
            area: initialData?.area ?? "",
            bankName: initialData?.bankName ?? "",
            accountNumber: initialData?.accountNumber ?? "",
            ifscCode: initialData?.ifscCode ?? "",
            bankBranch: initialData?.bankBranch ?? "",
            // ── file fields ──
            profilePicture: undefined,
            aadharFront: undefined,
            aadharBack: undefined,
            panCard: undefined,
        },
    });

    const firstName = watch("firstName");
    const lastName = watch("lastName");

    const handleSave = async (values: AgentFormValues) => {
        try {
            const payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                countryCode: "+91",
                emailAddress: values.email,
                phoneNumber: values.phone,
                dob: values.dob,
                role_id: 1,
                address: {
                    address: values.address,
                    state_id: 1,
                    city: values.city,
                    pincode: values.pincode,
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
                    bank_account_name: `${values.firstName} ${values.lastName}`,
                    bank_account_number: values.accountNumber,
                    ifsc_code: values.ifscCode,
                    branch: values.bankBranch,
                    bank_name: values.bankName,
                    id_proof_frontUrl: "front.png",
                    id_proof_backUrl: "back.png",
                    pan_card_number: values.panNumber,
                    pan_card_url: "pan.png",
                },
            };

            await createAgent(payload).unwrap();
            toast.success(isEdit ? "Profile Updated Successfully" : "Agent Created Successfully");
            if (onCancel) onCancel();
        } catch (err) {
            console.error("Failed to save agent:", err);
            toast.error((err as any)?.data?.message || "Something went wrong");
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
                {/* ── PROFILE BANNER CARD ── */}
                <div
                    className="
                        relative overflow-hidden
                        bg-[color:var(--surface-card)]
                        rounded-[clamp(16px,1.5vw,24px)]
                        shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
                    "
                >
                    <div className="h-[clamp(80px,13vw,140px)] overflow-hidden">
                        <img src={Bannar} alt="Banner" className="w-full h-full object-cover" />
                    </div>

                    <div
                        className="
                            flex items-end justify-between
                            px-[clamp(20px,2vw,30px)] pb-[clamp(16px,1.5vw,24px)]
                            -mt-[clamp(50px,5vw,70px)]
                        "
                    >
                        <div className="flex items-end gap-4">
                            <div className="relative shrink-0">
                                {/* ── Profile picture — now RHF-controlled ── */}
                                <Controller
                                    name="profilePicture"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <div
                                                className={`
                                                    rounded-full bg-[color:var(--surface-card)]
                                                    border-4 overflow-hidden
                                                    flex items-center justify-center
                                                    w-[clamp(80px,8vw,160px)] h-[clamp(80px,8vw,160px)]
                                                    ${fieldState.error ? "border-red-500" : "border-[color:var(--surface-card)]"}
                                                `}
                                            >
                                                {profileImage ? (
                                                    <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User strokeWidth={1.5} className="w-[40%] h-[40%] text-[color:var(--text-muted)]" />
                                                )}
                                            </div>
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
                                                <Camera size={16} strokeWidth={1.8} className="text-[color:var(--label-color)]" />
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        field.onChange(file);
                                                        setProfileImage(URL.createObjectURL(file));
                                                    }}
                                                />
                                            </label>
                                            {fieldState.error && (
                                                <span className="absolute -bottom-5 left-0 text-red-500 text-[0.7rem] whitespace-nowrap">
                                                    {fieldState.error.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <div className="pt-20">
                                <Typography
                                    variant="h2"
                                    className="font-bold text-[color:var(--profile-text)] text-[length:clamp(16px,1.5vw,24px)]"
                                >
                                    {firstName ? `${firstName} ${lastName}`.trim() : "Agent Name"}
                                </Typography>
                                <p className="font-medium text-[length:clamp(12px,1vw,16px)] text-[color:var(--text-supporting)]">
                                    Agent
                                </p>
                            </div>
                        </div>

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

                {/* ── ENTER AGENT INFORMATION ── */}
                <FormSection title="Enter Agent Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <RHFTextField name="firstName" control={control} label="First Name" placeholder="Enter First name" maxLength={30} />
                        <RHFTextField name="lastName" control={control} label="Last Name" placeholder="Enter Last Name" maxLength={30} />
                        <RHFTextField name="dob" control={control} label="D.O.B." placeholder="Enter Age" type="date" />
                        <RHFTextField name="email" control={control} label="Mail" placeholder="Enter Mail ID" type="email" maxLength={150} />
                        <RHFTextField name="phone" control={control} label="Mobile Number" placeholder="Enter Mobile Number" type="tel" maxLength={10} />
                        <RHFTextField name="address" control={control} label="Address" placeholder="Enter Address" maxLength={150} />
                        <RHFTextField name="addressState" control={control} label="State" placeholder="Enter State" maxLength={30} />
                        <RHFTextField name="city" control={control} label="City / Village" placeholder="Enter City / Village" maxLength={30} />
                        <RHFTextField name="pincode" control={control} label="Pin Code" placeholder="Enter Pin Code" maxLength={6} />
                        <RHFTextField name="panNumber" control={control} label="PAN Card Number" placeholder="Enter PAN Number" maxLength={30} />
                    </div>
                </FormSection>

                {/* ── SELECT STATE, REGION & AREA ── */}
                <FormSection title="Select State, Region & Area">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <RHFDropdown name="state" control={control} label="State" options={INDIAN_STATES} placeholder="Andhra Pradesh" />
                        <div>
                            <RHFDropdown name="region" control={control} label="Region" options={REGION_OPTIONS} placeholder="Godavari Region" />
                            <div className="mt-3 space-y-2">
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">RO : Jayanth kumar (GLC 0012)</p>
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">IO : Jayanth kumar (GLC 0012)</p>
                            </div>
                        </div>
                        <div>
                            <RHFDropdown name="area" control={control} label="Area" options={AREA_OPTIONS} placeholder="Tanuku Area" />
                            <div className="mt-3">
                                <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">FO : Ram Verma (GLC 0019)</p>
                            </div>
                        </div>
                    </div>
                </FormSection>

                {/* ── BANK DETAILS ── */}
                <FormSection title="Enter Bank Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
                        <RHFDropdown name="bankName" control={control} label="Bank Name" options={BANK_OPTIONS} placeholder="Select Bank" />
                        <RHFTextField name="accountNumber" control={control} label="Account Number" placeholder="Enter Account Number" maxLength={30} />
                        <RHFTextField name="ifscCode" control={control} label="IFSC Code" placeholder="Enter IFSC Code" maxLength={30} />
                        <RHFTextField name="bankBranch" control={control} label="Bank Branch" placeholder="Enter Bank Branch" maxLength={30} />
                    </div>
                </FormSection>

                {/* ── UPLOAD DOCUMENTS — now RHF-controlled ── */}
                <FormSection title="Upload Documents">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,30px)]">
                        <UploadBox name="aadharFront" title="Aadhar Card (Front)" control={control} />
                        <UploadBox name="aadharBack" title="Aadhar Card (Back)" control={control} />
                        <UploadBox name="panCard" title="Pan Card" control={control} />
                    </div>
                </FormSection>

                {/* ── ACTION BUTTONS ── */}
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
                        onClick={handleSubmit(handleSave, (errors) => console.log("Validation errors:", errors))}
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

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
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

// ─── UploadBox (now RHF-controlled) ──────────────────────────────────────────

function UploadBox({
    title,
    name,
    control,
}: {
    title: string;
    name: "aadharFront" | "aadharBack" | "panCard";
    control: Control<AgentFormValues>;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="space-y-[clamp(8px,0.8vw,14px)]">
                    <p className="font-medium text-[length:clamp(12px,0.97vw,16px)] text-[color:var(--label-color)] font-[family-name:var(--font-sans)]">
                        {title}
                    </p>
                    <div
                        onClick={() => inputRef.current?.click()}
                        className={`
                            flex flex-col items-center justify-center gap-2
                            h-[clamp(100px,9vw,128px)]
                            border-2 border-dashed rounded-[var(--radius-dropdown)]
                            cursor-pointer bg-[color:var(--input)]
                            hover:brightness-95 transition-colors
                            ${fieldState.error
                                ? "border-red-500 bg-red-50/30"
                                : "border-[color:var(--border-default)]"
                            }
                        `}
                    >
                        {field.value ? (
                            <>
                                <FileText strokeWidth={1.5} className="w-[clamp(20px,1.8vw,28px)] h-[clamp(20px,1.8vw,28px)] text-[color:var(--label-color)]" />
                                <span className="font-medium text-center px-3 truncate max-w-full text-[length:clamp(11px,0.85vw,14px)] text-[color:var(--profile-text)] font-[family-name:var(--font-sans)]">
                                    {field.value.name}
                                </span>
                            </>
                        ) : (
                            <>
                                <Upload strokeWidth={1.5} className="w-[clamp(18px,1.6vw,24px)] h-[clamp(18px,1.6vw,24px)] text-[color:var(--label-color)]" />
                                <span className="font-medium text-[length:clamp(12px,0.9vw,16px)] text-[color:var(--profile-text)] font-[family-name:var(--font-sans)]">
                                    Upload File
                                </span>
                            </>
                        )}
                    </div>
                    {fieldState.error && (
                        <span className="text-red-500 text-[0.75rem] leading-none">
                            {fieldState.error.message}
                        </span>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
                    />
                </div>
            )}
        />
    );
}