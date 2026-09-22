import { Field } from "../../../shared/ui/Field.jsx";
import { Panel } from "../../../shared/ui/Panel.jsx";
import {
  calendarDiff,
  formatHumanDate,
  formatNumber,
  parseSafeDate,
} from "../../../shared/lib/date/index.js";
import { useDateDiffStore } from "../model/useDateDiffStore.js";

export function DateDiffPanel() {
  const startDate = useDateDiffStore((state) => state.startDate);
  const endDate = useDateDiffStore((state) => state.endDate);
  const setStartDate = useDateDiffStore((state) => state.setStartDate);
  const setEndDate = useDateDiffStore((state) => state.setEndDate);

  const start = parseSafeDate(startDate);
  const end = parseSafeDate(endDate);
  const valid = Boolean(start && end);
  const diff = valid ? calendarDiff(start, end) : null;

  return (
    <Panel
      titleId="diff-title"
      title="Diferencia entre fechas"
      description="Calcula años, meses, semanas, días, horas y segundos entre dos instantes."
    >
      <form className="grid-2" onSubmit={(event) => event.preventDefault()}>
        <Field id="start-date" label="Fecha y hora de inicio">
          <input
            id="start-date"
            type="datetime-local"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            autoComplete="off"
            required
          />
        </Field>
        <Field id="end-date" label="Fecha y hora final">
          <input
            id="end-date"
            type="datetime-local"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            autoComplete="off"
            required
          />
        </Field>
      </form>

      <div className="live-region" aria-live="polite" aria-atomic="true">
        {!valid && <p className="hint">Introduce dos fechas válidas para ver el resultado.</p>}
        {valid && diff && (
          <>
            <p className="summary">
              {diff.inverted
                ? "La fecha inicial es posterior a la final. Se muestra la distancia absoluta."
                : "Intervalo calculado de inicio a fin."}
            </p>
            <p className="summary muted">
              De {formatHumanDate(start)} a {formatHumanDate(end)}.
            </p>
            <ul className="stats" role="list">
              <li>
                <strong>{formatNumber(diff.years)}</strong>
                <span>años</span>
              </li>
              <li>
                <strong>{formatNumber(diff.months)}</strong>
                <span>meses</span>
              </li>
              <li>
                <strong>{formatNumber(diff.days)}</strong>
                <span>días</span>
              </li>
              <li>
                <strong>{formatNumber(diff.hours)}</strong>
                <span>horas</span>
              </li>
              <li>
                <strong>{formatNumber(diff.minutes)}</strong>
                <span>minutos</span>
              </li>
              <li>
                <strong>{formatNumber(diff.seconds)}</strong>
                <span>segundos</span>
              </li>
            </ul>
            <h3 className="subhead">Totales equivalentes</h3>
            <ul className="chips" role="list">
              <li>{formatNumber(diff.total.weeks)} semanas</li>
              <li>{formatNumber(diff.total.days)} días</li>
              <li>{formatNumber(diff.total.hours)} horas</li>
              <li>{formatNumber(diff.total.minutes)} minutos</li>
              <li>{formatNumber(diff.total.seconds)} segundos</li>
            </ul>
          </>
        )}
      </div>
    </Panel>
  );
}
