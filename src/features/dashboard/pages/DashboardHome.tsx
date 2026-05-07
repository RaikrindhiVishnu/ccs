import avatars from "../../../assets/dashboard/avatars.png";
import icons from "../../../assets/dashboard/icons.png";
import plusIcon from "../../../assets/Vector.svg";
import ellipseBg from "../../../assets/Ellipse 1.svg";

const STAT_CARDS = [
  {
    title: "Total Farmlands",
    subtitle: "Total Properties",
    value: "1176",
    bgColor: "#BBDBF0",
    shapeOpacity: "rgba(217, 217, 217, 0.5)",
  },
  {
    title: "Approved Farmlands",
    subtitle: "Properties Live",
    value: "1036",
    bgColor: "#DFF5E5",
    shapeOpacity: "rgba(217, 217, 217, 0.5)",
  },
  {
    title: "Rejected",
    subtitle: "Total Properties Rejected",
    value: "1076",
    bgColor: "#E2E3EB",
    shapeOpacity: "rgba(217, 217, 217, 0.5)",
  },
];

const TOP_PERFORMERS = [
  { rank: 1, name: "Ananthu", role: "Senior Associate", deals: 120, color: "bg-[#D7EBF7]" },
  { rank: 2, name: "Yakoob", role: "Senior Associate", deals: 107, color: "bg-[#D7EBF7]" },
];

