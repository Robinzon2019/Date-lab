# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stopwatch.spec.js >> Cronómetro >> registra una vuelta y reinicia
- Location: e2e\tests\stopwatch.spec.js:20:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Iniciar' }) resolved to 2 elements:
    1) <button type="button" class="btn primary">Iniciar</button> aka getByRole('button', { name: 'Iniciar', exact: true })
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
    - tab "Cronómetro" [active] [selected] [ref=f1e11] [cursor=pointer]
    - tab "Temporizador" [ref=f1e12] [cursor=pointer]
  - main [ref=f1e13]:
    - region [ref=f1e14]:
      - generic [ref=f1e15]:
        - heading "Cronómetro" [level=2] [ref=f1e16]
        - paragraph [ref=f1e17]: Mide tiempo transcurrido con precisión de centésimas y guarda vueltas.
      - paragraph [ref=f1e18]: 00:00:00.00
      - paragraph [ref=f1e19]: "Cronómetro en pausa: 00:00:00.00"
      - generic [ref=f1e20]:
        - button "Iniciar" [ref=f1e21] [cursor=pointer]
        - button "Vuelta" [disabled] [ref=f1e22]
        - button "Reiniciar" [ref=f1e23] [cursor=pointer]
      - heading "Vueltas" [level=3] [ref=f1e24]
      - paragraph [ref=f1e25]: Aún no hay vueltas registradas.
  - contentinfo [ref=f1e26]:
    - paragraph [ref=f1e27]: Date Lab 1.0.0 — React, Vite y Zustand. Los datos permanecen en este navegador.
```

# Test source

```ts
  1  | import { BasePage } from "./BasePage.js";
  2  | import { parseClock } from "../helpers/dates.js";
  3  | 
  4  | export class StopwatchPage extends BasePage {
  5  |   constructor(page) {
  6  |     super(page);
  7  |     this.panelTitle = page.getByRole("heading", { name: "Cronómetro" });
  8  |     this.display = page.locator(".clock.huge");
  9  |     this.startButton = page.getByRole("button", { name: "Iniciar" });
  10 |     this.pauseButton = page.getByRole("button", { name: "Pausar" });
  11 |     this.lapButton = page.getByRole("button", { name: "Vuelta" });
  12 |     this.resetButton = page.getByRole("button", { name: "Reiniciar" });
  13 |     this.laps = page.locator("ol.laps li");
  14 |   }
  15 | 
  16 |   async start() {
> 17 |     await this.startButton.click();
     |                            ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Iniciar' }) resolved to 2 elements:
  18 |   }
  19 | 
  20 |   async pause() {
  21 |     await this.pauseButton.click();
  22 |   }
  23 | 
  24 |   async reset() {
  25 |     await this.resetButton.click();
  26 |   }
  27 | 
  28 |   async addLap() {
  29 |     await this.lapButton.click();
  30 |   }
  31 | 
  32 |   async readMs() {
  33 |     return parseClock(await this.display.innerText());
  34 |   }
  35 | }
  36 | 
```