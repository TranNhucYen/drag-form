import { useDroppable } from "@dnd-kit/react";
import { useRef } from "react";
import { PAGE_PRESETS } from "../constants/form.constants";
import { toInternalUnit, toScreenPx } from "../domain/units";
import { FieldRenderer } from "../fields/FieldRenderer";
import { RESIZABLE_FIELD_TYPES } from "./constants/resizableFieldTypes";
import { FormFieldShell } from "./FormFieldShell";
import { useCanvasDragDrop } from "./hooks/useCanvasDragDrop";
import { useCanvasFieldsState } from "./hooks/useCanvasFieldsState";

type FormCanvasProps = {
  pageSize?: (typeof PAGE_PRESETS)[keyof typeof PAGE_PRESETS];
  onCollisionChange?: (isColliding: boolean) => void;
};

/**
 * FormCanvas: Vùng hiển thị trang in và chứa các phần tử kéo thả
 */
export function FormCanvas({
  pageSize = PAGE_PRESETS.A4,
  onCollisionChange,
}: FormCanvasProps) {
  const internalSize = {
    width: toInternalUnit(pageSize.width),
    height: toInternalUnit(pageSize.height),
  };
  const canvasStyle = {
    width: toScreenPx(internalSize.width),
    height: toScreenPx(internalSize.height),
  };

  const pageRef = useRef<HTMLDivElement>(null);

  const { ref: droppableRef } = useDroppable({
    id: "canvas",
  });

  const setCanvasRef = (element: HTMLDivElement | null) => {
    pageRef.current = element;
    droppableRef(element);
  };

  const {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    collidingFieldIds,
    setCollidingFieldIds,
    addField,
    updateFieldPosition,
    updateFieldResize,
    measureField,
  } = useCanvasFieldsState();

  useCanvasDragDrop({
    canvasRef: pageRef,
    onCollisionChange,
    setCollidingFieldIds,
    onDropPosition: updateFieldPosition,
    onDropNewField: addField,
  });

  return (
    <div
      ref={setCanvasRef}
      data-droppable-id="canvas"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedFieldId(null);
        }
      }}
      className="relative flex bg-white shadow-md outline outline-1 outline-gray-300"
      style={{
        width: `${canvasStyle.width}px`,
        height: `${canvasStyle.height}px`,
      }}
    >
      {fields.map((field) => {
        const isResizable = RESIZABLE_FIELD_TYPES.includes(field.type);
        const hasMeasuredSize =
          field.width !== undefined && field.height !== undefined;

        return (
          <FormFieldShell
            key={field.id}
            id={field.id}
            type={field.type}
            position={{ x: field.x, y: field.y }}
            size={
              isResizable && hasMeasuredSize
                ? { width: field.width!, height: field.height! }
                : undefined
            }
            allowResize={isResizable}
            isColliding={collidingFieldIds.includes(field.id)}
            isSelected={selectedFieldId === field.id}
            onSelect={() => setSelectedFieldId(field.id)}
            onResize={(change) => updateFieldResize(field.id, change)}
            onCollisionChange={onCollisionChange}
            onCollidingFieldsChange={setCollidingFieldIds}
            onMeasure={
              isResizable
                ? (size) => measureField(field.id, size)
                : undefined
            }
          >
            <FieldRenderer
              type={field.type}
              width={field.width}
              height={field.height}
            />
          </FormFieldShell>
        );
      })}
    </div>
  );
}