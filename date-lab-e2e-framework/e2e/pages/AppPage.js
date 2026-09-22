import { BasePage } from "./BasePage.js";
import { DateDiffPage } from "./DateDiffPage.js";
import { DateShiftPage } from "./DateShiftPage.js";
import { StopwatchPage } from "./StopwatchPage.js";
import { TimerPage } from "./TimerPage.js";

export class AppPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", { name: "Date Lab", level: 1 });
    this.skipLink = page.getByRole("link", { name: "Saltar al contenido" });
    this.tabs = page.getByRole("navigation", { name: "Secciones de Date Lab" });
    this.main = page.locator("#contenido");
    this.dateDiff = new DateDiffPage(page);
    this.dateShift = new DateShiftPage(page);
    this.stopwatch = new StopwatchPage(page);
    this.timer = new TimerPage(page);
  }

  async open() {
    await this.gotoHome();
    await this.clearClientState();
    await this.page.reload();
    await this.heading.waitFor();
  }

  tab(name) {
    return this.tabs.getByRole("tab", { name });
  }

  async goTo(name) {
    await this.tab(name).click();
    await this.tab(name).waitFor();
  }
}
