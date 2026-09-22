import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_PREFIX } from "../../../shared/config/constants.js";
import { isSectionId } from "./sections.js";

export const useNavigationStore = create(
  persist(
    (set) => ({
      section: "diff",
      setSection: (section) => {
        if (isSectionId(section)) {
          set({ section });
        }
      },
    }),
    {
      name: `${STORAGE_PREFIX}:navigation`,
      partialize: (state) => ({ section: state.section }),
    },
  ),
);
