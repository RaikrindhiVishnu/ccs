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
      className={`
        w-7.5 h-7.5 rounded-full flex items-center justify-center p-0 shrink-0 cursor-pointer text-[12px] font-sans
        ${active 
          ? "bg-(--primary) text-(--sidebar-text) font-semibold border-none" 
          : "bg-(--card) text-(--foreground) font-normal border border-(--border)"}
      `}
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
      className="w-full overflow-hidden font-sans flex flex-col bg-(--card) border border-(--border) rounded-lg"
      style={{ 
        height: height ?? "100%", 
        minHeight: 180,
        // @ts-ignore
        "--row-padding": `${rowPadding}px`,
        "--header-fs": `${headerFontSize}px`,
        "--body-fs": `${bodyFontSize}px`,
      } as React.CSSProperties}
    >
      <div className="flex-1 w-full overflow-x-auto flex flex-col">
        <table className="w-full h-full border-collapse table-fixed min-w-70">
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
                  className="bg-(--primary) py-3.75 px-0 text-center font-sans font-semibold text-(length:--header-fs) leading-5 tracking-[0.23px] uppercase text-(--sidebar-text) border-none whitespace-nowrap align-middle"
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
                    className={`
                      py-(--row-padding) px-0 text-center font-sans font-medium text-(length:--body-fs) leading-4.5 text-(--muted)
                      bg-(--card) border-none overflow-hidden text-ellipsis whitespace-nowrap align-middle
                      ${colIdx === 0 ? "underline" : "no-underline"}
                    `}
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
                      className="py-(--row-padding) px-0 bg-(--card) border-none"
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
          className="flex justify-between items-center px-6 py-3 border-t border-(--border) flex-wrap gap-2 shrink-0"
        >
          <span className="font-sans font-normal text-[12px] text-(--muted-strong) whitespace-nowrap">
            {(page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, data.length)} of {data.length}
          </span>

          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={!canPrev}
              className={`
                w-7.5 h-7.5 rounded-full border border-(--border) flex items-center justify-center p-0
                ${canPrev ? "bg-(--card) text-(--foreground) cursor-pointer" : "bg-(--input) text-(--muted-strong) cursor-not-allowed"}
              `}
            >
              <ChevronLeft size={14} />
            </button>

            {pageNumbers[0] > 1 && (
              <>
                <PagBtn n={1} current={page} onClick={goTo} />
                {pageNumbers[0] > 2 && (
                  <span className="text-[12px] text-(--muted-strong) px-0.5">…</span>
                )}
              </>
            )}

            {pageNumbers.map((n) => (
              <PagBtn key={n} n={n} current={page} onClick={goTo} />
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <span className="text-[12px] text-(--muted-strong) px-0.5">…</span>
                )}
                <PagBtn n={totalPages} current={page} onClick={goTo} />
              </>
            )}

            {/* Next */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={!canNext}
              className={`
                w-7.5 h-7.5 rounded-full border border-(--border) flex items-center justify-center p-0
                ${canNext ? "bg-(--card) text-(--foreground) cursor-pointer" : "bg-(--input) text-(--muted-strong) cursor-not-allowed"}
              `}
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