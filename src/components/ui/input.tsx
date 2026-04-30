import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelRightElement?: React.ReactNode;
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
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const isForm = variant === "form";

    // ── Wrapper classes ───────────────────────────────────────────────────
    const wrapperClass = isForm
      ? cn(
          "relative flex items-center flex-shrink-0",
          "h-[clamp(36px,2.9vw,40px)]",
          "bg-[color:var(--card)]",
          "border border-[color:var(--input-border)]",
          "rounded-[var(--btn-radius-square)]",
        )
      : cn(
          "relative flex items-center flex-shrink-0 rounded-full",
          "h-[clamp(42px,5.47vh,73px)]",
          variant === "white"
            ? "bg-[color:var(--card)]"
            : "bg-[color:var(--input)]",
        );

    // ── Input style (keeping inline — contains dynamic padding based on icon) ──
    const inputStyle: React.CSSProperties = isForm
      ? {
          color: "var(--profile-text)",
          fontFamily: "var(--btn-font-secondary)",
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
          className,
        )
      : cn(
          "login-input w-full h-full border-none outline-none rounded-full box-border bg-transparent",
          className,
        );

    return (
      <div
        className={cn(
          "flex flex-col",
          isForm
            ? "gap-[clamp(6px,0.5vh,10px)]"
            : "gap-[clamp(6px,0.78vh,10px)]",
          containerClassName,
        )}
      >
        {/* ── Label Row ── */}
        {(label || labelRightElement) && (
          <div className="flex justify-between items-center h-[clamp(16px,1.95vh,26px)]">
            {label ? (
              <label
                htmlFor={inputId}
                className={cn(
                  "font-medium leading-none",
                  isForm
                    ? "text-[length:clamp(12px,0.97vw,16px)] text-[color:var(--label-color)] font-[family-name:var(--font-sans)]"
                    : "text-[length:clamp(10px,0.97vw,18px)] text-[color:var(--muted)] font-[family-name:var(--font-sans)]",
                )}
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
        <div className={wrapperClass}>
          {/* Left Icon */}
          {icon && (
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center opacity-40"
              style={{
                left: isForm
                  ? "clamp(10px,0.9vw,14px)"
                  : "clamp(13px, 1.11vw, 21px)",
              }}
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
              style={{
                right: isForm
                  ? "clamp(10px,0.9vw,14px)"
                  : "clamp(13px, 1.11vw, 21px)",
              }}
            >
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
