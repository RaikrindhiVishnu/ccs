import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Map, IndianRupee, Compass, Crop } from "lucide-react";

import UserIcon from "@/assets/farm-user.svg";
import moneyStackIcon from "@/assets/cost-per-ac.svg";
import radarIcon from "@/assets/sat2.svg";

export type FarmlandListItem = {
  id: string;
  farmlandId: string;
  agentName: string;
  agentImg?: string;
  location: string;
  state: string;
  region: string;
  area: string;
  image: string;
  totalArea: string;
  valuation: string;
  assetValue: string;
  listedOn: string;
  costPerAc: string;
  status: "COMPLETED" | "PENDING" | "ACTIVE" | "REJECTED";
  liveOnWebsite: boolean;
};

type Props = {
  item: FarmlandListItem;
  onViewDetails?: (id: string) => void;
};

const STATUS_STYLES: Record<
  FarmlandListItem["status"],
  { bg: string; dot: string; text: string }
> = {
  COMPLETED: {
    bg: "bg-[#F2F2F2]",
    dot: "bg-[#131600]",
    text: "text-[#131600]",
  },
  PENDING: {
    bg: "bg-[var(--surface-page)]",
    dot: "bg-[var(--dot)]",
    text: "text-[var(--dot)]",
  },
  ACTIVE: {
    bg: "bg-[var(--brand-tint)]",
    dot: "bg-[var(--brand-500)]",
    text: "text-[var(--brand-500)]",
  },
  REJECTED: {
    bg: "bg-[var(--status-danger-soft)]",
    dot: "bg-[var(--status-danger)]",
    text: "text-[var(--status-danger)]",
  },
};

export default function FarmlandListCard({ item, onViewDetails }: Props) {
  const s = STATUS_STYLES[item.status];

  return (
    <Card
      className="
        flex flex-col
        rounded-[2rem] border-0 bg-[var(--surface-card)]
        p-4 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]
        lg:p-5 xl:p-6 2xl:p-7
      "
    >
      {/* ══ MAIN ROW ══ */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {/* ── LEFT: image + info ── */}
        <div className="flex w-full lg:w-[38%] shrink-0 flex-col gap-3 xl:w-[40%] 2xl:w-[42%]">
          {/* Image */}
          <div className="w-full overflow-hidden rounded-[1.25rem] xl:rounded-[1.5rem]">
            <div className="relative w-full pb-[62.6%]">
              <img
                src={item.image}
                alt={item.farmlandId}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Farmland ID + agent */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              variant="h4"
              className="text-[#131600] text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem] 2xl:text-[1.5rem]"
            >
              {item.farmlandId}
            </Typography>

            <div className="flex items-center gap-2">
              <img
                src={item.agentImg || UserIcon}
                alt=""
                className={item.agentImg 
                  ? "h-[1.125rem] w-[1.125rem] shrink-0 rounded-full object-cover lg:h-[1.25rem] lg:w-[1.25rem]"
                  : "h-[0.625rem] w-[0.625rem] shrink-0 lg:h-[0.6875rem] lg:w-[0.6875rem]"
                }
              />
              <Typography
                variant="span"
                className="text-[#45474C] text-[0.75rem] font-normal leading-[1.25rem] lg:text-[0.8125rem] xl:text-[0.875rem]"
              >
                {item.agentName}
              </Typography>
            </div>
          </div>
        </div>

        {/* ── RIGHT: bento grid + status & action ── */}
        <div className="flex flex-1 flex-col justify-between gap-4 xl:gap-5">
          {/* BENTO GRID 2 COLUMNS x 3 ROWS */}
          <div className="grid grid-cols-2 gap-2 lg:gap-3 2xl:gap-4">
            <BentoBox
              icon={<Map className="w-[1.125rem] h-[1.125rem] xl:w-[1.375rem] xl:h-[1.375rem] text-[#2780C4]" strokeWidth={2} />}
              label="State"
              value={item.state}
            />
            <BentoBox
              icon={<IndianRupee className="w-[1.125rem] h-[1.125rem] xl:w-[1.375rem] xl:h-[1.375rem] text-[#2780C4]" strokeWidth={2} />}
              label="Valuation"
              value={item.valuation}
            />
            <BentoBox
              icon={<Compass className="w-[1.125rem] h-[1.125rem] xl:w-[1.375rem] xl:h-[1.375rem] text-[#2780C4]" strokeWidth={2} />}
              label="Region"
              value={item.region}
            />
            <BentoBox
              icon={moneyStackIcon}
              label="Asset Value"
              value={item.assetValue}
            />
            <BentoBox
              icon={radarIcon}
              label="Area"
              value={item.area}
            />
            <BentoBox
              icon={<Crop className="w-[1.125rem] h-[1.125rem] xl:w-[1.375rem] xl:h-[1.375rem] text-[#2780C4]" strokeWidth={2} />}
              label="Total Acres"
              value={item.totalArea}
            />
          </div>

          {/* STATUS & ACTION */}
          <div className="flex items-center justify-between border-t border-[rgba(225,227,228,0.5)] pt-3 lg:pt-4 xl:pt-5">
            {/* Status pill + live label */}
            <div className="flex items-center gap-3 xl:gap-4">
              <span
                className={[
                  "inline-flex items-center gap-[0.375rem]",
                  "rounded-full px-3 py-[0.375rem]",
                  "lg:px-4 lg:py-[0.4375rem]",
                  s.bg,
                ].join(" ")}
              >
                <span
                  className={["h-2 w-2 rounded-full shrink-0", s.dot].join(" ")}
                />
                <Typography
                  variant="span"
                  className={[
                    "text-[0.6875rem] font-bold leading-[1rem] xl:text-[0.75rem]",
                    s.text,
                  ].join(" ")}
                >
                  {item.status}
                </Typography>
              </span>

              {item.liveOnWebsite && (
                <Typography
                  variant="span"
                  className="text-[#45474C] text-[0.75rem] font-medium xl:text-[0.875rem]"
                >
                  Live in Website
                </Typography>
              )}
            </div>

            {/* View Details button */}
            <Button
              variant="primary"
              onClick={() => onViewDetails?.(item.id)}
              className="rounded-[0.875rem] xl:rounded-[1rem]"
            >
              View Polygon
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── BentoBox ── */
function BentoBox({
  icon,
  label,
  value,
}: {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-[0.875rem] bg-[#F3F4F5] p-3
        lg:gap-3 lg:p-[0.875rem]
        xl:rounded-[1rem] xl:gap-4 xl:p-4
        2xl:p-[1.125rem]
      "
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white lg:h-9 lg:w-9 xl:h-10 xl:w-10">
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={label}
            className="h-[1.125rem] w-[1.125rem] object-contain xl:h-[1.375rem] xl:w-[1.375rem]"
          />
        ) : (
          icon
        )}
      </div>

      <div className="flex flex-col gap-[0.125rem] xl:gap-1">
        <Typography
          variant="span"
          className="text-[#45474C] text-[0.5625rem] font-semibold uppercase leading-[1rem] tracking-[0.0625rem] lg:text-[0.625rem] xl:text-[0.6875rem] xl:tracking-[0.075rem] 2xl:text-[0.75rem]"
        >
          {label}
        </Typography>
        <Typography
          variant="span"
          className="text-[#131600] text-[0.875rem] font-bold leading-[1.5rem] lg:text-[0.9375rem] xl:text-[1rem] xl:leading-[1.75rem] 2xl:text-[1.125rem]"
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}
