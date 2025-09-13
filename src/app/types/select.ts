export interface Option<T extends string | number> {
  label: string
  value: T
}

export interface SelectProps<T extends string | number> {
  options: Option<T>[]
  value: T
  onChange: (value: T, value2?: T) => void
  placeholder?: string
  className?: string,
}