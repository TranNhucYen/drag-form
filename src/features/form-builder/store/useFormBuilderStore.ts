import { create } from "zustand";
import { PAGE_PRESETS } from "../constants/form.constants";
import type { Orientation, PageSize } from "../types/formBuilder.types";

export type PagePresetKey = keyof typeof PAGE_PRESETS;

export interface FormBuilderState {
  // Cấu hình trang in (Page Settings)
  pageSizePreset: PagePresetKey;
  orientation: Orientation;

  // Actions cập nhật
  setPageSizePreset: (preset: PagePresetKey) => void;
  setOrientation: (orientation: Orientation) => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  pageSizePreset: "A4",
  orientation: "PORTRAIT",

  setPageSizePreset: (preset) => set({ pageSizePreset: preset }),

  setOrientation: (orientation) => set({ orientation }),
}));

/**
 * Helper: Tính toán lại kích thước page bằng cách đảo ngược giá trị width và height dựa trên orientation
 */
export function getEffectivePageDimensions(
  pageSizePreset: PagePresetKey,
  orientation: Orientation,
): PageSize {
  const baseSize = PAGE_PRESETS[pageSizePreset] ?? PAGE_PRESETS.A4;

  if (orientation === "LANDSCAPE") {
    return {
      width: baseSize.height,
      height: baseSize.width,
    };
  }
  return {
    width: baseSize.width,
    height: baseSize.height,
  };
}

/**
 * Hook: Lấy kích thước trang in thực tế an toàn cho SSR / hydration (tránh tạo object mới)
 */
export function useEffectivePageDimensions(): PageSize {
  const pageSizePreset = useFormBuilderStore((state) => state.pageSizePreset);
  const orientation = useFormBuilderStore((state) => state.orientation);

  return getEffectivePageDimensions(pageSizePreset, orientation);
}
