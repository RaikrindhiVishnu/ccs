import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Typography } from "@/components/ui/typography";
import {
  DashboardHeader,
  StatsCard,
  PipelineStatus,
  ScreeningChart,
  ActivityCard,
  AlertBanner,
} from "@/features/ccs/components";
import { statsData } from "@/features/ccs/data/ccsDashboardData";
import {
  useGetDashboardAllFarmlandDetailsMutation,
  useGetDashboardRecentActivitiesMutation
} from "@/features/ccs/api/dashboardApi";

export default function CcsDashboard() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [getFarmlandDetails, { data: farmlandStats, isLoading: isFarmlandLoading }] = useGetDashboardAllFarmlandDetailsMutation();
  const [getRecentActivities, { data: recentActivitiesData }] = useGetDashboardRecentActivitiesMutation();

  useEffect(() => {
    // get-all-farmland-details still strictly requires dates despite swagger, so we pass a wide range if empty
    const farmlandPayload = startDate && endDate ? {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      fromDate: format(startDate, 'yyyy-MM-dd'),
      toDate: format(endDate, 'yyyy-MM-dd'),
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd')
    } : {
      startDate: "2000-01-01",
      endDate: "2099-12-31",
      fromDate: "2000-01-01",
      toDate: "2099-12-31"
    };

    // recent-activities should default to today when omitted to avoid showing lifetime metrics
    const today = format(new Date(), 'yyyy-MM-dd');
    const activitiesPayload = startDate && endDate ? {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      fromDate: format(startDate, 'yyyy-MM-dd'),
      toDate: format(endDate, 'yyyy-MM-dd')
    } : {
      startDate: today,
      endDate: today,
      fromDate: today,
      toDate: today
    };

    getFarmlandDetails(farmlandPayload);
    getRecentActivities(activitiesPayload);
  }, [getFarmlandDetails, getRecentActivities, startDate, endDate]);

  // Extract the stats object (handle cases where backend wraps it in "data")
  const stats = (farmlandStats as any)?.data || farmlandStats;

  // Construct dynamic stats based on API response, fallback to dummy data structure
  const dynamicStats = [
    {
      title: statsData[0].title,
      value: stats?.["total farmlands"]?.toLocaleString() ?? stats?.total_farmlands?.toLocaleString() ?? "0",
      icon: statsData[0].icon,
    },
    {
      title: statsData[1].title,
      value: stats?.["pending farmlands"]?.toLocaleString() ?? stats?.pending_farmlands?.toLocaleString() ?? "0",
      icon: statsData[1].icon,
    },
    {
      title: statsData[2].title,
      value: stats?.["approved farmlands"]?.toLocaleString() ?? stats?.approved_farmlands?.toLocaleString() ?? "0",
      icon: statsData[2].icon,
    },
  ];

  const activities = recentActivitiesData?.data
    ? recentActivitiesData.data.map((item: any, index: number) => {
      const timestamp = item.created_at || item.created_on || item.updated_at || item.timestamp;
      let timeAgo = "Recently";
      if (timestamp) {
        try {
          timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        } catch (e) {
          // fallback if date is invalid
        }
      }
      let displayStatus = item.status;
      if (typeof item.status === 'string') {
        if (item.status.toUpperCase() === "REVRTD") displayStatus = "Rejected";
        else if (item.status.toUpperCase() === "APPRVD") displayStatus = "Approved";
        else if (item.status.toUpperCase() === "PENDNG") displayStatus = "Pending";
        else displayStatus = item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase();
      }

      return {
        id: item.farmland_code || item.farmland_id ? `FL-${item.farmland_id}` : `temp-${index}`,
        description: item.farmland_id ? `Farmland ${item.farmland_code || item.farmland_id} was ${displayStatus}` : `Farmland was marked as ${displayStatus}`,
        timeAgo,
      };
    })
    : [];

  return (
    <div className="flex flex-col w-full h-full px-4 py-4 lg:px-6 lg:py-6 overflow-x-hidden">
      {/* Header */}
      <div className="w-full shrink-0 relative z-50 mb-[39px]">
        <DashboardHeader
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-[19px] items-stretch w-full">

        {/* ════ LEFT COLUMN ════ */}
        <div className="flex flex-col w-full h-full justify-between">

          <div className="flex flex-col w-full gap-[36px]">
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-[18px]">
              {dynamicStats.map((item, index) => (
                <div key={item.title} className={index === 0 ? "col-span-2" : ""}>
                  <StatsCard
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    large={index === 0}
                    isLoading={isFarmlandLoading}
                  />
                </div>
              ))}
            </div>

            {/* Pipeline Status */}
            <div className="flex flex-col">
              <Typography
                variant="h2"
                className="mb-[29px] font-['Plus_Jakarta_Sans'] font-extrabold uppercase leading-[120%] text-[#171717] text-[24px]"
              >
                PIPELINE STATUS
              </Typography>
              <PipelineStatus startDate={startDate} endDate={endDate} />
            </div>
          </div>

          {/* Alert Banner */}
          <div className="mt-auto pt-[29px]">
            <AlertBanner />
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div
          className="flex flex-col bg-[#FFFFFF] rounded-[33px] px-[31px] pt-[30px] pb-[30px] w-full h-full relative"
        >
          <div className="flex-none mb-[30px]">
            <ScreeningChart endDate={endDate} />
          </div>

          <div className="flex-1 flex flex-col mt-[15px] min-h-0">
            <Typography
              variant="h3"
              className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] mb-[24px]"
            >
              RECENT ACTIVITY
            </Typography>
            <div className="flex flex-col gap-[24px] overflow-y-auto pr-2 pb-2 flex-1">
              {activities.map((item: any, index: number) => (
                <div key={index} className="flex flex-col gap-[24px]">
                  <ActivityCard
                    id={item.id}
                    description={item.description}
                    timeAgo={item.timeAgo}
                  />
                  {index < activities.length - 1 && (
                    <div className="w-full h-0 border-t border-[rgba(0,0,0,0.06)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
