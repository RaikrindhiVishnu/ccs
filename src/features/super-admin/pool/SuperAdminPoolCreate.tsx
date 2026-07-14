import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── Icons ────────────────────────────────────────────────────────────────────

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 7a5 5 0 1 1 .9 2.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 3.5V7H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13 7a5 5 0 1 0-.9 2.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 3.5V7H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DrawPolygonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 10L6 3l5 2 2 5-5 3-6-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="6" cy="3" r="1.2" fill="currentColor" />
    <circle cx="11" cy="5" r="1.2" fill="currentColor" />
    <circle cx="13" cy="10" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
    <circle cx="2" cy="10" r="1.2" fill="currentColor" />
  </svg>
);
const EditPolygonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9.5 3.5l3 3-7 7H2.5v-3l7-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const SplitPolygonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="2" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="9" y="9" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClearAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M5 4l1-2h4l1 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4l.5 9h7l.5-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M6 7l.3 3M10 7l-.3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const MapViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1 3l4.5 1.5L10 3l5 1.5v9L10 12l-4.5 1.5L1 12V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M5.5 4.5v9M10 3v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const SatelliteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M4.5 4.5c1.9 1.9 5.1 1.9 7 0M4.5 11.5c1.9-1.9 5.1-1.9 7 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);
const LocationPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

type DrawTool = "draw" | "edit" | "split" | "delete" | null;
type ViewMode = "map" | "satellite";
type Point = { x: number; y: number };
type Polygon = { id: string; points: Point[]; closed: boolean };

// ── Utility ──────────────────────────────────────────────────────────────────

function pointsToPath(points: Point[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
}

function polygonArea(points: Point[]): number {
  // Shoelace formula → acres (1 px ≈ 0.0002 acres at our scale)
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area / 2) * 0.00018;
}

// @ts-ignore
function closestPointOnSegment(p: Point, a: Point, b: Point): { pt: Point; t: number } {
  const dx = b.x - a.x, dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return { pt: a, t: 0 };
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq));
  return { pt: { x: a.x + t * dx, y: a.y + t * dy }, t };
}

