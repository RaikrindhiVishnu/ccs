import {  Search, Bell } from 'lucide-react';
import FarmlandListCard from '@/components/ccs/Farmlandlistcard';
import { useFarmlandList } from '@/core/hooks/Usefarmlandlist';

/* ── skeleton ── */
function SkeletonCard() {
  return (
    <div className="flex animate-pulse overflow-hidden rounded-[1.5rem] bg-[var(--card)] shadow-[var(--shadow-card)] xl:rounded-[2rem]">
      {/* image placeholder */}
      <div className="h-[11rem] w-full bg-[var(--input)] lg:h-auto lg:w-[13rem] xl:w-[15rem]" />
      {/* content placeholder */}
      <div className="flex flex-1 flex-col gap-3 p-4 xl:p-5">
        <div className="h-5 w-[7rem] rounded bg-[var(--input)]" />
        <div className="h-3 w-[5rem] rounded bg-[var(--input)]" />
        <div className="mt-2 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-2 w-[3rem] rounded bg-[var(--input)]" />
              <div className="h-4 w-[5rem] rounded bg-[var(--input)]" />
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-6 w-[6rem] rounded-full bg-[var(--input)]" />
          <div className="h-8 w-[6rem] rounded-full bg-[var(--input)]" />
        </div>
      </div>
    </div>
  );
}

/* ── page ── */
export default function FarmlandList() {
  const { data, loading, error, refetch } = useFarmlandList();

  return (
    /* whole page scrolls — header + list together */
    <div
      className="
        h-full overflow-y-auto
        px-6 py-6
        lg:px-8 lg:py-7
        xl:px-10 xl:py-8
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
            className="
              h-[1rem] w-[1rem]
              lg:h-[1.125rem] lg:w-[1.125rem]
              xl:h-[1.25rem] xl:w-[1.25rem]
            "
          />
          <h2
            className="
              text-[0.9375rem] font-normal
              leading-tight text-[var(--foreground)]
              lg:text-[1rem]
              xl:text-[1.125rem]
            "
          >
            Farmland List
          </h2>
        </div>

        {/* RIGHT — search + bell */}
        <div className="flex items-center gap-2">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-2 rounded-[3.75rem] bg-[var(--card)] px-4 py-[0.875rem] lg:px-5 lg:py-[0.9375rem]">
            <Search
              className="h-5 w-5 shrink-0 text-[var(--text-subtle)]"
              strokeWidth={1.6}
            />
            <input
              placeholder="Search..."
              className="w-[7rem] bg-transparent text-[0.9375rem] font-normal leading-[110%] text-[var(--text-subtle)] outline-none placeholder:text-[var(--text-subtle)] lg:w-[10rem] lg:text-base xl:w-[13rem] 2xl:w-[16rem]"
            />
          </div>

          {/* BELL BUTTON */}
          <button className="relative flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full bg-[var(--card)] transition-colors hover:bg-[var(--primary-soft)] xl:h-[3.25rem] xl:w-[3.25rem]">
            {/* Notification dot */}
            <span className="absolute right-[0.75rem] top-[0.625rem] h-[0.3125rem] w-[0.3125rem] rounded-full bg-[var(--danger)]" />
            <Bell className="h-5 w-5 text-[var(--sidebar)]" strokeWidth={1.5} />
            <span className="sr-only">Notifications</span>
          </button>
        </div>
      </div>

      {/* ── LIST ── */}
      <div className="mt-5 flex flex-col gap-3 xl:mt-6 xl:gap-4">

        {/* ERROR */}
        {error && (
          <div className="flex items-center justify-between rounded-[1rem] bg-[var(--danger-soft)] px-5 py-3">
            <p className="text-[0.875rem] font-medium text-[var(--danger)]">{error}</p>
            <button onClick={refetch} className="text-[0.8125rem] font-semibold text-[var(--danger)] underline">
              Try again
            </button>
          </div>
        )}

        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : data.map((item) => (
              <FarmlandListCard
                key={item.id}
                item={item}
                onViewDetails={(id) => console.log('view details', id)}
              />
            ))}
      </div>
    </div>
  );
}