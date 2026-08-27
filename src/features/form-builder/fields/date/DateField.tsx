import type { FieldProps } from "../types/field.types";
import { DottedFieldLine } from "../shared/DottedFieldLine";

export function DateField({
  label = "Địa điểm",
  value = "24/08/2026",
  width,
}: FieldProps = {}) {
  return <DottedFieldLine label={label} value={value} width={width} />;
}
