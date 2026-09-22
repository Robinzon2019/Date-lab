import { test as base, expect } from "@playwright/test";
import { AppPage } from "../pages/AppPage.js";

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new AppPage(page);
    await app.open();
    await use(app);
  },
});

export { expect };
