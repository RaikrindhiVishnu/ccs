import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// ─── Satellite background ────────────────────────────────────────────────────
const SATELLITE_BG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85";

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-[0.328rem] w-full rounded-full bg-[var(--border-default)] overflow-hidden">
      <div
        className="h-full rounded-full bg-[var(--btn-lime)] transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Check Bubble ────────────────────────────────────────────────────────────
function CheckBubble({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <span className="flex shrink-0 items-center justify-center w-[1.75rem] h-[1.75rem] rounded-full bg-[var(--geo-blue-check-bg)]">
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path
            d="M1.5 5L4.5 8.5L11.5 1"
            stroke="var(--brand-500)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex shrink-0 items-center justify-center w-[1.75rem] h-[1.75rem] rounded-full bg-[var(--geo-dot-pending)]">
      <span className="w-[0.4375rem] h-[0.4375rem] rounded-full bg-[var(--brand-500)]" />
    </span>
  );
}

// ─── Verification Row ────────────────────────────────────────────────────────
function VerificationItem({
  title,
  subtitle,
  filled,
}: {
  title: string;
  subtitle: string;
  filled: boolean;
}) {
  return (
    <div className="flex items-start gap-[0.875rem]">
      <img src="/src/assets/sat7.svg" alt="Logo" />
      <div className="flex flex-col gap-[0.125rem]">
        <Typography
          as="span"
          variant="span"
          className="font-bold text-[var(--text-heading)] text-[0.6875rem] lg:text-[0.71875rem] xl:text-[0.75rem] 2xl:text-[0.8125rem] leading-[1.4]"
        >
          {title}
        </Typography>
        <Typography
          as="span"
          variant="span"
          className="text-[var(--text-secondary)] text-[0.5625rem] lg:text-[0.5625rem] xl:text-[0.59375rem] 2xl:text-[0.625rem] leading-[1.5]"
        >
          {subtitle}
        </Typography>
      </div>
    </div>
  );
}

// ─── Detail Row ──────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-[0.4375rem] border-b border-[var(--border-subtle)] last:border-0">
      <Typography
        as="span"
        variant="span"
        className="text-[var(--text-secondary)] text-[0.625rem] lg:text-[0.65625rem] xl:text-[0.6875rem] 2xl:text-[0.71875rem] leading-[1.33]"
      >
        {label}
      </Typography>
      <Typography
        as="span"
        variant="span"
        className="font-bold text-[var(--text-heading)] text-[0.625rem] lg:text-[0.65625rem] xl:text-[0.6875rem] 2xl:text-[0.71875rem] leading-[1.33]"
      >
        {value}
      </Typography>
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────
function SectionHeading({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-[0.4375rem] mb-[0.875rem] xl:mb-[0.9375rem]">
      {icon}
      <Typography
        as="span"
        variant="span"
        className="font-bold text-[var(--dot)] text-[0.75rem] lg:text-[0.78125rem] xl:text-[0.8125rem] 2xl:text-[0.875rem] leading-[1.43]"
      >
        {label}
      </Typography>
    </div>
  );
}

