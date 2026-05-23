import { useRef } from "react"; // removed useState for files
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { Upload, FileText, ArrowLeft, User, Camera } from "lucide-react";
import {
  useCreateAgentMutation,
  useUpdateAgentDetailsMutation,
} from "../api/agentApi";
import type { AgentFormProps, UpdateAgentRequest } from "../types/agent";
import { useForm, Controller } from "react-hook-form"; // added Controller
import type { Control } from "react-hook-form"; // type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import {
  agentSchema,
  type AgentFormValues,
} from "@/components/validations/agentSchema";
import { RHFTextField } from "@/components/form/RHFTextField";
import { useLocation, useNavigate } from "react-router-dom";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { toast } from "sonner";
import { useState, useEffect } from "react"; // kept only for profileImage                       // kept only for profileImage
import { useGetAllMasterDataQuery } from "@/features/role-manager/api/masterDataApi";

import { getRoleId } from "@/features/role-manager/utils/getRoleId";
import { useSelector } from "react-redux";
import { useGetAgentByIdMutation, useGetLocationHierarchyDetailsMutation } from "@/features/role-manager/api/roleManagerApi";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";
import ProfileHeaderCard from "../components/ui/ProfileHeaderCard";
import SectionCard from "../components/ui/SectionCard";
import InfoField from "../components/ui/InfoField";
import DocumentCard from "../components/ui/DocumentCard";
import ProfileBackButton from "../components/ui/BackButton";
import { uploadUserDocument } from "@/core/utils/fileUpload";
// ─── Dropdown option lists ────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentForm({
  isEdit = false,
  initialData,
  onCancel,
  isLoading = false,
  roleType,
  isViewMode = false,
}: AgentFormProps) {
  const states = useSelector((state: any) => state.roleManager.states);
  const location = useLocation();
  const navigate = useNavigate();

  const { userId: locUserId } = location.state || {};

  const handleBackToDirectory = () => {
    navigate("/role-manager/user-directory");
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [createAgent, { isLoading: isSubmitting }] = useCreateAgentMutation();
  const [updateAgentDetails] = useUpdateAgentDetailsMutation();

  const [dobState, setDobState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [roleIdState, setRoleIdState] = useState(1);
  const { data: masterData } = useGetAllMasterDataQuery();
  const agentRoleId = getRoleId(
    masterData?.data?.userRolesResult || [],
    "AGENT",
  );

  const { control, handleSubmit, watch, reset, setValue } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      firstName:
        initialData?.firstName ?? (initialData as any)?.first_name ?? "",
      lastName: initialData?.lastName ?? (initialData as any)?.last_name ?? "",
      dob: initialData?.dob ?? "",
      email: initialData?.email ?? (initialData as any)?.emailAddress ?? "",
      phone:
        initialData?.phone ??
        (initialData as any)?.phoneNumber ??
        (initialData as any)?.contact ??
        (initialData as any)?.phone ??
        "",
      address:
        initialData?.address ?? (initialData as any)?.address?.address ?? "",
      addressState:
        initialData?.state ?? (initialData as any)?.address?.state ?? "",
      city: initialData?.city ?? (initialData as any)?.address?.city ?? "",
      pincode:
        initialData?.pincode ?? (initialData as any)?.address?.pincode ?? "",
      panNumber:
        initialData?.panNumber ??
        (initialData as any)?.id_proof?.pan_card_number ??
        "",
      // ── file fields ──
      profilePicture: undefined,
      aadharFront: undefined,
      aadharBack: undefined,
      panCard: undefined,
    },
  });

  const userId = locUserId || (initialData as any)?.originalId || (initialData as any)?.id;
  const [getAgentById, { data: agentData }] = useGetAgentByIdMutation();

  const fetchedRef = useRef<any>(null);

  useEffect(() => {
    if (userId && fetchedRef.current !== userId) {
      fetchedRef.current = userId;
      getAgentById(userId);
    }
  }, [userId, getAgentById]);

  // Geo and cascading logic removed as requested by the user



  useEffect(() => {
    if (agentData?.data) {
      const data = agentData.data;
      reset({
        firstName: data.firstName || data.first_name || "",
        lastName: data.lastName || data.last_name || "",
        dob: data.dob || "",
        email: data.email || data.emailAddress || "",
        phone: data.phone || data.phoneNumber || data.mobile || data.contact || "",
        address: data.address || data.address?.address || "",
        addressState: data.state || data.address?.state || "",
        city: data.city || data.address?.city || "",
        pincode: data.pincode || data.address?.pincode || "",
        panNumber: data.panCardNumber || data.id_proof?.pan_card_number || "",
      });
      setDobState(data.dob || "");
      setAddressState(data.address || data.address?.address || "");
      setRoleIdState(data.role_id || 1);
    }
  }, [agentData, reset]);

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  useEffect(() => {
    if (isEdit && initialData) {
      setDobState(initialData.dob || (initialData as any).dob || "");
      setAddressState(
        initialData.address ||
        (initialData as any).address?.address ||
        (initialData as any).address ||
        "",
      );
      setRoleIdState((initialData as any).role_id || 1);
    }
  }, [isEdit, initialData]);

  const handleSave = async (values: AgentFormValues) => {
    try {
      // Find the state ID corresponding to the entered addressState
      const addressStateObj = states.find(
        (s: any) => s.desc?.toLowerCase() === values.addressState?.toLowerCase(),
      );
      const stateIdVal = addressStateObj ? Number(addressStateObj.id) : 1;

      const loadingToastId = toast.loading(
        "Uploading documents & saving profile...",
      );

      // Extract raw File values from RHF
      const aadharFrontFile = values.aadharFront instanceof File ? values.aadharFront : undefined;
      const aadharBackFile  = values.aadharBack  instanceof File ? values.aadharBack  : undefined;
      const panCardFile     = values.panCard     instanceof File ? values.panCard     : undefined;
      const profilePicFile  = values.profilePicture instanceof File ? values.profilePicture : undefined;

      const uploadTasks = [
        aadharFrontFile ? uploadUserDocument(aadharFrontFile, values.email, "AADHAAR_FRONT") : Promise.resolve(null),
        aadharBackFile  ? uploadUserDocument(aadharBackFile,  values.email, "AADHAAR_BACK")  : Promise.resolve(null),
        panCardFile     ? uploadUserDocument(panCardFile,     values.email, "PAN")           : Promise.resolve(null),
        profilePicFile  ? uploadUserDocument(profilePicFile,  values.email, "PROFILE")       : Promise.resolve(null),
      ];

      const [aadharFrontRes, aadharBackRes, panRes, profileRes] = await Promise.all(uploadTasks);

      // Determine final keys (use newly uploaded key OR existing string from edit mode)
      const finalAadharFrontKey = aadharFrontRes?.data?.fileUrl || (typeof values.aadharFront === "string" ? values.aadharFront : "");
      const finalAadharBackKey  = aadharBackRes?.data?.fileUrl  || (typeof values.aadharBack === "string" ? values.aadharBack : "");
      const finalPanCardKey     = panRes?.data?.fileUrl         || (typeof values.panCard === "string" ? values.panCard : "");
      const finalProfilePicKey  = profileRes?.data?.fileUrl     || (typeof values.profilePicture === "string" ? values.profilePicture : "");

      toast.dismiss(loadingToastId);

      if (isEdit) {
        const userId =
          locUserId ||
          (initialData as any)?.originalId ||
          (initialData as any)?.id ||
          1;

        if (roleType === "AG") {
          const payload: UpdateAgentRequest = {
            userId: Number(userId),
            firstName: values.firstName || "",
            lastName: values.lastName || "",
            emailAddress: values.email || "",
            phoneNumber: values.phone || "",
            dob: values.dob || dobState || "",
            role_id: Number(roleIdState || agentRoleId),
            profile_image: finalProfilePicKey,

            address: {
              address: values.address || addressState || "",
              state_id: stateIdVal,
              city: values.city || "",
              pincode: values.pincode || "",
            },

            geo_assignments: {
              state_id: stateIdVal,
              district_id: 1, // Reset as we don't have assigned territory anymore
              mandal_id: 1,
            },
          };

          await updateAgentDetails(payload).unwrap();
        } else {
          toast.error("Unknown role type for update");
          return;
        }
      } else {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          countryCode: "+91",
          emailAddress: values.email,
          phoneNumber: values.phone,
          dob: values.dob,
          profile_image: finalProfilePicKey,

          role_id: agentRoleId,

          address: {
            address: values.address,
            state_id: stateIdVal,
            city: values.city,
            pincode: values.pincode,
          },

          geo_assignments: {
            country_id: 1,
            state_id: stateIdVal,
            district_id: 1, // default
            mandal_id: 1, // default
            region_id: 1,
            areas_id: 1,
          },

          id_proof: {
            bank_account_name: `${values.firstName} ${values.lastName}`,
            bank_account_number: "NA",
            ifsc_code: "NA",
            branch: "NA",
            bank_name: "NA",
            id_proof_frontUrl: finalAadharFrontKey,
            id_proof_backUrl: finalAadharBackKey,
            pan_card_number: values.panNumber,
            pan_card_url: finalPanCardKey,
          },
        };

        await createAgent(payload).unwrap();
      }

      toast.success(
        isEdit ? "Profile Updated Successfully" : "Agent Created Successfully",
      );

      if (onCancel) {
        onCancel();
      }
    } catch (err) {
      console.error("Failed to save:", err);

      toast.error(
        (err as any)?.data?.message ||
        (err as any)?.data?.error ||
        "Something went wrong",
      );
    }
  };
  const isVerified = isEdit && !!initialData?.firstName;

  if (isViewMode) {
    const data = agentData?.data || initialData;
    const name = `${watch("firstName") || data?.firstName || data?.first_name || ""} ${watch("lastName") || data?.lastName || data?.last_name || ""}`.trim() || "Agent Name";
    const status = data?.isVerified === 1 ? "Approved" : data?.isVerified === 2 ? "Rejected" : "Pending Review";
    const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase() || "AN";
    const avatarUrl = data?.avatar || data?.profile_image || profileImage || "";
    
    const agent = {
      name,
      applicationId: userId?.toString() || data?.id?.toString() || "N/A",
      status: status as any,
      avatarUrl,
      initials,
    };

    const email = watch("email") || data?.email || data?.emailAddress || "N/A";
    const phone = watch("phone") || data?.phone || data?.phoneNumber || data?.mobile || data?.contact || "N/A";
    const dateOfBirth = watch("dob") || data?.dob ? new Date(watch("dob") || data.dob).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A";
    
    const address = watch("address") || data?.address || data?.address?.address || "N/A";
    const city = watch("city") || data?.city || data?.address?.city || "N/A";
    const pincode = watch("pincode") || data?.pincode || data?.address?.pincode || "N/A";
    const stateName = watch("addressState") || data?.state || data?.address?.state || "N/A";
    const panNumber = watch("panNumber") || data?.panCardNumber || data?.id_proof?.pan_card_number || "N/A";

    const aadharFrontUrl = data?.id_proof_front_url || data?.id_proof?.id_proof_frontUrl || "";
    const aadharBackUrl = data?.id_proof_back_url || data?.id_proof?.id_proof_backUrl || "";
    const panCardUrl = data?.pan_card_url || data?.id_proof?.pan_card_url || "";

    return (
      <main className="w-full min-h-screen bg-[color:var(--surface-page)] font-[family-name:var(--font-sans)]">
        <div className="mx-auto max-w-[118.75rem] px-[1.5rem] lg:px-[2.5rem] xl:px-[3.5rem] 2xl:px-[4.5rem] py-[1.5rem] lg:py-[2rem] xl:py-[2.5rem] 2xl:py-[3rem]">
          <div className="mb-[1.25rem] lg:mb-[1.5rem] xl:mb-[1.75rem]">
            <ProfileBackButton onClick={handleBackToDirectory} />
          </div>

          <div className="bg-[color:var(--surface-card)] rounded-[1.75rem] lg:rounded-[2.25rem] xl:rounded-[2.875rem] px-[1.25rem] lg:px-[2rem] xl:px-[3.125rem] pt-[1.5rem] lg:pt-[1.75rem] xl:pt-[2rem] pb-[2rem] lg:pb-[2.5rem] xl:pb-[3rem] flex flex-col gap-[1rem] lg:gap-[1.125rem] xl:gap-[1.25rem]">
            <ProfileHeaderCard agent={agent} />

            <SectionCard title="Personal Information">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[1.5rem] lg:gap-x-[2rem] xl:gap-x-[2.5rem] gap-y-[1.25rem] lg:gap-y-[1.5rem] xl:gap-y-[1.75rem]">
                <InfoField label="Email" value={email} />
                <InfoField label="Phone number" value={phone} />
                <InfoField label="Date Of Birth" value={dateOfBirth} />
                <InfoField label="PAN Number" value={panNumber} />
              </div>
            </SectionCard>

            <SectionCard title="Address Information">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[1.5rem] lg:gap-x-[2rem] xl:gap-x-[2.5rem] gap-y-[1.25rem] lg:gap-y-[1.5rem] xl:gap-y-[1.75rem]">
                <InfoField label="Address" value={address} className="col-span-2 xl:col-span-3" />
                <InfoField label="City / Village" value={city} />
                <InfoField label="State" value={stateName} />
                <InfoField label="Pin Code" value={pincode} />
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
                onClick={handleBackToDirectory}
                className="font-medium font-[family-name:'Inter',sans-serif] text-[color:var(--profile-text)] px-[1.25rem] lg:px-[1.5rem] py-[0.5rem] rounded-[0.375rem] text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] 2xl:text-[1rem] hover:bg-gray-100 transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleBackToDirectory}
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
    <div className="min-h-screen bg-[color:var(--surface-page)] p-[clamp(16px,2vw,32px)]">
      {/* ── Go Back ── */}
      <button
        onClick={handleBackToDirectory}
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
        {isViewMode
          ? "View Agent Profile"
          : isEdit
            ? "Edit Agent"
            : "Create Agent"}
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
            <img
              src={Bannar}
              alt="Banner"
              className="w-full h-full object-cover"
            />
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
                        {field.value ? (
                          <ImagePreview file={field.value} className="w-full h-full object-cover rounded-full" />
                        ) : (agentData?.data?.avatar || agentData?.data?.profile_image || (initialData as any)?.avatar || (initialData as any)?.profile_image) ? (
                          <img
                            src={agentData?.data?.avatar || agentData?.data?.profile_image || (initialData as any)?.avatar || (initialData as any)?.profile_image}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : profileImage ? (
                          <img
                            src={profileImage}
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
                      {!isViewMode && (
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
                      )}
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
              label="D.O.B."
              placeholder="Enter Age"
              type="date"
              disabled={isViewMode}
            />
            <RHFTextField
              name="email"
              control={control}
              label="Mail"
              placeholder="Enter Mail ID"
              type="email"
              maxLength={150}
              disabled={isViewMode}
            />
            <RHFTextField
              name="phone"
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
              maxLength={30}
              disabled={isViewMode}
            />
            <RHFTextField
              name="city"
              control={control}
              label="City / Village"
              placeholder="Enter City / Village"
              maxLength={30}
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
            <RHFTextField
              name="panNumber"
              control={control}
              label="PAN Card Number"
              placeholder="Enter PAN Number"
              maxLength={30}
              disabled={isViewMode}
            />
          </div>
        </FormSection>

        {/* ── UPLOAD DOCUMENTS — now RHF-controlled ── */}
        <FormSection title="Upload Documents">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,30px)]">
            <UploadBox
              name="aadharFront"
              title="Aadhar Card (Front)"
              control={control}
              disabled={isViewMode}
              existingUrl={agentData?.data?.id_proof_front_url || agentData?.data?.id_proof?.id_proof_frontUrl || (initialData as any)?.id_proof_front_url || (initialData as any)?.id_proof?.id_proof_frontUrl || (initialData as any)?.id_proof?.id_proof_front_url}
            />
            <UploadBox
              name="aadharBack"
              title="Aadhar Card (Back)"
              control={control}
              disabled={isViewMode}
              existingUrl={agentData?.data?.id_proof_back_url || agentData?.data?.id_proof?.id_proof_backUrl || (initialData as any)?.id_proof_back_url || (initialData as any)?.id_proof?.id_proof_backUrl || (initialData as any)?.id_proof?.id_proof_back_url}
            />
            <UploadBox
              name="panCard"
              title="Pan Card"
              control={control}
              disabled={isViewMode}
              existingUrl={agentData?.data?.pan_card_url || agentData?.data?.id_proof?.pan_card_url || (initialData as any)?.pan_card_url || (initialData as any)?.id_proof?.pan_card_url || (initialData as any)?.id_proof?.pan_card_url}
            />
          </div>
        </FormSection>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex justify-end items-center gap-[clamp(12px,1vw,16px)] pt-4">
          {isViewMode ? (
            <Button
              variant="primary"
              onClick={handleBackToDirectory}
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
              Go Back
            </Button>
          ) : (
            <>
              <button
                onClick={handleBackToDirectory}
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
                onClick={handleSubmit(handleSave, () => {
                  toast.error("Please fix validation errors before saving.");
                })}
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
            </>
          )}
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

// ─── UploadBox (now RHF-controlled) ──────────────────────────────────────────

function UploadBox({
  title,
  name,
  control,
  disabled = false,
  existingUrl = "",
}: {
  title: string;
  name: "aadharFront" | "aadharBack" | "panCard";
  control: Control<AgentFormValues>;
  disabled?: boolean;
  existingUrl?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const fileValue = field.value || existingUrl;
        return (
          <div className="space-y-[clamp(8px,0.8vw,14px)]">
            <p className="font-medium text-[length:clamp(12px,0.97vw,16px)] text-[color:var(--label-color)] font-[family-name:var(--font-sans)]">
              {title}
            </p>
            <div
              className={`
                relative flex flex-col items-center justify-center gap-2
                h-[clamp(100px,9vw,128px)]
                border-2 border-dashed rounded-[var(--radius-dropdown)]
                bg-[color:var(--input)]
                transition-colors overflow-hidden
                ${disabled ? "opacity-60 cursor-not-allowed border-gray-200" : "border-[color:var(--border-default)]"}
                ${fieldState.error ? "border-red-500 bg-red-50/30" : ""}
              `}
            >
              {fileValue ? (
                <>
                  <ImagePreview file={fileValue} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                    {!disabled && (
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
                        title="Change"
                      >
                        <FileText className="w-4 h-4 stroke-[2]" />
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
                    {field.value ? "Selected" : "Uploaded"}
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => !disabled && inputRef.current?.click()}
                  disabled={disabled}
                  className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer disabled:cursor-not-allowed"
                >
                  <Upload
                    strokeWidth={1.5}
                    className="w-[clamp(18px,1.6vw,24px)] h-[clamp(18px,1.6vw,24px)] text-[color:var(--label-color)]"
                  />
                  <span className="font-medium text-[length:clamp(12px,0.9vw,16px)] text-[color:var(--profile-text)] font-[family-name:var(--font-sans)]">
                    Upload File
                  </span>
                </button>
              )}
              <input
                ref={inputRef}
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
            {lightboxOpen && fileValue && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setLightboxOpen(false)}
              >
                <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                  <ImagePreview file={fileValue} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" />
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
        );
      }}
    />
  );
}
