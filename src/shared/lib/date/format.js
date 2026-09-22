import { MS } from "./constants.js";

const pad = (n, size = 2) => String(n).padStart(size, "0");

export function formatDuration(ms) {
  const safe = Math.max(0, Math.floor(ms));
  const hours = Math.floor(safe / MS.hour);
  const minutes = Math.floor((safe % MS.hour) / MS.minute);
  const seconds = Math.floor((safe % MS.minute) / MS.second);
  const hundredths = Math.floor((safe % MS.second) / 10);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
}

export function formatClock(ms) {
  const safe = Math.max(0, Math.floor(ms));
  const hours = Math.floor(safe / MS.hour);
  const minutes = Math.floor((safe % MS.hour) / MS.minute);
  const seconds = Math.floor((safe % MS.minute) / MS.second);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function formatHumanDate(date) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export function formatNumber(n) {
  return new Intl.NumberFormat("es-ES").format(n);
}
