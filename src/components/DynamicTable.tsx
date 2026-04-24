import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
export interface Column {
  key: string;
  label: string;
}

export interface DynamicTableProps {
  columns?: Column[];
  data?: Record<string, string | number>[];
  rowsPerPage?: number;
  pagination?: boolean;
  /**
   * Optional explicit height — any valid CSS value e.g. "444px", "60vh", "100%".
   * Defaults to "100%" (fills parent).
   */
  height?: string;
}

// ─────────────────────────────────────────────
//  DATA LAYER — separated, pass via props
// ─────────────────────────────────────────────
export const TABLE_COLUMNS: Column[] = [
  { key: "state",  label: "State"  },
  { key: "region", label: "Region" },
  { key: "area",   label: "Area"   },
];

export const TABLE_DATA: Record<string, string | number>[] = [
  { state: "Andhra Pradesh", region: 44,  area: 446 },
  { state: "Telangana",      region: 15,  area: 450 },
  { state: "Tamil Nadu",     region: 44,  area: 436 },
  { state: "Karnataka",      region: 69,  area: 239 },
  { state: "Maharashtra",    region: 112, area: 567 },
  { state: "Gujarat",        region: 43,  area: 113 },
  { state: "Kerala",         region: 19,  area: 142 },
];

// ─────────────────────────────────────────────
//  Chevron icons
// ─────────────────────────────────────────────
const ChevronLeft: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────
//  Pagination button
// ─────────────────────────────────────────────
const PagBtn: React.FC<{ n: number; current: number; onClick: (n: number) => void }> = ({
  n, current, onClick,
}) => {
  const active = n === current;
  return (
    <button
      onClick={() => onClick(n)}
      style={{
        width: 30, height: 30,
        borderRadius: "50%",
        border: active ? "none" : "0.983px solid rgba(5,3,3,0.15)",
        background: active ? "#2780C4" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#000000",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: active ? 600 : 400,
        fontSize: 12,
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 0, flexShrink: 0,
      }}
    >
      {n}
    </button>
  );
};

