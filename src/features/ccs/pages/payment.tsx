import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

import {
  PAYMENT_LINK_OWNER_DATA,
  PAYMENT_LINK_FARMLAND_OPTIONS,
  type FarmlandOption,
} from "@/features/ccs/data/Sendpaymentlinkdata";

/* ────────────────────────────────────────────────────────── */
/* Detail Cell */
/* ────────────────────────────────────────────────────────── */

function DetailCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        flex flex-col gap-1
        rounded-2xl
        p-4
        lg:p-[1.0625rem]
        xl:p-[1.125rem]
        2xl:p-5
      "
    >
      <Typography
        as="span"
        variant="span"
        className="
          text-[0.625rem]
          font-normal
          uppercase
          tracking-[0.05rem]
          text-[var(--text-muted)]
          lg:text-[0.6875rem]
          xl:text-[0.75rem]
          2xl:text-[0.8125rem]
        "
      >
        {label}
      </Typography>

      <Typography
        as="span"
        variant="span"
        className="
          text-[0.8125rem]
          font-medium
          text-[var(--text-primary)]
          lg:text-[0.875rem]
          xl:text-[0.9375rem]
          2xl:text-[1rem]
        "
      >
        {value}
      </Typography>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Page */
/* ────────────────────────────────────────────────────────── */

