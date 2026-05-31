import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CheckStatus = "CLEARED" | "PENDING" | "INPROGRESS" | "FAILED";
type CardStatus = "ACTIVE" | "QUEUED";

interface CheckItem {
  label: string;
  status: CheckStatus;
}

interface Agent {
  id: string;
  avatarUrl?: string;
  initials: string;
}

interface VerificationCase {
  id: string;
  caseCode: string;
  title: string;
  transactionId: string;
  timer?: string;
  queuePosition?: number;
  cardStatus: CardStatus;
  checks: [CheckItem, CheckItem];
  agents: Agent[];
}

// ─── Status styles ────────────────────────────────────────────────────────────

const S: Record<CheckStatus, { bg: string; fg: string }> = {
  CLEARED:    { bg: "bg-[#DCFCE7]",                       fg: "text-[#15803D]"  },
  PENDING:    { bg: "bg-[#CFE5FF]",                       fg: "text-[#004A78]"  },
  INPROGRESS: { bg: "bg-[#CFE5FF]",                       fg: "text-[#004A78]"  },
  FAILED:     { bg: "bg-[var(--timer-danger-bg)]",        fg: "text-[var(--timer-danger-text)]" },
};

// ─── Mock / API ───────────────────────────────────────────────────────────────

const MOCK: VerificationCase[] = [
  {
    id: "1",
    caseCode: "GLCSOS 01",
    title: "Sri Lakshmi Meadows",
    transactionId: "#990123-A",
    timer: "02:14:15",
    cardStatus: "ACTIVE",
    checks: [
      { label: "Customer Info",        status: "CLEARED"    },
      { label: "Legal Document Audit", status: "INPROGRESS" },
    ],
    agents: [
      { id: "a1", initials: "AK" },
      { id: "a2", initials: "SR" },
      { id: "a3", initials: "PV" },
      { id: "a4", initials: "BN" },
    ],
  },
  {
    id: "2",
    caseCode: "GLCSOS 02",
    title: "Uppal Industrial Hub – B4",
    transactionId: "#990145-K",
    timer: "04:45:10",
    cardStatus: "ACTIVE",
    checks: [
      { label: "Financial Risk",  status: "CLEARED" },
      { label: "Document Audit",  status: "PENDING" },
    ],
    agents: [
      { id: "b1", initials: "MN" },
      { id: "b2", initials: "RP" },
    ],
  },
  {
    id: "3",
    caseCode: "GLCSOS 03",
    title: "Medchal Residential Ext.",
    transactionId: "#990159-D",
    cardStatus: "QUEUED",
    queuePosition: 12,
    checks: [
      { label: "Customer Info",        status: "PENDING" },
      { label: "Legal Document Audit", status: "PENDING" },
    ],
    agents: [],
  },
];

async function fetchCases(): Promise<VerificationCase[]> {
  await new Promise((r) => setTimeout(r, 700));
  return MOCK;
}

// ─── Countdown hook ───────────────────────────────────────────────────────────

