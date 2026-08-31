import { Copy, CopyPlus, Scissors, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFormBuilderStore } from "../../store/useFormBuilderStore";

type FieldContextMenuProps = {
  fieldId: string;
  children: React.ReactNode;
};

/**
 * FieldContextMenu: Contextmenu hiển thị khi nhấp chuột phải vào một Field trên canvas
 */
export function FieldContextMenu({
  fieldId,
  children,
}: FieldContextMenuProps) {
  const setSelectedFieldId = useFormBuilderStore(
    (state) => state.setSelectedFieldId,
  );
  const duplicateField = useFormBuilderStore((state) => state.duplicateField);
  const copyField = useFormBuilderStore((state) => state.copyField);
  const cutField = useFormBuilderStore((state) => state.cutField);
  const removeField = useFormBuilderStore((state) => state.removeField);

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (open) {
          setSelectedFieldId(fieldId);
        }
      }}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-52">
        <ContextMenuItem
          variant="destructive"
          onClick={() => removeField(fieldId)}
        >
          <Trash2 className="size-3.5" />
          <span>Xóa</span>
          <ContextMenuShortcut>Del / Backspace</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => duplicateField(fieldId)}>
          <CopyPlus className="size-3.5" />
          <span>Nhân bản</span>
          <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => copyField(fieldId)}>
          <Copy className="size-3.5" />
          <span>Sao chép</span>
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => cutField(fieldId)}>
          <Scissors className="size-3.5" />
          <span>Cắt</span>
          <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
