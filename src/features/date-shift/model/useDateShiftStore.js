import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DATE_SHIFT_LIMITS, STORAGE_PREFIX } from "../../../shared/config/constants.js";
import {
  addDays,
  clampInteger,
  nowLocalValue,
  parseSafeDate,
  toDatetimeLocalValue,
} from "../../../shared/lib/date/index.js";
import { shiftDateValue } from "../lib/shiftDate.js";

export const useDateShiftStore = create(
  persist(
    (set, get) => ({
      baseDate: nowLocalValue(),
      days: DATE_SHIFT_LIMITS.defaultDays,
      result: toDatetimeLocalValue(addDays(new Date(), DATE_SHIFT_LIMITS.defaultDays)),
      setBaseDate: (value) => {
        if (value === "" || parseSafeDate(value)) {
          set({ baseDate: value });
        }
      },
      setDays: (value) => {
        set({
          days: clampInteger(value, {
            min: DATE_SHIFT_LIMITS.minDays,
            max: DATE_SHIFT_LIMITS.maxDays,
          }),
        });
      },
      applyShift: (direction) => {
        const result = shiftDateValue(get().baseDate, get().days, direction);
        if (result) {
          set({ result });
        }
      },
    }),
    {
      name: `${STORAGE_PREFIX}:date-shift`,
      partialize: (state) => ({
        baseDate: state.baseDate,
        days: state.days,
        result: state.result,
      }),
    },
  ),
);
