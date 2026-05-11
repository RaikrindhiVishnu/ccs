import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import UserIcon from "@/assets/farm-user.svg";
import MapPinIcon from "@/assets/map-pin.svg";
import totalAreaIcon from "@/assets/total-area.svg";
import priceIcon from "@/assets/price.svg";
import listedOnIcon from "@/assets/listed-on.svg";
import costPerAcIcon from "@/assets/cost-per-ac.svg";

export type FarmlandListItem = {
  id: string;
  farmlandId: string;
  agentName: string;
  location: string;
  image: string;
  totalArea: string;
  price: string;
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
    bg: "bg-[var(--status-success-soft)]",
    dot: "bg-[var(--status-success)]",
    text: "text-[var(--status-success)]",
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
      <div className="flex gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {/* ── LEFT: image + info ── */}
        <div className="flex w-[38%] shrink-0 flex-col gap-3 lg:w-[40%] xl:w-[40%] 2xl:w-[42%]">
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

          {/* Farmland ID + agent + location */}
          <div className="flex flex-col gap-[0.25rem]">
            <Typography
              variant="h4"
              className="text-[#131600] text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem] 2xl:text-[1.5rem]"
            >
              {item.farmlandId}
            </Typography>

            <div className="flex items-center gap-2">
              <img
                src={UserIcon}
                alt=""
                className="h-[0.625rem] w-[0.625rem] shrink-0 lg:h-[0.6875rem] lg:w-[0.6875rem]"
              />
              <Typography
                variant="span"
                className="text-[#45474C] text-[0.75rem] font-normal leading-[1.25rem] lg:text-[0.8125rem] xl:text-[0.875rem]"
              >
                {item.agentName}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <img
                src={MapPinIcon}
                alt=""
                className="h-[0.625rem] w-[0.625rem] shrink-0 lg:h-[0.6875rem] lg:w-[0.6875rem]"
              />
              <Typography
                variant="span"
                className="text-[#45474C] text-[0.75rem] font-normal leading-[1.25rem] lg:text-[0.8125rem] xl:text-[0.875rem]"
              >
                {item.location}
              </Typography>
            </div>
          </div>
        </div>

        {/* ── RIGHT: bento grid + status & action ── */}
        <div className="flex flex-1 flex-col justify-between gap-4 xl:gap-5">
          {/* BENTO GRID 2×2 */}
          <div className="grid grid-cols-2 gap-2 lg:gap-3 2xl:gap-4">
            <BentoBox
              icon={totalAreaIcon}
              label="Total Area"
              value={item.totalArea}
            />
            <BentoBox icon={priceIcon} label="Price" value={item.price} />
            <BentoBox
              icon={listedOnIcon}
              label="Listed On"
              value={item.listedOn}
            />
            <BentoBox
              icon={costPerAcIcon}
              label="Cost / AC"
              value={item.costPerAc}
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
              View Details
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
  icon: string;
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
        <img
          src={icon}
          alt={label}
          className="h-[1.125rem] w-[1.125rem] object-contain xl:h-[1.375rem] xl:w-[1.375rem]"
        />
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
