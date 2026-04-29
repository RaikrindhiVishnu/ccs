import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelRightElement?: React.ReactNode;
  variant?: "default" | "white";
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

    const bgVar = variant === "white" ? "var(--card, #FFFFFF)" : "var(--input)";

    return (
      <div
        className={cn("flex flex-col", containerClassName)}
        style={{ gap: "clamp(6px, 0.78vh, 10px)" }}
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
                  fontSize: "clamp(10px, 0.97vw, 18px)",
                  color: "var(--muted)",
                }}
              >
                {label}
              </label>
            ) : (
              <div /> // To maintain spacing if only right element exists
            )}
            
            {labelRightElement && <div>{labelRightElement}</div>}
          </div>
        )}

        {/* ── Input Wrapper ── */}
        <div
          className="relative flex items-center flex-shrink-0 rounded-full"
          style={{
            height: "clamp(42px, 5.47vh, 73px)",
            background: bgVar,
          }}
        >
          {/* Left Icon */}
          {icon && (
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center opacity-40"
              style={{ left: "clamp(13px, 1.11vw, 21px)" }}
            >
              {icon}
            </span>
          )}

          {/* Actual Input */}
          <input
            id={inputId}
            type={type}
            className={cn(
              "login-input w-full h-full border-none outline-none rounded-full box-border bg-transparent",
              className
            )}
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(11px, 1.11vw, 21px)",
              padding: "0 clamp(34px, 3.33vw, 63px)",
            }}
            ref={ref}
            {...props}
          />

          {/* Right Element inside input */}
          {rightElement && (
            <div
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ right: "clamp(13px, 1.11vw, 21px)" }}
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
