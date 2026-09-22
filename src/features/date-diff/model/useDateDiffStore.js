import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_PREFIX } from "../../../shared/config/constants.js";
import { nowLocalValue, parseSafeDate } from "../../../shared/lib/date/index.js";

function acceptDateInput(value) {
  return value === "" || Boolean(parseSafeDate(value));
}

export const useDateDiffStore = create(
  persist(
    (set) => ({
      startDate: nowLocalValue(),
      endDate: nowLocalValue(),
      setStartDate: (value) => {
        if (acceptDateInput(value)) {
          set({ startDate: value });
        }
      },
      setEndDate: (value) => {
        if (acceptDateInput(value)) {
          set({ endDate: value });
        }
      },
    }),
    {
      name: `${STORAGE_PREFIX}:date-diff`,
      partialize: (state) => ({
        startDate: state.startDate,
        endDate: state.endDate,
      }),
    },
  ),
);
