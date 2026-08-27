import { PointerSensor, useDraggable } from "@dnd-kit/react";
import { useEffectEvent, useMemo, useRef } from "react";
import type { FieldType } from "../types/formBuilder.types";
import type { FieldResizeChange } from "./types/canvas.types";
import { useFieldResize } from "./hooks/useFieldResize";
import { ResizeHandles } from "./components/ResizeHandles";

type FormFieldShellProps = {
  children: React.ReactNode;
  position: { x: number; y: number };
  id: string;
  type: FieldType;
  size?: { width: number; height: number };
  allowResize?: boolean;
  isColliding?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onResize?: (change: FieldResizeChange) => void;
  onMeasure?: (size: { width: number; height: number }) => void;
  onCollisionChange?: (isColliding: boolean) => void;
  onCollidingFieldsChange?: (collidingIds: string[]) => void;
};

/**
 * FormFieldShell: Khung bao ngoài phần tử field trên Canvas
 */
export function FormFieldShell({
  children,
  position,
  id,
  type,
  size: controlledSize,
  allowResize = false,
  isColliding = false,
  isSelected = false,
  onSelect,
  onResize,
  onMeasure,
  onCollisionChange,
  onCollidingFieldsChange,
}: FormFieldShellProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);

  // Bỏ qua drag khi bấm vào resize handle hoặc double click 
  const sensors = useMemo(
    () => [
      PointerSensor.configure({
        preventActivation: (event) => {
          const target = event.target;

          if (!(target instanceof Element)) {
            return false;
          }

          return (
            target.closest('[data-resize-handle="true"]') !== null ||
            event.detail > 1
          );
        },
      }),
    ],
    [],
  );

  const { ref, isDragging } = useDraggable({
    id: `field-${id}`,
    type,
    data: {
      fieldId: id,
      type,
      width: controlledSize?.width,
      height: controlledSize?.height,
    },
    sensors,
  });

  const setShellRef = (element: HTMLDivElement | null) => {
    shellRef.current = element;
    ref(element);
  };

  const handleDoubleClick = useEffectEvent(() => {
    onSelect?.();
  });

  const handlePointerDownCapture = useEffectEvent(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) {
        return;
      }

      if (event.detail === 2) {
        onSelect?.();
      }
    },
  );

  const { startResize } = useFieldResize({
    elementRef: shellRef,
    position,
    controlledSize,
    onResize,
    onMeasure,
    onCollisionChange,
    onCollidingFieldsChange,
    id,
  });

  return (
    <div
      ref={setShellRef}
      data-field-id={id}
      onPointerDownCapture={handlePointerDownCapture}
      onDoubleClick={handleDoubleClick}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        visibility: isDragging ? "hidden" : "visible",
        outline: isColliding
          ? "1px dashed red"
          : isSelected
            ? "1px dashed #2563eb"
            : undefined,
        outlineOffset: "2px",
        width: controlledSize?.width,
        height: controlledSize?.height,
        boxSizing: "border-box",
      }}
    >
      <div className="h-full w-full">
        {children}
      </div>

      {allowResize && isSelected && !isDragging && (
        <ResizeHandles type={type} onResizeStart={startResize} />
      )}
    </div>
  );
}