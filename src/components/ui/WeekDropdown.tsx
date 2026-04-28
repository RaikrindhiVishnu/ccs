import { useState, useRef, useEffect } from "react";

type Props = {
  options?: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export default function WeekDropdown({
  options = ["Week", "Month", "Quarter", "Year"],
  defaultValue = "Week",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val: string) => {
    setSelected(val);
    setOpen(false);
    onChange?.(val);
  };

  return (
    <div ref={ref} className="relative">

      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-1
          border border-borderStrong
          rounded-full
          px-[clamp(10px,1vw,12px)]
          py-[clamp(4px,0.5vw,6px)]
          text-[clamp(10px,0.8vw,12px)]
          text-foreground
          bg-transparent
          hover:bg-foreground/5
          transition-colors
          cursor-pointer
        "
      >
        {selected}
        {/* chevron down */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div className="
          absolute right-0 top-full mt-1 z-50
          bg-card
          border border-borderStrong
          rounded-[12px]
          shadow-md
          overflow-hidden
          min-w-[100px]
        ">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`
                w-full text-left
                px-4 py-2
                text-[clamp(10px,0.8vw,13px)]
                transition-colors
                hover:bg-foreground/5
                ${selected === opt
                  ? "text-primary font-medium"
                  : "text-foreground"
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}