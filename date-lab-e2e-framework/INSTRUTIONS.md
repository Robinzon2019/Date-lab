# Instrucciones para ejecutar las pruebas

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Este framework vive dentro del proyecto Date Lab (`package.json` con scripts `test:e2e*`)

## 1. Instalar

Desde la raíz de `date-lab`:

```bash
npm install
npx playwright install --with-deps
```

`--with-deps` instala librerías del sistema que necesitan los navegadores.

## 2. Ejecutar

```bash
# todos los proyectos (chromium, firefox, webkit, mobile)
npm run test:e2e

# solo Chromium
npm run test:e2e:chrome

# interfaz gráfica
npm run test:e2e:ui

# navegador visible
npm run test:e2e:headed

# un archivo
npx playwright test e2e/tests/date-diff.spec.js --project=chromium
```

Playwright arranca solo `npm run dev` en `http://127.0.0.1:5173`.

## 3. Ver el reporte

```bash
npm run test:e2e:report
```

O abre `playwright-report/index.html`.

## 4. Variables útiles

| Variable       | Efecto                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| `CI=true`      | retries, un worker, reporteros HTML+JUnit+GitHub                             |
| `E2E_PORT`     | puerto del servidor Vite (default 5173)                                      |
| `E2E_BASE_URL` | URL ya levantada; el webServer sigue intentando arrancar salvo que reutilice |

## 5. Fallos habituales

- **`playwright: not found`**: falta `npm install`.
- **Navegador no instalado**: `npx playwright install --with-deps`.
- **Puerto 5173 ocupado**: cierra Vite o usa `E2E_PORT=5174`.
- **Fechas que no se rellenan**: el control `datetime-local` espera `YYYY-MM-DDTHH:MM`.
- **Tests de tiempo inestables**: en CI hay 2 reintentos; en local evita un sistema bajo carga extrema.

## 6. CI/CD

El workflow `.github/workflows/playwright.yml`:

1. Instala dependencias y navegadores.
2. Corre `npm run test:e2e`.
3. Sube `playwright-report` y `test-results` como artefacto (14 días).
4. Publica el HTML en GitHub Pages en pushes a `main` o `master`.

### Activar Pages en el repo

Settings → Pages → Source: **GitHub Actions**.

El reporte queda en:
`https://<org-o-usuario>.github.io/<repo>/`
