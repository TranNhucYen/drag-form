import { useState } from "react";
import type { CanvasField, FieldResizeChange } from "../types/canvas.types";
import type { FieldType } from "../../types/formBuilder.types";
import { FIELD_DEFINITIONS_MAP } from "../../constants/fields.config";

/**
 * useCanvasFieldsState: Quản lý danh sách fields và các thao tác thêm, sửa, đổi vị trí, resize
 */
export function useCanvasFieldsState() {
  const [fields, setFields] = useState<CanvasField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [collidingFieldIds, setCollidingFieldIds] = useState<string[]>([]);

  const addField = (type: FieldType, coordinates: { x: number; y: number }) => {
    const defaultSize = FIELD_DEFINITIONS_MAP[type]?.defaultSize;
    setFields((prev) => [
      ...prev,
      {
        id: globalThis.crypto.randomUUID(),
        type,
        ...coordinates,
        width: defaultSize?.width,
        height: defaultSize?.height,
      },
    ]);
  };

  const updateFieldPosition = (
    fieldId: string,
    coordinates: { x: number; y: number },
  ) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, ...coordinates } : field,
      ),
    );
  };

  const updateFieldResize = (fieldId: string, change: FieldResizeChange) => {
    setFields((prev) =>
      prev.map((item) =>
        item.id === fieldId
          ? { ...item, x: change.position.x, y: change.position.y, ...change.size }
          : item,
      ),
    );
  };

  const measureField = (
    fieldId: string,
    size: { width: number; height: number },
  ) => {
    setFields((prev) => {
      const currentField = prev.find((item) => item.id === fieldId);

      if (!currentField) {
        return prev;
      }

      if (
        currentField.width !== undefined &&
        currentField.height !== undefined
      ) {
        return prev;
      }

      return prev.map((item) =>
        item.id === fieldId ? { ...item, ...size } : item,
      );
    });
  };

  return {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    collidingFieldIds,
    setCollidingFieldIds,
    addField,
    updateFieldPosition,
    updateFieldResize,
    measureField,
  };
}
