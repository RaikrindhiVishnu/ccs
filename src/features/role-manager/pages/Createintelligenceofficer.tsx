import { useRef, useEffect, useState } from "react"; // added useState for preview
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImageUp, FileImage } from "lucide-react";
import Successcard from "@/components/ui/Successcard";
import { useForm, Controller } from "react-hook-form"; // added Controller
import type { Control } from "react-hook-form"; // type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import {
  intelligenceOfficerSchema,
  type IntelligenceOfficerFormValues,
} from "@/components/validations/intelligenceOfficerSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { toast } from "sonner";
import {
  useCreateRegionalOfficerMutation,
  useUpdateRegionalOfficerMutation,
} from "@/features/role-manager/api/agentApi";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";
import { useGetIntelligenceOfficerByIdMutation } from "@/features/role-manager/api/roleManagerApi";
import { uploadUserDocument } from "@/core/utils/fileUpload";
import ProfileHeaderCard from "../components/ui/ProfileHeaderCard";
import SectionCard from "../components/ui/SectionCard";
import InfoField from "../components/ui/InfoField";
import DocumentCard from "../components/ui/DocumentCard";
import ProfileBackButton from "../components/ui/BackButton";

import { useGetAllMasterDataQuery } from "@/features/role-manager/api/masterDataApi";

import { getRoleId } from "@/features/role-manager/utils/getRoleId";
import { useSelector } from "react-redux";
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

// ─── Image Preview Helper ───────────────────────────────────────────────────

