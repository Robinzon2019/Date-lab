export const APP_NAME = "Date Lab";
export const APP_VERSION = "1.0.0";
export const STORAGE_PREFIX = "date-lab";

export const DATE_SHIFT_LIMITS = Object.freeze({
  minDays: -365000,
  maxDays: 365000,
  defaultDays: 7,
});

export const TIMER_LIMITS = Object.freeze({
  maxHours: 99,
  maxMinutes: 59,
  maxSeconds: 59,
  defaultMinutes: 5,
});

export const STOPWATCH = Object.freeze({
  tickMs: 50,
  maxLaps: 50,
});
