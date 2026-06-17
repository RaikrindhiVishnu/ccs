import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOwnerDetailsForm } from "./UploadOwnerDetailsForm";
import { UploadFamilyTreeTab } from "./UploadFamilyTreeTab";
import { UploadLandDetailsTab } from "./UploadLandDetailsTab";
import { UploadMemberEditModal } from "./UploadMemberEditModal";
import { UploadSubmittedModal } from "./UploadSubmittedModal";

interface UploadCustomerInformationCardProps {
  farmlandId: string;
  onSubmit?: (data: any) => void;
  onDismiss?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const UploadCustomerInformationCard: React.FC<UploadCustomerInformationCardProps> = ({
  farmlandId,
  onSubmit,
  onDismiss,
  style,
  className = "",
}) => {
  const navigate = useNavigate();
  
  // Modals state
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const [editingMember, setEditingMember] = useState<"father" | "mother" | "spouse" | "owner" | "custom" | null>(null);

  // Input fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState("");

  // Tabs state - matching figma tabs: Owner details, Family Tree, Land Details
  const [activeTab, setActiveTab] = useState<"owner" | "family" | "land">("owner");

  // Family tree state
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [isFatherFilled, setIsFatherFilled] = useState(false);
  const [isMotherFilled, setIsMotherFilled] = useState(false);
  const [isSpouseFilled, setIsSpouseFilled] = useState(false);
  const [isOwnerFilled, setIsOwnerFilled] = useState(false);

  // Photos of the members in state
  const [fatherPhoto, setFatherPhoto] = useState<string | null>(null);
  const [motherPhoto, setMotherPhoto] = useState<string | null>(null);
  const [spousePhoto, setSpousePhoto] = useState<string | null>(null);
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);

  // Zoom control state
  const [zoomLevel, setZoomLevel] = useState(60);

