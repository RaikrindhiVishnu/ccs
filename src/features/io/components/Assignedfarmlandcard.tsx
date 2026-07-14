import { MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ────────────────────────────────────────────────────────── */
/* TYPES                                                      */
/* ────────────────────────────────────────────────────────── */

export interface FarmlandCardData {
  id: string;
  agentName: string;
  agentRole: string;
  agentAvatar?: string;
  agentStatus: "Active" | "Inactive";
  farmlandId: string;
  location: string;
  landExtend: number;
  landUnit: string;
  totalAmount: string;
  totalAmountUnit: string;
  valuePerAcre: string;
  createdTime: string;
}

/* ────────────────────────────────────────────────────────── */
/* AVATAR                                                     */
/* ────────────────────────────────────────────────────────── */

const AgentAvatar = ({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex items-center justify-center shrink-0 overflow-hidden rounded-full
        bg-[var(--tag-pill-bg)]
        w-[clamp(1.6875rem,2.778vw,3.0rem)]
        h-[clamp(1.6875rem,2.778vw,3.0rem)]
      "
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          className="
            font-bold
            text-[var(--text-primary)]
            text-[clamp(0.5625rem,0.972vw,1.0rem)]
          "
        >
          {initials}
        </span>
      )}
    </div>
  );
};

/* ────────────────────────────────────────────────────────── */
/* METRIC ITEM                                                */
/* ────────────────────────────────────────────────────────── */

const MetricItem = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <div className="flex flex-col gap-1">
    <span
      className="
        font-medium uppercase tracking-[0.6px]
        text-[var(--text-secondary)]
        text-[clamp(0.5156rem,0.833vw,0.875rem)]
        leading-4
      "
    >
      {label}
    </span>

    <div className="flex items-baseline gap-1">
      <span
        className="
          font-bold
          text-[var(--text-primary)]
          text-[clamp(0.75rem,1.25vw,1.375rem)]
          leading-[1.56]
        "
      >
        {value}
      </span>
      {unit && (
        <span
          className="
            font-normal
            text-[var(--text-secondary)]
            text-[clamp(0.5625rem,0.972vw,0.9375rem)]
            leading-[1.43]
          "
        >
          {unit}
        </span>
      )}
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/* CREATED TIME                                               */
/* ────────────────────────────────────────────────────────── */

