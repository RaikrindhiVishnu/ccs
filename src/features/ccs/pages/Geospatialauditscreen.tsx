import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

import { cn } from "@/lib/utils";

/* Assets */
import sat1 from "@/assets/sat1.svg";
import sat2 from "@/assets/sat2.svg";
import sat3 from "@/assets/sat3.svg";
import sat4 from "@/assets/sat4.svg";
import sat5 from "@/assets/sat5.svg";
import sat6 from "@/assets/sat6.svg";
import sat7 from "@/assets/sat7.svg";
import arrw from "@/assets/arrw.svg";
const SATELLITE_BG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85";

/* ───────────────────────────────────────── */
/* Progress Bar */
/* ───────────────────────────────────────── */

function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="h-[0.32rem] w-full overflow-hidden rounded-full bg-[var(--border-default)]">
      <div
        className="
          h-full
          rounded-full
          bg-[var(--btn-lime)]
          transition-all
          duration-700
        "
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ───────────────────────────────────────── */
/* Verification Item */
/* ───────────────────────────────────────── */

function VerificationItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-[0.85rem]">
      <img
        src={sat7}
        alt="Verify"
        className="mt-[0.15rem] w-[1.15rem] h-[1.15rem]"
      />

      <div className="flex flex-col gap-[0.1rem]">
        <Typography
          as="span"
          variant="span"
          className="
            font-bold
            leading-[1.4]
            text-[var(--text-heading)]
            text-[0.68rem]
            xl:text-[0.75rem]
          "
        >
          {title}
        </Typography>

        <Typography
          as="span"
          variant="span"
          className="
            leading-[1.45]
            text-[var(--text-secondary)]
            text-[0.56rem]
            xl:text-[0.62rem]
          "
        >
          {subtitle}
        </Typography>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────── */
/* Main */
/* ───────────────────────────────────────── */

