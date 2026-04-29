import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelRightElement?: React.ReactNode;
  /**
   * "default"  — pill shape, light gray bg  (login/auth screens)
   * "white"    — pill shape, white bg        (search on dark bg)
   * "form"     — rounded-[12px], white bg, border #E1E5EF (all forms/pages)
   */
  variant?: "default" | "white" | "form";
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      icon,
      rightElement,
      labelRightElement,
      variant = "default",
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // ── variant config ────────────────────────────────────────────────────
    const isForm = variant === "form";

    const wrapperStyle: React.CSSProperties = isForm
      ? {
          height: "clamp(36px, 2.9vw, 40px)",
          background: "#FFFFFF",
          border: "1px solid #E1E5EF",
          borderRadius: "12px",
        }
      : {
          height: "clamp(42px, 5.47vh, 73px)",
          background: variant === "white" ? "var(--card, #FFFFFF)" : "var(--input)",
        };

    const wrapperClass = isForm
      ? "relative flex items-center flex-shrink-0"
      : "relative flex items-center flex-shrink-0 rounded-full";

    const inputStyle: React.CSSProperties = isForm
      ? {
          color: "#191C1E",
          fontFamily: "Inter, var(--font-sans)",
          fontSize: "clamp(12px, 0.9vw, 14px)",
          padding: icon
            ? "0 clamp(12px,1vw,16px) 0 clamp(34px,2.5vw,42px)"
            : "0 clamp(12px,1vw,16px)",
        }
      : {
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(11px, 1.11vw, 21px)",
          padding: "0 clamp(34px, 3.33vw, 63px)",
        };

    const inputClass = isForm
      ? cn(
          "w-full h-full border-none outline-none box-border bg-transparent",
          className
        )
      : cn(
          "login-input w-full h-full border-none outline-none rounded-full box-border bg-transparent",
          className
        );

    const labelColor = isForm ? "#3E4A3D" : "var(--muted)";
    const labelSize = isForm
      ? "clamp(12px, 0.97vw, 16px)"
      : "clamp(10px, 0.97vw, 18px)";

    return (
      <div
        className={cn("flex flex-col", containerClassName)}
        style={{ gap: isForm ? "clamp(6px, 0.5vh, 10px)" : "clamp(6px, 0.78vh, 10px)" }}
      >
        {/* ── Label Row ── */}
        {(label || labelRightElement) && (
          <div
            className="flex justify-between items-center"
            style={{ height: "clamp(16px, 1.95vh, 26px)" }}
          >
            {label ? (
              <label
                htmlFor={inputId}
                className="font-medium leading-none"
                style={{
                  fontSize: labelSize,
                  color: labelColor,
                }}
              >
                {label}
              </label>
            ) : (
              <div />
            )}
            {labelRightElement && <div>{labelRightElement}</div>}
          </div>
        )}

        {/* ── Input Wrapper ── */}
        <div className={wrapperClass} style={wrapperStyle}>
          {/* Left Icon */}
          {icon && (
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center opacity-40"
              style={{ left: isForm ? "clamp(10px,0.9vw,14px)" : "clamp(13px, 1.11vw, 21px)" }}
            >
              {icon}
            </span>
          )}

          {/* Actual Input */}
          <input
            id={inputId}
            type={type}
            className={inputClass}
            style={inputStyle}
            ref={ref}
            {...props}
          />

          {/* Right Element */}
          {rightElement && (
            <div
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ right: isForm ? "clamp(10px,0.9vw,14px)" : "clamp(13px, 1.11vw, 21px)" }}
            >
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };