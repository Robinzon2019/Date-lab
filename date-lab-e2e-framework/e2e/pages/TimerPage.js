import { BasePage } from "./BasePage.js";
import { parseClock } from "../helpers/dates.js";

export class TimerPage extends BasePage {
  constructor(page) {
    super(page);
    this.panelTitle = page.getByRole("heading", { name: "Temporizador" });
    this.hours = page.getByLabel("Horas");
    this.minutes = page.getByLabel("Minutos");
    this.seconds = page.getByLabel("Segundos");
    this.display = page.locator(".clock.huge");
    this.startButton = page.getByRole("button", { name: "Iniciar" });
    this.pauseButton = page.getByRole("button", { name: "Pausar" });
    this.resetButton = page.getByRole("button", { name: "Reiniciar" });
    this.finishedAlert = page.getByRole("alert");
    this.acknowledgeButton = page.getByRole("button", { name: "Entendido" });
  }

  async setDuration({ hours = 0, minutes = 0, seconds = 0 }) {
    await this.hours.fill(String(hours));
    await this.minutes.fill(String(minutes));
    await this.seconds.fill(String(seconds));
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

  async readMs() {
    return parseClock(await this.display.innerText());
  }
}
