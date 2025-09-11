import * as React from "react"
import { cn } from "../../app/lib/utils";
import { SelectProps } from "@/app/types/select";


export function SelectInput<T extends string | number>({
  options,
  value,
  onChange,
  className = "",
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
