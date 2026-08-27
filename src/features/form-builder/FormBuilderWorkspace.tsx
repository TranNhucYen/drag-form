import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { CanvasViewPort } from "./canvas/CanvasViewPort";
import { DragPreviewOverlay } from "./dnd/DragPreviewOverlay";
import { Palette } from "./left-sidebar/Palette";

export function FormBuilderWorkspace() {
  const [isDraggingOverField, setIsDraggingOverField] = useState(false);

  return (
    <DragDropProvider>
      <div className="flex h-screen gap-2 overflow-hidden">
        {/* Thanh công cụ danh sách các field có thể kéo thả */}
        <Palette />

        {/* Khung nhìn vùng làm việc chứa trang Canvas */}
        <main className="min-w-0 flex-1">
          <CanvasViewPort onCollisionChange={setIsDraggingOverField} />
        </main>

        {/* Lớp overlay khi kéo thả field */}
        <DragPreviewOverlay isDraggingOverField={isDraggingOverField} />
      </div>
    </DragDropProvider>
  );
}