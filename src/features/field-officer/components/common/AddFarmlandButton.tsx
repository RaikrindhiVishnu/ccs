import plusIcon from "../../../../assets/Vector.svg";

export default function AddFarmlandButton() {
  return (
    <button className="bg-[#96C9ED] h-[56px] 2xl:h-[75px] px-8 2xl:px-[42px] rounded-full flex items-center gap-3 2xl:gap-4 shadow-sm hover:scale-[1.02] transition-all group w-full md:w-auto justify-center md:justify-start shrink-0">
      <div className="w-9 h-9 2xl:w-[48px] 2xl:h-[48px] bg-[#D7EBF7] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-none">
        <img src={plusIcon} className="w-4 h-4 2xl:w-[21px] 2xl:h-[21px]" alt="+" />
      </div>

      <span className="font-bold text-black text-[18px] 2xl:text-[24px]">
        Add a farm land
      </span>
    </button>
  );
}