// ─── Shared card class ────────────────────────────────────────────────────────
const geoCard =
  "shrink-0 bg-[var(--geo-card-bg)] shadow-[var(--geo-card-shadow)] rounded-[1.25rem] lg:rounded-[1.5rem] xl:rounded-[1.75rem] 2xl:rounded-[2rem] p-[0.75rem] lg:p-[0.875rem] xl:p-[1.125rem] 2xl:p-[1.5rem]";

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function GeospatialAuditScreen() {
  const navigate = useNavigate();
  const [scanActive] = useState(true);

  return (
    <div className="relative w-full min-h-screen font-[family-name:var(--font-sans)]">
      {/* Satellite Map */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${SATELLITE_BG})` }}
      />

      {/* White saturation wash — needs CSS var --geo-white-wash */}
      <div className="absolute inset-0 z-[1] bg-[var(--geo-white-wash)]" />

      {/* Dot grid — needs CSS var --geo-dot-grid as bg-image */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: "var(--geo-dot-grid)",
          backgroundSize: "2rem 2rem",
        }}
      />

      {/* Dashed boundary */}
      <div
        className="
          absolute z-[3] pointer-events-none
          bg-[var(--geo-boundary-fill)]
          border-[0.109rem] border-dashed border-[var(--brand-600)]
          rounded-[0.25rem]
        "
        style={{
          left: "39.06%",
          right: "37.5%",
          top: "37.63%",
          bottom: "36.33%",
        }}
      />

      {/* Corner markers */}
      {[
        { left: "38.85%", right: "60.73%", top: "40.63%", bottom: "58.85%" },
        { left: "59.69%", right: "39.9%", top: "37.37%", bottom: "62.11%" },
        { left: "62.29%", right: "37.29%", top: "60.16%", bottom: "39.32%" },
        { left: "41.46%", right: "58.13%", top: "63.41%", bottom: "36.07%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute z-[3] pointer-events-none bg-[var(--surface-card)] border-[0.073rem] border-[var(--geo-logo-bg)] rounded-[0.125rem]"
          style={{ ...pos }}
        />
      ))}

      {/* ══ TOP NAV ═══════════════════════════════════════════════════════════ */}
      <div
        className="
          absolute top-0 left-0 right-0 z-20 flex items-center justify-between
          px-[1.75rem] lg:px-[2.25rem] xl:px-[2.75rem] 2xl:px-[3.25rem]
          pt-[1.3rem] lg:pt-[1.5rem] xl:pt-[1.75rem] 2xl:pt-[2rem]
        "
      >
        <BackButton
          variant="light"
          size="sm"
          label="Go back to dashboard"
          onClick={() => navigate("/")}
          className="!w-auto"
        />

        {/* Center pill */}
        <div
          className="
            flex items-center
            gap-[0.875rem] lg:gap-[1rem] xl:gap-[1.25rem] 2xl:gap-[1.75rem]
            px-[1.125rem] lg:px-[1.5rem] xl:px-[1.75rem] 2xl:px-[2.125rem]
            py-[0.5rem] lg:py-[0.625rem] xl:py-[0.75rem]
            rounded-full
            bg-[var(--geo-nav-bg)] backdrop-blur-[0.657rem]
            shadow-[0_1.369rem_2.739rem_-0.657rem_var(--geo-card-shadow)]
          "
        >
          {/* Logo circle */}
          <div
            className="
              flex shrink-0 items-center justify-center rounded-full bg-[var(--geo-logo-bg)]
              w-[2.19rem] h-[2.19rem] lg:w-[2.375rem] lg:h-[2.375rem]
              xl:w-[2.5rem] xl:h-[2.5rem] 2xl:w-[2.75rem] 2xl:h-[2.75rem]
            "
          >
            <img
              src="/src/assets/sat1.svg"
              alt="Logo"
              className="w-[40%] h-[40%] object-contain"
            />
          </div>

          {/* Brand text */}
          <div className="flex flex-col">
            <Typography
              as="span"
              variant="span"
              className="font-extrabold text-[var(--text-heading)] tracking-[-0.019rem] text-[0.71875rem] lg:text-[0.78125rem] xl:text-[0.859375rem] 2xl:text-[0.9375rem] leading-[1.43]"
            >
              Green Land Capital
            </Typography>
            <Typography
              as="span"
              variant="span"
              className="font-bold text-[var(--text-muted)] tracking-[0.0548rem] uppercase text-[0.46875rem] lg:text-[0.5rem] xl:text-[0.515625rem] 2xl:text-[0.546875rem] leading-[1.3]"
            >
              Geospatial Audit: GLCSOS 01
            </Typography>
          </div>

          {/* Divider */}
          <div className="w-[0.055rem] h-[1.3125rem] bg-[var(--border-soft)]" />

          {/* Refresh */}
          <button
            className="flex shrink-0 items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Refresh"
          >
            <img
              src="/src/assets/sat2.svg"
              alt="Logo"
              className="w-[70%] h-[70%] object-contain"
            />
          </button>
        </div>

        {/* Invisible spacer */}
        <div className="invisible w-[12.5rem] lg:w-[13.5rem] xl:w-[15rem] 2xl:w-[16rem]" />
      </div>

      {/* ══ LEFT SIDEBAR ══════════════════════════════════════════════════════ */}
      <div
        className="
          absolute z-20
          left-[1.75rem] lg:left-[2.25rem] xl:left-[2.75rem] 2xl:left-[3.25rem]
          top-[6rem] lg:top-[6.5rem] xl:top-[7.5rem] 2xl:top-[8.5rem]
          flex flex-col
          gap-[0.5rem] lg:gap-[0.625rem] xl:gap-[0.875rem] 2xl:gap-[1.25rem]
          w-[13.5rem] lg:w-[15rem] xl:w-[17rem] 2xl:w-[19.5rem]
        "
      >
        {/* Process Velocity */}
        <Card className={geoCard}>
          <div className="flex items-center justify-between mb-[0.5rem] xl:mb-[0.625rem]">
            <Typography
              as="span"
              variant="span"
              className="font-extrabold text-[var(--brand-900)] tracking-[0.0548rem] uppercase text-[0.5rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem]"
            >
              Process Velocity
            </Typography>
            <Typography
              as="span"
              variant="span"
              className="font-bold text-[var(--brand-500)] text-[0.5625rem] xl:text-[0.625rem] 2xl:text-[0.6875rem]"
            >
              Live Update
            </Typography>
          </div>
          <div className="flex items-end gap-[0.75rem]">
            <div className="flex items-center justify-center min-w-[3rem]">
              <Typography
                as="span"
                variant="span"
                className="font-extrabold text-[var(--brand-900)] text-[1rem] xl:text-[1.125rem] 2xl:text-[1.25rem]"
              >
                94%
              </Typography>
            </div>
            <div className="flex flex-col gap-[0.25rem] flex-1 pb-[0.125rem]">
              <div className="flex items-center justify-between">
                <Typography
                  as="span"
                  variant="span"
                  className="font-bold text-[var(--brand-900)] text-[0.5rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem]"
                >
                  1.2 Hrs TAT
                </Typography>
                <Typography
                  as="span"
                  variant="span"
                  className="font-bold text-[var(--brand-900)] text-[0.5rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem]"
                >
                  Target: 2.0
                </Typography>
              </div>
              <ProgressBar value={1.2} max={2.0} />
            </div>
          </div>
        </Card>

        {/* Land Specifics */}
        <Card className={geoCard}>
          <SectionHeading
            label="Land Specifics"
            icon={<img src="/src/assets/sat3.svg" alt="Logo" />}
          />
          <DetailRow label="Total Area" value="100 Acres" />
          <DetailRow label="Location" value="Tanuku, WG" />
          <DetailRow label="Soil Composition" value="Red Laterite" />
        </Card>

        {/* Asset Ownership */}
        <Card className={geoCard}>
          <SectionHeading
            label="Asset Ownership"
            icon={<img src="/src/assets/sat4.svg" alt="Logo" />}
          />
          <div className="flex items-center gap-[0.625rem] mb-[0.5rem] xl:mb-[0.75rem]">
            <div className="shrink-0 overflow-hidden rounded-[0.75rem] bg-[var(--border-default)] w-[2.25rem] h-[2.25rem] xl:w-[2.625rem] xl:h-[2.625rem] 2xl:w-[3rem] 2xl:h-[3rem]">
              <div className="w-full h-full flex items-center justify-center bg-[var(--agent-avatar-bg)] font-bold text-[var(--text-heading)] text-[0.75rem] xl:text-[0.875rem]">
                RK
              </div>
            </div>
            <div className="flex flex-col gap-[0.125rem]">
              <Typography
                as="span"
                variant="span"
                className="font-bold text-[var(--text-heading)] text-[0.6875rem] lg:text-[0.71875rem] xl:text-[0.78125rem] 2xl:text-[0.875rem] leading-[1.43]"
              >
                Ramudu Kumar
              </Typography>
              <Typography
                as="span"
                variant="span"
                className="font-medium text-[var(--text-secondary)] text-[0.46875rem] lg:text-[0.5rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem] leading-[1.5]"
              >
                Lead Custodian
              </Typography>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex items-center justify-center gap-[0.375rem] px-[0.75rem] py-[0.375rem] rounded-[0.75rem] w-full bg-[var(--geo-verified-bg)]">
            <img src="/src/assets/sat5.svg" alt="Logo" />
            <Typography
              as="span"
              variant="span"
              className="font-extrabold uppercase tracking-[0.0274rem] text-[0.46875rem] lg:text-[0.5rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem] text-[var(--geo-verified-text)]"
            >
              Identity Verified
            </Typography>
          </div>
        </Card>
      </div>

      {/* ══ CENTER SATELLITE LENS ═════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "clamp(18rem, 36vw, 29rem)",
            height: "clamp(18rem, 36vw, 29rem)",
          }}
        >
          {/* Glass ring */}
          <div className="absolute inset-0 rounded-full border-[0.657rem] border-[var(--geo-scan-ring)] shadow-[0_0_4.375rem_var(--geo-overlay-dark)]" />

          {/* Blur fill — needs --geo-scan-blur */}
          <div
            className="absolute rounded-full bg-[var(--geo-scan-blur)] backdrop-blur-[0.657rem]"
            style={{ inset: "0.657rem" }}
          />

          {/* Satellite crop */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{ inset: "0.657rem" }}
          >
            <img
              src={SATELLITE_BG}
              alt="Satellite scan"
              className="w-full h-full object-cover"
            />
            {/* Sweep overlay — needs --geo-scan-sweep */}
            <div className="absolute inset-0 bg-[image:var(--geo-scan-sweep)]" />
          </div>

          {/* PRECISION SCAN ACTIVE */}
          <div
            className="
              absolute bottom-[3.28rem] left-1/2 -translate-x-1/2 z-10
              flex items-center gap-[0.4375rem]
              px-[0.875rem] py-[0.328rem] rounded-full
              bg-[var(--geo-overlay-dark)] backdrop-blur-[0.328rem]
            "
          >
            <span
              className={cn(
                "shrink-0 w-[0.375rem] h-[0.375rem] rounded-full bg-[var(--btn-lime)]",
                scanActive && "animate-pulse",
              )}
            />
            <Typography
              as="span"
              variant="span"
              className="font-bold text-[var(--surface-card)] uppercase tracking-[0.0548rem] whitespace-nowrap text-[0.5rem] lg:text-[0.515625rem] xl:text-[0.546875rem] 2xl:text-[0.5625rem]"
            >
              Precision Scan Active
            </Typography>
          </div>
        </div>
      </div>

      {/* ══ RIGHT SIDEBAR ═════════════════════════════════════════════════════ */}
      <div
        className="
          absolute z-20
          right-[1.75rem] lg:right-[2.25rem] xl:right-[2.75rem] 2xl:right-[3.25rem]
          top-[5.5rem] lg:top-[6rem] xl:top-[6.75rem] 2xl:top-[7.5rem]
          bottom-[1.75rem] lg:bottom-[2rem] xl:bottom-[2.5rem] 2xl:bottom-[3rem]
          flex flex-col justify-between
          w-[14.75rem] lg:w-[16rem] xl:w-[17.5rem] 2xl:w-[19.5rem]
          rounded-[2.375rem] lg:rounded-[2.5rem] xl:rounded-[2.75rem] 2xl:rounded-[3rem]
          p-[1.375rem] lg:p-[1.625rem] xl:p-[1.875rem] 2xl:p-[2.125rem]
          bg-[var(--geo-card-bg)] shadow-[var(--geo-card-shadow)]
        "
      >
        {/* Header */}
        <div className="pb-[1rem] xl:pb-[1.25rem] border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-[0.657rem]">
            <div className="flex shrink-0 items-center justify-center rounded-full w-[2.125rem] h-[2.19125rem] bg-[var(--border-default)]">
              <img src="/src/assets/sat6.svg" alt="Logo" />
            </div>
            <div className="flex flex-col gap-[0.125rem]">
              <Typography
                as="span"
                variant="span"
                className="font-extrabold text-[var(--text-heading)] text-[0.9375rem] lg:text-[1rem] xl:text-[1.09375rem] 2xl:text-[1.1875rem] leading-[1.2]"
              >
                Verification
                <br />
                Verdict
              </Typography>
              <Typography
                as="span"
                variant="span"
                className="font-bold uppercase tracking-[0.0548rem] text-[var(--text-muted-strong)] text-[0.46875rem] lg:text-[0.5rem] xl:text-[0.515625rem] 2xl:text-[0.546875rem] mt-[0.125rem]"
              >
                Audit Ref: #9022-X
              </Typography>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="flex flex-col flex-1 gap-[1rem] xl:gap-[1.3125rem] py-[1rem] xl:py-[1.3125rem]">
          <VerificationItem
            filled
            title="Revenue Check"
            subtitle="Documents validated via Land Bank"
          />
          <VerificationItem
            filled
            title="Boundary Walk"
            subtitle="Geo-tagged perimeter confirmed"
          />
          <VerificationItem
            filled={false}
            title="Local Intelligence"
            subtitle="Pulsing community feedback loop..."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-[0.625rem] xl:gap-[0.875rem]">
          <Button
            variant="primary"
            fullWidth
            rightIcon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7H12M8 3L12 7L8 11"
                  stroke="var(--surface-card)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            className="
              !rounded-[1.75rem]
              !h-[2.75rem] lg:!h-[2.9375rem] xl:!h-[3.125rem] 2xl:!h-[3.375rem]
              !text-[0.78125rem] lg:!text-[0.8125rem] xl:!text-[0.875rem] 2xl:!text-[0.9375rem]
              !font-extrabold !tracking-[-0.04375rem] !normal-case
            "
          >
            Authorize Live Listing
          </Button>

          <button className="font-[family-name:var(--font-sans)] font-bold text-[var(--text-secondary)] text-[0.75rem] lg:text-[0.8125rem] xl:text-[0.875rem] 2xl:text-[0.9375rem] hover:text-[var(--text-primary)] transition-colors leading-[1.4]">
            Flag for Revision
          </button>
        </div>
      </div>
    </div>
  );
}
