import { PageSize } from "../types/formBuilder.types";

export const PAGE_PRESETS = {
  A4: {
    width: 210,
    height: 297,
  },
  A5: {
    width: 148,
    height: 210,
  },
  A3: {
    width: 297,
    height: 420,
  },
} as const satisfies Record<string, PageSize>;