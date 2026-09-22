import { test, expect } from "../fixtures/test.js";

const TABS = ["Diferencia", "Sumar / restar", "Cronómetro", "Temporizador"];

test.describe("Navegación", () => {
  test("muestra Date Lab y la pestaña de diferencia por defecto", async ({ app }) => {
    await expect(app.heading).toBeVisible();
    await expect(app.tab("Diferencia")).toHaveAttribute("aria-selected", "true");
    await expect(app.dateDiff.panelTitle).toBeVisible();
  });

  for (const name of TABS) {
    test(`abre la sección ${name}`, async ({ app }) => {
      await app.goTo(name);
      await expect(app.tab(name)).toHaveAttribute("aria-selected", "true");
    });
  }

  test("el skip link apunta al contenido principal", async ({ app }) => {
    await expect(app.skipLink).toHaveAttribute("href", "#contenido");
    await expect(app.main).toBeVisible();
  });
});
