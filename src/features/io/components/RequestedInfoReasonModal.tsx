import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/core/hooks";

interface RequestedInfoReasonModalProps {
  onClose: () => void;
  onUpload?: () => void;
  rejectedBy?: string;
}

export const RequestedInfoReasonModal: React.FC<RequestedInfoReasonModalProps> = ({
  onClose,
  onUpload,
  rejectedBy = "Verification Officer Sravan",
}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User Name"
    : "User Name";
  const initials = user
    ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    : "UN";

  React.useEffect(() => {
    const scrollableParents: { element: HTMLElement; originalOverflow: string; originalOverflowY: string }[] = [];
    
    // Disable body overflow
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverflowY = document.body.style.overflowY;
    document.body.style.setProperty("overflow", "hidden", "important");
    document.body.style.setProperty("overflow-y", "hidden", "important");
    scrollableParents.push({
      element: document.body,
      originalOverflow: originalBodyOverflow,
      originalOverflowY: originalBodyOverflowY,
    });

    // Traverse ancestors from modal root to disable any inner container scrollbars
    const modalRoot = document.getElementById("requested-info-modal-root");
    let parent = modalRoot?.parentElement;
    
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflow = style.overflow + style.overflowY;
      if (overflow.includes("auto") || overflow.includes("scroll")) {
        const origOverflow = parent.style.overflow;
        const origOverflowY = parent.style.overflowY;
        
        parent.style.setProperty("overflow", "hidden", "important");
        parent.style.setProperty("overflow-y", "hidden", "important");
        
        scrollableParents.push({
          element: parent,
          originalOverflow: origOverflow,
          originalOverflowY: origOverflowY,
        });
      }
      parent = parent.parentElement;
    }
    
    // Restore layout scroll state on unmount
    return () => {
      scrollableParents.forEach(({ element, originalOverflow, originalOverflowY }) => {
        if (originalOverflow) {
          element.style.setProperty("overflow", originalOverflow);
        } else {
          element.style.removeProperty("overflow");
        }
        if (originalOverflowY) {
          element.style.setProperty("overflow-y", originalOverflowY);
        } else {
          element.style.removeProperty("overflow-y");
        }
      });
    };
  }, []);

  return (
    <div
      id="requested-info-modal-root"
      className="
        fixed inset-0 z-50
        bg-[#F9F9F9]
        animate-in fade-in duration-200
        w-full h-full
        overflow-y-auto
        font-[family-name:var(--font-sans)]
      "
      onClick={onClose}
    >
      <div
        className="
          relative w-full min-h-full max-w-[1920px] mx-auto
          flex flex-col items-center justify-start
          p-[clamp(1.5rem,4vw,3.5rem)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row containing Actions (Bell + Avatar) */}
        <div 
          className="
            w-full flex justify-end items-center 
            gap-[clamp(10px,0.9vw,18px)]
            mb-[clamp(1.5rem,4vh,4.5rem)]
            shrink-0
          "
        >
          {/* Bell */}
          <button
            className="
              relative
              flex items-center justify-center
              w-[clamp(44px,3.61vw,69px)] h-[clamp(44px,3.61vw,69px)]
              bg-white rounded-full
              shadow-[0px_4px_10px_rgba(0,0,0,0.04)]
              hover:opacity-90 transition-opacity
              cursor-pointer
            "
            aria-label="Notifications"
          >
            <Bell className="w-[clamp(20px,1.67vw,32px)] h-[clamp(20px,1.67vw,32px)] text-[#2C2C2C]" strokeWidth={1.5} />
            <span className="absolute top-[23%] right-[23%] w-[clamp(4px,0.35vw,7px)] h-[clamp(4px,0.35vw,7px)] bg-[#EF4646] rounded-full" />
          </button>

          {/* Avatar */}
          <button
            onClick={() => {
              onClose();
              navigate("/io/profile");
            }}
            title="Profile"
            className="
              relative overflow-hidden
              flex items-center justify-center
              w-[clamp(44px,3.61vw,69px)] h-[clamp(44px,3.61vw,69px)]
              bg-white rounded-full
              shadow-[0px_4px_10px_rgba(0,0,0,0.04)]
              hover:opacity-90 transition-opacity
              cursor-pointer
            "
          >
            {(user as any)?.avatarUrl ? (
              <img
                src={(user as any).avatarUrl}
                alt={fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="font-bold text-[#191B1C] text-[clamp(13px,1.04vw,20px)]">
                {initials}
              </span>
            )}
          </button>
        </div>

        {/* Main Centered Rejection Reason Card */}
        <div
          className="
            relative
            bg-white
            rounded-[clamp(1.5rem,2.78vw,3.5rem)]
            p-[clamp(1.25rem,2.78vw,3.5rem)]
            w-full max-w-[clamp(600px,62.5vw,1200px)]
            shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
            flex flex-col
            my-auto
            animate-in zoom-in-95 duration-200
          "
        >
          {/* Header Section */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="font-bold text-[clamp(20px,1.667vw,32px)] leading-[1.3] text-[#111827]">
              Returning Reason
            </h2>
            <div className="text-[clamp(12px,0.972vw,19px)] leading-[1.4] font-medium text-[#6B7280]">
              Returned by: <span className="font-semibold">{rejectedBy}</span>
            </div>
          </div>

          {/* Missing Information Section */}
          <div className="mt-8 flex flex-col gap-4 flex-1">
            <span className="text-[clamp(10px,0.833vw,16px)] font-bold tracking-[0.6px] text-[#9CA3AF] uppercase">
              Missing Information
            </span>

            {/* Horizontal Cards Container - Wrap on smaller viewports */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(12px,1.14vw,22px)] w-full">
              {/* Card 1: Local Liabilities */}
              <div
                className="
                  flex flex-col items-start p-[clamp(16px,1.667vw,32px)] gap-4
                  bg-[#F9FAFB] border border-[#F3F4F6]
                  rounded-[24px] min-h-[clamp(220px,18.28vw,350px)]
                "
              >
                {/* Badge */}
                <div className="inline-flex justify-center items-center px-4 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full">
                  <span className="text-[clamp(9px,0.764vw,15px)] font-bold text-[#2D82C4] whitespace-nowrap">
                    Local Intelligence &gt; Local Liabilities
                  </span>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2 text-[clamp(12px,0.972vw,19px)] leading-[clamp(18px,1.597vw,31px)] text-[#4B5563]">
                  <p>
                    The documentation provided does not adequately cover potential local liabilities or outstanding encumbrances.
                  </p>
                  <p>
                    Please upload the missing certificates from the local municipal office.
                  </p>
                </div>
              </div>

              {/* Card 2: Pending Loans */}
              <div
                className="
                  flex flex-col items-start p-[clamp(16px,1.667vw,32px)] gap-4
                  bg-[#F9FAFB] border border-[#F3F4F6]
                  rounded-[24px] min-h-[clamp(220px,18.28vw,350px)]
                "
              >
                {/* Badge */}
                <div className="inline-flex justify-center items-center px-4 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full">
                  <span className="text-[clamp(9px,0.764vw,15px)] font-bold text-[#2D82C4] whitespace-nowrap">
                    Local Intelligence &gt; Pending Loans
                  </span>
                </div>
                {/* Content */}
                <div className="text-[clamp(12px,0.972vw,19px)] leading-[clamp(18px,1.597vw,31px)] text-[#4B5563]">
                  <p>
                    The verification team requires an updated clearance certificate from the primary lender to rule out any active liens on the property.
                  </p>
                </div>
              </div>

              {/* Card 3: Source Person */}
              <div
                className="
                  flex flex-col items-start p-[clamp(16px,1.667vw,32px)] gap-4
                  bg-[#F9FAFB] border border-[#F3F4F6]
                  rounded-[24px] min-h-[clamp(220px,18.28vw,350px)]
                  md:col-span-2 xl:col-span-1
                "
              >
                {/* Badge */}
                <div className="inline-flex justify-center items-center px-4 py-1.5 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full">
                  <span className="text-[clamp(9px,0.764vw,15px)] font-bold text-[#2D82C4] whitespace-nowrap">
                    Local Intelligence &gt; Source Person
                  </span>
                </div>
                {/* Content */}
                <div className="text-[clamp(12px,0.972vw,19px)] leading-[clamp(18px,1.597vw,31px)] text-[#4B5563]">
                  <p>
                    The identity verification for the source person is incomplete. Please provide a clear, high-resolution scan of their official government-issued ID.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-end items-center gap-4 w-full">
            <button
              onClick={onClose}
              className="
                flex justify-center items-center
                w-[clamp(110px,9.23vw,178px)] h-[clamp(38px,2.92vw,56px)]
                bg-white border border-[#2D82C4] rounded-full
                font-bold text-[clamp(12px,0.972vw,18px)] text-[#2D82C4]
                hover:bg-slate-50 transition-all active:scale-[0.98]
                cursor-pointer
              "
            >
              Back
            </button>
            {onUpload && (
              <button
                onClick={onUpload}
                className="
                  flex justify-center items-center
                  w-[clamp(120px,10.13vw,195px)] h-[clamp(38px,2.92vw,56px)]
                  bg-[#2D82C4] rounded-full
                  font-bold text-[clamp(12px,0.972vw,18px)] text-white
                  hover:bg-[#1f6da9] transition-all active:scale-[0.98]
                  cursor-pointer
                "
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
