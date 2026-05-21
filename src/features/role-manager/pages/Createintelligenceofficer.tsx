import { useRef, useEffect, useState } from "react"; // added useState for preview
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImageUp, FileImage } from "lucide-react";
import { useForm, Controller } from "react-hook-form"; // added Controller
import type { Control } from "react-hook-form"; // type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import {
  intelligenceOfficerSchema,
  type IntelligenceOfficerFormValues,
} from "@/components/validations/intelligenceOfficerSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { toast } from "sonner";
import {
  useCreateRegionalOfficerMutation,
  useUpdateRegionalOfficerMutation,
} from "@/features/role-manager/api/agentApi";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";
import { useGetIntelligenceOfficerByIdMutation, useGetLocationHierarchyDetailsMutation } from "@/features/role-manager/api/roleManagerApi";
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
              "relative flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)] h-[clamp(5rem,8.89vw,8rem)] bg-[color:var(--surface-page)] border-2 border-dashed rounded-[clamp(0.5rem,0.83vw,0.75rem)] transition-colors duration-200 overflow-hidden",
              disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "cursor-pointer border-[color:var(--border-default)] hover:border-[color:var(--brand-500)] hover:bg-[color:var(--brand-tint)]",
              fieldState.error && "border-red-500 bg-red-50/30",
            )}
          >
            {field.value ? (
              <>
                <ImagePreview file={field.value} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300" />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
                  <FileImage className="w-5 h-5 text-white stroke-[2]" />
                  <span className="text-xs font-semibold">Change File</span>
                  <span className="text-[10px] opacity-80 max-w-[90%] truncate">
                    {typeof field.value === "string" ? "Existing Document" : field.value.name}
                  </span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium pointer-events-none">
                  {typeof field.value === "string" ? "Uploaded" : "Selected"}
                </div>
              </>
            ) : (
              <>
                <FileImage className="shrink-0 text-[var(--text-primary)] w-[1rem] h-[1rem] stroke-[1.75]" />
                <Typography
                  as="span"
                  variant="span"
                  className="font-[family-name:var(--font-inter)] font-medium text-[clamp(0.75rem,0.97vw,1rem)] leading-[1.5] text-[color:var(--text-primary)] text-center"
                >
                  Click to Upload
                </Typography>
              </>
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



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateIntelligenceOfficer() {
  const states = useSelector((state: any) => state.roleManager.states);
  const allDistricts = useSelector((state: any) => state.roleManager.districts);
  const allMandals = useSelector((state: any) => state.roleManager.mandals);
  const stateOptions = states.map((item: any) => item.desc);
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId, userId: routeUserId } = useParams();

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
  const [getLocationHierarchyDetails] = useGetLocationHierarchyDetailsMutation();
  const [hierarchy, setHierarchy] = useState<any>(null);

  const [updateRegionalOfficer] = useUpdateRegionalOfficerMutation();
  const { data: masterData } = useGetAllMasterDataQuery();
  const intelligenceOfficerRoleId = getRoleId(
    masterData?.data?.userRolesResult || [],
    "IO",
  );
  const { control, handleSubmit, reset, watch, setValue } =
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
        state: "",
        district: "",
        mandal: "",
        // ── file fields ──
        profilePicture: undefined,
        aadharFront: undefined,
        aadharBack: undefined,
        panCard: undefined,
      },
    });

  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const selectedMandal = watch("mandal");

  const prevStateRef = useRef(selectedState);
  const prevDistrictRef = useRef(selectedDistrict);

  // Cascading logic
  const selectedStateObj = states.find((s: any) => s.desc === selectedState);
  const districtOptions = selectedStateObj
    ? allDistricts.filter((d: any) => d.state_id === selectedStateObj.id).map((d: any) => d.desc)
    : [];

  const selectedDistrictObj = allDistricts.find((d: any) => d.desc === selectedDistrict);
  const mandalOptions = selectedDistrictObj
    ? allMandals.filter((m: any) => m.districts_id === selectedDistrictObj.id).map((m: any) => m.desc)
    : [];

  useEffect(() => {
    if (selectedState !== prevStateRef.current) {
      setValue("district", "");
      setValue("mandal", "");
      prevStateRef.current = selectedState;
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    if (selectedDistrict !== prevDistrictRef.current) {
      setValue("mandal", "");
      prevDistrictRef.current = selectedDistrict;
    }
  }, [selectedDistrict, setValue]);

  useEffect(() => {
    if (selectedDistrict && selectedMandal) {
      const selectedDistrictObj = allDistricts.find((d: any) => d.desc === selectedDistrict);
      const selectedMandalObj = allMandals.find((m: any) => m.desc === selectedMandal);
      if (selectedDistrictObj?.id && selectedMandalObj?.id) {
        getLocationHierarchyDetails({
          district_id: Number(selectedDistrictObj.id),
          mandal_id: Number(selectedMandalObj.id),
        })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              setHierarchy(res.data);
            } else {
              setHierarchy(null);
            }
          })
          .catch(() => {
            setHierarchy(null);
          });
      } else {
        setHierarchy(null);
      }
    } else {
      setHierarchy(null);
    }
  }, [selectedDistrict, selectedMandal, allDistricts, allMandals, getLocationHierarchyDetails]);

  const getGeoNames = (srcData: any) => {
    const geo = srcData?.geo_assignments;
    const stateObj = states.find((s: any) => s.id === geo?.state_id || s.desc === srcData?.state || s.desc === srcData?.address?.state);
    const stateVal = stateObj?.desc || srcData?.state || srcData?.address?.state || "";

    const districtsForState = stateObj ? allDistricts.filter((d: any) => d.state_id === stateObj.id) : allDistricts;
    const districtObj = districtsForState.find((d: any) => d.id === geo?.district_id || d.desc === srcData?.district);
    const districtVal = districtObj?.desc || srcData?.district || "";

    const mandalsForDistrict = districtObj ? allMandals.filter((m: any) => m.districts_id === districtObj.id) : allMandals;
    const mandalObj = mandalsForDistrict.find((m: any) => m.id === geo?.mandal_id || m.desc === srcData?.mandal || m.desc === srcData?.area);
    const mandalVal = mandalObj?.desc || srcData?.mandal || srcData?.area || "";

    return { stateVal, districtVal, mandalVal };
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
    if (initialData && states.length && allDistricts.length && allMandals.length) {
      const { stateVal, districtVal, mandalVal } = getGeoNames(initialData);
      prevStateRef.current = stateVal;
      prevDistrictRef.current = districtVal;
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
        state: stateVal,
        district: districtVal,
        mandal: mandalVal,
        aadharFront: initialData.id_proof_front_url || initialData.id_proof?.id_proof_frontUrl || undefined,
        aadharBack: initialData.id_proof_back_url || initialData.id_proof?.id_proof_backUrl || undefined,
        panCard: initialData.pan_card_url || initialData.id_proof?.pan_card_url || undefined,
      });
    }
  }, [initialData, reset, states, allDistricts, allMandals]);

  // 2. Prefill/reset the form using server-fetched intelligenceOfficerData
  useEffect(() => {
    if (intelligenceOfficerData?.data && states.length && allDistricts.length && allMandals.length) {
      const data = intelligenceOfficerData.data;
      const { stateVal, districtVal, mandalVal } = getGeoNames(data);
      prevStateRef.current = stateVal;
      prevDistrictRef.current = districtVal;
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
        state: stateVal,
        district: districtVal,
        mandal: mandalVal,
        aadharFront: data.id_proof_front_url || data.id_proof?.id_proof_frontUrl || undefined,
        aadharBack: data.id_proof_back_url || data.id_proof?.id_proof_backUrl || undefined,
        panCard: data.pan_card_url || data.id_proof?.pan_card_url || undefined,
      });
    }
  }, [intelligenceOfficerData, reset, states, allDistricts, allMandals]);
  const handleCreate = async (values: IntelligenceOfficerFormValues) => {
    try {
      const selectedStateObj = states.find((s: any) => s.desc === values.state);
      const stateIdVal = selectedStateObj?.id ? Number(selectedStateObj.id) : 1;

      const selectedDistrictObj = allDistricts.find((d: any) => d.desc === values.district);
      const districtIdVal = selectedDistrictObj?.id ? Number(selectedDistrictObj.id) : 1;

      const selectedMandalObj = allMandals.find((m: any) => m.desc === values.mandal);
      const mandalIdVal = selectedMandalObj?.id ? Number(selectedMandalObj.id) : 1;

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
          id_proof_frontUrl: values.aadharFront?.name || "",

          id_proof_backUrl: values.aadharBack?.name || "",

          pan_card_number: "ABCDE1234F",

          pan_card_url: values.panCard?.name || "",
        },
      };

      isEditMode
        ? await updateRegionalOfficer({
          ...payload,
          userId,
        }).unwrap()
        : await createRegionalOfficer(payload).unwrap();

      toast.success("Intelligence Officer created successfully");

      navigate(fromPath);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

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
    
    const stateObj = states.find((s: any) => s.desc === watch("state") || s.id === data?.geo_assignments?.state_id || s.desc === data?.state);
    const districtObj = allDistricts.find((d: any) => d.desc === watch("district") || d.id === data?.geo_assignments?.district_id || d.desc === data?.district);
    const mandalObj = allMandals.find((m: any) => m.desc === watch("mandal") || m.id === data?.geo_assignments?.mandal_id || m.desc === data?.mandal);

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

          {/* ── Section 2 ── */}
          <SectionPanel title="Select State, District, Mandal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(1rem,2.7vw,2.4375rem)] gap-y-[clamp(1rem,2.7vw,2.4375rem)] w-full">
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
              <div className="flex flex-col gap-1 w-full">
                <RHFDropdown
                  name="district"
                  control={control}
                  label="District"
                  placeholder="Select District"
                  options={districtOptions}
                  containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                  className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
                  disabled={isViewMode}
                />
                {(hierarchy?.region || hierarchy?.regional_officer || hierarchy?.intelligence_officer) && (
                  <div className="mt-1 px-1 flex flex-col">
                    {hierarchy.region && (
                      <span className="text-xs font-semibold text-slate-500">
                        Region: {hierarchy.region.name || "N/A"}
                      </span>
                    )}
                    {hierarchy.regional_officer && (
                      <span className="text-[13px] font-medium text-[#16a34a] mt-1.5 flex items-center gap-1">
                        RO : {hierarchy.regional_officer.first_name} {hierarchy.regional_officer.last_name} {hierarchy.regional_officer.id ? `(${hierarchy.regional_officer.id})` : ""}
                      </span>
                    )}
                    {hierarchy.intelligence_officer && (
                      <span className="text-[13px] font-medium text-[#16a34a] mt-0.5 flex items-center gap-1">
                        IO : {hierarchy.intelligence_officer.first_name} {hierarchy.intelligence_officer.last_name} {hierarchy.intelligence_officer.id ? `(${hierarchy.intelligence_officer.id})` : ""}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <RHFDropdown
                  name="mandal"
                  control={control}
                  label="Mandal"
                  placeholder="Select Mandal"
                  options={mandalOptions}
                  containerClassName="gap-[clamp(0.375rem,0.5vw,0.625rem)]"
                  className="h-[clamp(2rem,2.78vw,2.5rem)] rounded-[clamp(0.5rem,0.83vw,0.75rem)] text-[clamp(0.6875rem,0.83vw,0.875rem)] px-[clamp(0.625rem,0.97vw,0.875rem)]"
                  disabled={isViewMode}
                />
                {(hierarchy?.area || hierarchy?.field_officer) && (
                  <div className="mt-1 px-1 flex flex-col">
                    {hierarchy.area && (
                      <span className="text-xs font-semibold text-slate-500">
                        Area: {hierarchy.area.name || hierarchy.area || "N/A"}
                      </span>
                    )}
                    {hierarchy.field_officer && (
                      <span className="text-[13px] font-medium text-[#16a34a] mt-1.5 flex items-center gap-1">
                        FO : {hierarchy.field_officer.first_name} {hierarchy.field_officer.last_name} {hierarchy.field_officer.id ? `(${hierarchy.field_officer.id})` : ""}
                      </span>
                    )}
                  </div>
                )}
              </div>
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
