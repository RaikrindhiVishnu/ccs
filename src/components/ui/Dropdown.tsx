import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={cn("shrink-0 text-[color:var(--text-subtle)]", className)}
      style={{ width: "clamp(10px,0.7vw,14px)", height: "clamp(10px,0.7vw,14px)" }}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function DropdownMenu({
  children,
  align = "right",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-1 overflow-hidden",
        "bg-[color:var(--card)]",
        "border border-[color:var(--border)]",
        "rounded-[var(--radius-dropdown)]",
        "shadow-[var(--shadow-dropdown)]",
        "min-w-full",
        align === "right" ? "right-0" : "left-0"
      )}
    >
      {children}
    </div>
  );
}

function MenuItem({
  active,
  onClick,
  children,
  fontVar = "var(--font-sans)",
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  fontVar?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-center gap-2",
        "px-4 py-[clamp(6px,0.5vw,10px)]",
        "text-[length:clamp(11px,0.75vw,14px)]",
        "transition-colors duration-150",
        "hover:bg-[color:var(--primary-soft)]",
        active
          ? "text-[color:var(--chip-bg)] font-medium"
          : "text-[color:var(--text-dark)] font-normal"
      )}
      style={{ fontFamily: fontVar }}
    >
      {children}
    </button>
  );
}

// ─── Shared: Checkbox Tick ────────────────────────────────────────────────────

function CheckboxTick({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 flex items-center justify-center rounded",
        "w-[clamp(14px,1vw,18px)] h-[clamp(14px,1vw,18px)]",
        "border transition-colors duration-150",
        checked
          ? "bg-[color:var(--chip-bg)] border-[color:var(--chip-bg)]"
          : "bg-[color:var(--card)] border-[color:var(--border-medium)]"
      )}
    >
      {checked && (
        <svg viewBox="0 0 10 8" fill="none" className="w-[60%] h-[60%]">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

// ─── Hook: outside click close ────────────────────────────────────────────────

function useOutsideClick(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cb]);
  return ref;
}

export interface PillDropdownProps {
  options?: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function PillDropdown({
  options = ["January", "February", "March"],
  defaultValue,
  value,
  onChange,
  className,
}: PillDropdownProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? options[0]);
  const ref = useOutsideClick(() => setOpen(false));
  const selected = value ?? internal;

