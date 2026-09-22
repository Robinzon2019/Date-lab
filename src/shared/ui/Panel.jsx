export function Panel({ titleId, title, description, children }) {
  return (
    <section className="panel" aria-labelledby={titleId}>
      <header className="panel-head">
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
