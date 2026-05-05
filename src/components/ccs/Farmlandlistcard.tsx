import { Card } from "@/components/ui/card";
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
    bg: "bg-[var(--success-soft)]",
    dot: "bg-[var(--success-green)]",
    text: "text-[var(--success-green)]",
  },
  PENDING: {
    bg: "bg-[var( --background)]",
    dot: "bg-[var( --dot)]",
    text: "text-[var( --dot)]",
  },
  ACTIVE: {
    bg: "bg-[var(--primary-soft)]",
    dot: "bg-[var(--primary)]",
    text: "text-[var(--primary)]",
  },
  REJECTED: {
    bg: "bg-[var(--danger-soft)]",
    dot: "bg-[var(--danger)]",
    text: "text-[var(--danger)]",
  },
};

export default function FarmlandListCard({ item, onViewDetails }: Props) {
  const s = STATUS_STYLES[item.status];

  return (
    <Card
      className="
        flex flex-col
        rounded-[2rem] border-0 bg-[var(--card)]
        p-4 shadow-[0px_8px_30px_rgba(0,0,0,0.04)]
        lg:p-5
        xl:p-6
        2xl:p-7
      "
    >
      {/* ══ MAIN ROW ══ */}
      <div className="flex gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {/* ── LEFT: image + info ── */}
        <div
          className="
            flex w-[38%] shrink-0 flex-col gap-3
            lg:w-[40%]
            xl:w-[40%]
            2xl:w-[42%]
          "
        >
          {/* Image — aspect ratio 430:269 */}
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
            <h3
              className="
                font-sans text-[1rem] font-bold
                leading-[1.5rem] text-[#131600]
                lg:text-[1.125rem]
                xl:text-[1.25rem] xl:leading-[2rem]
                2xl:text-[1.5rem]
              "
            >
              {item.farmlandId}
            </h3>

            <div className="flex items-center gap-2">
              <img
                src={UserIcon}
                alt=""
                className="h-[0.625rem] w-[0.625rem] shrink-0 lg:h-[0.6875rem] lg:w-[0.6875rem]"
              />
              <span className="text-[0.75rem] font-normal leading-[1.25rem] text-[#45474C] lg:text-[0.8125rem] xl:text-[0.875rem]">
                {item.agentName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <img
                src={MapPinIcon}
                alt=""
                className="h-[0.625rem] w-[0.625rem] shrink-0 lg:h-[0.6875rem] lg:w-[0.6875rem]"
              />
              <span className="text-[0.75rem] font-normal leading-[1.25rem] text-[#45474C] lg:text-[0.8125rem] xl:text-[0.875rem]">
                {item.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: bento grid + status & action ── */}
        <div className="flex flex-1 flex-col justify-between gap-4 xl:gap-5">
          {/* BENTO GRID 2×2 — SVG icons */}
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
          <div
            className="
              flex items-center justify-between
              border-t border-[rgba(225,227,228,0.5)]
              pt-3 lg:pt-4 xl:pt-5
            "
          >
            {/* Status pill + live */}
            <div className="flex items-center gap-3 xl:gap-4">
              <span
                className={[
                  "inline-flex items-center gap-[0.375rem]",
                  "rounded-full px-3 py-[0.375rem]",
                  "text-[0.6875rem] font-bold leading-[1rem]",
                  "lg:px-4 lg:py-[0.4375rem]",
                  "xl:text-[0.75rem]",
                  s.bg,
                  s.text,
                ].join(" ")}
              >
                <span className={["h-2 w-2 rounded-full", s.dot].join(" ")} />
                {item.status}
              </span>

              {item.liveOnWebsite && (
                <span className="text-[0.75rem] font-medium text-[#45474C] xl:text-[0.875rem]">
                  Live in Website
                </span>
              )}
            </div>

            {/* View Details button */}
            <button
              onClick={() => onViewDetails?.(item.id)}
              className="
                flex items-center justify-center
                rounded-[0.875rem] bg-[var(--primary)]
                px-4 py-[0.625rem]
                text-[0.8125rem] font-semibold leading-[1.5rem] text-white
                shadow-[0px_8px_16px_rgba(9,20,38,0.12)]
                transition-opacity hover:opacity-90
                lg:px-5 lg:py-[0.6875rem]
                xl:rounded-[1rem] xl:px-6 xl:py-[0.71875rem] xl:text-[0.9375rem]
                2xl:text-[1rem]
              "
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ── BentoBox — SVG img icon ── */
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
        rounded-[0.875rem] bg-[#F3F4F5]
        p-3
        lg:gap-3 lg:p-[0.875rem]
        xl:rounded-[1rem] xl:gap-4 xl:p-4
        2xl:p-[1.125rem]
      "
    >
      {/* White circle icon wrapper */}
      <div
        className="
          flex h-8 w-8 shrink-0 items-center justify-center
          rounded-full bg-white
          lg:h-9 lg:w-9
          xl:h-10 xl:w-10
        "
      >
        <img
          src={icon}
          alt={label}
          className="
            h-[1.125rem] w-[1.125rem] object-contain
            xl:h-[1.375rem] xl:w-[1.375rem]
          "
        />
      </div>

      <div className="flex flex-col gap-[0.125rem] xl:gap-1">
        <span
          className="
            text-[0.5625rem] font-semibold uppercase
            leading-[1rem] tracking-[0.0625rem] text-[#45474C]
            lg:text-[0.625rem]
            xl:text-[0.6875rem] xl:tracking-[0.075rem]
            2xl:text-[0.75rem]
          "
        >
          {label}
        </span>
        <span
          className="
            text-[0.875rem] font-bold leading-[1.5rem] text-[#131600]
            lg:text-[0.9375rem]
            xl:text-[1rem] xl:leading-[1.75rem]
            2xl:text-[1.125rem]
          "
        >
          {value}
        </span>
      </div>
    </div>
  );
}
