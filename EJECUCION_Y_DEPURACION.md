# Ejecutar y depurar Date Lab

## Requisitos
Node.js 20+ y npm 10+.

## Instalación
```bash
cd date-lab
npm install
```

Si el registry interno falla:
```bash
npm config set registry https://registry.npmjs.org/
npm install
```

## Desarrollo
```bash
npm run dev
```

## Calidad
```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Producción
```bash
npm run build
npm run preview
```

## Problemas frecuentes

### `eslint: not found` o `prettier: not found`
Falta `npm install`. Las herramientas viven en `devDependencies`.

### ESLint no entiende JSX
Debe usarse `eslint.config.js` (flat config) del repo, no un `.eslintrc` viejo.

### Conflicto Prettier vs ESLint
`eslint-config-prettier` va al final de `eslint.config.js` y apaga reglas de estilo.

### Las fechas no se calculan
El valor tiene que ser `YYYY-MM-DDTHH:MM`. El parseo rechaza cualquier otra cadena.

### Cronómetro se resetea al recargar
Intencional: no se persiste el tiempo en curso.

### Import circular entre features
`navigation` puede importar paneles. El resto de features no deben importarse entre sí. Usa `shared/` para código común.

### CSP bloquea un recurso
Solo se permite el mismo origen. No añadas CDN de fuentes o scripts sin actualizar la meta CSP de `index.html`.
