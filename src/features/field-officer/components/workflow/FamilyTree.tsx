

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function FamilyTree({ onBack, onNext }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      
      {/* TREE DIAGRAM CONTAINER */}
      <div className="w-full flex flex-col items-center relative min-h-[420px] mt-6">
        
        {/* OWNER (TOP LEVEL) */}
        <div className="relative z-10">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 shadow-sm w-[260px] flex flex-col items-center text-center">
            <span className="bg-[#F59E0B] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-3">
              OWNER
            </span>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
              className="w-16 h-16 rounded-full object-cover border border-white shadow-md mb-3"
              alt="Arjun Mehta"
            />
            <h3 className="text-[18px] font-bold text-[#1F2937]">Arjun Mehta</h3>
            <p className="text-[14px] text-[#4B5563] font-medium">Male, 42 yrs</p>
          </div>
        </div>

        {/* CONNECTOR SVGS */}
        <div className="w-full h-16 relative">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Vertical stem from owner */}
            <line x1="50%" y1="0" x2="50%" y2="50%" stroke="#D1D5DB" strokeWidth="2" />
            {/* Horizontal line bridging Father, Spouse, Mother */}
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#D1D5DB" strokeWidth="2" />
            {/* Vertical drop down to Father */}
            <line x1="20%" y1="50%" x2="20%" y2="100%" stroke="#D1D5DB" strokeWidth="2" />
            {/* Vertical drop down to Spouse */}
            <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="#D1D5DB" strokeWidth="2" />
            {/* Vertical drop down to Mother */}
            <line x1="80%" y1="50%" x2="80%" y2="100%" stroke="#D1D5DB" strokeWidth="2" />
          </svg>
        </div>

        {/* SECOND LEVEL: FATHER, SPOUSE, MOTHER */}
        <div className="w-full grid grid-cols-3 gap-4 relative z-10">
          
          {/* FATHER */}
          <div className="flex flex-col items-center">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm w-[200px] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                className="w-11 h-11 rounded-full object-cover border"
                alt="Vikram Mehta"
              />
              <div className="text-left">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider block">FATHER</span>
                <h4 className="text-[15px] font-bold text-[#1F2937]">Vikram Mehta</h4>
                <p className="text-[12px] text-[#6B7280]">Male, 72 yrs</p>
              </div>
            </div>
          </div>

          {/* SPOUSE */}
          <div className="flex flex-col items-center relative">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm w-[200px] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                className="w-11 h-11 rounded-full object-cover border"
                alt="Priya Mehta"
              />
              <div className="text-left">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider block">SPOUSE</span>
                <h4 className="text-[15px] font-bold text-[#1F2937]">Priya Mehta</h4>
                <p className="text-[12px] text-[#6B7280]">Female, 40 yrs</p>
              </div>
            </div>

            {/* Downward line to Daughter */}
            <div className="w-full h-12 relative">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D1D5DB" strokeWidth="2" />
              </svg>
            </div>

            {/* DAUGHTER (SUB-LEVEL) */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm w-[200px] flex items-center gap-3 z-10">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                className="w-11 h-11 rounded-full object-cover border"
                alt="Ananya Mehta"
              />
              <div className="text-left">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider block">DAUGHTER</span>
                <h4 className="text-[15px] font-bold text-[#1F2937]">Ananya Mehta</h4>
                <p className="text-[12px] text-[#6B7280]">Female, 12 yrs</p>
              </div>
            </div>
          </div>

          {/* MOTHER */}
          <div className="flex flex-col items-center">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm w-[200px] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80"
                className="w-11 h-11 rounded-full object-cover border"
                alt="Sushila Mehta"
              />
              <div className="text-left">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider block">MOTHER</span>
                <h4 className="text-[15px] font-bold text-[#1F2937]">Sushila Mehta</h4>
                <p className="text-[12px] text-[#6B7280]">Female, 68 yrs</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="w-full flex items-center justify-end gap-6 mt-8">
        <button
          onClick={onBack}
          className="text-[#6B7280] hover:text-[#1F2937] font-semibold text-[16px] cursor-pointer"
        >
          BACK
        </button>
        <button
          onClick={onNext}
          className="
            bg-[#8DCCFF]
            hover:bg-[#72beff]
            px-12 py-3.5
            rounded-full
            text-white
            font-bold
            shadow-sm
            transition-all
            cursor-pointer
          "
        >
          NEXT
        </button>
      </div>

    </div>
  );
}
