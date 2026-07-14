import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { FormDropdown } from "@/components/ui/Dropdown";

interface RHFDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;

  label: string;
  placeholder: string;

  options: string[];

  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export function RHFDropdown<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  className,
  containerClassName,
  disabled = false,
}: RHFDropdownProps<T>){
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-[clamp(0.375rem,0.5vw,0.625rem)]">
          
          <FormDropdown
            label={label}
            placeholder={placeholder}
            options={options}
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            className={className}
            containerClassName={containerClassName}
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