export default function GeospatialAuditScreen() {
  const navigate = useNavigate();

  const [scanActive] = useState(true);

  return (
    <div
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-[var(--surface-page)]

        rounded-[2rem]
        xl:rounded-[2.5rem]

        font-[family-name:var(--font-sans)]
      "
    >
      {/* Background */}
      <div
        className="
          absolute inset-0 z-0
          bg-cover bg-center bg-no-repeat
        "
        style={{
          backgroundImage: `url(${SATELLITE_BG})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-[var(--geo-white-wash)]" />

      {/* Dot Grid */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: "var(--geo-dot-grid)",
          backgroundSize: "2rem 2rem",
        }}
      />

      {/* Boundary */}
      <div
        className="
          absolute z-[3]
          rounded-[0.3rem]
          border-[0.12rem]
          border-dashed
          border-[var(--brand-600)]
          bg-[var(--geo-boundary-fill)]
        "
        style={{
          left: "39%",
          right: "37%",
          top: "37%",
          bottom: "36%",
        }}
      />

      {/* ═══════════════════════════════════ */}
      {/* TOP NAV */}
      {/* ═══════════════════════════════════ */}

      <div
        className="
          absolute top-0 left-0 right-0 z-20
          flex items-center justify-between

          px-[1rem]
          lg:px-[1.5rem]
          xl:px-[2rem]

          pt-[1rem]
          lg:pt-[1.25rem]
        "
      >
        <BackButton
          variant="light"
          size="sm"
          label="Go back to dashboard"
          onClick={() => navigate("/")}
          className="!w-auto"
        />

        {/* Center Pill */}
        <div
          className="
            flex items-center
            gap-[0.9rem]

            rounded-full

            px-[1rem]
            py-[0.55rem]

            bg-[var(--geo-nav-bg)]

            shadow-[0_1rem_2rem_-0.5rem_rgba(9,20,38,0.12)]

            backdrop-blur-[0.75rem]
          "
        >
          {/* Logo */}
          <div
            className="
              flex items-center justify-center
              w-[2.35rem]
              h-[2.35rem]
              rounded-full
              bg-[var(--geo-logo-bg)]
            "
          >
            <img src={sat1} alt="Logo" className="w-[1rem] h-[1rem]" />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <Typography
              as="span"
              variant="span"
              className="
                font-extrabold
                tracking-[-0.02rem]

                text-[var(--text-heading)]

                text-[0.82rem]
                xl:text-[0.92rem]
              "
            >
              Green Land Capital
            </Typography>

            <Typography
              as="span"
              variant="span"
              className="
                uppercase
                tracking-[0.05rem]
                font-bold

                text-[var(--text-muted)]

                text-[0.48rem]
                xl:text-[0.56rem]
              "
            >
              Geospatial Audit: GLCSOS 01
            </Typography>
          </div>

          {/* Divider */}
          <div className="h-[1.5rem] w-px bg-[var(--border-soft)]" />

          {/* Refresh */}
          <button className="hover:opacity-70 transition-opacity">
            <img src={sat2} alt="Refresh" className="w-[0.95rem] h-[0.95rem]" />
          </button>
        </div>

        <div className="invisible w-[12rem]" />
      </div>

      {/* ═══════════════════════════════════ */}
      {/* LEFT SIDEBAR */}
      {/* ═══════════════════════════════════ */}

      <div
        className="
          absolute z-20

          left-[0.75rem]
          lg:left-[1rem]
          xl:left-[1.25rem]

          top-[7.2rem]
          lg:top-[7.5rem]

          flex flex-col

          gap-[0.75rem]

          w-[10.5rem]
          lg:w-[11.5rem]
          xl:w-[12.5rem]
        "
      >
        {/* Process Velocity */}
        <Card
          className="
            rounded-[1.3rem]
            bg-[var(--geo-card-bg)]

            px-[0.85rem]
            py-[0.8rem]

            shadow-[var(--geo-card-shadow)]
            backdrop-blur-[0.6rem]
          "
        >
          <div className="mb-[0.65rem] flex items-center justify-between">
            <Typography
              as="span"
              variant="span"
              className="
                uppercase
                tracking-[0.045rem]
                font-extrabold

                text-[var(--brand-900)]

                text-[0.42rem]
                xl:text-[0.46rem]
              "
            >
              Process Velocity
            </Typography>

            <Typography
              as="span"
              variant="span"
              className="
                font-bold
                text-[var(--brand-500)]

                text-[0.45rem]
              "
            >
              Live Update
            </Typography>
          </div>

          <div className="flex items-end gap-[0.6rem]">
            <Typography
              as="span"
              variant="span"
              className="
                font-extrabold
                leading-none

                text-[var(--brand-900)]

                text-[1rem]
                xl:text-[1.1rem]
              "
            >
              94%
            </Typography>

            <div className="flex flex-1 flex-col gap-[0.22rem]">
              <div className="flex items-center justify-between">
                <Typography
                  as="span"
                  variant="span"
                  className="
                    font-bold
                    text-[var(--brand-900)]

                    text-[0.42rem]
                  "
                >
                  1.2 Hrs TAT
                </Typography>

                <Typography
                  as="span"
                  variant="span"
                  className="
                    font-bold
                    text-[var(--brand-900)]

                    text-[0.42rem]
                  "
                >
                  Target: 2.0
                </Typography>
              </div>

              <ProgressBar value={1.2} max={2.0} />
            </div>
          </div>
        </Card>

        {/* Land Specifics */}
        <Card
          className="
            rounded-[1.3rem]
            bg-[var(--geo-card-bg)]

            px-[0.85rem]
            py-[0.8rem]

            shadow-[var(--geo-card-shadow)]
            backdrop-blur-[0.6rem]
          "
        >
          <div className="mb-[0.8rem] flex items-center gap-[0.35rem]">
            <img src={sat3} alt="Land" className="w-[0.7rem] h-[0.7rem]" />

            <Typography
              as="span"
              variant="span"
              className="
                font-bold
                text-[var(--dot)]

                text-[0.62rem]
                xl:text-[0.68rem]
              "
            >
              Land Specifics
            </Typography>
          </div>

          <div className="flex flex-col">
            {[
              ["Total Area", "100 Acres"],
              ["Location", "Tanuku, WG"],
              ["Soil Composition", "Red Laterite"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  flex items-center justify-between

                  border-b border-[var(--border-subtle)]
                  last:border-0

                  py-[0.42rem]
                "
              >
                <Typography
                  as="span"
                  variant="span"
                  className="
                    text-[var(--text-secondary)]
                    text-[0.5rem]
                  "
                >
                  {label}
                </Typography>

                <Typography
                  as="span"
                  variant="span"
                  className="
                    font-bold
                    text-[var(--text-heading)]
                    text-[0.5rem]
                  "
                >
                  {value}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        {/* Asset Ownership */}
        <Card
          className="
            rounded-[1.3rem]
            bg-[var(--geo-card-bg)]

            px-[0.85rem]
            py-[0.8rem]

            shadow-[var(--geo-card-shadow)]
            backdrop-blur-[0.6rem]
          "
        >
          <div className="mb-[0.8rem] flex items-center gap-[0.35rem]">
            <img src={sat4} alt="Asset" className="w-[0.7rem] h-[0.7rem]" />

            <Typography
              as="span"
              variant="span"
              className="
                font-bold
                text-[var(--dot)]

                text-[0.62rem]
                xl:text-[0.68rem]
              "
            >
              Asset Ownership
            </Typography>
          </div>

          {/* User */}
          <div className="mb-[0.7rem] flex items-center gap-[0.55rem]">
            <div
              className="
                flex items-center justify-center
                w-[2.25rem]
                h-[2.25rem]
                rounded-[0.75rem]
                bg-[var(--agent-avatar-bg)]
              "
            >
              <Typography
                as="span"
                variant="span"
                className="
                  font-bold
                  text-[0.7rem]
                  text-[var(--text-heading)]
                "
              >
                RK
              </Typography>
            </div>

            <div className="flex flex-col gap-[0.08rem]">
              <Typography
                as="span"
                variant="span"
                className="
                  font-bold
                  leading-[1.2]

                  text-[var(--text-heading)]

                  text-[0.6rem]
                  xl:text-[0.68rem]
                "
              >
                Ramudu Kumar
              </Typography>

              <Typography
                as="span"
                variant="span"
                className="
                  leading-[1.3]

                  text-[var(--text-secondary)]

                  text-[0.46rem]
                "
              >
                Lead Custodian
              </Typography>
            </div>
          </div>

          {/* Verified */}
          <div
            className="
              flex items-center justify-center

              gap-[0.3rem]

              rounded-[0.75rem]

              bg-[var(--geo-verified-bg)]

              px-[0.65rem]
              py-[0.32rem]
            "
          >
            <img
              src={sat5}
              alt="Verified"
              className="w-[0.55rem] h-[0.55rem]"
            />

            <Typography
              as="span"
              variant="span"
              className="
                uppercase
                tracking-[0.025rem]
                font-extrabold

                text-[var(--geo-verified-text)]

                text-[0.42rem]
              "
            >
              Identity Verified
            </Typography>
          </div>
        </Card>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* CENTER SCAN */}
      {/* ═══════════════════════════════════ */}

      <div
        className="
          absolute inset-0 z-10
          flex items-center justify-center
          pointer-events-none
        "
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "clamp(16rem, 30vw, 27rem)",
            height: "clamp(16rem, 30vw, 27rem)",
          }}
        >
          {/* Ring */}
          <div
            className="
              absolute inset-0
              rounded-full

              border-[0.65rem]
              border-[var(--geo-scan-ring)]

              shadow-[0_0_4rem_var(--geo-overlay-dark)]
            "
          />

          {/* Blur */}
          <div
            className="
              absolute
              rounded-full

              bg-[var(--geo-scan-blur)]

              backdrop-blur-[0.75rem]
            "
            style={{ inset: "0.65rem" }}
          />

          {/* Image */}
          <div
            className="
              absolute
              overflow-hidden
              rounded-full
            "
            style={{ inset: "0.65rem" }}
          >
            <img
              src={SATELLITE_BG}
              alt="Satellite"
              className="
                h-full
                w-full
                object-cover
              "
            />

            <div className="absolute inset-0 bg-[image:var(--geo-scan-sweep)]" />
          </div>

          {/* Scan Status */}
          <div
            className="
              absolute

              bottom-[2.6rem]

              left-1/2
              -translate-x-1/2

              z-10

              flex items-center

              gap-[0.4rem]

              px-[0.875rem]
              py-[0.35rem]

              rounded-full

              bg-[var(--geo-overlay-dark)]

              backdrop-blur-[0.5rem]
            "
          >
            <span
              className={cn(
                `
                  w-[0.38rem]
                  h-[0.38rem]
                  rounded-full
                  bg-[var(--btn-lime)]
                `,
                scanActive && "animate-pulse",
              )}
            />

            <Typography
              as="span"
              variant="span"
              className="
                whitespace-nowrap

                uppercase
                tracking-[0.05rem]
                font-bold

                text-[var(--surface-card)]

                text-[0.5rem]
                xl:text-[0.58rem]
              "
            >
              Precision Scan Active
            </Typography>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════ */}
      {/* RIGHT PANEL */}
      {/* ═══════════════════════════════════ */}

      <div
        className="
          absolute z-20

          right-[1rem]
          lg:right-[1.5rem]
          xl:right-[2rem]

          top-[5rem]
          lg:top-[5.5rem]

          bottom-[1rem]

          flex flex-col justify-between

          w-[10rem]
          lg:w-[11rem]
          xl:w-[12rem]

          rounded-[2rem]

          p-[1rem]
          xl:p-[1.2rem]

          bg-[var(--geo-card-bg)]

          shadow-[var(--geo-card-shadow)]
        "
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-[0.7rem]">
            <div
              className="
                flex items-center justify-center
                w-[2rem]
                h-[2rem]
                rounded-full
                bg-[var(--border-default)]
              "
            >
              <img
                src={sat6}
                alt="Verdict"
                className="w-[0.85rem] h-[0.85rem]"
              />
            </div>

            <div className="flex flex-col gap-[0.05rem]">
              <Typography
                as="span"
                variant="span"
                className="
                  font-extrabold
                  leading-[1.2]

                  text-[var(--text-heading)]

                  text-[0.82rem]
                  xl:text-[0.95rem]
                "
              >
                Verification
                <br />
                Verdict
              </Typography>

              <Typography
                as="span"
                variant="span"
                className="
                  uppercase
                  tracking-[0.05rem]
                  font-bold

                  text-[var(--text-muted-strong)]

                  text-[0.45rem]
                "
              >
                Audit Ref: #9022-X
              </Typography>
            </div>
          </div>

          {/* Divider */}
          <div className="my-[1rem] h-px w-full bg-[var(--border-subtle)]" />

          {/* Items */}
          <div className="flex flex-col gap-[1rem]">
            <VerificationItem
              title="Revenue Check"
              subtitle="Documents validated via Land Bank"
            />

            <VerificationItem
              title="Boundary Walk"
              subtitle="Geo-tagged perimeter confirmed"
            />

            <VerificationItem
              title="Local Intelligence"
              subtitle="Pulsing community feedback loop..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-[0.8rem]">
          <Button
            variant="primary"
            fullWidth
            className="
              !rounded-[1.75rem]
              !h-[2.6rem]
              !text-[0.52rem]
              !font-extrabold
            "
          >
            <span>Authorize Live Listing</span>

            <img
              src={arrw}
              alt="Arrow"
              className="
              w-[0.7rem]
              h-[0.7rem]
              object-contain
              shrink-0
            "
            />
          </Button>

          <button
            className="
              font-bold

              text-[var(--text-secondary)]

              hover:text-[var(--text-primary)]

              transition-colors

              text-[0.72rem]
            "
          >
            Flag for Revision
          </button>
        </div>
      </div>
    </div>
  );
}