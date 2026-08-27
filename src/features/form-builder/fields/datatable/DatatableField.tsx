import type { FieldProps } from "../types/field.types";

export function DatatableField({}: FieldProps = {}) {
  return (
    <div className="flex h-full w-full shrink-0 flex-col border border-gray-400 bg-white text-xs select-none">
      <div className="grid min-h-0 flex-1 grid-cols-2 border-b border-gray-300 font-medium">
        <span className="whitespace-nowrap border-r border-gray-300 px-2 py-1">
          Cột 1
        </span>
        <span className="whitespace-nowrap px-2 py-1">Cột 2</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <span className="whitespace-nowrap border-r border-gray-300 px-2 py-1">
          Dữ liệu
        </span>
        <span className="whitespace-nowrap px-2 py-1">Dữ liệu</span>
      </div>
    </div>
  );
}
