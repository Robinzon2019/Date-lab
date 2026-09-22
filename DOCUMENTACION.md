# Date Lab — Documentación

## Qué es
Aplicación web de una sola página para calcular diferencias entre fechas, sumar o restar días, usar un cronómetro y un temporizador. Todo corre en el navegador.

## Stack
- React 19 + Vite 8
- Zustand 5 (una store por feature)
- ESLint 9 (calidad) + Prettier 3 (formato) + Oxlint (lint rápido)

## Arquitectura por features

```
src/
  main.jsx
  app/                 # composición de la aplicación
    App.jsx
    styles/index.css
  shared/              # código reutilizable, sin reglas de negocio de una feature
    config/constants.js
    lib/date/          # parseo, formato y calendario
    ui/                # Button, Field, Panel, SkipLink
  features/
    navigation/        # pestañas y enrutado local
    date-diff/
    date-shift/
    stopwatch/
    timer/
```

Cada feature sigue el mismo contrato interno:

- `model/` estado Zustand y reglas de persistencia
- `lib/` lógica pura (sin React)
- `ui/` componentes de presentación
- `index.js` API pública de la feature

Las features no importan la UI de otras features salvo `navigation`, que orquesta qué panel mostrar.

## Principios aplicados
- Responsabilidad única: stores pequeñas y funciones puras.
- Validación en el borde (parseo ISO, enteros acotados).
- Selectores Zustand granulares para limitar rerenders.
- Persistencia parcial: solo campos de formulario, nunca el tiempo en curso.
- Accesibilidad: labels, skip link, aria-live, foco visible.
- Seguridad: CSP, sin HTML crudo, sin red.

## Scripts
| Comando | Uso |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build de producción |
| `npm run lint` | ESLint + Oxlint |
| `npm run lint:fix` | autocorregir lint |
| `npm run format` | Prettier sobre el repo |
| `npm run format:check` | verificar formato en CI |
