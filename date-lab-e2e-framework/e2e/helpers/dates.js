export function pad(value, size = 2) {
  return String(value).padStart(size, "0");
}

export function toDatetimeLocal(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function addDays(date, days) {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

export function parseClock(text) {
  const match = text.trim().match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{2}))?$/);
  if (!match) {
    throw new Error(`Reloj no reconocido: ${text}`);
  }
  const [, hh, mm, ss, hs = "0"] = match;
  return (
    Number(hh) * 3_600_000 +
    Number(mm) * 60_000 +
    Number(ss) * 1000 +
    Number(hs) * 10
  );
}
