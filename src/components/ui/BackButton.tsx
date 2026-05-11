import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const backButtonVariants = cva(
  "inline-flex flex-row items-center cursor-pointer border-none font-[var(--font-inter)] font-normal leading-[110%] transition-all duration-200 hover:-translate-y-px active:translate-y-0 [filter:drop-shadow(0px_0px_4px_rgba(0,0,0,0.12))] hover:[filter:drop-shadow(0px_2px_8px_rgba(0,0,0,0.18))]",
  {
    variants: {
      variant: {
        // White pill — matches original Figma design
        light: [
          "bg-[var(--surface-card)]",
          "text-[var(--text-button)]",
        ],
        // Dark sidebar-toned
        dark: [
          "bg-[var(--surface-sidebar)]",
          "text-[var(--surface-sidebar-text)]",
        ],
        // Brand blue
        brand: [
          "bg-[var(--brand-500)]",
          "text-[var(--surface-card)]",
        ],
        // Subtle tinted brand
        brandTint: [
          "bg-[var(--brand-tint)]",
          "text-[var(--brand-500)]",
          "border border-[var(--btn-outline-square-border)]",
        ],
      },
      size: {
        sm:      "w-[200px] h-[42px] px-4 py-[14px] gap-[6px] text-sm  rounded-[var(--btn-radius-pill-sm)]",
        default: "w-[240px] h-[52px] px-5 py-[19px] gap-2  text-base rounded-[var(--btn-radius-pill)]",
        lg:      "w-[280px] h-[60px] px-6 py-[22px] gap-[10px] text-lg rounded-[var(--btn-radius-pill)]",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  }
)

const iconColorMap: Record<string, string> = {
  light:     "var(--text-button)",
  dark:      "var(--surface-sidebar-text)",
  brand:     "var(--surface-card)",
  brandTint: "var(--brand-500)",
}

const iconSizeMap = {
  sm:      20,
  default: 24,
  lg:      28,
} as const

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof backButtonVariants> {
  label?: string
  as?: React.ElementType
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  (
    {
      className,
      variant = "light",
      size = "default",
      label = "Go back to dashboard",
      as,
      ...props
    },
    ref
  ) => {
    const Component: React.ElementType = as ?? "button"
    const iconSize  = iconSizeMap[size ?? "default"]
    const iconColor = iconColorMap[variant ?? "light"]

    return (
      <Component
        ref={ref}
        className={cn(backButtonVariants({ variant, size }), className)}
        {...props}
      >
        {/* Arrow icon */}
        <span className="flex items-center justify-center shrink-0">
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke={iconColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke={iconColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Label */}
        <span className="truncate">{label}</span>
      </Component>
    )
  }
)

BackButton.displayName = "BackButton"

export { BackButton, backButtonVariants }