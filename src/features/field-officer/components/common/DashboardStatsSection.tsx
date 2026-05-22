import StatCard from "../cards/StatCard";
import { STAT_CARDS } from "../../data/statsData";

export default function DashboardStatsSection() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
      {STAT_CARDS.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
}