function ImagePreview({ file, className }: { file: any; className?: string }) {
  const [src, setSrc] = useState<string>("");

  const isS3Key = typeof file === "string" && !file.startsWith("http") && !file.startsWith("data:");
  
  const { data: s3Data } = useGeneratePresignedUrlQuery(file, {
    skip: !isS3Key,
  });

  useEffect(() => {
    if (!file) {
      setSrc("");
      return;
    }
    if (file instanceof File) {
      if (!file.type.startsWith("image/")) {
        setSrc("");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setSrc(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (typeof file === "string") {
      if (isS3Key) {
        if (s3Data?.url) {
          setSrc(s3Data.url);
        }
      } else {
        setSrc(file);
      }
    }
  }, [file, s3Data, isS3Key]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt="Preview"
      className={cn("object-cover rounded-lg", className)}
    />
  );
}

// ─── Upload Picture (RHF-controlled) ─────────────────────────────────────────

function UploadPictureField({
  control,
  disabled = false,
}: {
  control: Control<IntelligenceOfficerFormValues>;
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
          <div className="flex items-center gap-3">
            {field.value && (
              <div className="relative shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center">
                <ImagePreview file={field.value} className="w-full h-full" />
              </div>
            )}
            <button
              type="button"
              onClick={() => !disabled && ref.current?.click()}
              disabled={disabled}
              className={cn(
                "flex-1 flex items-center justify-between h-[clamp(2rem,2.78vw,2.5rem)] px-[clamp(0.625rem,0.97vw,0.875rem)] bg-[color:var(--surface-card)] border rounded-[clamp(0.5rem,0.83vw,0.75rem)] transition-colors duration-150",
                disabled
                  ? "opacity-60 cursor-not-allowed border-gray-200"
                  : "cursor-pointer border-[color:var(--border-default)] hover:border-[color:var(--brand-500)]",
                fieldState.error && "border-red-500",
              )}
            >
              <span className="flex-1 text-left truncate mr-2 font-[family-name:var(--font-inter)] font-normal text-[clamp(0.6875rem,0.83vw,0.875rem)] text-[color:var(--text-muted)]">
                {field.value?.name ?? (typeof field.value === "string" ? "Existing Picture" : "Supports JPEG, PNG and Other Formats")}
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
          </div>
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
  disabled = false,
}: {
  label: string;
  name: "aadharFront" | "aadharBack" | "panCard";
  control: Control<IntelligenceOfficerFormValues>;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
          <div
            className={cn(
              "relative flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)] h-[clamp(5rem,8.89vw,8rem)] bg-[color:var(--surface-page)] border-2 border-dashed rounded-[clamp(0.5rem,0.83vw,0.75rem)] transition-colors duration-200 overflow-hidden",
              disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "border-[color:var(--border-default)]",
              fieldState.error && "border-red-500 bg-red-50/30",
            )}
          >
            {field.value ? (
              <>
                <ImagePreview file={field.value} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => ref.current?.click()}
                      className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
                      title="Change"
                    >
                      <FileImage className="w-4 h-4 stroke-[2]" />
                      <span className="text-[10px] font-semibold">Change</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                    className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
                    title="View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span className="text-[10px] font-semibold">View</span>
                  </button>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); field.onChange(undefined); }}
                      className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform text-red-300 hover:text-red-100"
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      <span className="text-[10px] font-semibold">Remove</span>
                    </button>
                  )}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium pointer-events-none">
                  {typeof field.value === "string" ? "Uploaded" : "Selected"}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => !disabled && ref.current?.click()}
                disabled={disabled}
                className="flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)] w-full h-full cursor-pointer disabled:cursor-not-allowed"
              >
                <FileImage className="shrink-0 text-[var(--text-primary)] w-[1rem] h-[1rem] stroke-[1.75]" />
                <Typography
                  as="span"
                  variant="span"
                  className="font-[family-name:var(--font-inter)] font-medium text-[clamp(0.75rem,0.97vw,1rem)] leading-[1.5] text-[color:var(--text-primary)] text-center"
                >
                  Click to Upload
                </Typography>
              </button>
            )}
            <input
              ref={ref}
              type="file"
              disabled={disabled}
              accept="image/*"
              className="hidden"
              onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
            />
          </div>
          {fieldState.error && (
            <span className="text-red-500 text-[0.75rem] leading-none">
              {fieldState.error.message}
            </span>
          )}

          {/* ── Lightbox overlay ── */}
          {lightboxOpen && field.value && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setLightboxOpen(false)}
            >
              <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <ImagePreview file={field.value} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>
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



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateIntelligenceOfficer() {
  const states = useSelector((state: any) => state.roleManager.states);
  const allDistricts = useSelector((state: any) => state.roleManager.districts);
  const allMandals = useSelector((state: any) => state.roleManager.mandals);
  const stateOptions = states.map((item: any) => item.desc);
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId, userId: routeUserId } = useParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState({
    name: "",
    assignedId: "",
    createdDate: "",
    createdTime: "",
  });

  const routeParamId = routeId || routeUserId;
  const userId = routeParamId || location.state?.userId;
  const initialData = location.state?.initialData;
  const isViewMode = location.state?.isViewMode || !!routeParamId || false;
  const fromPath = location.state?.from || BACK_ROUTE;

  const isEditMode = !!userId;
  const [getIntelligenceOfficerById, { data: intelligenceOfficerData }] =
    useGetIntelligenceOfficerByIdMutation();
  const [createRegionalOfficer, { isLoading }] =
    useCreateRegionalOfficerMutation();

  const [updateRegionalOfficer] = useUpdateRegionalOfficerMutation();
  const { data: masterData } = useGetAllMasterDataQuery();
  const intelligenceOfficerRoleId = getRoleId(
    masterData?.data?.userRolesResult || [],
    "IO",
  );
  const { control, handleSubmit, reset, watch } =
    useForm<IntelligenceOfficerFormValues>({
      resolver: zodResolver(intelligenceOfficerSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        mobile: "",
        address: "",
        addressState: "",
        city: "",
        pincode: "",
        // ── file fields ──
        profilePicture: undefined,
        aadharFront: undefined,
        aadharBack: undefined,
        panCard: undefined,
      },
    });

  const getGeoNames = (srcData: any) => {
    const geo = srcData?.geo_assignments;
    const stateObj = states.find((s: any) => s.id === geo?.state_id || s.desc === srcData?.state || s.desc === srcData?.address?.state);
    const stateVal = stateObj?.desc || srcData?.state || srcData?.address?.state || "";
    return { stateVal };
  };

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (userId && !fetchedRef.current) {
      fetchedRef.current = true;
      getIntelligenceOfficerById(userId);
    }
  }, [userId, getIntelligenceOfficerById]);

  // 1. Immediate pre-fill using initialData as fallback/instant load
  useEffect(() => {
    if (initialData && states.length) {
      const { stateVal } = getGeoNames(initialData);
      reset({
        firstName: initialData.first_name || initialData.firstName || "",
        lastName: initialData.last_name || initialData.lastName || "",
        dob: initialData.dob || "",
        email: initialData.email || initialData.emailAddress || "",
        mobile: initialData.phone || initialData.mobile || initialData.phoneNumber || initialData.contact || "",
        address: initialData.address || "",
        addressState: stateVal || "",
        city: initialData.city || "",
        pincode: initialData.pincode || "",
        aadharFront: initialData.id_proof_front_url || initialData.id_proof?.id_proof_frontUrl || undefined,
        aadharBack: initialData.id_proof_back_url || initialData.id_proof?.id_proof_backUrl || undefined,
        panCard: initialData.pan_card_url || initialData.id_proof?.pan_card_url || undefined,
      });
    }
  }, [initialData, reset, states]);

  // 2. Prefill/reset the form using server-fetched intelligenceOfficerData
  useEffect(() => {
    if (intelligenceOfficerData?.data && states.length) {
      const data = intelligenceOfficerData.data;
      const { stateVal } = getGeoNames(data);
      reset({
        firstName: data.firstName || data.first_name || "",
        lastName: data.lastName || data.last_name || "",
        dob: data.dob || "",
        email: data.emailAddress || data.email || "",
        mobile: data.phoneNumber || data.phone || data.mobile || "",
        address: data.address?.address || data.address || "",
        addressState: stateVal || "",
        city: data.address?.city || data.city || "",
        pincode: data.address?.pincode || data.pincode || "",
        aadharFront: data.id_proof_front_url || data.id_proof?.id_proof_frontUrl || undefined,
        aadharBack: data.id_proof_back_url || data.id_proof?.id_proof_backUrl || undefined,
        panCard: data.pan_card_url || data.id_proof?.pan_card_url || undefined,
      });
    }
  }, [intelligenceOfficerData, reset, states]);

  const handleCreate = async (values: IntelligenceOfficerFormValues) => {
    try {
      // ── Resolve S3 keys (upload new files, keep existing string keys) ────────
      let aadharFrontKey = typeof values.aadharFront === "string" ? values.aadharFront : "";
      let aadharBackKey  = typeof values.aadharBack  === "string" ? values.aadharBack  : "";
      let panCardKey     = typeof values.panCard      === "string" ? values.panCard      : "";

      const uploadPromises: Promise<any>[] = [];
      const uploadFields: ("aadharFront" | "aadharBack" | "panCard")[] = [];

      if (values.aadharFront instanceof File) {
        uploadPromises.push(uploadUserDocument(values.aadharFront, values.email, "aadhar_front"));
        uploadFields.push("aadharFront");
      }
      if (values.aadharBack instanceof File) {
        uploadPromises.push(uploadUserDocument(values.aadharBack, values.email, "aadhar_back"));
        uploadFields.push("aadharBack");
      }
      if (values.panCard instanceof File) {
        uploadPromises.push(uploadUserDocument(values.panCard, values.email, "pan"));
        uploadFields.push("panCard");
      }

      if (uploadPromises.length > 0) {
        const uploadToastId = toast.loading("Uploading documents, please wait...");
        try {
          const uploadResults = await Promise.all(uploadPromises);
          uploadResults.forEach((res, index) => {
            const field = uploadFields[index];
            if (field === "aadharFront") aadharFrontKey = res.key;
            if (field === "aadharBack")  aadharBackKey  = res.key;
            if (field === "panCard")     panCardKey     = res.key;
          });
          toast.dismiss(uploadToastId);
        } catch (uploadError) {
          toast.dismiss(uploadToastId);
          toast.error("Document upload failed. Please try again.");
          return;
        }
      }

      const selectedStateObj = states.find(
        (s: any) => s.desc?.toLowerCase().trim() === values.addressState?.toLowerCase().trim()
      );
      const stateIdVal   = selectedStateObj?.id ? Number(selectedStateObj.id) : 1;
      const districtIdVal = 1;
      const mandalIdVal   = 1;

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        countryCode: "+91",
        emailAddress: values.email,
        phoneNumber: values.mobile,
        dob: values.dob,
        role_id: intelligenceOfficerRoleId,
        address: {
          address: values.address,
          state_id: stateIdVal,
          city: values.city,
          pincode: values.pincode,
        },
        geo_assignments: {
          country_id: 1,
          state_id: stateIdVal,
          district_id: districtIdVal,
          mandal_id: mandalIdVal,
          region_id: 1,
          areas_id: 1,
        },
        id_proof: {
          id_proof_frontUrl: aadharFrontKey,
          id_proof_backUrl:  aadharBackKey,
          pan_card_number:   "ABCDE1234F",
          pan_card_url:      panCardKey,
        },
      };

      const response = isEditMode
        ? await updateRegionalOfficer({ ...payload, userId }).unwrap()
        : await createRegionalOfficer(payload).unwrap();

      if (!isEditMode) {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-US");
        const formattedTime = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const generatedId = response?.data?.id || response?.id || Math.floor(10000 + Math.random() * 90000);
        
        setSuccessDetails({
          name: `${values.firstName} ${values.lastName}`,
          assignedId: typeof generatedId === "number" ? `GLC IO${generatedId}` : String(generatedId),
          createdDate: formattedDate,
          createdTime: formattedTime,
        });
        setShowSuccess(true);
      } else {
        toast.success("Intelligence Officer updated successfully");
        navigate(fromPath);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || err?.data?.error || "Something went wrong");
    }
  };

  if (showSuccess) {
    return (
      <Successcard
        badgeLabel="Intelligence Officer Creation"
        titleLine1="Intelligence Officer"
        titleLine2="Created Successfully!"
        redirectText="Redirecting to User Directory..."
        regionName={successDetails.name}
        assignedId={successDetails.assignedId}
        createdDate={successDetails.createdDate}
        createdTime={successDetails.createdTime}
        mapImage={null}
        onRedirect={() => navigate("/role-manager/user-directory")}
        redirectDelay={3000}
      />
    );
  }

  if (isViewMode) {
    const data = intelligenceOfficerData?.data || initialData;
    const name = `${watch("firstName") || data?.firstName || data?.first_name || ""} ${watch("lastName") || data?.lastName || data?.last_name || ""}`.trim() || "Intelligence Officer Name";
    const status = data?.isVerified === 1 ? "Approved" : data?.isVerified === 2 ? "Rejected" : "Pending Review";
    const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase() || "IO";
    const avatarUrl = data?.avatar || data?.profile_image || "";
    
    const officer = {
      name,
      applicationId: userId?.toString() || data?.id?.toString() || "N/A",
      status: status as any,
      avatarUrl,
      initials,
    };

    const email = watch("email") || data?.emailAddress || data?.email || "N/A";
    const phone = watch("mobile") || data?.phoneNumber || data?.phone || data?.mobile || "N/A";
    const dateOfBirth = watch("dob") || data?.dob ? new Date(watch("dob") || data.dob).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A";
    
    const stateObj = states.find((s: any) => s.desc === watch("addressState") || s.id === data?.geo_assignments?.state_id || s.desc === data?.state);
    const districtObj = allDistricts.find((d: any) => d.id === data?.geo_assignments?.district_id || d.desc === data?.district);
    const mandalObj = allMandals.find((m: any) => m.id === data?.geo_assignments?.mandal_id || m.desc === data?.mandal || m.desc === data?.area);

    const stateName = stateObj?.desc || data?.state || "N/A";
    const districtName = districtObj?.desc || data?.district || "N/A";
    const mandalName = mandalObj?.desc || data?.mandal || "N/A";

    const operatingTerritory = [
      mandalName,
      districtName,
      stateName,
    ].filter((val) => val && val !== "N/A").join(", ") || "N/A";

    const aadharFrontUrl = data?.id_proof_front_url || data?.id_proof?.id_proof_frontUrl || "";
    const aadharBackUrl = data?.id_proof_back_url || data?.id_proof?.id_proof_backUrl || "";
    const panCardUrl = data?.pan_card_url || data?.id_proof?.pan_card_url || "";

    return (
      <main className="w-full min-h-screen bg-[color:var(--surface-page)] font-[family-name:var(--font-sans)]">
        <div className="mx-auto max-w-[118.75rem] px-[1.5rem] lg:px-[2.5rem] xl:px-[3.5rem] 2xl:px-[4.5rem] py-[1.5rem] lg:py-[2rem] xl:py-[2.5rem] 2xl:py-[3rem]">
          <div className="mb-[1.25rem] lg:mb-[1.5rem] xl:mb-[1.75rem]">
            <ProfileBackButton onClick={() => navigate(fromPath)} />
          </div>

          <div className="bg-[color:var(--surface-card)] rounded-[1.75rem] lg:rounded-[2.25rem] xl:rounded-[2.875rem] px-[1.25rem] lg:px-[2rem] xl:px-[3.125rem] pt-[1.5rem] lg:pt-[1.75rem] xl:pt-[2rem] pb-[2rem] lg:pb-[2.5rem] xl:pb-[3rem] flex flex-col gap-[1rem] lg:gap-[1.125rem] xl:gap-[1.25rem]">
            <ProfileHeaderCard agent={officer} />

            <SectionCard title="Info">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[1.5rem] lg:gap-x-[2rem] xl:gap-x-[2.5rem] gap-y-[1.25rem] lg:gap-y-[1.5rem] xl:gap-y-[1.75rem]">
                <InfoField label="Email" value={email} />
                <InfoField label="Phone number" value={phone} />
                <InfoField label="Date Of Birth" value={dateOfBirth} />
                <InfoField label="Operating Territory" value={operatingTerritory} className="col-span-2 xl:col-span-3" />
              </div>
            </SectionCard>

            <SectionCard title="Documents Provided">
              <div className="grid grid-cols-2 gap-[1.25rem] lg:gap-[1.5rem] xl:gap-[2rem] max-w-[48.75rem]">
                <DocumentCard label="Aadhaar card (Front)" imageUrl={aadharFrontUrl} />
                <DocumentCard label="Aadhaar card (Back)" imageUrl={aadharBackUrl} />
                <DocumentCard label="Pan card" imageUrl={panCardUrl} />
              </div>
            </SectionCard>

            <div className="flex items-center justify-end gap-[0.625rem] lg:gap-[0.75rem] xl:gap-[0.875rem] pt-4">
              <button
                type="button"
                onClick={() => navigate(fromPath)}
                className="font-medium font-[family-name:'Inter',sans-serif] text-[color:var(--profile-text)] px-[1.25rem] lg:px-[1.5rem] py-[0.5rem] rounded-[0.375rem] text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] 2xl:text-[1rem] hover:bg-gray-100 transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => navigate(fromPath)}
                className="font-medium font-[family-name:'Inter',sans-serif] text-white px-[1.75rem] lg:px-[2rem] py-[0.5rem] rounded-full bg-[linear-gradient(110.22deg,#2680C4_0%,#4A7BBB_100%)] text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] 2xl:text-[1rem] hover:opacity-90 active:scale-[0.97] transition-all duration-150"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
          ? "View Intelligence Officer Profile"
          : isEditMode
            ? "Edit Intelligence Officer"
            : "Create Intelligence Officer"}
      </Typography>

      {/* ── Outer white card ── */}
      <Card className="rounded-[clamp(1.75rem,3.19vw,2.875rem)] shadow-none border-none px-[clamp(1.5rem,3.47vw,3.125rem)] py-[clamp(1.5rem,3.4vw,3.0625rem)]">
        <CardContent className="p-0 flex flex-col gap-[clamp(1rem,1.67vw,1.5rem)]">
          {/* ── Section 1 ── */}
          <SectionPanel title="Enter Intelligence Officer Information">
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
                name="addressState"
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
                  onClick={handleSubmit(handleCreate)}
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
}
