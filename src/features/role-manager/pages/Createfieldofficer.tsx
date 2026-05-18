import { useRef, useEffect } from "react"; // removed useState
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ImageUp, FileImage } from "lucide-react";
// ── Reused shared components ──────────────────────────────────────────────────
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import {
  useCreateFieldOfficerMutation,
  useUpdateFieldOfficerMutation,
} from "@/features/role-manager/api/agentApi";

import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form"; // added Controller, Control
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  officerSchema,
  type OfficerFormValues,
} from "@/components/validations/officerSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { useGetAllMasterDataQuery } from "@/features/role-manager/api/masterDataApi";
import { getRoleId } from "@/features/role-manager/utils/getRoleId";
import { useSelector } from "react-redux";
import { useGetFieldOfficerByIdMutation } from "@/features/role-manager/api/roleManagerApi";
const BACK_ROUTE = "/role-manager/create-roles" as const;

// ─── Field Label ──────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      as="label"
      variant="span"
      className="font-[family-name:var(--font-sans)] font-medium leading-[1.25] text-[color:var(--label-color)] text-[clamp(0.75rem,0.97vw,1rem)]"
    >
      {children}
    </Typography>
  );
}

// ─── Upload Picture (now RHF-controlled) ─────────────────────────────────────

function UploadPictureField({
  control,
  disabled = false,
}: {
  control: Control<OfficerFormValues>;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name="profilePicture"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[clamp(0.375rem,0.5vw,0.625rem)]">
          <FieldLabel>Upload Picture</FieldLabel>
          <button
            type="button"
            onClick={() => !disabled && ref.current?.click()}
            disabled={disabled}
            className={cn(
              "flex items-center justify-between w-full h-[clamp(2rem,2.78vw,2.5rem)] px-[clamp(0.625rem,0.97vw,0.875rem)] bg-[color:var(--surface-card)] border rounded-[clamp(0.5rem,0.83vw,0.75rem)] transition-colors duration-150",
              disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "cursor-pointer border-[color:var(--border-default)] hover:border-[color:var(--brand-500)]",
              fieldState.error && "border-red-500",
            )}
          >
            <span className="flex-1 text-left truncate mr-2 font-[family-name:var(--font-inter)] font-normal text-[clamp(0.6875rem,0.83vw,0.875rem)] text-[color:var(--text-muted)]">
              {field.value?.name ?? "Supports JPEG, PNG and Other Formats"}
            </span>
            <ImageUp className="shrink-0 text-[var(--text-primary)] w-[1.125rem] h-[1.125rem] stroke-[1.75]" />
            <input
              ref={ref}
              type="file"
              disabled={disabled}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
            />
          </button>
          {fieldState.error && (
            <span className="text-red-500 text-[0.75rem] leading-none">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

// ─── Document Upload Zone (now RHF-controlled) ───────────────────────────────

function DocUploadField({
  label,
  name,
  control,
  disabled = false,
}: {
  label: string;
  name: "aadharFront" | "aadharBack" | "panCard";
  control: Control<OfficerFormValues>;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[clamp(0.5rem,0.97vw,0.875rem)]">
          <Typography
            as="span"
            variant="span"
            className="font-[family-name:var(--font-sans)] font-medium leading-[1.25] text-[color:var(--label-color)] text-[clamp(0.75rem,0.97vw,1rem)]"
          >
            {label}
          </Typography>
          <button
            type="button"
            onClick={() => !disabled && ref.current?.click()}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)] h-[clamp(5rem,8.89vw,8rem)] bg-[color:var(--surface-page)] border-2 border-dashed rounded-[clamp(0.5rem,0.83vw,0.75rem)] transition-colors duration-200",
              disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "cursor-pointer border-[color:var(--border-default)] hover:border-[color:var(--brand-500)] hover:bg-[color:var(--brand-tint)]",
              fieldState.error && "border-red-500 bg-red-50/30",
            )}
          >
            <FileImage className="shrink-0 text-[var(--text-primary)] w-[1rem] h-[1rem] stroke-[1.75]" />
            <Typography
              as="span"
              variant="span"
              className="font-[family-name:var(--font-inter)] font-medium text-[clamp(0.75rem,0.97vw,1rem)] leading-[1.5] text-[color:var(--text-primary)] text-center"
            >
              {field.value ? "File Selected" : "Click to Upload"}
            </Typography>
            {field.value && (
              <Typography
                as="span"
                variant="span"
                className="font-[family-name:var(--font-inter)] font-normal text-[clamp(0.625rem,0.69vw,0.75rem)] text-[color:var(--brand-500)] text-center max-w-[90%] truncate"
              >
                {field.value.name}
              </Typography>
            )}
            <input
              ref={ref}
              type="file"
              disabled={disabled}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
            />
          </button>
          {fieldState.error && (
            <span className="text-red-500 text-[0.75rem] leading-none">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

// ─── Section Panel ────────────────────────────────────────────────────────────

function SectionPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-[clamp(1rem,1.67vw,1.5rem)] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] border-none">
      <CardHeader className="px-[clamp(1.25rem,1.875vw,1.875rem)] pt-[clamp(1.25rem,2.08vw,2rem)] pb-[clamp(1rem,2.08vw,2rem)]">
        <CardTitle className="font-[family-name:var(--font-sans)] font-semibold leading-[1.25] text-[color:var(--text-subtle)] text-[clamp(1rem,1.39vw,1.5rem)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-[clamp(1.25rem,1.875vw,1.875rem)] pb-[clamp(1.25rem,2.08vw,2rem)] pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

const REGIONS = ["North", "South", "East", "West", "Central", "North-East"];

// ─── Page ─────────────────────────────────────────────────────────────────────

const CreateFieldOfficer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;
  const isViewMode = location.state?.isViewMode || false;
  const fromPath = location.state?.from || BACK_ROUTE;

  const isEditMode = !!userId;
  const [createFieldOfficer, { isLoading }] = useCreateFieldOfficerMutation();

  const [updateFieldOfficer] = useUpdateFieldOfficerMutation();
  const { data: masterData } = useGetAllMasterDataQuery();
  const fieldOfficerRoleId = getRoleId(
    masterData?.data?.userRolesResult || [],
    "FO",
  );
  const { control, handleSubmit, reset } = useForm<OfficerFormValues>({
    resolver: zodResolver(officerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      mobile: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      region: "",
      area: "",
      profilePicture: undefined,
      aadharFront: undefined,
      aadharBack: undefined,
      panCard: undefined,
    },
  });
  const initialData = location.state?.initialData;

  const [getFieldOfficerById, { data: fieldOfficerData }] =
    useGetFieldOfficerByIdMutation();

  const fetchedRef = useRef<any>(null);

  useEffect(() => {
    if (userId && fetchedRef.current !== userId) {
      fetchedRef.current = userId;
      getFieldOfficerById(userId);
    }
  }, [userId, getFieldOfficerById]);

  // 1. Immediate pre-fill using initialData as fallback/instant load
  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.first_name || initialData.firstName || "",
        lastName: initialData.last_name || initialData.lastName || "",
        dob: initialData.dob || "",
        email: initialData.email || initialData.emailAddress || "",
        mobile: initialData.phone || initialData.mobile || initialData.phoneNumber || initialData.contact || "",
        address: initialData.address?.address || initialData.address || "",
        city: initialData.address?.city || initialData.city || "",
        pincode: initialData.address?.pincode || initialData.pincode || "",
        state: initialData.state || "",
        region: initialData.region || "",
      });
    }
  }, [initialData, reset]);

  // 2. Prefill/reset the form using server-fetched fieldOfficerData
  useEffect(() => {
    if (fieldOfficerData?.data) {
      const data = fieldOfficerData.data;
      reset({
        firstName: data.firstName || data.first_name || "",
        lastName: data.lastName || data.last_name || "",
        dob: data.dob || "",
        email: data.emailAddress || data.email || "",
        mobile: data.phoneNumber || data.phone || data.mobile || "",
        address: data.address?.address || data.address || "",
        city: data.address?.city || data.city || "",
        pincode: data.address?.pincode || data.pincode || "",
        state: data.address?.state || data.state || "",
        region: data.region || "",
      });
    }
  }, [fieldOfficerData, reset]);

  const states = useSelector((state: any) => state.roleManager.states);
  const stateOptions = states.map((item: any) => item.desc);
  const handleCreateFieldOfficer = async (values: OfficerFormValues) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        countryCode: "+91",
        emailAddress: values.email,
        phoneNumber: values.mobile,
        dob: values.dob,
        role_id: fieldOfficerRoleId,
        address: {
          address: values.address,
          state_id: 1,
          city: values.city,
          pincode: values.pincode,
        },
        geo_assignments: {
          country_id: 1,
          state_id: 1,
          region_id: 1,
          areas_id: 1,
        },
        id_proof: {
          id_proof_frontUrl: "front.png",
          id_proof_backUrl: "back.png",
          pan_card_number: "ABCDE1234F",
          pan_card_url: "pan.png",
        },
      };

      const response = isEditMode
        ? await updateFieldOfficer({
          ...payload,
          userId,
        }).unwrap()
        : await createFieldOfficer(payload).unwrap();
      toast.success(response?.message || "Field Officer created successfully");
      navigate(fromPath);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || err?.data?.error || "Something went wrong",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--surface-page)] rounded-[2rem] px-[clamp(1.5rem,6.81vw,6.8125rem)] py-[clamp(1.5rem,2.64vw,2.375rem)]">
      {/* ── Back Button ── */}
      <BackButton
        variant="light"
        label="Go back to dashboard"
        onClick={() => navigate(fromPath)}
        className="w-[clamp(11.25rem,16.67vw,15rem)] h-[clamp(2.5rem,3.61vw,3.25rem)] text-[clamp(0.8125rem,1vw,1rem)] px-[clamp(0.875rem,1.39vw,1.25rem)] gap-[clamp(0.375rem,0.56vw,0.5rem)]"
      />

      <Typography
        as="h1"
        variant="span"
        className={cn(
          "block font-bold",
          "font-[family-name:var(--font-plus-jakarta)]",
          "text-[var(--text-primary)]",
          "text-2xl xl:text-3xl 2xl:text-4xl",
          "mt-6 xl:mt-8 2xl:mt-10",
          "mb-6 xl:mb-8",
        )}
      >
        {isViewMode
          ? "View Field Officer Profile"
          : isEditMode
            ? "Edit Field Officer"
            : "Create Field Officer"}
      </Typography>

      {/* ── Outer white card ── */}
      <Card className="rounded-[clamp(1.75rem,3.19vw,2.875rem)] shadow-none border-none px-[clamp(1.5rem,3.47vw,3.125rem)] py-[clamp(1.5rem,3.4vw,3.0625rem)]">
        <CardContent className="p-0 flex flex-col gap-[clamp(1rem,1.67vw,1.5rem)]">
          {/* ── Section 1 ── */}
          <SectionPanel title="Enter Field Officer Information">
            <div className="grid grid-cols-3 gap-x-[clamp(1rem,2.7vw,2.4375rem)] gap-y-[clamp(0.75rem,1.67vw,1.5rem)]">
              <RHFTextField
                name="firstName"
                control={control}
                label="First Name"
                placeholder="Enter First name"
                maxLength={30}
                disabled={isViewMode}
              />
              <RHFTextField
                name="lastName"
                control={control}
                label="Last Name"
                placeholder="Enter Last Name"
                maxLength={30}
                disabled={isViewMode}
              />
              <RHFTextField
                name="dob"
                control={control}
                label="DOB"
                placeholder="Select DOB"
                type="date"
                disabled={isViewMode}
              />
              <RHFTextField
                name="email"
                control={control}
                label="Mail"
                placeholder="Enter Mail ID"
                type="email"
                maxLength={100}
                disabled={isViewMode}
              />
              <RHFTextField
                name="mobile"
                control={control}
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                type="tel"
                maxLength={10}
                disabled={isViewMode}
              />
              <RHFTextField
                name="address"
                control={control}
                label="Address"
                placeholder="Enter Address"
                maxLength={150}
                disabled={isViewMode}
              />
              <RHFTextField
                name="state"
                control={control}
                label="State"
                placeholder="Enter State"
                maxLength={50}
                disabled={isViewMode}
              />
              <RHFTextField
                name="city"
                control={control}
                label="City / Village"
                placeholder="Enter City / Village"
                maxLength={50}
                disabled={isViewMode}
              />
              <RHFTextField
                name="pincode"
                control={control}
                label="Pin Code"
                placeholder="Enter Pin Code"
                maxLength={6}
                disabled={isViewMode}
              />
            </div>
            {/* ── only change: pass control ── */}
            <div className="mt-[clamp(0.75rem,1.67vw,1.5rem)] w-[calc(33.333%-clamp(0.667rem,1.8vw,1.625rem))]">
              <UploadPictureField control={control} disabled={isViewMode} />
            </div>
          </SectionPanel>

          {/* ── Section 2 ── */}
          <SectionPanel title="Select State, Region & Area">
            <div className="grid grid-cols-3 gap-x-[clamp(0.875rem,1.4vw,1.5rem)] gap-y-[clamp(0.75rem,1vw,1rem)] w-full">
              <RHFDropdown
                name="state"
                control={control}
                label="State"
                placeholder="Select State"
                options={stateOptions}
                containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
                disabled={isViewMode}
              />
              <RHFDropdown
                name="region"
                control={control}
                label="Region"
                placeholder="Select Region"
                options={REGIONS}
                containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
                disabled={isViewMode}
              />
              <RHFDropdown
                name="area"
                control={control}
                label="Area"
                placeholder="Select Area"
                options={["Area 1", "Area 2", "Area 3"]}
                containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
                disabled={isViewMode}
              />
            </div>
          </SectionPanel>

          {/* ── Section 3 ── only change: pass name + control ── */}
          <SectionPanel title="Upload Documents">
            <div className="grid grid-cols-3 gap-x-[clamp(1rem,2.7vw,2.4375rem)] gap-y-[clamp(0.75rem,1.67vw,1.5rem)]">
              <DocUploadField
                label="Aadhar Card Front"
                name="aadharFront"
                control={control}
                disabled={isViewMode}
              />
              <DocUploadField
                label="Aadhar Card Back"
                name="aadharBack"
                control={control}
                disabled={isViewMode}
              />
              <DocUploadField
                label="Pan Card"
                name="panCard"
                control={control}
                disabled={isViewMode}
              />
            </div>
          </SectionPanel>

          {/* ── Action Row ── */}
          <div
            className={cn(
              "flex items-center justify-end",
              "gap-[0.875rem]",
              "mt-2",
            )}
          >
            {isViewMode ? (
              <Button
                onClick={() => navigate(fromPath)}
                className={cn(
                  "w-[10.5625rem]",
                  "h-[2.5rem]",
                  "px-8 py-2",
                  "bg-[linear-gradient(110.22deg,#2680C4_0%,#4A7BBB_100%)]",
                  "rounded-[6.25rem]",
                  "font-medium",
                  "text-[1rem]",
                  "leading-6",
                  "text-white",
                  "shadow-none",
                  "shrink-0 whitespace-nowrap",
                )}
              >
                Go Back
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate(fromPath)}
                  className={cn(
                    "w-[6.4375rem]",
                    "h-[2.5rem]",
                    "px-6 py-2",
                    "rounded-[0.375rem]",
                    "bg-transparent",
                    "shadow-none",
                    "border-0",
                    "!font-normal",
                    "text-[1rem]",
                    "leading-6",
                    "text-[var(--text-primary)]",
                    "shrink-0 whitespace-nowrap",
                    "hover:bg-[var(--chart-bg)]",
                  )}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient-blue"
                  onClick={handleSubmit(handleCreateFieldOfficer)}
                  disabled={isLoading}
                  className={cn(
                    "w-[10.5625rem]",
                    "h-[2.5rem]",
                    "px-8 py-2",
                    "bg-[linear-gradient(110.22deg,#2680C4_0%,#4A7BBB_100%)]",
                    "rounded-[6.25rem]",
                    "font-medium",
                    "text-[1rem]",
                    "leading-6",
                    "text-white",
                    "shadow-none",
                    "shrink-0 whitespace-nowrap",
                  )}
                >
                  {isLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                      ? "Update Profile"
                      : "Create Profile"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateFieldOfficer;
