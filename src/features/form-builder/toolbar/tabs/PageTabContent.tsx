import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { EditableSelect } from "../components/EditableSelect";
import { PageSizePopover } from "../components/PageSizePopover";
import { MARGIN_FIELDS, MARGIN_OPTIONS } from "../constants/toolbar.constants";
import type { Orientation } from "../../types/formBuilder.types";

export function PageTabContent() {
  const [pageSize, setPageSize] = useState("A4");
  const [orientation, setOrientation] = useState<Orientation>(
    "PORTRAIT",
  );
  const [margins, setMargins] = useState({
    top: "20",
    bottom: "20",
    left: "20",
    right: "20",
  });

  const handleMarginChange = (key: keyof typeof margins, value: string) => {
    setMargins((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Khổ giấy & Hướng giấy */}
      <PageSizePopover
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        orientation={orientation}
        onOrientationChange={setOrientation}
      />

      {/* Cụm thiết lập Lề trang (Top, Bottom, Left, Right) */}
      <div className="flex h-7 items-center gap-1.5 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <SlidersHorizontal className="size-3" />
          <span className="text-[11px] font-medium text-foreground">Lề:</span>
        </div>

        {MARGIN_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground">
              {label}
            </span>
            <EditableSelect
              value={margins[key]}
              onChange={(val) => handleMarginChange(key, val)}
              options={MARGIN_OPTIONS}
              suffix="mm"
              className="h-5.5 w-[56px]"
              inputClassName="text-[11px]"
              popoverClassName="w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
