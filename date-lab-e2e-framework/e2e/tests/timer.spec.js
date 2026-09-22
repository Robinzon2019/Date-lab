import { test, expect } from "../fixtures/test.js";

test.describe("Temporizador", () => {
  test.beforeEach(async ({ app }) => {
    await app.goTo("Temporizador");
    await expect(app.timer.panelTitle).toBeVisible();
  });

  test("cuenta hacia atrás y muestra alerta al terminar", async ({ app }) => {
    const timer = app.timer;
    await timer.setDuration({ hours: 0, minutes: 0, seconds: 1 });
    await timer.reset();
    await expect(timer.display).toHaveText("00:00:01");
    await timer.start();
    await expect(timer.finishedAlert).toBeVisible({ timeout: 8_000 });
    await expect(timer.finishedAlert).toContainText("cero");
    await timer.acknowledgeButton.click();
    await expect(timer.finishedAlert).toHaveCount(0);
  });

  test("pausa conserva tiempo restante", async ({ app }) => {
    const timer = app.timer;
    await timer.setDuration({ hours: 0, minutes: 0, seconds: 8 });
    await timer.reset();
    await timer.start();
    await app.page.waitForTimeout(400);
    await timer.pause();
    const paused = await timer.readMs();
    expect(paused).toBeGreaterThan(0);
    expect(paused).toBeLessThan(8_000);
    await app.page.waitForTimeout(300);
    expect(await timer.readMs()).toBe(paused);
  });
});
