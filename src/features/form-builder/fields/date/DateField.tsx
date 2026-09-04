import { useEffect, useRef, useState } from "react";
import type { FieldProps } from "../types/field.types";
import { DotDecoration } from "../shared/DotDecoration";
import { InputOverlay } from "../shared/InputOverlay";

export function DateField({
  label = "",
  value = "24/08/2026",
  width,
}: FieldProps = {}) {
  const [locationText, setLocationText] = useState(label);

  // Lưu label ở lần render trước để phát hiện khi prop label thay đổi
  const [prevLabel, setPrevLabel] = useState(label);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Đồng bộ locationText khi label từ component cha thay đổi
  if (label !== prevLabel) {
    setPrevLabel(label);
    setLocationText(label);
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

  return (
    <span
      style={width !== undefined ? { width: "100%" } : undefined}
      onDoubleClick={handleDoubleClick}
      className={`
        relative inline-flex items-center whitespace-nowrap overflow-hidden select-none cursor-text
        ${width === undefined ? "w-max" : "w-full"}
      `}
    >
      {/* Vùng địa điểm */}
      <span className="relative inline-block h-[1lh] min-w-6 flex-1 overflow-hidden leading-[1.25]">
        <DotDecoration />
        {locationText && (
          <span className={`relative z-10 bg-white pr-1 leading-[1.25] ${isEditing ? "invisible" : ""}`}>
            {locationText}
          </span>
        )}
        {isEditing && (
          <InputOverlay
            value={locationText}
            onChange={setLocationText}
            onSubmit={() => setIsEditing(false)}
            onCancel={() => {
              setLocationText(label);
              setIsEditing(false);
            }}
            inputRef={inputRef}
          />
        )}
      </span>
      {/* Phần value ngày tháng năm */}
      <span className="shrink-0 inline-flex items-center leading-[1.25]">
        <span>, ngày </span>
        <span className="relative inline-block h-[1lh] w-7 overflow-hidden leading-[1.25]">
          <DotDecoration />
        </span>
        <span> tháng </span>
        <span className="relative inline-block h-[1lh] w-7 overflow-hidden leading-[1.25]">
          <DotDecoration />
        </span>
        <span> năm </span>
        <span className="relative inline-block h-[1lh] w-10 overflow-hidden leading-[1.25]">
          <DotDecoration />
        </span>
      </span>
    </span>
  );
}