const CreatedTime = ({ value }: { value: string }) => (
  <div className="flex flex-col gap-1">
    <span
      className="
        font-medium uppercase tracking-[0.6px]
        text-[var(--text-secondary)]
        text-[clamp(0.5156rem,0.833vw,0.875rem)]
        leading-4
      "
    >
      Created Time
    </span>

    <div className="flex items-center gap-1">
      <Clock
        className="
          shrink-0
          text-[var(--brand-500)]
          w-[clamp(0.4688rem,0.694vw,0.8125rem)]
          h-[clamp(0.4688rem,0.694vw,0.8125rem)]
        "
        strokeWidth={2}
      />
      <span
        className="
          font-medium
          text-[var(--text-primary)]
          text-[clamp(0.6094rem,0.972vw,1.0rem)]
          leading-[1.43]
        "
      >
        {value}
      </span>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/* SINGLE CARD                                                */
/* ────────────────────────────────────────────────────────── */

const FarmlandCard = ({
  data,
  onView,
}: {
  data: FarmlandCardData;
  onView?: (id: string) => void;
}) => {
  return (
    <Card
      className="
        relative overflow-hidden
        flex w-full flex-col justify-between
        bg-[var(--surface-card)]
        border border-[var(--border-soft)]
        shadow-[var(--shadow-card-sm)]
        rounded-[clamp(1.0666rem,2.222vw,2.0rem)]
        p-[clamp(0.8002rem,1.667vw,2.5rem)]
        gap-[clamp(0.6562rem,1.111vw,1.75rem)]
      "
    >
      {/* ── HEADER ── */}
      <div
        className="
          relative z-[1]
          flex items-start justify-between
          gap-[clamp(0.375rem,0.694vw,1.0rem)]
        "
      >
        {/* Agent info */}
        <div className="flex items-center gap-[clamp(0.3998rem,0.833vw,1.0rem)]">
          <AgentAvatar name={data.agentName} avatarUrl={data.agentAvatar} />

          <div className="flex flex-col gap-0.5">
            <span
              className="
                font-bold
                text-[var(--text-primary)]
                text-[clamp(0.6562rem,1.111vw,1.25rem)]
                leading-[1.5]
              "
            >
              {data.agentName}
            </span>
            <span
              className="
                font-normal
                text-[var(--text-secondary)]
                text-[clamp(0.5156rem,0.833vw,0.9375rem)]
                leading-[1.33]
              "
            >
              {data.agentRole}
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div
          className="
            inline-flex items-center shrink-0 rounded-full
            bg-[var(--status-pending-bg)]
            gap-[clamp(0.2002rem,0.417vw,0.375rem)]
            px-[clamp(0.3998rem,0.833vw,0.875rem)]
            py-[clamp(0.1406rem,0.278vw,0.3125rem)]
          "
        >
          <span
            className={`
              rounded-full shrink-0
              w-[clamp(0.2344rem,0.417vw,0.4375rem)]
              h-[clamp(0.2344rem,0.417vw,0.4375rem)]
              ${
                data.agentStatus === "Active"
                  ? "bg-[var(--status-success)]"
                  : "bg-[var(--text-muted-strong)]"
              }
            `}
          />
          <span
            className="
              font-semibold leading-none
              text-[var(--text-subtle)]
              text-[clamp(0.5156rem,0.694vw,0.875rem)]
            "
          >
            {data.agentStatus}
          </span>
        </div>
      </div>

      {/* ── FARMLAND ID & LOCATION ── */}
      <div
        className="
          relative z-[1] flex flex-col
          gap-[clamp(2.135px,0.278vw,4.0px)]
        "
      >
        <span
          className="
            font-extrabold
            text-[var(--text-strong)]
            text-[clamp(0.8438rem,1.389vw,1.6668rem)]
            leading-[1.4]
          "
        >
          {data.farmlandId}
        </span>

        <div className="flex items-center gap-[clamp(0.2002rem,0.417vw,0.375rem)]">
          <MapPin
            className="
              shrink-0
              text-[var(--text-secondary)]
              w-[clamp(0.5625rem,0.833vw,1.0rem)]
              h-[clamp(0.5625rem,0.833vw,1.0rem)]
            "
            strokeWidth={1.8}
          />
          <span
            className="
              font-normal
              text-[var(--text-secondary)]
              text-[clamp(0.5625rem,0.972vw,1.0625rem)]
              leading-[1.43]
            "
          >
            {data.location}
          </span>
        </div>
      </div>

      {/* ── METRICS ── */}
      <div
        className="
          relative z-[1]
          grid grid-cols-2
          gap-x-[clamp(1.0666rem,2.222vw,2.5rem)]
          gap-y-[clamp(0.8002rem,1.667vw,2.0rem)]
        "
      >
        <MetricItem
          label="Land Extend"
          value={String(data.landExtend)}
          unit={data.landUnit}
        />
        <MetricItem
          label="Total Amount"
          value={data.totalAmount}
          unit={data.totalAmountUnit}
        />
        <MetricItem label="Value Per Acre" value={data.valuePerAcre} />
        <CreatedTime value={data.createdTime} />
      </div>

      {/* ── FOOTER ── */}
      <div
        className="
          relative z-[1]
          border-t border-[var(--border-soft)]
          pt-[clamp(0.6562rem,1.111vw,1.25rem)]
        "
      >
        <Button
          variant="secondary"
          className="
            w-full rounded-full border-none
            bg-[var(--btn-secondary)]
            font-semibold
            text-[var(--text-button)]
            transition-opacity duration-150
            hover:opacity-80 active:opacity-70
            h-[clamp(1.875rem,3.056vw,3.25rem)]
            text-[clamp(0.6094rem,0.972vw,1.0rem)]
          "
          onClick={() => onView?.(data.id)}
        >
          View
        </Button>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────────────────────── */
/* GRID                                                       */
/* ────────────────────────────────────────────────────────── */

export const AssignedFarmlandCards = ({
  data = [],
  onView,
}: {
  data?: FarmlandCardData[];
  onView?: (id: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 w-full gap-[clamp(0.6667rem,1.389vw,2.0rem)]">
      {data.map((item) => (
        <FarmlandCard key={item.id} data={item} onView={onView} />
      ))}
    </div>
  );
};

export default AssignedFarmlandCards;
