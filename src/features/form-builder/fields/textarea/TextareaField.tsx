import type { FieldProps } from "../types/field.types";

export function TextareaField({}: FieldProps = {}) {
  return (
    <div className="flex h-full w-full shrink-0 border border-gray-400 bg-white p-1 select-none">
      Đoạn văn
    </div>
  );
}
