import { test, expect } from "../fixtures/test.js";

test.describe("Cronómetro", () => {
  test.beforeEach(async ({ app }) => {
    await app.goTo("Cronómetro");
    await expect(app.stopwatch.panelTitle).toBeVisible();
  });

  test("inicia, avanza y se puede pausar", async ({ app }) => {
    const sw = app.stopwatch;
    await expect(sw.display).toHaveText("00:00:00.00");
    await sw.start();
    await expect(sw.pauseButton).toBeVisible();
    await app.page.waitForTimeout(200);
    expect(await sw.readMs()).toBeGreaterThan(0);
    await sw.pause();
    await expect(sw.startButton).toBeVisible();
  });

  test("registra una vuelta y reinicia", async ({ app }) => {
    const sw = app.stopwatch;
    await sw.start();
    await app.page.waitForTimeout(120);
    await sw.addLap();
    await expect(sw.laps).toHaveCount(1);
    await sw.reset();
    await expect(sw.display).toHaveText("00:00:00.00");
    await expect(sw.laps).toHaveCount(0);
  });
});
