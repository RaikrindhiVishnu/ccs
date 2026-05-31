import icons from "../../../../assets/dashboard/icons.png";

export default function SearchBar() {
  return (
    <div className="flex-1 bg-white h-[56px] 2xl:h-[75px] rounded-full px-6 2xl:px-[32px] flex items-center gap-3 2xl:gap-4 shadow-sm border border-transparent focus-within:border-[#96C9ED] transition-all w-full min-w-0">
      <img src={icons} className="w-5 h-5 2xl:w-[26px] 2xl:h-[26px] opacity-60 flex-none" style={{ objectPosition: '0% 0%', objectFit: 'cover' }} alt="search" />

      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-transparent outline-none text-[16px] 2xl:text-[21px] w-full min-w-0"
      />
    </div>
  );
}
