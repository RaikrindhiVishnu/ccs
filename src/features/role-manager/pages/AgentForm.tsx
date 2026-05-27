import { useRef } from "react"; // removed useState for files
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import SuccessIcon from "@/assets/sucess.svg";
import { Upload, ArrowLeft, User, Camera } from "lucide-react";
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
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react"; // kept only for profileImage                       // kept only for profileImage
import Successcard from "@/components/ui/Successcard";
import { useGetAllMasterDataQuery } from "@/features/role-manager/api/masterDataApi";

import { getRoleId } from "@/features/role-manager/utils/getRoleId";
import { useSelector } from "react-redux";
import { useGetAgentByIdMutation, useGetLocationHierarchyDetailsMutation } from "@/features/role-manager/api/roleManagerApi";
import { useGetRegionsByStateIdQuery, useGetAllAreasByRegionIdQuery } from "../api/regionSelectionApi";
import { useGeneratePresignedUrlQuery } from "@/features/auth/api/authApi";
import ProfileHeaderCard from "../components/ui/ProfileHeaderCard";
import SectionCard from "../components/ui/SectionCard";
import InfoField from "../components/ui/InfoField";
import DocumentCard from "../components/ui/DocumentCard";
import ProfileBackButton from "../components/ui/BackButton";
import { uploadUserDocument } from "@/core/utils/fileUpload";
// ─── Dropdown option lists ────────────────────────────────────────────────────

const BANK_OPTIONS = [
  "HDFC Bank",
  "SBI",
  "ICICI Bank",
  "Axis Bank",
  "Bank of Baroda",
  "Canara Bank",
];

// ─── Image Preview Helper ───────────────────────────────────────────────────