function useCountdown(initial?: string) {
  const toSec = (t: string) => {
    const [h, m, s] = t.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };
  const toStr = (n: number) => {
    const h = Math.floor(n / 3600),
      m = Math.floor((n % 3600) / 60),
      s = n % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };
  const [sec, setSec] = useState(() => (initial ? toSec(initial) : 0));
  useEffect(() => {
    if (!initial) return;
    const id = setInterval(() => setSec((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [initial]);
  return initial ? toStr(sec) : null;
}

// ─── TimerBadge ───────────────────────────────────────────────────────────────

function TimerBadge({ time }: { time: string }) {
  const t = useCountdown(time);
  return (
    <div
      className="
        inline-flex shrink-0 items-center gap-2 rounded-full
        bg-[var(--timer-danger-bg)]
        px-3 py-[5px]
        lg:px-4 lg:py-[6px]
        xl:px-4 xl:py-[7px]
      "
    >
      <span className="h-[7px] w-[7px] shrink-0 animate-pulse rounded-full bg-[var(--timer-danger-text)] lg:h-2 lg:w-2" />
      <span
        className="
          font-['Liberation_Mono',monospace] font-black tracking-[0.6px]
          text-[var(--timer-danger-text)]
          text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]
        "
      >
        {t} REMAINING
      </span>
    </div>
  );
}

// ─── QueueBadge ───────────────────────────────────────────────────────────────

function QueueBadge({ position }: { position: number }) {
  return (
    <div
      className="
        inline-flex shrink-0 items-center rounded-full
        bg-[var(--queue-bg)]
        px-3 py-[5px]
        lg:px-4 lg:py-[6px]
        xl:px-4 xl:py-[7px]
      "
    >
      <span
        className="
          font-['Liberation_Mono',monospace] font-black tracking-[0.6px]
          text-[var(--queue-text)]
          text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]
        "
      >
        QUEUE POSITION: #{position}
      </span>
    </div>
  );
}

// ─── CheckPill ────────────────────────────────────────────────────────────────

function CheckPill({ label, status }: CheckItem) {
  const { bg, fg } = S[status];
  return (
    <div
      className="
        flex flex-1 items-center justify-between
        rounded-[28px] bg-[var(--check-overlay-bg)]
        px-3 py-[10px]
        lg:px-[14px] lg:py-[11px]
        xl:px-[14px] xl:py-3
      "
    >
      <span
        className="
          font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[var(--queue-text)]
          text-[10px] lg:text-[11px] xl:text-[12px]
        "
      >
        {label}
      </span>
      <span
        className={cn(
          "shrink-0 rounded-full px-2 py-[2px]",
          "font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-[-0.5px]",
          "text-[8px] lg:text-[9px] xl:text-[10px]",
          bg,
          fg,
        )}
      >
        {status}
      </span>
    </div>
  );
}

// ─── AgentStack ───────────────────────────────────────────────────────────────

function AgentStack({ agents }: { agents: Agent[] }) {
  const [first, ...rest] = agents;
  if (!first) return null;
  const avatarCls =
    "flex shrink-0 items-center justify-center rounded-full border-2 border-[var(--surface-card)] bg-[var(--agent-avatar-bg)] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[var(--text-heading)] text-[9px] lg:text-[10px] h-[30px] w-[30px] lg:h-8 lg:w-8 xl:h-8 xl:w-8";
  return (
    <div className="flex items-center">
      <div className={avatarCls}>
        {first.avatarUrl ? (
          <img
            src={first.avatarUrl}
            alt={first.initials}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          first.initials
        )}
      </div>
      {rest.length > 0 && (
        <div className={cn(avatarCls, "-ml-2")}>+{rest.length}</div>
      )}
    </div>
  );
}

// ─── VerificationCard ─────────────────────────────────────────────────────────

function VerificationCard({ item }: { item: VerificationCase }) {
  const isQueued = item.cardStatus === "QUEUED";

  return (
    <div
      className={cn(
        "flex w-full flex-col shadow-[var(--shadow-card-sm)]",
        "gap-4 rounded-[2rem] p-4",
        "lg:gap-5 lg:rounded-[2.5rem] lg:p-5",
        "xl:gap-6 xl:rounded-[3rem] xl:p-6",
        "2xl:gap-6 2xl:p-7",
        isQueued
          ? "bg-[rgba(255,255,255,0.5)]"
          : "bg-[var(--surface-card)]",
      )}
    >
      {/* ── Row 1: chip + title/txn  +  timer/queue ── */}
      <div className="flex items-center justify-between gap-3 xl:gap-4">
        {/* LEFT: chip + text */}
        <div className="flex min-w-0 items-center gap-4 lg:gap-5 xl:gap-[1.875rem]">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center bg-[var(--tag-pill-bg)]",
              "h-9 min-w-[4rem] px-2",
              "lg:h-10 lg:min-w-[4.5rem] lg:px-3",
              "xl:h-12 xl:min-w-[5.5rem] xl:px-3",
              "2xl:h-12 2xl:min-w-[6rem]",
              isQueued ? "rounded-[2rem]" : "rounded-[0.9375rem]",
            )}
          >
            <span
              className="
                whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif] font-bold text-center
                text-[var(--text-heading)]
                text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]
              "
            >
              {item.caseCode}
            </span>
          </div>

          {/* Title + transaction */}
          <div className="flex min-w-0 flex-col gap-[2px]">
            <span
              className="
                truncate font-['Plus_Jakarta_Sans',sans-serif] font-bold leading-6
                text-[var(--text-heading)]
                text-[12px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]
              "
            >
              {item.title}
            </span>
            <span
              className="
                font-['Plus_Jakarta_Sans',sans-serif] font-normal leading-4
                text-[var(--queue-text)]
                text-[10px] lg:text-[11px] xl:text-[12px]
              "
            >
              Transaction ID: {item.transactionId}
            </span>
          </div>
        </div>

        {/* RIGHT: badge */}
        {item.timer !== undefined && <TimerBadge time={item.timer} />}
        {item.queuePosition !== undefined && (
          <QueueBadge position={item.queuePosition} />
        )}
      </div>

      {/* ── Row 2: check pills (active only) ── */}
      {!isQueued && (
        <div className="flex items-stretch gap-2 lg:gap-3">
          <CheckPill {...item.checks[0]} />
          <CheckPill {...item.checks[1]} />
        </div>
      )}

      {/* ── Row 3: agents + CTA (active only) ── */}
      {!isQueued && (
        <div className="flex items-center justify-between pt-1 lg:pt-2">
          <AgentStack agents={item.agents} />
          <Button
            variant="primary"
            className={cn(
              "!rounded-[2rem] gap-2 !font-bold !uppercase !tracking-[0.3px]",
              "!h-9  !px-4 !text-[10px]",
              "lg:!h-10 lg:!px-5 lg:!text-[11px]",
              "xl:!h-10 xl:!px-6 xl:!text-[13px]",
              "2xl:!h-[2.625rem] 2xl:!px-7 2xl:!text-[14px]",
              "shadow-[0px_10px_15px_-3px_rgba(9,20,38,0.2),0px_4px_6px_-4px_rgba(9,20,38,0.2)]",
            )}
          >
            Assign for Verification
            <svg
              width="9"
              height="9"
              viewBox="0 0 10 10"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M2 5h6M6 3l2 2-2 2"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6 rounded-[3rem] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-card-sm)] xl:p-7">
      <div className="flex items-center gap-5">
        <div className="h-12 w-[5.5rem] shrink-0 rounded-[0.9375rem] bg-[var(--tag-pill-bg)]" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-2/5 rounded bg-[var(--tag-pill-bg)]" />
          <div className="h-3 w-1/4 rounded bg-[var(--tag-pill-bg)]" />
        </div>
        <div className="h-8 w-36 shrink-0 rounded-full bg-[var(--tag-pill-bg)]" />
      </div>
      <div className="flex gap-3">
        <div className="h-11 flex-1 rounded-[2rem] bg-[var(--tag-pill-bg)]" />
        <div className="h-11 flex-1 rounded-[2rem] bg-[var(--tag-pill-bg)]" />
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="h-8 w-14 rounded-full bg-[var(--tag-pill-bg)]" />
        <div className="h-10 w-48 rounded-[2rem] bg-[var(--tag-pill-bg)]" />
      </div>
    </div>
  );
}

