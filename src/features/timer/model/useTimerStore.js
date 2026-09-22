import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_PREFIX, TIMER_LIMITS } from "../../../shared/config/constants.js";
import { clampInteger } from "../../../shared/lib/date/index.js";
import { toMilliseconds } from "../lib/duration.js";

const configuredMs = (state) =>
  toMilliseconds(state.hours, state.minutes, state.seconds);

export const useTimerStore = create(
  persist(
    (set, get) => ({
      hours: 0,
      minutes: TIMER_LIMITS.defaultMinutes,
      seconds: 0,
      remainingMs: toMilliseconds(0, TIMER_LIMITS.defaultMinutes, 0),
      running: false,
      finished: false,
      setHours: (value) =>
        set({ hours: clampInteger(value, { min: 0, max: TIMER_LIMITS.maxHours }) }),
      setMinutes: (value) =>
        set({ minutes: clampInteger(value, { min: 0, max: TIMER_LIMITS.maxMinutes }) }),
      setSeconds: (value) =>
        set({ seconds: clampInteger(value, { min: 0, max: TIMER_LIMITS.maxSeconds }) }),
      start: () => {
        const state = get();
        const remaining =
          state.finished || state.remainingMs <= 0 ? configuredMs(state) : state.remainingMs;
        if (remaining <= 0) {
          return;
        }
        set({ running: true, finished: false, remainingMs: remaining });
      },
      pause: () => set({ running: false }),
      reset: () => {
        const state = get();
        set({
          running: false,
          finished: false,
          remainingMs: configuredMs(state),
        });
      },
      tick: (delta) => {
        const state = get();
        if (!state.running) {
          return;
        }
        const next = state.remainingMs - delta;
        if (next <= 0) {
          set({ remainingMs: 0, running: false, finished: true });
          return;
        }
        set({ remainingMs: next });
      },
      acknowledge: () => set({ finished: false }),
    }),
    {
      name: `${STORAGE_PREFIX}:timer`,
      partialize: (state) => ({
        hours: state.hours,
        minutes: state.minutes,
        seconds: state.seconds,
      }),
    },
  ),
);
