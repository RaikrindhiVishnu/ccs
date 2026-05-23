

interface Props {
  onNext: () => void;
  onDismiss: () => void;
}

export default function OwnerDetails({ onNext, onDismiss }: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* OWNER PROFILE */}
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
          alt="Ramudu Kumar"
        />
        <div>
          <h2 className="text-[20px] font-semibold text-[#1F2937]">Ramudu Kumar</h2>
          <p className="text-[14px] text-[#9CA3AF]">Land Owner</p>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        
        {/* FIRST NAME */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            First Name
          </label>
          <input
            type="text"
            defaultValue="Ramudu"
            className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
          />
        </div>

        {/* LAST NAME */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Last Name
          </label>
          <input
            type="text"
            defaultValue="Kumar"
            className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Phone Number
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[15px]">📞</span>
            <input
              type="text"
              defaultValue="+91-9123456789"
              className="w-full pl-12 pr-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[15px]">✉️</span>
            <input
              type="email"
              defaultValue="ramudu@gmail.com"
              className="w-full pl-12 pr-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
            />
          </div>
        </div>

        {/* DATE OF BIRTH */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Date of Birth
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[15px]">📅</span>
            <input
              type="text"
              defaultValue="13/01/1986"
              className="w-full pl-12 pr-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
            />
          </div>
        </div>

        {/* RELIGION */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Religion
          </label>
          <input
            type="text"
            defaultValue="Hindu"
            className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
          />
        </div>

        {/* GENDER */}
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Gender
          </label>
          <input
            type="text"
            defaultValue="Male"
            className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
          />
        </div>

      </div>

      {/* GOOGLE LOCATION LINK */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-[15px] font-semibold text-[#374151]">Google Location of Land</span>
        <a 
          href="https://maps.google.com/?q=17.4835850,78.3805050" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#3B82F6] hover:underline font-medium text-[15px]"
        >
          17.4835850, 78.3805050
        </a>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-6 mt-8">
        <button
          onClick={onDismiss}
          className="text-[#6B7280] hover:text-[#1F2937] font-semibold text-[16px] cursor-pointer"
        >
          DISMISS
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
          CREATE
        </button>
      </div>

    </div>
  );
}
