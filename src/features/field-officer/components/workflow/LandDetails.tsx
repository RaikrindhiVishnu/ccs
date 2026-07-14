import { useState } from "react";

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

export default function LandDetails({ onBack, onSubmit }: Props) {
  const [acquisition, setAcquisition] = useState<"self" | "ancestral">("ancestral");
  const [referrer, setReferrer] = useState<"default" | "other">("other");

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* ACQUISITION CATEGORY */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[17px] font-bold text-[#1F2937]">
          Please indicate the acquisition category for the land.
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAcquisition("self")}
            className={`
              px-6 py-3.5 rounded-full text-[15px] font-medium border transition-all cursor-pointer
              ${
                acquisition === "self"
                  ? "bg-[#1E293B] border-transparent text-white"
                  : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
              }
            `}
          >
            Self Purchase
          </button>
          <button
            onClick={() => setAcquisition("ancestral")}
            className={`
              px-6 py-3.5 rounded-full text-[15px] font-medium border transition-all cursor-pointer
              ${
                acquisition === "ancestral"
                  ? "bg-[#1E293B] border-transparent text-white"
                  : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
              }
            `}
          >
            Ancestral Property
          </button>
        </div>
      </div>

      {/* REFERRER SELECTION */}
      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-[17px] font-bold text-[#1F2937]">
          Please select the agent who referred the customer?
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setReferrer("default")}
            className={`
              px-6 py-3.5 rounded-full text-[15px] font-medium border transition-all cursor-pointer
              ${
                referrer === "default"
                  ? "bg-[#1E293B] border-transparent text-white"
                  : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
              }
            `}
          >
            Default Location
          </button>
          <button
            onClick={() => setReferrer("other")}
            className={`
              px-6 py-3.5 rounded-full text-[15px] font-medium border transition-all cursor-pointer
              ${
                referrer === "other"
                  ? "bg-[#1E293B] border-transparent text-white"
                  : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
              }
            `}
          >
            Agent from other Location
          </button>
        </div>
      </div>

      {/* DROPDOWN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* STATE */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            State
          </label>
          <select className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] font-medium focus:bg-white focus:border-[#96C9ED] appearance-none cursor-pointer">
            <option>Andhra Pradesh</option>
            <option>Telangana</option>
            <option>Karnataka</option>
          </select>
        </div>

        {/* DISTRICT */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            District
          </label>
          <select className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] font-medium focus:bg-white focus:border-[#96C9ED] appearance-none cursor-pointer">
            <option>West Godavari</option>
            <option>Krishna</option>
            <option>Guntur</option>
          </select>
        </div>

        {/* CITY/TOWN */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Area/City/Town
          </label>
          <select className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] font-medium focus:bg-white focus:border-[#96C9ED] appearance-none cursor-pointer">
            <option>Tanuku</option>
            <option>Bhimavaram</option>
            <option>Eluru</option>
          </select>
        </div>

        {/* AGENT */}
        <div className="flex flex-col gap-2 md:col-span-3">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Agent
          </label>
          <select className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] font-medium focus:bg-white focus:border-[#96C9ED] appearance-none cursor-pointer">
            <option>Agent Vinod</option>
            <option>Agent Ravi</option>
            <option>Agent Sridhar</option>
          </select>
        </div>

        {/* LAND CONVERSION */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Land Conversion
          </label>
          <select className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] font-medium focus:bg-white focus:border-[#96C9ED] appearance-none cursor-pointer">
            <option>Acres</option>
            <option>Square Yards</option>
            <option>Cents</option>
          </select>
        </div>

        {/* VALUE PER AREA */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#4B5563] uppercase tracking-wider">
            Value Per Area
          </label>
          <input
            type="text"
            defaultValue="1,00,000.00"
            className="w-full px-5 py-4 bg-[#F3F4F6] border border-transparent rounded-[20px] outline-none text-[#1F2937] text-[15px] focus:bg-white focus:border-[#96C9ED] transition-all"
          />
        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-6 mt-8">
        <button
          onClick={onBack}
          className="text-[#6B7280] hover:text-[#1F2937] font-semibold text-[16px] cursor-pointer"
        >
          BACK
        </button>
        <button
          onClick={onSubmit}
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
