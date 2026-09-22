export class BasePage {
  /** @param {import("@playwright/test").Page} page */
  constructor(page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto("/");
  }

  async clearClientState() {
    await this.page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  }

  byRole(role, options) {
    return this.page.getByRole(role, options);
  }

  byLabel(label) {
    return this.page.getByLabel(label, { exact: true });
  }

  byTestId(id) {
    return this.page.getByTestId(id);
  }
}
