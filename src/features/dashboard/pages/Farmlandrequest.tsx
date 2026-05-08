import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import FarmlandRequestCard from "@/components/ccs/Farmlandrequestcard";
import { useFarmlandRequests } from "@/core/hooks/Usefarmlandrequests";

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div
      className="
        flex animate-pulse flex-col gap-5
        rounded-[2rem] bg-[var(--surface-card)]
        p-6 shadow-[var(--shadow-card)]
        lg:p-7 xl:p-8
        min-h-[280px] lg:min-h-[300px] xl:min-h-[334px]
      "
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3 xl:gap-4">
        <div className="h-12 w-12 shrink-0 rounded-full bg-[var(--input)] lg:h-[3.25rem] lg:w-[3.25rem] xl:h-14 xl:w-14" />
        <div className="flex flex-col gap-2">
          <div className="h-[1.125rem] w-28 rounded-md bg-[var(--input)] xl:w-32" />
          <div className="h-[0.875rem] w-14 rounded-md bg-[var(--input)]" />
        </div>
      </div>

      {/* Data grid skeleton — 2 col × 3 rows */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-[1.375rem] xl:gap-y-[1.5rem]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="h-3 w-12 rounded bg-[var(--input)]" />
            <div className="h-4 w-20 rounded bg-[var(--input)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function FarmlandRequest() {
  const { data, loading, error, refetch } = useFarmlandRequests();

  return (
    <div
      className="
        h-full overflow-y-auto
        px-5 py-5
        lg:px-7 lg:py-6
        xl:px-9 xl:py-7
        2xl:px-11 2xl:py-9
      "
    >
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        {/* LEFT — icon + title */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/farm.svg"
            alt=""
            className="h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem] xl:h-[1.25rem] xl:w-[1.25rem]"
          />
          <Typography
            variant="h4"
            className="text-[var(--text-primary)] text-[0.9375rem] font-normal leading-tight lg:text-[1rem] xl:text-[1.125rem]"
          >
            Farmland Request
          </Typography>
        </div>

        {/* RIGHT — search + bell */}
        <div className="flex items-center gap-2">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-2 rounded-[3.75rem] bg-[var(--surface-card)] px-4 py-[0.875rem] lg:px-5 lg:py-[0.9375rem]">
            <Search
              className="h-5 w-5 shrink-0 text-[var(--text-subtle)]"
              strokeWidth={1.6}
            />
            <input
              placeholder="Search..."
              className="w-[7rem] bg-transparent text-[0.9375rem] font-normal leading-[110%] text-[var(--text-subtle)] outline-none placeholder:text-[var(--text-subtle)] lg:w-[10rem] lg:text-base xl:w-[13rem] 2xl:w-[16rem]"
            />
          </div>

          {/* BELL — icon-only circle, no matching variant, keep raw */}
          <button className="relative flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full bg-[var(--surface-card)] transition-colors hover:bg-[var(--brand-tint)] xl:h-[3.25rem] xl:w-[3.25rem]">
            <span className="absolute right-[0.75rem] top-[0.625rem] h-[0.3125rem] w-[0.3125rem] rounded-full bg-[var(--status-danger)]" />
            <Bell className="h-5 w-5 text-[var(--surface-sidebar)]" strokeWidth={1.5} />
            <span className="sr-only">Notifications</span>
          </button>
        </div>
      </div>

      {/* ── ERROR BANNER ── */}
      {error && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[var(--status-danger-soft)] px-5 py-3">
          <Typography
            variant="p"
            className="text-[var(--status-danger)] text-[0.875rem] font-medium"
          >
            {error}
          </Typography>
          <Button
            variant="outline-danger"
            onClick={refetch}
            className="underline"
          >
            Try again
          </Button>
        </div>
      )}

      {/* ── CARD GRID ── */}
      <div
        className="
          mt-4 lg:mt-5 xl:mt-6
          grid grid-cols-1 content-start gap-3
          lg:grid-cols-2 lg:gap-4
          xl:gap-[1.125rem]
          2xl:grid-cols-3 2xl:gap-5
        "
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : data.map((item) => (
              <FarmlandRequestCard
                key={item.id}
                item={item}
                onClick={(id) => console.log("navigate to", id)}
              />
            ))}
      </div>
    </div>
  );
}