  const pick = (val: string) => { setInternal(val); setOpen(false); onChange?.(val); };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-[clamp(6px,0.5vw,10px)]",
          "h-[clamp(32px,2.5vw,44px)] min-w-[clamp(100px,7.5vw,140px)]",
          "px-[clamp(10px,1vw,18px)]",
          "bg-[color:var(--card)]",
          "border border-[color:var(--border)]",
          "rounded-[var(--btn-radius-circle)]",
          "text-[length:clamp(11px,0.8vw,15px)] font-medium",
          "text-[color:var(--text-neutral)]",
          "transition-colors duration-150 cursor-pointer",
          "hover:bg-[color:var(--primary-soft)]"
        )}
        style={{ fontFamily: "var(--btn-font-secondary)" }}
      >
        <span className="flex-1 text-left whitespace-nowrap">{selected}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <DropdownMenu>
          {options.map((opt) => (
            <MenuItem key={opt} active={selected === opt} onClick={() => pick(opt)} fontVar="var(--btn-font-secondary)">
              {opt}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

export interface WeekDropdownProps {
  options?: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function WeekDropdown({
  options = ["Week", "Month", "Quarter", "Year"],
  defaultValue = "Week",
  value,
  onChange,
  className,
}: WeekDropdownProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const ref = useOutsideClick(() => setOpen(false));
  const selected = value ?? internal;

  const pick = (val: string) => { setInternal(val); setOpen(false); onChange?.(val); };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-center gap-[clamp(3px,0.3vw,6px)]",
          "h-[clamp(24px,1.8vw,32px)] w-[clamp(58px,4.5vw,80px)]",
          "px-[clamp(6px,0.6vw,10px)]",
          "bg-transparent",
          "border border-[color:var(--border-strong)]",
          "rounded-[var(--btn-radius-circle)]",
          "text-[length:clamp(10px,0.7vw,13px)] font-normal",
          "text-[color:var(--foreground)]",
          "transition-colors duration-150 cursor-pointer",
          "hover:bg-[color:var(--primary-soft)]"
        )}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {selected}
        <ChevronDown
          className={cn(
            "text-[color:var(--foreground)] transition-transform duration-200",
            open ? "rotate-180" : ""
          )}
        />
      </button>

      {open && (
        <DropdownMenu>
          {options.map((opt) => (
            <MenuItem key={opt} active={selected === opt} onClick={() => pick(opt)}>
              {opt}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

export interface TagPillDropdownProps {
  label?: string;
  options?: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
}

export function TagPillDropdown({
  label = "Options",
  options = ["Option 1", "Option 2", "Option 3"],
  defaultValue,
  value,
  onChange,
  icon,
  className,
}: TagPillDropdownProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? label);
  const ref = useOutsideClick(() => setOpen(false));
  const selected = value ?? internal;

  const pick = (val: string) => { setInternal(val); setOpen(false); onChange?.(val); };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-[clamp(4px,0.4vw,8px)]",
          "h-[clamp(28px,2.2vw,38px)] w-[clamp(110px,8.5vw,150px)]",
          "px-[clamp(8px,0.8vw,14px)]",
          "bg-[color:var(--input)]",
          "border border-[color:var(--border-soft)]",
          "rounded-[var(--btn-radius-pill)]",
          "transition-all duration-150 cursor-pointer",
          "hover:brightness-95"
        )}
      >
        {/* Icon */}
        <span
          className="shrink-0 flex items-center justify-center text-[color:var(--text-subtle)]"
          style={{ width: "clamp(14px,1.1vw,20px)", height: "clamp(14px,1.1vw,20px)" }}
        >
          {icon ?? (
            <svg viewBox="0 0 21 21" fill="none" className="w-full h-full">
              <path d="M3.5 6.5H17.5" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" />
              <path d="M6.5 10.5H14.5" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" />
              <path d="M9.5 14.5H11.5" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" />
            </svg>
          )}
        </span>

        <span
          className={cn(
            "flex-1 text-left truncate font-medium",
            "text-[color:var(--text-dark)]",
            "text-[length:clamp(11px,0.8vw,14px)]"
          )}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {selected}
        </span>

        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <DropdownMenu align="left">
          {options.map((opt) => (
            <MenuItem key={opt} active={selected === opt} onClick={() => pick(opt)}>
              {opt}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

export interface SquareDropdownProps {
  options?: string[];
  defaultValues?: string[];
  placeholder?: string;
  multiSelect?: boolean;
  onChange?: (values: string[]) => void;
  className?: string;
  width?: string;
}

export function SquareDropdown({
  options = ["Rice", "Corn", "Cotton", "Wheat"],
  defaultValues = [],
  placeholder = "Select...",
  multiSelect = true,
  onChange,
  className,
  width = "clamp(280px,25vw,420px)",
}: SquareDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValues);
  const ref = useOutsideClick(() => setOpen(false));

  const toggle = (val: string) => {
    const next = multiSelect
      ? selected.includes(val) ? selected.filter((s) => s !== val) : [...selected, val]
      : selected.includes(val) ? [] : [val];
    setSelected(next);
    onChange?.(next);
    if (!multiSelect) setOpen(false);
  };

  const removeChip = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = selected.filter((s) => s !== val);
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cn("relative", className)} style={{ width }}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative flex items-center w-full cursor-pointer transition-colors duration-150",
          "h-[clamp(44px,3.5vw,60px)]",
          "px-[clamp(14px,1.5vw,26px)]",
          "bg-[color:var(--card)]",
          "border border-[color:var(--border-medium)]",
          "rounded-[var(--btn-radius-rounded)]",
          "hover:border-[color:var(--border-strong)]"
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          {selected.length === 0 ? (
            <span
              className="text-[color:var(--muted-strong)] text-[length:clamp(13px,1.1vw,20px)] font-normal"
              style={{ fontFamily: "var(--btn-font-secondary)" }}
            >
              {placeholder}
            </span>
          ) : (
            selected.map((val) => (
              <span
                key={val}
                className={cn(
                  "shrink-0 flex items-center gap-1",
                  "bg-[color:var(--chip-bg)] text-[color:var(--chip-text)]",
                  "rounded-[6px] font-medium",
                  "px-[clamp(8px,0.8vw,14px)]",
                  "h-[clamp(20px,1.6vw,28px)]",
                  "text-[length:clamp(10px,0.75vw,14px)]",
                  "whitespace-nowrap"
                )}
                style={{ fontFamily: "var(--btn-font-poppins)" }}
              >
                {val}
                <span
                  onClick={(e) => removeChip(val, e)}
                  className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity flex items-center"
                >
                  <svg viewBox="0 0 8 8" fill="none" className="w-[8px] h-[8px]">
                    <path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            ))
          )}
        </div>
        <ChevronDown className={`ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <DropdownMenu align="left">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={cn(
                "w-full text-left flex items-center gap-[clamp(8px,0.6vw,12px)]",
                "px-[clamp(12px,1vw,18px)] py-[clamp(8px,0.6vw,12px)]",
                "text-[length:clamp(11px,0.75vw,14px)]",
                "transition-colors duration-150",
                "hover:bg-[color:var(--primary-soft)]",
                selected.includes(opt)
                  ? "text-[color:var(--chip-bg)]"
                  : "text-[color:var(--text-dark)]"
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {multiSelect && <CheckboxTick checked={selected.includes(opt)} />}
              {opt}
            </button>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}
export interface CheckboxDropdownProps {
  options?: string[];
  defaultValues?: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
  width?: string;
}

export function CheckboxDropdown({
  options = ["Rice", "Corn", "Cotton", "Wheat", "Sun Flower", "Sugar Cane"],
  defaultValues = [],
  placeholder = "Select crops...",
  searchPlaceholder = "Search...",
  onChange,
  className,
  width = "clamp(280px,25vw,420px)",
}: CheckboxDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(defaultValues);
  const [search, setSearch] = useState("");
  const ref = useOutsideClick(() => { setOpen(false); setSearch(""); });

  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((s) => s !== val)
      : [...selected, val];
    setSelected(next);
    onChange?.(next);
  };

  const label =
    selected.length === 0 ? placeholder
    : selected.length === 1 ? selected[0]
    : `${selected.length} selected`;

  return (
    <div ref={ref} className={cn("relative", className)} style={{ width }}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative flex items-center w-full cursor-pointer transition-colors duration-150",
          "h-[clamp(44px,3.5vw,60px)]",
          "px-[clamp(14px,1.5vw,26px)]",
          "bg-[color:var(--card)]",
          "border border-[color:var(--border-medium)]",
          "rounded-[var(--btn-radius-rounded)]",
          "hover:border-[color:var(--border-strong)]"
        )}
      >
        <span
          className={cn(
            "flex-1 text-left text-[length:clamp(13px,1.1vw,20px)] font-normal",
            selected.length === 0
              ? "text-[color:var(--muted-strong)]"
              : "text-[color:var(--foreground)]"
          )}
          style={{ fontFamily: "var(--btn-font-secondary)" }}
        >
          {label}
        </span>
        <ChevronDown className={`ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <DropdownMenu align="left">
          {/* Search input */}
          <div className="px-[clamp(8px,0.8vw,14px)] pt-[clamp(8px,0.8vw,14px)] pb-[clamp(4px,0.4vw,8px)]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "w-full outline-none transition-colors duration-150",
                "bg-[color:var(--input)]",
                "border border-[color:var(--border)]",
                "rounded-[var(--btn-radius-rounded)]",
                "text-[color:var(--text-dark)]",
                "text-[length:clamp(11px,0.75vw,14px)]",
                "px-[clamp(8px,0.7vw,12px)] py-[clamp(6px,0.5vw,10px)]",
                "focus:border-[color:var(--primary)]",
                "placeholder:text-[color:var(--muted)]"
              )}
              style={{ fontFamily: "var(--font-sans)" }}
            />
          </div>

          {/* Options list */}
          <div className="max-h-[clamp(160px,12vw,240px)] overflow-y-auto">
            {filtered.length === 0 ? (
              <p
                className="px-4 py-3 text-[length:clamp(11px,0.75vw,14px)] text-[color:var(--muted)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                No results
              </p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  className={cn(
                    "w-full text-left flex items-center gap-[clamp(8px,0.6vw,12px)]",
                    "px-[clamp(12px,1vw,18px)] py-[clamp(8px,0.6vw,12px)]",
                    "text-[length:clamp(11px,0.75vw,14px)]",
                    "text-[color:var(--text-dark)]",
                    "transition-colors duration-150",
                    "hover:bg-[color:var(--primary-soft)]"
                  )}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <CheckboxTick checked={selected.includes(opt)} />
                  {opt}
                </button>
              ))
            )}
          </div>
        </DropdownMenu>
      )}
    </div>
  );
}