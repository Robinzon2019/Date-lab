import { DateDiffPanel } from "../../date-diff/index.js";
import { DateShiftPanel } from "../../date-shift/index.js";
import { StopwatchPanel } from "../../stopwatch/index.js";
import { TimerPanel } from "../../timer/index.js";
import { useNavigationStore } from "../model/useNavigationStore.js";

const PANEL_BY_SECTION = {
  diff: DateDiffPanel,
  shift: DateShiftPanel,
  stopwatch: StopwatchPanel,
  timer: TimerPanel,
};

export function SectionOutlet() {
  const section = useNavigationStore((state) => state.section);
  const Panel = PANEL_BY_SECTION[section] ?? DateDiffPanel;
  return <Panel />;
}
