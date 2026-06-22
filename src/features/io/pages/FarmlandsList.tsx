import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import IODashboardHeader from "@/features/io/components/IODashboardHeader";
import FarmlandStatsCards from "@/features/io/components/Farmlandstatscards";
import { cn } from "@/lib/utils";

interface FarmlandRow {
  id: string;
  agentName: string;
  agentRole: string;
  agentAvatar?: string;
  farmlandId: string;
  location: string;
  state: string;
  landExtend: number;
  landUnit: string;
  totalAmount: string;
  status: "Completed" | "Rejected" | "Pending";
  statusReason: string;
  createdDate: string;
  createdTime: string;
  publishedDate: string;
  publishedTime?: string;
}

const DUMMY_FARMLANDS: FarmlandRow[] = [
  {
    id: "1",
    agentName: "Ravi Kumar",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "9th Oct, 2023",
    publishedTime: "2:03 PM",
  },
  {
    id: "2",
    agentName: "Aananthu",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Rejected",
    statusReason: "Documentation Issue",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "3",
    agentName: "Srikanth",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "4",
    agentName: "Yakoob",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "5",
    agentName: "Rama Krishna",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "6",
    agentName: "Shiva Reddy",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Rejected",
    statusReason: "Documentation Issue",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "7",
    agentName: "Ravi Kumar",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "9th Oct, 2023",
    publishedTime: "2:03 PM",
  },
  {
    id: "8",
    agentName: "Sunil Varma",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 02",
    location: "Krishna",
    state: "Andhra Pradesh",
    landExtend: 75,
    landUnit: "Acres",
    totalAmount: "₹ 18L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "8th Oct, 2023",
    createdTime: "10:20 AM",
    publishedDate: "11th Oct, 2023",
    publishedTime: "1:15 PM",
  },
  {
    id: "9",
    agentName: "Sravan Yadav",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 03",
    location: "Guntur",
    state: "Andhra Pradesh",
    landExtend: 120,
    landUnit: "Acres",
    totalAmount: "₹ 32L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "10th Oct, 2023",
    createdTime: "9:45 AM",
    publishedDate: "NA",
  },
  {
    id: "10",
    agentName: "Mahesh Babu",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 04",
    location: "Kurnool",
    state: "Andhra Pradesh",
    landExtend: 90,
    landUnit: "Acres",
    totalAmount: "₹ 22L",
    status: "Rejected",
    statusReason: "Boundary Dispute",
    createdDate: "15th Oct, 2023",
    createdTime: "2:00 PM",
    publishedDate: "NA",
  },
  {
    id: "11",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 05",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  },
  {
    id: "12",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 06",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 150,
    landUnit: "Acres",
    totalAmount: "₹ 40L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct, 2023",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  },
  {
    id: "13",
    agentName: "Ravi Kumar",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 07",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 100,
    landUnit: "Acres",
    totalAmount: "₹ 25L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "6th Oct, 2023",
    createdTime: "12:53 PM",
    publishedDate: "9th Oct, 2023",
    publishedTime: "2:03 PM",
  },
  {
    id: "14",
    agentName: "Sunil Varma",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 08",
    location: "Krishna",
    state: "Andhra Pradesh",
    landExtend: 75,
    landUnit: "Acres",
    totalAmount: "₹ 18L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "8th Oct, 2023",
    createdTime: "10:20 AM",
    publishedDate: "11th Oct, 2023",
    publishedTime: "1:15 PM",
  },
  {
    id: "15",
    agentName: "Sravan Yadav",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 09",
    location: "Guntur",
    state: "Andhra Pradesh",
    landExtend: 120,
    landUnit: "Acres",
    totalAmount: "₹ 32L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "10th Oct, 2023",
    createdTime: "9:45 AM",
    publishedDate: "NA",
  },
  {
    id: "16",
    agentName: "Mahesh Babu",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 10",
    location: "Kurnool",
    state: "Andhra Pradesh",
    landExtend: 90,
    landUnit: "Acres",
    totalAmount: "₹ 22L",
    status: "Rejected",
    statusReason: "Boundary Dispute",
    createdDate: "15th Oct, 2023",
    createdTime: "2:00 PM",
    publishedDate: "NA",
  },
  {
    id: "17",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 11",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  },
  {
    id: "18",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 12",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 150,
    landUnit: "Acres",
    totalAmount: "₹ 40L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct, 2023",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  },
  {
    id: "19",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 13",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  },
  {
    id: "20",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 14",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 150,
    landUnit: "Acres",
    totalAmount: "₹ 40L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct, 2023",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  },
  {
    id: "21",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 15",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  },
  {
    id: "22",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 16",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 150,
    landUnit: "Acres",
    totalAmount: "₹ 40L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct, 2023",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  },
  {
    id: "23",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 17",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  },
  {
    id: "24",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 18",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 150,
    landUnit: "Acres",
    totalAmount: "₹ 40L",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct, 2023",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  },
  {
    id: "25",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 19",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 110,
    landUnit: "Acres",
    totalAmount: "₹ 28L",
    status: "Completed",
    statusReason: "Live in Website",
    createdDate: "18th Oct, 2023",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct, 2023",
    publishedTime: "4:00 PM",
  }
];

const FarmlandsList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return DUMMY_FARMLANDS.filter((item) =>
      item.agentName.toLowerCase().includes(search.toLowerCase()) ||
      item.farmlandId.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const visibleData = useMemo(() => {
    return filteredData.slice(0, 3);
  }, [filteredData]);

  return (
    <main
      className="
        relative
        w-full
        h-fit
        overflow-hidden
        bg-[var(--chart-bg)]

        pt-[0.9rem]
        sm:pt-[1rem]
        lg:pt-[1.2rem]
        xl:pt-[1.5rem]
        2xl:pt-[1.75rem]

        px-[0.75rem]
        sm:px-[1rem]
        md:px-[1.25rem]
        xl:px-[1.8rem]
        2xl:px-[2.3rem]

        pb-[0.75rem]
        sm:pb-[0.9rem]
        lg:pb-[1rem]
        xl:pb-[1.25rem]
      "
    >
      {/* OUTER FLOW WRAPPER */}
      <div className="relative z-[1] flex flex-col gap-[12px] w-full animate-fadeIn">
        {/* ONE SINGLE LARGE BACKGROUND CARD CONTAINER */}
        <div
          className="
            flex
            w-full
            flex-col
            bg-[var(--surface-card)]
            rounded-[32px]
            border border-[var(--border-soft)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
            pt-[1.5rem] md:pt-[2rem]
            px-[1.5rem] md:px-[2rem]
            pb-[clamp(2.1504px,0.28vw,6.0px)]
            gap-[1.5rem]
            md:gap-[2rem]
          "
        >
          {/* STATS OVERVIEW */}
          <section className="w-full">
            <FarmlandStatsCards />
          </section>

          {/* HEADER (Title & Search) */}
          <div className="w-full">
            <IODashboardHeader
              title="Farmlands List"
              description=""
              searchPlaceholder="Search Agents..."
              searchValue={search}
              onSearchChange={setSearch}
              titleClassName="
                font-[family-name:var(--font-heading)]
                font-semibold
                leading-[110%]
                tracking-[-0.9px]
                text-[clamp(1.1333rem,2.361vw,2.8rem)]
                text-[var(--text-heading)]
              "
              searchWrapperClassName="!bg-[var(--chart-bg)]"
            />
          </div>

          {/* TABLE CONTAINER */}
          <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
            <div className="w-full min-w-[1100px] flex flex-col gap-[16px] pb-4">
              {/* TABLE HEADER (VISUAL ONLY) */}
              <div
                className="
                  flex
                  w-full
                  border-b border-[var(--border-default)]
                  pb-4
                  px-[32px]
                  items-center
                  justify-between
                "
              >
                <div className="w-[22%] text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Agent & ID
                </div>
                <div className="w-[15%] text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Location
                </div>
                <div className="w-[12%] text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Details
                </div>
                <div className="w-[16%] text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Status
                </div>
                <div className="w-[15%] text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Created On
                </div>
                <div className="w-[12%] text-xs font-[family-name:var(--font-sans)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Published On
                </div>
                <div className="w-[8%] text-right text-xs font-[family-name:var(--font-sans)] font-semibold tracking-[1.2px] text-[var(--text-secondary)] uppercase">
                  Action
                </div>
              </div>

              {/* LIST CONTAINER (ROWS) */}
              <div className="flex flex-col w-full gap-[clamp(8.5248px,1.11vw,22.0px)]">
                {visibleData.map((row) => (
                  <div
                    key={row.id}
                    className="
                      group
                      flex
                      w-full
                      h-[clamp(57px,7.014vw,135.0px)]
                      bg-[var(--surface-card)]
                      shadow-[0px_8px_24px_rgba(0,49,50,0.03)]
                      border border-[var(--border-soft)]
                      rounded-[24px] md:rounded-[32px]
                      px-[clamp(17.0496px,2.22vw,43.0px)]
                      items-center
                      justify-between
                      relative
                      transition-all
                      duration-200
                      hover:shadow-[0px_12px_28px_rgba(0,49,50,0.05)]
                    "
                  >
                    {/* Decorative subtle left accent */}
                    <div
                      className="
                        absolute left-[1px] top-[1px] bottom-[1.5px] w-1
                        bg-[var(--brand-500)] opacity-0 group-hover:opacity-100
                        rounded-[32px_0px_0px_32px]
                        transition-opacity duration-200
                      "
                    />

                    {/* Agent & ID */}
                    <div className="w-[22%] flex items-center gap-[clamp(8.5248px,1.11vw,22.0px)]">
                      {row.agentAvatar ? (
                        <img
                          src={row.agentAvatar}
                          alt={row.agentName}
                          className="w-[clamp(27px,3.33vw,64.0px)] h-[clamp(27px,3.33vw,64.0px)] rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-[clamp(27px,3.33vw,64.0px)] h-[clamp(27px,3.33vw,64.0px)] rounded-full bg-[var(--surface-page)] flex items-center justify-center font-bold text-[var(--text-primary)] text-[clamp(8.25px,0.97vw,19.0px)] shrink-0">
                          {row.agentName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex flex-col gap-[clamp(2.1504px,0.28vw,6.0px)] min-w-0">
                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(9.75px,1.11vw,22.0px)] text-[var(--text-primary)] leading-none truncate">
                          {row.agentName}
                        </span>
                        <span
                          className="
                            inline-block
                            w-fit
                            text-[clamp(6px,0.69vw,14.0px)]
                            font-[family-name:var(--font-inter)]
                            font-normal
                            tracking-[0.5px]
                            text-[var(--text-secondary)]
                            bg-[var(--surface-page)]
                            px-[clamp(4.5px,0.56vw,11.0px)]
                            py-[clamp(1.0752px,0.14vw,3.0px)]
                            rounded-[9999px]
                            uppercase
                            leading-[1.5]
                          "
                        >
                          {row.farmlandId}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="w-[15%] flex flex-col gap-[clamp(2.1504px,0.28vw,6.0px)]">
                      <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(9px,0.97vw,19.0px)] text-[var(--text-primary)] leading-none">
                        {row.location}
                      </span>
                      <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(7.5px,0.83vw,16.0px)] text-[var(--text-secondary)] leading-none">
                        {row.state}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="w-[12%] flex flex-col gap-[clamp(1.0752px,0.14vw,4.0px)]">
                      <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(10.5px,1.25vw,24.0px)] text-[var(--brand-600)] leading-none">
                        {row.totalAmount}
                      </span>
                      <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(7.5px,0.83vw,16.0px)] text-[var(--text-secondary)] leading-none">
                        {row.landExtend} {row.landUnit}
                      </span>
                    </div>

                    {/* Status badge + dot context */}
                    <div className="w-[16%] flex flex-col items-start gap-[clamp(3.2256px,0.42vw,8.0px)]">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center px-[clamp(8.5248px,1.11vw,22.0px)] py-[clamp(1.0752px,0.14vw,3.0px)] rounded-full text-[clamp(7.5px,0.83vw,16.0px)] font-semibold font-[family-name:var(--font-sans)] h-[clamp(15px,1.8vw,35.0px)]",
                          row.status === "Completed" && "bg-[var(--status-success-soft)] border border-[rgba(22,163,74,0.1)] text-[var(--status-success)]",
                          row.status === "Rejected" && "bg-[var(--status-danger-soft)] border border-[rgba(220,38,38,0.1)] text-[var(--status-danger)]",
                          row.status === "Pending" && "bg-[var(--brand-tint)] border border-[rgba(39,128,196,0.1)] text-[var(--status-pending)]"
                        )}
                      >
                        {row.status}
                      </span>
                      <div className="flex items-center gap-[clamp(3.2256px,0.42vw,8.0px)] pl-[clamp(3.2256px,0.42vw,8.0px)]">
                        <span
                          className={cn(
                            "w-[clamp(3.2256px,0.42vw,8.0px)] h-[clamp(3.2256px,0.42vw,8.0px)] rounded-full",
                            row.status === "Completed" && "bg-[var(--status-success)]",
                            row.status === "Rejected" && "bg-[var(--status-danger)]",
                            row.status === "Pending" && "bg-[var(--status-pending)]"
                          )}
                        />
                        <span className="font-[family-name:var(--font-inter)] font-normal text-[clamp(6.75px,0.76vw,15.0px)] text-[var(--text-secondary)] leading-none">
                          {row.statusReason}
                        </span>
                      </div>
                    </div>

                    {/* Created On */}
                    <div className="w-[15%] flex flex-col gap-[clamp(2.1504px,0.28vw,6.0px)]">
                      <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(9px,0.97vw,19.0px)] text-[var(--text-primary)] leading-none">
                        {row.createdDate}
                      </span>
                      <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(7.5px,0.83vw,16.0px)] text-[var(--text-secondary)] leading-none">
                        {row.createdTime}
                      </span>
                    </div>

                    {/* Published On */}
                    <div className="w-[12%] flex flex-col gap-[clamp(2.1504px,0.28vw,6.0px)]">
                      <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(9px,0.97vw,19.0px)] text-[var(--text-primary)] leading-none">
                        {row.publishedDate}
                      </span>
                      {row.publishedTime && (
                        <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(7.5px,0.83vw,16.0px)] text-[var(--text-secondary)] leading-none">
                          {row.publishedTime}
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="w-[8%] flex justify-end">
                      <button
                        onClick={() => navigate(`/io/farmlands-list/detail/${row.id}`)}
                        className="
                          flex items-center justify-center
                          bg-[var(--btn-secondary)]
                          hover:opacity-90
                          text-[var(--text-strong)]
                          font-[family-name:var(--font-sans)] font-bold text-[clamp(7.5px,0.83vw,16.0px)] uppercase tracking-[0.6px]
                          rounded-[9999px]
                          h-[clamp(18px,1.94vw,38.0px)]
                          w-[clamp(39px,4.51vw,87.0px)]
                          transition-opacity duration-150
                        "
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* VIEW MORE FOOTER BAR */}
        {filteredData.length > 3 && (
          <div
            className="
              flex
              w-full
              items-center
              justify-center
              h-[76px]
              bg-[var(--surface-card)]
              shadow-[0px_8px_24px_rgba(0,49,50,0.03)]
              border border-[var(--border-soft)]
              rounded-[24px]
              mt-2
            "
          >
            <button
              onClick={() => navigate("/io/farmlands-list/list")}
              className="
                font-[family-name:var(--font-sans)]
                font-semibold
                text-lg
                leading-none
                text-[var(--text-strong)]
                hover:opacity-80
                transition-opacity
              "
            >
              View More
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default FarmlandsList;
