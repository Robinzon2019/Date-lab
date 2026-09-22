import { useEffect, useRef } from "react";
import { TIMER_LIMITS } from "../../../shared/config/constants.js";
import { formatClock } from "../../../shared/lib/date/index.js";
import { Button } from "../../../shared/ui/Button.jsx";
import { Field } from "../../../shared/ui/Field.jsx";
import { Panel } from "../../../shared/ui/Panel.jsx";
import { playFinishBeep } from "../lib/beep.js";
import { useTimerStore } from "../model/useTimerStore.js";

export function TimerPanel() {
  const hours = useTimerStore((state) => state.hours);
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);
  const remainingMs = useTimerStore((state) => state.remainingMs);
  const running = useTimerStore((state) => state.running);
  const finished = useTimerStore((state) => state.finished);
  const setHours = useTimerStore((state) => state.setHours);
  const setMinutes = useTimerStore((state) => state.setMinutes);
  const setSeconds = useTimerStore((state) => state.setSeconds);
  const start = useTimerStore((state) => state.start);
  const pause = useTimerStore((state) => state.pause);
  const reset = useTimerStore((state) => state.reset);
  const tick = useTimerStore((state) => state.tick);
  const acknowledge = useTimerStore((state) => state.acknowledge);
  const lastTick = useRef(0);

  useEffect(() => {
    if (!running) {
      return undefined;
    }
    lastTick.current = performance.now();
    let frame = 0;
    const loop = (now) => {
      const delta = now - lastTick.current;
      lastTick.current = now;
      tick(delta);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [running, tick]);

  useEffect(() => {
    if (finished) {
      playFinishBeep();
    }
  }, [finished]);

  return (
    <Panel
      titleId="timer-title"
      title="Temporizador"
      description="Cuenta regresiva en el navegador. Todo el cálculo ocurre en tu dispositivo."
    >
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          start();
        }}
      >
        <div className="grid-3">
          <Field id="th" label="Horas">
            <input
              id="th"
              type="number"
              min={0}
              max={TIMER_LIMITS.maxHours}
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              disabled={running}
            />
          </Field>
          <Field id="tm" label="Minutos">
            <input
              id="tm"
              type="number"
              min={0}
              max={TIMER_LIMITS.maxMinutes}
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              disabled={running}
            />
          </Field>
          <Field id="ts" label="Segundos">
            <input
              id="ts"
              type="number"
              min={0}
              max={TIMER_LIMITS.maxSeconds}
              value={seconds}
              onChange={(event) => setSeconds(event.target.value)}
              disabled={running}
            />
          </Field>
        </div>

        <p className={`clock huge ${finished ? "alert" : ""}`} aria-live="off">
          {formatClock(remainingMs)}
        </p>
        <p className="sr-only" aria-live="assertive">
          {finished
            ? "Temporizador finalizado"
            : running
              ? `Quedan ${formatClock(remainingMs)}`
              : `Temporizador en ${formatClock(remainingMs)}`}
        </p>

        <div className="actions">
          {running ? (
            <Button variant="warn" onClick={pause}>
              Pausar
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              Iniciar
            </Button>
          )}
          <Button variant="ghost" onClick={reset}>
            Reiniciar
          </Button>
        </div>
      </form>

      {finished && (
        <div className="banner" role="alert">
          <p>El temporizador ha llegado a cero.</p>
          <Button onClick={acknowledge}>Entendido</Button>
        </div>
      )}
    </Panel>
  );
}
