import { BasePage } from "./BasePage.js";

export class DateShiftPage extends BasePage {
  constructor(page) {
    super(page);
    this.panelTitle = page.getByRole("heading", { name: "Sumar o restar días" });
    this.baseInput = page.getByLabel("Fecha base");
    this.daysInput = page.getByLabel("Días a aplicar");
    this.addButton = page.getByRole("button", { name: "Sumar días" });
    this.subtractButton = page.getByRole("button", { name: "Restar días" });
    this.resultCard = page.locator(".result-card");
    this.technicalValue = this.resultCard.locator(".muted");
  }

  async configure(base, days) {
    await this.baseInput.fill(base);
    await this.daysInput.fill(String(days));
  }

  async addDays() {
    await this.addButton.click();
  }

  async subtractDays() {
    await this.subtractButton.click();
  }
}
