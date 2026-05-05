import { Card } from '@/components/ui/card';

type Props = {
  title: string;
  value: string;
  icon: string;
};

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <Card
      className="
        flex w-full flex-col justify-between
        rounded-[2rem]
        border border-[var(--border)]
        bg-[var(--card)]
        px-5 pb-5 pt-[0.4375rem]
        shadow-[var(--shadow-card-sm)]
        h-[7.5rem]
        lg:h-[8rem]
        xl:h-[8.75rem] xl:px-8 xl:pb-8
        2xl:h-[9.5rem]
      "
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between gap-2 pt-5">
        <p className="text-[0.5625rem] font-bold uppercase leading-[0.9375rem] tracking-[0.0625rem] text-[var(--text-neutral)] lg:text-[0.5625rem] xl:text-[0.625rem]">
          {title}
        </p>

        {/* ICON CIRCLE */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--input)] xl:h-10 xl:w-10">
          <img src={icon} alt={title} className="h-[1.1rem] w-[1.1rem] object-contain xl:h-5 xl:w-5" />
        </div>
      </div>

      {/* VALUE */}
      <h2 className="text-[1.25rem] font-extrabold leading-[1.875rem] tracking-[-0.03125rem] text-[var(--text-dark)] lg:text-[1.375rem] xl:text-[1.5rem] xl:leading-[2.25rem] 2xl:text-[1.75rem]">
        {value}
      </h2>
    </Card>
  );
}