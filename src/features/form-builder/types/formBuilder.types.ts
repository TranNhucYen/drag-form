export type FieldType =
  | "label"
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "signature"
  | "qrcode"
  | "image"
  | "datatable";


export type PageSize = {
  width: number;  // mm
  height: number; // mm
};
type Orientation = 'PORTRAIT' | 'LANDSCAPE';