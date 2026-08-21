import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
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
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeUp } from "@/components/animations/variants";
import { Skeleton } from "@/components/ui/skeleton";

export default function CcsDashboard() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [getFarmlandDetails, { data: farmlandStats, isLoading: isFarmlandLoading }] = useGetDashboardAllFarmlandDetailsMutation();
  const [getRecentActivities, { data: recentActivitiesData, isLoading: isActivitiesLoading }] = useGetDashboardRecentActivitiesMutation();

  useEffect(() => {
    // get-all-farmland-details still strictly requires dates despite swagger, so we pass a wide range if empty
    const farmlandPayload = startDate && endDate ? {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    } : {
      startDate: "2000-01-01",
      endDate: "2099-12-31"
    };

    // recent-activities should default to today when omitted to avoid showing lifetime metrics
    const today = format(new Date(), 'yyyy-MM-dd');
    const activitiesPayload = startDate && endDate ? {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    } : {
      startDate: today,
      endDate: today
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

      const fid = item.farmland_code || item.farmland_id;
      const displayId = fid ? (String(fid).startsWith('FL') ? fid : `FL-${fid}`) : `temp-${index}`;

      return {
        id: displayId,
        description: fid ? `Farmland ${displayId} was ${displayStatus}` : `Farmland was marked as ${displayStatus}`,
        timeAgo,
      };
    })
    : [];

  return (
    <div className="flex flex-col w-full h-full px-4 py-4 lg:px-6 lg:py-6 overflow-x-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full shrink-0 relative z-50 mb-[39px]"
      >
        <DashboardHeader
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </motion.div>

      {/* Main Content Grid */}
      <StaggerContainer className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-[19px] items-stretch w-full">

        {/* ════ LEFT COLUMN ════ */}
        <motion.div variants={fadeUp} className="flex flex-col w-full h-full justify-between">

          <div className="flex flex-col w-full gap-[36px]">
            {/* Stats Section */}
            <StaggerContainer className="grid grid-cols-2 gap-[18px]">
              {dynamicStats.map((item, index) => (
                <motion.div variants={fadeUp} key={item.title} className={index === 0 ? "col-span-2" : ""}>
                  <StatsCard
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                    large={index === 0}
                    isLoading={isFarmlandLoading}
                  />
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Pipeline Status */}
            <motion.div variants={fadeUp} className="flex flex-col">
              <Typography
                variant="h2"
                className="mb-[29px] font-['Plus_Jakarta_Sans'] font-extrabold uppercase leading-[120%] text-[#171717] text-[24px]"
              >
                PIPELINE STATUS
              </Typography>
              <PipelineStatus startDate={startDate} endDate={endDate} />
            </motion.div>
          </div>

          {/* Alert Banner */}
          <motion.div variants={fadeUp} className="mt-auto pt-[29px]">
            <AlertBanner />
          </motion.div>
        </motion.div>

        {/* ════ RIGHT PANEL ════ */}
        <motion.div
          variants={fadeUp}
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
            <div data-lenis-prevent="true" className="flex flex-col gap-[24px] overflow-y-auto pr-2 pb-2 flex-1">
              {isActivitiesLoading ? (
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-[24px]">
                  {[1, 2, 3].map((i) => (
                    <motion.div variants={fadeUp} key={i} className="flex flex-col gap-[24px]">
                      <div className="flex gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex flex-col gap-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      {i < 3 && <div className="w-full h-0 border-t border-[rgba(0,0,0,0.06)]" />}
                    </motion.div>
                  ))}
                </motion.div>
              ) : activities.length > 0 ? (
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-[24px]">
                  {activities.map((item: any, index: number) => (
                    <motion.div variants={fadeUp} key={index} className="flex flex-col gap-[24px]">
                      <ActivityCard
                        id={item.id}
                        description={item.description}
                        timeAgo={item.timeAgo}
                      />
                      {index < activities.length - 1 && (
                        <div className="w-full h-0 border-t border-[rgba(0,0,0,0.06)]" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex w-full h-full items-center justify-center pt-10">
                  <Typography variant="span" className="text-gray-400 font-['Plus_Jakarta_Sans'] text-sm">
                    No recent activity found.
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </StaggerContainer>
    </div>
  );
}
