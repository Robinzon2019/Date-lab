export const DATE_DIFF_CASES = [
  {
    name: "un día exacto",
    start: "2024-01-01T00:00",
    end: "2024-01-02T00:00",
    expected: { years: "0", months: "0", days: "1", hours: "0" },
    totalDays: "1",
  },
  {
    name: "un año",
    start: "2023-03-15T08:00",
    end: "2024-03-15T08:00",
    expected: { years: "1", months: "0", days: "0" },
  },
];

export const DATE_SHIFT_CASES = [
  {
    name: "sumar una semana",
    base: "2024-06-01T12:00",
    days: "7",
    action: "add",
    technical: "2024-06-08 12:00",
  },
  {
    name: "restar un día",
    base: "2024-06-01T12:00",
    days: "1",
    action: "subtract",
    technical: "2024-05-31 12:00",
  },
];
