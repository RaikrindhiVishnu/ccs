import RegionVelocityCard from "@/components/cards/RegionVelocityCard";
import TargetVsActualCard from "@/components/cards/TargetVsActualCard";
import Successcard from "@/components/ui/Successcard";
import areaMap from "@/assets/areamap.svg";
import profileImg from "@/assets/profile.svg";
import {
  regionVelocityData,
  targetVsActualData,
} from "@/components/mock/chartData";

export default function Home() {
  return (
    // <div className="lg:row-span-2">
    //   <Successcard />
    //   <Successcard
    //     badgeLabel="Area Creation"
    //     titleLine1="Area"
    //     titleLine2="Created Successfully!"
    //     redirectText="Redirecting to the Home Page..."
    //     regionName="Harish"
    //     assignedId="GLC R00012"
    //     createdDate="4/18/2026"
    //     createdTime="10:15 PM"
    //     mapImage={areaMap}
    //   />

    // </div>
    <div className="p-6">
        <div className="lg:row-span-2">
      <Successcard />
      <Successcard
        badgeLabel="Area Creation"
        titleLine1="Area"
        titleLine2="Created Successfully!"
        redirectText="Redirecting to the Home Page..."
        regionName="Harish"
        assignedId="GLC R00012"
        createdDate="4/18/2026"
        createdTime="10:15 PM"
        mapImage={areaMap}
      />

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