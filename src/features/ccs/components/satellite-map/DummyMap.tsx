import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import { useWaybackSource } from "@/features/satellite-history/hooks/useWaybackSource";

export default function DummyMap({ polygon }: { polygon?: any }) {
  // Use a default date to fetch the satellite tile URL for the background
  const { sourceConfig } = useWaybackSource("2020-01-01");

  const coords = { lat: 17.014366, lon: 78.423866 };

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0">
        <SatelliteMap
          tileUrl={sourceConfig?.url ?? ""}
          maxzoom={sourceConfig?.maxzoom ?? 18}
          coords={coords}
          interactive={true}
          polygon={polygon}
        />
      </div>



      {/* Map attribution bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-4 py-1 z-10 pointer-events-none">
        <span className="text-[0.6rem] text-white/70">Camera: 991 m</span>
        <span className="text-[0.6rem] text-white/70">
          {Math.abs(coords.lat).toFixed(6)}°N {Math.abs(coords.lon).toFixed(6)}°E
        </span>
        <span className="text-[0.6rem] text-white/70">704 m</span>
      </div>

      {/* Map controls (bottom right) */}
      <div className="absolute bottom-6 right-4 flex flex-col items-center gap-1 z-10 pointer-events-none">
        <div className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1">
          <span className="text-[0.65rem] font-medium text-white">3D</span>
        </div>
      </div>

      <style>{`
        .maplibregl-ctrl-bottom-right, .maplibregl-ctrl-bottom-left {
          display: none !important;
        }
      `}</style>
    </div>
  );
}