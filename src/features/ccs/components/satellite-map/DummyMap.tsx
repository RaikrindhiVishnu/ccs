import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import { useWaybackSource } from "@/features/satellite-history/hooks/useWaybackSource";

export default function DummyMap() {
  // Use a default date to fetch the satellite tile URL for the background
  const { sourceConfig } = useWaybackSource("2020-01-01");

  const coords = { lat: 17.014366, lon: 78.423866 };

  return (
    <div className="absolute inset-0 z-0 bg-[#131600]">
      <div className="absolute inset-0">
        <SatelliteMap
          tileUrl={sourceConfig?.url ?? ""}
          maxzoom={sourceConfig?.maxzoom ?? 18}
          coords={coords}
          interactive={false}
        />
      </div>

      {/* Farmland polygon shape (example mark from Figma) */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon
          points="35,25 55,20 65,30 68,45 60,58 50,62 38,58 28,48 27,35"
          fill="rgba(200,220,240,0.6)"
          stroke="rgba(180,200,220,0.9)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Tree clusters (example markers from Figma) */}
      {[
        { cx: '15%', cy: '25%' }, { cx: '22%', cy: '55%' },
        { cx: '75%', cy: '70%' }, { cx: '80%', cy: '35%' },
        { cx: '60%', cy: '15%' }, { cx: '10%', cy: '75%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            left: pos.cx, top: pos.cy,
            width: '2.5rem', height: '2.5rem',
            background: 'radial-gradient(circle, #2d5a1e 0%, #1a3a10 100%)',
            opacity: 0.8,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

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
    </div>
  );
}