// ─── BackButton (reusable cva component) ──────────────────────────────────────

const backButtonVariants = cva(
  "inline-flex flex-row items-center cursor-pointer border-none font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[110%] transition-all duration-200 hover:-translate-y-px active:translate-y-0",
  {
    variants: {
      variant: {
        light: [
          "bg-[var(--surface-card)]",
          "text-[var(--text-primary)]",
          "shadow-[var(--shadow-card-sm)]",
          "hover:shadow-[var(--shadow-card)]",
        ],
        dark: [
          "bg-[var(--surface-sidebar)]",
          "text-[var(--surface-sidebar-text)]",
          "shadow-[var(--shadow-card-sm)]",
        ],
        brand: [
          "bg-[var(--brand-500)]",
          "text-[var(--surface-card)]",
          "shadow-[var(--shadow-card-sm)]",
        ],
        brandTint: [
          "bg-[var(--brand-tint)]",
          "text-[var(--brand-500)]",
          "border border-[var(--btn-outline-square-border)]",
        ],
      },
      size: {
        sm:      "rounded-[var(--btn-radius-circle)] px-3    py-[0.3125rem] gap-[6px]  text-[11px]",
        default: "rounded-[var(--btn-radius-circle)] px-4    py-[0.4375rem] gap-2      text-[11px] lg:text-[12px] xl:text-[13px]",
        lg:      "rounded-[var(--btn-radius-circle)] px-5    py-[0.5rem]   gap-[10px] text-[13px] lg:text-[14px]",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  }
)

const iconColorMap: Record<string, string> = {
  light:     "var(--text-primary)",
  dark:      "var(--surface-sidebar-text)",
  brand:     "var(--surface-card)",
  brandTint: "var(--brand-500)",
}

const iconSizeMap = { sm: 13, default: 15, lg: 17 } as const

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof backButtonVariants> {
  label?: string
  as?: React.ElementType
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  (
    {
      className,
      variant = "light",
      size = "default",
      label = "Go back to dashboard",
      as,
      ...props
    },
    ref
  ) => {
    const Component: React.ElementType = as ?? "button"
    const iconSize  = iconSizeMap[size ?? "default"]
    const iconColor = iconColorMap[variant ?? "light"]

    return (
      <Component
        ref={ref}
        className={cn(backButtonVariants({ variant, size }), className)}
        {...props}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8l4-4"
            stroke={iconColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </Component>
    )
  }
)

BackButton.displayName = "BackButton"


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActiveVerifications() {
  const navigate = useNavigate();

  const [cases, setCases] = useState<VerificationCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchCases()
      .then((d) => {
        if (alive) {
          setCases(d);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (alive) {
          setError(e.message ?? "Error");
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className="
        min-h-full w-full bg-[var(--surface-page)]
        font-['Plus_Jakarta_Sans',sans-serif]
      "
    >
      <div
        className="
          w-full
          px-5    py-6
          lg:px-6 lg:py-8
          xl:px-8 xl:py-10
          2xl:px-10 2xl:py-12
        "
      >
        {/* ── Back button using reusable BackButton component ── */}
        <BackButton
          onClick={() => navigate(-1)}
          className="mb-5 lg:mb-6 xl:mb-7 2xl:mb-8"
        />

        <div
          className="
            mb-5 flex items-center justify-between
            lg:mb-6 xl:mb-7 2xl:mb-8
          "
        >
          <Typography
            variant="h2"
            as="h1"
            className="
              font-['Plus_Jakarta_Sans',sans-serif] font-black tracking-[-0.6px] text-[var(--dot)]
              text-[1.125rem]  leading-7
              lg:text-[1.25rem]  lg:leading-8
              xl:text-[1.375rem] xl:leading-[2rem]
              2xl:text-[1.5rem]  2xl:leading-[2rem]
            "
          >
            Active Verifications
          </Typography>

          <div className="flex items-center gap-3">
            {/* List View Button */}
            <button
              className="
                flex items-center justify-center
                w-[36px] h-[36px]
                rounded-full
                bg-[var(--queue-bg)]
              "
            >
              <img
                src="/src/assets/list-view.svg"
                alt="List View"
                className="w-[40px] h-[40px] object-contain"
              />
            </button>

            {/* Filter Button */}
            <button
              className="
                flex items-center justify-center
                w-[36px] h-[36px]
                rounded-full
                bg-[var(--queue-bg)]
              "
            >
              <img
                src="/src/assets/filter.svg"
                alt="Filter"
                className="w-[40px] h-[40px] object-contain"
              />
            </button>
          </div>
        </div>

        <div
          className="
            flex flex-col
            gap-3    pb-8
            lg:gap-4 lg:pb-10
            xl:gap-5 xl:pb-12
            2xl:gap-6 2xl:pb-14
          "
        >
          {loading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {error && (
            <div className="rounded-2xl bg-[var(--timer-danger-bg)] px-5 py-4 text-sm text-[var(--timer-danger-text)]">
              Failed to load verifications: {error}
            </div>
          )}

          {!loading &&
            !error &&
            cases.map((item) => <VerificationCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}