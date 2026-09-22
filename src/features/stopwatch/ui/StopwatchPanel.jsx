import { useEffect } from "react";
import { STOPWATCH } from "../../../shared/config/constants.js";
import { formatDuration } from "../../../shared/lib/date/index.js";
import { Button } from "../../../shared/ui/Button.jsx";
import { Panel } from "../../../shared/ui/Panel.jsx";
import { useStopwatchStore } from "../model/useStopwatchStore.js";

export function StopwatchPanel() {
  const elapsedMs = useStopwatchStore((state) => state.elapsedMs);
  const running = useStopwatchStore((state) => state.running);
  const laps = useStopwatchStore((state) => state.laps);
  const start = useStopwatchStore((state) => state.start);
  const pause = useStopwatchStore((state) => state.pause);
  const reset = useStopwatchStore((state) => state.reset);
  const addLap = useStopwatchStore((state) => state.addLap);
  const tick = useStopwatchStore((state) => state.tick);

  useEffect(() => {
    if (!running) {
      return undefined;
    }
    const id = window.setInterval(tick, STOPWATCH.tickMs);
    return () => window.clearInterval(id);
  }, [running, tick]);

  return (
    <Panel
      titleId="sw-title"
      title="Cronómetro"
      description="Mide tiempo transcurrido con precisión de centésimas y guarda vueltas."
    >
      <p className="clock huge" aria-live="off" aria-label={`Tiempo ${formatDuration(elapsedMs)}`}>
        {formatDuration(elapsedMs)}
      </p>
      <p className="sr-only" aria-live="polite">
        {running
          ? `Cronómetro en marcha: ${formatDuration(elapsedMs)}`
          : `Cronómetro en pausa: ${formatDuration(elapsedMs)}`}
      </p>

      <div className="actions">
        {running ? (
          <Button variant="warn" onClick={pause}>
            Pausar
          </Button>
        ) : (
          <Button variant="primary" onClick={start}>
            Iniciar
          </Button>
        )}
        <Button onClick={addLap} disabled={!running && elapsedMs === 0}>
          Vuelta
        </Button>
        <Button variant="ghost" onClick={reset}>
          Reiniciar
        </Button>
      </div>

      <h3 className="subhead">Vueltas</h3>
      {laps.length === 0 ? (
        <p className="hint">Aún no hay vueltas registradas.</p>
      ) : (
        <ol className="laps" reversed>
          {laps.map((lap, index) => (
            <li key={lap.id}>
              <span>Vuelta {laps.length - index}</span>
              <time dateTime={`PT${Math.floor(lap.ms / 1000)}S`}>{formatDuration(lap.ms)}</time>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}
