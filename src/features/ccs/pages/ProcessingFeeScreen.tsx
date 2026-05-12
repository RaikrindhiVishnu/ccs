import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";
import walletImage from "@/assets/wallet.svg";
import {
  Mail,
  Phone,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  auditContextData,
  auditorData,
  pageContent,
  portfolioData,
  processingFeeData,
} from "@/features/ccs/data/processingFeeDummyData";

export default function ProcessingFeeScreen() {
    const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen bg-[var(--surface-page)] p-[1rem] lg:p-[1.5rem] 2xl:p-[2rem]">
      {/* Main Wrapper */}
      <div
        className="
          mx-auto
          w-full
          max-w-[120rem]
          rounded-[2.5rem]
          bg-[var(--surface-page)]
          p-[1rem]
          lg:p-[1.5rem]
          2xl:p-[2rem]
        "
      >
        {/* Back Button */}
        <BackButton
          label={pageContent.backButtonLabel}
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-[1.5rem] w-fit"
        />

        {/* Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[22rem_1fr] gap-[1.5rem] 2xl:gap-[2rem]">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-[1.5rem]">
            {/* Profile Card */}
            <Card
              className="
                rounded-[2rem]
                border border-white/50
                bg-[var(--surface-card)]
                p-[1.5rem]
                shadow-[0_1.25rem_2.5rem_-0.625rem_rgba(9,20,38,0.05)]
              "
            >
              {/* Profile */}
              <div className="flex flex-col items-center">
                <div className="relative mb-[1rem]">
                  <div
                    className="
                      absolute inset-[-0.3rem]
                      rounded-full
                      bg-gradient-to-br
                      from-[var(--brand-500)]
                      to-[var(--btn-lime)]
                      opacity-20
                      blur-md
                    "
                  />

                  <img
                    src={auditorData.profileImage}
                    alt={auditorData.name}
                    className="
                      relative z-10
                      w-[6.5rem] h-[6.5rem]
                      rounded-full
                      border-[0.25rem]
                      border-white
                      object-cover
                      shadow-lg
                    "
                  />
                </div>

                <Typography
                  variant="h4"
                  className="
                    text-[1.25rem]
                    font-extrabold
                    text-[var(--text-primary)]
                  "
                >
                  {auditorData.name}
                </Typography>

                <div
                  className="
                    mt-[0.5rem]
                    rounded-full
                    bg-[var(--queue-bg)]
                    px-[0.85rem]
                    py-[0.25rem]
                  "
                >
                  <span
                    className="
                      text-[0.55rem]
                      font-bold
                      uppercase
                      tracking-[0.08rem]
                      text-[var(--queue-text)]
                    "
                  >
                    {auditorData.role}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-[1.75rem] border-t border-[var(--border-subtle)]">
                <div
                  className="
                    flex items-center justify-between
                    py-[0.9rem]
                    border-b border-[var(--border-subtle)]
                  "
                >
                  <div
                    className="
                      flex items-center gap-[0.5rem]
                      text-[var(--text-secondary)]
                    "
                  >
                    <Phone className="w-[0.9rem] h-[0.9rem]" />

                    <span className="text-[0.78rem]">Phone</span>
                  </div>

                  <span
                    className="
                      text-[0.82rem]
                      font-medium
                      text-[var(--text-primary)]
                    "
                  >
                    {auditorData.phone}
                  </span>
                </div>

                <div className="flex items-center justify-between py-[0.9rem]">
                  <div
                    className="
                      flex items-center gap-[0.5rem]
                      text-[var(--text-secondary)]
                    "
                  >
                    <Mail className="w-[0.9rem] h-[0.9rem]" />

                    <span className="text-[0.78rem]">Email</span>
                  </div>

                  <span
                    className="
                      text-[0.82rem]
                      font-medium
                      text-[var(--text-primary)]
                    "
                  >
                    {auditorData.email}
                  </span>
                </div>
              </div>

              {/* Audit Context */}
              <div className="mt-[1.5rem]">
                <p
                  className="
                    mb-[0.8rem]
                    pl-[0.3rem]
                    text-[0.65rem]
                    font-bold
                    uppercase
                    tracking-[0.08rem]
                    text-[var(--text-secondary)]
                  "
                >
                  {pageContent.auditContextHeading}
                </p>

                <div
                  className="
                    rounded-[1.6rem]
                    bg-[var(--status-pending-bg)]
                    p-[1rem]
                  "
                >
                  <div className="flex flex-col gap-[1rem]">
                    {auditContextData.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="flex items-start gap-[0.8rem]"
                        >
                          {/* Image */}
                          <div className="mt-[0.1rem] shrink-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.label}
                                className="
                                    w-[0.95rem]
                                    h-[0.95rem]
                                    object-contain
                                "
                              />
                            )}
                          </div>

                          <div>
                            <p
                              className="
                                text-[0.62rem]
                                font-bold
                                uppercase
                                tracking-[0.03rem]
                                text-[var(--text-secondary)]
                              "
                            >
                              {item.label}
                            </p>

                            <div
                              className="
                                mt-[0.2rem]
                                flex items-center gap-[0.45rem]
                                text-[0.82rem]
                                font-semibold
                                text-[var(--text-primary)]
                              "
                            >
                              <span>{item.value}</span>

                              {item.hasStatusDot && (
                                <span
                                  className="
                                    w-[0.45rem]
                                    h-[0.45rem]
                                    rounded-full
                                    bg-[var(--status-warning)]
                                  "
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Portfolio */}
            <Card
              className="
                relative overflow-hidden
                rounded-[2rem]
                bg-[var(--surface-sidebar)]
                p-[1.5rem]
                text-[var(--surface-sidebar-text)]
              "
            >
              <div
                className="
                  absolute
                  -right-[3rem]
                  -top-[3rem]
                  w-[7rem]
                  h-[7rem]
                  rounded-full
                  bg-[var(--brand-500)]
                  opacity-10
                "
              />

              <p
                className="
                  text-[0.65rem]
                  font-bold
                  uppercase
                  tracking-[0.08rem]
                  text-white/60
                "
              >
                {pageContent.portfolioHeading}
              </p>

              <Typography
                variant="h3"
                className="
                  mt-[0.4rem]
                  text-[2rem]
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >
                {portfolioData.value}
              </Typography>

              <div className="mt-[1rem] flex items-center gap-[0.4rem]">
                <TrendingUp
                  className="
                    w-[0.85rem]
                    h-[0.85rem]
                    text-[var(--brand-500)]
                  "
                />

                <span
                  className="
                    text-[0.68rem]
                    font-bold
                    uppercase
                    tracking-[0.03rem]
                    text-[var(--brand-500)]
                  "
                >
                  {portfolioData.growth}
                </span>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <Card
            className="
              overflow-hidden
              rounded-[2rem]
              border border-white/50
              bg-[var(--surface-card)]
              shadow-[0_1.25rem_2.5rem_-0.625rem_rgba(9,20,38,0.05)]
            "
          >
            {/* HERO */}
            <div className="p-[1rem] lg:p-[1.5rem]">
              <div
                className="
                  relative overflow-hidden
                  rounded-[1.75rem]
                  bg-[var(--surface-sidebar)]
                  px-[1.5rem]
                  py-[2.5rem]
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_center,var(--brand-tint-strong)_0%,transparent_70%)]
                  "
                />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  {/* Wallet */}
                  <div className="relative mb-[1.5rem]">
                    <div
                      className="
                        flex items-center justify-center
                        w-[4rem]
                        h-[4rem]
                        rounded-full
                        border-[0.2rem]
                        border-white
                        bg-[var(--surface-sidebar)]
                        shadow-[0_0_2rem_rgba(39,128,196,0.4)]
                      "
                    >
                      <img
                        src={walletImage}
                        alt="Wallet"
                        className="
                            w-[1.7rem]
                            h-[1.7rem]
                            object-contain
                        "
                        />
                    </div>

                    <div
                      className="
                        absolute inset-[-0.5rem]
                        rounded-full
                        border-[0.2rem]
                        border-[var(--brand-tint-strong)]
                      "
                    />
                  </div>

                  <p
                    className="
                      text-[0.75rem]
                      font-bold
                      uppercase
                      tracking-[0.12rem]
                      text-[var(--brand-100)]
                    "
                  >
                    {pageContent.feeHeading}
                  </p>

                  <Typography
                    variant="h1"
                    className="
                      mt-[0.4rem]
                      text-[2.8rem]
                      sm:text-[3.5rem]
                      lg:text-[4rem]
                      font-extrabold
                      tracking-tight
                      text-white
                    "
                  >
                    {processingFeeData.totalFee}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Fees */}
            <div className="px-[1.5rem] lg:px-[3rem] py-[2rem]">
              {/* Title */}
              <div className="flex items-center gap-[0.8rem]">
                <div className="h-px flex-1 bg-[var(--border-subtle)]" />

                <span
                  className="
                    text-[0.65rem]
                    font-bold
                    uppercase
                    tracking-[0.08rem]
                    text-[var(--text-secondary)]
                  "
                >
                  {pageContent.feeBreakdownHeading}
                </span>

                <div className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>

              {/* Fee Items */}
              <div className="mt-[2rem] flex flex-col gap-[1.5rem]">
                {processingFeeData.feeBreakdown.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="
                        flex flex-col gap-[1rem]
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        "
                    >
                      <div className="flex items-center gap-[1rem]">
                        <div
                          className="
                        flex items-center justify-center
                        w-[2.2rem]
                        h-[2.2rem]
                        rounded-full
                        bg-[var(--status-pending-bg)]
                        text-[var(--text-primary)]
                        "
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                            w-[0.9rem]
                            h-[0.9rem]
                            object-contain
                        "
                          />
                        </div>

                        <div>
                          <h4
                            className="
                              text-[0.92rem]
                              font-bold
                              text-[var(--text-primary)]
                            "
                          >
                            {item.title}
                          </h4>

                          <p
                            className="
                              mt-[0.2rem]
                              text-[0.68rem]
                              text-[var(--text-subtle)]
                            "
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          text-[1rem]
                          font-bold
                          text-[var(--text-primary)]
                        "
                      >
                        {item.amount}
                      </span>
                    </div>
                  );
                })}

                {/* Total */}
                <div
                  className="
                    mt-[0.5rem]
                    flex items-center justify-between
                    border-t border-dashed
                    border-[var(--border-subtle)]
                    pt-[1.5rem]
                  "
                >
                  <span
                    className="
                      text-[1rem]
                      font-bold
                      text-[var(--text-primary)]
                    "
                  >
                    {pageContent.totalAmountLabel}
                  </span>

                  <span
                    className="
                      text-[1.8rem]
                      font-extrabold
                      text-[var(--text-primary)]
                    "
                  >
                    {processingFeeData.totalAmountDue}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="
                border-t
                border-[var(--border-subtle)]
                bg-[var(--check-overlay-bg)]
                p-[1.5rem]
              "
            >
              <Button
                variant="primary"
                fullWidth
                className="
                  h-[4rem]
                  rounded-[2rem]
                  text-[0.95rem]
                  font-bold
                  shadow-[0_1rem_1.5rem_-0.25rem_rgba(9,20,38,0.2)]
                "
              >
                {pageContent.sendButtonLabel}
              </Button>

              <p
                className="
                  mt-[0.9rem]
                  text-center
                  text-[0.58rem]
                  font-bold
                  uppercase
                  tracking-[0.1rem]
                  text-[var(--text-secondary)]
                "
              >
                {processingFeeData.footerText}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}