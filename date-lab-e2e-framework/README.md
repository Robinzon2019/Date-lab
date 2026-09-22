# Date Lab — Framework de pruebas E2E

Este paquete contiene el framework Playwright + Page Object Model, su documentación y el workflow de GitHub Actions.

## Contenido
- `e2e/` — fixtures, page objects, tests, datos y helpers
- `playwright.config.js` — configuración de Playwright
- `.github/workflows/playwright.yml` — CI/CD y publicación del reporte
- `DOCUMENTACION.md` — diseño del framework
- `INSTRUCCIONES.md` — cómo ejecutarlo en local y en CI

## Cómo integrarlo en Date Lab
Copia `e2e/`, `playwright.config.js` y `.github/` a la raíz del proyecto Date Lab.
Asegúrate de tener en `package.json`:

```json
"devDependencies": { "@playwright/test": "^1.55.0" },
"scripts": {
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "test:e2e:chrome": "playwright test --project=chromium",
  "test:e2e:report": "playwright show-report"
}
```

Luego:

```bash
npm install
npx playwright install --with-deps
npm run test:e2e
```

En GitHub: Settings → Pages → Source = GitHub Actions.
