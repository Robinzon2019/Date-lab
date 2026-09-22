export function toMilliseconds(hours, minutes, seconds) {
  return ((hours * 3600) + (minutes * 60) + seconds) * 1000;
}
