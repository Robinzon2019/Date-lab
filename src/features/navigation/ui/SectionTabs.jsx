import { SECTIONS } from "../model/sections.js";
import { useNavigationStore } from "../model/useNavigationStore.js";

export function SectionTabs() {
  const section = useNavigationStore((state) => state.section);
  const setSection = useNavigationStore((state) => state.setSection);

  return (
    <nav className="tabs" aria-label="Secciones de Date Lab">
      {SECTIONS.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={section === item.id}
          className={section === item.id ? "tab active" : "tab"}
          onClick={() => setSection(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
