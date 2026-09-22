import { MS } from "./constants.js";

export function addDays(date, days) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function calendarDiff(start, end) {
  const inverted = start.getTime() > end.getTime();
  const a = inverted ? end : start;
  const b = inverted ? start : end;

  let years = b.getFullYear() - a.getFullYear();
  let months = b.getMonth() - a.getMonth();
  let days = b.getDate() - a.getDate();
  let hours = b.getHours() - a.getHours();
  let minutes = b.getMinutes() - a.getMinutes();
  let seconds = b.getSeconds() - a.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalMs = Math.abs(end.getTime() - start.getTime());

  return {
    inverted,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    weeks: Math.floor(totalMs / MS.week),
    total: {
      weeks: Math.floor(totalMs / MS.week),
      days: Math.floor(totalMs / MS.day),
      hours: Math.floor(totalMs / MS.hour),
      minutes: Math.floor(totalMs / MS.minute),
      seconds: Math.floor(totalMs / MS.second),
      milliseconds: totalMs,
    },
  };
}
