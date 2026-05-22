import ellipseBg from "../../../../assets/Ellipse 1.svg";

type Props = {
  title: string;
  subtitle: string;
  value: string;
  bgColor: string;
};

export default function StatCard({
  title,
  subtitle,
  value,
  bgColor,
}: Props) {
  return (
    <div className="group relative w-full aspect-[234/257]">
      <div className="absolute inset-0 overflow-hidden rounded-[12.8%]">
        <div
          className="absolute left-0 top-0 w-[69.23%] h-full rounded-[12.8%_0_12.8%_12.8%]"
          style={{ backgroundColor: bgColor }}
        />

        <div
          className="absolute right-0 top-0 w-[30.77%] h-[72.37%] rounded-[0_12.8%_12.8%_0]"
          style={{ backgroundColor: bgColor }}
        />

        <div className="absolute left-[69.23%] top-[72.37%] w-[12.8%] aspect-square">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-tl-full"
            style={{ boxShadow: `-30px -30px 0 30px ${bgColor}` }}
          />
        </div>
      </div>

      <div className="absolute left-[8%] top-[10%] right-[8%] z-10">
        <h3 className="text-[1.25rem] 2xl:text-[1.66rem] font-bold text-black">
          {title}
        </h3>

        <p className="text-sm 2xl:text-[1.16rem] text-black mt-1 opacity-80">
          {subtitle}
        </p>
      </div>

      <div className="absolute left-[8%] bottom-[20%] z-10">
        <span className="text-[2.3rem] 2xl:text-[3rem] text-black leading-none font-sans">
          {value}
        </span>
      </div>

      <div className="absolute right-[6%] bottom-[6%] w-[22%] aspect-square flex items-center justify-center z-20">
        <img src={ellipseBg} className="w-full h-full" alt="" />

        <div className="absolute w-[48%] h-[48%] border border-white rounded-full flex flex-col items-center justify-center gap-[5%]">
          <div className="w-[12%] h-[12%] bg-white rounded-full"></div>
          <div className="w-[8%] h-[35%] bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
