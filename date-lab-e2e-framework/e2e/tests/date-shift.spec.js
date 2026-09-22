import { test, expect } from "../fixtures/test.js";
import { DATE_SHIFT_CASES } from "../data/scenarios.js";

test.describe("Sumar y restar días", () => {
  test.beforeEach(async ({ app }) => {
    await app.goTo("Sumar / restar");
    await expect(app.dateShift.panelTitle).toBeVisible();
  });

  for (const scenario of DATE_SHIFT_CASES) {
    test(scenario.name, async ({ app }) => {
      const panel = app.dateShift;
      await panel.configure(scenario.base, scenario.days);
      if (scenario.action === "add") {
        await panel.addDays();
      } else {
        await panel.subtractDays();
      }
      await expect(panel.technicalValue).toContainText(scenario.technical);
    });
  }
});