  // Edit modal helper states
  const [tempName, setTempName] = useState("");
  const [tempDob, setTempDob] = useState("");
  const [tempExpiry, setTempExpiry] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedRelation, setSelectedRelation] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (role: "father" | "mother" | "spouse" | "owner" | "custom", currentName: string) => {
    setEditingMember(role);
    setTempName(currentName);
    
    // Prefill details if existing
    setTempDob("");
    setTempExpiry("");
    setIsExpired(false);
    setSelectedConnection("");
    setSelectedRelation("");
    
    if (role === "father") {
      setUploadedPhoto(fatherPhoto);
    } else if (role === "mother") {
      setUploadedPhoto(motherPhoto);
    } else if (role === "spouse") {
      setUploadedPhoto(spousePhoto);
    } else if (role === "owner") {
      setUploadedPhoto(ownerPhoto);
    } else {
      setUploadedPhoto(null);
    }
  };

  const handleSaveMember = () => {
    if (editingMember === "father") {
      setFatherName(tempName);
      setIsFatherFilled(!!tempName.trim());
      setFatherPhoto(uploadedPhoto);
    } else if (editingMember === "mother") {
      setMotherName(tempName);
      setIsMotherFilled(!!tempName.trim());
      setMotherPhoto(uploadedPhoto);
    } else if (editingMember === "spouse") {
      setSpouseName(tempName);
      setIsSpouseFilled(!!tempName.trim());
      setSpousePhoto(uploadedPhoto);
    } else if (editingMember === "owner") {
      setOwnerName(tempName);
      setIsOwnerFilled(!!tempName.trim());
      setOwnerPhoto(uploadedPhoto);
    } else if (editingMember === "custom") {
      alert(`Custom member added: ${tempName} (${selectedRelation} of ${selectedConnection})`);
    }
    setEditingMember(null);
  };

  // Dynamic values for avatar and heading
  const getInitials = () => {
    const f = firstName.trim().charAt(0);
    const l = lastName.trim().charAt(0);
    if (!f && !l) return "RK";
    return `${f}${l}`.toUpperCase();
  };

  const getDisplayName = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    return fullName || "Ramudu Kumar";
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-populate owner node inside family tree automatically with Owner's full name
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    setOwnerName(fullName || "Ramudu Kumar");
    setIsOwnerFilled(true);
    
    setActiveTab("family");
  };

  const handleFinalSubmit = () => {
    setShowSubmittedModal(false);
    if (onSubmit) {
      onSubmit({
        firstName,
        lastName,
        phoneNumber,
        email,
        dob,
        religion,
        gender,
        fatherName,
        motherName,
        spouseName,
        ownerName,
      });
    }
    navigate(`/super-admin/upload/documents/legal-documents/${farmlandId}`);
  };

  return (
    <div 
      className={`bg-white shadow-[0px_20px_40px_rgba(0,49,50,0.06)] rounded-[clamp(1.5rem,3.19vw,2.875rem)] p-[clamp(1.25rem,2.78vw,2.5rem)] flex flex-col justify-between w-full ${className}`}
      style={{
        minHeight: "min(901px, 85vh)",
        ...style
      }}
    >
      {/* ── Top Row: Switcher Tabs (Aligned Right) ── */}
      <div className="flex justify-end w-full mb-[clamp(1.5rem,2.22vw,2rem)]">
        <div className="flex flex-row items-center gap-6 sm:w-auto w-full justify-end">
          
          {/* Tab 1: Owner details */}
          <button
            type="button"
            onClick={() => setActiveTab("owner")}
            className="box-sizing-border-box flex flex-row items-center justify-center gap-[clamp(0.5rem,0.97vw,0.875rem)] cursor-pointer rounded-[72.5581px] transition-all hover:scale-[1.03] shadow-[0px_42px_17px_rgba(0,0,0,0.01)]"
            style={{
              width: "clamp(8.5rem, 11.3vw, 10.1875rem)",
              height: "clamp(2.2rem, 2.92vw, 2.625rem)",
              backgroundColor: activeTab === "owner" ? "#FFFFFF" : "#F9F9F9",
              border: activeTab === "owner" ? "1px solid #E6EEAD" : "1px solid transparent",
              color: activeTab === "owner" ? "#2A3008" : "#5A5C5E",
            }}
          >
            {/* Checklist indicator */}
            {activeTab === "owner" ? (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#2D3409",
                  border: "4px solid #E6EEAD",
                }}
              />
            ) : (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0 bg-[#BDD327] relative"
              >
                {/* Checkmark mark */}
                <svg className="w-[clamp(0.5rem,0.69vw,0.625rem)] h-[clamp(0.5rem,0.69vw,0.625rem)] text-[#FFFCEE]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            )}
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.75rem,0.97vw,0.875rem)] leading-tight">
              Owner details
            </span>
          </button>

          {/* Tab 2: Family Tree */}
          <button
            type="button"
            onClick={() => setActiveTab("family")}
            className="box-sizing-border-box flex flex-row items-center justify-center gap-[clamp(0.5rem,0.97vw,0.875rem)] cursor-pointer rounded-[72.5581px] transition-all hover:scale-[1.03] shadow-[0px_42px_17px_rgba(0,0,0,0.01)]"
            style={{
              width: "clamp(7.5rem, 9.93vw, 8.9375rem)",
              height: "clamp(2.2rem, 2.92vw, 2.625rem)",
              backgroundColor: activeTab === "family" ? "#FFFFFF" : "#F9F9F9",
              border: activeTab === "family" ? "1px solid #E6EEAD" : "1px solid transparent",
              color: activeTab === "family" ? "#2A3008" : "#5A5C5E",
            }}
          >
            {/* Checklist indicator */}
            {activeTab === "family" ? (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#2D3409",
                  border: "4px solid #E6EEAD",
                }}
              />
            ) : activeTab === "land" ? (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0 bg-[#BDD327] relative animate-in zoom-in duration-200"
              >
                <svg className="w-[clamp(0.5rem,0.69vw,0.625rem)] h-[clamp(0.5rem,0.69vw,0.625rem)] text-[#FFFCEE]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            ) : (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#C0C2B7",
                  border: "4px solid #E6EEAD",
                }}
              />
            )}
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.75rem,0.97vw,0.875rem)] leading-tight">
              Family Tree
            </span>
          </button>

          {/* Tab 3: Land Details */}
          <button
            type="button"
            onClick={() => setActiveTab("land")}
            className="box-sizing-border-box flex flex-row items-center justify-center gap-[clamp(0.5rem,0.97vw,0.875rem)] cursor-pointer rounded-[72.5581px] transition-all hover:scale-[1.03] shadow-[0px_42px_17px_rgba(0,0,0,0.01)]"
            style={{
              width: "clamp(8rem, 10.49vw, 9.4375rem)",
              height: "clamp(2.2rem, 2.92vw, 2.625rem)",
              backgroundColor: activeTab === "land" ? "#FFFFFF" : "#F9F9F9",
              border: activeTab === "land" ? "1px solid #E6EEAD" : "1px solid transparent",
              color: activeTab === "land" ? "#2A3008" : "#5A5C5E",
            }}
          >
            {/* Checklist indicator */}
            {activeTab === "land" ? (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#2D3409",
                  border: "4px solid #E6EEAD",
                }}
              />
            ) : (
              <div 
                className="w-[clamp(1rem,1.25vw,1.125rem)] h-[clamp(1rem,1.25vw,1.125rem)] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "#C0C2B7",
                  border: "4px solid #E6EEAD",
                }}
              />
            )}
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.75rem,0.97vw,0.875rem)] leading-tight">
              Land Details
            </span>
          </button>

        </div>
      </div>

      {/* ── Middle Row: Avatar HUD (Aligned Left with Bottom Border) ── */}
      {activeTab === "owner" && (
        <div className="flex justify-start items-center pb-8 border-b border-gray-100 w-full mb-[clamp(1.5rem,2.22vw,3rem)]">
          <div className="flex flex-row items-center gap-[clamp(1rem,1.46vw,2rem)] shrink-0">
            {/* Avatar Circle */}
            <div 
              className="box-sizing-border-box bg-[#E6EEAD] border-[4px] border-[#F9F9FB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[9999px] flex items-center justify-center relative shrink-0 w-[clamp(4.5rem,5.7vw,7rem)] h-[clamp(4.5rem,5.7vw,7rem)]"
            >
              <span className="font-['Manrope'] font-bold text-[#2D3409] text-[clamp(1.5rem,2.08vw,2.75rem)] leading-none flex items-center justify-center">
                {getInitials()}
              </span>
            </div>
            
            {/* Full Name display */}
            <div className="flex flex-col justify-center items-start shrink-0">
              <h2 className="font-['Manrope'] font-bold text-[#1A1C1D] text-[clamp(1.25rem,1.67vw,2.25rem)] leading-tight flex items-center">
                {getDisplayName()}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab Content Renderer ── */}
      {activeTab === "owner" ? (
        <UploadOwnerDetailsForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          dob={dob}
          setDob={setDob}
          religion={religion}
          setReligion={setReligion}
          gender={gender}
          setGender={setGender}
          onDismiss={onDismiss}
          onSubmit={handleCreateSubmit}
        />
      ) : activeTab === "family" ? (
        <UploadFamilyTreeTab
          setActiveTab={setActiveTab}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          fatherName={fatherName}
          fatherPhoto={fatherPhoto}
          isFatherFilled={isFatherFilled}
          motherName={motherName}
          motherPhoto={motherPhoto}
          isMotherFilled={isMotherFilled}
          ownerName={ownerName}
          ownerPhoto={ownerPhoto}
          isOwnerFilled={isOwnerFilled}
          spouseName={spouseName}
          spousePhoto={spousePhoto}
          isSpouseFilled={isSpouseFilled}
          handleEditClick={handleEditClick}
        />
      ) : (
        <UploadLandDetailsTab
          setActiveTab={setActiveTab}
          onNextClick={() => setShowSubmittedModal(true)}
        />
      )}

      {/* ── Add/Edit Member Modal ── */}
      {editingMember && (
        <UploadMemberEditModal
          editingMember={editingMember}
          setEditingMember={setEditingMember}
          handlePhotoClick={handlePhotoClick}
          uploadedPhoto={uploadedPhoto}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          tempName={tempName}
          setTempName={setTempName}
          tempDob={tempDob}
          setTempDob={setTempDob}
          tempExpiry={tempExpiry}
          setTempExpiry={setTempExpiry}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          selectedConnection={selectedConnection}
          setSelectedConnection={setSelectedConnection}
          selectedRelation={selectedRelation}
          setSelectedRelation={setSelectedRelation}
          handleSaveMember={handleSaveMember}
        />
      )}

      {/* ── Submission Success Modal ── */}
      {showSubmittedModal && (
        <UploadSubmittedModal
          farmlandId={farmlandId}
          onProceed={handleFinalSubmit}
          onDismiss={() => {
            setShowSubmittedModal(false);
            navigate(`/super-admin/upload/documents/legal-documents/${farmlandId}`);
          }}
        />
      )}
    </div>
  );
};

export default UploadCustomerInformationCard;
