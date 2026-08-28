import type { CanvasField } from "../types/canvas.types";
import { FIELD_DEFINITIONS_MAP } from "../../constants/fields.config";
import { SNAP_THRESHOLD } from "../../constants/form.constants";

export type AlignmentGuide = {
  type: "vertical" | "horizontal";
  position: number;
};

export type SnapResult = {
  snappedX: number;
  snappedY: number;
  guides: AlignmentGuide[];
};

/**
 * Tính toán tọa độ hít (Snap) và danh sách các đường gióng thông minh (Smart Guides)
 */
export function calculateSnapAndGuides(
  proposed: { x: number; y: number; width: number; height: number },
  otherFields: CanvasField[],
  canvasSize: { width: number; height: number },
  sourceFieldId?: string,
  threshold = SNAP_THRESHOLD,
): SnapResult {
  const targetXLines = new Set<number>();
  const targetYLines = new Set<number>();

  // Thêm các đường gióng của Canvas (mép trái, giữa, mép phải)
  targetXLines.add(0);
  targetXLines.add(canvasSize.width / 2);
  targetXLines.add(canvasSize.width);

  // Thêm các đường gióng của Canvas (mép trên, giữa, mép dưới)
  targetYLines.add(0);
  targetYLines.add(canvasSize.height / 2);
  targetYLines.add(canvasSize.height);

  // Thêm các đường gióng từ các field khác trên Canvas
  for (const field of otherFields) {
    if (field.id === sourceFieldId) {
      continue;
    }

    const defaultSize = FIELD_DEFINITIONS_MAP[field.type]?.defaultSize;
    const fWidth = field.width ?? defaultSize?.width ?? 0;
    const fHeight = field.height ?? defaultSize?.height ?? 0;

    targetXLines.add(field.x);
    targetXLines.add(field.x + fWidth / 2);
    targetXLines.add(field.x + fWidth);

    targetYLines.add(field.y);
    targetYLines.add(field.y + fHeight / 2);
    targetYLines.add(field.y + fHeight);
  }

  let snappedX = proposed.x;
  let minDeltaX = threshold + 1;
  let activeGuideX: number | null = null;

  const activeXPoints = [
    { offset: 0, current: proposed.x }, // Left
    { offset: proposed.width / 2, current: proposed.x + proposed.width / 2 }, // Center
    { offset: proposed.width, current: proposed.x + proposed.width }, // Right
  ];

  for (const targetX of targetXLines) {
    for (const point of activeXPoints) {
      const delta = targetX - point.current;
      if (Math.abs(delta) <= threshold && Math.abs(delta) < minDeltaX) {
        minDeltaX = Math.abs(delta);
        snappedX = proposed.x + delta;
        activeGuideX = targetX;
      }
    }
  }

  let snappedY = proposed.y;
  let minDeltaY = threshold + 1;
  let activeGuideY: number | null = null;

  const activeYPoints = [
    { offset: 0, current: proposed.y }, // Top
    { offset: proposed.height / 2, current: proposed.y + proposed.height / 2 }, // Center
    { offset: proposed.height, current: proposed.y + proposed.height }, // Bottom
  ];

  for (const targetY of targetYLines) {
    for (const point of activeYPoints) {
      const delta = targetY - point.current;
      if (Math.abs(delta) <= threshold && Math.abs(delta) < minDeltaY) {
        minDeltaY = Math.abs(delta);
        snappedY = proposed.y + delta;
        activeGuideY = targetY;
      }
    }
  }

  const guides: AlignmentGuide[] = [];
  if (activeGuideX !== null) {
    guides.push({ type: "vertical", position: activeGuideX });
  }
  if (activeGuideY !== null) {
    guides.push({ type: "horizontal", position: activeGuideY });
  }

  return {
    snappedX,
    snappedY,
    guides,
  };
}
