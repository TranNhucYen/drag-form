import type { FieldProps } from "../types/field.types";

export function QrCodeField({}: FieldProps = {}) {
  return (
    <div className="flex h-full w-full shrink-0 items-center justify-center whitespace-nowrap border border-gray-400 bg-white text-xs text-gray-500 select-none">
      Mã QR
    </div>
  );
}
