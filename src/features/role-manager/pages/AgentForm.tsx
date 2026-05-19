import { useRef } from "react"; // removed useState for files
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
import { useLocation } from "react-router-dom";
import { RHFDropdown } from "@/components/form/RHFDropdown";
import { toast } from "sonner";
import { useState, useEffect } from "react"; // kept only for profileImage                       // kept only for profileImage
import { useGetAllMasterDataQuery, useGetAllRegionsByStateIdMutation } from "@/features/role-manager/api/masterDataApi";
import {
  useGetRegionOfficerDetailsQuery,
  useGetFieldOfficerDetailsQuery,
} from "@/features/role-manager/api/userDirectoryApi";
import { getRoleId } from "@/features/role-manager/utils/getRoleId";
import { useSelector } from "react-redux";
import { useGetAgentByIdMutation } from "@/features/role-manager/api/roleManagerApi";
// ─── Dropdown option lists ────────────────────────────────────────────────────


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
  onCancel,
  isLoading = false,
  roleType,
  isViewMode = false,
}: AgentFormProps) {
  const states = useSelector((state: any) => state.roleManager.states);

  const stateOptions = states.map((item: any) => item.desc);
  const location = useLocation();

  const { userId: locUserId } = location.state || {};

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

  const [regionsList, setRegionsList] = useState<any[]>([]);
  const [getRegionsByStateId] = useGetAllRegionsByStateIdMutation();

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
      state:
        initialData?.state ??
        (initialData as any)?.geo_assignments?.state_id ??
        "",
      region:
        initialData?.region ??
        (initialData as any)?.geo_assignments?.region_id ??
        "",
      area:
        initialData?.area ??
        (initialData as any)?.geo_assignments?.areas_id ??
        "",
      bankName:
        initialData?.bankName ??
        (initialData as any)?.id_proof?.bank_name ??
        "",
      accountNumber:
        initialData?.accountNumber ??
        (initialData as any)?.id_proof?.bank_account_number ??
        "",
      ifscCode:
        initialData?.ifscCode ??
        (initialData as any)?.id_proof?.ifsc_code ??
        "",
      bankBranch:
        initialData?.bankBranch ?? (initialData as any)?.id_proof?.branch ?? "",
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

  const selectedStateName = watch("state");
  const selectedRegionName = watch("region");
  const selectedAreaName = watch("area");

  const selectedStateObj = states.find((s: any) => s.desc === selectedStateName);
  const stateId = selectedStateObj?.id;

  const selectedRegionObj = regionsList.find((r: any) => (r.region_name || r.desc) === selectedRegionName);
  const regionId = selectedRegionObj?.id;

  const areaIndex = AREA_OPTIONS.indexOf(selectedAreaName || "");
  const areaId = areaIndex !== -1 ? areaIndex + 1 : null;

  // 1. Fetch Regions based on State ID
  useEffect(() => {
    if (stateId) {
      getRegionsByStateId({ state_id: stateId })
        .unwrap()
        .then((res) => {
          setRegionsList(res?.data || []);
        })
        .catch((err) => {
          console.error("Failed to fetch regions:", err);
          setRegionsList([]);
        });
    } else {
      setRegionsList([]);
    }
  }, [stateId, getRegionsByStateId]);

  // 2. Fetch Regional Officer & Intelligence Officer details
  const { data: regionOfficerData } = useGetRegionOfficerDetailsQuery(
    {
      state_id: stateId || 0,
      region_id: regionId || 0,
    },
    {
      skip: !stateId || !regionId,
    }
  );

  const regionalOfficerId = regionOfficerData?.data?.regional_officer_id;
  const intelligenceOfficerId = regionOfficerData?.data?.intelligence_officer_id;

  // 3. Fetch Field Officers under these regional/intelligence officers
  const { data: fieldOfficerData } = useGetFieldOfficerDetailsQuery(
    {
      regional_officer_id: regionalOfficerId || 0,
      intelligence_officer_id: intelligenceOfficerId || 0,
    },
    {
      skip: !regionalOfficerId && !intelligenceOfficerId,
    }
  );

  // 4. Filter FO list by selected Area
  const filteredFO = fieldOfficerData?.data?.find((fo: any) => {
    const foAreaId = fo.geo_assignments?.areas_id ?? fo.areas_id ?? fo.area_id;
    return Number(foAreaId) === Number(areaId);
  });

  // 5. Reset child selections properly when parent changes
  const prevStateIdRef = useRef<any>(undefined);
  useEffect(() => {
    if (stateId && prevStateIdRef.current !== undefined && stateId !== prevStateIdRef.current) {
      setValue("region", "");
      setValue("area", "");
    }
    if (stateId) {
      prevStateIdRef.current = stateId;
    }
  }, [stateId, setValue]);

  const prevRegionIdRef = useRef<any>(undefined);
  useEffect(() => {
    if (regionId && prevRegionIdRef.current !== undefined && regionId !== prevRegionIdRef.current) {
      setValue("area", "");
    }
    if (regionId) {
      prevRegionIdRef.current = regionId;
    }
  }, [regionId, setValue]);

  // 6. Pre-fill names dynamically in edit mode (resolving ID to name)
  useEffect(() => {
    if (agentData?.data && states.length > 0) {
      const data = agentData.data;
      const stateVal = data.state || data.geo_assignments?.state_id || "";
      const matchedState = states.find((s: any) => String(s.id) === String(stateVal) || s.desc === stateVal);
      if (matchedState) {
        setValue("state", matchedState.desc);
      }
    }
  }, [agentData, states, setValue]);

  useEffect(() => {
    if (agentData?.data && regionsList.length > 0) {
      const data = agentData.data;
      const regionVal = data.region || data.geo_assignments?.region_id || "";
      const matchedRegion = regionsList.find((r: any) => String(r.id) === String(regionVal) || (r.region_name || r.desc) === regionVal);
      if (matchedRegion) {
        setValue("region", matchedRegion.region_name || matchedRegion.desc || "");
      }
    }
  }, [regionsList, agentData, setValue]);

  useEffect(() => {
    if (agentData?.data) {
      const data = agentData.data;
      const areaVal = data.area || data.geo_assignments?.areas_id || "";
      if (typeof areaVal === "number" || !isNaN(Number(areaVal))) {
        const idx = Number(areaVal) - 1;
        if (idx >= 0 && idx < AREA_OPTIONS.length) {
          setValue("area", AREA_OPTIONS[idx]);
        }
      } else if (areaVal) {
        setValue("area", String(areaVal));
      }
    }
  }, [agentData, setValue]);

  useEffect(() => {
    if (initialData && states.length > 0) {
      const stateVal = initialData.state ?? (initialData as any).geo_assignments?.state_id ?? "";
      const matchedState = states.find((s: any) => String(s.id) === String(stateVal) || s.desc === stateVal);
      if (matchedState) {
        setValue("state", matchedState.desc);
      }
    }
  }, [initialData, states, setValue]);

  useEffect(() => {
    if (initialData && regionsList.length > 0) {
      const regionVal = initialData.region ?? (initialData as any).geo_assignments?.region_id ?? "";
      const matchedRegion = regionsList.find((r: any) => String(r.id) === String(regionVal) || (r.region_name || r.desc) === regionVal);
      if (matchedRegion) {
        setValue("region", matchedRegion.region_name || matchedRegion.desc || "");
      }
    }
  }, [initialData, regionsList, setValue]);

  useEffect(() => {
    if (initialData) {
      const areaVal = initialData.area ?? (initialData as any).geo_assignments?.areas_id ?? "";
      if (typeof areaVal === "number" || !isNaN(Number(areaVal))) {
        const idx = Number(areaVal) - 1;
        if (idx >= 0 && idx < AREA_OPTIONS.length) {
          setValue("area", AREA_OPTIONS[idx]);
        }
      } else if (areaVal) {
        setValue("area", String(areaVal));
      }
    }
  }, [initialData, setValue]);



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
        state: data.state || data.geo_assignments?.state_id || "",
        region: data.region || data.geo_assignments?.region_id || "",
        area: data.area || data.geo_assignments?.areas_id || "",
        bankName: data.bankName || data.id_proof?.bank_name || "",
        accountNumber: data.accountNumber || data.id_proof?.bank_account_number || "",
        ifscCode: data.ifscCode || data.id_proof?.ifsc_code || "",
        bankBranch: data.bankBranch || data.id_proof?.branch || "",
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
      const selectedStateObj = states.find((s: any) => s.desc === values.state);
      const stateIdVal = selectedStateObj?.id ? Number(selectedStateObj.id) : 1;

      const selectedRegionObj = regionsList.find((r: any) => (r.region_name || r.desc) === values.region);
      const regionIdVal = selectedRegionObj?.id ? Number(selectedRegionObj.id) : 1;

      const areaIndexVal = AREA_OPTIONS.indexOf(values.area);
      const areaIdVal = areaIndexVal !== -1 ? areaIndexVal + 1 : 1;

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
              state_id: stateIdVal,
              region_id: regionIdVal,
              areas_id: areaIdVal,
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
            district_id: 1,
            mandal_id: 1,
            region_id: regionIdVal,
            areas_id: areaIdVal,
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
                        {profileImage ? (
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

        {/* ── SELECT STATE, REGION & AREA ── */}
        <FormSection title="Select State, Region & Area">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(14px,1.5vw,20px)]">
            <RHFDropdown
              name="state"
              control={control}
              label="State"
              options={stateOptions}
              placeholder="Andhra Pradesh"
              disabled={isViewMode}
            />
            <div>
              <RHFDropdown
                name="region"
                control={control}
                label="Region"
                options={regionsList.map((r: any) => r.region_name || r.desc || "")}
                placeholder="Godavari Region"
                disabled={isViewMode}
              />
              <div className="mt-3 space-y-2">
                {selectedRegionName && regionOfficerData?.data ? (
                  <>
                    <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                      RO : {`${regionOfficerData.data.regional_officer_first_name || ""} ${regionOfficerData.data.regional_officer_last_name || ""}`.trim() || "Not Assigned"} {regionOfficerData.data.regional_officer_id ? `(GLC ${regionOfficerData.data.regional_officer_id})` : ""}
                    </p>
                    <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                      IO : {`${regionOfficerData.data.intelligence_officer_first_name || ""} ${regionOfficerData.data.intelligence_officer_last_name || ""}`.trim() || "Not Assigned"} {regionOfficerData.data.intelligence_officer_id ? `(GLC ${regionOfficerData.data.intelligence_officer_id})` : ""}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                      RO : Not Assigned
                    </p>
                    <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                      IO : Not Assigned
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <RHFDropdown
                name="area"
                control={control}
                label="Area"
                options={AREA_OPTIONS}
                placeholder="Tanuku Area"
                disabled={isViewMode}
              />
              <div className="mt-3">
                {selectedAreaName && filteredFO ? (
                  <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                    FO : {`${filteredFO.first_name || ""} ${filteredFO.last_name || ""}`.trim()} {filteredFO.role_id || filteredFO.id ? `(GLC ${filteredFO.role_id || filteredFO.id})` : ""}
                  </p>
                ) : (
                  <p className="text-[clamp(11px,0.85vw,14px)] font-medium text-[#00B012]">
                    FO : Not Assigned
                  </p>
                )}
              </div>
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
            />
            <UploadBox
              name="aadharBack"
              title="Aadhar Card (Back)"
              control={control}
              disabled={isViewMode}
            />
            <UploadBox
              name="panCard"
              title="Pan Card"
              control={control}
              disabled={isViewMode}
            />
          </div>
        </FormSection>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex justify-end items-center gap-[clamp(12px,1vw,16px)] pt-4">
          {isViewMode ? (
            <Button
              variant="primary"
              onClick={onCancel}
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
}: {
  title: string;
  name: "aadharFront" | "aadharBack" | "panCard";
  control: Control<AgentFormValues>;
  disabled?: boolean;
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
            onClick={() => !disabled && inputRef.current?.click()}
            className={`
                            flex flex-col items-center justify-center gap-2
                            h-[clamp(100px,9vw,128px)]
                            border-2 border-dashed rounded-[var(--radius-dropdown)]
                            bg-[color:var(--input)]
                            transition-colors
                            ${disabled
                ? "opacity-60 cursor-not-allowed border-gray-200"
                : "cursor-pointer hover:brightness-95"
              }
                            ${fieldState.error
                ? "border-red-500 bg-red-50/30"
                : "border-[color:var(--border-default)]"
              }
                        `}
          >
            {field.value ? (
              <>
                <FileText
                  strokeWidth={1.5}
                  className="w-[clamp(20px,1.8vw,28px)] h-[clamp(20px,1.8vw,28px)] text-[color:var(--label-color)]"
                />
                <span className="font-medium text-center px-3 truncate max-w-full text-[length:clamp(11px,0.85vw,14px)] text-[color:var(--profile-text)] font-[family-name:var(--font-sans)]">
                  {field.value.name}
                </span>
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
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
          />
        </div>
      )}
    />
  );
}
