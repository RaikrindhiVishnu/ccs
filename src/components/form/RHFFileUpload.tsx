// src/components/form/RHFFileUpload.tsx
import { useRef } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";  // ← fixed
import { ImageUp, FileImage } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface RHFFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  accept?: string;
  variant?: "button" | "zone";
}

export function RHFFileUpload<T extends FieldValues>({
  name,
  control,
  label,
  accept = "image/*,.pdf",
  variant = "zone",
}: RHFFileUploadProps<T>) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[clamp(0.375rem,0.5vw,0.625rem)]">
          <Typography
            as="span"
            variant="span"
            className="font-medium leading-[1.25] text-[color:var(--label-color)] text-[clamp(0.75rem,0.97vw,1rem)]"
          >
            {label}
          </Typography>

          {/* ── Button variant (profile picture) ── */}
          {variant === "button" && (
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className={cn(
                "flex items-center justify-between w-full",
                "h-[clamp(2rem,2.78vw,2.5rem)]",
                "px-[clamp(0.625rem,0.97vw,0.875rem)]",
                "bg-[color:var(--surface-card)] border rounded-[clamp(0.5rem,0.83vw,0.75rem)]",
                "transition-colors duration-150 cursor-pointer",
                fieldState.error
                  ? "border-red-500"
                  : "border-[color:var(--border-default)] hover:border-[color:var(--brand-500)]"
              )}
            >
              <span className="flex-1 text-left truncate mr-2 text-[clamp(0.6875rem,0.83vw,0.875rem)] text-[color:var(--text-muted)]">
                {field.value?.name ?? "Supports JPEG, PNG and Other Formats"}
              </span>
              <ImageUp className="shrink-0 w-[1.125rem] h-[1.125rem] stroke-[1.75]" />
            </button>
          )}

          {/* ── Zone variant (documents) ── */}
          {variant === "zone" && (
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center gap-[clamp(0.375rem,0.56vw,0.5rem)]",
                "h-[clamp(5rem,8.89vw,8rem)]",
                "bg-[color:var(--surface-page)] border-2 border-dashed rounded-[clamp(0.5rem,0.83vw,0.75rem)]",
                "cursor-pointer transition-colors duration-200",
                fieldState.error
                  ? "border-red-500 bg-red-50/30"
                  : "border-[color:var(--border-default)] hover:border-[color:var(--brand-500)] hover:bg-[color:var(--brand-tint)]"
              )}
            >
              <FileImage className="shrink-0 w-[1rem] h-[1rem] stroke-[1.75]" />
              <Typography as="span" variant="span" className="font-medium text-[clamp(0.75rem,0.97vw,1rem)]">
                {field.value ? "File Selected" : "Click to Upload"}
              </Typography>
              {field.value && (
                <span className="text-[clamp(0.625rem,0.69vw,0.75rem)] text-[color:var(--brand-500)] truncate max-w-[90%]">
                  {field.value.name}
                </span>
              )}
            </button>
          )}

          {/* Hidden input */}
          <input
            ref={ref}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              field.onChange(e.target.files?.[0] ?? undefined);
            }}
          />

          {/* Error message */}
          {fieldState.error && (
            <span className="text-red-500 text-[0.75rem] leading-none mt-0.5">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}