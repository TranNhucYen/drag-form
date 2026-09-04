import { useEffect, useRef, useState } from "react";
import type { FieldProps } from "../types/field.types";
import { InputOverlay } from "../shared/InputOverlay";

export function CheckboxField({ label = "Xác nhận" }: FieldProps = {}) {
  const [labelText, setLabelText] = useState(label);
  const [prevLabel, setPrevLabel] = useState(label);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (label !== prevLabel) {
    setPrevLabel(label);
    setLabelText(label);
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);

      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  }, [isEditing]);

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLabelText(label);
    setIsEditing(false);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="flex h-full w-max shrink-0 items-center gap-2 whitespace-nowrap select-none cursor-text"
    >
      <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-400 bg-white" />
      <span className="relative inline-block min-w-4 text-sm text-gray-800">
        <span className={`select-none whitespace-pre ${isEditing ? "invisible" : ""}`}>
          {labelText || " "}
        </span>
        {isEditing && (
          <InputOverlay
            value={labelText}
            onChange={setLabelText}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            inputRef={inputRef}
          />
        )}
      </span>
    </div>
  );
}
