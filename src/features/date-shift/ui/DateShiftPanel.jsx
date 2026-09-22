import { DATE_SHIFT_LIMITS } from "../../../shared/config/constants.js";
import { formatHumanDate, parseSafeDate } from "../../../shared/lib/date/index.js";
import { Button } from "../../../shared/ui/Button.jsx";
import { Field } from "../../../shared/ui/Field.jsx";
import { Panel } from "../../../shared/ui/Panel.jsx";
import { useDateShiftStore } from "../model/useDateShiftStore.js";

export function DateShiftPanel() {
  const baseDate = useDateShiftStore((state) => state.baseDate);
  const days = useDateShiftStore((state) => state.days);
  const resultValue = useDateShiftStore((state) => state.result);
  const setBaseDate = useDateShiftStore((state) => state.setBaseDate);
  const setDays = useDateShiftStore((state) => state.setDays);
  const applyShift = useDateShiftStore((state) => state.applyShift);
  const result = parseSafeDate(resultValue);

  return (
    <Panel
      titleId="shift-title"
      title="Sumar o restar días"
      description="Parte de una fecha y desplázala adelante o atrás un número de días."
    >
      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          applyShift("add");
        }}
      >
        <div className="grid-2">
          <Field id="shift-base" label="Fecha base">
            <input
              id="shift-base"
              type="datetime-local"
              value={baseDate}
              onChange={(event) => setBaseDate(event.target.value)}
              autoComplete="off"
              required
            />
          </Field>
          <Field id="shift-days" label="Días a aplicar">
            <input
              id="shift-days"
              type="number"
              inputMode="numeric"
              min={DATE_SHIFT_LIMITS.minDays}
              max={DATE_SHIFT_LIMITS.maxDays}
              value={days}
              onChange={(event) => setDays(event.target.value)}
              required
            />
          </Field>
        </div>
        <div className="actions">
          <Button type="submit" variant="primary">
            Sumar días
          </Button>
          <Button onClick={() => applyShift("subtract")}>Restar días</Button>
        </div>
      </form>

      <div className="result-card" aria-live="polite">
        <h3>Resultado</h3>
        {result ? (
          <>
            <p className="clock">{formatHumanDate(result)}</p>
            <p className="muted">Valor técnico: {resultValue.replace("T", " ")}</p>
          </>
        ) : (
          <p className="hint">Aplica una operación para ver la fecha resultante.</p>
        )}
      </div>
    </Panel>
  );
}
