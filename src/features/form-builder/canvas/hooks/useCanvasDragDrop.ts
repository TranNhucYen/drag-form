import { useDragDropMonitor } from "@dnd-kit/react";
import { useRef } from "react";
import type { Rect } from "../../domain/geometry";
import { getCollidingFieldIds, isOutsideCanvas } from "../utils/collision.utils";
import type { FieldType } from "../../types/formBuilder.types";
import { FIELD_DEFINITIONS_MAP, PALETTE_ITEM_CENTER } from "../../constants/fields.config";

export type UseCanvasDragDropOptions = {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onCollisionChange?: (isColliding: boolean) => void;
  setCollidingFieldIds: (ids: string[]) => void;
  onDropPosition: (
    sourceFieldId: string,
    coordinates: { x: number; y: number },
  ) => void;
  onDropNewField: (
    type: FieldType,
    coordinates: { x: number; y: number },
  ) => void;
};

function getEffectiveDraggedRect(
  shapeRect: Rect,
  sourceData?: { fieldId?: string; type?: FieldType; width?: number; height?: number },
): Rect {
  const isFromPalette = !sourceData?.fieldId;

  if (!isFromPalette) {
    return {
      left: shapeRect.left,
      top: shapeRect.top,
      width: sourceData?.width ?? shapeRect.width,
      height: sourceData?.height ?? shapeRect.height,
    };
  }

  const defaultSize = sourceData?.type
    ? FIELD_DEFINITIONS_MAP[sourceData.type]?.defaultSize
    : undefined;
  const width = sourceData?.width ?? defaultSize?.width ?? shapeRect.width;
  const height = sourceData?.height ?? defaultSize?.height ?? shapeRect.height;

  const shiftX = PALETTE_ITEM_CENTER.x - width / 2;
  const shiftY = PALETTE_ITEM_CENTER.y - height / 2;

  return {
    left: shapeRect.left + shiftX,
    top: shapeRect.top + shiftY,
    width,
    height,
  };
}

/**
 * useCanvasDragDrop: Hook xử lý kéo thả phần tử trên Canvas
 */
export function useCanvasDragDrop({
  canvasRef,
  onCollisionChange,
  setCollidingFieldIds,
  onDropPosition,
  onDropNewField,
}: UseCanvasDragDropOptions) {
  const rawShapeRectRef = useRef<Rect | null>(null);

  useDragDropMonitor({
    onDragStart: () => {
      rawShapeRectRef.current = null;
      setCollidingFieldIds([]);
      onCollisionChange?.(false);
    },

    onDragMove: (event) => {
      const shapeRect = event.operation.shape?.current.boundingRectangle;

      if (shapeRect) {
        rawShapeRectRef.current = shapeRect;

        const sourceData = event.operation.source?.data as
          | { fieldId?: string; type?: FieldType; width?: number; height?: number }
          | undefined;

        const rect = getEffectiveDraggedRect(shapeRect, sourceData);

        const canvas = canvasRef.current;
        const collidingIds = canvas
          ? getCollidingFieldIds(canvas, rect, sourceData?.fieldId)
          : [];
        const outsideCanvas = canvas
          ? isOutsideCanvas(canvas.getBoundingClientRect(), rect)
          : false;

        setCollidingFieldIds(collidingIds);
        onCollisionChange?.(collidingIds.length > 0 || outsideCanvas);
      }
    },

    onDragEnd: (event) => {
      setCollidingFieldIds([]);
      onCollisionChange?.(false);

      if (event.operation.canceled || event.operation.target?.id !== "canvas") {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const sourceData = event.operation.source?.data as
        | { fieldId?: string; type?: FieldType; width?: number; height?: number }
        | undefined;

      if (!sourceData?.type) {
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();
      const rawShapeRect =
        rawShapeRectRef.current ??
        event.operation.shape?.current.boundingRectangle;

      if (!rawShapeRect) {
        return;
      }

      const draggedRect = getEffectiveDraggedRect(rawShapeRect, sourceData);
      const sourceFieldId = sourceData.fieldId;
      const outsideCanvas = isOutsideCanvas(canvasRect, draggedRect);
      const collidingIds = getCollidingFieldIds(
        canvas,
        draggedRect,
        sourceFieldId,
      );
      const hasCollision = outsideCanvas || collidingIds.length > 0;

      if (hasCollision) {
        return;
      }

      const coordinates = {
        x: draggedRect.left - canvasRect.left,
        y: draggedRect.top - canvasRect.top,
      };

      if (sourceData.fieldId) {
        onDropPosition(sourceData.fieldId, coordinates);
        return;
      }

      onDropNewField(sourceData.type as FieldType, coordinates);
      rawShapeRectRef.current = null;
    },
  });
}