function ImagePreview({ file, className, onUrlReady }: { file: any; className?: string; onUrlReady?: (url: string) => void }) {
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
      onUrlReady?.(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (typeof file === "string") {
      if (isS3Key) {
        if (s3Data?.url) {
          setSrc(s3Data.url);
          onUrlReady?.(s3Data.url);
        }
      } else {
        setSrc(file);
        onUrlReady?.(file);
      }
    }
  }, [file, s3Data, isS3Key, onUrlReady]);

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


  const stateOptions = states.map((item: any) => item.desc);
  const location = useLocation();
  const navigate = useNavigate();

  const { userId: locUserId } = location.state || {};

  const handleBackToDirectory = () => {
    navigate("/role-manager/user-directory");
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [successCardProps, setSuccessCardProps] = useState<any | null>(null);

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
  
  const approvedStatus = masterData?.data?.userRegistrationStatusResult?.find((status: any) => status.code === "APPRVD");
  const registrationStatusId = approvedStatus?.id || 2;

  const { control, handleSubmit, watch, reset, setValue } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      firstName:
        initialData?.firstName ?? (initialData as any)?.first_name ?? "",
      lastName: initialData?.lastName ?? (initialData as any)?.last_name ?? "",
      dob: initialData?.dob ? initialData.dob.split("T")[0] : "",
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
        (initialData as any)?.pan_card_number ??
        (initialData as any)?.id_proof?.pan_card_number ??
        "",
      state:
        initialData?.state ??
        (initialData as any)?.geo_assignments?.state_id ??
        "",
      region:
        (initialData as any)?.region ??
        "",
      area:
        (initialData as any)?.area ??
        "",
      bankName:
        initialData?.bankName ??
        (initialData as any)?.bank_name ??
        (initialData as any)?.id_proof?.bank_name ??
        "",
      accountNumber:
        initialData?.accountNumber ??
        (initialData as any)?.account_number ??
        (initialData as any)?.id_proof?.bank_account_number ??
        "",
      ifscCode:
        initialData?.ifscCode ??
        (initialData as any)?.ifsc_code ??
        (initialData as any)?.id_proof?.ifsc_code ??
        "",
      bankBranch:
        initialData?.bankBranch ?? 
        (initialData as any)?.branch ?? 
        (initialData as any)?.id_proof?.branch ?? 
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
  const [getLocationHierarchyDetails] = useGetLocationHierarchyDetailsMutation();
  const [hierarchy, setHierarchy] = useState<any>(null);

  const fetchedRef = useRef<any>(null);

  useEffect(() => {
    if (userId && fetchedRef.current !== userId) {
      fetchedRef.current = userId;
      getAgentById(userId);
    }
  }, [userId, getAgentById]);

  const selectedStateName = watch("state");
  const selectedRegionName = watch("region");
  const selectedAreaName = watch("area");

  const selectedStateObj = states.find((s: any) => s.desc === selectedStateName);
  const stateId = selectedStateObj?.id;

  // Query regions by state ID
  const { data: regionsData } = useGetRegionsByStateIdQuery(
    { state_id: Number(stateId) },
    { skip: !stateId }
  );

  const regionOptions = regionsData?.data?.map((r: any) => r.region_name) || [];

  const selectedRegionObj = regionsData?.data?.find(
    (r: any) => r.region_name === selectedRegionName
  );
  const regionId = selectedRegionObj?.id;

  // Query areas by region ID
  const { data: areasData } = useGetAllAreasByRegionIdQuery(
    { region_id: Number(regionId) },
    { skip: !regionId }
  );

  const areaOptions = areasData?.data?.map((a: any) => a.area_name) || [];

  const selectedAreaObj = areasData?.data?.find(
    (a: any) => a.area_name === selectedAreaName
  );

  // Reset child fields when parent changes
  const prevStateRef = useRef(selectedStateName);
  const prevRegionRef = useRef(selectedRegionName);

  useEffect(() => {
    if (selectedStateName !== prevStateRef.current) {
      setValue("region", "");
      setValue("area", "");
      prevStateRef.current = selectedStateName;
    }
  }, [selectedStateName, setValue]);

  useEffect(() => {
    if (selectedRegionName !== prevRegionRef.current) {
      setValue("area", "");
      prevRegionRef.current = selectedRegionName;
    }
  }, [selectedRegionName, setValue]);

  // Fetch location hierarchy when Area changes to show RO/IO/FO details
  useEffect(() => {
    if (selectedAreaObj) {
      const distId = selectedAreaObj.district_ids?.[0];
      const mandalId = selectedAreaObj.mandal_ids?.[0];
      if (distId && mandalId) {
        getLocationHierarchyDetails({
          district_id: Number(distId),
          mandal_id: Number(mandalId),
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
  }, [selectedAreaObj, getLocationHierarchyDetails]);

  // Pre-fill state from agentData or initialData
  useEffect(() => {
    const geo = agentData?.data?.geo_assignments || (initialData as any)?.geo_assignments;
    if (geo?.state_id && states.length > 0) {
      const stateObj = states.find((s: any) => s.id === geo.state_id);
      if (stateObj) {
        prevStateRef.current = stateObj.desc;
        setValue("state", stateObj.desc, { shouldValidate: true });
      }
    }
  }, [agentData, initialData, states, setValue]);

  // Pre-fill region when regionsData is loaded
  useEffect(() => {
    const geo = agentData?.data?.geo_assignments || (initialData as any)?.geo_assignments;
    if (geo?.region_id && regionsData?.data) {
      const regionObj = regionsData.data.find((r: any) => r.id === geo.region_id);
      if (regionObj) {
        prevRegionRef.current = regionObj.region_name;
        setValue("region", regionObj.region_name, { shouldValidate: true });
      }
    }
  }, [regionsData, agentData, initialData, setValue]);

  // Pre-fill area when areasData is loaded
  useEffect(() => {
    const geo = agentData?.data?.geo_assignments || (initialData as any)?.geo_assignments;
    if (geo?.areas_id && areasData?.data) {
      const areaObj = areasData.data.find((a: any) => a.area_id === geo.areas_id);
      if (areaObj) {
        setValue("area", areaObj.area_name, { shouldValidate: true });
      }
    }
  }, [areasData, agentData, initialData, setValue]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
  };

  const getGeoNames = (srcData: any) => {
    const geo = srcData?.geo_assignments;
    
    const safeLower = (val: any): string => {
      if (typeof val === "string") return val.toLowerCase();
      if (val && typeof val.desc === "string") return val.desc.toLowerCase();
      if (val && typeof val.name === "string") return val.name.toLowerCase();
      return "";
    };

    const stateObj = states.find((s: any) => {
      const sDesc = safeLower(s.desc);
      if (!sDesc) return false;
      return (
        String(s.id) === String(geo?.state_id) ||
        String(s.id) === String(srcData?.address_state_id) ||
        String(s.id) === String(srcData?.address?.state_id) ||
        sDesc === safeLower(srcData?.state) ||
        sDesc === safeLower(srcData?.address?.state)
      );
    });

    const stateVal = stateObj?.desc ||
      (typeof srcData?.state === "string" ? srcData.state : srcData?.state?.desc || srcData?.state?.name) ||
      (typeof srcData?.address?.state === "string" ? srcData.address.state : srcData?.address?.state?.desc || srcData?.address?.state?.name) ||
      "";
    return { stateVal };
  };

  useEffect(() => {
    if (agentData?.data && states.length > 0) {
      const data = agentData.data;
      const { stateVal } = getGeoNames(data);
      reset({
        firstName: data.firstName || data.first_name || "",
        lastName: data.lastName || data.last_name || "",
        dob: formatDate(data.dob),
        email: data.email || data.emailAddress || "",
        phone: data.phone || data.phoneNumber || data.mobile || data.contact || "",
        address: data.address || data.address?.address || "",
        addressState: stateVal || data.state || data.address?.state || "",
        city: data.city || data.address?.city || "",
        pincode: data.pincode || data.address?.pincode || "",
        panNumber: data.pan_card_number || data.panCardNumber || data.id_proof?.pan_card_number || "",
        state: stateVal,
        region: "",
        area: "",
        bankName: data.bank_name || data.bankName || data.id_proof?.bank_name || "",
        accountNumber: data.account_number || data.accountNumber || data.id_proof?.bank_account_number || "",
        ifscCode: data.ifsc_code || data.ifscCode || data.id_proof?.ifsc_code || "",
        bankBranch: data.branch || data.bankBranch || data.id_proof?.branch || "",
      });
      setDobState(formatDate(data.dob));
      setAddressState(data.address || data.address?.address || "");
      setRoleIdState(data.role_id || 1);
    }
  }, [agentData, reset, states]);

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  useEffect(() => {
    if (isEdit && initialData) {
      setDobState(formatDate(initialData.dob || (initialData as any).dob));
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
      let res: any = null;
      const selectedStateObj = states.find((s: any) => s.desc === values.state);
      const stateIdVal = selectedStateObj?.id ? Number(selectedStateObj.id) : 1;

      const selectedRegionObj = regionsData?.data?.find((r: any) => r.region_name === values.region);
      const regionIdVal = selectedRegionObj?.id ? Number(selectedRegionObj.id) : 1;

      const selectedAreaObj = areasData?.data?.find((a: any) => a.area_name === values.area);
      const areaIdVal = selectedAreaObj?.area_id ? Number(selectedAreaObj.area_id) : 1;

      const districtIdVal = selectedAreaObj?.district_ids?.[0] ? Number(selectedAreaObj.district_ids[0]) : 1;
      const mandalIdVal = selectedAreaObj?.mandal_ids?.[0] ? Number(selectedAreaObj.mandal_ids[0]) : 1;

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

            address: {
              address: values.address || addressState || "",
              state_id: stateIdVal,
              city: values.city || "",
              pincode: values.pincode || "",
            },

            geo_assignments: {
              country_id: 1,
              state_id: stateIdVal,
              district_id: districtIdVal,
              mandal_id: mandalIdVal,
              region_id: regionIdVal,
              areas_id: areaIdVal,
            },
          };

          res = await updateAgentDetails(payload).unwrap();
        } else {
          toast.error("Unknown role type for update");
          return;
        }
      } else {
        const docUploadToastId = toast.loading("Uploading documents...");
        
        let aadharFrontKey = "front.png";
        let aadharBackKey = "back.png";
        let panKey = "pan.png";
        let profilePicKey = "profile.png";

        try {
          const uploadPromises = [];

          if (values.aadharFront instanceof File) {
            uploadPromises.push(uploadUserDocument(values.aadharFront, values.email, "aadhar_front").then(res => { aadharFrontKey = res.key || "front.png"; }));
          }
          if (values.aadharBack instanceof File) {
            uploadPromises.push(uploadUserDocument(values.aadharBack, values.email, "aadhar_back").then(res => { aadharBackKey = res.key || "back.png"; }));
          }
          if (values.panCard instanceof File) {
            uploadPromises.push(uploadUserDocument(values.panCard, values.email, "pan").then(res => { panKey = res.key || "pan.png"; }));
          }
          if (values.profilePicture instanceof File) {
            uploadPromises.push(uploadUserDocument(values.profilePicture, values.email, "profile_image").then(res => { profilePicKey = res.key || "profile.png"; }));
          }

          if (uploadPromises.length > 0) {
            await Promise.all(uploadPromises);
          }
          toast.success("Documents uploaded successfully!", { id: docUploadToastId });
        } catch (error) {
          toast.error("Failed to upload one or more documents. Please try again.", { id: docUploadToastId });
          console.error("Document upload failed:", error);
          return;
        }

        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          countryCode: "+91",
          emailAddress: values.email,
          phoneNumber: values.phone,
          dob: values.dob,

          role_id: agentRoleId,
          registration_status_id: registrationStatusId,

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
            region_id: regionIdVal,
            areas_id: areaIdVal,
          },

          avatar: profilePicKey !== "profile.png" ? profilePicKey : undefined,

          id_proof: {
            bank_account_name: `${values.firstName} ${values.lastName}`,
            bank_account_number: values.accountNumber,
            ifsc_code: values.ifscCode,
            branch: values.bankBranch,
            bank_name: values.bankName,
            id_proof_frontUrl: aadharFrontKey,
            id_proof_backUrl: aadharBackKey,
            pan_card_number: values.panNumber,
            pan_card_url: panKey,
          },
        };

        res = await createAgent(payload).unwrap();
      }

      if (isEdit) {
        toast.success("Profile Updated Successfully");
        if (onCancel) {
          onCancel();
        } else {
          navigate("/role-manager/user-directory");
        }
      } else {
        const now = new Date();
        setSuccessCardProps({
          badgeLabel: "Agent Onboarding",
          titleLine1: "Agent",
          titleLine2: "Created Successfully!",
          redirectText: "Redirecting to User Directory...",
          regionName: `${values.firstName} ${values.lastName}`,
          assignedId: res?.responseData?.username || res?.data?.username || res?.data?.emailAddress || values.email || "N/A",
          createdDate: now.toLocaleDateString(),
          createdTime: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          mapImage: profileImage || null,
          onRedirect: () => {
            if (onCancel) {
              onCancel();
            } else {
              navigate("/role-manager/user-directory");
            }
          },
        });
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
  if (successCardProps) {
    return <Successcard {...successCardProps} />;
  }

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
    
    const stateObj = states.find((s: any) => s.desc === watch("state") || s.id === data?.geo_assignments?.state_id);
    const stateName = stateObj?.desc || data?.state || "N/A";

    const regionObj = regionsData?.data?.find((r: any) => r.region_name === watch("region") || r.id === data?.geo_assignments?.region_id);
    const regionName = regionObj?.region_name || data?.region || "N/A";

    const areaObj = areasData?.data?.find((a: any) => a.area_name === watch("area") || a.area_id === data?.geo_assignments?.areas_id);
    const areaName = areaObj?.area_name || data?.area || "N/A";

    // Operating Territory
    const operatingTerritory = [
      areaName,
      regionName,
      stateName,
    ].filter((val) => val && val !== "N/A").join(", ") || "N/A";

    const bankName = watch("bankName") || data?.bankName || data?.id_proof?.bank_name || "N/A";
    const accountNumber = watch("accountNumber") || data?.accountNumber || data?.id_proof?.bank_account_number || "N/A";
    const ifscCode = watch("ifscCode") || data?.ifscCode || data?.id_proof?.ifsc_code || "N/A";

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

            <SectionCard title="Info">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[1.5rem] lg:gap-x-[2rem] xl:gap-x-[2.5rem] gap-y-[1.25rem] lg:gap-y-[1.5rem] xl:gap-y-[1.75rem]">
                <InfoField label="First Name" value={watch("firstName") || data?.firstName || data?.first_name || "N/A"} />
                <InfoField label="Last Name" value={watch("lastName") || data?.lastName || data?.last_name || "N/A"} />
                <InfoField label="Email" value={email} />
                <InfoField label="Phone number" value={phone} />
                <InfoField label="Date Of Birth" value={dateOfBirth} />
                <InfoField label="PAN Number" value={watch("panNumber") || data?.panCardNumber || data?.id_proof?.pan_card_number || "N/A"} />
                <InfoField label="Address" value={watch("address") || data?.address || data?.address?.address || "N/A"} />
                <InfoField label="State" value={watch("addressState") || data?.state || data?.address?.state || "N/A"} />
                <InfoField label="City / Village" value={watch("city") || data?.city || data?.address?.city || "N/A"} />
                <InfoField label="Pincode" value={watch("pincode") || data?.pincode || data?.address?.pincode || "N/A"} />
                <InfoField label="Operating Territory" value={operatingTerritory} className="col-span-2 xl:col-span-3" />
              </div>
            </SectionCard>

            <SectionCard title="Bank Details">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[1.5rem] lg:gap-x-[2rem] xl:gap-x-[2.5rem] gap-y-[1.25rem] lg:gap-y-[1.5rem]">
                <InfoField label="Bank Name" value={bankName} />
                <InfoField label="Account Number" value={accountNumber} />
                <InfoField label="IFSC Code" value={ifscCode} />
                <InfoField label="Bank Branch" value={watch("bankBranch") || data?.bankBranch || data?.id_proof?.branch || "N/A"} />
              </div>
            </SectionCard>

            <SectionCard title="Documents Provided">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem] lg:gap-[1.5rem] xl:gap-[2rem]">
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
                          <ImagePreview
                            file={field.value}
                            className="w-full h-full object-cover rounded-full"
                            onUrlReady={setProfileImage}
                          />
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
                              e.target.value = "";
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
            <RHFDropdown
              name="addressState"
              control={control}
              label="State"
              placeholder="Select State"
              options={states?.map((s: any) => s.desc) || []}
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

        {/* ── SELECT STATE, REGION & AREA ── */}
        <FormSection title="Select State, Region & Area">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
            <RHFDropdown
              name="state"
              control={control}
              label="State"
              options={stateOptions}
              placeholder="Select State"
              disabled={isViewMode}
            />
            <div className="flex flex-col gap-1">
              <RHFDropdown
                name="region"
                control={control}
                label="Region"
                options={regionOptions}
                placeholder="Select Region"
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
                      RO : {hierarchy.regional_officer.first_name} {hierarchy.regional_officer.last_name} {hierarchy.regional_officer.id ? `(GLC 00${hierarchy.regional_officer.id})` : ""}
                    </span>
                  )}
                  {hierarchy.intelligence_officer && (
                    <span className="text-[13px] font-medium text-[#16a34a] mt-0.5 flex items-center gap-1">
                      IO : {hierarchy.intelligence_officer.first_name} {hierarchy.intelligence_officer.last_name} {hierarchy.intelligence_officer.id ? `(GLC 00${hierarchy.intelligence_officer.id})` : ""}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <RHFDropdown
                name="area"
                control={control}
                label="Area"
                options={areaOptions}
                placeholder="Select Area"
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
        </FormSection>

        {/* ── BANK DETAILS ── */}
        <FormSection title="Enter Bank Details">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
            <RHFDropdown
              name="bankName"
              control={control}
              label="Bank Name"
              options={BANK_OPTIONS}
              placeholder="Select Bank"
              disabled={isViewMode}
            />
            <RHFTextField
              name="accountNumber"
              control={control}
              label="Account Number"
              placeholder="Enter Account Number"
              maxLength={30}
              disabled={isViewMode}
            />
            <RHFTextField
              name="ifscCode"
              control={control}
              label="IFSC Code"
              placeholder="Enter IFSC Code"
              maxLength={30}
              disabled={isViewMode}
            />
            <RHFTextField
              name="bankBranch"
              control={control}
              label="Bank Branch"
              placeholder="Enter Bank Branch"
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
  const [previewUrl, setPreviewUrl] = useState<string>("");

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
            className={`
                            relative flex flex-col items-center justify-center gap-2
                            h-[clamp(100px,9vw,128px)]
                            border-2 border-dashed rounded-[var(--radius-dropdown)]
                            bg-[color:var(--input)]
                            transition-colors overflow-hidden group cursor-pointer
                            ${disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "hover:brightness-95"
              }
                            ${fieldState.error
                ? "border-red-500 bg-red-50/30"
                : "border-[color:var(--border-default)]"
              }
                        `}
            onClick={(e) => {
              if (disabled) return;
              if ((e.target as HTMLElement).closest('.action-btn')) return;
              inputRef.current?.click();
            }}
          >
            {field.value || existingUrl ? (
              <>
                <ImagePreview file={field.value || existingUrl} onUrlReady={setPreviewUrl} className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white cursor-default">
                  <button type="button" className="action-btn p-1.5 hover:bg-white/20 rounded-full transition-colors" title="View File" onClick={() => {
                    if (previewUrl) window.open(previewUrl, "_blank");
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button type="button" className="action-btn p-1.5 hover:bg-white/20 rounded-full transition-colors" title="Change File" onClick={() => !disabled && inputRef.current?.click()}>
                    <Upload className="w-4 h-4" />
                  </button>
                  <button type="button" className="action-btn p-1.5 hover:bg-white/20 rounded-full transition-colors" title="Remove File" onClick={() => {
                    field.onChange(undefined);
                    if (inputRef.current) inputRef.current.value = "";
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium pointer-events-none">
                  {field.value ? "Selected" : "Uploaded"}
                </div>
              </>
            ) : (
              <>
                <Upload
                  strokeWidth={1.5}
                  className="w-[clamp(18px,1.6vw,24px)] h-[clamp(18px,1.6vw,24px)] text-[color:var(--label-color)]"
                />
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
            disabled={disabled}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => {
              field.onChange(e.target.files?.[0] ?? undefined);
              e.target.value = "";
            }}
          />
        </div>
      )}
    />
  );
}
