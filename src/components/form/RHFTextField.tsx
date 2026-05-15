import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface RHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;

  label: string;
  placeholder: string;
maxLength?: number;
  type?: string;
}

export function RHFTextField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
    maxLength,
}: RHFTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[clamp(0.375rem,0.5vw,0.625rem)]">
          <label className="font-medium text-[clamp(0.75rem,0.97vw,1rem)] text-[var(--label-color)]">
            {label}
          </label>

          <input
            {...field}
            type={type}
            placeholder={placeholder}
              maxLength={maxLength}
            max={
              type === "date"
                ? new Date().toISOString().split("T")[0]
                : undefined
                
            }
            
            className="
              w-full
              h-[clamp(2rem,2.78vw,2.5rem)]
              px-[clamp(0.625rem,0.97vw,0.875rem)]
              bg-[color:var(--surface-card)]
              border
              rounded-[clamp(0.5rem,0.83vw,0.75rem)]
              text-[clamp(0.6875rem,0.83vw,0.875rem)]
              outline-none
              transition-colors
              duration-150
            "
            style={{
              borderColor: fieldState.error
                ? "var(--border-danger)"
                : "var(--border-default)",
            }}
          />

          {fieldState.error && (
            <span className="text-red-500 text-xs">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
