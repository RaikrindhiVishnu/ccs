export default function DummyMap() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Satellite map feel using a green terrain gradient */}
      <div
        className="h-full w-full"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, #4a7c59 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, #3d6b47 0%, transparent 45%),
            radial-gradient(ellipse at 50% 30%, #8fac6e 0%, transparent 40%),
            radial-gradient(ellipse at 20% 70%, #5a8a4a 0%, transparent 35%),
            radial-gradient(ellipse at 80% 20%, #c4a882 0%, transparent 40%),
            radial-gradient(ellipse at 60% 80%, #6b9e5a 0%, transparent 35%),
            #4a7a3d
          `,
        }}
      >
        {/* Road lines */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 60% Q 30% 55% 50% 50% T 100% 45%" stroke="#c4a882" strokeWidth="8" fill="none" opacity="0.7" />
          <path d="M 0 62% Q 30% 57% 50% 52% T 100% 47%" stroke="#b8997a" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M 20% 0 Q 25% 40% 30% 60% T 35% 100%" stroke="#c4a882" strokeWidth="5" fill="none" opacity="0.5" />
        </svg>

        {/* Farmland polygon shape (mimics the white blob in Figma) */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon
            points="35,25 55,20 65,30 68,45 60,58 50,62 38,58 28,48 27,35"
            fill="rgba(200,220,240,0.6)"
            stroke="rgba(180,200,220,0.9)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Tree clusters */}
        {[
          { cx: '15%', cy: '25%' }, { cx: '22%', cy: '55%' },
          { cx: '75%', cy: '70%' }, { cx: '80%', cy: '35%' },
          { cx: '60%', cy: '15%' }, { cx: '10%', cy: '75%' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full"
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
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-4 py-1">
          <span className="text-[0.6rem] text-white/70">Camera: 991 m</span>
          <span className="text-[0.6rem] text-white/70">17°00'51.72"N 78°25'25.92"E</span>
          <span className="text-[0.6rem] text-white/70">704 m</span>
        </div>

        {/* Map controls (bottom right) */}
        <div className="absolute bottom-6 right-4 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1">
            <span className="text-[0.65rem] font-medium text-white">3D</span>
          </div>
        </div>
      </div>
    </div>
  );
}