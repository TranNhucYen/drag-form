import type { FieldProps } from "../types/field.types";

export function LabelField({ value, label }: FieldProps = {}) {
  const text = value ?? label ?? "label";

  return (
    <div className="flex h-full w-full shrink-0 items-center overflow-hidden whitespace-nowrap px-1 text-sm text-gray-800 select-none">
      <span>{text}</span>
    </div>
  );
}
