import type { FieldType } from "../../types/formBuilder.types";

export type CanvasField = {
  id: string;
  type: FieldType;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type FieldResizeChange = {
  position: { x: number; y: number };
  size: { width: number; height: number };
};

export type ResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

