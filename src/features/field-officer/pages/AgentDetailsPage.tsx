import { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import avatars from "../../../assets/dashboard/avatars.png";
import {
  AGENTS_DETAILS_DATA,
  DEFAULT_AGENT_DATA,
  FARMLAND_REPORT_DATA,
  SALES_REPORT_DATA,
} from "../data/agentDetailsData";

const AgentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("farmland");

  // Find agent or use default
  const agent = (id && AGENTS_DETAILS_DATA[id.toLowerCase()]) || DEFAULT_AGENT_DATA;

  return (
    <div className="min-h-screen bg-[#F3F3F3] py-8">
      <div
        className="
          w-[92%]
          2xl:w-[88%]
          mx-auto
          flex
          flex-col
          gap-8
        "
      >
        
        {/* BACK BUTTON */}
        <div className="w-full">
          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
              bg-white
              border border-[#E5E7EB]
              rounded-full
              px-6 py-3
              shadow-sm
              text-[#4B5563]
              text-[15px]
              font-medium
              cursor-pointer
              hover:bg-gray-50
              transition-colors
            "
          >
            <ArrowLeft size={18} />
            Go back to dashboard
          </button>
        </div>

        {/* TOP CARD */}
        <div
          className="
            w-full
            bg-white
            rounded-[46px]
            min-h-[560px]
            px-12
            2xl:px-20
            py-14
            shadow-sm
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-[180px]
              2xl:gap-[240px]
              w-full
              max-w-[1300px]
              mx-auto
            "
          >
            
            {/* LEFT STATS */}
            <div className="flex flex-col gap-12">
              <div>
                <h2 className="text-[58px] font-semibold leading-none text-[#4B5563]">
                  {agent.pendingReview}
                </h2>
                <p className="mt-2 text-[14px] font-medium text-[#9CA3AF] uppercase tracking-wide">
                  Pending Review
                </p>
              </div>

              <div>
                <h2 className="text-[58px] font-semibold leading-none text-[#4B5563]">
                  {agent.rejectedDeals}
                </h2>
                <p className="mt-2 text-[14px] font-medium text-[#9CA3AF] uppercase tracking-wide">
                  Rejected Deals
                </p>
              </div>
            </div>

            {/* CENTER PROFILE */}
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gray-150">
                <img
                  src={avatars}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: `${(agent.faceIdx % 2) * 100}% ${Math.floor(agent.faceIdx / 2) * 50}%`,
                    transform: "scale(1.15)" 
                  }}
                />
              </div>

              <h2 className="mt-5 text-[34px] font-semibold text-[#4B5563]">
                {agent.name}
              </h2>

              <p className="text-[18px] text-[#9CA3AF]">
                {agent.role}
              </p>

              <div
                className="
                  mt-4
                  rounded-full
                  bg-[#F3F4F6]
                  px-4 py-2
                  text-[14px]
                  text-[#6B7280]
                "
              >
                ✨ Performance index {agent.performanceIndex}
              </div>

              <div className="mt-10 text-center">
                <h1 className="text-[96px] leading-none font-semibold text-[#4B5563]">
                  {agent.completedDeals}
                </h1>

                <p className="mt-2 text-[18px] font-medium text-[#9CA3AF] uppercase">
                  Completed Deals
                </p>

                <p className="mt-3 text-[15px] font-semibold text-[#22C55E]">
                  ↗ {agent.growth} growth
                </p>
              </div>
            </div>

            {/* RIGHT METRICS */}
            <div className="w-[320px] flex flex-col gap-10">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] text-[#9CA3AF]">
                    Close Ratio
                  </p>

                  <p className="text-[14px] font-semibold text-[#4B5563]">
                    {agent.closeRatio}% ↗
                  </p>
                </div>

                <div className="h-[6px] rounded-full bg-[#E5E7EB]">
                  <div 
                    className="h-full rounded-full bg-[#4EA5FF]" 
                    style={{ width: `${agent.closeRatio}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] text-[#9CA3AF]">
                    Avg Response
                  </p>

                  <p className="text-[14px] font-semibold text-[#4B5563]">
                    {agent.avgResponse} →
                  </p>
                </div>

                <div className="h-[6px] rounded-full bg-[#E5E7EB]">
                  <div className="w-[70%] h-full rounded-full bg-[#4EA5FF]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] text-[#9CA3AF]">
                    Quarter Perf
                  </p>

                  <p className="text-[14px] font-semibold text-[#4B5563]">
                    {agent.quarterPerf} ↗
                  </p>
                </div>

                <div className="h-[6px] rounded-full bg-[#E5E7EB]">
                  <div className="w-[60%] h-full rounded-full bg-[#4EA5FF]" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TAB + EXPORT */}
        <div className="w-full mt-8 flex items-center justify-between">
          
          <div className="flex items-center bg-white rounded-full p-2 w-fit shadow-sm">
            <button
              onClick={() => setActiveTab("farmland")}
              className={`
                px-6 py-2 rounded-full text-[14px] font-medium transition-all cursor-pointer
                ${
                  activeTab === "farmland"
                    ? "bg-[#77C3FF] text-white"
                    : "text-[#6B7280]"
                }
              `}
            >
              Farmland report
            </button>

            <button
              onClick={() => setActiveTab("sales")}
              className={`
                px-6 py-2 rounded-full text-[14px] font-medium transition-all cursor-pointer
                ${
                  activeTab === "sales"
                    ? "bg-[#77C3FF] text-white"
                    : "text-[#6B7280]"
                }
              `}
            >
              Sales report
            </button>
          </div>

          <button
            className="
              flex items-center gap-2
              border border-[#77C3FF]
              text-[#77C3FF]
              px-5 py-2
              rounded-full
              text-[14px]
              font-medium
              bg-white
              cursor-pointer
              hover:bg-blue-50/50
              transition-colors
            "
          >
            Export CSV
            <Download size={16} />
          </button>
        </div>

        {/* TABLE */}
        <div
          className="
            w-full
            mt-8
            bg-white
            rounded-[46px]
            px-10
            py-10
            shadow-sm
            overflow-hidden
            flex
            flex-col
            justify-between
          "
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F3F4F6]">
                <th className="text-left py-5 text-[#9CA3AF] text-[14px] font-medium">
                  Farmland ID
                </th>

                <th className="text-left py-5 text-[#9CA3AF] text-[14px] font-medium">
                  Date
                </th>

                <th className="text-left py-5 text-[#9CA3AF] text-[14px] font-medium">
                  Position
                </th>

                <th className="text-left py-5 text-[#9CA3AF] text-[14px] font-medium">
                  Land Value
                </th>

                <th className="text-left py-5 text-[#9CA3AF] text-[14px] font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {(activeTab === "farmland" ? FARMLAND_REPORT_DATA : SALES_REPORT_DATA).map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#F9FAFB]"
                >
                  <td className="py-7 text-[15px] text-[#4B5563] font-medium">
                    {item.id}
                  </td>

                  <td className="py-7 text-[15px] text-[#6B7280]">
                    {item.date}
                  </td>

                  <td className="py-7 text-[15px] text-[#6B7280]">
                    {item.position}
                  </td>

                  <td className="py-7 text-[15px] text-[#6B7280]">
                    {item.value}
                  </td>

                  <td
                    className={`
                      py-7 text-[15px] font-medium
                      ${
                        item.status === "Cleared"
                          ? "text-[#22C55E]"
                          : item.status === "Rejected"
                          ? "text-[#EF4444]"
                          : "text-[#F59E0B]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {item.status === "Cleared" && (
                        <span className="text-[#22C55E]">✓</span>
                      )}
                      {item.status === "Processing" && (
                        <span className="text-[#F59E0B]">◌</span>
                      )}
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AgentDetailsPage;
