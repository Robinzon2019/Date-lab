import { addDays, parseSafeDate, toDatetimeLocalValue } from "../../../shared/lib/date/index.js";

export function shiftDateValue(baseValue, days, direction) {
  const base = parseSafeDate(baseValue);
  if (!base) {
    return null;
  }
  const signedDays = days * (direction === "subtract" ? -1 : 1);
  return toDatetimeLocalValue(addDays(base, signedDays));
}
