import type { FieldProps } from "../types/field.types";

export function SignatureField({}: FieldProps = {}) {
  return (
    <div className="flex h-full w-full shrink-0 items-center justify-center whitespace-nowrap border border-dashed border-gray-400 bg-white text-sm text-gray-500 select-none">
      Chữ ký
    </div>
  );
}
