import { Bell, Search } from 'lucide-react';
import dashboardIcon from '@/assets/dashboard.svg';

export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* TITLE */}
      <div className="flex items-center gap-[0.4688rem]">
        <img
          src={dashboardIcon}
          alt="Dashboard"
          className="h-[0.95rem] w-[0.95rem] shrink-0 object-contain lg:h-[1.066rem] lg:w-[1.066rem] xl:h-[1.125rem] xl:w-[1.125rem]"
        />
        <h2 className="text-[1rem] font-normal leading-[1.5625rem] text-[var(--foreground)] lg:text-[1.0625rem] xl:text-[1.125rem]">
          Dashboard
        </h2>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-2">
        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 rounded-[3.75rem] bg-[var(--card)] px-4 py-[0.875rem] lg:px-5 lg:py-[0.9375rem]">
          <Search className="h-5 w-5 shrink-0 text-[var(--text-subtle)]" strokeWidth={1.6} />
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
  );
}