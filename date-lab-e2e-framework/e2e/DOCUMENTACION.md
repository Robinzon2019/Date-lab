# Documentación del framework de pruebas Date Lab

## Objetivo
Automatizar la interfaz de Date Lab con Playwright y Page Object Model (POM), de forma que los tests describan comportamiento de negocio y no selectores frágiles.

## Principios
- Una clase de página por feature (`DateDiffPage`, `DateShiftPage`, `StopwatchPage`, `TimerPage`).
- `AppPage` orquesta navegación y expone las subpáginas.
- Fixture `app` abre `/`, limpia `localStorage` y deja un estado determinista.
- Datos de escenario en `e2e/data/scenarios.js`.
- Selectores preferidos: `getByRole` y `getByLabel`. CSS solo para el reloj y bloques de stats.

## Mapa de archivos
| Ruta | Responsabilidad |
|---|---|
| `playwright.config.js` | Navegadores, reporteros, webServer de Vite |
| `e2e/fixtures/test.js` | Fixture `app` |
| `e2e/pages/` | Page Objects |
| `e2e/tests/` | Specs por feature |
| `e2e/data/scenarios.js` | Casos parametrizados |
| `e2e/helpers/dates.js` | Parseo de relojes `HH:MM:SS` |
| `.github/workflows/playwright.yml` | CI y publicación del reporte |

## Qué cubren los tests
- Navegación entre pestañas y skip link.
- Diferencia de fechas (día, año e intervalo invertido).
- Sumar / restar días.
- Cronómetro: avance, vuelta y reset.
- Temporizador: fin con alerta y pausa.

## Reportes
En local: `playwright-report/index.html`.
En CI: artefacto `playwright-report` + JUnit en Checks + GitHub Pages en `main`/`master`.
