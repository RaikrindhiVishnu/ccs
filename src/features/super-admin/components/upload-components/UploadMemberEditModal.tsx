import React from "react";
import { Plus } from "lucide-react";

interface UploadMemberEditModalProps {
  editingMember: "father" | "mother" | "spouse" | "owner" | "custom";
  setEditingMember: (val: "father" | "mother" | "spouse" | "owner" | "custom" | null) => void;
  handlePhotoClick: () => void;
  uploadedPhoto: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tempName: string;
  setTempName: (val: string) => void;
  tempDob: string;
  setTempDob: (val: string) => void;
  tempExpiry: string;
  setTempExpiry: (val: string) => void;
  isExpired: boolean;
  setIsExpired: (val: boolean) => void;
  selectedConnection: string;
  setSelectedConnection: (val: string) => void;
  selectedRelation: string;
  setSelectedRelation: (val: string) => void;
  handleSaveMember: () => void;
}

export const UploadMemberEditModal: React.FC<UploadMemberEditModalProps> = ({
  editingMember,
  setEditingMember,
  handlePhotoClick,
  uploadedPhoto,
  fileInputRef,
  handleFileChange,
  tempName,
  setTempName,
  tempDob,
  setTempDob,
  tempExpiry,
  setTempExpiry,
  isExpired,
  setIsExpired,
  selectedConnection,
  setSelectedConnection,
  selectedRelation,
  setSelectedRelation,
  handleSaveMember,
}) => {
  return (
    <div className="fixed inset-0 bg-[#F2F2F2]/40 backdrop-blur-[5.2px] z-50 flex items-center justify-center p-[clamp(1rem,2vw,2rem)]">
      <div 
        className="bg-white border border-[rgba(0,0,0,0.24)] rounded-[clamp(1rem,2.22vw,1.5rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] w-full max-w-[clamp(20rem,33vw,29.875rem)] flex flex-col p-[clamp(1.25rem,2.78vw,2.5rem)] animate-in fade-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto"
        style={{
          minHeight: "clamp(25rem, 50vh, 35.25rem)",
        }}
      >
        {/* Close Button & Title */}
        <div className="flex flex-row justify-between items-center w-full mb-[clamp(0.75rem,1.67vw,1.5rem)]">
          <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.875rem,1.11vw,1rem)] text-[#191C1E] capitalize">
            {editingMember === "custom" ? "Add a member" : `Add ${editingMember}`}
          </h3>
          <button 
            type="button"
            onClick={() => setEditingMember(null)}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all text-[#3E4A3D]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Photo Uploader */}
        <div className="flex flex-col items-center justify-center mb-[clamp(0.75rem,1.67vw,1.5rem)] w-full">
          <div 
            onClick={handlePhotoClick}
            className="w-[clamp(4.5rem,6.67vw,6rem)] h-[clamp(4.5rem,6.67vw,6rem)] bg-[#F2F4F6] border-2 border-dashed border-[#BDCABA] rounded-full flex flex-col items-center justify-center relative cursor-pointer hover:bg-[#EAECEE] transition-all group overflow-hidden shrink-0"
          >
            {uploadedPhoto ? (
              <img src={uploadedPhoto} className="w-full h-full object-cover" />
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#006B2C] mb-[clamp(0.125rem,0.28vw,0.25rem)]" />
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.55rem,0.76vw,0.6875rem)] text-[#006B2C] tracking-[0.55px]">
                  ADD PHOTO
                </span>
              </>
            )}
            
            {/* Camera icon badge */}
            <div className="absolute right-[-4px] bottom-[-4px] w-[clamp(1.25rem,1.94vw,1.75rem)] h-[clamp(1.25rem,1.94vw,1.75rem)] bg-[#006B2C] border-[clamp(3px,0.28vw,4px)] border-white rounded-full flex items-center justify-center text-white shadow-sm">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Form Inputs Container */}
        <div className="flex flex-col gap-[clamp(0.75rem,1.11vw,1rem)] mb-[clamp(1.25rem,2.22vw,2rem)] w-full">
          
          {/* Select Connection dropdown (Only for custom member) */}
          {editingMember === "custom" && (
            <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] w-full">
              <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D]">
                Select connection
              </label>
              <div className="relative w-full">
                <select
                  value={selectedConnection}
                  onChange={(e) => setSelectedConnection(e.target.value)}
                  className="w-full h-[clamp(2.5rem,3.61vw,3.25rem)] px-[clamp(0.75rem,1.11vw,1rem)] bg-[#F2F4F6] rounded-lg outline-none font-['Plus_Jakarta_Sans'] text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D] appearance-none border border-transparent focus:border-[#2D3409]/30"
                >
                  <option value="">Select a person</option>
                  <option value="owner">Owner (Ramu Bathini)</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="spouse">Spouse</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#3E4A3D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Select Relation dropdown (Only for custom member) */}
          {editingMember === "custom" && (
            <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] w-full">
              <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D]">
                Select Relation
              </label>
              <div className="relative w-full">
                <select
                  value={selectedRelation}
                  onChange={(e) => setSelectedRelation(e.target.value)}
                  className="w-full h-[clamp(2.5rem,3.61vw,3.25rem)] px-[clamp(0.75rem,1.11vw,1rem)] bg-[#F2F4F6] rounded-lg outline-none font-['Plus_Jakarta_Sans'] text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D] appearance-none border border-transparent focus:border-[#2D3409]/30"
                >
                  <option value="">Select a relation of the person</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="spouse">Spouse</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#3E4A3D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] w-full">
            <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D]">
              Full Name
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter legal name"
              className="w-full h-[clamp(2.5rem,3.61vw,3.25rem)] px-[clamp(0.75rem,1.11vw,1rem)] bg-[#F2F4F6] rounded-lg outline-none font-['Plus_Jakarta_Sans'] text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D] placeholder:text-[#6E7B6C]/50 border border-transparent focus:border-[#2D3409]/30"
              autoFocus
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] w-full">
            <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D]">
              Date of Birth
            </label>
            <div className="relative w-full">
              <input
                type="date"
                value={tempDob}
                onChange={(e) => setTempDob(e.target.value)}
                className="w-full h-[clamp(2.5rem,3.61vw,3.25rem)] px-[clamp(0.75rem,1.11vw,1rem)] bg-[#F2F4F6] rounded-lg outline-none font-['Plus_Jakarta_Sans'] text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D] border border-transparent focus:border-[#2D3409]/30"
              />
            </div>
          </div>

          {/* Date of Expiry (Conditional) */}
          {isExpired && (
            <div className="flex flex-col gap-[clamp(0.25rem,0.56vw,0.5rem)] w-full animate-in slide-in-from-top-2 duration-200">
              <label className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D]">
                Date of Expiry
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  value={tempExpiry}
                  onChange={(e) => setTempExpiry(e.target.value)}
                  className="w-full h-[clamp(2.5rem,3.61vw,3.25rem)] px-[clamp(0.75rem,1.11vw,1rem)] bg-[#F2F4F6] rounded-lg outline-none font-['Plus_Jakarta_Sans'] text-[clamp(0.85rem,1.11vw,1rem)] text-[#3E4A3D] border border-transparent focus:border-[#2D3409]/30"
                />
              </div>
            </div>
          )}

          {/* Expired toggle link */}
          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={() => setIsExpired(!isExpired)}
              className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] text-[rgba(0,0,0,0.66)] hover:underline"
            >
              {isExpired ? "Not expired?" : "Person expired?"}
            </button>
          </div>

        </div>

        {/* Buttons block */}
        <div className="flex flex-col items-center gap-[clamp(0.75rem,1.11vw,1rem)] w-full mt-auto">
          <button
            type="button"
            onClick={handleSaveMember}
            className="w-full h-[clamp(2.75rem,3.89vw,3.5rem)] flex items-center justify-center text-white font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.95rem,1.25vw,1.125rem)] rounded-[57px] hover:opacity-95 active:scale-95 transition-all shadow-lg cursor-pointer"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
            }}
          >
            Add details
          </button>
          
          <button
            type="button"
            onClick={() => setEditingMember(null)}
            className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.75rem,0.97vw,0.875rem)] text-[#3E4A3D] hover:opacity-75 tracking-wider uppercase"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