// ─────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────
const DynamicTable: React.FC<DynamicTableProps> = ({
  columns     = TABLE_COLUMNS,
  data        = TABLE_DATA,
  rowsPerPage = 7,
  pagination  = false,
  height,
}) => {
  const [page, setPage] = useState(1);

  // When pagination=false, show ALL data; when true, slice by page
  const totalPages     = pagination ? Math.ceil(data.length / rowsPerPage) : 1;
  const showPagination = pagination && totalPages > 1;

  const pageData = useMemo(() => {
    if (!pagination) return data;                                           // show all rows
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);       // paginated slice
  }, [data, page, rowsPerPage, pagination]);

  const goTo    = (p: number) => setPage(Math.max(1, Math.min(totalPages, p)));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++)
      range.push(i);
    return range;
  }, [page, totalPages]);

  // ── Equal column width ──
  const colWidth = `${100 / columns.length}%`;

  // ── Refs ──
  const wrapRef  = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const pagRef   = useRef<HTMLDivElement>(null);

  // ── Responsive row padding (height) ──
  // When pagination=false, rows fill the full container; no fixed rowsPerPage limit
  const [rowPadding, setRowPadding] = useState(20);

  // ── Responsive font sizes (width) ──
  const [headerFontSize, setHeaderFontSize] = useState(16);
  const [bodyFontSize,   setBodyFontSize]   = useState(14);

  // Effective row count for recalc:
  // paginated → always rowsPerPage slots; non-paginated → actual data length
  const effectiveRowCount = pagination ? rowsPerPage : pageData.length;

  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const W = wrap.clientWidth;
    const H = wrap.clientHeight;

    // Font scales with width (Figma base: 852px)
    const scaleW = W / 852;
    setHeaderFontSize(Math.max(10, Math.min(16, Math.round(16 * scaleW))));
    setBodyFontSize  (Math.max(9,  Math.min(14, Math.round(14 * scaleW))));

    // Row padding: fill available body height evenly
    const headerH = theadRef.current?.offsetHeight ?? 50;
    const pagH    = showPagination && pagRef.current ? pagRef.current.offsetHeight : 0;
    const bodyH   = H - headerH - pagH;
    const LINE_H  = 18; // Figma line-height
    const rows    = effectiveRowCount || 1;
    const pad     = Math.max(6, (bodyH / rows - LINE_H) / 2);
    setRowPadding(Math.floor(pad));
  }, [effectiveRowCount, showPagination]);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (wrapRef.current)                ro.observe(wrapRef.current);
    if (wrapRef.current?.parentElement) ro.observe(wrapRef.current.parentElement);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  return (
    <div
      ref={wrapRef}
      style={{
        background: "#FCFCFC",
        border: "0.983129px solid rgba(5,3,3,0.15)",
        borderRadius: 22.1204,
        width: "100%",
        height: height ?? "100%",
        minHeight: 180,
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── ONE single table — header + body share identical colgroup ── */}
      <div style={{ flex: 1, width: "100%", overflowX: "auto", display: "flex", flexDirection: "column" }}>
        <table
          style={{
            width: "100%",
            height: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            minWidth: 280,
          }}
        >
          {/* Shared colgroup — guarantees header & body columns are pixel-perfect */}
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: colWidth }} />
            ))}
          </colgroup>

          {/* ── HEADER ── */}
          <thead ref={theadRef}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    background: "#2780C4",
                    padding: "15px 0",
                    textAlign: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: headerFontSize,
                    lineHeight: "20px",
                    letterSpacing: "0.228067px",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    border: "none",
                    whiteSpace: "nowrap",
                    verticalAlign: "middle",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* ── BODY ── */}
          <tbody>
            {pageData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key}
                    style={{
                      padding: `${rowPadding}px 0`,
                      textAlign: "center",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: bodyFontSize,
                      lineHeight: "18px",
                      color: "#000000",
                      opacity: 0.6,
                      textDecorationLine: colIdx === 0 ? "underline" : "none",
                      background: "#FCFCFC",
                      border: "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                    }}
                  >
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}

            {/* Filler rows — only shown when pagination=true, to keep fixed row slots */}
            {pagination && pageData.length < rowsPerPage &&
              Array.from({ length: rowsPerPage - pageData.length }).map((_, i) => (
                <tr key={`empty-${i}`}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: `${rowPadding}px 0`,
                        background: "#FCFCFC",
                        border: "none",
                      }}
                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination — only shown when pagination=true AND data > rowsPerPage ── */}
      {showPagination && (
        <div
          ref={pagRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            borderTop: "1px solid rgba(5,3,3,0.08)",
            flexWrap: "wrap",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#000000",
              opacity: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            {(page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, data.length)} of {data.length}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Prev */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={!canPrev}
              style={{
                width: 30, height: 30, borderRadius: "50%",
                border: "0.983px solid rgba(5,3,3,0.15)",
                background: canPrev ? "#FFFFFF" : "rgba(5,3,3,0.04)",
                color: canPrev ? "#000" : "rgba(0,0,0,0.3)",
                cursor: canPrev ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
              }}
            >
              <ChevronLeft size={14} />
            </button>

            {pageNumbers[0] > 1 && (
              <>
                <PagBtn n={1} current={page} onClick={goTo} />
                {pageNumbers[0] > 2 && <span style={{ fontSize: 12, opacity: 0.4, padding: "0 2px" }}>…</span>}
              </>
            )}

            {pageNumbers.map((n) => (
              <PagBtn key={n} n={n} current={page} onClick={goTo} />
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span style={{ fontSize: 12, opacity: 0.4, padding: "0 2px" }}>…</span>
                )}
                <PagBtn n={totalPages} current={page} onClick={goTo} />
              </>
            )}

            {/* Next */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={!canNext}
              style={{
                width: 30, height: 30, borderRadius: "50%",
                border: "0.983px solid rgba(5,3,3,0.15)",
                background: canNext ? "#FFFFFF" : "rgba(5,3,3,0.04)",
                color: canNext ? "#000" : "rgba(0,0,0,0.3)",
                cursor: canNext ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;

// ─────────────────────────────────────────────
//  USAGE EXAMPLES
// ─────────────────────────────────────────────
//
//  Import the data layer and component separately:
//    import DynamicTable, { TABLE_COLUMNS, TABLE_DATA } from "./DynamicTable";
//
//  1. Figma default — 7 rows, no pagination, fills parent height:
//       <DynamicTable
//         columns={TABLE_COLUMNS}
//         data={TABLE_DATA}
//       />
//
//  2. Show ALL rows (no pagination) — height grows to fit:
//       <DynamicTable
//         columns={TABLE_COLUMNS}
//         data={apiData}
//         pagination={false}   // default — shows every row
//       />
//
//  3. Enable pagination — 7 rows per page, footer appears automatically:
//       <DynamicTable
//         columns={TABLE_COLUMNS}
//         data={apiData}
//         rowsPerPage={7}
//         pagination={true}
//       />
//
//  4. Fixed height container (Figma exact size):
//       <DynamicTable
//         columns={TABLE_COLUMNS}
//         data={TABLE_DATA}
//         height="444px"
//       />
//
//  5. Custom columns + API data + pagination:
//       const cols = [
//         { key: "name",  label: "Name"   },
//         { key: "score", label: "Score"  },
//         { key: "rank",  label: "Rank"   },
//       ];
//       <DynamicTable
//         columns={cols}
//         data={myApiData}
//         rowsPerPage={10}
//         pagination={true}
//       />