# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: timer.spec.js >> Temporizador >> cuenta hacia atrás y muestra alerta al terminar
- Location: e2e\tests\timer.spec.js:9:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Iniciar' }) resolved to 2 elements:
    1) <button type="submit" class="btn primary">Iniciar</button> aka getByRole('button', { name: 'Iniciar', exact: true })
    2) <button type="button" class="btn ghost">Reiniciar</button> aka getByRole('button', { name: 'Reiniciar' })

Call log:
  - waiting for getByRole('button', { name: 'Iniciar' })

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - link "Saltar al contenido" [ref=f1e4] [cursor=pointer]:
    - /url: "#contenido"
  - banner [ref=f1e5]:
    - heading "Date Lab" [level=1] [ref=f1e6]
    - paragraph [ref=f1e7]: Calcula intervalos, desplaza fechas y controla el tiempo. Sin servidor, sin rastreo y con teclado completo.
  - navigation "Secciones de Date Lab" [ref=f1e8]:
    - tab "Diferencia" [ref=f1e9] [cursor=pointer]
    - tab "Sumar / restar" [ref=f1e10] [cursor=pointer]
    - tab "Cronómetro" [ref=f1e11] [cursor=pointer]
    - tab "Temporizador" [selected] [ref=f1e12] [cursor=pointer]
  - main [ref=f1e13]:
    - region [ref=f1e14]:
      - generic [ref=f1e15]:
        - heading "Temporizador" [level=2] [ref=f1e16]
        - paragraph [ref=f1e17]: Cuenta regresiva en el navegador. Todo el cálculo ocurre en tu dispositivo.
      - generic [ref=f1e18]:
        - generic [ref=f1e19]:
          - generic [ref=f1e20]:
            - generic [ref=f1e21]: Horas
            - spinbutton "Horas" [ref=f1e22]: "0"
          - generic [ref=f1e23]:
            - generic [ref=f1e24]: Minutos
            - spinbutton "Minutos" [ref=f1e25]: "0"
          - generic [ref=f1e26]:
            - generic [ref=f1e27]: Segundos
            - spinbutton "Segundos" [ref=f1e28]: "1"
        - paragraph [ref=f1e29]: 00:00:01
        - paragraph [ref=f1e30]: Temporizador en 00:00:01
        - generic [ref=f1e31]:
          - button "Iniciar" [ref=f1e32] [cursor=pointer]
          - button "Reiniciar" [active] [ref=f1e33] [cursor=pointer]
  - contentinfo [ref=f1e34]:
    - paragraph [ref=f1e35]: Date Lab 1.0.0 — React, Vite y Zustand. Los datos permanecen en este navegador.
```

# Test source

```ts
  1  | import { BasePage } from "./BasePage.js";
  2  | import { parseClock } from "../helpers/dates.js";
  3  | 
  4  | export class TimerPage extends BasePage {
  5  |   constructor(page) {
  6  |     super(page);
  7  |     this.panelTitle = page.getByRole("heading", { name: "Temporizador" });
  8  |     this.hours = page.getByLabel("Horas");
  9  |     this.minutes = page.getByLabel("Minutos");
  10 |     this.seconds = page.getByLabel("Segundos");
  11 |     this.display = page.locator(".clock.huge");
  12 |     this.startButton = page.getByRole("button", { name: "Iniciar" });
  13 |     this.pauseButton = page.getByRole("button", { name: "Pausar" });
  14 |     this.resetButton = page.getByRole("button", { name: "Reiniciar" });
  15 |     this.finishedAlert = page.getByRole("alert");
  16 |     this.acknowledgeButton = page.getByRole("button", { name: "Entendido" });
  17 |   }
  18 | 
  19 |   async setDuration({ hours = 0, minutes = 0, seconds = 0 }) {
  20 |     await this.hours.fill(String(hours));
  21 |     await this.minutes.fill(String(minutes));
  22 |     await this.seconds.fill(String(seconds));
  23 |   }
  24 | 
  25 |   async start() {
> 26 |     await this.startButton.click();
     |                            ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Iniciar' }) resolved to 2 elements:
  27 |   }
  28 | 
  29 |   async pause() {
  30 |     await this.pauseButton.click();
  31 |   }
  32 | 
  33 |   async reset() {
  34 |     await this.resetButton.click();
  35 |   }
  36 | 
  37 |   async readMs() {
  38 |     return parseClock(await this.display.innerText());
  39 |   }
  40 | }
  41 | 
```