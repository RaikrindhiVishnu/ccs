import { useState, useRef, useEffect, useCallback } from "react";
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

  const handleDoubleClick = (e: React.MouseEvent) => {
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
    <div style={s.page}>
    

      <div style={s.content}>
        <button style={s.goBackBtn} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Go back
        </button>
        <h1 style={s.pageTitle}>Create Pool</h1>

        <div style={s.mainLayout}>
          {/* ── MAP ── */}
          <div style={s.mapPanel}>
            <div
              style={{ ...s.mapBg, background: mapBg, cursor: getCursor() }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDoubleClick={handleDoubleClick}
            >
              {/* SVG drawing layer */}
              <svg
                ref={svgRef}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
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
              <div style={s.floatingLabel}>
                <div style={s.floatingLabelTitle}>HYDERABAD – TG</div>
                <div style={s.floatingLabelSub}>ASSIGNED ID</div>
                <div style={s.floatingLabelId}>GLCSOS - 045</div>
              </div>

              {/* Undo / Redo */}
              <div style={s.undoRedoBar}>
                <button style={{ ...s.undoRedoBtn, opacity: history.length <= 1 ? 0.4 : 1 }} onClick={undo}>
                  <UndoIcon /> Undo
                </button>
                <button style={{ ...s.undoRedoBtn, opacity: redoStack.length === 0 ? 0.4 : 1 }} onClick={redo}>
                  <RedoIcon /> Redo
                </button>
              </div>

              {/* Tool panel */}
              <div style={s.toolPanel}>
                <div style={s.toolPanelSection}>
                  <span style={s.toolPanelLabel}>DRAW TOOLS</span>
                  {([
                    { id: "draw", icon: <DrawPolygonIcon />, label: "Draw Polygon" },
                    { id: "edit", icon: <EditPolygonIcon />, label: "Edit Polygon" },
                    { id: "split", icon: <SplitPolygonIcon />, label: "Split Polygon" },
                    { id: "delete", icon: <DeleteIcon />, label: "Delete Polygon" },
                    { id: "clear", icon: <ClearAllIcon />, label: "Clear All" }
                  ] as { id: string; icon: React.ReactNode; label: string; danger?: boolean }[]).map(({ id, icon, label, danger }) => (
                    <button
                      key={id!}
                      style={{
                        ...s.toolBtn,
                        ...(activeTool === id ? s.toolBtnActive : {}),
                        ...(danger && activeTool !== id ? s.toolBtnDanger : {}),
                        ...(danger && activeTool === id ? { background: "#ffeaea", color: "#c00" } : {}),
                      }}
                      onClick={() => {
                        setActiveTool(activeTool === id ? null : id);
                        setInProgressPoints([]);
                        setSplitPoints([]);
                      }}
                      title={label}
                    >
                      {icon}<span>{label}</span>
                    </button>
                  ))}
                  <button style={{ ...s.toolBtn, color: "#555" }} onClick={handleClearAll}>
                    <ClearAllIcon /><span>Clear All</span>
                  </button>
                </div>

                <div style={{ ...s.toolPanelSection, marginTop: 8, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>
                  <span style={s.toolPanelLabel}>VIEW</span>
                  {([
                    { id: "map", icon: <MapViewIcon />, label: "Map View" },
                    { id: "satellite", icon: <SatelliteIcon />, label: "Satellite" },
                  ] as { id: ViewMode; icon: React.ReactNode; label: string }[]).map(({ id, icon, label }) => (
                    <button
                      key={id}
                      style={{ ...s.toolBtn, ...(viewMode === id ? s.toolBtnActiveView : {}) }}
                      onClick={() => setViewMode(id)}
                    >
                      {icon}<span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status hint */}
              {activeTool && (
                <div style={s.statusHint}>
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
              <div style={s.zoomControls}>
                <button style={s.zoomBtn} onClick={handleZoomIn}><PlusIcon /></button>
                <button style={{ ...s.zoomBtn, borderTop: "1px solid rgba(255,255,255,0.2)" }} onClick={handleZoomOut}><MinusIcon /></button>
              </div>

              {/* Location / reset */}
              <button style={s.locationBtn} onClick={handleResetView} title="Reset view"><LocationPinIcon /></button>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <div style={s.sidebar}>
            <div>
              {/* Pool Details */}
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={s.cardTitle}>Pool Details</span>
                  <button style={s.closeBtn}><CloseIcon /></button>
                </div>

                <Field label="Location">
                  <SelectField value={location} onChange={setLocation} options={["Hyderabad, Telangana", "Mumbai, Maharashtra", "Bengaluru, Karnataka", "Chennai, Tamil Nadu", "Pune, Maharashtra"]} />
                </Field>

                <Field label="Farmland ID">
                  <input style={s.input} value={farmlandId} readOnly />
                </Field>

                <Field label="Selected Pool">
                  <SelectField value={selectedPool} onChange={setSelectedPool} options={["Pool A", "Pool B", "Pool C", "Pool D"]} />
                </Field>

                <Field label="Area (Auto Calculated)">
                  <div style={s.areaField}>
                    <div>
                      <div style={s.areaValue}>{areaAcres} Acres</div>
                      <div style={s.areaSub}>{areaSqFt} Sq.ft</div>
                    </div>
                    <span style={s.lockIcon}><LockIcon /></span>
                  </div>
                </Field>
              </div>

              {/* Investment Information */}
              <div style={s.card}>
                <div style={s.cardHeader}>
                  <span style={s.cardTitle}>Investment Information</span>
                </div>

                <Field label="Target Amount (₹)">
                  <input style={s.input} value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="e.g. 1,00,00,000" />
                </Field>

                <Field label="Minimum Investment (₹)">
                  <input style={s.input} value={minInvestment} onChange={e => setMinInvestment(e.target.value)} placeholder="e.g. 50,000" />
                </Field>

                <Field label="Lock-in Period">
                  <SelectField value={lockInPeriod} onChange={setLockInPeriod} options={["12 Months", "24 Months", "36 Months", "48 Months", "60 Months"]} />
                </Field>

                <button type="button" style={s.saveBtn} onClick={(e) => {
                  e.preventDefault();
                  const newPool = {
                    name: selectedPool,
                    area: area,
                    location: location,
                    active: true,
                  };
                  const updatedPools = [...createdPools, newPool];
                  setCreatedPools(updatedPools);
                  localStorage.setItem('createdPools', JSON.stringify(updatedPools));
                  navigate("/super-admin/pool-buying/created", { state: { selectedPool, location, targetAmount, minInvestment, lockInPeriod, farmlandId, createdPools: updatedPools } });
                }}>Save Pool Details</button>
                <button style={s.cancelBtn}>Cancel</button>
              </div>

              {/* Polygon summary */}
              {polygons.length > 0 && (
                <div style={s.card}>
                  <div style={s.cardHeader}>
                    <span style={s.cardTitle}>Drawn Polygons ({polygons.length})</span>
                  </div>
                  {polygons.map((poly, i) => (
                    <div
                      key={poly.id}
                      style={{
                        ...s.polyRow,
                        background: activePolyId === poly.id ? "#f0f4ff" : "transparent",
                      }}
                      onClick={() => setActivePolyId(poly.id === activePolyId ? null : poly.id)}
                    >
                      <div style={s.polyDot} />
                      <div>
                        <div style={s.polyRowName}>Polygon {i + 1}</div>
                        <div style={s.polyRowSub}>{poly.points.length} pts · {polygonArea(poly.points).toFixed(3)} ac</div>
                      </div>
                      <button
                        style={s.polyDeleteBtn}
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
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={s.fieldGroup}>
      <label style={s.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div style={s.selectWrapper}>
      <select style={s.select} value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <span style={s.selectChevron}><ChevronDownIcon /></span>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f0f0f0", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  topBar: { background: "#1a1a1a", padding: "10px 24px" },
  breadcrumb: { color: "#aaa", fontSize: 12 },
  content: { padding: "28px 32px 40px", maxWidth: 1320, margin: "0 auto" },
  goBackBtn: { display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #e0e0e0", borderRadius: 22, padding: "7px 16px", fontSize: 13, fontWeight: 500, color: "#222", cursor: "pointer", marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 20px", letterSpacing: -0.3 },
  mainLayout: { display: "flex", gap: 20, alignItems: "flex-start" },

  mapPanel: { flex: 1, minWidth: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" },
  mapBg: { position: "relative", width: "100%", height: 680, overflow: "hidden", userSelect: "none" },

  floatingLabel: { position: "absolute", top: 16, right: 16, background: "white", borderRadius: 12, padding: "12px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", zIndex: 10, pointerEvents: "none" },
  floatingLabelTitle: { fontSize: 17, fontWeight: 800, color: "#111", letterSpacing: -0.3 },
  floatingLabelSub: { fontSize: 9, fontWeight: 600, color: "#888", letterSpacing: 0.8, marginTop: 6, textTransform: "uppercase" },
  floatingLabelId: { fontSize: 13, fontWeight: 700, color: "#111", marginTop: 2 },

  undoRedoBar: { position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 },
  undoRedoBtn: { display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 500, color: "#333", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.15)", transition: "opacity 0.15s" },

  toolPanel: { position: "absolute", top: 16, left: 16, background: "white", borderRadius: 12, padding: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", zIndex: 10, minWidth: 170 },
  toolPanelSection: { display: "flex", flexDirection: "column", gap: 2 },
  toolPanelLabel: { fontSize: 9, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", padding: "2px 6px 6px" },
  toolBtn: { display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", borderRadius: 7, padding: "7px 8px", fontSize: 13, fontWeight: 500, color: "#333", cursor: "pointer", textAlign: "left", transition: "background 0.12s", width: "100%" },
  toolBtnActive: { background: "#f0f4ff", color: "#2244cc" },
  toolBtnActiveView: { background: "#f5f5f5", fontWeight: 700 },
  toolBtnDanger: { color: "#e53535" },

  statusHint: { position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", background: "rgba(20,20,20,0.75)", color: "white", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 10 },

  zoomControls: { position: "absolute", bottom: 64, right: 16, display: "flex", flexDirection: "column", background: "rgba(30,30,30,0.85)", borderRadius: 8, overflow: "hidden", zIndex: 10 },
  zoomBtn: { width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", padding: 0 },
  locationBtn: { position: "absolute", bottom: 16, right: 16, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(30,30,30,0.85)", border: "none", borderRadius: 8, cursor: "pointer", color: "white", zIndex: 10 },

  sidebar: { width: 290, flexShrink: 0 },
  sidebarScroll: { display: "flex", flexDirection: "column", gap: 16, maxHeight: "calc(100vh - 180px)", overflowY: "auto", paddingRight: 2 },

  card: { background: "white", borderRadius: 16, padding: "20px 20px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: 16 },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#111" },
  closeBtn: { background: "transparent", border: "none", cursor: "pointer", color: "#666", padding: 2, display: "flex", alignItems: "center" },

  fieldGroup: { marginBottom: 14 },
  fieldLabel: { display: "block", fontSize: 11.5, fontWeight: 500, color: "#666", marginBottom: 5 },
  input: { width: "100%", border: "1.5px solid #e8e8e8", borderRadius: 8, padding: "9px 12px", fontSize: 13, fontWeight: 500, color: "#222", outline: "none", boxSizing: "border-box", background: "white" },
  selectWrapper: { position: "relative" },
  select: { width: "100%", border: "1.5px solid #e8e8e8", borderRadius: 8, padding: "9px 36px 9px 12px", fontSize: 13, fontWeight: 500, color: "#222", outline: "none", appearance: "none", background: "white", cursor: "pointer", boxSizing: "border-box" },
  selectChevron: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#555" },

  areaField: { border: "1.5px solid #e8e8e8", borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  areaValue: { fontSize: 14, fontWeight: 700, color: "#111" },
  areaSub: { fontSize: 11, color: "#888", marginTop: 1 },
  lockIcon: { color: "#888", display: "flex", alignItems: "center" },

  saveBtn: { width: "100%", background: "#2a2f1e", color: "white", border: "none", borderRadius: 10, padding: "13px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 6, marginBottom: 8, letterSpacing: 0.1 },
  cancelBtn: { width: "100%", background: "transparent", color: "#333", border: "none", borderRadius: 10, padding: "8px 0", fontSize: 14, fontWeight: 500, cursor: "pointer" },

  polyRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 6px", borderRadius: 8, cursor: "pointer", marginBottom: 4 },
  polyDot: { width: 10, height: 10, borderRadius: 2, background: "rgba(163,214,40,0.9)", border: "1.5px solid #555", flexShrink: 0 },
  polyRowName: { fontSize: 13, fontWeight: 600, color: "#222" },
  polyRowSub: { fontSize: 11, color: "#888" },
  polyDeleteBtn: { marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", color: "#bbb", display: "flex", padding: 2 },
};