export default function SendPaymentLink() {
  const navigate = useNavigate();

  /* Search State */
  const [query, setQuery] = useState(PAYMENT_LINK_FARMLAND_OPTIONS[0].label);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedOption, setSelectedOption] = useState<FarmlandOption>(
    PAYMENT_LINK_FARMLAND_OPTIONS[0],
  );

  const searchRef = useRef<HTMLDivElement>(null);

  /* Fees State */
  const [feesAmount, setFeesAmount] = useState("15,000");

  /* Filter */
  const filtered = PAYMENT_LINK_FARMLAND_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  );

  /* Outside Click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setQuery(selectedOption.label);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [selectedOption]);

  const owner = PAYMENT_LINK_OWNER_DATA[selectedOption.id];

  function handleSelect(opt: FarmlandOption) {
    setSelectedOption(opt);
    setQuery(opt.label);
    setShowSuggestions(false);
  }

  return (
    <div
      className="
        h-full
        w-full
        overflow-y-auto
        bg-[var(--surface-page)]
        px-6 py-6
        lg:px-8 lg:py-7
        xl:px-10 xl:py-8
        2xl:px-12 2xl:py-10
      "
    >
      {/* ───────────────────────────────────────── */}
      {/* Back Button */}
      {/* ───────────────────────────────────────── */}

      <BackButton
        variant="light"
        size="sm"
        label="Go back to dashboard"
        onClick={() => navigate(-1)}
        className="
          !w-auto
          !h-[2.375rem]
          !text-[0.8125rem]
          lg:!h-[2.5rem]
          lg:!text-[0.875rem]
          xl:!h-[2.625rem]
          xl:!text-[0.9375rem]
        "
      />

      {/* ───────────────────────────────────────── */}
      {/* Command Card */}
      {/* ───────────────────────────────────────── */}

      <Card
        className="
          mt-5 lg:mt-6 xl:mt-7 2xl:mt-8
          rounded-[2rem]
          shadow-[var(--shadow-card)]
          px-6 py-5
          lg:px-7 lg:py-6
          xl:px-8 xl:py-6
          2xl:px-10 2xl:py-7
        "
      >
        <div className="flex items-end">
          {/* LEFT */}
          <div className="flex flex-1 flex-col gap-2" ref={searchRef}>
            <Typography
              as="label"
              variant="span"
              className="
                text-[0.8125rem]
                font-normal
                text-[var(--text-secondary)]
                lg:text-[0.875rem]
                xl:text-[0.9375rem]
                2xl:text-[1rem]
              "
            >
              Search for farmland
            </Typography>

            <div className="relative">
              {/* Search Icon */}
              <Search
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  h-[1.0625rem]
                  w-[1.0625rem]
                  text-[var(--text-muted-strong)]
                "
                strokeWidth={1.6}
              />

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search farmland..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-card)]
                  pl-10 pr-4 py-3
                  lg:pl-11 lg:py-[0.8125rem]
                  xl:py-[0.875rem]
                  text-[0.8125rem]
                  font-medium
                  text-[var(--text-primary)]
                  placeholder:font-normal
                  placeholder:text-[var(--text-muted-strong)]
                  outline-none
                  transition-colors
                  focus:border-[var(--brand-500)]
                  lg:text-[0.875rem]
                  xl:text-[0.9375rem]
                  2xl:text-[1rem]
                "
              />

              {/* Suggestions */}
              {showSuggestions && filtered.length > 0 && (
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-[calc(100%+0.375rem)]
                    z-20
                    overflow-hidden
                    rounded-xl
                    border
                    border-[var(--border-default)]
                    bg-[var(--surface-card)]
                    shadow-[var(--shadow-dropdown)]
                  "
                >
                  {filtered.map((opt) => (
                    <button
                      key={opt.id}
                      onMouseDown={() => handleSelect(opt)}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4 py-3
                        text-left
                        transition-colors
                        hover:bg-[var(--brand-tint)]
                      "
                    >
                      <Search
                        className="
                          h-4
                          w-4
                          shrink-0
                          text-[var(--text-muted-strong)]
                        "
                        strokeWidth={1.5}
                      />

                      <span
                        className="
                          text-[0.8125rem]
                          font-medium
                          text-[var(--text-primary)]
                          lg:text-[0.875rem]
                          xl:text-[0.9375rem]
                        "
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}

                  {/* No Results */}
                  {filtered.length === 0 && (
                    <p
                      className="
                        px-4 py-3
                        text-[0.8125rem]
                        text-[var(--text-muted-strong)]
                      "
                    >
                      No farmlands found
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            className="
              mx-4
              self-stretch
              w-px
              lg:mx-5
              xl:mx-6
            "
          />

          {/* RIGHT */}
          <div className="flex flex-1 flex-col gap-2">
            <Typography
              as="label"
              variant="span"
              className="
                text-[0.8125rem]
                font-normal
                text-[var(--text-secondary)]
                lg:text-[0.875rem]
                xl:text-[0.9375rem]
                2xl:text-[1rem]
              "
            >
              Enter Fees Amount
            </Typography>

            <div className="relative">
              <span
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[0.8125rem]
                  font-normal
                  text-[var(--text-muted)]
                  lg:text-[0.875rem]
                  xl:text-[0.9375rem]
                "
              >
                ₹
              </span>

              <input
                type="text"
                value={feesAmount}
                onChange={(e) => setFeesAmount(e.target.value)}
                placeholder="0"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-card)]
                  pl-8 pr-4 py-3
                  lg:pl-9 lg:py-[0.8125rem]
                  xl:py-[0.875rem]
                  text-[0.8125rem]
                  font-medium
                  text-[var(--text-primary)]
                  placeholder:font-normal
                  placeholder:text-[var(--text-muted-strong)]
                  outline-none
                  transition-colors
                  focus:border-[var(--brand-500)]
                  lg:text-[0.875rem]
                  xl:text-[0.9375rem]
                  2xl:text-[1rem]
                "
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ───────────────────────────────────────── */}
      {/* Owner Card */}
      {/* ───────────────────────────────────────── */}

      <Card
        className="
          mt-4 lg:mt-5 xl:mt-6 2xl:mt-7
          rounded-[2rem]
          shadow-[var(--shadow-card)]
        "
      >
        <CardContent className="p-6 lg:p-7 xl:p-8 2xl:p-9">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Typography
              as="h2"
              variant="span"
              className="
                text-[0.9375rem]
                font-normal
                text-[var(--text-primary)]
                lg:text-[1rem]
                xl:text-[1.0625rem]
                2xl:text-[1.125rem]
              "
            >
              Owner Details
            </Typography>

            {owner.verified && (
              <span
                className="
                  rounded-full
                  bg-[var(--brand-500)]
                  px-3 py-1
                  text-[0.8125rem]
                  font-bold
                  text-white
                  lg:px-4
                  lg:text-[0.875rem]
                  xl:text-[0.9375rem]
                "
              >
                Verified
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full lg:my-5" />

          {/* Profile */}
          <div className="flex items-center gap-4 lg:gap-5">
            <div
              className="
                h-[3.75rem]
                w-[3.75rem]
                shrink-0
                overflow-hidden
                rounded-full
                shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.10),0px_4px_6px_-4px_rgba(0,0,0,0.10)]
                lg:h-16
                lg:w-16
                xl:h-[4.25rem]
                xl:w-[4.25rem]
              "
            >
              <img
                src={owner.avatar}
                alt={owner.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <Typography
                as="h3"
                variant="span"
                className="
                  text-[0.9375rem]
                  font-normal
                  text-[var(--text-primary)]
                  lg:text-[1rem]
                  xl:text-[1.0625rem]
                  2xl:text-[1.125rem]
                "
              >
                {owner.name}
              </Typography>

              <Typography
                as="span"
                variant="span"
                className="
                  text-[0.8125rem]
                  font-normal
                  text-[var(--text-secondary)]
                  lg:text-[0.875rem]
                  xl:text-[0.9375rem]
                "
              >
                {owner.subtitle}
              </Typography>
            </div>
          </div>

          {/* Grid */}
          <div
            className="
              mt-5
              lg:mt-6
              grid
              grid-cols-2
              gap-3
              lg:gap-[0.9375rem]
              xl:gap-4
              2xl:gap-[1.125rem]
            "
          >
            <DetailCell label="Role" value={owner.role} />
            <DetailCell label="Phone" value={owner.phone} />
            <DetailCell label="Email" value={owner.email} />
            <DetailCell
              label="Location Coordinates"
              value={owner.coordinates}
            />
          </div>
        </CardContent>
      </Card>

      {/* ───────────────────────────────────────── */}
      {/* Button */}
      {/* ───────────────────────────────────────── */}

      <div className="mt-5 lg:mt-6 xl:mt-7">
        <Button
          variant="primary"
          className="
            !rounded-full
            !px-6
            !h-[2.5rem]
            !text-[0.8125rem]
            !font-bold
            !normal-case
            !tracking-normal
            lg:!px-7
            lg:!h-[2.625rem]
            lg:!text-[0.875rem]
            xl:!px-8
            xl:!h-[2.75rem]
            xl:!text-[0.9375rem]
            2xl:!px-9
            2xl:!h-[3rem]
            2xl:!text-[1rem]
          "
          onClick={() => navigate("/processing-fee")}
        >
          Send Payment Link
        </Button>
      </div>
    </div>
  );
}
