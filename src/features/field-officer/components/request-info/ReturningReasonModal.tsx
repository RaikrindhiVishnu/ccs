type Props = {
  onClose: () => void;
  returnedBy?: string;
  reason?: string;
};

const ReturningReasonModal = ({ 
  onClose, 
  returnedBy = "Verification Officer Sravan",
  reason = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-[32px] 2xl:rounded-[42px] p-8 2xl:p-12 w-[90%] max-w-[620px] 2xl:max-w-[820px] shadow-2xl transform scale-100 transition-all duration-300">
        
        {/* Title */}
        <h2 className="text-[28px] 2xl:text-[37px] font-bold text-[#1A1C1D] leading-tight font-plus-jakarta">
          Returning Reason
        </h2>

        {/* Subtitle */}
        <p className="mt-4 2xl:mt-6 text-[#3D4949] text-[15px] 2xl:text-[20px] font-medium font-plus-jakarta">
          Returned by: <span className="font-bold text-[#1A1C1D]">{returnedBy}</span>
        </p>

        {/* Reason Box */}
        <div className="border border-[#E2E2E4] bg-[#F8F9FA] rounded-[24px] 2xl:rounded-[32px] p-6 2xl:p-8 mt-5 2xl:mt-7">
          <p className="text-[#3D4949] text-[15px] 2xl:text-[20px] leading-relaxed font-normal font-plus-jakarta">
            {reason}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-8 2xl:mt-10">
          <button
            onClick={onClose}
            className="
              bg-[#96C9ED] 
              hover:bg-[#82bde7] 
              text-black 
              text-[14px] 
              2xl:text-[18px] 
              font-bold 
              px-10 py-3.5 
              2xl:px-14 2xl:py-4.5
              rounded-full 
              shadow-sm
              hover:shadow-md
              transition-all 
              duration-300
              uppercase
              cursor-pointer
            "
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReturningReasonModal;
