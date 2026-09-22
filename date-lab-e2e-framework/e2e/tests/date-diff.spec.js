import { test, expect } from "../fixtures/test.js";
import { DATE_DIFF_CASES } from "../data/scenarios.js";

test.describe("Diferencia entre fechas", () => {
  test.beforeEach(async ({ app }) => {
    await app.goTo("Diferencia");
  });

  for (const scenario of DATE_DIFF_CASES) {
    test(`calcula ${scenario.name}`, async ({ app }) => {
      const panel = app.dateDiff;
      await panel.setRange(scenario.start, scenario.end);
      await expect(panel.stat("años")).toHaveText(scenario.expected.years);
      await expect(panel.stat("meses")).toHaveText(scenario.expected.months);
      await expect(panel.stat("días")).toHaveText(scenario.expected.days);
      if (scenario.expected.hours) {
        await expect(panel.stat("horas")).toHaveText(scenario.expected.hours);
      }
      if (scenario.totalDays) {
        await expect(panel.totalChip(`${scenario.totalDays} días`)).toBeVisible();
      }
    });
  }

  test("avisa cuando el intervalo está invertido", async ({ app }) => {
    await app.dateDiff.setRange("2024-02-02T00:00", "2024-02-01T00:00");
    await expect(app.dateDiff.summary).toContainText("posterior");
  });
});
