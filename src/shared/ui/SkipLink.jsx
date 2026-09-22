export function SkipLink({ href = "#contenido", children = "Saltar al contenido" }) {
  return (
    <a className="skip" href={href}>
      {children}
    </a>
  );
}
