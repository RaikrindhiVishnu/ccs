import { X, ArrowRight } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export type FarmlandDetail = {
  id: string;
  farmlandId: string;
  ownerName: string;
  email: string;
  dateOfBirth: string;
  religion: string;
  caste: string;
  totalArea: string;
  assetValue: string;
};

type Props = {
  detail: FarmlandDetail | null;
  open: boolean;
  onClose: () => void;
  onHistoricalAnalysis?: (id: string) => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[0.125rem]">
      <Typography
        as="span"
        variant="span"
        className="
          text-[0.6875rem] leading-[1rem]
          lg:text-[0.75rem] lg:leading-[1.1rem]
          xl:text-[0.8125rem] xl:leading-[1.2rem]
          2xl:text-[0.875rem] 2xl:leading-[1.3rem]
          font-medium text-[#6B6B6B]
        "
      >
        {label}
      </Typography>
      <Typography
        as="span"
        variant="span"
        className="
          text-[0.75rem] leading-[1.1rem]
          lg:text-[0.8125rem] lg:leading-[1.2rem]
          xl:text-[0.875rem] xl:leading-[1.3rem]
          2xl:text-[0.9375rem] 2xl:leading-[1.4rem]
          font-bold text-[#353535]
        "
      >
        {value}
      </Typography>
    </div>
  );
}

export default function FarmlandDetailPanel({
  detail,
  open,
  onClose,
  onHistoricalAnalysis,
}: Props) {
  return (
    <>
      {open && (
        <div className="absolute inset-0 z-40 bg-black/20 pointer-events-none" />
      )}

      <div
        className={[
          /* position — right-[1.5rem] only, no right-0 conflict */
          "absolute top-0 z-50",
          "right-[1.5rem]",
          "h-full",
          /* responsive width */
          "w-[20rem] lg:w-[21rem] xl:w-[23rem] 2xl:w-[25rem]",
          "transition-transform duration-300 ease-in-out",
          "flex items-start pt-[1.5rem]",
          open ? "translate-x-0" : "translate-x-[calc(100%+1.5rem)]",
        ].join(" ")}
      >
        {detail && (
          <Card
            className="
              flex flex-col w-full
              rounded-[0.8125rem]
              shadow-[0px_8px_30px_rgba(0,0,0,0.12)]
              /* responsive max-height so card never overflows viewport */
              max-h-[calc(100vh-4rem)]
              sm:max-h-[calc(100%-3rem)]
              lg:max-h-[calc(100%-3.5rem)]
              xl:max-h-[calc(100%-4rem)]
              2xl:max-h-[calc(100%-5rem)]
              overflow-hidden
            "
          >
            {/* ── HEADER ── */}
            <CardHeader
              className="
                shrink-0
                px-4 pt-3 pb-0
                lg:px-5 lg:pt-4
                xl:px-6 xl:pt-5
                2xl:px-7 2xl:pt-6
              "
            >
              <div className="flex items-center justify-between">
                <Typography
                  as="h2"
                  variant="span"
                  className="
                    text-[0.8125rem] leading-[1.2rem]
                    lg:text-[0.875rem] lg:leading-[1.25rem]
                    xl:text-[0.9375rem] xl:leading-[1.3rem]
                    2xl:text-[1rem] 2xl:leading-[1.4rem]
                    font-bold text-[#353535]
                  "
                >
                  Owners &amp; Land Details
                </Typography>
                <button
                  onClick={onClose}
                  className="
                    flex items-center justify-center rounded-full
                    text-[#353535] transition-colors hover:bg-[var(--input)]
                    h-6 w-6
                    lg:h-7 lg:w-7
                    xl:h-8 xl:w-8
                  "
                >
                  <X
                    className="h-3 w-3 lg:h-3.5 lg:w-3.5 xl:h-4 xl:w-4"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
              <div className="mt-2 lg:mt-3 h-px w-full bg-black/50" />
            </CardHeader>

            {/* ── CONTENT (scrollable) ── */}
            <CardContent
              className="
                min-h-0 flex-1 overflow-y-auto
                px-4 py-2
                lg:px-5 lg:py-3
                xl:px-6 xl:py-4
                2xl:px-7 2xl:py-5
              "
            >
              <div
                className="
                  flex flex-col
                  gap-2
                  lg:gap-3
                  xl:gap-[0.875rem]
                  2xl:gap-4
                "
              >
                {/* Name — slightly larger than DetailRow */}
                <div className="flex flex-col gap-[0.125rem]">
                  <Typography
                    as="span"
                    variant="span"
                    className="
                      text-[0.6875rem] leading-[1rem]
                      lg:text-[0.75rem] lg:leading-[1.1rem]
                      xl:text-[0.8125rem] xl:leading-[1.2rem]
                      2xl:text-[0.875rem] 2xl:leading-[1.3rem]
                      font-medium text-[#6B6B6B]
                    "
                  >
                    Name
                  </Typography>
                  <Typography
                    as="h3"
                    variant="span"
                    className="
                      text-[0.9375rem] leading-[1.3rem]
                      lg:text-[1rem] lg:leading-[1.375rem]
                      xl:text-[1.0625rem] xl:leading-[1.45rem]
                      2xl:text-[1.125rem] 2xl:leading-[1.5rem]
                      font-bold text-[#353535]
                    "
                  >
                    {detail.ownerName}
                  </Typography>
                </div>

                <DetailRow label="Email Address" value={detail.email} />
                <DetailRow label="Date of Birth" value={detail.dateOfBirth} />
                <DetailRow label="Religion" value={detail.religion} />
                <DetailRow label="Caste" value={detail.caste} />
                <DetailRow label="Total Area" value={detail.totalArea} />
                <DetailRow label="Asset Value" value={detail.assetValue} />
              </div>
            </CardContent>

            {/* ── FOOTER ── */}
            <CardFooter
              className="
                shrink-0
                px-4 pb-3 pt-2
                lg:px-5 lg:pb-4
                xl:px-6 xl:pb-5
                2xl:px-7 2xl:pb-6
              "
            >
              <Button
                variant="primary"
                fullWidth
                rightIcon={
                  <ArrowRight
                    className="
                      h-[0.4rem] w-[0.4rem]
                      lg:h-[0.45rem] lg:w-[0.45rem]
                      xl:h-[0.5rem] xl:w-[0.5rem]
                    "
                    strokeWidth={2.5}
                  />
                }
                onClick={() => onHistoricalAnalysis?.(detail.id)}
                className="
                  !rounded-[2rem]
                  !bg-[#2780C4]
                  !font-bold !normal-case !tracking-normal
                  !h-[1.875rem] !text-[0.6875rem]
                  lg:!h-[2rem] lg:!text-[0.75rem]
                  xl:!h-[2.25rem] xl:!text-[0.875rem]
                  2xl:!h-[2.5rem] 2xl:!text-[0.9375rem]
                "
              >
                Historical Agronomy Analysis
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