function dist(a: Point, b: Point) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function SuperAdminPoolCreate() {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<DrawTool>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("satellite");
  const [location, setLocation] = useState("Hyderabad, Telangana");
  const [farmlandId] = useState("GLCSOS - 045");
  const [selectedPool, setSelectedPool] = useState("Pool A");
  const [targetAmount, setTargetAmount] = useState("1,00,00,000");
  const [minInvestment, setMinInvestment] = useState("50,000");
  const [lockInPeriod, setLockInPeriod] = useState("36 Months");

  // ── polygon state ──
  const [createdPools, setCreatedPools] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('createdPools') || '[]');
    } catch {
      return [];
    }
  });
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [history, setHistory] = useState<Polygon[][]>([[]]); // undo stack
  const [redoStack, setRedoStack] = useState<Polygon[][]>([]);
  const [activePolyId, setActivePolyId] = useState<string | null>(null);
  const [inProgressPoints, setInProgressPoints] = useState<Point[]>([]);
  const [mousePos, setMousePos] = useState<Point | null>(null);

  // edit mode
  const [draggingVertex, setDraggingVertex] = useState<{ polyId: string; idx: number } | null>(null);

  // split mode
  const [splitPoints, setSplitPoints] = useState<Point[]>([]);

  // zoom / pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef<{ mouse: Point; pan: Point } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // ── computed area ──
  const totalArea = polygons.reduce((acc, p) => acc + (p.closed ? polygonArea(p.points) : 0), 0);

  // ── push to undo history ──
  const pushHistory = useCallback((newPolys: Polygon[]) => {
    setHistory(h => [...h, newPolys]);
    setRedoStack([]);
    setPolygons(newPolys);
  }, []);

  const undo = () => {
    setHistory(h => {
      if (h.length <= 1) return h;
      const prev = h[h.length - 2];
      setRedoStack(r => [...r, polygons]);
      setPolygons(prev);
      setInProgressPoints([]);
      return h.slice(0, -1);
    });
  };

  const redo = () => {
    setRedoStack(r => {
      if (r.length === 0) return r;
      const next = r[r.length - 1];
      setHistory(h => [...h, next]);
      setPolygons(next);
      return r.slice(0, -1);
    });
  };

  // ── SVG coordinate helper ──
  const svgPoint = (e: React.MouseEvent): Point => {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - pan.x) / zoom,
      y: (e.clientY - rect.top - pan.y) / zoom,
    };
  };

  // ── cursor style ──
  const getCursor = () => {
    if (activeTool === "draw") return "crosshair";
    if (activeTool === "edit") return "default";
    if (activeTool === "split") return "crosshair";
    if (activeTool === "delete") return "not-allowed";
    if (isPanning) return "grabbing";
    return "grab";
  };

  // ── mouse down ──
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const pt = svgPoint(e);

    if (activeTool === "draw") {
      if (inProgressPoints.length > 2) {
        // check close
        const first = inProgressPoints[0];
        if (dist(pt, first) < 12 / zoom) {
          const newPoly: Polygon = {
            id: Date.now().toString(),
            points: inProgressPoints,
            closed: true,
          };
          pushHistory([...polygons, newPoly]);
          setInProgressPoints([]);
          return;
        }
      }
      setInProgressPoints(prev => [...prev, pt]);
      return;
    }

    if (activeTool === "edit") {
      // check vertex hit
      for (const poly of polygons) {
        for (let i = 0; i < poly.points.length; i++) {
          if (dist(pt, poly.points[i]) < 8 / zoom) {
            setDraggingVertex({ polyId: poly.id, idx: i });
            return;
          }
        }
      }
      return;
    }

    if (activeTool === "split") {
      setSplitPoints(prev => {
        const next = [...prev, pt];
        if (next.length === 2) {
          // perform split on activePolyId or first polygon
          const targetId = activePolyId || polygons[polygons.length - 1]?.id;
          if (targetId) splitPolygon(targetId, next[0], next[1]);
          return [];
        }
        return next;
      });
      return;
    }

    if (activeTool === "delete") {
      // hit test polygons
      for (const poly of [...polygons].reverse()) {
        if (poly.closed && isPointInPolygon(pt, poly.points)) {
          pushHistory(polygons.filter(p => p.id !== poly.id));
          if (activePolyId === poly.id) setActivePolyId(null);
          return;
        }
      }
      return;
    }

    // pan mode
    setIsPanning(true);
    panStart.current = { mouse: { x: e.clientX, y: e.clientY }, pan: { ...pan } };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const pt = svgPoint(e);
    setMousePos(pt);

    if (draggingVertex) {
      setPolygons(prev => prev.map(poly => {
        if (poly.id !== draggingVertex.polyId) return poly;
        const newPoints = [...poly.points];
        newPoints[draggingVertex.idx] = pt;
        return { ...poly, points: newPoints };
      }));
      return;
    }

    if (isPanning && panStart.current) {
      setPan({
        x: panStart.current.pan.x + (e.clientX - panStart.current.mouse.x),
        y: panStart.current.pan.y + (e.clientY - panStart.current.mouse.y),
      });
    }
  };

  const handleMouseUp = () => {
    if (draggingVertex) {
      pushHistory([...polygons]);
      setDraggingVertex(null);
    }
    setIsPanning(false);
    panStart.current = null;
  };

  const handleDoubleClick = (_e: React.MouseEvent) => {
    if (activeTool === "draw" && inProgressPoints.length >= 3) {
      const newPoly: Polygon = {
        id: Date.now().toString(),
        points: inProgressPoints,
        closed: true,
      };
      pushHistory([...polygons, newPoly]);
      setInProgressPoints([]);
    }
  };

  // ── split helper ──
  const splitPolygon = (polyId: string, p1: Point, p2: Point) => {
    const poly = polygons.find(p => p.id === polyId);
    if (!poly || !poly.closed) return;

    // Find intersection of split line with polygon edges
    const intersections: { idx: number; pt: Point; t: number }[] = [];
    for (let i = 0; i < poly.points.length; i++) {
      const a = poly.points[i];
      const b = poly.points[(i + 1) % poly.points.length];
      const ip = lineIntersect(p1, p2, a, b);
      if (ip) intersections.push({ idx: i, pt: ip, t: 0 });
    }
    if (intersections.length < 2) return;

    const [int1, int2] = intersections.slice(0, 2);
    const pts = poly.points;
    const n = pts.length;

    const half1: Point[] = [int1.pt];
    for (let i = (int1.idx + 1) % n; i !== (int2.idx + 1) % n; i = (i + 1) % n) {
      half1.push(pts[i]);
      if (half1.length > n + 2) break;
    }
    half1.push(int2.pt);

    const half2: Point[] = [int2.pt];
    for (let i = (int2.idx + 1) % n; i !== (int1.idx + 1) % n; i = (i + 1) % n) {
      half2.push(pts[i]);
      if (half2.length > n + 2) break;
    }
    half2.push(int1.pt);

    if (half1.length >= 3 && half2.length >= 3) {
      const newPolys = polygons.filter(p => p.id !== polyId).concat([
        { id: Date.now() + "a", points: half1, closed: true },
        { id: Date.now() + "b", points: half2, closed: true },
      ]);
      pushHistory(newPolys);
    }
  };

  function lineIntersect(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
    const d1 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const d2 = { x: p4.x - p3.x, y: p4.y - p3.y };
    const cross = d1.x * d2.y - d1.y * d2.x;
    if (Math.abs(cross) < 1e-10) return null;
    const t = ((p3.x - p1.x) * d2.y - (p3.y - p1.y) * d2.x) / cross;
    const u = ((p3.x - p1.x) * d1.y - (p3.y - p1.y) * d1.x) / cross;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return { x: p1.x + t * d1.x, y: p1.y + t * d1.y };
    }
    return null;
  }

  function isPointInPolygon(pt: Point, pts: Point[]): boolean {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
      if ((yi > pt.y) !== (yj > pt.y) && pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
    return inside;
  }

  const handleClearAll = () => {
    pushHistory([]);
    setInProgressPoints([]);
    setSplitPoints([]);
    setActivePolyId(null);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.25, 6));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.25, 0.3));
  const handleResetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  // map backgrounds
  const mapBg = viewMode === "satellite"
    ? "linear-gradient(160deg, #3a7bd5 0%, #2c5f8a 30%, #4a8f4a 55%, #8fbc5a 75%, #c9a84c 100%)"
    : "linear-gradient(160deg, #d4e8c2 0%, #b8d4a0 25%, #c8ddb0 50%, #dde8c8 75%, #e8f0d8 100%)";

  const areaAcres = totalArea.toFixed(2);
  const areaSqFt = Math.round(totalArea * 43560).toLocaleString();

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans">
      <div className="px-8 py-7 pb-10 max-w-[1320px] mx-auto">
        <button className="inline-flex items-center gap-1.5 bg-white border border-[#e0e0e0] rounded-[22px] px-4 py-[7px] text-[13px] font-medium text-[#222] cursor-pointer mb-5 hover:bg-gray-50 transition-colors" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Go back
        </button>
        <h1 className="text-[28px] font-bold text-[#111] m-0 mb-5 tracking-tight">Create Pool</h1>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ── MAP ── */}
          <div className="flex-1 min-w-0 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-full">
            <div
              className="relative w-full h-[680px] overflow-hidden select-none"
              style={{ background: mapBg, cursor: getCursor() }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDoubleClick={handleDoubleClick}
            >
              {/* SVG drawing layer */}
              <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
                  {/* Map view grid lines */}
                  {viewMode === "map" && (
                    <>
                      {[100, 200, 300, 400, 500, 600, 700].map(x => (
                        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={800} stroke="#ccc" strokeWidth={0.5 / zoom} />
                      ))}
                      {[80, 160, 240, 320, 400, 480].map(y => (
                        <line key={`h${y}`} x1={0} y1={y} x2={900} y2={y} stroke="#ccc" strokeWidth={0.5 / zoom} />
                      ))}
                    </>
                  )}

                  {/* Closed polygons */}
                  {polygons.map(poly => (
                    <g key={poly.id}>
                      {poly.closed && (
                        <path
                          d={pointsToPath(poly.points)}
                          fill={activePolyId === poly.id ? "rgba(100,180,40,0.55)" : "rgba(163,214,40,0.72)"}
                          stroke={activePolyId === poly.id ? "#2a2" : "rgba(20,20,20,0.7)"}
                          strokeWidth={2 / zoom}
                          style={{ cursor: activeTool === "delete" ? "not-allowed" : activeTool === "edit" ? "default" : "pointer" }}
                          onClick={() => {
                            if (activeTool === null) setActivePolyId(poly.id === activePolyId ? null : poly.id);
                          }}
                        />
                      )}
                      {/* Vertices in edit mode */}
                      {activeTool === "edit" && poly.points.map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x} cy={pt.y} r={6 / zoom}
                          fill="white" stroke="#2244cc" strokeWidth={2 / zoom}
                          style={{ cursor: "grab", pointerEvents: "all" }}
                        />
                      ))}
                    </g>
                  ))}

                  {/* In-progress polygon */}
                  {inProgressPoints.length > 0 && (
                    <g>
                      {inProgressPoints.length > 1 && (
                        <polyline
                          points={inProgressPoints.map(p => `${p.x},${p.y}`).join(" ")}
                          fill="none" stroke="#2244cc" strokeWidth={2 / zoom} strokeDasharray={`${6 / zoom},${3 / zoom}`}
                        />
                      )}
                      {mousePos && (
                        <line
                          x1={inProgressPoints[inProgressPoints.length - 1].x}
                          y1={inProgressPoints[inProgressPoints.length - 1].y}
                          x2={mousePos.x} y2={mousePos.y}
                          stroke="#2244cc" strokeWidth={1.5 / zoom} strokeDasharray={`${4 / zoom},${4 / zoom}`}
                        />
                      )}
                      {inProgressPoints.map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r={i === 0 ? 7 / zoom : 4 / zoom}
                          fill={i === 0 ? "#2244cc" : "white"} stroke="#2244cc" strokeWidth={2 / zoom}
                        />
                      ))}
                      {/* Close hint ring */}
                      {inProgressPoints.length > 2 && mousePos && dist(mousePos, inProgressPoints[0]) < 12 / zoom && (
                        <circle cx={inProgressPoints[0].x} cy={inProgressPoints[0].y} r={10 / zoom}
                          fill="none" stroke="#22cc44" strokeWidth={2 / zoom}
                        />
                      )}
                    </g>
                  )}

                  {/* Split line preview */}
                  {splitPoints.length === 1 && mousePos && (
                    <line
                      x1={splitPoints[0].x} y1={splitPoints[0].y}
                      x2={mousePos.x} y2={mousePos.y}
                      stroke="#f90" strokeWidth={2 / zoom} strokeDasharray={`${6 / zoom},${3 / zoom}`}
                    />
                  )}
                </g>
              </svg>

              {/* Floating label */}
              <div className="absolute top-4 right-4 bg-white rounded-xl px-[18px] py-3 shadow-[0_2px_12px_rgba(0,0,0,0.15)] z-10 pointer-events-none">
                <div className="text-[17px] font-extrabold text-[#111] tracking-[-0.3px]">HYDERABAD – TG</div>
                <div className="text-[9px] font-semibold text-[#888] tracking-[0.8px] mt-1.5 uppercase">ASSIGNED ID</div>
                <div className="text-[13px] font-bold text-[#111] mt-0.5">GLCSOS - 045</div>
              </div>

              {/* Undo / Redo */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button 
                  className={`inline-flex items-center gap-1.5 bg-white border-none rounded-lg px-4 py-2 text-[13px] font-medium text-[#333] cursor-pointer shadow-[0_1px_6px_rgba(0,0,0,0.15)] transition-opacity ${history.length <= 1 ? "opacity-40" : "opacity-100 hover:bg-gray-50"}`}
                  onClick={undo}
                  disabled={history.length <= 1}
                >
                  <UndoIcon /> Undo
                </button>
                <button 
                  className={`inline-flex items-center gap-1.5 bg-white border-none rounded-lg px-4 py-2 text-[13px] font-medium text-[#333] cursor-pointer shadow-[0_1px_6px_rgba(0,0,0,0.15)] transition-opacity ${redoStack.length === 0 ? "opacity-40" : "opacity-100 hover:bg-gray-50"}`}
                  onClick={redo}
                  disabled={redoStack.length === 0}
                >
                  <RedoIcon /> Redo
                </button>
              </div>

              {/* Tool panel */}
              <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.15)] z-10 min-w-[170px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold text-[#888] tracking-[1px] uppercase px-1.5 pt-0.5 pb-1.5">DRAW TOOLS</span>
                  {([
                    { id: "draw", icon: <DrawPolygonIcon />, label: "Draw Polygon" },
                    { id: "edit", icon: <EditPolygonIcon />, label: "Edit Polygon" },
                    { id: "split", icon: <SplitPolygonIcon />, label: "Split Polygon" },
                    { id: "delete", icon: <DeleteIcon />, label: "Delete Polygon", danger: true },
                  ] as { id: string; icon: React.ReactNode; label: string; danger?: boolean }[]).map(({ id, icon, label, danger }) => (
                    <button
                      key={id}
                      className={`flex items-center gap-2 bg-transparent border-none rounded-md px-2 py-[7px] text-[13px] font-medium cursor-pointer text-left transition-colors w-full ${activeTool === id && !danger ? "bg-[#f0f4ff] text-[#2244cc]" : activeTool === id && danger ? "bg-[#ffeaea] text-[#c00]" : danger ? "text-[#e53535] hover:bg-gray-50" : "text-[#333] hover:bg-gray-50"}`}
                      onClick={() => {
                        setActiveTool(activeTool === id ? null : id as DrawTool);
                        setInProgressPoints([]);
                        setSplitPoints([]);
                      }}
                      title={label}
                    >
                      {icon}<span>{label}</span>
                    </button>
                  ))}
                  <button className="flex items-center gap-2 bg-transparent border-none rounded-md px-2 py-[7px] text-[13px] font-medium text-[#555] cursor-pointer text-left hover:bg-gray-50 transition-colors w-full" onClick={handleClearAll}>
                    <ClearAllIcon /><span>Clear All</span>
                  </button>
                </div>

                <div className="flex flex-col gap-0.5 mt-2 border-t border-[#f0f0f0] pt-2">
                  <span className="text-[9px] font-bold text-[#888] tracking-[1px] uppercase px-1.5 pt-0.5 pb-1.5">VIEW</span>
                  {([
                    { id: "map", icon: <MapViewIcon />, label: "Map View" },
                    { id: "satellite", icon: <SatelliteIcon />, label: "Satellite" },
                  ] as { id: ViewMode; icon: React.ReactNode; label: string }[]).map(({ id, icon, label }) => (
                    <button
                      key={id}
                      className={`flex items-center gap-2 bg-transparent border-none rounded-md px-2 py-[7px] text-[13px] font-medium cursor-pointer text-left transition-colors w-full ${viewMode === id ? "bg-[#f5f5f5] font-bold text-[#333]" : "text-[#333] hover:bg-gray-50"}`}
                      onClick={() => setViewMode(id)}
                    >
                      {icon}<span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status hint */}
              {activeTool && (
                <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 bg-black/75 text-white rounded-lg px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap pointer-events-none z-10">
                  {activeTool === "draw" && inProgressPoints.length === 0 && "Click to start drawing a polygon"}
                  {activeTool === "draw" && inProgressPoints.length > 0 && inProgressPoints.length < 3 && `${inProgressPoints.length} point(s) — click to add more`}
                  {activeTool === "draw" && inProgressPoints.length >= 3 && "Click first point to close · Double-click to finish"}
                  {activeTool === "edit" && "Drag vertex handles to reshape polygons"}
                  {activeTool === "split" && splitPoints.length === 0 && "Click start point of split line"}
                  {activeTool === "split" && splitPoints.length === 1 && "Click end point to split polygon"}
                  {activeTool === "delete" && "Click a polygon to delete it"}
                </div>
              )}

              {/* Zoom controls */}
              <div className="absolute bottom-[64px] right-4 flex flex-col bg-black/85 rounded-lg overflow-hidden z-10">
                <button className="w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:bg-black transition-colors" onClick={handleZoomIn}><PlusIcon /></button>
                <button className="w-9 h-9 flex items-center justify-center bg-transparent border-none border-t border-white/20 cursor-pointer p-0 hover:bg-black transition-colors" onClick={handleZoomOut}><MinusIcon /></button>
              </div>

              {/* Location / reset */}
              <button className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center bg-black/85 border-none rounded-lg cursor-pointer text-white z-10 hover:bg-black transition-colors" onClick={handleResetView} title="Reset view"><LocationPinIcon /></button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="w-full lg:w-[290px] shrink-0 flex flex-col gap-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-0.5 custom-scrollbar">
            {/* Pool Details */}
            <div className="bg-white rounded-2xl p-5 pb-4 shadow-[0_1px_6px_rgba(0,0,0,0.07)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-bold text-[#111]">Pool Details</span>
                <button className="bg-transparent border-none cursor-pointer text-[#666] p-0.5 flex items-center hover:text-black transition-colors"><CloseIcon /></button>
              </div>

              <Field label="Location">
                <SelectField value={location} onChange={setLocation} options={["Hyderabad, Telangana", "Mumbai, Maharashtra", "Bengaluru, Karnataka", "Chennai, Tamil Nadu", "Pune, Maharashtra"]} />
              </Field>

              <Field label="Farmland ID">
                <input className="w-full border-[1.5px] border-[#e8e8e8] rounded-lg py-[9px] px-3 text-[13px] font-medium text-[#222] outline-none box-border bg-gray-50 text-gray-500 cursor-not-allowed" value={farmlandId} readOnly />
              </Field>

              <Field label="Selected Pool">
                <SelectField value={selectedPool} onChange={setSelectedPool} options={["Pool A", "Pool B", "Pool C", "Pool D"]} />
              </Field>

              <Field label="Area (Auto Calculated)">
                <div className="border-[1.5px] border-[#e8e8e8] rounded-lg py-[9px] px-3 flex items-center justify-between bg-gray-50">
                  <div className="flex flex-col">
                    <div className="text-[14px] font-bold text-[#111] leading-tight">{areaAcres} Acres</div>
                    <div className="text-[11px] text-[#888] mt-px">{areaSqFt} Sq.ft</div>
                  </div>
                  <span className="text-[#888] flex items-center"><LockIcon /></span>
                </div>
              </Field>
            </div>

            {/* Investment Information */}
            <div className="bg-white rounded-2xl p-5 pb-4 shadow-[0_1px_6px_rgba(0,0,0,0.07)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[15px] font-bold text-[#111]">Investment Information</span>
              </div>

              <Field label="Target Amount (₹)">
                <input className="w-full border-[1.5px] border-[#e8e8e8] rounded-lg py-[9px] px-3 text-[13px] font-medium text-[#222] outline-none box-border bg-white focus:border-[#8fbc2a] transition-colors" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="e.g. 1,00,00,000" />
              </Field>

              <Field label="Minimum Investment (₹)">
                <input className="w-full border-[1.5px] border-[#e8e8e8] rounded-lg py-[9px] px-3 text-[13px] font-medium text-[#222] outline-none box-border bg-white focus:border-[#8fbc2a] transition-colors" value={minInvestment} onChange={e => setMinInvestment(e.target.value)} placeholder="e.g. 50,000" />
              </Field>

              <Field label="Lock-in Period">
                <SelectField value={lockInPeriod} onChange={setLockInPeriod} options={["12 Months", "24 Months", "36 Months", "48 Months", "60 Months"]} />
              </Field>

              <button type="button" className="w-full bg-[#2a2f1e] text-white border-none rounded-lg py-[13px] text-[14px] font-semibold cursor-pointer mt-1.5 mb-2 tracking-[0.1px] hover:bg-black transition-colors" onClick={(e) => {
                e.preventDefault();
                const poolId = `POOL-${Date.now()}`;
                const newPool = {
                  id: poolId,
                  name: selectedPool,
                  area: `${areaAcres} Acres`,
                  location: location,
                  farmlandId: farmlandId,
                  targetAmount: targetAmount,
                  minInvestment: minInvestment,
                  lockInPeriod: lockInPeriod,
                  active: true,
                  createdAt: new Date().toISOString(),
                };
                const updatedPools = [...createdPools, newPool];
                setCreatedPools(updatedPools);
                localStorage.setItem('createdPools', JSON.stringify(updatedPools));
                navigate("/super-admin/pool-buying/created");
              }}>Save Pool Details</button>
              <button className="w-full bg-transparent text-[#333] border-none rounded-lg py-2 text-[14px] font-medium cursor-pointer hover:bg-gray-50 transition-colors">Cancel</button>
            </div>

            {/* Polygon summary */}
            {polygons.length > 0 && (
              <div className="bg-white rounded-2xl p-5 pb-4 shadow-[0_1px_6px_rgba(0,0,0,0.07)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[15px] font-bold text-[#111]">Drawn Polygons ({polygons.length})</span>
                </div>
                {polygons.map((poly, i) => (
                  <div
                    key={poly.id}
                    className={`flex items-center gap-2.5 p-2 px-1.5 rounded-lg cursor-pointer mb-1 transition-colors ${activePolyId === poly.id ? "bg-[#f0f4ff]" : "bg-transparent hover:bg-gray-50"}`}
                    onClick={() => setActivePolyId(poly.id === activePolyId ? null : poly.id)}
                  >
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#a3d628]/90 border-[1.5px] border-[#555] shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-[13px] font-semibold text-[#222]">Polygon {i + 1}</div>
                      <div className="text-[11px] text-[#888]">{poly.points.length} pts · {polygonArea(poly.points).toFixed(3)} ac</div>
                    </div>
                    <button
                      className="ml-auto bg-transparent border-none cursor-pointer text-[#bbb] flex p-0.5 hover:text-black transition-colors"
                      onClick={e => { e.stopPropagation(); pushHistory(polygons.filter(p => p.id !== poly.id)); }}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3.5">
      <label className="block text-[11.5px] font-medium text-[#666] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select className="w-full border-[1.5px] border-[#e8e8e8] rounded-lg py-[9px] pl-3 pr-9 text-[13px] font-medium text-[#222] outline-none appearance-none bg-white cursor-pointer box-border focus:border-[#8fbc2a] transition-colors" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]"><ChevronDownIcon /></span>
    </div>
  );
}