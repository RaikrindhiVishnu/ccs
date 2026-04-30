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
  height?: string;
}

// ─────────────────────────────────────────────
//  Data layer
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
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: active ? "none" : "1px solid var(--border)",
        background: active ? "var(--primary)" : "var(--card)",
        color: active ? "var(--sidebar-text)" : "var(--foreground)",
        fontFamily: "var(--font-sans)",
        fontWeight: active ? 600 : 400,
        fontSize: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        flexShrink: 0,
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

  const totalPages     = pagination ? Math.ceil(data.length / rowsPerPage) : 1;
  const showPagination = pagination && totalPages > 1;

  const pageData = useMemo(() => {
    if (!pagination) return data;
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
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

  const colWidth = `${100 / columns.length}%`;

  const wrapRef  = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const pagRef   = useRef<HTMLDivElement>(null);

  const [rowPadding,    setRowPadding]    = useState(20);
  const [headerFontSize, setHeaderFontSize] = useState(16);
  const [bodyFontSize,   setBodyFontSize]   = useState(14);

  const effectiveRowCount = pagination ? rowsPerPage : pageData.length;

  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const W = wrap.clientWidth;
    const H = wrap.clientHeight;

    const scaleW = W / 852;
    setHeaderFontSize(Math.max(10, Math.min(16, Math.round(16 * scaleW))));
    setBodyFontSize  (Math.max(9,  Math.min(14, Math.round(14 * scaleW))));

    const headerH = theadRef.current?.offsetHeight ?? 50;
    const pagH    = showPagination && pagRef.current ? pagRef.current.offsetHeight : 0;
    const bodyH   = H - headerH - pagH;
    const LINE_H  = 18;
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
        background:   "var(--card)",
        border:       "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        width:        "100%",
        height:       height ?? "100%",
        minHeight:    180,
        boxSizing:    "border-box",
        overflow:     "hidden",
        fontFamily:   "var(--font-sans)",
        display:      "flex",
        flexDirection: "column",
      }}
    >
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
          <colgroup>
            {columns.map((col) => (
              <col key={col.key} style={{ width: colWidth }} />
            ))}
          </colgroup>

          {/* ── Header ── */}
          <thead ref={theadRef}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    background:      "var(--primary)",
                    padding:         "15px 0",
                    textAlign:       "center",
                    fontFamily:      "var(--font-sans)",
                    fontWeight:      600,
                    fontSize:        headerFontSize,
                    lineHeight:      "20px",
                    letterSpacing:   "0.23px",
                    textTransform:   "uppercase",
                    color:           "var(--sidebar-text)",
                    border:          "none",
                    whiteSpace:      "nowrap",
                    verticalAlign:   "middle",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {pageData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td
                    key={col.key}
                    style={{
                      padding:             `${rowPadding}px 0`,
                      textAlign:           "center",
                      fontFamily:          "var(--font-sans)",
                      fontWeight:          500,
                      fontSize:            bodyFontSize,
                      lineHeight:          "18px",
                      color:               "var(--muted)",
                      textDecorationLine:  colIdx === 0 ? "underline" : "none",
                      background:          "var(--card)",
                      border:              "none",
                      overflow:            "hidden",
                      textOverflow:        "ellipsis",
                      whiteSpace:          "nowrap",
                      verticalAlign:       "middle",
                    }}
                  >
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}

            {/* Filler rows for pagination */}
            {pagination && pageData.length < rowsPerPage &&
              Array.from({ length: rowsPerPage - pageData.length }).map((_, i) => (
                <tr key={`empty-${i}`}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding:    `${rowPadding}px 0`,
                        background: "var(--card)",
                        border:     "none",
                      }}
                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {showPagination && (
        <div
          ref={pagRef}
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            padding:        "12px 24px",
            borderTop:      "1px solid var(--border)",
            flexWrap:       "wrap",
            gap:            8,
            flexShrink:     0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize:   12,
              color:      "var(--muted-strong)",
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
                width:        30,
                height:       30,
                borderRadius: "50%",
                border:       "1px solid var(--border)",
                background:   canPrev ? "var(--card)"       : "var(--input)",
                color:        canPrev ? "var(--foreground)"  : "var(--muted-strong)",
                cursor:       canPrev ? "pointer"            : "not-allowed",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                padding:      0,
              }}
            >
              <ChevronLeft size={14} />
            </button>

            {pageNumbers[0] > 1 && (
              <>
                <PagBtn n={1} current={page} onClick={goTo} />
                {pageNumbers[0] > 2 && (
                  <span style={{ fontSize: 12, color: "var(--muted-strong)", padding: "0 2px" }}>…</span>
                )}
              </>
            )}

            {pageNumbers.map((n) => (
              <PagBtn key={n} n={n} current={page} onClick={goTo} />
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span style={{ fontSize: 12, color: "var(--muted-strong)", padding: "0 2px" }}>…</span>
                )}
                <PagBtn n={totalPages} current={page} onClick={goTo} />
              </>
            )}

            {/* Next */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={!canNext}
              style={{
                width:        30,
                height:       30,
                borderRadius: "50%",
                border:       "1px solid var(--border)",
                background:   canNext ? "var(--card)"       : "var(--input)",
                color:        canNext ? "var(--foreground)"  : "var(--muted-strong)",
                cursor:       canNext ? "pointer"            : "not-allowed",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                padding:      0,
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