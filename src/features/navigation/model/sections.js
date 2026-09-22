export const SECTIONS = Object.freeze([
  { id: "diff", label: "Diferencia" },
  { id: "shift", label: "Sumar / restar" },
  { id: "stopwatch", label: "Cronómetro" },
  { id: "timer", label: "Temporizador" },
]);

export const SECTION_IDS = SECTIONS.map((section) => section.id);

export function isSectionId(value) {
  return SECTION_IDS.includes(value);
}
