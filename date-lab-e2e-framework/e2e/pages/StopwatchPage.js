import { BasePage } from "./BasePage.js";
import { parseClock } from "../helpers/dates.js";

export class StopwatchPage extends BasePage {
  constructor(page) {
    super(page);
    this.panelTitle = page.getByRole("heading", { name: "Cronómetro" });
    this.display = page.locator(".clock.huge");
    this.startButton = page.getByRole("button", { name: "Iniciar" });
    this.pauseButton = page.getByRole("button", { name: "Pausar" });
    this.lapButton = page.getByRole("button", { name: "Vuelta" });
    this.resetButton = page.getByRole("button", { name: "Reiniciar" });
    this.laps = page.locator("ol.laps li");
  }

  async start() {
    await this.startButton.click();
  }

  async pause() {
    await this.pauseButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async addLap() {
    await this.lapButton.click();
  }

  async readMs() {
    return parseClock(await this.display.innerText());
  }
}
