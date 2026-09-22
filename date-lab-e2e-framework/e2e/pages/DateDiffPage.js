import { BasePage } from "./BasePage.js";

export class DateDiffPage extends BasePage {
  constructor(page) {
    super(page);
    this.panelTitle = page.getByRole("heading", { name: "Diferencia entre fechas" });
    this.startInput = page.getByLabel("Fecha y hora de inicio");
    this.endInput = page.getByLabel("Fecha y hora final");
    this.stats = page.locator(".stats");
    this.chips = page.locator(".chips");
    this.summary = page.locator(".summary").first();
  }

  async setRange(start, end) {
    await this.startInput.fill(start);
    await this.endInput.fill(end);
  }

  stat(label) {
    return this.stats.locator("li").filter({ hasText: label }).locator("strong");
  }

  totalChip(label) {
    return this.chips.getByText(new RegExp(label));
  }
}