const TABLE_DATA = [
  { agent: "Ram", id: "ALERT_01", time: "6th Oct - 12.53 PM", amount: "25 lacs", status: "Pending", statusColor: "bg-[#FEF3C7] text-[#92400E]", farmId: "GLCSOS 01", pubTime: "NA", faceIdx: 0 },
  { agent: "Krishna", id: "ALERT_02", time: "6th Oct - 12.53 PM", amount: "20 lacs", status: "Completed", statusColor: "bg-[#DFF5E5] text-[#00696B]", farmId: "GLCSOS 01", pubTime: "1st Oct - 04.13 PM", faceIdx: 1 },
  { agent: "Kishore", id: "ALERT_03", time: "6th Oct - 12.53 PM", amount: "30 lacs", status: "Dismissed", statusColor: "bg-[#FEE2E2] text-[#991B1B]", farmId: "GLCSOS 02", pubTime: "NA", faceIdx: 2 },
  { agent: "Pallav", id: "ALERT_04", time: "6th Oct - 12.53 PM", amount: "22 lacs", status: "Pending", statusColor: "bg-[#FEF3C7] text-[#92400E]", farmId: "GLCSOS 02", pubTime: "NA", faceIdx: 3 },
  { agent: "Srikanth", id: "ALERT_05", time: "6th Oct - 12.53 PM", amount: "36 lacs", status: "Completed", statusColor: "bg-[#DFF5E5] text-[#00696B]", farmId: "GLCSOS 03", pubTime: "1st Oct - 04.13 PM", faceIdx: 4 },
];

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-[clamp(1rem,3vh,2rem)] pb-10 w-full px-4">
      {/* Top Section: Stats and Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-stretch">
        {/* Left: Stats Cards - Adaptive Grid */}
        <div className="xl:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
          {STAT_CARDS.map((card, idx) => (
            <div key={idx} className="group relative w-full aspect-[234/257] transition-transform hover:scale-[1.02] duration-300">
              {/* Shape Construction - Perfect Figma Bending */}
              <div className="absolute inset-0 overflow-hidden rounded-[12.8%]">
                <div 
                  className="absolute left-0 top-0 w-[69.23%] h-full rounded-[12.8%_0_12.8%_12.8%]" 
                  style={{ backgroundColor: card.bgColor }}
                ></div>
                <div 
                  className="absolute right-0 top-0 w-[30.77%] h-[72.37%] rounded-[0_12.8%_12.8%_0]" 
                  style={{ backgroundColor: card.bgColor }}
                ></div>
                <div className="absolute left-[69.23%] top-[72.37%] w-[12.8%] aspect-square">
                   <div 
                    className="absolute top-0 left-0 w-full h-full rounded-tl-full"
                    style={{ boxShadow: `-30px -30px 0 30px ${card.bgColor}` }}
                   ></div>
                </div>
              </div>

              {/* Text - Scalable */}
              <div className="absolute left-[8%] top-[10%] right-[8%] z-10">
                <h3 className="text-[clamp(1rem,1.4vw,1.25rem)] font-bold text-black leading-tight font-sans truncate">{card.title}</h3>
                <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-normal text-black mt-1 opacity-80 truncate">{card.subtitle}</p>
              </div>

              <div className="absolute left-[8%] bottom-[20%] z-10">
                <span className="text-[clamp(1.5rem,2.8vw,2.375rem)] font-normal text-black leading-none font-inter">{card.value}</span>
              </div>

              {/* Icon - Scalable */}
              <div className="absolute right-[6%] bottom-[6%] w-[22%] aspect-square flex items-center justify-center z-20">
                <img src={ellipseBg} className="w-full h-full" alt="" />
                <div className="absolute w-[48%] h-[48%] border-[max(1px,0.15vw)] border-white rounded-full flex flex-col items-center justify-center gap-[5%]">
                  <div className="w-[12%] h-[12%] bg-white rounded-full"></div>
                  <div className="w-[8%] h-[35%] bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Performance Report */}
        <div className="xl:col-span-4 bg-white rounded-[24px] shadow-sm flex flex-col overflow-hidden min-h-[341px]">
          <div className="flex justify-between items-end px-[clamp(1rem,3vw,2.5rem)] pt-[clamp(1.5rem,4vh,2.5rem)] pb-[clamp(1rem,3vh,2rem)]">
            <div className="flex flex-col">
              <p className="text-[#00696B] font-manrope font-semibold text-[clamp(0.65rem,0.8vw,0.75rem)] tracking-[0.7px] uppercase">Performance report</p>
              <h2 className="text-[#1A1C1D] font-plus-jakarta font-semibold text-[clamp(1.25rem,1.8vw,1.5rem)]">Top Performers</h2>
            </div>
            <div className="flex items-center gap-2 px-[clamp(0.5rem,1vw,1rem)] py-2 border border-black/10 rounded-full h-[38px]">
              <span className="text-[#3D4949] font-inter font-medium text-[clamp(0.75rem,1vw,0.875rem)] whitespace-nowrap">January</span>
              <img src={icons} className="w-4 h-4 opacity-60" style={{ objectPosition: '100% 100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div className="flex flex-col gap-[clamp(0.5rem,1.5vh,1.25rem)] px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
            {TOP_PERFORMERS.map((person, idx) => (
              <div key={idx} className="bg-[#F9F9FB] rounded-[16px] p-[clamp(0.75rem,1.5vw,1.25rem)] flex items-center h-[90px]">
                <div className="w-10 h-10 bg-[#D7EBF7] rounded-full flex items-center justify-center flex-none mr-4">
                  <span className="font-manrope font-bold text-black">{person.rank}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-manrope font-bold text-[clamp(1rem,1.2vw,1.125rem)] truncate">{person.name}</h4>
                  <p className="font-inter text-[clamp(0.75rem,1vw,0.875rem)] text-[#3D4949] truncate">{person.role}</p>
                </div>
                <div className="text-right flex-none">
                  <div className="font-manrope font-bold text-[clamp(1.25rem,1.8vw,1.5rem)] leading-none">{person.deals}</div>
                  <div className="font-inter text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#3D4949] uppercase tracking-wider mt-1">Deals</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Search & Action */}
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="flex-1 md:max-w-[443px] bg-white h-[52px] rounded-full px-6 flex items-center gap-3 shadow-sm border border-transparent focus-within:border-[#96C9ED] transition-all w-full">
          <img src={icons} className="w-5 h-5 opacity-60 flex-none" style={{ objectPosition: '0% 0%', objectFit: 'cover' }} />
          <input type="text" placeholder="Search..." className="flex-1 bg-transparent outline-none text-[16px]" />
        </div>
        <button className="bg-[#96C9ED] h-[56px] px-8 rounded-full flex items-center gap-3 shadow-sm hover:scale-[1.02] transition-all group w-full md:w-auto justify-center md:justify-start">
          <div className="w-9 h-9 bg-[#D7EBF7] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-none">
            <img src={plusIcon} className="w-4 h-4" alt="+" />
          </div>
          <span className="font-bold text-black text-[18px]">Add a farm land</span>
        </button>
      </div>

      {/* Bottom: Table */}
      <div className="bg-white shadow-[0px_20px_40px_rgba(0,105,107,0.06)] w-full overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[rgba(243,243,245,0.5)] h-[60px]">
                {["Agent Name", "Alert ID", "Created Time", "Amount", "Project Status", "Farmland ID", "Published Time", "Actions"].map((head, i) => (
                  <th key={i} className="px-8 text-[12px] font-bold text-[#3D4949] uppercase tracking-[0.7px] font-plus-jakarta">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E2E4]/30">
              {TABLE_DATA.map((row, idx) => (
                <tr key={idx} className="h-[88.5px] hover:bg-gray-50 transition-colors">
                  <td className="px-8"><div className="flex items-center gap-3">
                    <img src={avatars} className="w-10 h-10 rounded-full object-cover" style={{ objectPosition: `${(row.faceIdx % 2) * 100}% ${Math.floor(row.faceIdx / 2) * 50}%` }} />
                    <span className="font-bold text-[#1A1C1D]">{row.agent}</span>
                  </div></td>
                  <td className="px-8 text-[#3D4949]">{row.id}</td>
                  <td className="px-8 text-[#3D4949]">{row.time}</td>
                  <td className="px-8 font-bold text-[#1A1C1D]">{row.amount}</td>
                  <td className="px-8"><span className={`${row.statusColor} px-3 py-1 rounded-full text-[12px] font-bold`}>{row.status}</span></td>
                  <td className="px-8 text-[#3D4949] font-medium">{row.farmId}</td>
                  <td className="px-8 text-[#3D4949]">{row.pubTime}</td>
                  <td className="px-8"><button className="bg-[#96C9ED] text-black text-[12px] font-bold px-4 py-1.5 rounded-full hover:brightness-90 transition-all uppercase">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-[65px] flex items-center justify-center border-t border-gray-100 bg-white">
          <button className="text-[18px] font-bold hover:opacity-70 transition-opacity">View More</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
