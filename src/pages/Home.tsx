import RegionVelocityCard from "@/components/cards/RegionVelocityCard";
import TargetVsActualCard from "@/components/cards/TargetVsActualCard";
import Successcard from "@/components/ui/Successcard";
import {
  regionVelocityData,
  targetVsActualData,
} from "@/mock/chartData";

export default function Home() {
  return (
    <div className="p-6">
      <div className="lg:row-span-2">
          <Successcard />
        </div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{ gridAutoRows: 'clamp(280px, 40vh, 460px)' }}
      >
        <RegionVelocityCard data={regionVelocityData} />
        <TargetVsActualCard data={targetVsActualData} />
       
      </div>
    </div>
  );
}