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

export type CanvasField = {
  id: string;
  type: FieldType;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type PageSize = {
  width: number; // mm
  height: number; // mm
};

export type Orientation = "PORTRAIT" | "LANDSCAPE";