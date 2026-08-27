import type { FieldProps } from "../types/field.types";

export function CheckboxField({ label = "Xác nhận" }: FieldProps = {}) {
  return (
    <div className="flex h-full w-max shrink-0 items-center gap-2 whitespace-nowrap select-none">
      <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-400 bg-white" />
      <span className="text-sm text-gray-800">{label}</span>
    </div>
  );
}
