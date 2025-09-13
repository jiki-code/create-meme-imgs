import * as React from "react";
import { SelectProps } from "@/app/types/select";

function SelectInput<T extends string | number>({
  options,
  value,
  onChange,
  className = "",
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`border bg-transparent h-10 rounded-md px-3 py-2 focus:outline-none ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label} 
        </option>
      ))}
    </select>
  );
}

export { SelectInput };
