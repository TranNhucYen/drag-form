import type React from "react";
import { DotDecoration } from "./DotDecoration";

export type DottedFieldLineProps = {
  label: string;
  value?: string;
  width?: number;
  className?: string;
  children?: React.ReactNode;
};

export function FieldLabel({ label }: { label: string }) {
  return <span>{label}: </span>;
}

export function FieldValue({ value }: { value?: string }) {
  if (!value) {
    return (
      <span className="invisible relative z-10 select-none leading-[1.25]">
        &nbsp;
      </span>
    );
  }
  return (
    <span className="relative z-10 bg-white pr-1 leading-[1.25]">
      {value}
    </span>
  );
}

/**
 * DottedFieldLine: Khung hiển thị dùng chung chuẩn cho các trường dạng dòng kẻ chấm (Text, Number, Date, Select).
 */
export function DottedFieldLine({
  label,
  value,
  width,
  className = "",
  children,
}: DottedFieldLineProps) {
  return (
    <span
      style={width !== undefined ? { width: "100%" } : undefined}
      className={`relative inline-flex items-baseline whitespace-nowrap overflow-hidden ${
        width === undefined ? "w-max" : "w-full"
      } ${className}`}
    >
      <FieldLabel label={label} />
      <span className="relative inline-block min-w-0 flex-1 overflow-hidden leading-[1.25]">
        <DotDecoration />
        <FieldValue value={value} />
        {children}
      </span>
    </span>
  );
}
