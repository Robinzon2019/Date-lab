import { ISO_DATE, ISO_LOCAL } from "./constants.js";

export function parseSafeDate(value) {
  if (value == null || value === "") {
    return null;
  }
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!ISO_LOCAL.test(trimmed) && !ISO_DATE.test(trimmed)) {
    return null;
  }

  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toDatetimeLocalValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function nowLocalValue() {
  return toDatetimeLocalValue(new Date());
}

export function clampInteger(
  raw,
  { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = {},
) {
  const n = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(n)) {
    return 0;
  }
  return Math.min(max, Math.max(min, n));
}
