import { useRef } from "react";                          // removed useState for files
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImageUp, FileImage } from "lucide-react";
import { useForm, Controller } from "react-hook-form";   // added Controller
import type { Control } from "react-hook-form";          // type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import {
  intelligenceOfficerSchema,
  type IntelligenceOfficerFormValues,
} from "@/components/validations/intelligenceOfficerSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { toast } from "sonner";

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

// ─── Upload Picture (RHF-controlled) ─────────────────────────────────────────

function UploadPictureField({ control }: { control: Control<IntelligenceOfficerFormValues> }) {
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
            onClick={() => ref.current?.click()}
            className={cn(
              "flex items-center justify-between w-full h-[clamp(2rem,2.78vw,2.5rem)] px-[clamp(0.625rem,0.97vw,0.875rem)] bg-[color:var(--surface-card)] border rounded-[clamp(0.5rem,0.83vw,0.75rem)] cursor-pointer transition-colors duration-150",
              fieldState.error
                ? "border-red-500"
                : "border-[color:var(--border-default)] hover:border-[color:var(--brand-500)]"
            )}
          >
            <span className="flex-1 text-left truncate mr-2 font-[family-name:var(--font-inter)] font-normal text-[clamp(0.6875rem,0.83vw,0.875rem)] text-[color:var(--text-muted)]">
              {field.value?.name ?? "Supports JPEG, PNG and Other Formats"}
            </span>
            <ImageUp className="shrink-0 text-[var(--text-primary)] w-[1.125rem] h-[1.125rem] stroke-[1.75]" />
            <input
              ref={ref}
              type="file"
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

// ─── Document Upload Zone (RHF-controlled) ───────────────────────────────────

function DocUploadField({
  label,
  name,
  control,
}: {
  label: string;
  name: "aadharFront" | "aadharBack" | "panCard";
  control: Control<IntelligenceOfficerFormValues>;
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
            onClick={() => ref.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)] h-[clamp(5rem,8.89vw,8rem)] bg-[color:var(--surface-page)] border-2 border-dashed rounded-[clamp(0.5rem,0.83vw,0.75rem)] cursor-pointer transition-colors duration-200",
              fieldState.error
                ? "border-red-500 bg-red-50/30"
                : "border-[color:var(--border-default)] hover:border-[color:var(--brand-500)] hover:bg-[color:var(--brand-tint)]"
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

function SectionPanel({ title, children }: { title: string; children: React.ReactNode }) {
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

// ─── Constants ────────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
];

const REGIONS = ["North", "South", "East", "West", "Central", "North-East"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateIntelligenceOfficer() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<IntelligenceOfficerFormValues>({
    resolver: zodResolver(intelligenceOfficerSchema),
    defaultValues: {
      firstName:    "",
      lastName:     "",
      dob:          "",
      email:        "",
      mobile:       "",
      address:      "",
      addressState: "",
      city:         "",
      pincode:      "",
      state:        "",
      region:       "",
      // ── file fields ──
      profilePicture: undefined,
      aadharFront:    undefined,
      aadharBack:     undefined,
      panCard:        undefined,
    },
  });

  const handleCreate = async (values: IntelligenceOfficerFormValues) => {
    try {
      console.log("Submit values:", values);
      toast.success("Intelligence Officer created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--surface-page)] rounded-[2rem] px-[clamp(1.5rem,6.81vw,6.8125rem)] py-[clamp(1.5rem,2.64vw,2.375rem)]">
      {/* ── Back Button → /role-manager/create-roles ── */}
      <BackButton
        variant="light"
        label="Go back to dashboard"
        onClick={() => navigate(BACK_ROUTE)}
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
        Create Intelligence Officer
      </Typography>

      {/* ── Outer white card ── */}
      <Card className="rounded-[clamp(1.75rem,3.19vw,2.875rem)] shadow-none border-none px-[clamp(1.5rem,3.47vw,3.125rem)] py-[clamp(1.5rem,3.4vw,3.0625rem)]">
        <CardContent className="p-0 flex flex-col gap-[clamp(1rem,1.67vw,1.5rem)]">
          {/* ── Section 1 ── */}
          <SectionPanel title="Enter Intelligence Officer Information">
            <div className="grid grid-cols-3 gap-x-[clamp(1rem,2.7vw,2.4375rem)] gap-y-[clamp(0.75rem,1.67vw,1.5rem)]">
              <RHFTextField name="firstName"    control={control} label="First Name"     placeholder="Enter First name"       maxLength={30} />
              <RHFTextField name="lastName"     control={control} label="Last Name"      placeholder="Enter Last Name"        maxLength={30} />
              <RHFTextField name="dob"          control={control} label="DOB"            placeholder="Select DOB"             type="date" />
              <RHFTextField name="email"        control={control} label="Mail"           placeholder="Enter Mail ID"          type="email" maxLength={100} />
              <RHFTextField name="mobile"       control={control} label="Mobile Number"  placeholder="Enter Mobile Number"    type="tel"   maxLength={10} />
              <RHFTextField name="address"      control={control} label="Address"        placeholder="Enter Address"          maxLength={150} />
              <RHFTextField name="addressState" control={control} label="State"          placeholder="Enter State"            maxLength={50} />
              <RHFTextField name="city"         control={control} label="City / Village" placeholder="Enter City / Village"   maxLength={50} />
              <RHFTextField name="pincode"      control={control} label="Pin Code"       placeholder="Enter Pin Code"         maxLength={6} />
            </div>
            {/* ── only change: pass control ── */}
            <div className="mt-[clamp(0.75rem,1.67vw,1.5rem)] w-[calc(33.333%-clamp(0.667rem,1.8vw,1.625rem))]">
              <UploadPictureField control={control} />
            </div>
          </SectionPanel>

          {/* ── Section 2 ── */}
          <SectionPanel title="Select State, Region">
            <div className="grid grid-cols-2 gap-x-[clamp(1rem,2.7vw,2.4375rem)] max-w-[66%]">
              <RHFDropdown
                name="state"
                control={control}
                label="State"
                placeholder="Select State"
                options={INDIAN_STATES}
                containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
              />
              <RHFDropdown
                name="region"
                control={control}
                label="Region"
                placeholder="Select Region"
                options={REGIONS}
                containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
              />
            </div>
          </SectionPanel>

          {/* ── Section 3 ── only change: pass name + control ── */}
          <SectionPanel title="Upload Documents">
            <div className="grid grid-cols-3 gap-x-[clamp(1rem,2.7vw,2.4375rem)] gap-y-[clamp(0.75rem,1.67vw,1.5rem)]">
              <DocUploadField label="Aadhar Card Front" name="aadharFront" control={control} />
              <DocUploadField label="Aadhar Card Back"  name="aadharBack"  control={control} />
              <DocUploadField label="Pan Card"          name="panCard"     control={control} />
            </div>
          </SectionPanel>

          {/* ── Action Row ── */}
          <div className={cn("flex items-center justify-end", "gap-[0.875rem]", "mt-2")}>
            <Button
              onClick={() => navigate("/role-manager/create-roles")}
              className={cn("w-[6.4375rem]", "h-[2.5rem]", "px-6 py-2", "rounded-[0.375rem]", "bg-transparent", "shadow-none", "border-0", "!font-normal", "text-[1rem]", "leading-6", "text-[var(--text-primary)]", "shrink-0 whitespace-nowrap", "hover:bg-[var(--chart-bg)]")}
            >
              Cancel
            </Button>
            <Button
              variant="gradient-blue"
              onClick={handleSubmit(handleCreate)}
              className={cn("w-[10.5625rem]", "h-[2.5rem]", "px-8 py-2", "bg-[linear-gradient(110.22deg,#2680C4_0%,#4A7BBB_100%)]", "rounded-[6.25rem]", "font-medium", "text-[1rem]", "leading-6", "text-white", "shadow-none", "shrink-0 whitespace-nowrap")}
            >
              Create Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}