import { APP_NAME, APP_VERSION } from "../shared/config/constants.js";
import { SkipLink } from "../shared/ui/SkipLink.jsx";
import { SectionOutlet, SectionTabs } from "../features/navigation/index.js";

export default function App() {
  return (
    <div className="app">
      <SkipLink />
      <header className="hero">
        <h1>{APP_NAME}</h1>
        <p className="lead">
          Calcula intervalos, desplaza fechas y controla el tiempo. Sin servidor, sin rastreo y con
          teclado completo.
        </p>
      </header>
      <SectionTabs />
      <main id="contenido">
        <SectionOutlet />
      </main>
      <footer className="foot">
        <p>
          {APP_NAME} {APP_VERSION} — React, Vite y Zustand. Los datos permanecen en este navegador.
        </p>
      </footer>
    </div>
  );
}
