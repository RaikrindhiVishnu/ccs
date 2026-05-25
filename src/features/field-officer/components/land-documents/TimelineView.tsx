import { useState } from "react";
import pdfIcon from "../../../../assets/farmlandalert.svg"; // Fallback icon or we can render a beautiful SVG PDF icon

type TimelineItem = {
  id: number;
  date: string;
  time: string;
  comment: string;
  files: string[];
  updatedBy: string;
  issueBy?: string;
  issueComment?: string;
};

type Props = {
  timeline: TimelineItem[];
  onEditClick: (item: TimelineItem) => void;
};

const TimelineView = ({ timeline, onEditClick }: Props) => {
  const [activeView, setActiveView] = useState<"timeline" | "file">("timeline");

  return (
    <div className="w-full">
      {/* Top Header Toggle */}
      <div className="flex justify-between items-center mb-8 2xl:mb-11">
        <h3 className="text-[20px] 2xl:text-[26px] font-bold text-[#1A1C1D] font-plus-jakarta">
          Document History
        </h3>

        <div className="flex gap-3 2xl:gap-4.5 bg-gray-100/60 p-1.5 rounded-full">
          <button
            onClick={() => setActiveView("timeline")}
            className={`
              px-6 py-2.5 2xl:px-8 2xl:py-3.5 rounded-full text-[14px] 2xl:text-[18px] font-bold font-plus-jakarta transition-all cursor-pointer
              ${
                activeView === "timeline"
                  ? "bg-black text-white shadow-sm"
                  : "text-[#3D4949] hover:bg-gray-200/50"
              }
            `}
          >
            Timeline
          </button>
          
          <button
            onClick={() => setActiveView("file")}
            className={`
              px-6 py-2.5 2xl:px-8 2xl:py-3.5 rounded-full text-[14px] 2xl:text-[18px] font-bold font-plus-jakarta transition-all cursor-pointer
              ${
                activeView === "file"
                  ? "bg-black text-white shadow-sm"
                  : "text-[#3D4949] hover:bg-gray-200/50"
              }
            `}
          >
            File View
          </button>
        </div>
      </div>

      {activeView === "timeline" ? (
        <div className="relative pl-24 md:pl-32 2xl:pl-44 space-y-12 2xl:space-y-16">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[36px] md:left-[44px] 2xl:left-[60px] top-4 bottom-4 w-[2px] bg-[#E9E7FD]" />

          {timeline.map((item) => (
            <div key={item.id} className="relative">
              
              {/* Timeline Marker (Dot and Timestamp) */}
              <div className="absolute -left-[96px] md:-left-[128px] 2xl:-left-[176px] top-1.5 flex items-center justify-between w-[96px] md:w-[128px] 2xl:w-[176px] pr-6 md:pr-8 2xl:pr-12">
                <div className="text-right flex-1">
                  <p className="text-[15px] 2xl:text-[20px] font-bold text-[#1A1C1D] font-plus-jakarta">{item.date}</p>
                  <p className="text-[12px] 2xl:text-[16px] text-[#3D4949] font-medium font-plus-jakarta mt-0.5">{item.time}</p>
                </div>
                
                {/* Timeline Dot */}
                <div className="w-[10px] h-[10px] 2xl:w-[14px] 2xl:h-[14px] rounded-full bg-[#8C7EF6] border-2 border-white shadow-sm z-10 translate-x-[41px] md:translate-x-[49px] 2xl:translate-x-[66px] mt-1" />
              </div>

              {/* Card Container */}
              <div className="space-y-5">
                
                {/* Main Card (Lavender background) */}
                <div className="bg-[#F6F5FF] border border-[#E9E7FD] rounded-[28px] 2xl:rounded-[36px] p-6 2xl:p-9 shadow-sm">
                  
                  {/* Comments */}
                  <p className="text-[#3D4949] text-[15px] 2xl:text-[20px] leading-relaxed font-plus-jakarta">
                    {item.comment}
                  </p>

                  {/* Actions & Files Grid */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 2xl:mt-8 pt-4 border-t border-[#E9E7FD]/40">
                    
                    {/* Files list */}
                    <div className="flex flex-wrap gap-2.5 2xl:gap-3.5">
                      {item.files.map((file, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 bg-white border border-[#E9E7FD] rounded-xl px-4 py-2 2xl:px-5 2xl:py-2.5 text-[13px] 2xl:text-[17px] text-[#3D4949] font-semibold"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={() => onEditClick(item)}
                      className="
                        bg-[#8C7EF6] 
                        hover:bg-[#7768e3] 
                        text-white 
                        text-[14px] 2xl:text-[18px] 
                        font-bold 
                        px-8 py-2.5 
                        2xl:px-11 2xl:py-3.5
                        rounded-full 
                        shadow-sm
                        transition-all 
                        duration-200
                        cursor-pointer
                        self-end sm:self-center
                      "
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Connected Issue Card if present */}
                {item.issueBy && (
                  <div className="relative pl-10 2xl:pl-14">
                    {/* Connecting path */}
                    <div className="absolute left-[8px] -top-5 w-[2px] h-[36px] bg-[#E9E7FD]" />
                    <div className="absolute left-[8px] top-4 w-[16px] h-[2px] bg-[#E9E7FD]" />
                    
                    {/* Issue content card */}
                    <div className="bg-[#FFFDF0] border border-[#FEF08A] rounded-[24px] 2xl:rounded-[32px] p-6 2xl:p-8">
                      <p className="text-[#92400E] text-[13px] 2xl:text-[17px] font-extrabold uppercase tracking-wider font-plus-jakarta mb-2">
                        Issue mentioned by: <span className="text-[#1A1C1D]">{item.issueBy}</span>
                      </p>
                      
                      <p className="text-[#78350F] text-[15px] 2xl:text-[20px] leading-relaxed font-plus-jakarta">
                        {item.issueComment}
                      </p>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* File View Placeholder */
        <div className="bg-[#F8F9FA] rounded-[28px] p-10 2xl:p-14 text-center border border-[#E2E2E4] border-dashed">
          <p className="text-[16px] 2xl:text-[21px] font-bold text-[#3D4949]">File View Mode</p>
          <p className="text-gray-400 text-sm mt-2">Showing all documents uploaded under this category.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Array.from(new Set(timeline.flatMap(item => item.files))).map((file, idx) => (
              <div key={idx} className="bg-white border border-[#E2E2E4] p-5 rounded-2xl flex flex-col items-center gap-3 shadow-sm">
                <svg className="w-12 h-12 text-[#8C7EF6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold truncate w-full text-center text-[#3D4949]">{file}</span>
                <button className="text-[#8C7EF6] text-xs font-bold hover:underline cursor-pointer">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;
