import { create } from "zustand";
import { STOPWATCH } from "../../../shared/config/constants.js";

function currentElapsed(state) {
  if (!state.running || state.startedAt == null) {
    return state.elapsedMs;
  }
  return state.elapsedMs + (Date.now() - state.startedAt);
}

export const useStopwatchStore = create((set, get) => ({
  elapsedMs: 0,
  running: false,
  startedAt: null,
  laps: [],
  start: () => {
    if (get().running) {
      return;
    }
    set({ running: true, startedAt: Date.now() });
  },
  pause: () => {
    const state = get();
    if (!state.running || state.startedAt == null) {
      return;
    }
    set({
      running: false,
      elapsedMs: state.elapsedMs + (Date.now() - state.startedAt),
      startedAt: null,
    });
  },
  reset: () =>
    set({
      elapsedMs: 0,
      running: false,
      startedAt: null,
      laps: [],
    }),
  addLap: () => {
    const state = get();
    const ms = currentElapsed(state);
    const lap = { id: crypto.randomUUID(), ms };
    set({ laps: [lap, ...state.laps].slice(0, STOPWATCH.maxLaps) });
  },
  tick: () => {
    const state = get();
    if (!state.running || state.startedAt == null) {
      return;
    }
    const elapsed = Date.now() - state.startedAt;
    set({ elapsedMs: state.elapsedMs + elapsed, startedAt: Date.now() });
  },
}));
